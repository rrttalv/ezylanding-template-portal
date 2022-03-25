import Link from 'next/link'
import Layout from '../components/Layout'

const Index = () => (
  <Layout>
    <section className='landing-section bg-main container-fluid first-section section'>
      <div className='row'>
        <div className='col-md-12 order-2 order-lg-1 col-lg-6 mt-5 mt-lg-0'>
          <div className='section-text-wrapper'>
            <h1 className='title text-white'>Build And Deploy <span className='text-secondary light'>Beautiful</span> Landing Pages In Minutes</h1>
            <p className='subtitle text-light'>Set up a landing page for your next project in just a few minutes!</p>
            <p className='subtitle text-light'>All of our templates are pre-styled, responsive, and customizeable!</p>
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
      <div className='overflowing-item' />
    </section>
  </Layout>
)

export default Index