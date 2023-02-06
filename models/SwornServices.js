const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')



const swornSchema = mongoose.Schema({
  sworn: {
    type: 'String'
  },
  s0: {
    name: {
      type: 'String'
    },
    nameA: {
      type: 'String'
    },
    father: {
      type: 'String'
    }
  }
})

const SwornServices = mongoose.model('SwornServices', swornSchema)

module.exports = SwornServices
