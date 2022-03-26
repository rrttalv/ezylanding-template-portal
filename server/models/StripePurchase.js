const mongoose = require('mongoose')
const Schema = mongoose.Schema

const StripePurchaseSchema = new Schema({
  stripeCustomerId: {
    type: String
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  completed: {
    type: Boolean,
    default: false
  },
  paymentIntentId: {
    type: String
  },
  clientSecret: {
    type: String
  },
  tag: {
    type: String
  },
  template: {
    type: Schema.Types.ObjectId,
    ref: 'template'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  completedAt: {
    type: Date
  },
  price: {
    type: Number
  }
})

const StripePurchase = mongoose.model('StripePurchase', StripePurchaseSchema)

const createPurchase = async (user, customerId, paymentIntentId, clientSecret, tag, price, template) => {
  return await StripePurchase.create({
    user,
    stripeCustomerId: customerId,
    paymentIntentId,
    clientSecret,
    tag,
    price,
    template
  })
}

const completePurchase = async (paymentIntentId, purchaseId) => {
  return await StripePurchase.updateOne({ paymentIntentId, _id: purchaseId, completed: { $ne: true } }, { $set: { completedAt: new Date(), completed: true } })
}

module.exports = { StripePurchase, createPurchase, completePurchase }