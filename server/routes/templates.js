const express = require("express");
const { getTemplateAssetS3Url, getTemplateFromS3 } = require("../helpers/aws");
const { compileTemplatePage } = require("../helpers/html");
const router = express.Router();
const { Template } = require('../models/Template')
const { StripeItem } = require('../models/StripeItem')
const { StripePurchase, createPurchase, completePurchase } = require('../models/StripePurchase')
const { User, createUser } = require('../models/User')
const stripeLib = require('stripe')

function routes(app) {
  const stripe = stripeLib(process.env.STRIPE_SECRET)
  
  const getPriceRange = async () => {
    const items = await StripeItem.find(({ tag: { $in: ['single-raw', 'single-webpack' ] } }))
    const sorted = items.sort((a, b) => a.price - b.price)
    const prices = sorted.map(item => { return { price: (item.price / 100).toFixed(2), tag: item.tag } })
    const priceRange = '$' + prices[0].price + ' - $' + prices[prices.length - 1].price
    return priceRange
  }

  router.post('/payment-intent', async(req, res) => {
    try{
      const { templateTag, email, templateId } = req.body
      let user = await User.findOne({ email })
      let customerId = null
      if((user && !user.stripeCustomerId) || !user){
        const customer = await stripe.customers.create({
          email
        })
        customerId = customer.id
      }
      if(!user){
        user = await createUser(email, customerId)
      }
      const item = await StripeItem.findOne({ tag: templateTag })
      if(!item){
        return res.status(400).json({ status: false, message: 'Invalid product selected, please contact support' })
      }
      const paymentIntent = await stripe.paymentIntents.create({
        amount: item.price,
        currency: 'usd',
        customer: customerId,
        automatic_payment_methods: {
          enabled: true,
        },
        metadata: {
          'price_id': item.stripeId,
          'purchase_price': item.price,
          'user_id': user._id
        }
      })
      const { id: paymentIntentId, client_secret: clientSecret } = paymentIntent
      const purchase = await createPurchase(user._id, customerId, paymentIntentId, clientSecret, templateTag, item.price, templateId)
      return res.json({ status: true, clientSecret, paymentIntentId, purchaseId: purchase._id })
    }catch(err){
      console.log(err)
      return res.status(400).json({ status: false, message: 'Something went wrong' })
    }
  })

  router.get('/template-preview/:id/:route?', async (req, res) => {
    const { id, route } = req.params
    const dbTemplate = await Template.findOne({ _id: id }).lean()
    if(!dbTemplate){
      res.writeHead(301, { Location: '/' })
      return res.end()
    }
    const template = await getTemplateFromS3(dbTemplate.templateId)
    const targetRoute = route ? '/' + route : '/'
    const strTemplate = compileTemplatePage(dbTemplate.frameworkId, template, id, targetRoute)
    res.set('Content-Type', 'text/html')
    res.send(new Buffer(strTemplate))
  })

  router.get('/template-item/:id', async (req, res) => {
    const { id } = req.params
    const priceRange = await getPriceRange()
    const dbTemplate = await Template.findOne({ _id: id }).lean()
    const template = {
      ...dbTemplate,
      fullThumbnail: getTemplateAssetS3Url(`templates/${dbTemplate.templateId}_preview`, 'png'),
      previewURL: `${process.env.APP_URL}/templates/template-preview/${id}`,
      priceRange
    }
    res.json({ template })
  })

  router.get('/templates-list', async(req, res) => {
    const { pageNo } = req.query
    const skip = Number(pageNo ? pageNo : 0)
    const list = await Template.find({ listed: { $eq: true }, publicTemplate: { $eq: true } }).limit(20).skip(skip).lean()
    const priceRange = await getPriceRange()
    const templates = list.map(template => {
      const thumbkey = `templates/${template.templateId}_thumb`
      return {
        ...template,
        previewURL: `${process.env.APP_URL}/templates/template-preview/${template._id}`,
        thumbnail: getTemplateAssetS3Url(thumbkey, 'jpeg')
      }
    })
    res.json({ templates, priceRange })
  })

  router.get("/templates/:category", async (req, res) => {
    return app.render(req, res, "/templates", { query: { category: req.query.category } });
  })

  return router;
};

module.exports = routes;