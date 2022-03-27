import Link from 'next/link'
import { useState } from 'react'
import Layout from '../../components/Layout'

const Pricing = () => {

  const [prices] = useState({
    raw: {
      price: '$5',
      title: 'Raw HTML',
      className: 'raw-pricing',
      features: [
        {
          title: 'Responsive',
          subtitle: 'All of the HTML templates are 100% responsive'
        },
        {
          title: 'Easy customization',
          subtitle: 'Change the template theme by just editing the CSS vars'
        },
        {
          title: 'Always available',
          subtitle: `When you buy a template it will be accessible for you, forever!`
        }
      ],
      href: '/templates',
      linkTitle: 'Link to EzyLanding templates browse page',
      linkText: 'browse templates'
    },
    webpack: {
      price: '$8',
      title: 'Webpack + HTML',
      className: 'webpack-pricing',
      features: [
        {
          title: 'Responsive',
          subtitle: 'All of the HTML templates are 100% responsive'
        },
        {
          title: 'Easy customization',
          subtitle: 'Change the template theme by just editing the CSS vars'
        },
        {
          title: 'Always available',
          subtitle: `When you buy a template it will be accessible for you, forever!`
        },
        {
          title: 'Ready to deploy',
          subtitle: 'With our webpack configuration the HTML template is deployable out of the box!'
        }
      ],
      href: '/templates',
      linkTitle: 'Link to EzyLanding templates browse page',
      linkText: 'browse templates'
    }
  })

  const getPricingCard = (type, wrapperClass) => {
    const { price, title, className, features, href, linkTitle, linkText } = prices[type]
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

  return (
    <Layout>
      <div className='landing-section container-fluid first-section section pricing-section'>
        <div className="section-text-wrapper center">
          <h1 className='title text-main'>Template Pricing & Features</h1>
          <p className="subtitle text-gray">Wondering what a HTML template costs these days?</p>
        </div>
        <div className='row pricing-cards-row'>
          <div className='col-md-12 col-lg-4 offset-0 offset-lg-2'>
            {getPricingCard('raw', 'raw-card')}
          </div>
          <div className='col-md-12 col-lg-4 offset-0 offset-lg-2 mt-5 mt-lg-0'>
            {getPricingCard('webpack', 'webpack-card')}
          </div>
        </div>
      </div>
    </Layout>
  )

}

export default Pricing