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
      if(!user || (user && !user.stripeCustomerId)){
        const customer = await stripe.customers.create({
          email
        })
        customerId = customer.id
        if(user){
          await User.updateOne({ _id: user._id }, { $set: { stripeCustomerId: customer.id } })
        }else{
          user = await createUser(email, customer.id)
        }
      }else{
        customerId = user.stripeCustomerId
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

  //Featured templates list
  router.get('/featured-templates', async (req, res) => {
    const { amount } = req.query
    const limit = amount ? Number(amount) : 20
    const dbTemplates = await Template.find({ featured: { $eq: true }, publicTemplate: { $eq: true }, listed: { $eq: true } })
      .sort({ createdAt: -1 })
      .limit(limit)
      .select('_id frameworkId slug templateId title tags subTitle pageLength')
      .lean()
    const templates = dbTemplates.map(template => {
      const thumbkey = `templates/${template.templateId}_thumb`
      return {
        ...template,
        previewURL: `${process.env.APP_URL}/templates/template-preview/${template._id}`,
        thumbnail: getTemplateAssetS3Url(thumbkey, 'jpeg')
      }
    })
    res.json({ templates })
  })

  router.get('/template-preview/:id/:route?', async (req, res) => {
    const { id, route } = req.params
    const split = id.split('-')
    const parsedId = split[split.length - 1]
    const dbTemplate = await Template.findOne({ _id: parsedId }).lean()
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
    const slugArr = id.split('-')
    const parsedId = slugArr[slugArr.length - 1]
    const priceRange = await getPriceRange()
    const dbTemplate = await Template.findOne({ _id: parsedId }).lean()
    const template = {
      ...dbTemplate,
      fullThumbnail: getTemplateAssetS3Url(`templates/${dbTemplate.templateId}_preview`, 'png'),
      thumbnail: getTemplateAssetS3Url(`templates/${dbTemplate.templateId}_thumb`, 'jpeg'),
      previewURL: `${process.env.APP_URL}/templates/template-preview/${id}`,
      priceRange
    }
    res.json({ template })
  })

  router.get('/keyword-list', async(req, res) => {
    try{
      const { keyword } = req.query
      const query = {
        $or: [
          {
            tags: {
              $regex: keyword,
              $options: 'ig'
            },
          },
          {
            frameworkId: {
              $regex: keyword,
              $options: 'ig'
            }
          },
        ],
        publicTemplate: { $eq: true },
        tags: { $ne: [] }
      }
      const list = await Template.find(query).select('frameworkId tags -_id').sort({ createdAt: -1 }).limit(20)
      const keywordList = []
      list.forEach(item => {
        const frameworkRegex = new RegExp(keyword, 'ig')
        const frameworkRes = item.frameworkId.match(frameworkRegex)
        if(frameworkRes && keywordList.indexOf(item.frameworkId) === -1){
          keywordList.push(item.frameworkId)
        }
        item.tags.forEach(tag => {
          const regex = new RegExp(keyword, 'ig')
          const res = tag.match(regex)
          if(res && keywordList.indexOf(tag) === -1){
            keywordList.push(tag)
          }
        })
      })
      res.json({ keywordList })
    }catch(err){
      console.log(err)
    }
  })

  router.get('/templates-list', async(req, res) => {
    const { keyword } = req.query
    const pageNo = req.query.pageNo ? Number(req.query.pageNo) : 0
    const skip = pageNo === 0 ? 0 : pageNo * 20
    const query = { listed: { $eq: true }, publicTemplate: { $eq: true } }
    if(keyword){
      query.$or = [
        {
          tags: {
            $regex: keyword,
            $options: 'ig'
          },
        },
        {
          frameworkId: {
            $regex: keyword,
            $options: 'ig'
          }
        },
      ]
    }
    const list = await Template.find(query)
      .sort({ createdAt: -1 })
      .limit(20)
      .skip(skip)
      .select('_id frameworkId slug templateId title tags subTitle pageLength')
      .lean()
    const count = await Template.countDocuments(query)
    const pageRange = Math.ceil(count / 20)
    const priceRange = await getPriceRange()
    const templates = list.map(template => {
      const thumbkey = `templates/${template.templateId}_thumb`
      return {
        ...template,
        previewURL: `${process.env.APP_URL}/templates/template-preview/${template.slug}-${template._id}`,
        thumbnail: getTemplateAssetS3Url(thumbkey, 'jpeg')
      }
    })
    res.json({ templates, priceRange, pageRange, pageNo, keyword: keyword ? keyword : '' })
  })

  router.get("/templates/:category", async (req, res) => {
    return app.render(req, res, "/templates", { query: { category: req.query.category } });
  })

  return router;
};

module.exports = routes;