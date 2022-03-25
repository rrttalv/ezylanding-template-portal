const express = require("express");
const { getTemplateAssetS3Url } = require("../helpers.js/aws");
const router = express.Router();
const { Template } = require('../models/Template')
const { StripeItem } = require('../models/StripeItem')

function routes(app) {
  
  router.get("/template/:id", (req, res) => {
    return app.render(req, res, "/templates", { id: req.params.id });
  })

  router.get('/templates-list', async(req, res) => {
    const { pageNo } = req.query
    const skip = Number(pageNo ? pageNo : 0)
    const list = await Template.find({ listed: { $eq: true }, publicTemplate: { $eq: true } }).limit(20).skip(skip).lean()
    const items = await StripeItem.find(({ tag: { $in: ['single-html', 'single' ] } }))
    const sorted = items.sort((a, b) => a.price - b.price)
    const prices = sorted.map(item => { return { price: (item.price / 100).toFixed(2), tag: item.tag } })
    console.log(prices)
    const priceRange = '$' + prices[0].price + ' - $' + prices[prices.length - 1].price
    const templates = list.map(template => {
      const thumbkey = `templates/${template.templateId}_thumb`
      return {
        ...template,
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