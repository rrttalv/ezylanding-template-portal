const express = require("express");
const { getTemplateAssetS3Url, getTemplateFromS3 } = require("../helpers/aws");
const { compileTemplatePage } = require("../helpers/html");
const router = express.Router();
const { Template } = require('../models/Template')
const { StripeItem } = require('../models/StripeItem')
const { StripePurchase, createPurchase, completePurchase } = require('../models/StripePurchase')
const { User, createUser } = require('../models/User')
const stripe = require('stripe')(process.env.STRIPE_SECRET)

const routes = (app) => {

  router.get('/purchase', async (req, res) => {
    const { purchaseId, paymentIntentId } = req.query
    if(purchaseId && paymentIntentId){
      await completePurchase(paymentIntentId, purchaseId)
    }
    return app.render(req, res, '/purchase', { query: { purchaseId, paymentIntentId } })
  })

  router.get('/purchase/download', async (req, res) => {
    const { templateId } = req.query
    res.json({ template: {} })
  })

  return router
}


module.exports = routes;