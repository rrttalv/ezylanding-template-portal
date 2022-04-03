import Link from 'next/link'
import React from 'react'

const PricingCard = props => {

  const { price, title, className, features, href, linkTitle, wrapperClass, linkText } = props

  return (
    <div className={`pricing-card ${wrapperClass}`}>
      <div className={`pricing-card_wrapper ${className}`}>
        <div className='pricing-card_header'>
          <h3 className='pricing-card_title'>{title}</h3>
          <span className='pricing-card_price'>{price}</span>
        </div>
        <div className='pricing-card_body'>
          {
            features.map((feature, idx) => (
              <div className='pricing-card_feature'>
                <h5 className='pricing-card_feature_title'>
                  {feature.title}
                </h5>
                <span className='pricing-card_feature_subtitle'>
                  {feature.subtitle}
                </span>
              </div>
            ))
          }
        </div>
        <div className='pricing-card_buttons'>
          <Link href={href}>
            <a className='pricing-card_button' title={linkTitle}>
              {linkText}
            </a>
          </Link>
        </div>
      </div>
    </div>
  )

}

export default PricingCard