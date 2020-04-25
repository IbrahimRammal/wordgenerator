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

router.get('/paid', verify, async (req, res) => {
  // console.log(req.body); 

res.render('paid',{ 
  // req.session.
  name: req.name,
  email: req.email
  //data: data
});

})

router.get('/clients', verify, async (req, res) => {
    // console.log(req.body); 

  res.render('view',{ 
    // req.session.
    name: req.name,
    email: req.email
    //data: data
});

})

module.exports = router
