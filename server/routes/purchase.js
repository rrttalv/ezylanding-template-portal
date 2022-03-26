const express = require("express");
const { getTemplateAssetS3Url, getTemplateFromS3, getTemplateBoilerplate } = require("../helpers/aws");
const { compileTemplatePage } = require("../helpers/html");
const router = express.Router();
const { Template } = require('../models/Template')
const { StripeItem } = require('../models/StripeItem')
const { StripePurchase, createPurchase, completePurchase } = require('../models/StripePurchase')
const { User, createUser } = require('../models/User')
const AdmZip = require('adm-zip')

const routes = (app) => {
  const stripe = require('stripe')(process.env.STRIPE_SECRET)

  router.get('/purchase', async (req, res) => {
    const { purchaseId, paymentIntentId } = req.query
    return app.render(req, res, '/purchase', { query: { purchaseId, paymentIntentId } })
  })

  router.get('/download', async (req, res) => {
    try{
      const { purchaseId, paymentIntentId } = req.query
      const purchase = await StripePurchase.findOne(({ _id: purchaseId }))
      if(!purchase){
        return res.json({ status: false, message: 'This purchase does not exist', template: null })
      }
      const { status } = await stripe.paymentIntents.retrieve(
        paymentIntentId
      )
      if(status !== 'succeeded'){
        return res.json({ 
          status: false, 
          message: 'This purchase is not completed yet, refresh this page in a few minutes, contact support if this issue persists', 
          template: null 
        })
      }
      if(status === 'succeeded' && !purchase.completed){
        await completePurchase(paymentIntentId, purchaseId)
      }
      const boilerplate = await getTemplateBoilerplate(purchase.tag)
      const zip = new AdmZip(boilerplate)
      console.log(zip.getEntries())
      res.json({ template: {}, message: '', status: true })
    }catch(err){
      console.log(err)
      res.json({ status: false, message: 'Something went wrong, try refreshing this page', template: null })
    }
  })

  return router
}


module.exports = routes;