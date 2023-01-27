import React, { useContext } from 'react'
import { CartContext } from "../../context/cart-context"
import Layout from '../shared/layout'
import './checkout.styles.scss'
import StripeCheckout from './stripe-checkout/stripe-checkout'

const Checkout = () => {
    const {itemCount, total} = useContext(CartContext)

    return (
        <Layout>
            <div className='checkout'>
                <h2>Checkout Summary</h2>
                <h3>Total Items: {itemCount}</h3>
                <h4>Amount to Pay: ${total}</h4>
            </div>
            <StripeCheckout />
        </Layout>
    )
}

export default Checkout