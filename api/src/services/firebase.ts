import { NextFunction, Request, Response } from 'express'
import firebaseAdmin from 'firebase-admin'
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier'

export type User = {
  email: string
  stripeCustomerId: string
}

export interface RequestWithCurrentUser extends Request {
  currentUser?: DecodedIdToken
}
class FirebaseServices {
  private firebase = firebaseAdmin.initializeApp()
  public db = this.firebase.firestore()
  public auth = this.firebase.auth()

  public decodeJWT = async (
    req: RequestWithCurrentUser,
    res: Response,
    next: NextFunction,
  ) => {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer ')
    ) {
      const idToken = req.headers.authorization.split('Bearer ')[1]

      try {
        const decodedToken = await this.auth.verifyIdToken(idToken)
        req.currentUser = decodedToken
      } catch (error) {
        console.log(error)
      }
    }

    next()
  }

  public validateUser = (
    req: RequestWithCurrentUser,
    res: Response,
    next: NextFunction,
  ) => {
    const user = req.currentUser

    if (!user) {
      return res.status(401).send()
    }

    next()
  }
}

export default new FirebaseServices()
