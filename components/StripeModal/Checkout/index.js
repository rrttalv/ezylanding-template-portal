import { CardElement, Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react'
import config from '../../../utils/config';
import Spinner from '../../Spinner';

const Checkout = (props) => {
  const [message, setMessage] = useState(null)
  const [isLoading, setLoading] = useState(false)

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    try{
      e.preventDefault()
      if(!stripe || !elements){
        return
      }

      setLoading(true)
  
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${config.APP_URL}/purchase?purchaseId=${props.purchaseId}&paymentIntentId=${props.intentId}`,
        },
      })
  
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message);
      } else {
        setMessage("An unexpected error occured.");
      }
  
      setLoading(false)
      
    }catch(err){
      console.log(err)
      setLoading(false)
    }
  }

  return (
    <div className='stripe_form-wrapper'>
      {
        message ? (
          <div className='form-error'>
            <span>Payment error: {message}</span>
          </div>
        )
        :
        undefined
      }
      <form onSubmit={handleSubmit}>
        <PaymentElement id="payment-element" />
        <button disabled={isLoading || !stripe || !elements} id="submit">
          {isLoading ? undefined : <span id="button-text">Pay now</span>}
          {
            isLoading ? <Spinner center={true} style={{ height: '25px', margin: 0 }} scale={0.3} /> : undefined
          }
        </button>
      </form>
    </div>
  )
}

export default Checkout