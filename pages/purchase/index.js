import Link from 'next/link'
import Layout from '../../components/Layout'
import absoluteUrl from "next-absolute-url";

const Purchase = (props) => {

  const { status, template, message } = props  


  const getErrorView = () => (
    <div className='row'>
      <div className='col-lg-8 col-md-12 offset-lg-2 offset-0'>
        <div className='purchase-page_err'>
          <h1>Oof... something's wrong 🤷😞</h1>
          <span className='warning'>
            Message from server:
          </span>
          <span className='server-msg'>
            {message}
          </span>
        </div>
      </div>
    </div>
  )
  
  return (
    <Layout>
      <section className='container-fluid purchase-page'>
        {
          !status ? (getErrorView()) : (
            <>
              <div className='row'>
                <div className='col-lg-8 col-md-12 offset-lg-2 offset-0'>
                  <h1>Purchase complete! 😍</h1>
                </div>
              </div>
              <div className='center-content'>
                <img src='https://i.giphy.com/media/1wX5TJZPqVw3HhyDYn/giphy.webp' className='purchase-page_sticker' />
              </div>
              <div className='row'>
                <div className='col-lg-8 col-md-12 offset-lg-2 offset-0'>
                  <div className='purchase-page_meta-wrapper'>
                    <span className='purchase-page_meta ty'>
                      Thanks for trusting <span className='highlighted'>EzyLanding</span>{'❤️'}!
                    </span>
                    <Link href={template.downloadURL}>
                      <a className='download-btn' target={"_blank"}>
                        Download template
                      </a>
                    </Link>
                    <span className='purchase-page_meta help-text'>
                      Need help setting up your project? <br /> Get in touch with us on <a href="https://twitter.com/ezylanding" target={"_blank"}>Twitter</a>
                    </span>
                  </div>  
                </div>
              </div>
            </>
          )
        }
      </section>
    </Layout>
  )

}

export const getServerSideProps = async ({ query: { purchaseId, paymentIntentId } }) => {
  const { origin } = absoluteUrl(req, req.headers.host);
  const res = await fetch(`http://${origin}/purchase/download?purchaseId=${purchaseId}&paymentIntentId=${paymentIntentId}`)
  const { status, template, message } = await res.json()
  return { props: { status, template, message  } }
}

export default Purchase