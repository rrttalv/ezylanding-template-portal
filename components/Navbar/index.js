import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const Navbar = () => {
  const [navbarClass, setNavbarClass] = useState('bg-light')

  const router = useRouter()

  const listener = () => {
    const top = document.body.scrollTop
    if(top > 80){
      setNavbarClass('bg-dark')
    }else{
      setNavbarClass('bg-light')
    }
  }

  useEffect(() => {
    document.body.addEventListener('scroll', listener)
    return () => document.body.removeEventListener('scroll', listener)
  }, [])

  const getStyle = href => {
    if(router.asPath === href){
      return {
        color: 'var(--main)'
      }
    }
    return {}
  }
  
  return (
    <nav className={`navbar navbar-expand-md fixed-top ${navbarClass}`}>
        <div className="container">
            <Link href="/">
              <a className="navbar-brand me-5">
                <img src="/assets/logo_old_extra-small.png" className="logo" alt="EzyLanding Brand Logo" />
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
                <ul className="nav navbar-nav mb-2 mb-md-0 ms-auto" id="navbar-main">
                    <li className="nav-item me-2">
                      <Link href="/">
                        <a style={getStyle('/')} title="EzyLanding HTML templates browse view" className="nav-link link-dark">Home</a>
                      </Link>
                    </li>
                    <li className="nav-item me-2">
                      <Link href="/templates">
                        <a style={getStyle('/templates')} title="EzyLanding HTML templates browse view" className="nav-link link-dark">Browse Templates</a>
                      </Link>
                    </li>
                    <li className="nav-item me-2">
                      <Link href="/pricing">
                        <a style={getStyle('/pricing')} title="EzyLanding HTML template editor pricing and feature page" className="nav-link link-dark">Pricing</a>
                      </Link>
                    </li>
                    <li className="nav-item me-2">
                      <Link href="/documentation">
                        <a 
                          style={getStyle('/documentation')} 
                          title="EzyLanding help page with a FAQ and tutorials" 
                          className="nav-link link-dark"
                        >
                          Docs
                        </a>
                      </Link>
                    </li>
                    <li className="nav-item me-2">
                      <Link href="/help">
                        <a 
                          style={getStyle('/help')} 
                          title="EzyLanding help page with a FAQ and tutorials" 
                          className="nav-link link-dark"
                        >
                          Help
                        </a>
                      </Link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
  )

}

export default Navbar