import Layout from '../../components/Layout'

const Purchase = (props) => {

  console.log(props)

  return (
    <Layout>
      <h1>Purchase completed!</h1>
    </Layout>
  )

}

export const getServerSideProps = async ({ query: { purchaseId, paymentIntentId } }) => {
  const res = await fetch(`${process.env.APP_URL}/purchase/download?purchaseId=${purchaseId}&paymentIntentId=${paymentIntentId}`)
  const { status, template, message } = await res.json()
  return { props: { status, template, message  } }
}

export default Purchase