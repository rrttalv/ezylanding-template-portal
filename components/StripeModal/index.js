import React, { useState } from 'react';
import { CardElement, Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import Checkout from './Checkout'
import Close from '../../assets/close.svg'
import Caret from '../../assets/caret-down.svg'
import { loadStripe } from '@stripe/stripe-js';
import config from '../../utils/config';

const StripeModal = (props) => {
  const [clientSecret, setClientSecret] = useState('')
  const [intentId, setIntentId] = useState('')
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

  console.log(config)

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

  const nextSlide = e => {
    e.preventDefault()
    setMessage('')
    if(!email || email.length < 5){
      setMessage('Invalid email address')
      setTimeout(() => {
        setMessage('')
      }, 10000)
    }
    //Fetch stripe customer and payment intent
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
          Final Step
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
              currentSlide === 'payment' ? (
                <Elements options={options} stripe={stripePromise}>
                  <Checkout intentId={intentId} clientSecret={clientSecret} />
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