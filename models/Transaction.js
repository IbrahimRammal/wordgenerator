const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const transactionSchema = mongoose.Schema({
    voucherAddress: { //admin manager editor
        type: String,
    },
    voucherType: { //admin manager editor
        type: String,
    },
    invoiceType: {
        type: String
    },
    invoiceAddress: {
        type: String
    },
    invoiceNumber: {
        type: String
    },
    rate: {
        type: String
    },
    currency: {
        type: String
    },
    ready: {
        type: String
    },
    deleted: {
        type: String
    },
    flag: {
        type: String
    },
    total: {
        type: String
    },
    paidClinetName: {
        type: String
    },
    paidClientID: {
        type: String
    },
    counter: {
        type: String
    },
    debit: {
        type: String
    },
    credit: {
        type: String
    },
    user_created: {type: 'String'},
    user_edit: {type: 'String'},
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
})

// Sets the created_at parameter equal to the current time
transactionSchema.pre("save", function (next) {
    now = new Date();
    this.updated_at = now;
    if (!this.created_at) {
      this.created_at = now;
    }
    next();
  });

const Transaction = mongoose.model('Transaction', transactionSchema)

module.exports = Transaction