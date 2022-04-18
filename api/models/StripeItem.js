const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ItemSchema = new Schema({
  name: {
    type: String
  },
  stripeId: {
    type: String
  },
  tag: {
    type: String
  },
  price: {
    type: Number
  }
})

const StripeItem = mongoose.model('StripeItem', ItemSchema)

module.exports = { StripeItem }