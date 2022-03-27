import Link from 'next/link'
import React, { useState } from 'react'

const Footer = () => {
  
  const [linkList] = useState({
    product: [
      {
        link: '/templates',
        title: 'Link to EzyLanding HTML templates page',
        content: 'Templates'
      },
      {
        link: '/pricing',
        title: 'Link to EzyLanding pricing page',
        content: 'Pricing'
      },
      {
        link: '/roadmap',
        title: 'Link to EzyLanding product roadmap page',
        content: 'Roadmap'
      },
      {
        link: '/docs',
        title: 'Link to EzyLanding HTML template documentation page',
        content: 'Docs'
      }
    ],
    support: [
      {
        link: '/about',
        title: 'Link to EzyLanding about us page',
        content: 'About'
      },
      {
        link: '/contact',
        title: 'Link to EzyLanding support contact page',
        content: 'Contact'
      },
      {
        link: '/privacy',
        title: 'Link to EzyLanding privacy policy',
        content: 'Privacy Policy'
      },
      {
        link: '/terms',
        title: 'Link to EzyLanding privacy policy',
        content: 'Terms of service'
      },
    ]
  })

  const getLinks = (id) => {
    const list = linkList[id]
    return (
      list.map(item => (
        <li key={item.link} className='footer_links_link-wrapper'>
          <Link href={item.link}>
            <a className='footer_links_link' title={item.title}>
              {item.content}
            </a>
          </Link>
        </li>
      ))
    )
  }
  
  return (
    <footer>
      <div className='footer bg-dark'>
        <div className='row'>
          <div className='col-lg-3 col-md-12'>
            <div className='footer-left'>
              <Link href={'/'}>
                <a className='footer-img-link' title={"Link to EzyLanding home page"}>
                  <img className='footer-img' src={'https://ezylanding-user-assets.s3.amazonaws.com/brand/logo_old_medium.png'} />
                </a>
              </Link>
              <span>Built with ❤️ by real web-designers</span>
            </div>
          </div>
          <div className='col-lg-3 col-md-6 col-xs-12 mt-4 mt-lg-0'>
            <div className='footer_list-wrapper'>
              <h5 className='footer_title'>Product</h5>
              <ul className='footer_links'>
                {getLinks('product')}
              </ul>
            </div>
          </div>
          <div className='col-lg-3 col-md-6 col-xs-12 mt-4 mt-lg-0'>
            <div className='footer_list-wrapper'>
              <h5 className='footer_title'>Support</h5>
              <ul className='footer_links'>
                {getLinks('support')}
              </ul>
            </div>
          </div>
          <div className='col-lg-3 col-md-12 mt-4 mb-4 mt-lg-0 mb-lg-0'>
            <h5 className='footer_title text-lg-right text-center'>
              Let's stay in touch
            </h5>
          </div>
        </div>
        <div className='patterns-small right light bg-pattern' />
        <div className='patterns-small left light bg-pattern d-none d-lg-block' />
      </div>
    </footer>
  )

}

export default Footer