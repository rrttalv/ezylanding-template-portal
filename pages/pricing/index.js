import Link from 'next/link'
import { useState } from 'react'
import Layout from '../../components/Layout'
import CircleCheck from '../../assets/check.svg'
import Close from '../../assets/close.svg'
import PageCTA from '../../components/PageCTA'

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

  const [features] = useState([
    {
      title: 'Responsive HTML',
      description: 'All of the HTML templates we sell are 100% responsive.',
      raw: true,
      webpack: true
    },
    {
      title: 'Simple customization',
      description: 'Every HTML template has CSS var() support. You can easily customize the color scheme of a template.',
      raw: true,
      webpack: true
    },
    {
      title: 'Lifetime access',
      description: 'When you purchase a HTML template you will have access to it for life! Even if we update or edit the template, you will always get the latest version of the template.',
      raw: true,
      webpack: true
    },
    {
      title: 'Optimized for SEO',
      description: 'All of our HTML templates are optimized for SEO. No need to add the SEO tags manually!',
      raw: true,
      webpack: true
    },
    {
      title: 'Customizeable SVGs',
      description: 'Our HTML templates utilize SVGs that make your life easier! With the power of SVG and css VARs you can personalize your template with just a few clicks.',
      raw: true,
      webpack: true
    },
    {
      title: '24/7 Support',
      description: 'Need help deploying your template? Maybe we have a bug in a template you purchased? Our support channels are available 24/7 and ready to help you!',
      raw: true,
      webpack: true
    },
    {
      title: 'SCSS Support',
      description: 'Webpack templates have built-in SCSS support.',
      raw: false,
      webpack: true
    },
    {
      title: 'Ready to deploy',
      description: 'The Webpack HTML templates are ready to be deployed out of the box! No need to set up your own webpack configuration.',
      raw: false,
      webpack: true
    },
    {
      title: 'Simple development',
      description: `With a Webpack HTML template you can further customize and develop your template with ease! Our Webpack templates are development ready. No configuration needed!`,
      raw: false,
      webpack: true
    }
  ])

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

  const getPricingComparison = () => {
    return (
      <div className='comparison'>
        <div className='comparison_wrapper'>
          <div className='comparison_header comparison-row'>
            <div className='comparison-row_left' />
            <div className='comparison-row_title-wrapper'>
              <h3 className='comparison-row_title'>
                HTML
              </h3>
            </div>
            <div className='comparison-row_title-wrapper'>
              <h3 className='comparison-row_title'>
                HTML + Webpack
              </h3>
            </div>
          </div>
          {
            features.map(feature => {
              const { title, description, raw, webpack } = feature
              return (
                <div key={title} className='comparison_feature comparison-row'>
                  <div className='comparison_feature_wrapper'>
                    <div className='comparison_feature_intro'>
                      <h5 className='comparison_feature_heading'>{title}</h5>
                      <p className='comparison_feature_subheading'>
                        {description}
                      </p>
                    </div>
                    <div className='comparison_feature_supported'>
                      {raw ? <CircleCheck className='check'/> : <Close className='cross'/>}
                    </div>
                    <div className='comparison_feature_supported'>
                      {webpack ? <CircleCheck className='check'/> : <Close className='cross'/>}
                    </div>
                  </div>
                </div>
              )
            })
          }
          <div className='comparison_feature comparison-row price-row'>
            <div className='comparison_feature_wrapper'>
              <div className='comparison_feature_intro'>
                <h5 className='comparison_feature_heading'>Price Per Template</h5>
              </div>
              <div className='comparison_feature_supported'>
                <span className='comparison_feature_price text-gray'>
                  $5
                </span>
              </div>
              <div className='comparison_feature_supported'>
                <span className='comparison_feature_price text-gray'>
                  $8
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className='comparison-cta'>
          <h3>Sounds good?</h3>
          <Link href={'http://localhost:3000/templates'}>
            <a className="browse-btn" title="Link to the HTML EzyLanding templates browse page">
              Browse Templates
            </a>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <Layout>
      <section className='landing-section container-fluid first-section section pricing-section'>
        <div className="section-text-wrapper center">
          <h1 className='title text-main'>Template Pricing & Features</h1>
          <p className="subtitle text-gray">Wondering what a HTML template costs these days?</p>
        </div>
        <div className='row pricing-cards-row'>
          <div className='col-md-12 col-lg-5 offset-0 offset-lg-1'>
            {getPricingCard('raw', 'raw-card')}
          </div>
          <div className='col-md-12 col-lg-5 offset-0 offset-lg-0 mt-5 mt-lg-0'>
            {getPricingCard('webpack', 'webpack-card')}
          </div>
        </div>
      </section>
      <section className='landing-section container-fluid section comparison-section'>
        <div className='section-text-wrapper center'>
          <h1 className="title text-dark">
            Compare Pricing
          </h1>
          <p className='subtitle text-gray'>
            Here are the features our HTML templates come with
          </p>
        </div>
        {getPricingComparison()}
        <PageCTA title={"Have a feature request?"} />
      </section>
    </Layout>
  )

}

export default Pricing