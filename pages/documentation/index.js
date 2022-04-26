import Head from "next/head"
import Link from "next/link"
import Layout from '../../components/Layout'
import PageCTA from '../../components/PageCTA'
import { useEffect, useState } from "react"
import Book from '../../assets/book.svg'
import Tools from '../../assets/tools.svg'
import Sidebar from "../../components/Sidebar"

const Documentation = (props) => {

  //https://mycolor.space/

  const [sidebarContent] = useState([
    {
      linkPath: '/resources',
      icon: <Tools />,
      label: 'Resources' 
    },
    {
      linkPath: '/documentation',
      icon: <Book />,
      label: 'Documentation',
      subLinks: [
        {
          linkPath: `/documentation#webpack`,
          label: 'Webpack template configuration'
        },
        {
          linkPath: `/documentation#webpack-deploy-netlify`,
          label: 'Deploy Webpack template on Netlify'
        },
        /*
        {
          linkPath: `/documentation#raw`,
          label: 'Raw HTML template documentation'
        }
        */
      ]
    }
  ])

  const [imageLinks] = useState({
    netlifyStepOne: '/assets/documentation/netlify/netlify-deploy-html-landing-page-template-buttons.png',
    netlifyStepTwo: '/assets/documentation/netlify/netlify-deploy-github-connect-import-repository.png',
    netlifyStepThree: '/assets/documentation/netlify/deploy-webpack-html-template-to-netlify-build-configuration.png',
    netlifyStepFour: '/assets/documentation/netlify/successfully-deployed-webpack-html-template-on-netlify.png',
  })
  
  const getResourceRows = () => {
    return (
      resourceList.map(item => {
        const { title, description } = item
        return (
          <div className="resource-row">
            <div key={item.id} className="row">
              <div className="col-12">
                <h3 className="heading text-main">{title}</h3>
                {description}
              </div>
            </div>
          </div>
        )
      })
    )
  }
  
  const getMarkdownRows = (content) => {
    return (
      <div className="markdown">
        <pre className="language-js">
          <code className="language-js">
            {
              content.map((textContent, idx) => (
                <span
                  key={textContent.split(' ').join('-') + idx}
                >
                  {textContent}
                </span>
              ))
            }
          </code>
        </pre>
      </div>
    )
  }

  const getImage = (target, key, description = null) => {
    return (
    <div className="documentation-row_img-wrapper">
      <img style={!description ? { borderRadius: '4px' } : {}} src={target[key]} className="documentation-row_image" />
      {
        description ? (
          <span className="documentation-row_img-desc">
            {description}
          </span>
        )
        :
        undefined
      }
    </div>
    )
  }

  const twitterLink = <Link href='https://twitter.com/ezylanding'><a className="blue" target={'_blank'}>Twitter</a></Link>
  const discordLink = <Link href='https://discord.gg/YnfrmSATG6'><a className="blue" target={'_blank'}>Discord</a></Link>

  return (
    <Layout>
      <Head>
        <title>EzyLanding | HTML & Webpack Template Configuration and Deployment Documentation</title>
      </Head>
      <div className="resources d-flex flex-row">
        <Sidebar 
          content={sidebarContent}
          className='docs-navigation'
        />
        <div className="docs-wrapper d-flex flex-column">
          <section id="main" className='landing-section container-fluid first-section section resource-header'>
            <div className="section-text-wrapper center">
              <h1 className='title text-main'>Documentation</h1>
              <p className="subtitle text-gray">Useful guides to help you set up and deploy any of our HTML landing page templates.</p>
            </div>
          </section>
          <section id="webpack" className="landing-section container-fluid section resource-content">
            <div className="row mt-80">
              <div className="col-12 pb-2 my-4 border-bottom-main">
                <h3 className="text-main heading">Webpack HTML template setup</h3>
                <p className="text-gray">
                  A guide on how to set up your Webpack + HTML landing page template for production or development
                </p>
              </div>
              <div className="row mb-xl">
                <div className="col-12 mb-3">
                  <h5 className="text-main mb-3">
                    Initial setup
                  </h5>
                  <row className='g-0 documentation-row'>
                    <div className="col-12">
                      {getMarkdownRows(['npm install'])}
                    </div>
                    <div className="col-12">
                      <p className="text-gray">
                      This will install all the necessary npm dependencies required to use the Webpack + HTML landing page template.
                      </p>
                    </div>
                  </row>
                </div>
                <div className="col-12 mb-3">
                  <h5 className="text-main mb-3">
                    Development setup
                  </h5>
                  <div className="row g-0 documentation-row">
                    <div className="col-12">
                      <div className="col-12">
                        {getMarkdownRows(['npm run dev'])}
                      </div>
                    </div>
                    <div className="col-12">
                      <p>
                        If you did not change the default configuration a development server will start on port 8000.
                      </p>
                      <p>
                      To change the default port for the development server, then you can edit the <b>port</b> value in the <b className="italic">/configuration/environment.js</b> file.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-12 mb-4">
                  <h5 className="text-main mb-3">
                    Production setup
                  </h5>
                  <div className="row g-0 documentation-row">
                    <div className="col-12">
                      <p className="text-gray">
                        Once you are ready to deploy your HTML template to production you should run the following command:
                      </p>
                    </div>
                    <div className="col-12">
                      {getMarkdownRows(['npm run production'])}
                    </div>
                    <div className="col-12">
                      <p className="text-gray">
                        This will create a production build of your HTML template and generate the build assets in the <b className="italic">/dist</b> folder in the root of the project. 
                        If the production build is successful, then your site is ready to be deployed.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-12 mb-4">
                  <h3 className="text-main mb-3">
                  Deploying your Webpack HTML landing page to Netlify
                  </h3>
                  <row className='g-0 documentation-row'>
                    <div className="col-12">
                      <p>
                        Our Webpack + HTML templates are configured in a way that makes them extremely easy to deploy. 
                        Here's how you can deploy your landing page on Netlify:
                      </p>
                    </div>
                  </row>
                </div>
                <div className="col-12 mb-4">
                  <h5 className="text-main mb-3">
                    Github repository setup
                  </h5>
                  <div className="row g-0 documentation-row">
                    <div className="col-12">
                      <p>
                      Create a GitHub repository at <Link href='https://github.com'><a className="blue" target={'_blank'}>Github.com</a></Link>
                      </p>
                      <p>
                      After setting up a Git repository go back to your landing page project. 
                      In the root of the landing page directory run the following commands:
                      </p>
                    </div>
                    <div className="col-12">
                      {getMarkdownRows(['git init', 'git add .', `git commit -m "your commit message here"`])}
                    </div>
                    <div className="col-12">
                      <p>
                        Once you have run the previous commands your landing page is ready to be pushed to your GitHub repository. 
                      </p>
                      <p>
                        Go back to GitHub, open your previously created repository, and copy the remote URL of the repository you created. 
                        It should look something like this: <b className="italic">git@github.com:[GITHUB_USERNAME]/[GIT_REPOSITRY_URL].git</b>
                      </p>
                      <p>
                        After locating the repository remote URL run the following commands in the root of the landing page project directory:
                      </p>
                    </div>
                    <div className="col-12">
                      {getMarkdownRows(
                        [
                        'git remote add origin git@github.com:[GITHUB_USERNAME]/[GIT_REPOSITRY_URL].git',
                        'git push -u origin master'
                        ]
                      )}
                    </div>
                    <div className="col-12">
                      <p>
                        These commands will push the template files into your git repository which can then be deployed to Netlify.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section id="webpack-deploy-netlify" className="landing-section container-fluid section resource-content">
            <div className="row mt-80">
              <div className="col-12 pb-2 my-4 border-bottom-main">
                <h3 className="text-main heading">
                  Deploy A Webpack template on Netlify
                </h3> 
                <p>
                  Deploying your landing page on Netlify is extremely simple. Here is how you can do it
                </p>
              </div>
              <div className="col-12 pb-2 mb-4">
                <div className="row g-0 documentation-row">
                  <div className="col-12">
                    <p>
                      Create a <Link href='https://www.netlify.com'><a className="blue" target={'_blank'}>Netlify account</a></Link>.
                      Once you have signed up go to the <b>Netlify teams overview</b> page and 
                      click on the <b>Add new site</b> button, then select <b>Import an existing project</b> from the dropdown menu.
                    </p>
                    {getImage(imageLinks, 'netlifyStepOne', <span>Select <b>import an existing project</b> from the dropdown menu</span>)}
                  </div>
                  <div className="col-12">
                    <p>
                      Connect your GitHub account or other git service provider account and find the repository where your landing page template is located.
                    </p>
                    {getImage(imageLinks, 'netlifyStepTwo')}
                    <p>
                      If you did not change the original package.json file that came with the template, then here is what the <b>site settings</b> tab should look like. 
                    </p>
                    <p>
                      Click on <b>deploy site</b> and you will be redirected to the newly created website's dashboard. 
                    </p>
                    {getImage(imageLinks, 'netlifyStepFour', <span>If the build is successful then a preview of the website should appear and the build log will display 
                      a <b style={{ color: '#054861', background: '#e1fef1', borderRadius: '4px', padding: '2px 4px' }}>Published</b> tag next to the most recent build.</span>)}
                    <p>
                    Congratulations, your site should now be up and running on Netlify. 
                    If you are having issues with deploying one of our templates on Netlify then 
                    feel free to send us a message on {twitterLink} or {discordLink} and we will help you out.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  )

}

export default Documentation