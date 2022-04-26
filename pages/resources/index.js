import Head from "next/head"
import Link from "next/link"
import Layout from '../../components/Layout'
import PageCTA from '../../components/PageCTA'
import { useEffect, useState } from "react"
import Book from '../../assets/book.svg'
import Tools from '../../assets/tools.svg'
import Sidebar from "../../components/Sidebar"

const Resources = (props) => {

  //https://mycolor.space/

  const [resourceList] = useState([
    {
      id: 'pexels',
      title: 'Pexels - Free stock photos',
      description: (
        <>
          <p className="resource-meta">
            <Link href={'https://www.pexels.com'}>
              <a 
                target='_blank' 
              >
              Pexels
              </a>
            </Link>
            {' '}have hundreds of thousands of stock photos in their photo gallery. All the photos on Pexels are free to use and modify without attributing the authors.
          </p>
          <img 
          className="resource-image" 
          style={{
            objectPosition: 'bottom'
          }}
          src={'/assets/pexels-cover-image-free-stock-photos-for-HTML-templates.jpg'} 
          alt='Pexels.com logo with a nice beach in the background' 
        />
        </>
      )
    },
    {
      id: 'cssgradient',
      title: 'CSS Gradient - CSS Gradient tool',
      description: (
        <>
          <p className="resource-meta">
            <Link href={'https://cssgradient.io/'}>
              <a 
                target='_blank' 
              >
              CSS Gradient
              </a>
            </Link>
            {' '}CSS Gradient is a free tool that you can use to visually style and modify your CSS gradient. CSS Gradient also has insiprational content that can help you create the perfect gradient for your startup!
          </p>
          <img 
          className="resource-image" 
          src={'/assets/css-gradient-html-gradient-generator.png'} 
          alt='Preview image of the CSS Gradient website and platform' 
        />
        </>
      )
    },
    {
      id: 'tabler',
      title: 'Tabler Icons - Free SVG icons',
      description: (
        <>
          <p className="resource-meta">
            <Link href={'https://tabler-icons.io/'}>
              <a 
                target='_blank' 
              >
              Tabler Icons
              </a>
            </Link>
            {' '}has a library of 1900+ vector icons that you can download as a zip file or export to Figma and use on your startup landing page template.
          </p>
          <img 
          className="resource-image" 
          src={'/assets/tabler-icons-free-svg-icons-for-startup-landing-pages.png'} 
          alt='Tabler icons logo surrounded with multiple svg icons on the background' 
        />
        </>
      )
    },
    {
      id: 'undraw',
      title: 'UnDraw - Free customizeable SVG illustrations',
      description: (
        <>
          <p className="resource-meta">
            <Link href={'https://undraw.co/illustrations'}>
              <a 
                target='_blank' 
                rel='nofollow'
              >
              UnDraw
              </a>
            </Link>
            {' '}has a massive library of free SVG illustrations that is updated on a daily basis. It's extremely easy to color-match UnDraw icons thanks to their integrated intuitive color picker. 
          </p>
          <img 
          className="resource-image" 
          src={'/assets/undraw-logo-free-svg-vectors-for-startups.png'} 
          alt='Undraw logo next to a female vector character standing inside an iPhone frame' 
        />
        </>
      )
    },
    {
      id: 'drawkit',
      title: 'DrawKit - Free & Paid illustrations and icons',
      description: (
        <>
          <p className="resource-meta">
            At{' '}
            <Link href={'https://drawkit.com/'}>
              <a target='_blank' rel='nofollow'>
              DrawKit 
              </a>
            </Link>
            {' '}you will find many free and paid vector illustration collections and icon packs that can make your startup landing page look apart. DrawKit illustrations and vector icons are optimized and ready to be used directly in your HTML.
          </p>
          <img 
          className="resource-image" 
          src={'/assets/drawkit-logo-free-and-paid-illustrations-for-landing-page-templates.png'} 
          alt='DrawKit logo on a transparent background' 
        />
        </>
      )
    },
    {
      id: 'bootstrap',
      title: 'Bootstrap - Most popular CSS Framework',
      description: (
        <>
          <p className="resource-meta">
            <Link href={'https://getbootstrap.com/docs/5.1/getting-started/introduction/'}>
              <a target='_blank' rel='nofollow'>
                Bootstrap 
              </a>
            </Link>
            {' '}is a CSS library for developers to easily create responsive websites with ease. Haven't heard of Bootstrap? It is the most popular open-source front-end CSS library.
            Boostrap includes mixins and CSS variables, a grid system and prebuilt components that significantly reduce development time.
          </p>
          <img 
            className="resource-image" 
            src={'/assets/bootstrap-5-logo-most-popular-css-framework-for-html-landing-pages.jpg'} 
            alt='Bootstrap CSS open source library logo on a white background' 
          />
        </>
      )
    }
  ])

  const [sidebarContent] = useState([
    {
      linkPath: '/resources',
      icon: <Tools />,
      label: 'Resources' 
    },
    {
      linkPath: '/documentation',
      icon: <Book />,
      label: 'Documentation'
    }
  ])
  
  const getResourceRows = () => {
    return (
      resourceList.map(item => {
        const { title, description } = item
        return (
          <div className="resource-row">
            <div key={item.id} className="row">
              <div className="col-12">
                <h3 className="heading text-main">{title}</h3>
                {description}
              </div>
            </div>
          </div>
        )
      })
    )
  }

  return (
    <Layout>
      <Head>
        <title>EzyLanding | Landing Page Design Resource List</title>
      </Head>
      <div className="resources d-flex flex-row">
        <Sidebar 
          content={sidebarContent}
          className='resources-navigation'
        />
        <div className="resources-wrapper d-flex flex-column">
          <section className='landing-section container-fluid first-section section resource-header'>
            <div className="section-text-wrapper center">
              <h1 className='title text-main'>Resources & assets</h1>
              <p className="subtitle text-gray">Looking for design resources? Here are the resources we use on a daily basis.</p>
            </div>
          </section>
          <section className="landing-section container-fluid section resource-content">
            {getResourceRows()}
          </section>
        </div>
      </div>
    </Layout>
  )

}

export default Resources