const express = require("express");
const { getTemplateAssetS3Url, getTemplateFromS3 } = require("../helpers/aws");
const { compileTemplatePage } = require("../helpers/html");
const router = express.Router();
const { Template } = require('../models/Template')
const { StripeItem } = require('../models/StripeItem')

function routes(app) {
  
  const getPriceRange = async () => {
    const items = await StripeItem.find(({ tag: { $in: ['single-raw', 'single-webpack' ] } }))
    const sorted = items.sort((a, b) => a.price - b.price)
    const prices = sorted.map(item => { return { price: (item.price / 100).toFixed(2), tag: item.tag } })
    const priceRange = '$' + prices[0].price + ' - $' + prices[prices.length - 1].price
    return priceRange
  }

  router.get("/template/:id", (req, res) => {
    return app.render(req, res, "/templates", { id: req.params.id });
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