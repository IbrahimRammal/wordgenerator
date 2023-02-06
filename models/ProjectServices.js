const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')



const projectSchema = mongoose.Schema({
  project: {
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

const ProjectServices = mongoose.model('ProjectServices', projectSchema)

module.exports = ProjectServices
