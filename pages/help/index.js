import Head from "next/head"
import Link from "next/link"
import Layout from '../../components/Layout'
import PageCTA from '../../components/PageCTA'
import { useEffect, useState } from "react"
import Discord from '../../assets/discord.svg'
import LinkSVG from '../../assets/link.svg'
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
        question: 'For how long is my purchase link valid?',
        id: 'q-3',
        answer: `Your purchase link for a template will be valid forever! 
        This means that with said link you will always be able to download the template that you purchased.`,
        open: false
      },
      {
        question: 'Where can I give feedback regarding a template?',
        id: 'q-4',
        answer: `Found a bug in a template or maybe you just want to suggest an edit that made your life easier?
        We are 100% open to feeback. Just send us the template link and your feedback on discord or twitter.`,
        links: [
          {
            href: 'http://localhost:3000/',
            target: '_blank',
            linkText: 'Share feedback on discord'
          },
          {
            href: 'https://twitter.com/ezylanding',
            target: '_blank',
            linkText: 'Share feedback via Twitter'
          }
        ],
        open: false
      },
      {
        question: 'Do all templates have native SCSS support?',
        id: 'q-5',
        answer: `Because SCSS requires Webpack only Webpack templates have SCSS support. Raw HTML templates come with regular CSS files`,
        open: false
      },
      {
        question: 'Where can I host my website?',
        id: 'q-6',
        answer: `Here are the hosting providers our templates will work with 100%`,
        links: [
          {
            href: 'https://netlify.com',
            target: '_blank',
            linkText: 'Netlify (recommended)'
          },
          {
            href: 'https://www.digitalocean.com/',
            target: '_blank',
            linkText: 'DigitalOcean'
          },
          {
            href: 'https://aws.amazon.com/getting-started/hands-on/host-static-website/',
            target: '_blank',
            linkText: 'AWS'
          },
        ],
        open: false
      },
      {
        question: 'When will the drag and drop HTML template editor be launched?',
        id: 'q-7',
        answer: `We are actively working on the drag and drop HTML editor. We expect to launch it by the start of Q3 2022`,
        open: false
      },
      {
        question: "Where's dark mode?",
        id: 'q-8',
        answer: `Coming soon ;)`,
        open: false
      }
    ],
    pricing: [
      {
        question: 'What is the difference between a Webpack HTML template and a regular HTML template?',
        id: 'qp-1',
        answer: `With a regular HTML template you only get the CSS and HTML files after making a purchase. 
        Our Webpack templates have built in SCSS support and they are extremely easy to deploy anywhere.
        If you don't have your own Webpack setup and want to move fast, then we suggest you use our Webpack supported templates`,
        open: false
      },
      {
        question: 'Is there a Monthly/Yearly subscription model?',
        id: 'qp-2',
        answer: `With the launch of our drag and drop HTML editor we expect to launch a monthly, yearly, and a limited time lifetime subscription model.
        With a recurring subscription you will have access to all the available templates and can download or edit any of them.
        The lifetime subscription offer will be available for a limited time only! With a lifetime subscription you will have access
        to all of our current and future templates until the end of time!`,
        open: false,
        links: [
          {
            href: 'https://twitter.com/ezylanding',
            target: '_blank',
            linkText: 'Be the first to know when we launch our lifetime subscriptions!'
          }
        ]
      },
      {
        question: 'How much will a lifetime subscription cost?',
        id: 'qp-3',
        answer: `The lifetime subscription will cost $125. Only 500 lifetime subscriptions will ever be sold. Afterwards we will be switching to a SaaS pricing model.`,
        open: false,
        links: [
          {
            href: 'https://twitter.com/ezylanding',
            target: '_blank',
            linkText: 'Want to get a lifetime subscription? Follow us on Twitter.'
          }
        ]
      },
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
      <div className="row card-row g-0">
        <div className="col-lg-3 col-md-12 mb-3 mb-lg-0">
          <h3 className="faq-card_left-title text-main">
            {type}
          </h3>
        </div>
        <div className="col-lg-9 col-md-12">
          <div className="row faq-card-row g-0">
            {
              data.map((item, idx) => {
                const { question, answer, links, open, id } = item
                return (
                  <div className="col-12" key={question}>
                    <div className="faq-card_content" style={{ borderBottom: idx === data.length - 1 ? 'none' : '' }}>
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
                                links && links.length ? (
                                  <div className="faq-card_content_links">
                                    <LinkSVG />
                                    {
                                      links.map(link => (
                                        <Link key={link.href} href={link.href}>
                                          <a target={link.target} className="faq-card_content_link">
                                            {link.linkText}
                                          </a>
                                        </Link>
                                      ))
                                    }
                                  </div>
                                ) : undefined
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
      <section className='landing-section container-fluid first-section section help-section'>
        <div className="section-text-wrapper center">
          <h1 className='title text-main'>Need a bit of help?</h1>
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
          {getFAQCard('pricing')}
        </div>
        <PageCTA title={"Didn't find what you were looking for?"}/>
      </section>
    </Layout>
  )

}

export default Help