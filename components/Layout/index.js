import Navbar from '../Navbar'
import Footer from '../Footer'
import { useEffect } from 'react';

const Layout = props => {

  useEffect(() => {
    document.body.scrollTo(0, 0)
  }, []);

  return (
    <div className="layout">
      <Navbar />
      <div className='layout_content'>
        {props.children}
      </div>
      <Footer />
    </div>
  )
}

export default Layout