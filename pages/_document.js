import { Head, Html, Main, NextScript } from 'next/document'

const Document = () => {

  return (
    <Html>
      <Head>
      <title>EzyLanding | Webpack HTML Templates For Startups</title>
      <link rel="shortcut icon" href="/favicon.ico" />
      <meta name="title" content="EzyLanding | Webpack HTML Templates For Startups" />
      <meta name="description" content="About to get started with your next project? Get a landing page from us! At EzyLanding you will find customizeable HTML templates for startups!"/>

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://ezylanding.com" />
      <meta property="twitter:title" content="EzyLanding | Webpack HTML Templates For Startups" />
      <meta property="twitter:description" content="About to get started with your next project? Get a landing page from us! At EzyLanding you will find customizeable HTML templates for startups!" />
      <meta property="twitter:image" content="https://ezylanding-user-assets.s3.amazonaws.com/media/meta-preview-image.png" />

      <meta property="og:type" content="website"/>
      <meta property="og:url" content="https://ezylanding.com"/>
      <meta property="og:title" content="EzyLanding | Webpack HTML Templates For Startups" />
      <meta property="og:description" content="About to get started with your next project? Get a landing page from us! At EzyLanding you will find customizeable HTML templates for startups!" />
      <meta property="og:image" content="https://ezylanding-user-assets.s3.amazonaws.com/media/meta-preview-image.png" />

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&family=Roboto+Mono&display=swap" rel="stylesheet" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossOrigin="anonymous"></script>
    </Html>
  )
  
}

export default Document