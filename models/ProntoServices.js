const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const prontoSchema = mongoose.Schema({
  pronto: {
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

const ProntoServices = mongoose.model('ProntoServices', prontoSchema)

module.exports = ProntoServices
