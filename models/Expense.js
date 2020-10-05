const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// const expenseSchema = mongoose.Schema(
//   {
//     clientID: "string",
//     fullname: "string",
//     name: "string",
//     surname: "string",
//     father: "string",
//     address: "string",
//     docid: "string",
//     paid: "Number",
//     remain: "Number",
//     total: "Number",
//     href: "string",
//     mobile: "string",
//     category: "string",
//     language: "string",
//     docModel: "string",
//     createUser: "string",
//     updateUser: "string",
//     createTime: "string",
//     updateTime: "string",
//     numberOfUpdate: "Number",
//   },
//   { timestamps: { createdAt: "created_at" } }
// );

const expenseSchema = mongoose.Schema({
  fullname: {
    type: "String",
  },
  name: {
    type: "String",
  },
  surname: {
    type: "String",
  },
  father: {
    type: "String",
  },
  phone: {
    type: "Number",
  },
  note: {
    type: "String",
  },
  category: {
    type: "String",
  },
  type: {
    type: "String",
  },
  paid: {
    type: "Number",
  },
  total: {
    type: "Number",
  },
  address: {
    type: "String",
  },
  paymentMode: {
    type: "String",
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  //   payment : [subPayment]
});

// Sets the created_at parameter equal to the current time
expenseSchema.pre("save", function (next) {
  now = new Date();
  this.updated_at = now;
  if (!this.created_at) {
    this.created_at = now;
  }
  next();
});

const Expense = mongoose.model("Expense", expenseSchema);
// const Payment = mongoose.model("Payment", subPayment);

module.exports = Expense;

// module.exports = {
//   Paid: Paid,
//   Payment: Payment
// };
