const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const expenseTypeCodeSchema = mongoose.Schema({
    expenseType: {
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

const ExpenseTypeCode = mongoose.model('ExpenseTypeCode', expenseTypeCodeSchema)

module.exports = ExpenseTypeCode
