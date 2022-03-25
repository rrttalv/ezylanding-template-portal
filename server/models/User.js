const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')

const UserSchema = new Schema({
  email: {
    type: String
  },
  password: {
    type: String
  },
  userCategory: {
    type: String
  },
  twitterProfileId: {
    type: String
  },
  googleId: {
    type: String
  },
  githubId: {
    type: String
  },
  stripeCustomerId: {
    type: String
  },
  level: {
    type: Number,
    default: 1
  }
})


const User = mongoose.model('User', UserSchema)

const createUser = async (email, customerId) => {
  return await User.create({ email, customerId })
}

const setUserPassword = async (userId, password) => {
  const password = await bcrypt.hash(password)
  return await User.updateOne({ _id: userId }, { $set: { password } })
}

module.exports = { User, createUser }