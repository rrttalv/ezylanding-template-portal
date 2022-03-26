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

const createUser = async (email, stripeCustomerId) => {
  return await User.create({ email, stripeCustomerId })
}

const setUserPassword = async (userId, rawPassword) => {
  const password = await bcrypt.hash(rawPassword)
  return await User.updateOne({ _id: userId }, { $set: { password } })
}

module.exports = { User, createUser }