import Link from 'next/link'
import { useState } from 'react'
import Check from '../../assets/check.svg'
import Layout from '../../components/Layout'

const Roadmap = (props) => {

  const [content] = useState([
    {
      title: 'Q2 2022',
      className: 'connected bottom',
      id: 'q2-2022',
      goals: [
        {
          text: '25+ Responsive HTML templates',
          hit: false,
        },
        {
          text: 'Launch drag and drop HTML template editor',
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
        },
        {
          text: 'Export templates as React App with Routing',
          hit: false,
        },
        {
          text: 'Export templates as NextJS App',
          hit: false,
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
        },
        {
          text: 'GPT-3 Powered template copy generation',
          hit: false,
        },
        {
          text: 'Tailwind CSS supported templates',
          hit: false,
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
    </Layout>
  )

}

export default Roadmap