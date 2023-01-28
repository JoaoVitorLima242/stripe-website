import React, { useContext, useState } from 'react'
import { CartContext } from "../../context/cart-context"
import Layout from '../shared/layout'
import './checkout.styles.scss'
import StripeCheckout from './stripe-checkout/stripe-checkout'
import ShippingAddress from './custom-checkout.jsx/shipping-address'
import CustomCheckout from './custom-checkout.jsx/custom-checkout'

const Checkout = () => {
    const {itemCount, total, cartItems} = useContext(CartContext)
    const [shipping, setShipping] = useState(null)

    const addressShow = {
        display: (shipping ? 'none' : 'block') 
    }

    const cardShow = {
        display: (!shipping ? 'none' : 'block') 
    }
 
    return (
        <Layout>
            <div className='checkout'>
                <h2>Checkout Summary</h2>
                <h3>Total Items: {itemCount}</h3>
                <h4>Amount to Pay: ${total}</h4>
                <div style={addressShow}>
                    <ShippingAddress setShipping={setShipping}/>
                </div>
                <div style={cardShow}>
                    <CustomCheckout 
                        shipping={shipping} 
                        cartItems={cartItems}
                    />
                </div>
            </div>
            {/* <StripeCheckout /> */}
        </Layout>
    )
}

export default Checkout