import Head from "next/head"
import Link from "next/link"
import Layout from '../../components/Layout'
import PageCTA from '../../components/PageCTA'
import { useEffect, useState } from "react"
import Discord from '../../assets/discord.svg'
import LinkSVG from '../../assets/link.svg'
import Caret from '../../assets/caret-down.svg'

const Privacy = (props) => {

  return (
    <Layout>
      <section className='landing-section container-fluid first-section section'>
        <div className="section-text-wrapper center">
          <h1 className='title text-main text-center'>EzyLanding privacy policy</h1>
          <span className="text-gray semibold">Last updated April 21 2022</span>
        </div>
      </section>
      <section className="container-fluid section pb-xxl">
        <div className="row">
          <div className="col-12 mb-3">
            <p className="text-gray">
              We at North Oak OÜ ('EzyLanding', 'Company', 'we', 'us', 'our') are committed to protecting your personal information 
              and your right to privacy.
            </p>
            <p className="text-gray">
            This privacy notice applies to all information collected 
            through our services (which includes our Website), as well as, any services, marketing, etc.
            </p>
          </div>
          <div className="col-12 mb-3">
            <h3 className="bold mb-3">
              1. Information we collect
            </h3>
            <p className="text-gray">
              Personal information you disclose to us: In Short: We collect personal information that you provide to us. 
              We collect personal information that you voluntarily provide to us when you purchase a template, express an interest in 
              obtaining information about us or our products and Services, when you participate in activities on the Website or otherwise when you contact us.
            </p>
            <p className="text-gray">
              We collect email addresses, names, and other payment data. 
              We may collect data necessary to process your payment if you make purchases, 
              such as your payment instrument number (such as a credit card number), and the security code associated with your payment instrument. 
              All payment data is stored by Stripe. Stripe privacy notice link: https://stripe.com/en-ee/privacy.
            </p>
          </div>

          <div className="col-12 mb-3">
            <h3 className="bold mb-3">
              2. Use of collected information
            </h3>
            <p className="text-gray">
              We process your information for purposes based on our business interests. We indicate the specific processing grounds we rely on next to each purpose listed below. 
              We use the information we collect or receive: To facilitate account creation and logon process. 
              If you choose to link your account with us to a third-party account (such as your Google, Github or Twitter), 
              we use the information you allowed us to collect from those third parties to facilitate account creation and logon process for the performance of the contract.
              Fulfill and manage your purchases. We may use your information to fulfill and manage your purchases, payments, returns, and exchanges made via EzyLanding.
            </p>
            <p className="text-gray">
              We collect email addresses, names, and other payment data. 
              We may collect data necessary to process your payment if you make purchases, 
              such as your payment instrument number (such as a credit card number), and the security code associated with your payment instrument. 
              All payment data is stored by Stripe. Stripe privacy notice link: https://stripe.com/en-ee/privacy.
            </p>
          </div>
          
          <div className="col-12 mb-3">
            <h3 className="bold mb-3">
              3. Use of cookies
            </h3>
            <p className="text-gray">
              We use cookies and other tracking technologies like beacons or pixels to collect and store consumer information regarding you.
            </p>
          </div>

          <div className="col-12 mb-3">
            <h3 className="bold mb-3">
              4. How do we store your information
            </h3>
            <p className="text-gray">
              We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process.
            </p>
            <p className="text-gray">
              However no electronic transmission over the internet is 100% safe 
              so we cannot promise or guarantee that malicious third-parties will not be able to access your information.
            </p>
            <p className="text-gray">
              We will do our best to protect your personal information, still, transmission of personal information to and from EzyLanding is at your own risk. 
              You should only access the Website within a secure environment.
            </p>
          </div>

          <div className="col-12 mb-3">
            <h3 className="bold mb-3">
              5. Contact us regarding this privacy policy
            </h3>
            <p className="text-gray">
              If you have questions regarding this privacy policy you can contact us via email at info@ezylanding.com.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  )

}

export default Privacy