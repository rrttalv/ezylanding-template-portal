const express = require("express");
const { getTemplateAssetS3Url, getTemplateFromS3, getTemplateBoilerplate } = require("../helpers/aws");
const { compileTemplatePage, compileFullTemplate } = require("../helpers/html");
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

  router.get('/download-zip', async (req, res) => {
    const { purchaseId } = req.query
    const purchase = await StripePurchase.findOne(({ _id: purchaseId })).populate({ path: 'template', model: Template })
    if(!purchase || !purchase.completed){
      return res.json({ status: false, message: 'Purchase is not completed' })
    }
    const boilerplate = await getTemplateBoilerplate(purchase.tag)
    const zip = new AdmZip(boilerplate)
    const { templateId, frameworkId, title } = purchase.template
    const template = await getTemplateFromS3(templateId)
    const { cssFiles, templateFiles } = compileFullTemplate(template, frameworkId, template._id, { rawHTML: purchase.tag === 'single-raw' })
    const pathPrefix = purchase.tag === 'single-raw' ? 'raw-boilerplate' : 'webpack-boilerplate/src'
    cssFiles.forEach(file => {
      const { fileName, content } = file
      zip.addFile(`${pathPrefix}/scss/${fileName}`, Buffer.from(content, 'utf8'))
    })
    templateFiles.forEach(file => {
      const { fileName, content } = file
      zip.addFile(`${pathPrefix}/${fileName}`, Buffer.from(content, 'utf8'))
    })
    const zipContents = zip.toBuffer()
    const fileName = `ezylanding-${title.split(' ').join('-')}-template.zip`;
    const fileType = 'application/zip';
    res.writeHead(200, {
      'Content-Disposition': `attachment; filename="${fileName}"`,
      'Content-Type': fileType
    })
    return res.end(zipContents)
  })

  router.get('/download', async (req, res) => {
    try{
      const { purchaseId, paymentIntentId } = req.query
      const purchase = await StripePurchase.findOne(({ _id: purchaseId })).populate([
        { path: 'template', model: Template },
        { path: 'user', model: User }
      ])
      const meta = {
        canSetPassword: purchase.openCount === 0 && purchase.user && !purchase.user.password
      }
      if(!purchase){
        return res.json({ status: false, message: 'This purchase does not exist', template: null, meta })
      }
      const { status } = await stripe.paymentIntents.retrieve(
        paymentIntentId
      )
      if(status !== 'succeeded'){
        return res.json({ 
          status: false, 
          message: `This purchase is not completed yet, refresh this page in a few minutes, contact support if this issue persists. Purchase status: ${status}`, 
          template: null, 
          meta 
        })
      }
      if(status === 'succeeded' && !purchase.completed){
        await completePurchase(paymentIntentId, purchaseId)
      }
      const { title } = purchase.template
      const downloadURL = `${process.env.APP_URL}/purchase/download-zip?purchaseId=${purchase._id}`
      res.json({ template: { title, downloadURL }, message: '', status: true, meta })
    }catch(err){
      console.log(err)
      res.json({ status: false, message: 'Something went wrong, try refreshing this page or contact support if this issue persists', template: null, meta: null })
    }
  })

  return router
}


module.exports = routes;