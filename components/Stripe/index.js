import React, { useState } from 'react';
import { CardElement, Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const Stripe = (props) => {
  const [clientSecret, setClientSecret] = useState('')
  const [intentId, setIntentId] = useState('')

  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK)

  const appearance = {
    theme: 'stripe',
  }

  const options = {
    clientSecret,
    appearance,
  }

  return (
    <div className='modal stripe-modal'>
      <div className='modal-wrapper'>
        <div className='modal-header'>
          <h2>Buy {props.title} template</h2>
          <button onClick={() => handleDiscard()} className='btn-none close-modal'>
            <Close />
          </button>
        </div>
        <div className='modal-body'>
          <Elements options={options} stripe={stripePromise}>
            <Stripe intentId={intentId} clientSecret={clientSecret} />
          </Elements>
        </div>
      </div>
   </div>
  )

}

export default Stripe