const express = require("express");
const next = require("next");
const mongoose = require('mongoose')
const session = require('express-session')
const passport = require('passport')
const MongoStore = require("connect-mongo")

const PORT = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const templateRoutes = require("./routes/templates.js");
const purchaseRoutes = require("./routes/purchase.js");

app
  .prepare()
  .then(() => {
    const server = express();

    server.use(express.json())
    // Allows for cross origin domain request:
    server.use(function (req, res, next) {
      res.header('Access-Control-Allow-Origin', '*')
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
      next()
    })
    
    const { MONGO_STRING } = process.env
    const clientPromise = mongoose.connect(MONGO_STRING, { useNewUrlParser: true, useUnifiedTopology: true }).then(conn => conn.connection.getClient())
    const db = mongoose.connection
    db.on('error', e => {
      console.log(e)
    })
    db.once('open', () => {
      // we're connected !
      console.log('Mongodb Connection Successful')
    })
    const sessionStore = MongoStore.create({
      clientPromise: clientPromise,
      dbName: process.env.DB_NAME,
      stringify: false
    })
    const sessionMiddleware = session({
      store: sessionStore,
      secret: 'asdasda',
      saveUninitialized: false,
      resave: false,
      cookie: { maxAge: 24 * 60 * 60 * 1000, domain: 'localhost', secure: false },
    })
    server.use(sessionMiddleware)

    server.use("/templates", templateRoutes(server));
    server.use("/purchase", purchaseRoutes(server));

    server.get("*", (req, res) => {
      return handle(req, res);
    })

    server.listen(PORT, err => {
      if (err) throw err;
      console.log(`> Ready on ${PORT}`);
    })

  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });