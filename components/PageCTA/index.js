import Link from 'next/link'
import React from 'react'

const PageCTA = props => {

  const { title } = props

  return (
    <div className="page-cta">
      <div className="page-cta_body">
        <h3>{title}</h3>
        <div className="page-cta_body_buttons">
          <Link href={'https://twitter.com/ezylanding'}>
            <a className="contact-btn twitter" target={'_blank'} title="Link to the official EzyLanding Twitter account">
              DM on Twitter
            </a>
          </Link>
          <Link href={'http://localhost:3000/'}>
            <a className="contact-btn discord" target={'_blank'} title="Link to the official EzyLanding Twitter account">
              Join Discord
            </a>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PageCTA