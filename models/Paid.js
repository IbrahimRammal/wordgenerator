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
  currency: "string",
  rate: "string",
  mobile: "string",
  category: "string",
  language: "string",
  docModel: "string",
  emptyModel: "string",
  createUser: "string",
  updateUser: "string",
  createTime: "string",
  updateTime: "string",
  numberOfUpdate: "Number",
  registration: "string",
  vat: "string"
}, { timestamps: { createdAt: 'created_at' } });

const subInvoice = mongoose.Schema({ 
  docid: "string",
  clientID: "string",
  fullname: "string",
  category: "string",
  paid: "string",
  remain: "string",
  invoiceNumber: "string",
  href: "string",
  total: "Number",
  currency: "string",
  rate: "string",
  createUser: "string",
  updateUser: "string",
  createTime: "string",
  updateTime: "string"
}, { timestamps: { createdAt: 'created_at' } });

const subInvoiceS = mongoose.Schema({ 
  docid: "string",
  clientID: "string",
  fullname: "string",
  category: "string",
  paid: "string",
  remain: "string",
  invoiceNumber: "string",
  countervalue: "string",
  accountNumber: "string",
  href: "string",
  total: "Number",
  currency: "string",
  rate: "string",
  createUser: "string",
  updateUser: "string",
  createTime: "string",
  updateTime: "string"
}, { timestamps: { createdAt: 'created_at' } });

const swornSubVoucher = mongoose.Schema({ 
  docid: "string",
  clientID: "string",
  fullname: "string",
  category: "string",
  paid: "string",
  remain: "string",
  invoiceNumber: "string",
  countervalue: "string",
  accountNumber: "string",
  href: "string",
  total: "Number",
  currency: "string",
  rate: "string",
  createUser: "string",
  updateUser: "string",
  createTime: "string",
  updateTime: "string"
}, { timestamps: { createdAt: 'created_at' } });

const prontoSubVoucher = mongoose.Schema({ 
  docid: "string",
  clientID: "string",
  fullname: "string",
  category: "string",
  paid: "string",
  remain: "string",
  invoiceNumber: "string",
  countervalue: "string",
  accountNumber: "string",
  href: "string",
  total: "Number",
  currency: "string",
  rate: "string",
  createUser: "string",
  updateUser: "string",
  createTime: "string",
  updateTime: "string"
}, { timestamps: { createdAt: 'created_at' } });

const unofficialSubVoucher = mongoose.Schema({ 
  docid: "string",
  clientID: "string",
  fullname: "string",
  category: "string",
  paid: "string",
  remain: "string",
  invoiceNumber: "string",
  countervalue: "string",
  accountNumber: "string",
  href: "string",
  total: "Number",
  currency: "string",
  rate: "string",
  createUser: "string",
  updateUser: "string",
  createTime: "string",
  updateTime: "string"
}, { timestamps: { createdAt: 'created_at' } });

const unofficialSubInvoice = mongoose.Schema({ 
  docid: "string",
  clientID: "string",
  fullname: "string",
  category: "string",
  paid: "string",
  remain: "string",
  transcation: "string",
  voucher: "string",
  invoiceNumber: "string",
  countervalue: "string",
  accountNumber: "string",
  href: "string",
  total: "Number",
  currency: "string",
  rate: "string",
  createUser: "string",
  updateUser: "string",
  createTime: "string",
  updateTime: "string"
}, { timestamps: { createdAt: 'created_at' } });

const purchaseSubInvoice = mongoose.Schema({ 
  docid: "string",
  clientID: "string",
  fullname: "string",
  category: "string",
  paid: "string",
  remain: "string",
  transcation: "string",
  voucher: "string",
  invoiceNumber: "string",
  countervalue: "string",
  accountNumber: "string",
  href: "string",
  total: "Number",
  currency: "string",
  rate: "string",
  createUser: "string",
  updateUser: "string",
  createTime: "string",
  updateTime: "string"
}, { timestamps: { createdAt: 'created_at' } });


const prontoSubInvoice = mongoose.Schema({ 
  docid: "string",
  clientID: "string",
  fullname: "string",
  category: "string",
  paid: "string",
  remain: "string",
  transcation: "string",
  voucher: "string",
  invoiceNumber: "string",
  countervalue: "string",
  accountNumber: "string",
  href: "string",
  total: "Number",
  currency: "string",
  rate: "string",
  createUser: "string",
  updateUser: "string",
  createTime: "string",
  updateTime: "string"
}, { timestamps: { createdAt: 'created_at' } });

const swornSubInvoice = mongoose.Schema({ 
  docid: "string",
  clientID: "string",
  fullname: "string",
  category: "string",
  paid: "string",
  remain: "string",
  transcation: "string",
  voucher: "string",
  invoiceNumber: "string",
  countervalue: "string",
  accountNumber: "string",
  href: "string",
  total: "Number",
  currency: "string",
  rate: "string",
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
  invoiceS: [subInvoiceS],
  unofficialInvoice: [unofficialSubInvoice],
  //purchaseInvoice: [purchaseSubInvoice],
  prontoInvoice: [prontoSubInvoice],
  swornInvoice: [swornSubInvoice],
  unofficialVoucher: [unofficialSubVoucher],
  prontoVoucher: [prontoSubVoucher],
  swornVoucher: [swornSubVoucher]
  // ProntoInvoiceinUSA : [SubProntoInvoiceinUSA],
  // ProntoInvoiceinLBP : [SubProntoInvoiceinLBP],
  // SwornTranslationInvoice : [SubSwornTranslationInvoice]
});

const Paid = mongoose.model("Paid", paidSchema);
const Payment = mongoose.model("Payment", subPayment);
const Invoice = mongoose.model("Invoice", subInvoice);
const InvoiceS = mongoose.model("InvoiceNew", subInvoiceS);
const unofficialInvoice = mongoose.model("UnofficialInvoice", unofficialSubInvoice);
//const purchaseInvoice = mongoose.model("PurchaseInvoice", purchaseSubInvoice);
const prontoInvoice = mongoose.model("ProntoInvoice", prontoSubInvoice);
const swornInvoice = mongoose.model("SwornInvoice", swornSubInvoice);

const unofficialVoucher = mongoose.model("UnofficialVoucher", unofficialSubVoucher);
const prontoVoucher = mongoose.model("ProntoVoucher", prontoSubVoucher);
const swornVoucher = mongoose.model("SwornVoucher", swornSubVoucher);


// const PaymentProntoInvoiceinUSA  = mongoose.model("PaymentProntoInvoiceinUSA", SubProntoInvoiceinUSA);
// const PaymentProntoInvoiceinLBP  = mongoose.model("PaymentProntoInvoiceinLBP", SubProntoInvoiceinLBP);
// const PaymentSwornTranslationInvoice  = mongoose.model("PaymentSwornTranslationInvoice", SubSwornTranslationInvoice);

module.exports = {
  Paid: Paid,
  Payment: Payment,
  Invoice: Invoice,
  InvoiceS: InvoiceS,
  unofficialInvoice: unofficialInvoice,
  //purchaseInvoice: purchaseInvoice,
  prontoInvoice: prontoInvoice,
  swornInvoice: swornInvoice,
  unofficialVoucher: unofficialVoucher,
  prontoVoucher: prontoVoucher,
  swornVoucher: swornVoucher
  // PaymentProntoInvoiceinUSA: PaymentProntoInvoiceinUSA,
  // PaymentProntoInvoiceinLBP: PaymentProntoInvoiceinLBP,
  // PaymentSwornTranslationInvoice: PaymentSwornTranslationInvoice
};



// const SubProntoInvoiceinUSA = mongoose.Schema({ 
//   docid: "string",
//   clientID: "string",
//   fullname: "string",
//   total: "Number",
//   paid: "Number",
//   remain: "Number",
//   createUser: "string",
//   updateUser: "string",
//   createTime: "string",
//   updateTime: "string"
// }, { timestamps: { createdAt: 'created_at' } });

// const SubProntoInvoiceinLBP = mongoose.Schema({ 
//   docid: "string",
//   clientID: "string",
//   fullname: "string",
//   total: "Number",
//   paid: "Number",
//   remain: "Number",
//   createUser: "string",
//   updateUser: "string",
//   createTime: "string",
//   updateTime: "string"
// }, { timestamps: { createdAt: 'created_at' } });

// const SubSwornTranslationInvoice = mongoose.Schema({ 
//   docid: "string",
//   clientID: "string",
//   fullname: "string",
//   total: "Number",
//   paid: "Number",
//   remain: "Number",
//   createUser: "string",
//   updateUser: "string",
//   createTime: "string",
//   updateTime: "string"
// }, { timestamps: { createdAt: 'created_at' } });
