import { Head, Html, Main, NextScript } from 'next/document'

const Document = () => {

  return (
    <Html>
      <Head>
        <title>EzyLanding HTML Templates</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap" rel="stylesheet" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
  
}

export default Document