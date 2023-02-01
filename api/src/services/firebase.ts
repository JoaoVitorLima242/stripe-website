import { NextFunction, Request, Response } from 'express'
import firebaseAdmin from 'firebase-admin'

export type User = {
  email: string
  stripeCustomerId: string
}
class FirebaseServices {
  public db = firebaseAdmin.initializeApp().firestore()
  public auth = firebaseAdmin.initializeApp().auth()

  public decodeJWT = async (req: any, res: Response, next: NextFunction) => {
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

  public validateUser = (req: any, res: Response, next: NextFunction) => {
    const user = req.currentUser

    if (!user) {
      return res.status(401).send()
    }

    next()
  }
}

export default new FirebaseServices()
