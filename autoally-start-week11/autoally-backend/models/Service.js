const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Utils = require('../Utils')

// schema
const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String    
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  image: {
    type: String,
    required: true    
  }
  
}, { timestamps: true })

// model
const serviceModel = mongoose.model('Service', serviceSchema)

// export
module.exports = serviceModel