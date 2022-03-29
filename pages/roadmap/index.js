import Link from 'next/link'
import { useState } from 'react'
import Check from '../../assets/check.svg'
import Layout from '../../components/Layout'
import PageCTA from '../../components/PageCTA'

const Roadmap = (props) => {

  const [content] = useState([
    {
      title: 'Q2 2022',
      className: 'connected bottom',
      id: 'q2-2022',
      goals: [
        {
          text: '25+ Responsive HTML templates',
          details: {
            text: [
              `By the end of the second quarter of 2022 
              we want to have at least 25 responsive HTML templates 
              ready to be deployed by EzyLanding users.`,
              `In Q2 we will focus on the following template categories: SAAS Startup, Mobile Apps, and Market Validation templates`
            ],
            link: '',
            image: ''
          },
          hit: false,
        },
        {
          text: 'Launch drag and drop HTML template editor',
          details: {
            text: [
              `EzyLanding got started as a drag and drop HTML editor and we won't abandon that idea!`,
              `We aim to launch our drag and drop HTML template editor before the end of Q2 2022.
              All the templates that are currently for sale are actually built with said drag and drop editor, but we still have to iron out a few kinks.`
            ],
            link: '',
            image: ''
          },
          hit: false,
        }
      ]
    },
    {
      title: 'Q3 2022',
      className: 'connected top',
      id: 'q3-2022',
      goals: [
        {
          text: '65+ Responsive HTML templates',
          hit: false,
          details: {
            text: [
              `By the end of the third quarter 
              we want to have at least 65 HTML templates designed and ready for use!`,
              `In Q3 we will focus on the following template categories: B2B Online Business, Market Validation, and B2B SAAS Startup templates.`
            ],
            link: '',
            image: ''
          },
        },
        {
          text: 'Export templates as React App with Routing',
          hit: false,
          details: {
            text: [
              `Aren't you tired of setting up a new React project, figuring out the color scheme, and so on for every new project?`,
              `Come Q3 2022 you will not have to do that anymore! By then You can leverage our templates to create your next React application!`
            ],
            link: '',
            image: ''
          },
        },
        {
          text: 'Export templates as NextJS App',
          hit: false,
          details: {
            text: [
              `What's the point of React without NextJS?`,
              `No worries! When we launch our React App support we will also have support for NextJS template exports!`
            ],
            link: '',
            image: ''
          },
        },
        {
          text: 'Export templates as NextJS App with built-in server side rendering support',
          hit: false,
        }
      ]
    },
    {
      title: 'Q4 2022',
      className: 'final',
      id: 'q4-2022',
      goals: [
        {
          text: '100+ Responsive HTML templates',
          hit: false,
          details: {
            text: [
              `By the 4th quarter we really want to expand our template categories and have at least 100+ HTML templates listed for sale!`,
              `In Q4 we will focus on the following template categories: Marketplace Apps, B2C Mobile Apps, and Portfolio templates.`
            ],
            link: '',
            image: ''
          },
        },
        {
          text: 'GPT-3 Powered template copy generation',
          hit: false,
          details: {
            text: [
              `Our goal is to make it extremely simple for users to get going!`,
              `By leveraging the GPT-3 AI API we will be able to automatically generate a copy for Your next landing page.`
            ],
            link: '',
            image: ''
          },
        },
        {
          text: 'Tailwind CSS supported templates',
          hit: false,
          details: {
            text: [
              `Everyone loves tailwind, we do too, but it's hard to integrate with our templates...`,
              `Still, by the end of Q4 we want our users to be able to have access to HTML templates with built-in Tailwind CSS support!`
            ],
            link: '',
            image: ''
          },
        }
      ]
    }
  ])

  const getRoadmap = () => {
    return (
      <div className='roadmap'>
        <div className='roadmap-wrapper'>
          {content.map((item, idx) => {
            const { title, id, goals, className } = item
            return (
              <div key={id} className={`roadmap-card ${className} q${idx + 2}`}>
                <h3 className='roadmap-card_title'>{title}</h3>
                <div className='roadmap-card_goals'>
                  <ul className='roadmap-card_goals_list'>
                    {
                      goals.map((goal, idx) => {
                        const { text } = goal
                        return (
                          <li key={id + idx} className='roadmap-card_goals_list-item'>
                            <Check className='card-check' />
                            {text}
                          </li>
                        )
                      })
                    }
                  </ul>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  const getDetails = () => (
    <div className='details'>
      <div className='details_wrapper'>
      {content.map((item, contentIdx) => {
        const { title, id, goals, className } = item
        return (
          <div key={`detail_${id}_${contentIdx}`} className={`details_section ${className}`}>
            <div className='details_section_header'>
              <h3 className='details_section_header_title'>
                {title}
              </h3>
            </div>
            <div className='details_section_body'>
              {
                goals.map((goal, goalIdx) => {
                  const { text, details } = goal
                  if(!details){
                    return <div key={`detail_body_${id}_${goalIdx}`} />
                  }
                  const { details: { text: detailText, link, image } } = goal
                  return (
                    <div 
                      key={`detail_body_${id}_${goalIdx}`} 
                      className='details_section_body_content'
                    >
                      <h5>{text}</h5>
                      {
                        detailText.map((content, idx) => (
                          <p key={`detail_body_${id}_${idx}_content`} className='details_section_body_content_detail-text'>
                            {content}
                          </p>
                        ))
                      }
                    </div>
                  )
                })
              }
            </div>
          </div>
        )
        })}
      </div>
    </div>
  )

  return (
    <Layout>
      <section className='landing-section container-fluid first-section section roadmap-section'>
        <div className="section-text-wrapper center">
          <h1 className='title text-main'>Where are we headed?</h1>
          <p className="subtitle text-gray">Here's what we have planned for 2022</p>
        </div>
      </section>
      <section className='landing-section container-fluid first-section section roadmap-content'>
        {getRoadmap()}
      </section>
      <section className='landing-section container-fluid first-section section roadmap-details'>
        {getDetails()}
        <PageCTA title="Follow our progression!" twitter="Follow on Twitter" discord="Join Discord Server" />
      </section>
    </Layout>
  )

}

export default Roadmap