import React, { useState, useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";
import {
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement,
    useStripe,
    useElements
} from '@stripe/react-stripe-js'
import { fetchFromAPI } from "../../../helpers";
import { UserContext } from "../../../context/user-context";

const CustomCheckout = ({shipping, cartItems, history: { push }}) => {
    const [processing, setProcessing] = useState(false)
    const [error, setError] = useState(null)
    const [clientSecret, setClientSecret] = useState(null)
    const [cards, setCards] = useState(null)
    const [savedCard, setSavedCard] = useState(false)
    const [paymentCard, setPaymentCard] = useState('')

    const elements = useElements()
    const stripe = useStripe()

    const { user } = useContext(UserContext)

    useEffect(() => {
        const items = cartItems.map(item => ({
            price: item.price,
            quantity: item.quantity
        }))

        if (user) { 
            const savedCards = async () => {
                try {
                    const cardsList = await fetchFromAPI('/checkout/payment-methods', {
                        method: 'GET'
                    })

                    setCards(cardsList)
                } catch (error) {
                    console.log(error)
                }
            }
        }

        if (shipping) {
            const body = {
              cartItems: items,
              shipping: {
                name: shipping.name,
                address: {
                  line1: shipping.address
                }
              },
              description: 'payment intent for nomad shop',
              receiptEmail: shipping.email,
            }
      
            const customCheckout = async () => {
              const { clientSecret, id } = await fetchFromAPI('checkout/payment-intent', {
                body
              });
      
              setClientSecret(clientSecret)
            //   setPaymentIntentId(id);
            }
      
            customCheckout();
          }
    }, [shipping, cartItems, user])

    const cardHandlerChange = e => {
        const {error} = e

        setError(error || '')
    }

    const checkoutHandler = async () => {
        setProcessing(true)
        let si;

        if (savedCard) {
            si = await fetchFromAPI('checkout/save-payment-method')
        }
        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardNumberElement)
            }
        })

        if (payload.error) {
            setError('Payment Failed: ' + payload.error.message)
            setProcessing(false)
            return
        }
        
        if (savedCard && si) {
            await stripe.confirmCardSetup(si.clientSecret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement)
                }
            })
        }
        push('/success')

    }

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

    let cardOption;

  if (cards) {
    cardOption = cards.map(card => {
      const { card: { brand, last4, exp_month, exp_year } } = card;
      return (
        <option key={card.id} value={card.id}>
          { `${brand}/ **** **** **** ${last4} ${exp_month}/${exp_year}` }
        </option>
      );
    });
    cardOption.unshift(
      <option key='Select a card' value=''>Select A Card</option>
    );
  }

    return (
        <div>{
            user && (cards && cards.length > 0) &&
            <div>
              <h4>Pay with saved card</h4>
              <select value={paymentCard} onChange={e => setPaymentCard(e.target.value)}>
                { cardOption }
              </select>
              <button
                type='submit'
                disabled={processing || !paymentCard}
                className='button is-black nomad-btn submit saved-card-btn'
                // onClick={() => savedCardCheckout()}
              >
              { processing ? 'PROCESSING' : 'PAY WITH SAVED CARD' }
              </button>
            </div>
          }
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
            {
                user &&
                <div className='save-card'>
                    <label>Save Card</label>
                    <input 
                        type='checkbox'
                        checked={savedCard}
                        onChange={e => setSavedCard(e.target.checked)}
                    />
                </div>
            }
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

export default withRouter(CustomCheckout)