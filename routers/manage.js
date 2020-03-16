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
  try {
    res.render('clients',{ 
        name: req.name,
        email: req.email
    });
  } catch (err) {
    console.log(err)
    // res.status(500).send({ error: 'Something failed!' })
  }
})

module.exports = router
