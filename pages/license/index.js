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
          <h1 className='title text-main text-center'>EzyLanding HTML template usage license</h1>
          <p className="subtitle text-gray">Here's what you are allowed to do with a template you've purchased from us.</p>
        </div>
      </section>
      <section className="container-fluid section pb-xxl">
        <div className="row">
          <div className="col-12 col-md-10 offset-md-1 offset-0 mb-5">
            <h3 className="bold mb-3">
              License Agreement
            </h3>
            <p className="text-gray">
              This license agreement applies to all HTML templates sold by North Oak OÜ ("EzyLanding", "we", "us", & "our").
            </p>
            <p className="text-gray">
              By purchasing a template you are allowed to use the files that come with the template under the following conditions.
            </p>
            <p className="text-gray">
              Purchased templates can be used by yourself, your organization, or your clients. A modified templated can be sold to a specific client. 
              Templates cannot be freely distributed, licensed or sublicenseed.
            </p>
          </div>
          <div className="col-12 col-md-10 offset-md-1 offset-0 mb-3">
            <h3 className="bold mb-3">
              Template license
            </h3>
            <p className="text-gray">
              All HTML templates sold on EzyLanding can be used for personal use or commercial work. E.g. company projects, 3rd party businesses, etc.
              If you are a part of any kind of organization or enterprise and purchase a template on their behalv, then everyone in the organization 
              is allowed to use the purchased HTML template.
            </p>
            <br />
          </div>
          <div className="col-12 col-md-10 offset-md-1 offset-0 mb-3">
            <h3 className="bold mb-3">
              License terms
            </h3>
            <p className="text-gray">
              Here's what you are <b>allowed to</b> do with a <b>template license</b>:
            </p>
            <ul className="list text-gray mb-4">
              <li>
                Create a product for a client.
              </li>
              <li>
                Make any number of copies of the template.
              </li>
              <li>
                Modify or combine the template with other templates, personal work, or 3rd party projects.
              </li>
              <li>
                Use the template in multiple times in multiple projects.
              </li>
            </ul>
            <br />
            <p className="text-gray">
              Here's what you are <b>not allowed to</b> do with a <b>template license</b>:
            </p>
            <ul className="list text-gray">
              <li>
                Freely redistribute, redistribute, license or sublicense a purchased HTML template.
              </li>
              <li>
                Sell a template on a marketplace or by any other means.
              </li>
            </ul>
            <br />
            <p className="text-gray">
              Additional terms:
            </p>
            <ul className="list text-gray">
              <li>
                All the rights to the photographs and illustrations used in the HTML templates belong to their legal owners and are 
                displayed in the templates for demonstration purpose only.
              </li>
              <li>
                You are not required to attribute or link to EzyLanding in any of the HTML templates.
              </li>
              <li>
                EzyLanding can not be hold accountable for any damages that will arise with the use or inability to use the HTML templates.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </Layout>
  )

}

export default Privacy