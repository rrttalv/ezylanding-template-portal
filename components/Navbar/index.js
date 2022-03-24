import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  
  
  return (
    <nav>
      <div className='navbar'>
        <Link href="/">
          <a title="EzyLanding homepage">
            Home
          </a>
        </Link>
        <Link href="/templates">
          <a title="EzyLanding HTML templates">
            Templates
          </a>
        </Link>
      </div>
    </nav>
  )

}

export default Navbar