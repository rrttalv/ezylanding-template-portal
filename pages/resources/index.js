import Head from "next/head"
import Link from "next/link"
import Layout from '../../components/Layout'
import PageCTA from '../../components/PageCTA'
import { useEffect, useState } from "react"
import Book from '../../assets/book.svg'
import Tools from '../../assets/tools.svg'
import Sidebar from "../../components/Sidebar"

const Resources = (props) => {

  const [resourceList] = useState({
    images: [
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
              {' '}have hundreds of thousands of stock photos in their photo gallery. All the photos on Pexels can be used or modified for free without attributing the authors.
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
      }
    ],
    tools: [
      {
        id: 'colorspace',
        title: 'ColorSpace - Palette & Gradient Generator',
        description: (
          <>
            <p className="resource-meta">
              Trying to figure out a color scheme for your landing page?{' '}
              <Link href={'https://mycolor.space/'}>
                <a 
                  target='_blank' 
                >
                ColorSpace
                </a>
              </Link>
              {' '}is the tool for you! With ColorSpace you can generate matching palettes and gradients in just seconds.
            </p>
            <img 
            className="resource-image" 
            src={'/assets/resources/html-template-free-gradient-generator-landing-page.jpg'} 
            alt='Preview of the ColorSpace platform functionalities on a bright purple and blue background' 
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
              {' '}is a free tool that you can use to visually build gradients. CSS Gradient also has insiprational content that can help you create the perfect gradient for your landing page!
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
              {' '}is a CSS library that makes it easier to create a responsive websites. Haven't heard of Bootstrap? It is only the most popular open-source front-end CSS library.
              Boostrap includes mixins, CSS variables, a grid system, and prebuilt components which can significantly reduce development time.
            </p>
            <img 
              className="resource-image" 
              src={'/assets/bootstrap-5-logo-most-popular-css-framework-for-html-landing-pages.jpg'} 
              alt='Bootstrap CSS open source library logo on a white background' 
            />
          </>
        )
      }
    ],
    icons: [
      {
        id: 'freeicons',
        title: 'Freeicons - Free & Paid SVG Icons',
        description: (
          <>
            <p className="resource-meta">
              <Link href={'https://freeicons.io/'}>
                <a 
                  target='_blank' 
                >
                Freeicons.io
                </a>
              </Link>
              {' '}hosts a massive icon library with tens of thousands of icons. With a paid plan you can use any of their icons without crediting the icon authors.
            </p>
            <img 
            className="resource-image" 
            src={'/assets/resources/free-vector-icons-for-landing-page-html-template.jpg'} 
            alt="Freeicons.io logo on a large light blue background" 
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
              {' '}has a library of 1900+ vector icons that you can download as a zip file or export to Figma and use on your landing page for free!
            </p>
            <img 
            className="resource-image" 
            src={'/assets/tabler-icons-free-svg-icons-for-startup-landing-pages.png'} 
            alt='Tabler icons logo surrounded with multiple svg icons on the background' 
          />
          </>
        )
      },
    ],
    illustrations: [
      {
        id: 'undraw',
        title: 'UnDraw - Free customizeable vector illustrations',
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
              {' '}has a massive library of free SVG illustrations. UnDraw's illustration library is frequently updated. It's extremely easy to color match UnDraw illustrations thanks to their integrated intuitive color picker. 
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
              {' '}you will find many free and paid vector illustration collections and icon packs that make your landing page look apart. DrawKit illustrations and vector icons are optimized and ready to be used directly in your website's HTML.
            </p>
            <img 
            className="resource-image" 
            src={'/assets/drawkit-logo-free-and-paid-illustrations-for-landing-page-templates.png'} 
            alt='DrawKit logo on a transparent background' 
          />
          </>
        )
      },
    ]
  })

  const [sidebarContent] = useState([
    {
      linkPath: '/resources',
      icon: <Tools />,
      label: 'Resources',
      subLinks: [
        {
          linkPath: `/resources#images`,
          label: 'Images'
        },
        {
          linkPath: `/resources#tools`,
          label: 'HTML & CSS Tools'
        },
        {
          linkPath: `/resources#illustrations`,
          label: 'Vector Illustrations'
        },
        {
          linkPath: `/resources#icons`,
          label: 'SVG Icons'
        }
      ]
    },
    {
      linkPath: '/documentation',
      icon: <Book />,
      label: 'Documentation'
    }
  ])
  
  const getResourceRows = (list, id, title, className = '') => {
    return (
      <section id={id} className={`resource${className}`}>
        <div className="row" style={{ paddingTop: '80px' }}>
          <div className="col-12">
            <h3 className="text-main heading">
              {title}
            </h3>
          </div>
        </div>
        {
          list.map(item => {
            const { title, description } = item
            return (
              <div key={item.id} className="resource-row">
                <div className="row">
                  <div className="col-12">
                    <h5 className="heading">{title}</h5>
                    {description}
                  </div>
                </div>
              </div>
            )
          })
        }
      </section>
    )
  }

  const { images, tools, icons, illustrations } = resourceList
  return (
    <Layout>
      <Head>
        <title>EzyLanding | Landing Page Design Resource List</title>
      </Head>
      <div className="resources d-flex">
        <Sidebar 
          content={sidebarContent}
          className='resources-navigation'
        />
        <div className="resources-wrapper d-flex flex-column">
          <section id="main" className='landing-section container-fluid first-section section resource-header'>
            <div className="section-text-wrapper center">
              <h1 className='title text-main'>Resources & assets</h1>
              <p className="subtitle text-gray">Looking for design resources? Here are the resources we use on a daily basis.</p>
            </div>
          </section>
          <section className="landing-section container-fluid section resource-content">
            {getResourceRows(images, 'images', 'Royalty Free Images')}
            {getResourceRows(tools, 'tools', 'HTML & CSS Tools')}
            {getResourceRows(illustrations, 'illustrations', 'Vector illustrations')}
            {getResourceRows(icons, 'icons', 'SVG Icons', ' no-border')}
            <PageCTA title={"Want more free design resources?"} twitter={'Follow on Twitter'} discord={'Join our Discord'}/>
          </section>
        </div>
      </div>
    </Layout>
  )

}

export default Resources