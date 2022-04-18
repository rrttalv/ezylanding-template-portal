import Head from "next/head"
import Link from "next/link"
import Layout from '../../components/Layout'
import Search from '../../assets/search.svg'
import Caret from '../../assets/caret-down.svg'
import { useRouter } from 'next/router'
import { useEffect, useState } from "react"
import Template from "../../components/Template"
import Spinner from "../../components/Spinner"
import absoluteUrl from "next-absolute-url";

let _searchDebounce = null

const Templates = (props) => {

  const [keywordsLoading, setKeywordsLoading] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [keywordsOpen, setKeyWordsOpen] = useState(false)
  const [suggestedKeywords, setSuggestedKeywords] = useState([])
  
  const { priceRange, templates, pageRange, currentPage, activeKeyword } = props

  useEffect(() => {
    //setIsMore(props.isMore)
  }, [])

  const handleChange = e => {
    const { value } = e.target
    setSearchValue(value)
    if(_searchDebounce){
      clearTimeout(_searchDebounce)
    }
    if(value.length >= 3){
      _searchDebounce = setTimeout(async () => {
        setKeyWordsOpen(true)
        if(value.length >= 3){
          setKeywordsLoading(true)
          try{
            const res = await fetch(`/templates/keyword-list?keyword=${value.toLowerCase()}`)
            const { keywordList } = await res.json()
            setSuggestedKeywords(keywordList)
            setKeywordsLoading(false)
          }catch(err){
            setKeywordsLoading(false)
          }
        }
      }, 500)
    }else{
      if(value.length === 0){
        setKeyWordsOpen(false)
      }else{

      }
    }
  }

  const initKeywordSearch = () => {
    setKeyWordsOpen(false)
  }

  const getListedKeywords = () => {
    const emptyMessage = '😮 No matches, try searching for something else'
    const list = [...suggestedKeywords]
    if(keywordsLoading){
      return (
        <div className="keyword-list loading">
          <Spinner center={true} style={{ height: '25px', margin: 0 }} scale={0.3} />
        </div>
      )
    }
    return (
      <div className="keyword-list">
        {
          suggestedKeywords.length === 0 ? (
            <div className="keyword-list_empty">
              <span>
                {emptyMessage}
              </span>
            </div>
          )
          :
          (
            list.map((keyword, idx) => (
              <Link 
                key={`${keyword}_${idx}`}
                href={`/templates?keyword=${keyword}`}
              >
                <a
                  className="btn-none"
                  onClick={() => initKeywordSearch()}
                >
                  <div className={`keyword-list_item ${idx === list.length - 1 ? 'none' : 'border-btm'}`}>
                    <span className="keyword-list_item-text">
                      {keyword}
                    </span>
                  </div>
                </a>
              </Link>
            ))
          )
        }
      </div>
    )
  }

  const getPagination = () => {
    const end = pageRange
    const start = currentPage + 1
    const pages = []
    const loopStart = currentPage === 0 ? start : start - 1
    const toAdd = end > 5 ? 5 : (end + 1) - start
    for(let i = loopStart; i < loopStart + toAdd; i++){
      pages.push({
        index: i - 1,
        active: i === start
      })
    }
    const queryParams = activeKeyword ? `&keyword=${activeKeyword}` : ''
    return (
      <div className="templates-list_pagination">
        {
          start > 1 ? (
            <Link href={`/templates?pageNo=${currentPage - 1}${queryParams}`}>
              <a className="templates-list_pagination_item-back">
                <Caret />
              </a>
            </Link>
          ) : undefined
        }
        {
          pages.map(page => (
            <div className={`templates-list_pagination_item ${page.active ? 'active' : 'inactive'}`}>
              <Link href={`/templates?pageNo=${page.index}${queryParams}`}>
                <a className="templates-list_pagination_item-link">
                  {page.index + 1}
                </a>
              </Link>
            </div>
          ))
        }
        {
          start !== end ? (
            <Link href={`/templates?pageNo=${currentPage + 1}${queryParams}`}>
              <a className="templates-list_pagination_item-forward">
                <Caret />
              </a>
            </Link>
          ) : undefined
        }
      </div>
    )
  }

  return (
    <Layout>
      <Head>
        <title>EzyLanding HTML Templates | Browse Templates</title>
      </Head>
      <section className='landing-section container-fluid first-section section templates'>
        <div className='row pt-5 pb-5'>
          <div className='col-md-12 col-lg-8 offset-lg-2 offset-0'>
            <div className='section-text-wrapper center'>
              <h1 className='title text-main mb-0'>Discover HTML Templates</h1>
              <div className="search-wrapper mt-2">
                <Search className='search-icon' />
                <input 
                  type="text" 
                  autoComplete="search" 
                  className="form-control search large-input" 
                  placeholder="Search for a template" 
                  value={searchValue} 
                  onChange={e => handleChange(e)} 
                />
                {
                  keywordsOpen ? (
                    getListedKeywords()
                  )
                  :
                  undefined
                }
              </div>
              <p className='mt-2 subtitle text-gray text-center'>Explore beautiful HTML templates. With EzyLanding's drag and drop editor you can customize the template with just a few clicks!</p>
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
                <div key={item._id} className="col-md-12 col-lg-4 mt-5 mt-lg-4">
                  <div className="template-item">
                    <Template {...templateProps} />
                  </div>
                </div>
              )
            })
          }
          <div className="col-12 pagination-col">
            {getPagination()}
          </div>
        </div>
      </section>
    </Layout>
    
  )
}

export const getServerSideProps = async ({ req, query: { keyword, pageNo } }) => {
  const { host } = absoluteUrl(req, req.headers.host);
  let url = `http://${host}/templates/templates-list`
  if(keyword){
    url += `?keyword=${keyword}`
  }
  if(pageNo){
    url += `${keyword ? '&' : '?'}pageNo=${pageNo}`
  }
  const res = await fetch(url)
  const { templates, priceRange, pageRange, pageNo: currentPage, keyword: activeKeyword } = await res.json()
  return { props: { templates, priceRange, pageRange, currentPage, activeKeyword } }
}

export default Templates