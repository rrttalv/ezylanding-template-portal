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
  return { props: { purchaseId, paymentIntentId } }
}

export default Purchase