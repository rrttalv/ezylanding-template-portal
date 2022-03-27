import Link from 'next/link'
import Layout from '../components/Layout'

const Index = (props) => {

  const getFeaturedTemplates = () => {
    const { templates } = props
    return (
      templates.map(template => {
        const { thumbnail, altTag, tags, title, subTitle, frameworkId, _id } = template
        return (
          <div key={_id} className='featured_template'>
            <div className='featured_template_img'>
              <img src={thumbnail} alt={altTag ? altTag : `EzyLanding ${title} HTML template preview`} />
            </div>
            <div className='featured_template_body'>
              <div className='feautred_template_meta'>
                <Link href={`/templates/${_id}`}>
                  <a className="template-link" title={`Link to ${title} HTML template preview page`}>
                    <h3 className="featured_template_title">{title}</h3>
                  </a>
                </Link>
                <span className='featured_template_subtitle'>
                  {subTitle}
                </span>
                <span className='featured_template_tag'>
                  #{frameworkId}
                </span>
                {
                  tags.map((tag, idx) => (
                    <span key={idx} className="featured_template_tag">
                      #{tag}
                    </span>
                  ))
                }
              </div>
            </div>
          </div>
        )
      })
    )
  }

  return (
    <Layout>
      <section className='landing-section container-fluid first-section section'>
        <div className='row'>
          <div className='col-md-12 order-2 order-lg-1 col-lg-6 mt-5 mt-lg-0'>
            <div className='section-text-wrapper'>
              <h1 className='title'>Build And Deploy <span className='text-main'>Beautiful</span> Landing Pages In Minutes</h1>
              <p className='subtitle text-gray'>Set up a landing page for your next project in just a few minutes!</p>
              <p className='subtitle text-gray'>All of our templates are pre-styled, responsive, and customizeable!</p>
            </div>
          </div>
          <div className='col-md-12 order-1 order-lg-2 col-lg-6'>
            <img src='https://ezylanding.com/images/react-vue-free-drag-drop-html-editor-free-html-template-creator.gif' className='preview-gif'>
            </img>
          </div>
        </div>
        <div className='patterns-small-right bg-pattern' />
        <div className='patterns-small-left bg-pattern' />
      </section>
      <section className='landing-section container-fluid section featured'>
        <div className='row'>
          <div className='col-12 mb-3'>
            <h3 className='title'>
              Featured Templates
              <Link href={`/templates`}>
                <a className='section_link' title={`Link to all the HTML templates available on EzyLanding`}>
                  View all
                </a>
              </Link>
            </h3>
          </div>
          <div className='col-12'>
            <div className='featured-templates-row'>
              {getFeaturedTemplates()}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}


export const getServerSideProps = async () => {
  const res = await fetch(`${process.env.APP_URL}/templates/featured-templates`)
  const { templates } = await res.json()
  return { props: { templates } }
}


export default Index