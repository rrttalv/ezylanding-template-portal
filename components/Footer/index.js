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
        link: '/help',
        title: 'Link to EzyLanding HTML template FAQ & help page',
        content: 'Help & FAQ'
      }
    ],
    company: [
      {
        link: '/roadmap',
        title: 'Link to EzyLanding product roadmap page',
        content: 'Roadmap'
      },
      {
        link: '/resources',
        title: 'The resources we use to design our HTML templates',
        content: 'Resources'
      },
      {
        email: true,
        content: 'Email',
        title: 'EzyLanding email address',
        link: 'mailto:info@ezylanding.com'
      },
    ],
    legal: [
      {
        link: '/privacy',
        title: 'Link to EzyLanding website & platform privacy policy',
        content: 'Privacy Policy'
      },
      {
        link: '/terms',
        title: 'Link to EzyLanding website & platform terms of service',
        content: 'Terms of service'
      },
      {
        link: '/license',
        title: 'Link to EzyLanding HTML template usage license',
        content: 'License'
      },
    ],
    contact: [
      {
        link: 'https://discord.gg/YnfrmSATG6',
        title: 'Link to join the EzyLanding discord server',
        target: '_blank',
        content: 'Discord'
      },
      {
        link: 'https://twitter.com/ezylanding?v=1',
        title: 'Link to EzyLanding official Twitter account',
        target: '_blank',
        content: 'Twitter'
      }
    ]
  })

  const getLinks = (id) => {
    const list = linkList[id]
    return (
      list.map(item => (
        <li key={item.link} className='footer_links_link-wrapper'>
          <Link href={item.link}>
            <a target={item.target ? item.target : '_self'} className='footer_links_link' title={item.title}>
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
        <div className='row g-0 py-0'>
          <div className='col-lg-3 order-5 order-lg-0 mt-5 mt-lg-0 col-md-12'>
            <div className='footer-left'>
              <Link href={'/'}>
                <a className='footer-img-link' title={"Link to EzyLanding home page"}>
                  <img className='footer-img' src={'https://ezylanding-user-assets.s3.amazonaws.com/brand/logo_old_medium.png'} />
                </a>
              </Link>
              <span>Built with ❤️ by real web-designers</span>
              <span className='copyright'>
                Copyright © {new Date().getFullYear()} North Oak OÜ.
                <br />
                All rights reserved.
              </span>
            </div>
          </div>
          <div className='col-lg-2 col-md-6 col-xs-12 mt-4 mt-lg-0'>
            <div className='footer_list-wrapper'>
              <h5 className='footer_title'>Product</h5>
              <ul className='footer_links'>
                {getLinks('product')}
              </ul>
            </div>
          </div>
          <div className='col-lg-2 col-md-6 col-xs-12 mt-4 mt-lg-0'>
            <div className='footer_list-wrapper'>
              <h5 className='footer_title'>Company</h5>
              <ul className='footer_links'>
                {getLinks('company')}
              </ul>
            </div>
          </div>
          <div className='col-lg-2 col-md-6 col-xs-12 mt-4 mt-lg-0'>
            <div className='footer_list-wrapper'>
              <h5 className='footer_title'>contact</h5>
              <ul className='footer_links'>
                {getLinks('contact')}
              </ul>
            </div>
          </div>
          <div className='col-lg-3 col-md-6 col-xs-12 mt-4 mt-lg-0'>
            <div className='footer_list-wrapper'>
              <h5 className='footer_title'>Legal</h5>
              <ul className='footer_links'>
                {getLinks('legal')}
              </ul>
            </div>
          </div>
        </div>
        <div className='patterns-small right light bg-pattern' />
        <div className='patterns-small left light bg-pattern d-none d-lg-block' />
      </div>
    </footer>
  )

}

export default Footer