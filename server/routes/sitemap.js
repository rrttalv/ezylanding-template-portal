const express = require("express");
const fs = require('fs');
const path = require('path');
const { Template } = require('../models/Template')

const router = express.Router()


const staticPaths = fs
.readdirSync(path.join(__dirname, "../../pages"))
.filter((staticPage) => {
  return ![
    "api",
    "_app.js",
    'templates',
    "_document.js",
    "index.js",
    "404.js",
    "sitemap.xml.js",
  ].includes(staticPage);
})

const routes = (app) => {

  router.get('/sitemap.xml', async (req, res) => {
    const templates = await Template.find({ publicTemplate: { $eq: true } }).sort({ 'updatedAt': -1 })
    const templatePaths = templates.map(template => {
      return {
        path: `template/${template.slug}-${template._id}`,
        updateDate: new Date(template.updatedAt).toISOString(),
        updateInterval: 'monthly'
      }
    })
    templatePaths.splice(0, 0, {
      path: `templates`,
      updateDate: new Date(templates[0].updatedAt).toISOString(),
      updateInterval: 'weekly'
    })
    templatePaths.splice(0, 0, {
      path: ``,
      updateDate: new Date(templates[0].updatedAt).toISOString(),
      updateInterval: 'weekly'
    })
    const paths = [...staticPaths]
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`
    const lastUpdatedDate = `2022-04-22T12:58:01.302Z`
    templatePaths.map(meta => {
      sitemap += `<url>
      <loc>${process.env.APP_URL}/${meta.path}</loc>
      <lastmod>${meta.updateDate}</lastmod>
      <changefreq>${meta.updateInterval}</changefreq>
      <priority>1.0</priority>
      </url>`
    })
    staticPaths.map(path => {
      sitemap += `<url>
      <loc>${process.env.APP_URL}/${path}</loc>
      <lastmod>${lastUpdatedDate}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>1.0</priority>
      </url>`
    })
    sitemap += '</urlset>'
    res.type('application/xml')
    res.send(sitemap)
  })

  return router
}

module.exports = routes