import Link from 'next/link'
import React from 'react'
import { useRouter } from 'next/router'

const Navbar = () => {
  
  const router = useRouter()

  const getStyle = href => {
    if(router.asPath === '/'){
      return {
        color: 'var(--light)'
      }
    }
    return {
      color: router.asPath === href ? 'var(--main)' : 'var(--dark)',
    }
  }
  
  return (
    <header>
      <nav className="navbar navbar-expand-md py-3">
          <div className="container">
              <Link href="/">
                <a className="navbar-brand me-5">
                  <img src="https://ezylanding-user-assets.s3.amazonaws.com/brand/logo_old_medium.png" className="logo" alt="EzyLanding Brand Logo" />
                </a>
              </Link>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse"
                  aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                  <div className="navbar-toggle">
                      <span></span>
                      <span></span>
                      <span></span>
                  </div>
              </button>
              <div className="collapse navbar-collapse" id="navbarCollapse">
                  <ul className="nav navbar-nav me-auto mb-2 mb-md-0" id="navbar-main">
                      <li className="nav-item me-5">
                        <Link href="/templates">
                          <a style={getStyle('/templates')} title="EzyLanding HTML templates browse view" className="nav-link link-dark">Browse Templates</a>
                        </Link>
                      </li>
                      <li className="nav-item me-5">
                        <Link href="/features">
                          <a style={getStyle('/features')} title="EzyLanding HTML and React template editor feature list" className="nav-link link-dark">Features</a>
                        </Link>
                      </li>
                  </ul>
              </div>
          </div>
      </nav>
    </header>
  )

}

export default Navbar