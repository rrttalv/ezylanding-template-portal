import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import Layout from '../components/Layout'
import PricingCard from '../components/PricingCard'
import absoluteUrl from "next-absolute-url";

const Index = (props) => {

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

  const [pitch] = useState({
    first: {
      title: 'Templates powered by CSS --vars',
      text: <p className='pitch-row_text'>{`All of our templates leverage CSS`} <b>vars</b>. 
        {` You will not have to manually convert each template color scheme to match that of your brand! 
        Just change the `} <b>--var property value</b> {` and you are good to go!`}</p>,
      id: 'landing-pitch-',
      textOrderClass: 'order-lg-1 order-2 mt-lg-0 mt-4',
      imgOrderClass: 'order-lg-2 order-1 mb-lg-0 mb-4',
      imageClass: '',
      imageAlt: '',
      video: true,
      image: '/assets/color-picker-preview.mp4'
    },
    second: {
      title: 'Not just another HTML template provider',
      text: <p className='pitch-row_text'>{`EzyLanding was born as a drag and drop React template editor. The core idea has not changed!
      By the end of Q2 2022 our drag and drop editor will be available to everyone.
      And by Q3 2022 You can export your next landing page as a`} <b>React</b> {`or`} <b>NextJS</b> {`project!`}</p>,
      id: 'landing-pitch-',
      textOrderClass: 'order-2 mt-lg-0 mt-4',
      imgOrderClass: 'order-1 mb-lg-0 mb-4',
      imageClass: '',
      imageAlt: '',
      video: true,
      image: '/assets/drag-and-drop-text-edit-preview.mp4'
    },
    third: {
      title: `Unlimited HTML & React Templates For Life!`,
      text: <p className='pitch-row_text'>{`With the launch of our drag and drop editor we will be selling`} <b>500 Limited Lifetime</b> {`plans.
        With a lifetime plan you will have access to`} <b>ALL</b> {`of our current and future HTML templates.
        You will never have to buy a single HTML or React template again!`}
        <br />
        <br />
        {`The lifetime plan sale will be announced on`} <Link href={'https://twitter.com/ezylanding'}><a className='link' target="_blank" title="The official EzyLanding Twitter account">Twitter</a></Link></p>,
      id: 'landing-pitch-',
      textOrderClass: 'order-lg-1 order-2 mt-lg-0 mt-4',
      imgOrderClass: 'order-lg-2 order-1 mb-lg-0 mb-4',
      imageClass: '',
      imageAlt: '',
      image: '/assets/lifetime-sale-for-ezylanding-bootstrap-startup-landing-pages.png'
    },
    fourth: {
      title: `We're not stopping there`,
      text: <p className='pitch-row_text'>{`We know how annoying it is to write a new copy for each new project. 
      But that will be a pain of the past for EzyLanding users! 
      By Q4 2022 our editor will partner up with the`} <b>GPT-3 API</b> {`which will automatically generate a copy for Your next landing page!`}</p>,
      id: 'landing-pitch-',
      textOrderClass: 'order-2 mt-lg-0 mt-4',
      imgOrderClass: 'order-1 mb-lg-0 mb-4',
      imageClass: '',
      imageAlt: '',
      image: '/assets/ezylanding-gpt-3-api-automatic-html-template-copy-generator-ai.jpg'
    },
  })

  const getFeaturedTemplates = () => {
    const { templates } = props
    return (
      templates.map(template => {
        const { thumbnail, slug, altTag, tags, title, subTitle, frameworkId, _id } = template
        return (
          <div key={_id} className='featured_template'>
            <div className='featured_template_img'>
              <img src={thumbnail} alt={altTag ? altTag : `EzyLanding ${title} preview`} />
            </div>
            <div className='featured_template_body'>
              <div className='feautred_template_meta'>
                <Link href={`/templates/${slug}-${_id}`}>
                  <a className="template-link" title={`Link to ${title} preview page`}>
                    <h3 className="featured_template_title">{title}</h3>
                  </a>
                </Link>
                <span className='featured_template_subtitle'>
                  {subTitle}
                </span>
                <span className='featured_template_tag'>
                  #{frameworkId}
                </span>
                {
                  tags.map((tag, idx) => (
                    <span key={idx} className="featured_template_tag">
                      #{tag}
                    </span>
                  ))
                }
              </div>
            </div>
          </div>
        )
      })
    )
  }

  const getPricingCard = (type, wrapperClass) => {
    const props = {
      wrapperClass, 
      ...prices[type]
    }
    return (
      <PricingCard {...props} />
    )
  }

  const getPitchRow = key => {
    const { title, text, id, video, imageClass, imageAlt, image, textOrderClass, imgOrderClass } = pitch[key]
    return (
      <div className='row pitch-row'>
        <div className={`col-md-12 col-lg-6 ${textOrderClass}`}>
          <div className='pitch-row_wrapper text-wrapper'>
            <h4 className='pitch-row_title'>{title}</h4>
              {text}
          </div>
        </div>
        <div className={`col-md-12 col-lg-6 ${imgOrderClass}`}>
          <div className='pitch-row_wrapper image-wrapper'>
            {
              video ? 
              (
                <video autoPlay muted loop playsInline>
                  <source src={image} type="video/mp4" />
                </video>
              )
              :
              (
                <img className={`pitch-row_image ${imageClass}`} alt={imageAlt} src={image} />
              )
            }
          </div>
        </div>
      </div>
    )
  }

  return (
    <Layout>
    <Head>
      <title>EzyLanding | Beautiful Responsive HTML Webpack Templates</title>
    </Head>
      <section className='landing-section container-fluid first-section section'>
        <div className='row'>
          <div className='col-md-12 col-lg-6 mb-3 mb-lg-0'>
            <div className='section-text-wrapper'>
              <h1 className='title heading heading-lg'>Get a beautiful landing page for your next <span className='text-main'>Project</span> in minutes!</h1>
              <p className='subtitle text-gray'>Need a landing page for Your new project? We can help! At EzyLanding You will find HTML templates that You can deploy with just a few clicks!</p>
            </div>
          </div>
          <div className='col-md-12 order-1 order-lg-2 col-lg-6'>
            <img src='/assets/bootstrap-startup-html-template-gallery-preview.png' className='preview-gif' />
          </div>
        </div>
        <div className='patterns-small-right bg-pattern' />
        <div className='patterns-small-left bg-pattern' />
      </section>
      <section className='landing-section container-fluid section featured'>
        <div className='row'>
          <div className='col-12 mb-3'>
            <h3 className='title'>
              Featured Templates
              <Link href={`/templates`}>
                <a className='section_link' title={`Link to all the HTML templates available on EzyLanding`}>
                  View all
                </a>
              </Link>
            </h3>
          </div>
          <div className='col-12'>
            <div className='featured-templates-row'>
              {getFeaturedTemplates()}
            </div>
          </div>
        </div>
      </section>
      <section className='landing-section container-fluid section landing-pricing'>
        <div className='row'>
          <div className='col-12 mb-3'>
            <h3 className='title text-center heading heading-md'>How much do our <span className="text-main">HTML templates</span> cost?</h3>
          </div>
          <div className='col-md-12 col-lg-5 offset-0 offset-lg-1'>
            {getPricingCard('raw', 'raw-card')}
          </div>
          <div className='col-md-12 col-lg-5 offset-0 offset-lg-0 mt-5 mt-lg-0'>
            {getPricingCard('webpack', 'webpack-card')}
          </div>
        </div>
      </section>
      <section className='landing-section container-fluid section landing-pitch'>
        <div className='row'>
          <div className='col-12 mb-3'>
            <h3 className='title text-center heading heading-md'>What's in store for <span className="text-main">EzyLanding</span>?</h3>
            <p className='subheading text-center text-gray'>EzyLanding will not be just another HTML template marketplace. Here's what we have planned:</p>
          </div>
        </div>
        {getPitchRow('first')}
        {getPitchRow('second')}
        {getPitchRow('third')}
        {getPitchRow('fourth')}
        <div className='patterns-small-right bg-pattern' />
        <div className='patterns-small-bottom-right bg-pattern' />
        <div className='patterns-small-mid-left bg-pattern' />
        <div className='row buttons'>
          <div className='col-12'>
            <h3 className='title text-center heading heading-md'>
              Want to know what else we get up to?
            </h3>
            <div className='pitch-buttons center-content'>
              <Link href={'https://twitter.com/ezylanding'}>
                <a className='contact-btn twitter' target="_blank" title="The official EzyLanding Twitter account">
                  {'💙'} On Twitter
                </a>
              </Link>
              <Link href={'/roadmap'}>
                <a className='contact-btn roadmap' target="_blank" title="EzyLanding product roadmap">
                  {'👀'} At Roadmap
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}


export const getServerSideProps = async ({ req }) => {
  const { host } = absoluteUrl(req, req.headers.host);
  const res = await fetch(`http://${host}/templates/featured-templates`)
  const { templates } = await res.json()
  return { props: { templates } }
}


export default Index