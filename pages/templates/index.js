import Head from "next/head"
import Link from "next/link"
import Layout from '../../components/Layout'
import { useRouter } from 'next/router'

const Templates = (props) => {

  const { templates } = props

  return (
    <Layout>
      <Head>
        <title>Browse EzyLanding HTML Templates</title>
      </Head>
      <section className='landing-section container-fluid first-section section'>
        <div className='row'>
          <div className='col-md-12 order-2 order-lg-1 col-lg-6 mt-5 mt-lg-0'>
            <div className='section-text-wrapper'>
              <h1 className='title text-main'>Discover Awesome HTML Templates</h1>
              <p className='subtitle text-gray'>Set up a landing page for your next project in just a few minutes!</p>
              <p className='subtitle text-gray'>All of our templates are pre-styled, responsive, and customizeable!</p>
            </div>
          </div>
          <div className='col-md-12 order-1 order-lg-2 col-lg-6'>
            <img src='https://ezylanding.com/images/react-vue-free-drag-drop-html-editor-free-html-template-creator.gif' className='preview-gif'>
            </img>
          </div>
        </div>
        <div className='landing-square small decoration mid-left' />
        <div className='landing-square small decoration' />
        <div className='landing-circle large decoration random' />
        <div className='landing-circle large decoration circle-left' />
        <div className='landing-circle large decoration circle-right' />
      </section>
      <section className="templates_list">
        {
          templates.map((item, idx) => (
            <div key={item._id} className="template-item">
              {item.title}
            </div>
          ))
        }
      </section>
    </Layout>
    
  )
}

export const getServerSideProps = async () => {
  const res = await fetch(`http://localhost:3000/templates/templates-list`)
  const { templates } = await res.json()
  return { props: { templates } }
}

export default Templates