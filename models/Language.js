const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')



const languageSchema = mongoose.Schema({
  language: {
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

const LanguageServices = mongoose.model('LanguageServices', languageSchema)

module.exports = LanguageServices