const express = require('express')
const router = express.Router()
const Utils = require('../utils')
const Service = require('../models/Service')
const path = require('path')

// GET- get all services ---------------------------
router.get('/', Utils.authenticateToken, (req, res) => {
  Service.find().populate('user', '_id firstName lastName')
    .then(services => {
      if(services == null){
        return res.status(404).json({
          message: "No services found"
        })
      }
      res.json(services)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        message: "Problem getting services"
      })
    })  
})

// POST - create new service --------------------------------------
router.post('/', (req, res) => {
  // validate 
  if(Object.keys(req.body).length === 0){   
    return res.status(400).send({message: "Service content can't be empty"})
  }
  // validate - check if image file exist
  if(!req.files || !req.files.image){
    return res.status(400).send({message: "Image can't be empty"})
  }

  console.log('req.body = ', req.body)

  // image file must exist, upload, then create new service
  let uploadPath = path.join(__dirname, '..', 'public', 'images')
  Utils.uploadFile(req.files.image, uploadPath, (uniqueFilename) => {    
    // create new service
    let newService = new Service({
      name: req.body.name,
      category: req.body.category,
      description: req.body.description,
      user: req.body.user,
      image: uniqueFilename
    })
  
    newService.save()
    .then(service => {        
      // success!  
      // return 201 status with service object
      return res.status(201).json(service)
    })
    .catch(err => {
      console.log(err)
      return res.status(500).send({
        message: "Problem creating service",
        error: err
      })
    })
  })
})

// export
module.exports = router