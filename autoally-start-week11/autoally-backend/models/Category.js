const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Utils = require('./../Utils')

// schema
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String    
  },
//   price: {
//     type: Number,
//     required: true
//   },
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
const categoryModel = mongoose.model('Category', categorySchema)

// export
module.exports = categoryModel