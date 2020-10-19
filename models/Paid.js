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
  paid: "Number",
  remain: "Number",
  total: "Number",
  href: "string",
  mobile: "string",
  category: "string",
  language: "string",
  docModel: "string",
  createUser: "string",
  updateUser: "string",
  createTime: "string",
  updateTime: "string",
  numberOfUpdate: "Number",
  registration: "string",
  vat: "string"
}, { timestamps: { createdAt: 'created_at' } });

const SubProntoInvoiceinUSA = mongoose.Schema({ 
  docid: "string",
  clientID: "string",
  fullname: "string",
  total: "Number",
  paid: "Number",
  remain: "Number",
  createUser: "string",
  updateUser: "string",
  createTime: "string",
  updateTime: "string"
}, { timestamps: { createdAt: 'created_at' } });

const SubProntoInvoiceinLBP = mongoose.Schema({ 
  docid: "string",
  clientID: "string",
  fullname: "string",
  total: "Number",
  paid: "Number",
  remain: "Number",
  createUser: "string",
  updateUser: "string",
  createTime: "string",
  updateTime: "string"
}, { timestamps: { createdAt: 'created_at' } });

const SubSwornTranslationInvoice = mongoose.Schema({ 
  docid: "string",
  clientID: "string",
  fullname: "string",
  total: "Number",
  paid: "Number",
  remain: "Number",
  createUser: "string",
  updateUser: "string",
  createTime: "string",
  updateTime: "string"
}, { timestamps: { createdAt: 'created_at' } });

const subInvoice = mongoose.Schema({ 
  docid: "string",
  clientID: "string",
  fullname: "string",
  category: "string",
  paid: "string",
  remain: "string",
  href: "string",
  total: "Number",
  createUser: "string",
  updateUser: "string",
  createTime: "string",
  updateTime: "string"
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
  registration: {
    type: "String",
  },
  vat: {
    type: "String",
  },
  mof: {
    type: "String",
  },
  payment : [subPayment],
  invoice: [subInvoice],
  ProntoInvoiceinUSA : [SubProntoInvoiceinUSA],
  ProntoInvoiceinLBP : [SubProntoInvoiceinLBP],
  SwornTranslationInvoice : [SubSwornTranslationInvoice]
});

const Paid = mongoose.model("Paid", paidSchema);
const Payment = mongoose.model("Payment", subPayment);
const Invoice = mongoose.model("Invoice", subInvoice);
const PaymentProntoInvoiceinUSA  = mongoose.model("PaymentProntoInvoiceinUSA", SubProntoInvoiceinUSA);
const PaymentProntoInvoiceinLBP  = mongoose.model("PaymentProntoInvoiceinLBP", SubProntoInvoiceinLBP);
const PaymentSwornTranslationInvoice  = mongoose.model("PaymentSwornTranslationInvoice", SubSwornTranslationInvoice);

module.exports = {
  Paid: Paid,
  Payment: Payment,
  Invoice: Invoice,
  PaymentProntoInvoiceinUSA: PaymentProntoInvoiceinUSA,
  PaymentProntoInvoiceinLBP: PaymentProntoInvoiceinLBP,
  PaymentSwornTranslationInvoice: PaymentSwornTranslationInvoice
};
