import React, { useContext, useState } from "react";
import { useStripe } from "@stripe/react-stripe-js";
import { CartContext } from "../../../context/cart-context";
import { fetchFromAPI } from "../../../helpers";

const StripeCheckout = () => {
    const [email, setEmail] = useState('')
    const {cartItems} = useContext(CartContext)
    const stripe = useStripe()

    const onSubmitHandler = async (e) => {
        e.preventDefault()

        const lineItems = cartItems.map(item => ({
            quantity: item.quantity,
            price_data: {
                currency: 'BRL',
                unit_amount: item.price * 100,
                product_data: {
                    name: item.title,
                    description: item.description,
                    images: [item.imageUrl]
                }
            },
        }))

        const response = await fetchFromAPI('checkout/create-session', {
            body: { 
                lineItems,
                customerEmail: email
            }
        })

        const {sessionId} = response

        const {error} = await stripe.redirectToCheckout({
            sessionId
        })

        if (error) {
            console.log(error)
        }

    }

    return (
        <form onSubmit={onSubmitHandler}>
            <div>
                <input type='email' onChange={e => setEmail(e.target.value)} placeholder="email" value={email} className="nomad-input"/>
            </div>
            <div>
                <button type="submit" className="button is-black submit">
                    Checkout
                </button>
            </div>
        </form>
    )
}

export default StripeCheckout