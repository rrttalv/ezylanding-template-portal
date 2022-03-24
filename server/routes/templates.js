const express = require("express");
const router = express.Router();

function routes(app) {
  
  router.get("/templates/:id", (req, res) => {
    return app.render(req, res, "/templates", { id: req.params.id });
  });

  router.get("/templates", (req, res) => {
    return app.render(req, res, "/templates", { id: req.params.id });
  })

  return router;
};

module.exports = routes;