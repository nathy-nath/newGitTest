const express = require('express')
const router = express.Router()
const Utils = require('./../utils')
const Category = require('./../models/Category')

// GET- get all categories ---------------------------
router.get('/', Utils.authenticateToken, (req, res) => {
  Category.find().populate('user', '_id firstName lastName')
    .then(categories => {
      if(categories == null){
        return res.status(404).json({
          message: "No categories found"
        })
      }
      res.json(categories)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        message: "Problem getting categories"
      })
    })  
})

// export
module.exports = router