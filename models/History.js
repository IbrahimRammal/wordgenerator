const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const historySchema = mongoose.Schema({
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
  idnumber: {
    type: "String",
  },
  note: {
    type: "String",
  },
  category: {
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
  action: {
    type: "String",
  },
  details: {
    type: "String",
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  //   payment : [subPayment]
});

// Sets the created_at parameter equal to the current time
historySchema.pre("save", function (next) {
  now = new Date();
  this.updated_at = now;
  if (!this.created_at) {
    this.created_at = now;
  }
  next();
});

const History = mongoose.model("History", historySchema);
// const Payment = mongoose.model("Payment", subPayment);

module.exports = History;

// module.exports = {
//   Paid: Paid,
//   Payment: Payment
// };
