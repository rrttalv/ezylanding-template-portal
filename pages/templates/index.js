import Head from "next/head"
import Link from "next/link"
import { useRouter } from 'next/router'

const Templates = ({ category }) => {

  console.log(category)

  return (
    <section>
      <Head>
        <title>Browse EzyLanding HTML Templates</title>
      </Head>
      <h1>{category} Templates</h1>
      <Link href="/templates/all">
        <a title="All HTML Templates">
          Templates
        </a>
      </Link>
    </section>
  )
}

Templates.getInitialProps = async ({ query: { category } }) => {
  console.log(category)
  return { category }
}

export default Templates