import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import {
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement,
    useStripe,
    useElements
} from '@stripe/react-stripe-js'
import { fetchFromAPI } from "../../../helpers"; 

const CustomCheckout = () => {
    const [processing, setProcessing] = useState(false)
    const [error, setError] = useState(null)

    const elements = useElements()

    const cardHandlerChange = e => {
        const {error} = e

        setError(error || '')
    }

    const checkoutHandler = () => {}

    const cardStyle = {
        style: {
          base: {
            color: "#000",
            fontFamily: 'Roboto, sans-serif',
            fontSmoothing: "antialiased",
            fontSize: "16px",
            "::placeholder": {
              color: "#606060",
            },
          },
          invalid: {
            color: "#fa755a",
            iconColor: "#fa755a"
          }
        }
      };

    return (
        <div>
            <h4>Enter Payment Details</h4>
            <div className="stripe-card">
                <CardNumberElement 
                    className="card-element"
                    options={cardStyle}
                    onChange={cardHandlerChange}
                />
            </div>
            <div className="stripe-card">
                <CardExpiryElement 
                    className="card-element"
                    options={cardStyle}
                    onChange={cardHandlerChange}
                />
            </div>
            <div className="stripe-card">
                <CardCvcElement 
                    className="card-element"
                    options={cardStyle}
                    onChange={cardHandlerChange}
                />
            </div>
            <div className="submit-btn">
                <button
                    disabled={processing}
                    className="button is-black nomad-btn submit"
                    onClick={checkoutHandler}
                >
                    {processing ? 'PROCESSING...' : 'PAY'}
                </button>
            </div>
            { error &&
                <p className="error-message">{error}</p>
            }
        </div>
    )
}

export default CustomCheckout