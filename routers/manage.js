const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const verify = require('../middleware/verifyToken')
const bodyParser = require('body-parser')
const fs = require('fs')
var ejs = require('ejs')
var path = require('path')

const {
  registerValidation,
  loginValidation
} = require('../validate/validation')

router.get('/users', verify, async (req, res) => {
  try {
    res.render('users',{ 
        name: req.name,
        email: req.email
    });
  } catch (err) {
    console.log(err)
    // res.status(500).send({ error: 'Something failed!' })
  }
})

router.get('/clients', verify, async (req, res) => {
    // console.log(req.body); 

  // var query = await Client.find({}, { English: 0, Español: 0, Français: 0, Arabic: 0, __v: 0 })

  // //console.log(JSON.stringify(query));

  // query = JSON.stringify(query);
  // //console.log(query)

  // let data = JSON.parse(query)

  //   res.status(200).send({
  //   success: 'true',
  //   message: 'todos retrieved successfully',
  //   result: data,
  //   Count: data.length
  // })

  //res.status(200).send({result: data, count: data.length})

  res.render('view',{ 
    // req.session.
    name: req.name,
    email: req.email
    //data: data
});
  // try {
  //   res.render('clients',{ 
  //       name: req.name,
  //       email: req.email
  //   });
  // } catch (err) {
  //   console.log(err)
  //   // res.status(500).send({ error: 'Something failed!' })
  // }
})

module.exports = router
