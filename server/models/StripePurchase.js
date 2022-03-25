const mongoose = require('mongoose')
const Schema = mongoose.Schema

const StripePurchase = new Schema({
  purchaseId: {
    type: String
  },
  customerId: {
    type: String
  },
  tag: {
    type: String
  },
  price: {
    type: Number
  }
})

const StripePurchase = mongoose.model('StripePurchase', StripePurchase)

module.exports = { StripePurchase }