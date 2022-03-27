import Head from "next/head"
import Link from "next/link"
import Layout from '../../components/Layout'
import { useEffect, useState } from "react"
import Discord from '../../assets/discord.svg'
import Caret from '../../assets/caret-down.svg'

const Help = (props) => {

  const [cardContent] = useState({
    docs: {
      heading: 'Read the docs',
      subheading: 'Feeling a bit lost? No worries! Check out our documentation to get some guidance.',
      className: 'docs-card',
      linkTitle: 'Link to the official EzyLanding documentation page',
      target: '_blank',
      img: 'https://ezylanding-user-assets.s3.amazonaws.com/templates/9752d48e-29eb-4d75-9f79-a26f86016a39_thumb.jpeg',
      href: '/',
      imgAlt: 'Preview of the EzyLanding documentation page',
      buttonText: 'View docs'
    },
    community: {
      heading: 'Contact us via Discord',
      className: 'discord-card',
      target: '_blank',
      linkTitle: 'Link to join the official EzyLanding discord server',
      subheading: `We are always active on Discord! Don't be afraid to message us!`,
      img: 'https://www.svgrepo.com/show/331368/discord-v2.svg',
      imgAlt: 'Preview of the EzyLanding discord server',
      href: '/',
      buttonText: 'Join The Discord'
    }
  })

  const [FAQ, setFAQ] = useState({
    general: [
      {
        question: 'What frontend CSS libraries does EzyLanding support?',
        id: 'q-1',
        answer: 'Currently you can find HTML templates that utilize the following CSS frameworks: Bootstrap 5 & Foundation 6',
        links: [
          {
            href: 'https://twitter.com/ezylanding',
            target: '_blank',
            linkText: 'Want to make a suggestion? Tweet it at us!'
          }
        ],
        open: false
      },
      {
        question: 'What is the difference between a Webpack HTML template and a regular HTML template?',
        id: 'q-2',
        answer: `With a regular HTML template you only get the CSS and HTML files after making a purchase. 
        Our Webpack templates have built in SCSS support and they are extremely easy to deploy anywhere.
        If you don't have your own Webpack setup and want to move fast, then we suggest you use our Webpack supported templates`,
        open: false
      },
      {
        question: 'For how long is my purchase link valid?',
        id: 'q-3',
        answer: 'asd',
        open: false
      },
      {
        question: 'Where can I give feedback regarding a template?',
        id: 'q-4',
        answer: '',
        links: [
          {
            href: 'http://localhost:3000/',
            target: '_blank',
            linkText: 'Share feedback on our discord server'
          },
          {
            href: 'https://twitter.com/ezylanding',
            target: '_blank',
            linkText: 'Share feedback on our discord server'
          }
        ],
        open: false
      }
    ],
    pricing: [
      {

      }
    ],
    misc: [
      {

      }
    ]
  })

  const getCard = type => {
    const { heading, className, linkTitle, imgAlt, icon, subheading, img, href, target, buttonText } = cardContent[type]
    return (
      <div key={className} className={`bg-dark section-card ${className}`}>
        <Link href={href}>
          <a target={target} title={linkTitle}>
            <div className="section-card_header">
              <h3 className="section-card_header_title">{heading}</h3>
              <p className="section-card_header_subheading">{subheading}</p>
            </div>
            <div className="section-card_body">
              {img ? <img className="section-card_body_image" src={img} alt={imgAlt} /> : (icon)}
            </div>
            <div className="section-card_footer">
              <button className={`${className}_button`}>
                {buttonText}
              </button>
            </div>
          </a>
        </Link>
      </div>
    )
  }

  const toggleCard = (e, type, id) => {
    e.preventDefault()
    const copy = {...FAQ}
    const copyItems = copy[type].map(item => {
      console.log(item, id)
      if(item.id === id){
        return {
          ...item,
          open: !item.open
        }
      }else{
        return {
          ...item
        }
      }
    })
    copy[type] = copyItems
    setFAQ(copy)
  }

  const getFAQCard = type => {
    const data = FAQ[type]
    return (
      <div className="row mb-3 card-row g-0">
        <div className="col-lg-3 col-md-12 mb-3 mb-lg-0">
          <h3 className="faq-card_left-title text-main">
            {type}
          </h3>
        </div>
        <div className="col-lg-9 col-md-12">
          <div className="row faq-card-row g-0">
            {
              data.map(item => {
                const { question, answer, links, open, id } = item
                return (
                  <div className="col-12" key={question}>
                    <div className="faq-card_content">
                      <div className="faq-card_content_header">
                        <button className="btn-none" onClick={e => toggleCard(e, type, id)}>
                          <h5 className="faq-card_content_header_title">{question} <Caret style={{ transform: `${open ? 'rotate(180deg)' : 'rotate(0)'}` }} /></h5>
                        </button>
                        {
                          open ? (
                            <div className="faq-card_content_body">
                              <p className="faq-card_content_body_text">
                                {answer}
                              </p>
                              {
                                links && links.length ? undefined : undefined
                              }
                            </div>
                          ) : undefined
                        }
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    )
  }

  return (
    <Layout>
      <section className='landing-section container-fluid first-section section'>
        <div className="section-text-wrapper center">
            <h1 className='title text-main mb-0'>Need a bit of help?</h1>
            <p className="subtitle text-gray">Hopefully these resources help you</p>
        </div>
        <div className="section-cards">
          <div className="row">
            <div className="col-sm-12 offset-0 col-md-10 offset-md-1 offset-lg-0 col-lg-6">
              <div className='card-wrapper-right'>
                {getCard('docs')}
              </div>
            </div>
            <div className="col-sm-12 offset-0 col-md-10 offset-md-1 offset-lg-0 col-lg-6">
              <div className='card-wrapper-left'>
                {getCard('community')}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="landing-section container-fluid section faq-section">
        <div className="section-text-wrapper center">
          <h1 className="title text-dark">
            Frequently Asked Questions
          </h1>
        </div>
        <div className="faq-cards">
          {getFAQCard('general')}
        </div>
      </section>
    </Layout>
  )

}

export default Help