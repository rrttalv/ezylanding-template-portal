import React, { Component, useState } from 'react';
import Caret from '../../../assets/caret-down.svg'
import Layout from '../../../components/Layout';
import * as moment from 'moment/moment';
import Link from 'next/link';
import StripeModal from '../../../components/StripeModal';
import { useRouter } from 'next/router'
import Head from 'next/head'
import absoluteUrl from "next-absolute-url"

const TemplateItem = (props) => {

  const router = useRouter()
  const [modalOpen, setModalOpen] = useState(false)

  const { template } = props

  const { title, fullThumbnail, previewURL, description, priceRange, altTag, pageLength, updatedAt, frameworkId, tags, createdAt, _id } = template

  const getRow = (title, value, includeTitle = true, valueClass = '') => (
    <div className='template-meta_row'>
      {
        includeTitle ? (
          <span className='template-meta_row_subtitle'>
            {title}:
          </span>
        )
        :
        undefined
      }
      <span className={`template-meta_row_value${valueClass ? ' ' + valueClass : ''}`}>
        {value}
      </span>
    </div>
  )

  const initCheckout = () => {
    setModalOpen(true)
  }

  const getButtonsRow = () => (
    <div className='template-meta_row buttons'>
      <Link href={previewURL}>
        <a target={"_blank"} title={`${title} HTML template preview page`}>
          <button className='btn-bordered'>
            Preview
          </button>
        </a>
      </Link>
      <button onClick={() => initCheckout()} className='btn-bordered'>
        Buy
      </button>
    </div>
  )

  const closeCheckout = () => {
    setModalOpen(false)
  }

  return (
    <Layout>
      <Head>
        <title>EzyLanding HTML Template | {title}</title>
      </Head>
      {
        modalOpen ? (<StripeModal closeCheckout={closeCheckout} title={template.title} templateId={_id} />) : undefined
      }
      <section className='container-fluid template-view'>
        <div className='row'>
          <div className='col-12'>
            <span 
              onClick={() => router.back()}
              className='back-wrapper'
            >
              <Caret /> Back
            </span>
            <h2 className='title'>{template.title}</h2>
            <p className='description'>
              {description}
            </p>
          </div>
          <div className='col-lg-8 order-2 order-lg-1 col-md-12'>
            <div className='template-preview'>
              <img className='template-preview_full' src={fullThumbnail} alt={altTag ? altTag : `Full ${title} template preview picture`} />
            </div>
          </div>
          <div className='col-lg-4 order-1 order-lg-2 col-md-12 meta-col'>
            <div className='template-meta card-shadow'>
              {getRow('Framework', frameworkId)}
              {getRow('Total pages', pageLength)}
              {getRow('Created', moment(createdAt).format('DD MMMM YYYY'))}
              {getRow('Last updated', moment(updatedAt).format('DD MMMM YYYY'))}
              {getRow('', '#' + tags.join(' #'), false, 'tag-list')}
              {getButtonsRow()}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export const getServerSideProps = async ({ req, query: { category } }) => {
  const { host } = absoluteUrl(req, req.headers.host)
  const res = await fetch(`http://${host}/templates/template-item/${category}`)
  const { template } = await res.json()
  return { props: { template } }
}

export default TemplateItem