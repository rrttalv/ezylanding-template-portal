import React, { useState } from 'react';
import { CardElement, Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import Checkout from './Checkout'
import Close from '../../assets/close.svg'
import Caret from '../../assets/caret-down.svg'
import { loadStripe } from '@stripe/stripe-js';
import config from '../../utils/config.prod';
import Spinner from '../Spinner';

const StripeModal = (props) => {
  const [clientSecret, setClientSecret] = useState('')
  const [intentId, setIntentId] = useState('')
  const [purchaseId, setPurchaseId] = useState('')
  const [optionsOpen, setOptionsOpen] = useState(false)
  const [checkoutOptions, setCheckoutOptions] = useState([
    {
      selected: false,
      price: 500,
      value: 'single-raw',
      title: 'Raw HTML template'
    },
    {
      selected: true,
      price: 800,
      value: 'single-webpack',
      title: 'HTML + Webpack template (recommended)'
    }
  ])
  const [email, setEmail] = useState('')
  const [currentSlide, setCurrentSlide] = useState('options')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const stripePromise = loadStripe(config.STRIPE_KEY)

  const appearance = {
    theme: 'stripe',
  }

  const options = {
    clientSecret,
    appearance,
  }

  const handleDiscard = () => {
    props.closeCheckout()
  }

  const handleOptionSelect = (e, value) => {
    e.preventDefault()
    const copy = checkoutOptions.map(item => {
      if(item.value === value){
        return {
          ...item,
          selected: true
        }
      }
      return {
        ...item,
        selected: false
      }
    })
    setCheckoutOptions(copy)
    setOptionsOpen(false)
  }

  const toggleOptions = e => {
    e.preventDefault()
    setOptionsOpen(!optionsOpen)
  }

  const nextSlide = async e => {
    e.preventDefault()
    setLoading(true)
    if(!email || email.length < 5){
      setMessage('Invalid email address')
      setTimeout(() => {
        setMessage('')
      }, 10000)
      setLoading(false)
      return
    }
    const { value: selectionValue } = checkoutOptions.find(({ selected }) => selected)
    //Fetch stripe customer and payment intent
    try{
      const res = await fetch('/templates/payment-intent', {
        method: 'POST',
        cache: 'no-cache',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'manual',
        body: JSON.stringify({
          templateTag: selectionValue, 
          email,
          templateId: props.templateId
        })
      })
      const json = await res.json()
      if(!json.status){
        setMessage(json.message)
      }else{
        const { clientSecret: secret, paymentIntentId, purchaseId: purchase } = json
        setClientSecret(secret)
        setIntentId(paymentIntentId)
        setPurchaseId(purchase)
        setCurrentSlide('payment')
      }
      setLoading(false)
    }catch(err){
      setLoading(false)
    }
  }

  const getOptions = () => {
    const { value: selectionValue, price, title } = checkoutOptions.find(({ selected }) => selected)
    return (
    <div className='form_wrapper'>
      {
        message ? (
          <div className='form-error'>
            <span>Checkout error: {message}</span>
          </div>
        )
        :
        undefined
      }
      <form>
        <div className='form-row'>
          <label htmlFor="email">
            Email Address
          </label>
          <input 
            label="Email"
            className='form-control'
            id="email"
            type="text"
            placeholder="johndoe@example.com"
            required
            autoComplete="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className='form-row'>
          <label htmlFor='purchase-option'>
            Template configuration
          </label>
          <button className='btn-none select-btn form-control' onClick={e => toggleOptions(e)}>
            {title}
            <Caret style={{ transform: `rotate(${optionsOpen ? '180deg' : '0deg'})` }}/>
          </button>
          <div className='select-options'>
            <div className='select-options_wrapper' style={{ display: optionsOpen ? 'flex' : 'none' }}>
              {
                optionsOpen ? (
                  checkoutOptions.map((option, idx) => (
                    <button 
                      className='btn-none select-options_option'
                      onClick={(e) => handleOptionSelect(e, option.value)}
                      key={idx}
                    >
                      <span className='select-options_option_text'>
                        {option.title}
                      </span>
                    </button>
                  ))
                )
                :
                undefined
              }
            </div>
          </div>
        </div>
        <div className='form-row purchase-total'>
          <span className='purchase-total_heading'>
            Order total:
          </span>
          <span className='purchase-total_text'>
            ${(price / 100).toFixed(2)}
          </span>
        </div>
        <button className='next' onClick={e => nextSlide(e)}>
          {
            loading ? <Spinner center={true} style={{ height: '25px', margin: 0 }} scale={0.3} /> : 'Final Step'
          }
        </button>
      </form>
    </div>
    )
  }

  return (
    <div className='modal'>
      <div className='modal-wrapper'>
        <div className='modal-header'>
          <h2>Buy {props.title} template</h2>
          <button onClick={() => handleDiscard()} className='btn-none close-modal'>
            <Close />
          </button>
        </div>
        <div className='modal-body'>
          <div className='form'>
            {
              currentSlide === 'options' ? (
                getOptions()
              )
              :
              undefined
            }
            {
              currentSlide === 'payment' && clientSecret && intentId && purchaseId ? (
                <Elements options={options} stripe={stripePromise}>
                  <Checkout intentId={intentId} clientSecret={clientSecret} purchaseId={purchaseId} />
                </Elements>
              )
              :
              undefined
            }
          </div>
        </div>
      </div>
   </div>
  )

}

export default StripeModal