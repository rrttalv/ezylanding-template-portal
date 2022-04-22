const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TemplateSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  templateId: {
    type: String,
    required: true
  },
  frameworkId: {
    type: String
  },
  description: {
    type: String
  },
  publicTemplate: {
    type: Boolean,
    default: false
  },
  featured: {
    type: Boolean,
    default: false
  },
  subTitle: {
    type: String,
  },
  listed: {
    type: Boolean,
    default: false
  },
  pageLength: {
    type: Number,
    default: 1
  },
  categories: {
    type: [{
      type: String
    }]
  },
  downloads: {
    type: Number
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    default: 'New template'
  },
  slug: {
    type: String
  },
  tags: {
    type: [{
      type: String
    }]
  },
  updatedAt: {
    type: Date
  }
})

const Template = mongoose.model('Template', TemplateSchema)

module.exports = { Template }