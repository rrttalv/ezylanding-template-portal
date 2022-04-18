import Navbar from '../Navbar'
import Footer from '../Footer'

const Layout = props => {
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