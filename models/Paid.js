const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const subPayment = mongoose.Schema({ 
  clientID: "string",
  fullname: "string",
  name: "string",
  surname: "string",
  father: "string",
  address: "string",
  docid: "string",
  paid: "string",
  remain: "string",
  href: "string",
  mobile: "string",
  type: "string",
  total: "string",
  language: "string",
  docModel: "string",
  createUser: "string",
  updateUser: "string",
  createTime: "string",
  updateTime: "string",
  numberOfUpdate: "Number"
}, { timestamps: { createdAt: 'created_at' } });

const paidSchema = mongoose.Schema({
  combineid: {
    type: "String",
  },
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
  mother: {
    type: "String",
  },
  mothersurname: {
    type: "String",
  },
  nationaltiy: {
    type: "String",
  },
  sex: {
    type: "String",
  },
  familystatus: {
    type: "String",
  },
  governorate: {
    type: "String",
  },
  district: {
    type: "String",
  },
  city: {
    type: "String",
  },
  quarter: {
    type: "String",
  },
  street: {
    type: "String",
  },
  building: {
    type: "String",
  },
  floor: {
    type: "String",
  },
  mobile: {
    type: "String",
  },
  work: {
    type: "String",
  },
  fax: {
    type: "String",
  },
  email: {
    type: "String",
  },
  profession: {
    type: "String",
  },
  address: {
    type: "String",
  },
  telephone: {
    type: "String",
  },
  religion: {
    type: "String",
  },
  placeofbirthlocal: {
    type: "String",
  },
  placeofbirthdistrict: {
    type: "String",
  },
  dateofbirth: {
    type: "String",
  },
  placeregistry: {
    type: "String",
  },
  noregistry: {
    type: "String",
  },
  payment : [subPayment]
});

const Paid = mongoose.model("Paid", paidSchema);
const Payment = mongoose.model("Payment", subPayment);

module.exports = {
  Paid: Paid,
  Payment: Payment
};
