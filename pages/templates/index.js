import Head from "next/head"
import Link from "next/link"
import Layout from '../../components/Layout'
import Search from '../../assets/search.svg'
import { useRouter } from 'next/router'
import { useEffect, useState } from "react"
import Template from "../../components/Template"

const Templates = (props) => {

  const [searchValue, setSearchValue] = useState('')

  let _searchDebounce = null

  const { templates, priceRange } = props

  useEffect(() => {
    //Init search input shit
  }, [])

  

  const handleChange = e => {
    const { value } = e.target
    setSearchValue(value)
  }

  return (
    <Layout>
      <Head>
        <title>Browse EzyLanding HTML Templates</title>
      </Head>
      <section className='landing-section container-fluid first-section section templates'>
        <div className='row'>
          <div className='col-md-12 col-lg-8 offset-lg-2 offset-0'>
            <div className='section-text-wrapper center'>
              <h1 className='title text-main mb-0'>Discover HTML Templates</h1>
              <div className="search-wrapper mb-2 mt-2">
                <Search className='search-icon' />
                <input 
                  type="text" 
                  autoComplete="search" 
                  className="form-control search large-input" 
                  placeholder="Search for a template" 
                  value={searchValue} 
                  onChange={e => handleChange(e)} 
                />
              </div>
              <p className='subtitle text-gray text-center'>Explore beautiful HTML templates. With EzyLanding's drag and drop editor you can customize the template with just a few clicks!</p>
            </div>
          </div>
        </div>
      </section>
      <section className="container-fluid templates-list">
        <div className="row large-row">
          {
            templates.map((item, idx) => {
              const templateProps = { ...item, priceRange }
              return (
                <div className="col-md-12 col-lg-4">
                  <div key={item._id} className="template-item">
                    <Template {...templateProps} />
                  </div>
                </div>
              )
            })
          }
        </div>
      </section>
    </Layout>
    
  )
}

export const getServerSideProps = async () => {
  const res = await fetch(`http://localhost:3000/templates/templates-list`)
  const { templates, priceRange } = await res.json()
  return { props: { templates, priceRange } }
}

export default Templates