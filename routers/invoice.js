// const compression = require('compression');
const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verify = require("../middleware/verifyToken");
const bodyParser = require("body-parser");
const fs = require("fs");
var ejs = require("ejs");
const Birth = require("../models/BirthCertificate");
const Consent = require("../models/Consenttotravel");
const Death = require("../models/DeathCertificate");
const Divorce = require("../models/DivorceCertificate");
const Driver = require("../models/Driverslicensecertificate");
const Private = require("../models/PrivateDriverslicense");
const Family = require("../models/FamilyExtract");
const IDCard = require("../models/IDCard");
const Individual = require("../models/IndividualExtract");
const Marriage = require("../models/MarriageCertificate");
const MoF = require("../models/MoFRegistration");
const NSSF = require("../models/NSSFServiceCertificate");
const Police = require("../models/Policerecord");
const Residence = require("../models/ResidenceCertificate");
const RPermit = require("../models/ResidencyPermit");
const WPermit = require("../models/WorkPermit");
const ETemplate = require("../models/EmptyTemplate");
const Client = require("../models/Clients");

const PIUSA = require("../models/ProntoInvoiceinUSA");
const PILBD = require("../models/ProntoInvoiceinLBP");
const SWORNI = require("../models/SwornTranslationInvoice");

const SwornInvoice = require("../models/SwornInvoice");
const SwornIV = SwornInvoice.SwornInvoice;
const SwornInvoiceCounter = SwornInvoice.SwornInvoiceCounter; 


const ProntoInvoice = require("../models/ProntoInvoice");
const ProntoIV = ProntoInvoice.ProntoInvoice;
const ProntoInvoiceCounter = ProntoInvoice.ProntoInvoiceCounter; 


const UnofficialInvoice = require("../models/UnofficialInvoice");
const UnofficialIV = UnofficialInvoice.UnofficialInvoice;
const UnofficialInvoiceCounter = UnofficialInvoice.UnofficialInvoiceCounter; 

const PurchaseInvoice = require("../models/PurchaseInvoice");
const PurchaseIV = PurchaseInvoice.PurchaseInvoice;
const PurchaseInvoiceCounter = PurchaseInvoice.PurchaseInvoiceCounter; 

const UnofficialPurchaseInvoice = require("../models/UnofficialPurchaseInvoice");
const UnofficialPurchaseIV = UnofficialPurchaseInvoice.UnofficialPurchaseInvoice;
const UnofficialPurchaseInvoiceCounter = UnofficialPurchaseInvoice.UnofficialPurchaseInvoiceCounter; 

const ProntoPurchaseInvoice = require("../models/ProntoPurchaseInvoice");
const ProntoPurchaseIV = ProntoPurchaseInvoice.ProntoPurchaseInvoice;
const ProntoPurchaseInvoiceCounter = ProntoPurchaseInvoice.ProntoPurchaseInvoiceCounter; 

const SwornReceiptVoucherS = require("../models/SwornReceiptVoucher");
const SwornRV = SwornReceiptVoucherS.SwornRV;
const SwornReceiptCounter = SwornReceiptVoucherS.SwornReceiptCounter; 

const SwornPaymentVoucherS = require("../models/SwornPaymentVoucher");
const SwornPV = SwornPaymentVoucherS.SwornPV;
const SwornPaymentCounter = SwornPaymentVoucherS.SwornPaymentCounter; 


const ProntoReceiptVoucherS = require("../models/ProntoReceiptVoucher");
const ProntoRV = ProntoReceiptVoucherS.ProntoRV;
const ProntoReceiptCounter = ProntoReceiptVoucherS.ProntoReceiptCounter; 

const ProntoPaymentVoucherS = require("../models/ProntoPaymentVoucher");
const ProntoPV = ProntoPaymentVoucherS.ProntoPV;
const ProntoPaymentCounter = ProntoPaymentVoucherS.ProntoPaymentCounter; 


const UnofficialReceiptVoucherS = require("../models/UnofficialReceiptVoucher");
const UnofficialRV = UnofficialReceiptVoucherS.UnofficialRV;
const UnofficialReceiptCounter = UnofficialReceiptVoucherS.UnofficialReceiptCounter; 

const UnofficialPaymentVoucherS = require("../models/UnofficialPaymentVoucher");
const { query } = require("express");
const UnofficialPV = UnofficialPaymentVoucherS.UnofficialPV;
const UnofficialPaymentCounter = UnofficialPaymentVoucherS.UnofficialPaymentCounter; 


const Transaction = require("../models/Transaction");


//const dateFormat = require("dateformat");
var PizZip = require("pizzip");
var Docxtemplater = require("docxtemplater");
var path = require("path");

var mongoose = require("mongoose");

//Service Model
const ProjectServices = require("../models/ProjectServices");
const SwornServices = require("../models/SwornServices");
const ProntoServices = require("../models/ProntoServices");

//Language Model
const Language = require("../models/Language");

//model client paider
const PaidModel = require("../models/Paid");
const SupplierModel = require("../models/Supplier");

const Expense = require("../models/Expense");

const History = require("../models/History");

const Paid = PaidModel.Paid;
const Suppliers = SupplierModel.Supplier;
const Payment = PaidModel.Payment;

const paidpath = "./GenerateHtml/paidform.ejs";

var testdb = require("../db/test");

const {
  registerValidation,
  loginValidation,
} = require("../validate/validation");
const { Console } = require("console");
const { PaymentProntoInvoiceinUSA, swornVoucher } = require("../models/Paid");
const PILBP = require("../models/ProntoInvoiceinLBP");

router.get("/languageview", verify, async (req, res) => {
  // console.log(req.body);
  req.keep = "true";

  res.render("language", {
    // req.session.
    name: req.name,
    email: req.email,
    //data: data
  });
});


router.post("/GetDataLanguage", verify, async (req, res) => {
  console.log(req.body);

  var result = [];

  var query = await Language.find(
    {},
    { __v: 0 }
  );

  //Format the json
  for (var i = 0; i < query.length; i++) {
    let temp = {
      _id: query[i]._id,
      language: query[i].language,
      name: query[i].s0.name,
      nameA: query[i].s0.nameA,
      father: query[i].s0.father,
    };
    result.push(temp);
  }

  // console.log(result);
  res.send(result);
});

router.post("/Language", verify, async (req, res) => {
  try {
    // console.log(req.body.value);
    var a = req.body.value;
    console.log(a);

    var data = "";

    var respnseAddID = "";
    if (req.body.action == "insert") {
      if (!isEmptyOrSpaces(a.language)) {
        data = {
          language: a.language,
          s0: {
            name: isUndefinedOrNull(a.name) ? "" : a.name,
            nameA: isUndefinedOrNull(a.nameA) ? "" : a.nameA,
            father: isUndefinedOrNull(a.father) ? "" : a.father,
          }
        };

        // let promise = new Promise((resolve, reject) => {
        //   setTimeout(() => resolve("done!"), 1000)
        // });

        const language = new Language(data);
        const savedLanguage = await language.save();

        console.log("save new language :" + savedLanguage);

        // wait 3 seconds
        //await new Promise((resolve, reject) => setTimeout(resolve, 500));
        // createHistoryLog(
        //   req.email,
        //   "Create New Client",
        //   "Created a new Client with name " + a.fullname,
        //   req.id
        // );

        console.log(savedLanguage["_id"] + "asdfsadfds");
        respnseAddID = savedLanguage["_id"];
      }

      //return savedClient['_id']
    }
    if (req.body.action == "update") {
      console.log(req.body);

      // await createHistoryLog(
      //   req.email,
      //   "Update Client",
      //   "Updated Client with name " + a.fullname,
      //   req.id
      // );

      var anyThing = await Language.findById(req.body["key"], function (
        err,
        user
      ) {
        if (err) {
          console.log(err);
        } else {
          try {
            //you should to some checking if the supplied value is present (!= undefined) and if it differs from the currently stored one
            user.language = a.language;
            user.s0.name = isUndefinedOrNull(a.name) ? "" : a.name;
            user.s0.nameA = isUndefinedOrNull(a.nameA) ? "" : a.nameA;
            user.s0.father = isUndefinedOrNull(a.father) ? "" : a.father;

            user.save(function (err) {
              if (err) {
                //handleError(err)
                console.log(err);
              } else {
                res.send({});

                return;
              }
            });
          }
          catch (error)
          {
            console.log(err);
            res.send("error");
          }
        }
      });

      //res.send({})

      return;
    }
    if (req.body.action == "remove") {
      console.log(req.body);
      //console.log("removed" + a)
      // var query = {}
      // var criteria = language + "." + modelCheck
      // query[criteria] = clientpaid

      var keyID = mongoose.Types.ObjectId(req.body.key);
      console.log("removed" + req.body["key"]);
      // var userFullname = "";
      const anyThing = await Language.findById(req.body["key"], function (
        err,
        user
      ) {
        // console.log("delete pyament" + user);
        // userFullname = isUndefinedOrNull(user.s0.fullname) ? "" : user.s0.fullname;
        // const start = createHistoryLog(req.email,"Delete Client", "Delete Client with name " + isUndefinedOrNull(user.s0.fullname) ? "" : user.s0.fullname, req.id);
      });


      await Language.findByIdAndDelete(req.body["key"], function (err, user) {
        // createHistoryLog(req.email,"Delete Client", "Delete Client with name " + isUndefinedOrNull(user.fullname) ? "" : user.fullname, req.id);
        if (err) console.log(err);
        console.log("Successful deletion");
      });

      res.send({});

      return;
    }
    //var query = await Client.find({}, { English: 0, Español: 0, Français: 0, Arabic: 0, __v: 0 })

    var sendId = respnseAddID != "" ? respnseAddID : a["_id"];

    let result = {
      _id: respnseAddID,
      language: data.language,
      name: data.s0.name,
      nameA: data.s0.nameA,
      father: data.s0.father,
    };

    //console.log("Add client : " + JSON.stringify(result))
    res.send(result);
  } catch (err) {
    console.log(err);
    res.send("error");
  }
});

router.get("/prontoview", verify, async (req, res) => {
  // console.log(req.body);
  req.keep = "true";

  res.render("pronto", {
    // req.session.
    name: req.name,
    email: req.email,
    //data: data
  });
});


router.post("/GetDataPronto", verify, async (req, res) => {
  console.log(req.body);

  var result = [];

  var query = await ProntoServices.find(
    {},
    { __v: 0 }
  );

  //Format the json
  for (var i = 0; i < query.length; i++) {
    let temp = {
      _id: query[i]._id,
      pronto: query[i].pronto,
      name: query[i].s0.name,
      nameA: query[i].s0.nameA,
      father: query[i].s0.father,
    };
    result.push(temp);
  }

  // console.log(result);
  res.send(result);
});

router.post("/Pronto", verify, async (req, res) => {
  try {
    // console.log(req.body.value);
    var a = req.body.value;
    console.log(a);

    var data = "";

    var respnseAddID = "";
    if (req.body.action == "insert") {
      if (!isEmptyOrSpaces(a.pronto)) {
        data = {
          pronto: a.pronto,
          s0: {
            name: isUndefinedOrNull(a.name) ? "" : a.name,
            nameA: isUndefinedOrNull(a.nameA) ? "" : a.nameA,
            father: isUndefinedOrNull(a.father) ? "" : a.father,
          }
        };

        // let promise = new Promise((resolve, reject) => {
        //   setTimeout(() => resolve("done!"), 1000)
        // });

        const pronto = new ProntoServices(data);
        const savedPronto = await pronto.save();

        console.log("save new client :" + savedPronto);

        // wait 3 seconds
        //await new Promise((resolve, reject) => setTimeout(resolve, 500));
        // createHistoryLog(
        //   req.email,
        //   "Create New Client",
        //   "Created a new Client with name " + a.fullname,
        //   req.id
        // );

        console.log(savedPronto["_id"] + "asdfsadfds");
        respnseAddID = savedPronto["_id"];
      }

      //return savedClient['_id']
    }
    if (req.body.action == "update") {
      console.log(req.body);

      // await createHistoryLog(
      //   req.email,
      //   "Update Client",
      //   "Updated Client with name " + a.fullname,
      //   req.id
      // );

      var anyThing = await ProntoServices.findById(req.body["key"], function (
        err,
        user
      ) {
        if (err) {
          console.log(err);
        } else {
          try {
            //you should to some checking if the supplied value is present (!= undefined) and if it differs from the currently stored one
            user.pronto = a.pronto;
            user.s0.name = isUndefinedOrNull(a.name) ? "" : a.name;
            user.s0.nameA = isUndefinedOrNull(a.nameA) ? "" : a.nameA;
            user.s0.father = isUndefinedOrNull(a.father) ? "" : a.father;

            user.save(function (err) {
              if (err) {
                //handleError(err)
                console.log(err);
              } else {
                res.send({});

                return;
              }
            });
          }
          catch (error)
          {
            console.log(err);
            res.send("error");
          }
        }
      });

      //res.send({})

      return;
    }
    if (req.body.action == "remove") {
      console.log(req.body);
      //console.log("removed" + a)
      // var query = {}
      // var criteria = language + "." + modelCheck
      // query[criteria] = clientpaid

      var keyID = mongoose.Types.ObjectId(req.body.key);
      console.log("removed" + req.body["key"]);
      // var userFullname = "";
      const anyThing = await ProntoServices.findById(req.body["key"], function (
        err,
        user
      ) {
        // console.log("delete pyament" + user);
        // userFullname = isUndefinedOrNull(user.s0.fullname) ? "" : user.s0.fullname;
        // const start = createHistoryLog(req.email,"Delete Client", "Delete Client with name " + isUndefinedOrNull(user.s0.fullname) ? "" : user.s0.fullname, req.id);
      });

      // console.log("delete pyament" + anyThing.fullname);
      // await createHistoryLog(
      //   req.email,
      //   "Delete Client",
      //   "Delete Client with name " + anyThing.fullname,
      //   req.id
      // );

      await ProntoServices.findByIdAndDelete(req.body["key"], function (err, user) {
        // createHistoryLog(req.email,"Delete Client", "Delete Client with name " + isUndefinedOrNull(user.fullname) ? "" : user.fullname, req.id);
        if (err) console.log(err);
        console.log("Successful deletion");
      });

      res.send({});

      return;
    }
    //var query = await Client.find({}, { English: 0, Español: 0, Français: 0, Arabic: 0, __v: 0 })

    var sendId = respnseAddID != "" ? respnseAddID : a["_id"];

    let result = {
      _id: respnseAddID,
      pronto: data.pronto,
      name: data.s0.name,
      nameA: data.s0.nameA,
      father: data.s0.father,
    };

    //console.log("Add client : " + JSON.stringify(result))
    res.send(result);
  } catch (err) {
    console.log(err);
    res.send("error");
  }
});

router.get("/incomestatement", verify, async (req, res) => {
  // console.log(req.body);
  req.keep = "true";

  res.render("incomestatement", {
    // req.session.
    name: req.name,
    email: req.email,
    //data: data
  });
});

router.get("/clientstatement", verify, async (req, res) => {
  req.keep = "true";
  var query = Client.find({}, { s0: 0, __v: 0 });
  query.exec(function (err, result) {
    if (!err) {
      //let rawdata = "";
      //console.log(rawdata);
      //rawdata = result
      let dataReturn = result;

      //console.log(result)

      res.render("clientstatement", {
        // req.session.
        name: req.name,
        email: req.email,
        clientname: result,
      });
    } else {
      console.log(err);
    }
  });
});

router.get("/supplierstatement", verify, async (req, res) => {
  // console.log(req.body);
  req.keep = "true";

  res.render("supplierstatement", {
    // req.session.
    name: req.name,
    email: req.email,
    //data: data
  });
});

router.post("/invoicestatement/GetData", verify, async (req, res) => {
  var result = [];
  var subresult = [];

  console.log("start action");
  console.log(req.query);
  console.log(req.body);
  var flag = 0;

  try {
    var action = req.query.action;
    var id = req.query.id;

    var query;

    // 👇️ Get the last 2 digits of the current year
    const twoDigitYear = new Date().getFullYear().toString().slice(-2);
    console.log(twoDigitYear); // 👉️ '23'
    const last2Num = Number(twoDigitYear);
    
    if (action == "monthyear") {

      query = await Transaction.find(
          {}
        );

      //console.log("queryinvoice.length " + query["invoice"].length); 
      for(var i = 0; i< query.length;i++){
          try{

            //{ company: 'Company A', month: 'January', revenue: 5000, expenses: 3000 },
            // let invoiceNumber = "";
            // let invoiceYear = query[i].invoiceNumber;
            let swornIncomeY = 0,prontoIncomeY = 0,unofficialIncomeY = 0,swornExpenseY = 0,prontoExpenseY = 0,unofficialExpenseY = 0;
            let swornIncomeM = 0,prontoIncomeM = 0,unofficialIncomeM = 0,swornExpenseM = 0,prontoExpenseM = 0,unofficialExpenseM = 0;

            var totalValue = parseFloat(query[i]["prontoInvoice"].total);
            var rateValue = parseFloat(query[i]["prontoInvoice"].rate);
            var currencyCheck = query[i].currency;
  
            if(currencyCheck == "LBP")
            {
              totalValue = totalValue / rateValue;
              totalValue = totalValue.toFixed(2)
            } else {
  
            }
          
            subParent = {
              
            };
  
  
            //subParent.invoiceNumber = invoiceNumber;
            console.log(subParent);
  
            result.push(subParent);
  
          //console.log("subParent: " + JSON.stringify(subParent));
        } 
        catch(err){
          console.log(err);
        }
    }
      //console.log(result);
      res.send(result);
      // res.send(result);
      return;
      //console.log(query);
    } else if (action == "purchaseunofficial") {

      query = await Suppliers.find(
          {},
          { English: 0, Español: 0, Français: 0, Arabic: 0, __v: 0 }
        );

      //console.log("queryinvoice.length " + query["invoice"].length); 
      for(var i = 0; i< query.length;i++){
      for (var j = 0; j < query[i]["unofficialPurchaseInvoice"].length; j++) {
        //console.log(user["invoice"][j].href);
          try{
            //new
            // s1fi
            //console.log("query invoice" + query[i]["unofficialPurchaseInvoice"]);
            let invoiceNumber = "";
            let invoiceYear = query[i]["unofficialPurchaseInvoice"][j].invoiceNumber;
            var totalValue = parseFloat(query[i]["unofficialPurchaseInvoice"][j].total);
            var rateValue = parseFloat(query[i]["unofficialPurchaseInvoice"][j].rate);
            var currencyCheck = query[i]["unofficialPurchaseInvoice"][j].currency;
  
            if(currencyCheck == "LBP")
            {
              totalValue = totalValue / rateValue;
              totalValue = totalValue.toFixed(2)
            } else {
  
            }

            if(parseInt(id) == 1)
            {
              if(!invoiceYear.endsWith("/" + last2Num)){
                console.log(last2Num + " not same year");
                continue;
              }
            } else if(parseInt(id) == 2) {
              if(invoiceYear.endsWith("/" + last2Num)){
                console.log(last2Num + " same year");
                continue;
              }
            } else {}
          
            subParent = {
              //put parent id temor
              _id: query[i]["unofficialPurchaseInvoice"][j].clientID,
              combineid: query[i]["unofficialPurchaseInvoice"][j].clientID + "_" + query[i]["unofficialPurchaseInvoice"][j]._id + "_" + query[i]["unofficialPurchaseInvoice"][j].docid  + "_" + query[i]["unofficialPurchaseInvoice"][j].voucher  + "_" + query[i]["unofficialPurchaseInvoice"][j].transcation,
              transcation: query[i]["unofficialPurchaseInvoice"][j].transcation,
              voucher: query[i]["unofficialPurchaseInvoice"][j].voucher,
              paymentid: query[i]["unofficialPurchaseInvoice"][j].clientID,
              clientID: query[i]["unofficialPurchaseInvoice"][j].clientID,
              fullname: query[i]["unofficialPurchaseInvoice"][j].fullname,
              docid: query[i]["unofficialPurchaseInvoice"][j].docid,
              invoiceNumber: query[i]["unofficialPurchaseInvoice"][j].invoiceNumber,
              countervalue: query[i]["unofficialPurchaseInvoice"][j].countervalue,
              href: query[i]["unofficialPurchaseInvoice"][j].href,
              category: query[i]["unofficialPurchaseInvoice"][j].category,
              total: query[i]["unofficialPurchaseInvoice"][j].total,
              totalValue: totalValue,
              remain: query[i]["unofficialPurchaseInvoice"][j].remain,
              paid: query[i]["unofficialPurchaseInvoice"][j].paid,
              rate: query[i]["unofficialPurchaseInvoice"][j].rate,
              currency: query[i]["unofficialPurchaseInvoice"][j].currency,
              Type: query[i]["unofficialPurchaseInvoice"][j].voucherType,
              Download: "DOWNLOAD",
              Voucher: "VOUCHER",
              Edit: "EDIT",
              createTime: query[i]["unofficialPurchaseInvoice"][j].createTime,
              updateTime: query[i]["unofficialPurchaseInvoice"][j].updateTime
            };
  
  
            //subParent.invoiceNumber = invoiceNumber;
            console.log(subParent);
  
            result.push(subParent);
  
          //console.log("subParent: " + JSON.stringify(subParent));
        } 
        catch(err){
          console.log(err);
        }
      }
    }
      //console.log(result);
      res.send(result);
      // res.send(result);
      return;
      //console.log(query);
    } else {
      res.send({});
      return;
    }

    //Get all payment
    for (var i = 0; i < query.length; i++) {
      let totalpaidpriceUSD = 0;
      let totalremainpriceUSD = 0;
      let totalvaluepriceUSD = 0;
      let unit = 0;
      let totalpaidpriceLBP = 0;
      let totalremainpriceLBP = 0;
      let totalvaluepriceLBP = 0;

      let totalLBP = 0;
      let totalUSD = 0;

      let parent = {
        _id: "",
        fullname: "",
        mobile: "",
        address: "",
        unit: "",
        // paid: "",
        // remain: "",
        // total: "",
        subtasks: [],
        totalpaidpriceUSD: "",
        totalremainpriceUSD: "",
        totalvaluepriceUSD: "",
        totalpaidpriceLBP: "",
        totalremainpriceLBP: "",
        totalvaluepriceLBP: ""
      };

      parent._id = query[i]._id;
      parent.fullname = query[i].fullname;
      parent.mobile = query[i].mobile;
      parent.address = query[i].address;
      for (var j = 0; j < query[i]["invoice"].length; j++) {
        try{
        let subParent = {
          _id: query[i]["invoice"][j]._id,
          paymentid: query[i]._id,
          fullname: query[i]["invoice"][j].fullname,
          docid: query[i]["invoice"][j].docid,
          href: query[i]["invoice"][j].href,
          category: query[i]["invoice"][j].category,
          total: query[i]["invoice"][j].total,
          remains: query[i]["invoice"][j].remains,
          paid: query[i]["invoice"][j].paid,
          currency: query[i]["invoice"][j].currency,
          Download: "DOWNLOAD",
          Edit: "EDIT",
          createTime: query[i]["invoice"][j].createTime,
          updateTime: query[i]["invoice"][j].updateTime
        };


        unit = j + 1;
        if(query[i]["invoice"][j].currency == "USD"){
          totalpaidpriceUSD += query[i]["invoice"][j].paid;
          totalremainpriceUSD += query[i]["invoice"][j].remain;
          totalvaluepriceUSD += query[i]["invoice"][j].total;
        }
        else{
          totalpaidpriceLBP += query[i]["invoice"][j].paid;
          totalremainpriceLBP += query[i]["invoice"][j].remain;
          totalvaluepriceLBP += query[i]["invoice"][j].total;
        }


        if (action == "sub") {
          console.log("sudfasdjfkl jaslkdjf klasjdf lkjaskldj fklsdj ");
          result.push(subParent);
          console.log("result: " + JSON.stringify(result));
        }
      } catch(err){
        console.log(err)
      }

        //console.log("subParent: " + JSON.stringify(subParent));
      }

      parent.unit = unit;

      parent.totalPaidUSD = totalpaidpriceUSD;
      parent.totalRemainUSD = totalremainpriceUSD;
      parent.totalUSD = totalvaluepriceUSD;

      parent.totalPaidLBP = totalpaidpriceLBP;
      parent.totalRemainLBP = totalremainpriceLBP;
      parent.totalLBP = totalvaluepriceLBP;

      // parent.paid = totalpaidprice;
      // parent.remain = totalremainprice;
      // parent.total = totalvalueprice;

      if (action == "all") result.push(parent);

    }

    //console.log("result: " + result);
    //console.log("result: " + JSON.stringify(result));
    res.send(result);
  } catch (err) {
    console.log(err);
    res.send({});
  }
});

router.get("/charts", verify, async (req, res) => {
  // console.log(req.body);
  req.keep = "true";

  res.render("charts", {
    // req.session.
    name: req.name,
    email: req.email,
    //data: data
  });
});

router.get("/transaction", verify, async (req, res) => {
  // console.log(req.body);
  req.keep = "true";

  res.render("transaction", {
    // req.session.
    name: req.name,
    email: req.email,
    //data: data
  });
});


router.get("/swornview", verify, async (req, res) => {
  // console.log(req.body);
  req.keep = "true";

  res.render("sworn", {
    // req.session.
    name: req.name,
    email: req.email,
    //data: data
  });
});

router.post("/GetDataTransaction", verify, async (req, res) => {
  console.log(req.body);

  var result = [];

  var query = await Transaction.find(
    {},
    { __v: 0 }
  );

  //Format the json
  for (var i = 0; i < query.length; i++) {
    let temp = {
      _id: query[i]._id,
      paidClinetName: query[i].paidClinetName,
      voucherAddress: query[i].voucherAddress,
      voucherType: query[i].voucherType,
      invoiceType: query[i].invoiceType,
      invoiceAddress: query[i].invoiceAddress,
      invoiceNumber: query[i].invoiceNumber,
      rate: query[i].rate,
      currency: query[i].currency,
      ready: query[i].ready,
      deleted: query[i].deleted,
      flag: query[i].flag,
      total: query[i].total,
      paidClinetName: query[i].paidClinetName,
      paidClientID: query[i].paidClientID,
      counter: query[i].counter,
      debit: query[i].debit,
      credit: query[i].credit,
      created_at: query[i].created_at,
      updated_at: query[i].updated_at,
    };
    result.push(temp);
  }

  // console.log(result);
  res.send(result);
});

router.post("/GetDataSworn", verify, async (req, res) => {
  console.log(req.body);

  var result = [];

  var query = await SwornServices.find(
    {},
    { __v: 0 }
  );

  //Format the json
  for (var i = 0; i < query.length; i++) {
    let temp = {
      _id: query[i]._id,
      sworn: query[i].sworn,
      name: query[i].s0.name,
      nameA: query[i].s0.nameA,
      father: query[i].s0.father,
    };
    result.push(temp);
  }

  // console.log(result);
  res.send(result);
});

router.post("/Sworn", verify, async (req, res) => {
  try {
    // console.log(req.body.value);
    var a = req.body.value;
    console.log(a);

    var data = "";

    var respnseAddID = "";
    if (req.body.action == "insert") {
      if (!isEmptyOrSpaces(a.sworn)) {
        data = {
          sworn: a.sworn,
          s0: {
            name: isUndefinedOrNull(a.name) ? "" : a.name,
            nameA: isUndefinedOrNull(a.nameA) ? "" : a.nameA,
            father: isUndefinedOrNull(a.father) ? "" : a.father,
          }
        };

        // let promise = new Promise((resolve, reject) => {
        //   setTimeout(() => resolve("done!"), 1000)
        // });

        const sworn = new SwornServices(data);
        const savedSworn = await sworn.save();

        console.log("save new client :" + savedSworn);

        // wait 3 seconds
        //await new Promise((resolve, reject) => setTimeout(resolve, 500));
        // createHistoryLog(
        //   req.email,
        //   "Create New Client",
        //   "Created a new Client with name " + a.fullname,
        //   req.id
        // );

        console.log(savedSworn["_id"] + "asdfsadfds");
        respnseAddID = savedSworn["_id"];
      }

      //return savedClient['_id']
    }
    if (req.body.action == "update") {
      console.log(req.body);

      // await createHistoryLog(
      //   req.email,
      //   "Update Client",
      //   "Updated Client with name " + a.fullname,
      //   req.id
      // );

      var anyThing = await SwornServices.findById(req.body["key"], function (
        err,
        user
      ) {
        if (err) {
          console.log(err);
        } else {
          try {
            //you should to some checking if the supplied value is present (!= undefined) and if it differs from the currently stored one
            user.sworn = a.Sworn;
            user.s0.name = isUndefinedOrNull(a.name) ? "" : a.name;
            user.s0.nameA = isUndefinedOrNull(a.nameA) ? "" : a.nameA;
            user.s0.father = isUndefinedOrNull(a.father) ? "" : a.father;

            user.save(function (err) {
              if (err) {
                //handleError(err)
                console.log(err);
              } else {
                res.send({});

                return;
              }
            });
          }
          catch (error)
          {
            console.log(err);
            res.send("error");
          }
        }
      });

      //res.send({})

      return;
    }
    if (req.body.action == "remove") {
      console.log(req.body);
      //console.log("removed" + a)
      // var query = {}
      // var criteria = language + "." + modelCheck
      // query[criteria] = clientpaid

      var keyID = mongoose.Types.ObjectId(req.body.key);
      console.log("removed" + req.body["key"]);
      // var userFullname = "";
      const anyThing = await SwornServices.findById(req.body["key"], function (
        err,
        user
      ) {
        // console.log("delete pyament" + user);
        // userFullname = isUndefinedOrNull(user.s0.fullname) ? "" : user.s0.fullname;
        // const start = createHistoryLog(req.email,"Delete Client", "Delete Client with name " + isUndefinedOrNull(user.s0.fullname) ? "" : user.s0.fullname, req.id);
      });

      // console.log("delete pyament" + anyThing.fullname);
      // await createHistoryLog(
      //   req.email,
      //   "Delete Client",
      //   "Delete Client with name " + anyThing.fullname,
      //   req.id
      // );

      await SwornServices.findByIdAndDelete(req.body["key"], function (err, user) {
        // createHistoryLog(req.email,"Delete Client", "Delete Client with name " + isUndefinedOrNull(user.fullname) ? "" : user.fullname, req.id);
        if (err) console.log(err);
        console.log("Successful deletion");
      });

      res.send({});

      return;
    }
    //var query = await Client.find({}, { English: 0, Español: 0, Français: 0, Arabic: 0, __v: 0 })

    var sendId = respnseAddID != "" ? respnseAddID : a["_id"];

    let result = {
      _id: respnseAddID,
      sworn: data.sworn,
      name: data.s0.name,
      nameA: data.s0.nameA,
      father: data.s0.father,
    };

    //console.log("Add client : " + JSON.stringify(result))
    res.send(result);
  } catch (err) {
    console.log(err);
    res.send("error");
  }
});

router.get("/projectview", verify, async (req, res) => {
  // console.log(req.body);
  req.keep = "true";

  res.render("project", {
    // req.session.
    name: req.name,
    email: req.email,
    //data: data
  });
});

router.post("/GetDataProject", verify, async (req, res) => {
  console.log(req.body);

  var result = [];

  var query = await ProjectServices.find(
    {},
    { __v: 0 }
  );

  //Format the json
  for (var i = 0; i < query.length; i++) {
    let temp = {
      _id: query[i]._id,
      project: query[i].project,
      name: query[i].s0.name,
      nameA: query[i].s0.nameA,
      father: query[i].s0.father,
    };
    result.push(temp);
  }

  // console.log(result);
  res.send(result);
});

router.post("/Project", verify, async (req, res) => {
  try {
    // console.log(req.body.value);
    var a = req.body.value;
    console.log(a);

    var data = "";

    var respnseAddID = "";
    if (req.body.action == "insert") {
      if (!isEmptyOrSpaces(a.project)) {
        data = {
          project: a.project,
          s0: {
            name: isUndefinedOrNull(a.name) ? "" : a.name,
            nameA: isUndefinedOrNull(a.nameA) ? "" : a.nameA,
            father: isUndefinedOrNull(a.father) ? "" : a.father,
          }
        };

        // let promise = new Promise((resolve, reject) => {
        //   setTimeout(() => resolve("done!"), 1000)
        // });

        const project = new ProjectServices(data);
        const savedProject = await project.save();

        console.log("save new client :" + savedClient);

        // wait 3 seconds
        //await new Promise((resolve, reject) => setTimeout(resolve, 500));
        // createHistoryLog(
        //   req.email,
        //   "Create New Client",
        //   "Created a new Client with name " + a.fullname,
        //   req.id
        // );

        console.log(savedProject["_id"] + "asdfsadfds");
        respnseAddID = savedProject["_id"];
      }

      //return savedClient['_id']
    }
    if (req.body.action == "update") {
      console.log(req.body);

      // await createHistoryLog(
      //   req.email,
      //   "Update Client",
      //   "Updated Client with name " + a.fullname,
      //   req.id
      // );

      var anyThing = await ProjectServices.findById(req.body["key"], function (
        err,
        user
      ) {
        if (err) {
          console.log(err);
        } else {
          try {
            //you should to some checking if the supplied value is present (!= undefined) and if it differs from the currently stored one
            user.project = a.project;
            user.s0.name = isUndefinedOrNull(a.name) ? "" : a.name;
            user.s0.nameA = isUndefinedOrNull(a.nameA) ? "" : a.nameA;
            user.s0.father = isUndefinedOrNull(a.father) ? "" : a.father;

            user.save(function (err) {
              if (err) {
                //handleError(err)
                console.log(err);
              } else {
                res.send({});

                return;
              }
            });
          }
          catch (error)
          {
            console.log(err);
            res.send("error");
          }
        }
      });

      //res.send({})

      return;
    }
    if (req.body.action == "remove") {
      console.log(req.body);
      //console.log("removed" + a)
      // var query = {}
      // var criteria = language + "." + modelCheck
      // query[criteria] = clientpaid

      var keyID = mongoose.Types.ObjectId(req.body.key);
      console.log("removed" + req.body["key"]);
      // var userFullname = "";
      const anyThing = await ProjectServices.findById(req.body["key"], function (
        err,
        user
      ) {
        // console.log("delete pyament" + user);
        // userFullname = isUndefinedOrNull(user.s0.fullname) ? "" : user.s0.fullname;
        // const start = createHistoryLog(req.email,"Delete Client", "Delete Client with name " + isUndefinedOrNull(user.s0.fullname) ? "" : user.s0.fullname, req.id);
      });

      // console.log("delete pyament" + anyThing.fullname);
      // await createHistoryLog(
      //   req.email,
      //   "Delete Client",
      //   "Delete Client with name " + anyThing.fullname,
      //   req.id
      // );

      await ProjectServices.findByIdAndDelete(req.body["key"], function (err, user) {
        // createHistoryLog(req.email,"Delete Client", "Delete Client with name " + isUndefinedOrNull(user.fullname) ? "" : user.fullname, req.id);
        if (err) console.log(err);
        console.log("Successful deletion");
      });

      res.send({});

      return;
    }
    //var query = await Client.find({}, { English: 0, Español: 0, Français: 0, Arabic: 0, __v: 0 })

    var sendId = respnseAddID != "" ? respnseAddID : a["_id"];

    let result = {
      _id: respnseAddID,
      project: data.project,
      name: data.s0.name,
      nameA: data.s0.nameA,
      father: data.s0.father,
    };

    //console.log("Add client : " + JSON.stringify(result))
    res.send(result);
  } catch (err) {
    console.log(err);
    res.send("error");
  }
});

router.get("/listprontoinvoice", verify, async (req, res) => {
  // console.log(req.body);
  req.keep = "true";

  res.render("invoicepronto", {
    // req.session.
    name: req.name,
    email: req.email,
    //data: data
  });
});

router.get("/listpurchaseinvoice", verify, async (req, res) => {
  // console.log(req.body);
  req.keep = "true";

  res.render("invoicepurchase", {
    // req.session.
    name: req.name,
    email: req.email,
    //data: data
  });
});

router.get("/listpurchaseprontoinvoice", verify, async (req, res) => {
  // console.log(req.body);
  req.keep = "true";

  res.render("invoicepurchasepronto", {
    // req.session.
    name: req.name,
    email: req.email,
    //data: data
  });
});


router.get("/listpurchaseunofficialinvoice", verify, async (req, res) => {
  // console.log(req.body);
  req.keep = "true";

  res.render("invoicepurchaseunofficial", {
    // req.session.
    name: req.name,
    email: req.email,
    //data: data
  });
});



router.get("/listsworninvoice", verify, async (req, res) => {
  // console.log(req.body);
  req.keep = "true";

  res.render("invoicesworn", {
    // req.session.
    name: req.name,
    email: req.email,
    //data: data
  });
});

router.get("/listunofficialinvoice", verify, async (req, res) => {
  // console.log(req.body);
  req.keep = "true";

  res.render("invoiceunofficial", {
    // req.session.
    name: req.name,
    email: req.email,
    //data: data
  });
});

////////////////////////////

router.get("/listprontoinvoiceold", verify, async (req, res) => {
  // console.log(req.body);
  req.keep = "true";

  res.render("invoiceprontoold", {
    // req.session.
    name: req.name,
    email: req.email,
    //data: data
  });
});

router.get("/listpurchaseinvoiceold", verify, async (req, res) => {
  // console.log(req.body);
  req.keep = "true";

  res.render("invoicepurchaseold", {
    // req.session.
    name: req.name,
    email: req.email,
    //data: data
  });
});

router.get("/listpurchaseprontoinvoiceold", verify, async (req, res) => {
  // console.log(req.body);
  req.keep = "true";

  res.render("invoicepurchaseprontoold", {
    // req.session.
    name: req.name,
    email: req.email,
    //data: data
  });
});


router.get("/listpurchaseunofficialinvoiceold", verify, async (req, res) => {
  // console.log(req.body);
  req.keep = "true";

  res.render("invoicepurchaseunofficialold", {
    // req.session.
    name: req.name,
    email: req.email,
    //data: data
  });
});



router.get("/listsworninvoiceold", verify, async (req, res) => {
  // console.log(req.body);
  req.keep = "true";

  res.render("invoiceswornold", {
    // req.session.
    name: req.name,
    email: req.email,
    //data: data
  });
});

router.get("/listunofficialinvoiceold", verify, async (req, res) => {
  // console.log(req.body);
  req.keep = "true";

  res.render("invoiceunofficialold", {
    // req.session.
    name: req.name,
    email: req.email,
    //data: data
  });
});
////////////////////////////
router.post("/datainvoice", verify, async (req, res) => {
  try {
    // req.query.lang req.query.lang doc
    // get request parms
    // make the path string
    // check file if exits
    // If else for every schema to save
    // add path to parmaters on GenerateBCDocx function
    //console.log(req.query);
    if (
      !isEmptyOrSpaces(req.query.doc) &&
      !isEmptyOrSpaces(req.query.id)
    ) {
      let path = "./json/" + "English" + "/" + req.query.doc + ".json";
      let docxPath =
        "./DocumentTemplate/" + "English" + "/" + req.query.doc + ".docx";
      //console.log(path)
      if (fs.existsSync(path) && fs.existsSync(docxPath)) {
        console.log("Begain");
        let rawdata = fs.readFileSync(path, "utf-8");
        let data = JSON.parse(rawdata);
        let docArray = { clients: [], users: [], check: [], jobs: [], jobp: [], jobsP: [] }; // sar fe mwskleh bel array fams:[]
        let jsonObj = [];
        var invoiceNumberSend = "";
        var transcation = req.query.transcation;
        var voucher = req.query.voucher;
        
        if(transcation === 'undefined'){
          transcation = "";
        }

        if(voucher === 'undefined'){
          voucher = "";
        }

        //console.log(req.query);

        //Search all filed had been submit when get to the paid form break from this loop and then make another keys's
        //For paid client form to enter or check if there is already one there

        Object.keys(req.body).forEach(function (key) {
          let keys = key.split("_");
          //console.log(keys);
          if (keys.length == 2) {
            docArray[keys[0] + keys[1]] = req.body[key];
            data[keys[0]][keys[1]]["value"] = req.body[key];
          } else if (keys.length == 3) {
            docArray[keys[0] + keys[1] + keys[2]] = req.body[key];
            data[keys[0]][keys[1]][keys[2]]["value"] = req.body[key];
          } else if (keys.length == 4) {
          } else {
          }
        });

      let totalPayment = 0;

      if (data.hasOwnProperty("s4")) {
        if (data.s3.hasOwnProperty("check")) {
          for (var i = 0; i < data.s4.check.length; i++) {
            console.log(data.s4.check.length);
            console.log(i);
            if (req.body["s4_check_checkno_" + i] != null && !isEmptyOrSpaces(req.body["s4_check_checkno_" + i])) {
              data.s4.check[i].checkno = req.body["s4_check_checkno_" + i];
              data.s4.check[i].valuedate =
                req.body["s4_check_valuedate_" + i];
              data.s4.check[i].bankname = req.body["s4_check_bankname_" + i];

              docArray.check.push({
                pro: req.body["s4_check_checkno_" + i],
                stype: req.body["s4_check_valuedate_" + i],
                slan: req.body["s4_check_bankname_" + i]
              });
            }
          }
        } else{}
      }

      //console.log(data);
      //console.log(data.s3.jobs[i]);


      if (data.hasOwnProperty("s3")) {
        if (data.s3.hasOwnProperty("jobs")) {
          for (var i = 0; i < data.s3.jobs.length; i++) {
            if (req.body["s3_jobs_pro_" + i] != null && !isEmptyOrSpaces(req.body["s3_jobs_pro_" + i]) && req.body["s3_jobs_pro_" + i] != "Project Select ...") {
              data.s3.jobs[i].pro = req.body["s3_jobs_pro_" + i];
              // data.s3.jobs[i].stype =
              //   req.body["s3_jobs_stype_" + i];
                
              data.s3.jobs[i].stype =
              "Sworn Translation";

              var jobCounter = i + 1;

              data.s3.jobs[i].jn = jobCounter + "";
              data.s3.jobs[i].slan = req.body["s3_jobs_slan_" + i];
              data.s3.jobs[i].tlan = req.body["s3_jobs_tlan_" + i];
              data.s3.jobs[i].unit = req.body["s3_jobs_unit_" + i];

              data.s3.jobs[i].unitp = req.body["s3_jobs_unitp_" + i];
              data.s3.jobs[i].nunit = req.body["s3_jobs_nunit_" + i];
              data.s3.jobs[i].t = req.body["s3_jobs_t_" + i];

              if(req.body["s3_jobs_t_" + i] != null && req.body["s3_jobs_t_" + i] != "" && !isNaN(parseFloat(req.body["s3_jobs_t_" + i])))
              {
                totalPayment += parseFloat(req.body["s3_jobs_t_" + i]);
              }

              docArray.jobs.push({
                jn : jobCounter + "",
                pro: req.body["s3_jobs_pro_" + i],
                stype: "Sworn Translation",
                slan: req.body["s3_jobs_slan_" + i],
                tlan: req.body["s3_jobs_tlan_" + i],
                unit: req.body["s3_jobs_unit_" + i],
                unitp: req.body["s3_jobs_unitp_" + i],
                nunit: req.body["s3_jobs_nunit_" + i],
                t: req.body["s3_jobs_t_" + i]
              });
            }
          }
        } else if (data.s3.hasOwnProperty("jobp")) {

          for (var i = 0; i < data.s3.jobp.length; i++) {
            if (req.body["s3_jobp_proj_" + i] != null && !isEmptyOrSpaces(req.body["s3_jobp_proj_" + i])) {
              data.s3.jobp[i].proj = req.body["s3_jobp_proj_" + i];
              data.s3.jobp[i].stype =
                req.body["s3_jobp_stype_" + i];
                
              data.s3.jobp[i].slan = req.body["s3_jobp_slan_" + i];
              data.s3.jobp[i].tlan = req.body["s3_jobp_tlan_" + i];
              data.s3.jobp[i].unit = req.body["s3_jobp_unit_" + i];

              data.s3.jobp[i].unitp = req.body["s3_jobp_unitp_" + i];
              data.s3.jobp[i].wcount = req.body["s3_jobp_wcount_" + i];
              data.s3.jobp[i].t = req.body["s3_jobp_t_" + i];

              if(req.body["s3_jobp_t_" + i] != null && req.body["s3_jobp_t_" + i] != "" && !isNaN(parseFloat(req.body["s3_jobp_t_" + i])))
              {
                totalPayment += parseFloat(req.body["s3_jobp_t_" + i]);
              }

              docArray.jobp.push({
                proj: req.body["s3_jobp_proj_" + i],
                stype: req.body["s3_jobp_stype_" + i],
                slan: req.body["s3_jobp_slan_" + i],
                tlan: req.body["s3_jobp_tlan_" + i],
                unit: req.body["s3_jobp_unit_" + i],
                unitp: req.body["s3_jobp_unitp_" + i],
                wcount: req.body["s3_jobp_wcount_" + i],
                t: req.body["s3_jobp_t_" + i]
              });
            }
          }
        } else if (data.s3.hasOwnProperty("jobsP")) {

          for (var i = 0; i < data.s3.jobsP.length; i++) {
            if (req.body["s3_jobsP_t_" + i] != null && !isEmptyOrSpaces(req.body["s3_jobsP_t_" + i])) {
              data.s3.jobsP[i].quan = req.body["s3_jobsP_quan_" + i];
              data.s3.jobsP[i].desc =
                req.body["s3_jobsP_desc_" + i];
                
              data.s3.jobsP[i].unitp = req.body["s3_jobsP_unitp_" + i];
              data.s3.jobsP[i].t = req.body["s3_jobsP_t_" + i];

              if(req.body["s3_jobsP_t_" + i] != null && req.body["s3_jobsP_t_" + i] != "" && !isNaN(parseFloat(req.body["s3_jobsP_t_" + i])))
              {
                totalPayment += parseFloat(req.body["s3_jobsP_t_" + i]);
              }

              docArray.jobsP.push({
                quan: req.body["s3_jobsP_quan_" + i],
                desc: req.body["s3_jobsP_desc_" + i],
                unitp: req.body["s3_jobsP_unitp_" + i],
                t: req.body["s3_jobsP_t_" + i]
              });
            }
          }
        } else{}
      }

        //Time date
        const event = new Date();
        const options = { year: "numeric", month: "long", day: "numeric" };

        var datetime = "";

        // check if original or not
        //docArray['o1'] = "True Copy of the Original";
        //req.body["original"]
        console.log("check if checked");

        var originalFlag = true;
        if (req.body["original"] == null) {
          originalFlag = false;
        }
        //console.log();

        docArray["o1"] = "0";
        docArray["total"] = totalPayment;

        datetime = event.toLocaleDateString("en-US", {
          year: "numeric",
          day: "numeric",
          month: "long",
        });

        data["total"] = totalPayment;
        data["date"] = datetime;
        docArray["date"] = datetime;

        //track if original or not
        data["original"] = docArray["o1"];

        //return to defualt state ""
        if (docArray["o1"] == "0") docArray["o1"] = "";

        console.log("before save");

        var modelCheck = req.query.doc;
        var langCheck = "English";
        var id = req.query.id;
        var docID = req.query.docID != null ? req.query.docID : "";
        modelCheck = modelCheck.replace(/\s/g, "");

        let clientData = await Paid.findOne({ _id: id });

        if (modelCheck.includes("PurchaseInvoice")){
          clientData = await Suppliers.findOne({ _id: id });
        } else
        {
          //clientData = await Paid.findOne({ _id: id });
        }

        //console.log("namsdffffffffffffffffffffffffffff" + clientData.address);
        //console.log("namsdffffffffffffffffffffffffffff" + clientData.mobile);

        if (data.hasOwnProperty("s0")) {
          Object.keys(data.s0).forEach(function (key) {
            let keys = data.s0[key];

            if (!isEmptyOrSpaces(keys)) {
              keys = keys.split("_");
              //console.log(keys)
              //console.log(key)
              if (keys.length == 2) {
                //if (clientData[key]) {
                  //console.log('key: ' + key)
                  //console.log('mongodata: ' + clientData[key])
                  //console.log(keys[0] + ' ' + keys[1])
                  if(key != "fullname")
                    clientData[key] = data[keys[0]][keys[1]]["value"];
                  //console.log(data[keys[0]][keys[1]]['value'])
                //}
                // data1.s0[key] = req.body[key]
              } else if (keys.length == 3) {
                if (clientData(key)) {
                  clientData[key] = data[keys[0]][keys[1]][keys[2]]["value"];
                  // console.log(data[keys[0]][keys[1]][keys[2]]['value'])
                }
              } else {
              }
            }
          });
        }



        //save defualt data of paid client to reuse again
        var clientSavedData = await clientData.save();


        data["client"]["id"] = id;

        var downloadLinkGenerator = downloadLink(
          datetime,
          req.query.doc,
          clientData["fullname"]
        );

        var part1 = encodeURIComponent(downloadLinkGenerator[0]);
        var part2 = encodeURIComponent(downloadLinkGenerator[1]);

        data["download"] = "/api/posts/r/?valid=" + part1 + "&pass=" + part2;
        //console.log(data["download"]);

        docArray['s1f0'] = data["s1"]["f0"]["value"];

        if (modelCheck.includes("ProntoPurchaseInvoice")){
          docArray['s2f0'] = data["s2"]["f0"]["value"];
        }
        else if (modelCheck.includes("UnofficialPurchaseInvoice"))
        {
          docArray['s2f0'] = data["s2"]["f0"]["value"];
        } 
        else {}

        data["docArray"] = docArray;

        var rateEdit = data.s2.f7.value;
        rateEditSend = rateEdit;

        data["rate"] = rateEdit;



        // var docid = "";
        var ObjectId = require("mongoose").Types.ObjectId;
        var email = req.email;

        var clientInvoiceHistory = {
          fullname: clientData.fullname,
          clientID: id,
          docid: "",
          paid: "",
          total: totalPayment,
          category: modelCheck,
          createUser: "",
          updateUser: "",
          createTime: datetime,
          updateTime: datetime,
          remain: "",
          currency: "",
          rate: "",
          invoiceNumber: "",
          countervalue: "",
          accountNumber: "",
          transcation: "",
          voucherType: "",
          voucher: ""
        };

        var transcationInvoiceHistory = {
          voucherAddress: "",
          voucherType: "",
          invoiceType: "",
          invoiceAddress: "",
          invoiceNumber: "",
          rate: "",
          currency: "",
          ready: "",
          deleted: "",
          flag: "",
          total: "",
          paidClinetName: "",
          paidClientID: "",
          counter: "",
          debit: "",
          credit: ""
        };


        if (modelCheck.includes("SwornInvoice")) {
          data["currency"] = data.s2.f6.value;
          var currencyEdit = data["currency"];
          if (ObjectId.isValid(docID)) {
            data["user_edit"] = email;

            //var transcation = req.query.transcation;
            var voucher = req.query.voucher;

            const swornIV = await SwornIV.findOneAndUpdate(
              { _id: docID },
              data,
              { upsert: true },
              function (err, doc) {
                if (err) //console.log(err);
                console.log("Succesfully saved.");
              }
            );
            data.s1.f0.value = swornIV.countervalue;
            var invoiceNumberEdit = data.s1.f0.value;
            invoiceNumberSend = invoiceNumberEdit;

            //var rateEdit = data.s2.f7.value;
            //rateEditSend = rateEdit;

            docArray['s1f0'] = invoiceNumberSend;

            var dummyData = await Paid.updateOne(
              { _id: id,
                "swornInvoice.docid": docID,
              },
              {
                $set: {
                  "swornInvoice.$.invoiceNumber": invoiceNumberEdit,
                  "swornInvoice.$.currency": currencyEdit,
                  "swornInvoice.$.total": totalPayment,
                  "swornInvoice.$.updateTime": datetime,
                  "swornInvoice.$.rate": rateEdit,
                },
              },
              function (error, updatedData) {
                if (error) {
                  // return res.status(400).send(error);
                }
                //return res.status(200).send(updatedData);
              }
            );

            if(transcation != ""){
              var transactionEdit = await Transaction.updateOne(
                { _id: transcation },
                {
                  $set: {
                    // "invoice.$.category": req.body.value.category,
                    "credit": totalPayment,
                    "currency": currencyEdit,
                    "rate": rateEdit,
                    "total": totalPayment
                  },
                },
                function (error, updatedData) {
                  if (error) {
                    // return res.status(400).send(error);
                  }
        
                  console.log(updatedData);
                  //return res.status(200).send(updatedData);
                }
              );
            }

            
            if(voucher != ""){
              var dummyData = await Paid.updateOne(
                { _id: id,
                  "swornVoucher.docid": voucher,
                },
                {
                  $set: {
                    // "invoice.$.category": req.body.value.category,
                    "swornVoucher.$.currency": currencyEdit,
                    "swornVoucher.$.rate": rateEdit,
                    "swornVoucher.$.total": totalPayment,
                    "swornVoucher.$.updateTime": datetime
                  },
                },
                function (error, updatedData) {
                  if (error) {
                    // return res.status(400).send(error);
                  }
        
                  console.log(updatedData);
                  //return res.status(200).send(updatedData);
                }
              );
            }

          } else {
            //console.log("swornIV");
            
            //data["invoiceNumber"] = data.s1.f4.value;

            

            //console.log(clientInvoiceHistory);
            data["currency"] = currencyEdit;

            //return;
            data["user_created"] = email;
            //console.log(data)
            const swornIV = new SwornIV(data);
            const savedSwornIV = await swornIV.save();
            docid = savedSwornIV._id;

            //console.log(savedSwornIV.docArray);

            //console.log(savedSwornIV.countervalue + "counter valuefffffff");

            clientInvoiceHistory.docid = docid;
            clientInvoiceHistory.currency = currencyEdit;
            clientInvoiceHistory.countervalue = savedSwornIV.countervalue;
            clientInvoiceHistory.invoiceNumber = savedSwornIV.countervalue;
            clientInvoiceHistory.rate = rateEdit;
            data.s1.f0.value = savedSwornIV.countervalue;
            invoiceNumberSend = savedSwornIV.countervalue;
            //docArray[keys[0] + keys[1]] = req.body[key];
            docArray['s1f0'] = savedSwornIV.countervalue;
            console.log(savedSwornIV.countervalue + "ffffffffffff   " + docArray['s1f0'] )
            data["invoiceNumber"] = savedSwornIV.countervalue;

            await SwornIV.findOneAndUpdate(
              { _id: docid },
              data,
              { upsert: true },
              function (err, doc) {
                if (err) //console.log(err);
                // //console.log(doc.docArray)
                console.log("Succesfully saved.");
              }
            );


            transcationInvoiceHistory.total = data["total"];
            transcationInvoiceHistory.credit = data["total"];
            transcationInvoiceHistory.invoiceType = "swornInvoice";
            transcationInvoiceHistory.voucherType = "Receipt";

            transcationInvoiceHistory.invoiceAddress = docid;
            transcationInvoiceHistory.invoiceNumber = invoiceNumberSend;
            transcationInvoiceHistory.currency = currencyEdit;
            transcationInvoiceHistory.rate = rateEdit;
            transcationInvoiceHistory.ready = "yes";
            transcationInvoiceHistory.paidClinetName = clientData["fullname"];
            transcationInvoiceHistory.paidClientID = id;

            const transaction = new Transaction(transcationInvoiceHistory);
            const savedtransaction= await transaction.save();
            const transactionID = savedtransaction._id;

            clientInvoiceHistory.transcation = transactionID;

            
            //console.log(data)

            var savedPaid = await Paid.updateOne(
              { _id: id },
              { $push: { swornInvoice: clientInvoiceHistory } },
              { upsert: true, new: true  }
            );

            ////console.log(savedPaid);
          }
          } else if (modelCheck.includes("ProntoInvoice")) {
            //currency
            data["currency"] = data.s2.f6.value;
            var currencyEdit = data["currency"];
            if (ObjectId.isValid(docID)) {
              data["user_edit"] = email;
              var transcation = req.query.transcation;
              var voucher = req.query.voucher;
              const prontoIV = await ProntoIV.findOneAndUpdate(
                { _id: docID },
                data,
                { upsert: true },
                function (err, doc) {
                  if (err) //console.log(err);
                  // //console.log(doc.docArray)
                  console.log("Succesfully saved.");
                }
              );

              data.s1.f0.value = prontoIV.countervalue;
              var invoiceNumberEdit = data.s1.f0.value;
              invoiceNumberSend = invoiceNumberEdit;
              docArray['s1f0'] = invoiceNumberSend;
  
              var dummyData = await Paid.updateOne(
                { _id: id,
                  "prontoInvoice.docid": docID,
                },
                {
                  $set: {
                    "prontoInvoice.$.currency": currencyEdit,
                    "prontoInvoice.$.invoiceNumber": invoiceNumberEdit,
                    "prontoInvoice.$.total": totalPayment,
                    "prontoInvoice.$.rate": rateEdit,
                    "prontoInvoice.$.updateTime": datetime
                  },
                },
                function (error, updatedData) {
                  if (error) {
                    // return res.status(400).send(error);
                  }
        
                  console.log(updatedData);
                  //return res.status(200).send(updatedData);
                }
              );

              if(transcation != ""){
                var transactionEdit = await Transaction.updateOne(
                  { _id: transcation },
                  {
                    $set: {
                      // "invoice.$.category": req.body.value.category,
                      "credit": totalPayment,
                      "currency": data["currency"],
                      "rate": rateEdit,
                      "total": totalPayment
                    },
                  },
                  function (error, updatedData) {
                    if (error) {
                      // return res.status(400).send(error);
                    }
          
                    console.log(updatedData);
                    //return res.status(200).send(updatedData);
                  }
                );
              }

              if(voucher != ""){
                var dummyData = await Paid.updateOne(
                  { _id: id,
                    "prontoVoucher.docid": voucher,
                  },
                  {
                    $set: {
                      // "invoice.$.category": req.body.value.category,
                      "prontoVoucher.$.currency": currencyEdit,
                      "prontoVoucher.$.rate": rateEdit,
                      "prontoVoucher.$.total": totalPayment,
                      "prontoVoucher.$.updateTime": datetime
                    },
                  },
                  function (error, updatedData) {
                    if (error) {
                      // return res.status(400).send(error);
                    }
          
                    console.log(updatedData);
                    //return res.status(200).send(updatedData);
                  }
                );
              }
  
            } else {
              //console.log("prontoIV");
              //data["invoiceNumber"] = data.s1.f0.value;
              //data["invoiceNumber"] = data.s1.f4.value;
  
              //clientInvoiceHistory.invoiceNumber = data.s1.f0.value;
  
              //console.log(clientInvoiceHistory);
  
              //return;
              data["user_created"] = email;
              //console.log(data)
              const prontoIV = new ProntoIV(data);
              const savedprontoIV = await prontoIV.save();
              docid = savedprontoIV._id;
              
  
              //console.log(savedprontoIV.docArray);
  
              //console.log(savedprontoIV.countervalue + "counter valuefffffff");
  
              clientInvoiceHistory.docid = docid;
              clientInvoiceHistory.currency = data["currency"];
              clientInvoiceHistory.rate = rateEdit;
              clientInvoiceHistory.countervalue = savedprontoIV.countervalue;
              clientInvoiceHistory.invoiceNumber = savedprontoIV.countervalue;
              data.s1.f0.value = savedprontoIV.countervalue;
              invoiceNumberSend = savedprontoIV.countervalue;
              docArray['s1f0'] = savedprontoIV.countervalue;
              console.log(savedprontoIV.countervalue + "ffffffffffff   " + docArray['s1f0'] )
              data["invoiceNumber"] = savedprontoIV.countervalue;

              await ProntoIV.findOneAndUpdate(
                { _id: docid },
                data,
                { upsert: true },
                function (err, doc) {
                  if (err) //console.log(err);
                  // //console.log(doc.docArray)
                  console.log("Succesfully saved.");
                }
              );

              var transactionEdit = await Transaction.updateOne(
                { _id: transcation },
                {
                  $set: {
                    // "invoice.$.category": req.body.value.category,
                    "credit": totalPayment,
                    "currency": data["currency"],
                    "rate": rateEdit,
                    "total": totalPayment
                  },
                },
                function (error, updatedData) {
                  if (error) {
                    // return res.status(400).send(error);
                  }
        
                  console.log(updatedData);
                  //return res.status(200).send(updatedData);
                }
              );

              //await savedprontoIV.save();


              transcationInvoiceHistory.total = data["total"];
              transcationInvoiceHistory.credit = data["total"];
              transcationInvoiceHistory.invoiceType = "ProntoInvoice";
              transcationInvoiceHistory.voucherType = "Receipt";

              transcationInvoiceHistory.invoiceAddress = docid;
              transcationInvoiceHistory.invoiceNumber = invoiceNumberSend;
              transcationInvoiceHistory.currency = data["currency"];
              transcationInvoiceHistory.rate = rateEdit;
              transcationInvoiceHistory.ready = "yes";
              transcationInvoiceHistory.paidClinetName = clientData["fullname"];
              transcationInvoiceHistory.paidClientID = id;

              const transaction = new Transaction(transcationInvoiceHistory)
              const savedtransaction= await transaction.save();
              const transactionID = savedtransaction._id;

              clientInvoiceHistory.transcation = transactionID;
              
              ////console.log(clientInvoiceHistory)
  
              var savedPaid = await Paid.updateOne(
                { _id: id },
                { $push: { prontoInvoice: clientInvoiceHistory } },
                { upsert: true, new: true  }
              );
  
              ////console.log(savedPaid);
            }
  
          } else if (modelCheck.includes("UnofficialInvoice")) {
            //currency
            data["currency"] = data.s2.f6.value;
            var currencyEdit = data["currency"];

            if (ObjectId.isValid(docID)) {
              data["user_edit"] = email;
              //var invoiceNumberEdit = data.s2.f0.value;
              //console.log("Update invoiceNumberEdit " + data.s2.f0.value);
              const unofficialIV = await UnofficialIV.findOneAndUpdate(
                { _id: docID },
                data,
                { upsert: true },
                function (err, doc) {
                  if (err) //console.log(err);
                  // //console.log(doc.docArray)
                  console.log("Succesfully saved.");
                }
              );

              data.s1.f0.value = unofficialIV.countervalue;
              var invoiceNumberEdit = unofficialIV.countervalue;
              invoiceNumberSend = invoiceNumberEdit;
              docArray['s1f0'] = invoiceNumberSend;
  
              var dummyData = await Paid.updateOne(
                { _id: id,
                  "unofficialInvoice.docid": docID,
                },
                {
                  $set: {
                    "unofficialInvoice.$.currency": currencyEdit,
                    "unofficialInvoice.$.invoiceNumber": invoiceNumberEdit,
                    "unofficialInvoice.$.total": totalPayment,
                    "unofficialInvoice.$.rate": rateEdit,
                    "unofficialInvoice.$.updateTime": datetime
                  },
                },
                function (error, updatedData) {
                  if (error) {
                    // return res.status(400).send(error);
                  }
        
                  //console.log(updatedData);
                  //return res.status(200).send(updatedData);
                }
              );

              if(transcation != ""){
                var transactionEdit = await Transaction.updateOne(
                  { _id: transcation },
                  {
                    $set: {
                      // "invoice.$.category": req.body.value.category,
                      "credit": totalPayment,
                      "currency": data["currency"],
                      "rate": rateEdit,
                      "total": totalPayment
                    },
                  },
                  function (error, updatedData) {
                    if (error) {
                      // return res.status(400).send(error);
                    }
          
                    console.log(updatedData);
                    //return res.status(200).send(updatedData);
                  }
                );
              }

              if(voucher != ""){
                var dummyData = await Paid.updateOne(
                  { _id: id,
                    "unofficialVoucher.docid": voucher,
                  },
                  {
                    $set: {
                      // "invoice.$.category": req.body.value.category,
                      "unofficialVoucher.$.currency": currencyEdit,
                      "unofficialVoucher.$.total": totalPayment,
                      "unofficialVoucher.$.rate": rateEdit,
                      "unofficialVoucher.$.updateTime": datetime
                    },
                  },
                  function (error, updatedData) {
                    if (error) {
                      // return res.status(400).send(error);
                    }
          
                    console.log(updatedData);
                    //return res.status(200).send(updatedData);
                  }
                );
              }
  
            } else {
              var transcation = req.query.transcation;
              var voucher = req.query.voucher;
  
              //return;
              data["user_created"] = email;
              //console.log(data)
              const unofficialIV = new UnofficialIV(data);
              const savedunofficialIV = await unofficialIV.save();
              docid = savedunofficialIV._id;
  
              //console.log(savedunofficialIV.docArray);
  
              //console.log(savedunofficialIV.countervalue + "counter valuefffffff");
  
              clientInvoiceHistory.docid = docid;
              clientInvoiceHistory.currency = data["currency"];
              clientInvoiceHistory.rate = rateEdit;
              clientInvoiceHistory.countervalue = savedunofficialIV.countervalue;
              clientInvoiceHistory.invoiceNumber = savedunofficialIV.countervalue;
              data.s1.f0.value = savedunofficialIV.countervalue;
              invoiceNumberSend = savedunofficialIV.countervalue;
              docArray['s1f0'] = savedunofficialIV.countervalue;
              console.log(savedunofficialIV.countervalue + "ffffffffffff   " + docArray['s1f0'] )
              data["invoiceNumber"] = savedunofficialIV.countervalue;

              transcationInvoiceHistory.total = data["total"];
              transcationInvoiceHistory.credit = data["total"];
              transcationInvoiceHistory.invoiceType = "UnofficialInvoice";
              transcationInvoiceHistory.voucherType = "Receipt";

              transcationInvoiceHistory.invoiceAddress = docid;
              transcationInvoiceHistory.invoiceNumber = invoiceNumberSend;
              transcationInvoiceHistory.currency = data["currency"];
              transcationInvoiceHistory.rate = rateEdit;
              transcationInvoiceHistory.ready = "yes";
              transcationInvoiceHistory.paidClinetName = clientData["fullname"];
              transcationInvoiceHistory.paidClientID = id;

              await UnofficialIV.findOneAndUpdate(
                { _id: docid },
                data,
                { upsert: true },
                function (err, doc) {
                  if (err) //console.log(err);
                  // //console.log(doc.docArray)
                  console.log("Succesfully saved.");
                }
              );

              const transaction = new Transaction(transcationInvoiceHistory)
              const savedtransaction= await transaction.save();
              const transactionID = savedtransaction._id;

              clientInvoiceHistory.transcation = transactionID;
              
              ////console.log(clientInvoiceHistory)
  
              var savedPaid = await Paid.updateOne(
                { _id: id },
                { $push: { unofficialInvoice: clientInvoiceHistory } },
                { upsert: true, new: true  }
              );
  
              ////console.log(savedPaid);
            }
  
          } else if (modelCheck.includes("PurcssdhaseInvoice")) {
            data["currency"] = data.s2.f6.value;
            if (ObjectId.isValid(docID)) {
              data["user_edit"] = email;
              //var invoiceNumberEdit = data.s2.f0.value;
              //console.log("Update doc by ID " + docID);
              const purchaseIV = await PurchaseIV.findOneAndUpdate(
                { _id: docID },
                data,
                { upsert: true },
                function (err, doc) {
                  if (err) //console.log(err);
                  // //console.log(doc.docArray)
                  console.log("Succesfully saved.");
                }
              );

              data.s1.f0.value = purchaseIV.countervalue;
              var invoiceNumberEdit = data.s2.f0.value;
              invoiceNumberSend = invoiceNumberEdit;
  
              var dummyData = await Suppliers.updateOne(
                { _id: id,
                  "purchaseInvoice.docid": docID,
                },
                {
                  $set: {
                    "purchaseInvoice.$.invoiceNumber": invoiceNumberEdit,
                    "purchaseInvoice.$.total": totalPayment,
                    "purchaseInvoice.$.updateTime": datetime
                  },
                },
                function (error, updatedData) {
                  if (error) {
                    // return res.status(400).send(error);
                  }ID
        
                  //console.log(updatedData);
                  //return res.status(200).send(updatedData);
                }
              );
  
            } else {
              //console.log("purchaseIV");
              //data["invoiceNumber"] = data.s2.f0.value;
              //data["invoiceNumber"] = data.s2.f4.value;
  
              //clientInvoiceHistory.invoiceNumber = data.s2.f0.value;
  
              //console.log(clientInvoiceHistory);
  
              //return;
              data["user_created"] = email;
              //console.log(data)
              const purchaseIV = new PurchaseIV(data);
              const savedpurchaseIV = await purchaseIV.save();
              docid = savedpurchaseIV._id;
  
              //console.log(savedpurchaseIV.docArray);
  
              //console.log(savedpurchaseIV.countervalue + "counter valuefffffff");
  
              clientInvoiceHistory.docid = docid;
              clientInvoiceHistory.currency = data["currency"];
              clientInvoiceHistory.countervalue = savedpurchaseIV.countervalue;
              clientInvoiceHistory.invoiceNumber = savedpurchaseIV.countervalue;
              data.s1.f0.value = savedpurchaseIV.countervalue;
              invoiceNumberSend = savedpurchaseIV.countervalue;
              docArray['s1f0'] = savedpurchaseIV.countervalue;
              console.log(savedpurchaseIV.countervalue + "ffffffffffff   " + docArray['s1f0'] )
              data["invoiceNumber"] = savedpurchaseIV.countervalue;

              transcationInvoiceHistory.total = data["total"];
              transcationInvoiceHistory.credit = data["total"];
              transcationInvoiceHistory.invoiceType = "PurchaseInvoice";
              transcationInvoiceHistory.voucherType = data.s2.f7.value;
              transcationInvoiceHistory.voucher = "";

              transcationInvoiceHistory.invoiceAddress = docid;
              transcationInvoiceHistory.invoiceNumber = invoiceNumberSend;
              transcationInvoiceHistory.currency = data["currency"];
              transcationInvoiceHistory.ready = "yes";
              transcationInvoiceHistory.paidClinetName = clientData["fullname"];
              transcationInvoiceHistory.paidClientID = id;

              const transaction = new Transaction(transcationInvoiceHistory)
              const savedtransaction= await transaction.save();
              const transactionID = savedtransaction._id;

              clientInvoiceHistory.transcation = transactionID;
              clientInvoiceHistory.voucherType = data.s2.f7.value;
              
              ////console.log(clientInvoiceHistory)
  
              var savedPaid = await Suppliers.updateOne(
                { _id: id },
                { $push: { purchaseInvoice: clientInvoiceHistory } },
                { upsert: true, new: true  }
              );
  
              ////console.log(savedPaid);
            }
  
          } else if (modelCheck.includes("ProntoPurchaseInvoice")) {
            data["currency"] = data.s2.f6.value;
            data["Currency"] = data.s2.f6.value;
            var currencyEdit = data["currency"];
            if (ObjectId.isValid(docID)) {
              data["user_edit"] = email;
              var transcation = req.query.transcation;
              var voucher = req.query.voucher;
              const purchaseIV = await ProntoPurchaseIV.findOneAndUpdate(
                { _id: docID },
                data,
                { upsert: true },
                function (err, doc) {
                  if (err) //console.log(err);
                  // //console.log(doc.docArray)
                  console.log("Succesfully saved.");
                }
              );
              
              data.s1.f0.value = purchaseIV.countervalue;
              data.s2.f0.value = purchaseIV.countervalue;
              var invoiceNumberEdit = purchaseIV.countervalue;
              invoiceNumberSend = invoiceNumberEdit;
              docArray['s1f0'] = invoiceNumberSend;
              docArray['s2f0'] = invoiceNumberSend;
  
              var dummyData = await Suppliers.updateOne(
                { _id: id,
                  "prontoPurchaseInvoice.docid": docID,
                },
                {
                  $set: {
                    //"prontoPurchaseInvoice.$.invoiceNumber": invoiceNumberEdit,
                    "prontoPurchaseInvoice.$.currency": currencyEdit,
                    "prontoPurchaseInvoice.$.rate": rateEdit,
                    "prontoPurchaseInvoice.$.total": totalPayment,
                    "prontoPurchaseInvoice.$.updateTime": datetime
                  },
                },
                function (error, updatedData) {
                  if (error) {
                    // return res.status(400).send(error);
                  }
        
                  //console.log(updatedData);
                  //return res.status(200).send(updatedData);
                }
              );

              if(voucher != ""){
                var dummyData = await Suppliers.updateOne(
                  { _id: id,
                    "prontoPurchaseInvoice.docid": voucher,
                  },
                  {
                    $set: {
                      // "invoice.$.category": req.body.value.category,
                      "prontoPurchaseInvoice.$.currency": currencyEdit,
                      "prontoPurchaseInvoice.$.rate": rateEdit,
                      "prontoPurchaseInvoice.$.total": totalPayment,
                      "prontoPurchaseInvoice.$.updateTime": datetime
                    },
                  },
                  function (error, updatedData) {
                    if (error) {
                      // return res.status(400).send(error);
                    }
          
                    console.log(updatedData);
                    //return res.status(200).send(updatedData);
                  }
                );
              }
  
            } else {
              //console.log("purchaseIV");
              //data["invoiceNumber"] = data.s2.f0.value;
              //data["invoiceNumber"] = data.s2.f4.value;
  
              //clientInvoiceHistory.invoiceNumber = data.s2.f0.value;
  
              //console.log(clientInvoiceHistory);
  
              //return;
              data["user_created"] = email;
              //console.log(data)
              const purchaseIV = new ProntoPurchaseIV(data);
              const savedpurchaseIV = await purchaseIV.save();
              docid = savedpurchaseIV._id;
  
              //console.log(savedpurchaseIV.docArray);
  
              //console.log(savedpurchaseIV.countervalue + "counter valuefffffff");
  
              clientInvoiceHistory.docid = docid;
              clientInvoiceHistory.currency = data["currency"];
              clientInvoiceHistory.rate = rateEdit;
              clientInvoiceHistory.countervalue = savedpurchaseIV.countervalue;
              clientInvoiceHistory.invoiceNumber = savedpurchaseIV.countervalue;
              data.s1.f0.value = savedpurchaseIV.countervalue;
              invoiceNumberSend = savedpurchaseIV.countervalue;
              docArray['s1f0'] = savedpurchaseIV.countervalue;
              console.log(savedpurchaseIV.countervalue + "ffffffffffff   " + docArray['s1f0'] )
              data["invoiceNumber"] = savedpurchaseIV.countervalue;

              transcationInvoiceHistory.total = data["total"];
              transcationInvoiceHistory.credit = data["total"];
              transcationInvoiceHistory.invoiceType = "ProntoPurchaseInvoice";
              transcationInvoiceHistory.voucher = "";

              transcationInvoiceHistory.invoiceAddress = docid;
              transcationInvoiceHistory.invoiceNumber = invoiceNumberSend;
              transcationInvoiceHistory.currency = data["currency"];
              transcationInvoiceHistory.rate = rateEdit;
              transcationInvoiceHistory.ready = "yes";
              transcationInvoiceHistory.paidClinetName = clientData["fullname"];
              transcationInvoiceHistory.paidClientID = id;


              await ProntoPurchaseIV.findOneAndUpdate(
                { _id: docid },
                data,
                { upsert: true },
                function (err, doc) {
                  if (err) //console.log(err);
                  // //console.log(doc.docArray)
                  console.log("Succesfully saved.");
                }
              );

              const transaction = new Transaction(transcationInvoiceHistory)
              const savedtransaction= await transaction.save();
              const transactionID = savedtransaction._id;

              clientInvoiceHistory.transcation = transactionID;
              
              ////console.log(clientInvoiceHistory)
  
              var savedPaid = await Suppliers.updateOne(
                { _id: id },
                { $push: { prontoPurchaseInvoice: clientInvoiceHistory } },
                { upsert: true, new: true  }
              );
  
              ////console.log(savedPaid);
            }
  
          } else if (modelCheck.includes("UnofficialPurchaseInvoice")) {
            data["currency"] = data.s2.f6.value;
            data["Currency"] = data.s2.f6.value;
            var currencyEdit = data["currency"];
            if (ObjectId.isValid(docID)) {
              data["user_edit"] = email;
              var transcation = req.query.transcation;
              var voucher = req.query.voucher;
              const purchaseIV = await UnofficialPurchaseIV.findOneAndUpdate(
                { _id: docID },
                data,
                { upsert: true },
                function (err, doc) {
                  if (err) //console.log(err);
                  // //console.log(doc.docArray)
                  console.log("Succesfully saved.");
                }
              );

              data.s1.f0.value = purchaseIV.countervalue;
              data.s2.f0.value = purchaseIV.countervalue;
              var invoiceNumberEdit = purchaseIV.countervalue;
              invoiceNumberSend = invoiceNumberEdit;
              docArray['s1f0'] = invoiceNumberSend;
              docArray['s2f0'] = invoiceNumberSend;

              // data.s1.f0.value = purchaseIV.countervalue;
              // var invoiceNumberEdit = data.s2.f0.value;
              // invoiceNumberSend = invoiceNumberEdit;
  
              var dummyData = await Suppliers.updateOne(
                { _id: id,
                  "unofficialPurchaseInvoice.docid": docID,
                },
                {
                  $set: {
                    //"unofficialPurchaseInvoice.$.invoiceNumber": invoiceNumberEdit,
                    "unofficialPurchaseInvoice.$.currency": currencyEdit,
                    "unofficialPurchaseInvoice.$.rate": rateEdit,
                    "unofficialPurchaseInvoice.$.total": totalPayment,
                    "unofficialPurchaseInvoice.$.updateTime": datetime
                  },
                },
                function (error, updatedData) {
                  if (error) {
                    // return res.status(400).send(error);
                  }
        
                  //console.log(updatedData);
                  //return res.status(200).send(updatedData);
                }
              );

              if(voucher != ""){
                var dummyData = await Suppliers.updateOne(
                  { _id: id,
                    "unofficialPurchaseInvoice.docid": voucher,
                  },
                  {
                    $set: {
                      // "invoice.$.category": req.body.value.category,
                      "unofficialPurchaseInvoice.$.currency": currencyEdit,
                      "unofficialPurchaseInvoice.$.rate": rateEdit,
                      "unofficialPurchaseInvoice.$.total": totalPayment,
                      "unofficialPurchaseInvoice.$.updateTime": datetime
                    },
                  },
                  function (error, updatedData) {
                    if (error) {
                      // return res.status(400).send(error);
                    }
          
                    console.log(updatedData);
                    //return res.status(200).send(updatedData);
                  }
                );
              }
  
            } else {
              //console.log("purchaseIV");
              //data["invoiceNumber"] = data.s2.f0.value;
              //data["invoiceNumber"] = data.s2.f4.value;
  
              //clientInvoiceHistory.invoiceNumber = data.s2.f0.value;
  
              //console.log(clientInvoiceHistory);
  
              //return;
              data["user_created"] = email;
              //console.log(data)
              const purchaseIV = new UnofficialPurchaseIV(data);
              const savedpurchaseIV = await purchaseIV.save();
              docid = savedpurchaseIV._id;
  
              //console.log(savedpurchaseIV.docArray);
  
              //console.log(savedpurchaseIV.countervalue + "counter valuefffffff");
  
              clientInvoiceHistory.docid = docid;
              clientInvoiceHistory.currency = data["currency"];
              clientInvoiceHistory.rate = rateEdit;
              clientInvoiceHistory.countervalue = savedpurchaseIV.countervalue;
              clientInvoiceHistory.invoiceNumber = savedpurchaseIV.countervalue;
              data.s1.f0.value = savedpurchaseIV.countervalue;
              invoiceNumberSend = savedpurchaseIV.countervalue;
              docArray['s1f0'] = savedpurchaseIV.countervalue;
              console.log(savedpurchaseIV.countervalue + "ffffffffffff   " + docArray['s1f0'] )
              data["invoiceNumber"] = savedpurchaseIV.countervalue;

              await UnofficialPurchaseIV.findOneAndUpdate(
                { _id: docid },
                data,
                { upsert: true },
                function (err, doc) {
                  if (err) //console.log(err);
                  // //console.log(doc.docArray)
                  console.log("Succesfully saved.");
                }
              );

              transcationInvoiceHistory.total = data["total"];
              transcationInvoiceHistory.credit = data["total"];
              transcationInvoiceHistory.invoiceType = "UnofficialPurchaseInvoice";
              transcationInvoiceHistory.voucher = "";

              transcationInvoiceHistory.invoiceAddress = docid;
              transcationInvoiceHistory.invoiceNumber = invoiceNumberSend;
              transcationInvoiceHistory.currency = data["currency"];
              transcationInvoiceHistory.rate = rateEdit;
              transcationInvoiceHistory.ready = "yes";
              transcationInvoiceHistory.paidClinetName = clientData["fullname"];
              transcationInvoiceHistory.paidClientID = id;

              const transaction = new Transaction(transcationInvoiceHistory)
              const savedtransaction= await transaction.save();
              const transactionID = savedtransaction._id;

              clientInvoiceHistory.transcation = transactionID;
              
              ////console.log(clientInvoiceHistory)
  
              var savedPaid = await Suppliers.updateOne(
                { _id: id },
                { $push: { unofficialPurchaseInvoice: clientInvoiceHistory } },
                { upsert: true, new: true  }
              );
  
              ////console.log(savedPaid);
            }
  
          } else {
        }

        var clientName = clientData.fullname;

        //console.log("finish");

        //Put condition if verified or not "/unverified"
        var outputPath = GenerateDocx(
          data,
          docxPath,
          docArray,
          req.query.doc,
          clientName,
          datetime
        );

        //query = outputPath[0]
        var string1 = encodeURIComponent(outputPath[0]);
        var string2 = encodeURIComponent(outputPath[1]);

        //download button on the form as a button
        //res.redirect('/api/posts/r/?valid=' + string1 + '&pass=' + string2)
        //console.log("/api/posts/r/?valid=" + string1 + "&pass=" + string2);

        var link = "/api/posts/r/?valid=" + string1 + "&pass=" + string2;

        createHistoryLog(
          req.email,
          "Invoice Created",
          "Invoice Created for client " +
            clientName +
            ", " +
            modelCheck +
            " Document",
          req.id
        );

        res.send({ link: link, invoiceNumber: invoiceNumberSend});
      }
    } else {
      //
    }
  } catch (err) {
    console.log(err);
    res.send("error");
    // res.status(500).send(err)
  }
});

router.post("/invoiceedit/GetData", verify, async (req, res) => {
  var result = [];
  var subresult = [];

  console.log("start action");
  console.log(req.query);
  console.log(req.body);
  var flag = 0;

  try {
    var action = req.query.action;
    var id = req.query.id;

    var query;

    // 👇️ Get the last 2 digits of the current year
    const twoDigitYear = new Date().getFullYear().toString().slice(-2);
    console.log(twoDigitYear); // 👉️ '23'
    const last2Num = Number(twoDigitYear);

    if (req.body.action == "remove") {
      //console.log(req.body);
      //var keyID = mongoose.Types.ObjectId(req.body.key);
      //console.log("removed" + req.body["key"]);
      //console.log("removed" + req.body);
      // Equivalent to `parent.children.pull(_id)`
      var key = req.body["key"];
      var keys = [];
      keys = key.split("_");
      if(keys.length == 5 && keys[3] == '')
      {
        var swap = keys[3];
        keys[3] = " ";
      }

      var anything = "";
      if(action.includes("purchase")){
        anything = await Suppliers.findById(keys[0], function (err, user) {
          if (err) {
            console.log(err);
          } else {
            // prontoPurchaseInvoice: [prontoPurchaseSubInvoice],
            // unofficialPurchaseInvoice: [unofficialPurchaseSubInvoice],
            // purchaseInvoice: [purchaseSubInvoice],

            if (action.includes("unofficial")) {
              user.unofficialPurchaseInvoice.id(keys[1]).remove();
            } else if (action == "sworn") {
              //user.swornInvoice.id(keys[1]).remove();
            } else if (action.includes("pronto")) {
              user.prontoPurchaseInvoice.id(keys[1]).remove();
            } else if (action == "purchase") {
              //console.log(user.purchaseInvoice.id(keys[1].voucherType));
              //user.purchaseInvoice.id(keys[1]).remove();
            } else {

            }      
            // Equivalent to `parent.child = null`
            //user.child.remove();
            user.save(function (err) {
              if (err) return handleError(err);
  
              console.log("the subdocs were removed");
            });
          }
        });

        console.log("anything" + anything);

        var deleted;

        if (action.includes("unofficial")) {
          deleted = await UnofficialPurchaseIV.findByIdAndDelete({_id: keys[2]})
          if(keys[3]!= " ")
          {
            await UnofficialPV.findByIdAndDelete({_id: keys[3]});
          }
          //deleted = await UnofficialRV.findByIdAndDelete({_id: keys[2]})
          //deleted = await UnofficialPV.findByIdAndDelete({_id: keys[2]})
        } else if (action == "sworn") {
          deleted = await SwornIV.findByIdAndDelete({_id: keys[2]})
          //deleted = await SwornRV.findByIdAndDelete({_id: keys[2]})
          //deleted = await SwornPV.findByIdAndDelete({_id: keys[2]})
          if(keys.length == 3 && keys[3]!= "undefined")
          {
            await SwornRV.findByIdAndDelete({_id: keys[3]});
          }
        } else if (action.includes("pronto")) {
          deleted = await ProntoPurchaseIV.findByIdAndDelete({_id: keys[2]})
          //deleted = await ProntoRV.findByIdAndDelete({_id: keys[2]})
          //deleted = await ProntoPV.findByIdAndDelete({_id: keys[2]})
          if(keys[3]!= " ")
          {
            await ProntoPV.findByIdAndDelete({_id: keys[3]});
          }
        } else if (action == "purchase") {
          deleted = await PurchaseIV.findByIdAndDelete({_id: keys[2]})
          if(keys[3]!= " ")
          {
            //await PurchaseIV.findByIdAndDelete({_id: keys[5]});
          }
        } else {

        }  

        if(keys.length == 5 && keys[4]!= "undefined")
        {
          await Transaction.findByIdAndDelete({_id: keys[4]});
        }

        await createHistoryLog(
          req.email,
          "Delete Payment Invoice",
          "Delete Payment Invoice from client " + anything.fullname,
          req.id
        );
        res.send({});
        return;
      }
      else {
        anything = await Paid.findById(keys[0], function (err, user) {
          if (err) {
            console.log(err);
          } else {
            //console.log();
            // createHistoryLog(req.email,"Delete Payment", "Delete Payment for client " + isUndefinedOrNull(user.fullname) ? "" : user.fullname, req.id);

            if (action == "unofficial") {
              user.unofficialInvoice.id(keys[1]).remove();
            } else if (action == "sworn") {
              user.swornInvoice.id(keys[1]).remove();
            } else if (action == "pronto") {
              user.prontoInvoice.id(keys[1]).remove();
            } else if (action == "purchase") {
              user.purchaseInvoice.id(keys[1]).remove();
              //console.log(query);
            } else {

            }      
            // Equivalent to `parent.child = null`
            //user.child.remove();
            user.save(function (err) {
              if (err) return handleError(err);
  
              console.log("the subdocs were removed");
            });
          }
        });

        var deleted;

        if (action == "unofficial") {
          deleted = await UnofficialIV.findByIdAndDelete({_id: keys[2]})
          if(keys[3]!= " ")
          {
            await UnofficialRV.findByIdAndDelete({_id: keys[3]});
          }
          //deleted = await UnofficialRV.findByIdAndDelete({_id: keys[2]})
          //deleted = await UnofficialPV.findByIdAndDelete({_id: keys[2]})
        } else if (action == "sworn") {
          deleted = await SwornIV.findByIdAndDelete({_id: keys[2]})
          //deleted = await SwornRV.findByIdAndDelete({_id: keys[2]})
          //deleted = await SwornPV.findByIdAndDelete({_id: keys[2]})
          if(keys[3]!= " ")
          {
            await SwornRV.findByIdAndDelete({_id: keys[3]});
          }
        } else if (action == "pronto") {
          deleted = await ProntoIV.findByIdAndDelete({_id: keys[2]})
          //deleted = await ProntoRV.findByIdAndDelete({_id: keys[2]})
          //deleted = await ProntoPV.findByIdAndDelete({_id: keys[2]})
          if(keys[3]!= " ")
          {
            await ProntoRV.findByIdAndDelete({_id: keys[3]});
          }
        } else if (action == "purchase") {
          deleted = await PurchaseIV.findByIdAndDelete({_id: keys[2]})
          if(keys[3]!= " ")
          {
            //await PurchaseIV.findByIdAndDelete({_id: keys[5]});
          }
        } else {

        }  
      }

      if(keys.length == 5 && keys[4]!= "undefined")
      {
        await Transaction.findByIdAndDelete({_id: keys[4]});
      }

      await createHistoryLog(
        req.email,
        "Delete Invoice",
        "Delete Invoice from client " + anything.fullname,
        req.id
      );
      res.send({});
      return;
    }

    if (isEmptyOrSpaces(id) && action == "all") {
      
      query = await Paid.find(
        {},
        { English: 0, Español: 0, Français: 0, Arabic: 0, __v: 0 }
      );
    } else if (action == "unofficial") {

      query = await Paid.find(
        {},
        { English: 0, Español: 0, Français: 0, Arabic: 0, __v: 0 }
      );

    //console.log("queryinvoice.length " + query["invoice"].length); 
    for(var i = 0; i< query.length;i++){
    for (var j = 0; j < query[i]["unofficialInvoice"].length; j++) {
      //console.log(user["invoice"][j].href);
        try{
          //new
          // s1fi
          //console.log("query invoice" + query[i]["unofficialInvoice"]);
          let invoiceNumber = "";
          let invoiceYear = query[i]["unofficialInvoice"][j].invoiceNumber;

          var totalValue = parseFloat(query[i]["unofficialInvoice"][j].total);
          var rateValue = parseFloat(query[i]["unofficialInvoice"][j].rate);
          var currencyCheck = query[i]["unofficialInvoice"][j].currency;

          if(currencyCheck == "LBP")
          {
            totalValue = totalValue / rateValue;
            totalValue = totalValue.toFixed(2)
          } else {

          }

          if(parseInt(id) == 1)
          {
            if(!invoiceYear.endsWith("/" + last2Num)){
              console.log(last2Num + " not same year");
              continue;
            }
          } else if(parseInt(id) == 2) {
            if(invoiceYear.endsWith("/" + last2Num)){
              console.log(last2Num + " same year");
              continue;
            }
          } else {}

          subParent = {
            //put parent id temor
            _id: query[i]["unofficialInvoice"][j].clientID,
            combineid: query[i]["unofficialInvoice"][j].clientID + "_" + query[i]["unofficialInvoice"][j]._id + "_" + query[i]["unofficialInvoice"][j].docid  + "_" + query[i]["unofficialInvoice"][j].voucher  + "_" + query[i]["unofficialInvoice"][j].transcation,
            paymentid: query[i]["unofficialInvoice"][j].clientID,
            clientID: query[i]["unofficialInvoice"][j].clientID,
            fullname: query[i]["unofficialInvoice"][j].fullname,
            docid: query[i]["unofficialInvoice"][j].docid,
            invoiceNumber: query[i]["unofficialInvoice"][j].invoiceNumber,
            countervalue: query[i]["unofficialInvoice"][j].countervalue,
            transcation: query[i]["unofficialInvoice"][j].transcation,
            voucher: query[i]["unofficialInvoice"][j].voucher,
            href: query[i]["unofficialInvoice"][j].href,
            category: query[i]["unofficialInvoice"][j].category,
            total: query[i]["unofficialInvoice"][j].total,
            totalValue: totalValue,
            remain: query[i]["unofficialInvoice"][j].remain,
            paid: query[i]["unofficialInvoice"][j].paid,
            rate: query[i]["unofficialInvoice"][j].rate,
            currency: query[i]["unofficialInvoice"][j].currency,
            Download: "DOWNLOAD",
            Voucher: "VOUCHER",
            Edit: "EDIT",
            createTime: query[i]["unofficialInvoice"][j].createTime,
            updateTime: query[i]["unofficialInvoice"][j].updateTime
          };


          //subParent.invoiceNumber = invoiceNumber;
          //console.log(subParent);

          result.push(subParent);

        //console.log("subParent: " + JSON.stringify(subParent));
      } 
      catch(err){
        console.log(err);
      }
    }
  }
    //console.log(result);
    res.send(result);
    // res.send(result);
    return;
      //console.log(query);
    } else if (action == "sworn") {

      query = await Paid.find(
          {},
          { English: 0, Español: 0, Français: 0, Arabic: 0, __v: 0 }
        );

      //console.log("queryinvoice.length " + query["invoice"].length); 
      for(var i = 0; i< query.length;i++){
        for (var j = 0; j < query[i]["swornInvoice"].length; j++) {
          //console.log(user["invoice"][j].href);
            try{
              //new
              // s1fi
              //console.log("query invoice" + query[i]["swornInvoice"]);
              let invoiceNumber = "";
              let invoiceYear = query[i]["swornInvoice"][j].invoiceNumber;
              var totalValue = parseFloat(query[i]["swornInvoice"][j].total);
              var rateValue = parseFloat(query[i]["swornInvoice"][j].rate);
              var currencyCheck = query[i]["swornInvoice"][j].currency;
    
              if(currencyCheck == "LBP")
              {
                totalValue = totalValue / rateValue;
                totalValue = totalValue.toFixed(2)
              } else {
    
              }

              if(parseInt(id) == 1)
              {
                if(!invoiceYear.endsWith("/" + last2Num)){
                  console.log(last2Num + " not same year");
                  continue;
                }
              } else if(parseInt(id) == 2) {
                if(invoiceYear.endsWith("/" + last2Num)){
                  console.log(last2Num + " same year");
                  continue;
                }
              } else {}
            
              subParent = {
                //put parent id temor
                _id: query[i]["swornInvoice"][j].clientID,
                combineid: query[i]["swornInvoice"][j].clientID + "_" + query[i]["swornInvoice"][j]._id + "_" + query[i]["swornInvoice"][j].docid  + "_" + query[i]["swornInvoice"][j].voucher  + "_" + query[i]["swornInvoice"][j].transcation,
                transcation: query[i]["swornInvoice"][j].transcation,
                voucher: query[i]["swornInvoice"][j].voucher,
                paymentid: query[i]["swornInvoice"][j].clientID,
                clientID: query[i]["swornInvoice"][j].clientID,
                fullname: query[i]["swornInvoice"][j].fullname,
                docid: query[i]["swornInvoice"][j].docid,
                invoiceNumber: query[i]["swornInvoice"][j].invoiceNumber,
                href: query[i]["swornInvoice"][j].href,
                category: query[i]["swornInvoice"][j].category,
                total: query[i]["swornInvoice"][j].total,
                totalValue: totalValue,
                countervalue: query[i]["swornInvoice"][j].countervalue,
                remain: query[i]["swornInvoice"][j].remain,
                paid: query[i]["swornInvoice"][j].paid,
                rate: query[i]["swornInvoice"][j].rate,
                currency: query[i]["swornInvoice"][j].currency,
                Download: "DOWNLOAD",
                Voucher: "VOUCHER",
                Edit: "EDIT",
                createTime: query[i]["swornInvoice"][j].createTime,
                updateTime: query[i]["swornInvoice"][j].updateTime
              };
    
    
              //subParent.invoiceNumber = invoiceNumber;
              //console.log(subParent);
    
              result.push(subParent);
    
            //console.log("subParent: " + JSON.stringify(subParent));
          } 
          catch(err){
            console.log(err);
          }
        }
        if(parseInt(id) == 2) {
          for (j = 0; j < query[i]["invoice"].length; j++) {
            //console.log(user["invoice"][j].href);
            try{
              //new
              // s1f0
              //console.log("docid: " + user["invoice"][j].docid + "  category: " + user["invoice"][j].category);
              let invoiceNumber = "";
              //console.log(query[i]._id);
            
              subParent = {
                //put parent id temor
                // _id: getById,
                combineid: query[i]._id + "_" + query[i]["invoice"][j]._id,
                paymentid: query[i]._id,
                fullname: query[i]["invoice"][j].fullname,
                docid: query[i]["invoice"][j].docid,
                invoiceNumber: "",
                href: query[i]["invoice"][j].href,
                category: query[i]["invoice"][j].category,
                total: query[i]["invoice"][j].total,
                remain: query[i]["invoice"][j].remain,
                paid: query[i]["invoice"][j].paid,
                currency: query[i]["invoice"][j].currency,
                Download: "DOWNLOAD",
                Edit: "EDIT",
                createTime: query[i]["invoice"][j].createTime,
                updateTime: query[i]["invoice"][j].updateTime
              };
  
              //console.log("docid: " + subParent.docid + "  category: " + subParent.category);
  
              if (subParent.category.includes("SwornTranslationInvoice")) {
                //if (ObjectId.isValid(subParent.docid)) {
                  //data["user_edit"] = email;
                  //console.log("Check doc by ID " + subParent.docid);
                  const sworni = await SWORNI.findById(
                    { _id: subParent.docid },
                    function (err, doc) {
                      if (err) console.log(err);
                      // console.log(doc.docArray)
                    }
                  );
                //}
                //console.log(sworni["s2"]["f0"]["value"]);
                invoiceNumber = sworni["s2"]["f0"]["value"];
                //["s1"]["f0"]
              } else if (modelCheck.includes("ProntoInvoiceinUSD")) {
                  console.log("Update doc by ID " + docID);
                  const piusa = await PIUSA.findById(
                    { _id: subParent.docid },
                    function (err, doc) {
                      if (err) console.log(err);
                      // console.log(doc.docArray)
                    }
                  );
                //console.log(sworni["s2"]["f0"]["value"]);
                invoiceNumber = sworni["s2"]["f0"]["value"];
              } else if (modelCheck.includes("ProntoInvoiceinLBP")) {
                  //console.log("Update doc by ID " + docID);
                  const pilbd = await PILBD.findById(
                    { _id: subParent.docid },
                    function (err, doc) {
                      if (err) console.log(err);
                      // console.log(doc.docArray)
                    }
                  );
                  //console.log(sworni["s2"]["f0"]["value"]);
                  invoiceNumber = sworni["s2"]["f0"]["value"];
              }
              else {}
  
              subParent.invoiceNumber = invoiceNumber;
              //console.log(subParent);
  
              result.push(subParent);
  
            //console.log("subParent: " + JSON.stringify(subParent));
          } catch(err){}
          }
        }
      }


      res.send(result);
      // res.send(result);
      return;
      //console.log(query);
    } else if (action == "pronto") {

      query = await Paid.find(
          {},
          { English: 0, Español: 0, Français: 0, Arabic: 0, __v: 0 }
        );

      //console.log("queryinvoice.length " + query["invoice"].length); 
      for(var i = 0; i< query.length;i++){
      for (var j = 0; j < query[i]["prontoInvoice"].length; j++) {
        //console.log(user["invoice"][j].href);
          try{
            //new
            // s1fi
            //console.log("query invoice" + query[i]["prontoInvoice"]);
            let invoiceNumber = "";
            let voucherExits = "" + query[i]["prontoInvoice"][j].voucher;
            let invoiceYear = query[i]["prontoInvoice"][j].invoiceNumber;

            var totalValue = parseFloat(query[i]["prontoInvoice"][j].total);
            var rateValue = parseFloat(query[i]["prontoInvoice"][j].rate);
            var currencyCheck = query[i]["prontoInvoice"][j].currency;
  
            if(currencyCheck == "LBP")
            {
              totalValue = totalValue / rateValue;
              totalValue = totalValue.toFixed(2)
            } else {
  
            }

            if(parseInt(id) == 1)
            {
              if(!invoiceYear.endsWith("/" + last2Num)){
                console.log(last2Num + " not same year");
                continue;
              }
            } else if(parseInt(id) == 2) {
              if(invoiceYear.endsWith("/" + last2Num)){
                console.log(last2Num + " same year");
                continue;
              }
            } else {}

          
            subParent = {
              //put parent id temor
              _id: query[i]["prontoInvoice"][j].clientID,
              combineid: query[i]["prontoInvoice"][j].clientID + "_" + query[i]["prontoInvoice"][j]._id + "_" + query[i]["prontoInvoice"][j].docid  + "_" + voucherExits + "_" + query[i]["prontoInvoice"][j].transcation,
              transcation: query[i]["prontoInvoice"][j].transcation,
              voucher: query[i]["prontoInvoice"][j].voucher,
              paymentid: query[i]["prontoInvoice"][j].clientID,
              clientID: query[i]["prontoInvoice"][j].clientID,
              fullname: query[i]["prontoInvoice"][j].fullname,
              docid: query[i]["prontoInvoice"][j].docid,
              invoiceNumber: query[i]["prontoInvoice"][j].invoiceNumber,
              countervalue: query[i]["prontoInvoice"][j].countervalue,
              href: query[i]["prontoInvoice"][j].href,
              category: query[i]["prontoInvoice"][j].category,
              total: query[i]["prontoInvoice"][j].total,
              totalValue: totalValue,
              remain: query[i]["prontoInvoice"][j].remain,
              paid: query[i]["prontoInvoice"][j].paid,
              rate: query[i]["prontoInvoice"][j].rate,
              currency: query[i]["prontoInvoice"][j].currency,
              Download: "DOWNLOAD",
              Voucher: "VOUCHER",
              Edit: "EDIT",
              createTime: query[i]["prontoInvoice"][j].createTime,
              updateTime: query[i]["prontoInvoice"][j].updateTime
            };
  
  
            //subParent.invoiceNumber = invoiceNumber;
            console.log(subParent);
  
            result.push(subParent);
  
          //console.log("subParent: " + JSON.stringify(subParent));
        } 
        catch(err){
          console.log(err);
        }
      }
    }
      //console.log(result);
      res.send(result);
      // res.send(result);
      return;
      //console.log(query);
    } else if (action == "purchase") {

      query = await Suppliers.find(
          {},
          { English: 0, Español: 0, Français: 0, Arabic: 0, __v: 0 }
        );

      //console.log("queryinvoice.length " + query["invoice"].length); 
      for(var i = 0; i< query.length;i++){
      for (var j = 0; j < query[i]["purchaseInvoice"].length; j++) {
        //console.log(user["invoice"][j].href);
          try{
            //new
            // s1fi
            //console.log("query invoice" + query[i]["purchaseInvoice"]);
            let invoiceNumber = "";
            let invoiceYear = query[i]["purchaseInvoice"][j].invoiceNumber;

            var totalValue = parseFloat(query[i]["purchaseInvoice"][j].total);
            var rateValue = parseFloat(query[i]["purchaseInvoice"][j].rate);
            var currencyCheck = query[i]["purchaseInvoice"][j].currency;
  
            if(currencyCheck == "LBP")
            {
              totalValue = totalValue / rateValue;
              totalValue = totalValue.toFixed(2)
            } else {
  
            }

            if(parseInt(id) == 1)
            {
              if(!invoiceYear.endsWith("/" + last2Num)){
                console.log(last2Num + " not same year");
                continue;
              }
            } else if(parseInt(id) == 2) {
              if(invoiceYear.endsWith("/" + last2Num)){
                console.log(last2Num + " same year");
                continue;
              }
            } else {}
          
            subParent = {
              //put parent id temor
              _id: query[i]["purchaseInvoice"][j].clientID,
              combineid: query[i]["purchaseInvoice"][j].clientID + "_" + query[i]["purchaseInvoice"][j]._id + "_" + query[i]["purchaseInvoice"][j].docid  + "_" + query[i]["purchaseInvoice"][j].voucher  + "_" + query[i]["purchaseInvoice"][j].transcation,
              transcation: query[i]["purchaseInvoice"][j].transcation,
              voucher: query[i]["purchaseInvoice"][j].voucher,
              paymentid: query[i]["purchaseInvoice"][j].clientID,
              clientID: query[i]["purchaseInvoice"][j].clientID,
              fullname: query[i]["purchaseInvoice"][j].fullname,
              docid: query[i]["purchaseInvoice"][j].docid,
              invoiceNumber: query[i]["purchaseInvoice"][j].invoiceNumber,
              countervalue: query[i]["purchaseInvoice"][j].countervalue,
              href: query[i]["purchaseInvoice"][j].href,
              category: query[i]["purchaseInvoice"][j].category,
              total: query[i]["purchaseInvoice"][j].total,
              totalValue: totalValue,
              remain: query[i]["purchaseInvoice"][j].remain,
              paid: query[i]["purchaseInvoice"][j].paid,
              rate: query[i]["purchaseInvoice"][j].rate,
              currency: query[i]["purchaseInvoice"][j].currency,
              Type: query[i]["purchaseInvoice"][j].voucherType,
              Download: "DOWNLOAD",
              Voucher: "VOUCHER",
              Edit: "EDIT",
              createTime: query[i]["purchaseInvoice"][j].createTime,
              updateTime: query[i]["purchaseInvoice"][j].updateTime
            };
  
  
            //subParent.invoiceNumber = invoiceNumber;
            console.log(subParent);
  
            result.push(subParent);
  
          //console.log("subParent: " + JSON.stringify(subParent));
        } 
        catch(err){
          console.log(err);
        }
      }
    }
      //console.log(result);
      res.send(result);
      // res.send(result);
      return;
      //console.log(query);
    } else if (action == "purchasepronto") {

      query = await Suppliers.find(
          {},
          { English: 0, Español: 0, Français: 0, Arabic: 0, __v: 0 }
        );

      //console.log("queryinvoice.length " + query["invoice"].length); 
      for(var i = 0; i< query.length;i++){
      for (var j = 0; j < query[i]["prontoPurchaseInvoice"].length; j++) {
        //console.log(user["invoice"][j].href);
          try{
            //new
            // s1fi
            //console.log("query invoice" + query[i]["prontoPurchaseInvoice"]);
            let invoiceNumber = "";
            let invoiceYear = query[i]["prontoPurchaseInvoice"][j].invoiceNumber;
            var totalValue = parseFloat(query[i]["prontoPurchaseInvoice"][j].total);
            var rateValue = parseFloat(query[i]["prontoPurchaseInvoice"][j].rate);
            var currencyCheck = query[i]["prontoPurchaseInvoice"][j].currency;
  
            if(currencyCheck == "LBP")
            {
              totalValue = totalValue / rateValue;
              totalValue = totalValue.toFixed(2)
            } else {
  
            }

            if(parseInt(id) == 1)
            {
              if(!invoiceYear.endsWith("/" + last2Num)){
                console.log(last2Num + " not same year");
                continue;
              }
            } else if(parseInt(id) == 2) {
              if(invoiceYear.endsWith("/" + last2Num)){
                console.log(last2Num + " same year");
                continue;
              }
            } else {}
          
            subParent = {
              //put parent id temor
              _id: query[i]["prontoPurchaseInvoice"][j].clientID,
              combineid: query[i]["prontoPurchaseInvoice"][j].clientID + "_" + query[i]["prontoPurchaseInvoice"][j]._id + "_" + query[i]["prontoPurchaseInvoice"][j].docid  + "_" + query[i]["prontoPurchaseInvoice"][j].voucher  + "_" + query[i]["prontoPurchaseInvoice"][j].transcation,
              transcation: query[i]["prontoPurchaseInvoice"][j].transcation,
              voucher: query[i]["prontoPurchaseInvoice"][j].voucher,
              paymentid: query[i]["prontoPurchaseInvoice"][j].clientID,
              clientID: query[i]["prontoPurchaseInvoice"][j].clientID,
              fullname: query[i]["prontoPurchaseInvoice"][j].fullname,
              docid: query[i]["prontoPurchaseInvoice"][j].docid,
              invoiceNumber: query[i]["prontoPurchaseInvoice"][j].invoiceNumber,
              countervalue: query[i]["prontoPurchaseInvoice"][j].countervalue,
              href: query[i]["prontoPurchaseInvoice"][j].href,
              category: query[i]["prontoPurchaseInvoice"][j].category,
              total: query[i]["prontoPurchaseInvoice"][j].total,
              totalValue: totalValue,
              remain: query[i]["prontoPurchaseInvoice"][j].remain,
              paid: query[i]["prontoPurchaseInvoice"][j].paid,
              rate: query[i]["prontoPurchaseInvoice"][j].rate,
              currency: query[i]["prontoPurchaseInvoice"][j].currency,
              Type: query[i]["prontoPurchaseInvoice"][j].voucherType,
              Download: "DOWNLOAD",
              Voucher: "VOUCHER",
              Edit: "EDIT",
              createTime: query[i]["prontoPurchaseInvoice"][j].createTime,
              updateTime: query[i]["prontoPurchaseInvoice"][j].updateTime
            };
  
  
            //subParent.invoiceNumber = invoiceNumber;
            console.log(subParent);
  
            result.push(subParent);
  
          //console.log("subParent: " + JSON.stringify(subParent));
        } 
        catch(err){
          console.log(err);
        }
      }
    }
      //console.log(result);
      res.send(result);
      // res.send(result);
      return;
      //console.log(query);
    } else if (action == "purchaseunofficial") {

      query = await Suppliers.find(
          {},
          { English: 0, Español: 0, Français: 0, Arabic: 0, __v: 0 }
        );

      //console.log("queryinvoice.length " + query["invoice"].length); 
      for(var i = 0; i< query.length;i++){
      for (var j = 0; j < query[i]["unofficialPurchaseInvoice"].length; j++) {
        //console.log(user["invoice"][j].href);
          try{
            //new
            // s1fi
            //console.log("query invoice" + query[i]["unofficialPurchaseInvoice"]);
            let invoiceNumber = "";
            let invoiceYear = query[i]["unofficialPurchaseInvoice"][j].invoiceNumber;
            var totalValue = parseFloat(query[i]["unofficialPurchaseInvoice"][j].total);
            var rateValue = parseFloat(query[i]["unofficialPurchaseInvoice"][j].rate);
            var currencyCheck = query[i]["unofficialPurchaseInvoice"][j].currency;
  
            if(currencyCheck == "LBP")
            {
              totalValue = totalValue / rateValue;
              totalValue = totalValue.toFixed(2)
            } else {
  
            }

            if(parseInt(id) == 1)
            {
              if(!invoiceYear.endsWith("/" + last2Num)){
                console.log(last2Num + " not same year");
                continue;
              }
            } else if(parseInt(id) == 2) {
              if(invoiceYear.endsWith("/" + last2Num)){
                console.log(last2Num + " same year");
                continue;
              }
            } else {}
          
            subParent = {
              //put parent id temor
              _id: query[i]["unofficialPurchaseInvoice"][j].clientID,
              combineid: query[i]["unofficialPurchaseInvoice"][j].clientID + "_" + query[i]["unofficialPurchaseInvoice"][j]._id + "_" + query[i]["unofficialPurchaseInvoice"][j].docid  + "_" + query[i]["unofficialPurchaseInvoice"][j].voucher  + "_" + query[i]["unofficialPurchaseInvoice"][j].transcation,
              transcation: query[i]["unofficialPurchaseInvoice"][j].transcation,
              voucher: query[i]["unofficialPurchaseInvoice"][j].voucher,
              paymentid: query[i]["unofficialPurchaseInvoice"][j].clientID,
              clientID: query[i]["unofficialPurchaseInvoice"][j].clientID,
              fullname: query[i]["unofficialPurchaseInvoice"][j].fullname,
              docid: query[i]["unofficialPurchaseInvoice"][j].docid,
              invoiceNumber: query[i]["unofficialPurchaseInvoice"][j].invoiceNumber,
              countervalue: query[i]["unofficialPurchaseInvoice"][j].countervalue,
              href: query[i]["unofficialPurchaseInvoice"][j].href,
              category: query[i]["unofficialPurchaseInvoice"][j].category,
              total: query[i]["unofficialPurchaseInvoice"][j].total,
              totalValue: totalValue,
              remain: query[i]["unofficialPurchaseInvoice"][j].remain,
              paid: query[i]["unofficialPurchaseInvoice"][j].paid,
              rate: query[i]["unofficialPurchaseInvoice"][j].rate,
              currency: query[i]["unofficialPurchaseInvoice"][j].currency,
              Type: query[i]["unofficialPurchaseInvoice"][j].voucherType,
              Download: "DOWNLOAD",
              Voucher: "VOUCHER",
              Edit: "EDIT",
              createTime: query[i]["unofficialPurchaseInvoice"][j].createTime,
              updateTime: query[i]["unofficialPurchaseInvoice"][j].updateTime
            };
  
  
            //subParent.invoiceNumber = invoiceNumber;
            console.log(subParent);
  
            result.push(subParent);
  
          //console.log("subParent: " + JSON.stringify(subParent));
        } 
        catch(err){
          console.log(err);
        }
      }
    }
      //console.log(result);
      res.send(result);
      // res.send(result);
      return;
      //console.log(query);
    } else {
      res.send({});
      return;
    }

    //Get all payment
    for (var i = 0; i < query.length; i++) {
      let totalpaidpriceUSD = 0;
      let totalremainpriceUSD = 0;
      let totalvaluepriceUSD = 0;
      let unit = 0;
      let totalpaidpriceLBP = 0;
      let totalremainpriceLBP = 0;
      let totalvaluepriceLBP = 0;

      let totalLBP = 0;
      let totalUSD = 0;

      let parent = {
        _id: "",
        fullname: "",
        mobile: "",
        address: "",
        unit: "",
        // paid: "",
        // remain: "",
        // total: "",
        subtasks: [],
        totalpaidpriceUSD: "",
        totalremainpriceUSD: "",
        totalvaluepriceUSD: "",
        totalpaidpriceLBP: "",
        totalremainpriceLBP: "",
        totalvaluepriceLBP: ""
      };

      parent._id = query[i]._id;
      parent.fullname = query[i].fullname;
      parent.mobile = query[i].mobile;
      parent.address = query[i].address;
      for (var j = 0; j < query[i]["invoice"].length; j++) {
        try{
        let subParent = {
          _id: query[i]["invoice"][j]._id,
          paymentid: query[i]._id,
          fullname: query[i]["invoice"][j].fullname,
          docid: query[i]["invoice"][j].docid,
          href: query[i]["invoice"][j].href,
          category: query[i]["invoice"][j].category,
          total: query[i]["invoice"][j].total,
          remains: query[i]["invoice"][j].remains,
          paid: query[i]["invoice"][j].paid,
          currency: query[i]["invoice"][j].currency,
          Download: "DOWNLOAD",
          Edit: "EDIT",
          createTime: query[i]["invoice"][j].createTime,
          updateTime: query[i]["invoice"][j].updateTime
        };

        // totalpaidpriceUSD: "",
        // totalremainpriceUSD: "",
        // totalvaluepriceUSD: "",
        // totalpaidpriceLBP: "",
        // totalremainpriceLBP: "",
        // totalvaluepriceLBP: ""
        unit = j + 1;
        if(query[i]["invoice"][j].currency == "USD"){
          totalpaidpriceUSD += query[i]["invoice"][j].paid;
          totalremainpriceUSD += query[i]["invoice"][j].remain;
          totalvaluepriceUSD += query[i]["invoice"][j].total;
        }
        else{
          totalpaidpriceLBP += query[i]["invoice"][j].paid;
          totalremainpriceLBP += query[i]["invoice"][j].remain;
          totalvaluepriceLBP += query[i]["invoice"][j].total;
        }
        // totalvalueprice += Number(query[i]["payment"][j].total)
        //   ? 0
        //   : parseInt(query[i]["payment"][j].total, 10);
        // totalremainprice += Number(query[i]["payment"][j].paid)
        //   ? 0
        //   : parseInt(query[i]["payment"][j].paid, 10);
        // totalvalueprice += Number(query[i]["payment"][j].remain)
        //   ? 0
        //   : parseInt(query[i]["payment"][j].remain, 10);

        if (action == "sub") {
          console.log("sudfasdjfkl jaslkdjf klasjdf lkjaskldj fklsdj ");
          result.push(subParent);
          console.log("result: " + JSON.stringify(result));
        }
      } catch(err){
        console.log(err)
      }

        //console.log("subParent: " + JSON.stringify(subParent));
      }
      //after finish loop parent json

      // console.log(
      //   "totalpaidprice: " +
      //     totalpaidprice +
      //     "totalremainprice: " +
      //     totalremainprice +
      //     "totalvalueprice: " +
      //     totalvalueprice
      // );
      parent.unit = unit;

      parent.totalPaidUSD = totalpaidpriceUSD;
      parent.totalRemainUSD = totalremainpriceUSD;
      parent.totalUSD = totalvaluepriceUSD;

      parent.totalPaidLBP = totalpaidpriceLBP;
      parent.totalRemainLBP = totalremainpriceLBP;
      parent.totalLBP = totalvaluepriceLBP;

      // parent.paid = totalpaidprice;
      // parent.remain = totalremainprice;
      // parent.total = totalvalueprice;

      if (action == "all") result.push(parent);

      //console.log("parent: " + parent);
      //console.log("subParent: " + JSON.stringify(parent));
    }

    //console.log("result: " + result);
    //console.log("result: " + JSON.stringify(result));
    res.send(result);
  } catch (err) {
    console.log(err);
    res.send({});
  }
});

router.get("/invoicecreatepurchase", verify, async (req, res) => {
// Purchase Invoice
    req.keep = "true";
    var query = Suppliers.find(
        {},
        { payment: 0, invoice: 0, English: 0, Español: 0, Français: 0, Arabic: 0, __v: 0 }
    );
    query.exec(function (err, result) {
        if (!err) {
        //let rawdata = "";
        //console.log(rawdata);
        //rawdata = result
        let dataReturn = result;

        //console.log(result)

        res.render("invoicecreatepurchase", {
            // req.session.
            name: req.name,
            email: req.email,
            clientname: result,
        });
        } else {
        console.log(err);
        }
    });
  });

  
router.post("/invoicepurchaseload", verify, async (req, res) => {
    try {
      if (
        !isEmptyOrSpaces(req.body.type)
      ) {
        let path = "./json/" + "English" + "/" + req.body.type + ".json";
        let htmlpath = "./GenerateHtml/" + req.body.type + ".ejs";
        let id = req.body.ClientID;
  
        console.log(req.body);
        var invoiceTemplate = req.body.type;
  
        // langCheck = langCheck.toLowerCase();
  
        var docSaved = "";
        var schemaData = "";
  
        try {
  
          var dataid = "";
          // console.log(dataid);
          if (!isEmptyOrSpaces(dataid)) {
  
            url = "";
            console.log('Before read ejs ')
  
            const file = fs.readFileSync(htmlpath, "utf-8");
            var fixture_template = ejs.compile(file, { client: true });
            //const html = fixture_template({ obj: docSaved[0], url: url });
            const html = fixture_template({ obj: [], url: url });
  
            // console.log(html)
            res.send({ html: html });
            return;
          }
        } catch (err) {
          console.log(err);
        }
  
        // console.log(htmlpath)
        if (fs.existsSync(path) && fs.existsSync(htmlpath)) {
  
          //console.log(path);
          // if recode doesnot exits in data base file exists
          let rawdata = fs.readFileSync(path, "utf-8");
          let rawdataProntoSerive = fs.readFileSync("./json/" + "English" + "/servicepronto.json", "utf-8");
          let prontoSerive = JSON.parse(rawdataProntoSerive);
          let rawdataSwornSerive = fs.readFileSync("./json/" + "English" + "/servicesworn.json", "utf-8");
          let swornSerive = JSON.parse(rawdataSwornSerive);
          let rawdataLanguage = fs.readFileSync("./json/" + "English" + "/language.json", "utf-8");
          let languageType = JSON.parse(rawdataLanguage);
          let data = JSON.parse(rawdata);
  
  
          
  
          //console.log(id);
          //Types.ObjectId()
          var key = mongoose.Types.ObjectId(id);
  
          var data1 = "";
  
          // const anyThing = await Expense.findById(req.body["key"], function (
          //   err,
          //   user
          // ) {
          //   console.log("delete pyament" + user);
          //   // createHistoryLog(req.email,"Delete Expense", "Delete Expense for client " + isUndefinedOrNull(user.fullname) ? "" : user.fullname, req.id);
          // });
          
          try {
            data1 = await Suppliers.find(
              { _id: key }
            );
            data1 = data1[0];
            //console.log(data1)
          } catch (err) {
            console.log(err);
          }
  
          const event = new Date();
          const options = { year: "numeric", month: "long", day: "numeric" };
          
          let datetime = event.toLocaleDateString("en-US", {
            year: "numeric",
            day: "numeric",
            month: "long",
          });

          if(invoiceTemplate.includes("Pr4onto"))
          {
            data["s2"]["f5"]["value"] = datetime;
          }
          else if(invoiceTemplate.includes("Sw5orn")){
            data["s2"]["f4"]["value"] = datetime;
          }
          else if(invoiceTemplate.includes("Unoff6icial")){
            data["s2"]["f5"]["value"] = datetime;
          }
          else if(invoiceTemplate.includes("Purchase")){
            data["s2"]["f5"]["value"] = datetime;
          }
          else{

          }

          
          //console.log(data1["fullname"])
  
          //console.log(data1);
  
          //data["client"]["id"] = id;
  
          //console.log(data.s0)
  
          if (data.hasOwnProperty("s0")) {
            Object.keys(data.s0).forEach(function (key) {
              let keys = data.s0[key];
  
              if (!isEmptyOrSpaces(keys)) {
                keys = keys.split("_");
                // console.log(keys)
                // console.log(data1.s0[key])
                if (keys.length == 2) {
                  console.log(key)
                  //if (data1.hasOwnProperty(key)) {
                    //console.log("key: " + key);
                    //console.log("mongodata: " + data1[key]);
                    //console.log(keys[0] + " " + keys[1]);
                    data[keys[0]][keys[1]]["value"] = data1[key];
                    //console.log(data[keys[0]][keys[1]]["value"]);
                  //}
                  // else{
                  //   console.log("nothing")
                  // }
                  // data1.s0[key] = req.body[key]
                } else if (keys.length == 3) {
                  if (data1.hasOwnProperty(key)) {
                    data[keys[0]][keys[1]][keys[2]]["value"] = data1[key];
                    //console.log(data[keys[0]][keys[1]][keys[2]]["value"]);
                  }
                } else {
                }
              }
            });
          }
  
          //console.log(data)
  
          /// /////////???????????????????????????????????????????????????????
  
          // Document Template form box
          //app.engine('html', require('ejs-locals'));
          url =
            "/api/invoice/datainvoice?lang=" +
            data["type"] +
            "&doc=" +
            data["caption"] +
            "&id=" +
            id;
  
          const file = fs.readFileSync(htmlpath, "utf-8");
          var fixture_template = ejs.compile(file, { client: true });
          const html = fixture_template({ obj: data, url: url });
  
          res.send({ html: html });
          return;
        }
      }
      res.send({ html: "No Template added yet!" });
    } catch (err) {
      console.log(err);
      res.send({ html: "No Template added yet!" });
      // res.status(500).send({ error: 'Something failed!' })
    }
  });


router.post("/invoiceloadcreate", verify, async (req, res) => {
    try {
      if (
        !isEmptyOrSpaces(req.body.type)
      ) {
        let path = "./json/" + "English" + "/" + req.body.type + ".json";
        let htmlpath = "./GenerateHtml/" + req.body.type + ".ejs";
        let id = req.body.ClientID;
  
        console.log(req.body);
        var invoiceTemplate = req.body.type;
  
        // langCheck = langCheck.toLowerCase();
  
        var docSaved = "";
        var schemaData = "";
  
        try {
  
          var dataid = "";
          // console.log(dataid);
          if (!isEmptyOrSpaces(dataid)) {
  
            url = "";
            console.log('Before read ejs ')
  
            const file = fs.readFileSync(htmlpath, "utf-8");
            var fixture_template = ejs.compile(file, { client: true });
            //const html = fixture_template({ obj: docSaved[0], url: url });
            const html = fixture_template({ obj: [], url: url });
  
            // console.log(html)
            res.send({ html: html });
            return;
          }
        } catch (err) {
          console.log(err);
        }
  
        // console.log(htmlpath)
        if (fs.existsSync(path) && fs.existsSync(htmlpath)) {
  
          //console.log(path);
          // if recode doesnot exits in data base file exists
          let rawdata = fs.readFileSync(path, "utf-8");
          let rawdataProntoSerive = fs.readFileSync("./json/" + "English" + "/servicepronto.json", "utf-8");
          let prontoSerive = JSON.parse(rawdataProntoSerive);
          let rawdataSwornSerive = fs.readFileSync("./json/" + "English" + "/servicesworn.json", "utf-8");
          let swornSerive = JSON.parse(rawdataSwornSerive);
          let rawdataLanguage = fs.readFileSync("./json/" + "English" + "/language.json", "utf-8");
          let languageType = JSON.parse(rawdataLanguage);
          let data = JSON.parse(rawdata);

          var swornServiceResult = [];

          var query = await SwornServices.find(
            {},
            { __v: 0 }
          );
        
          //Format the json
          for (var i = 0; i < query.length; i++) {
            let temp = {
              _id: query[i]._id,
              sworn: query[i].sworn,
              name: query[i].s0.name,
              nameA: query[i].s0.nameA,
              father: query[i].s0.father,
            };

            countservice = i +1;
            swornServiceResult.push(query[i].sworn);
          }

          var prontoServiceResult = [];

          var queryP = await ProntoServices.find(
            {},
            { __v: 0 }
          );
        
          //Format the json
          for (var i = 0; i < queryP.length; i++) {
            let temp = {
              _id: queryP[i]._id,
              pronto: queryP[i].pronto,
              name: queryP[i].s0.name,
              nameA: queryP[i].s0.nameA,
              father: queryP[i].s0.father,
            };

            countservice = i +1;
            prontoServiceResult.push(queryP[i].pronto);
          }


          var languageResult = [];

          var queryL = await Language.find(
            {},
            { __v: 0 }
          );
        
          //Format the json
          for (var i = 0; i < queryL.length; i++) {
            let temp = {
              _id: queryL[i]._id,
              pronto: queryL[i].pronto,
              name: queryL[i].s0.name,
              nameA: queryL[i].s0.nameA,
              father: queryL[i].s0.father,
            };

            countservice = i +1;
            languageResult.push(queryL[i].language);
          }
        
  
          data["prontoServiceType"] = prontoServiceResult;
          data["swornServiceType"] = swornServiceResult; //JSON.stringify(swornSerive);
          data["languageType"] = languageResult;
  
          //console.log(id);
          //Types.ObjectId()
          var key = mongoose.Types.ObjectId(id);
  
          var data1 = "";
  
          // const anyThing = await Expense.findById(req.body["key"], function (
          //   err,
          //   user
          // ) {
          //   console.log("delete pyament" + user);
          //   // createHistoryLog(req.email,"Delete Expense", "Delete Expense for client " + isUndefinedOrNull(user.fullname) ? "" : user.fullname, req.id);
          // });
          
          try {
            data1 = await Paid.find(
              { _id: key }
            );
            data1 = data1[0];
            //console.log(data1)
          } catch (err) {
            console.log(err);
          }
  
          //console.log(data1["fullname"])
  
          //console.log(data1);
  
          //data["client"]["id"] = id;
  
          //console.log(data.s0)
          const event = new Date();
          const options = { year: "numeric", month: "long", day: "numeric" };
          
          let datetime = event.toLocaleDateString("en-US", {
            year: "numeric",
            day: "numeric",
            month: "long",
          });

          if(invoiceTemplate.includes("Pronto"))
          {
            data["s2"]["f5"]["value"] = datetime;
          }
          else if(invoiceTemplate.includes("Sworn")){
            data["s2"]["f4"]["value"] = datetime;
          }
          else if(invoiceTemplate.includes("Unofficial")){
            data["s2"]["f5"]["value"] = datetime;
          }
          else if(invoiceTemplate.includes("Purchase")){
            data["s2"]["f5"]["value"] = datetime;
          }
          else{

          }


  
          if (data.hasOwnProperty("s0")) {
            Object.keys(data.s0).forEach(function (key) {
              let keys = data.s0[key];
  
              if (!isEmptyOrSpaces(keys)) {
                keys = keys.split("_");
                // console.log(keys)
                // console.log(data1.s0[key])
                if (keys.length == 2) {
                  console.log(key)
                  //if (data1.hasOwnProperty(key)) {
                    console.log("key: " + key);
                    console.log("mongodata: " + data1[key]);
                    console.log(keys[0] + " " + keys[1]);
                    data[keys[0]][keys[1]]["value"] = data1[key];
                    console.log(data[keys[0]][keys[1]]["value"]);
                  //}
                  // else{
                  //   console.log("nothing")
                  // }
                  // data1.s0[key] = req.body[key]
                } else if (keys.length == 3) {
                  if (data1.hasOwnProperty(key)) {
                    data[keys[0]][keys[1]][keys[2]]["value"] = data1[key];
                    console.log(data[keys[0]][keys[1]][keys[2]]["value"]);
                  }
                } else {
                }
              }
            });
          }
  
          //console.log(data)
  
          /// /////////???????????????????????????????????????????????????????
  
          // Document Template form box
          //app.engine('html', require('ejs-locals'));
          url =
            "/api/invoice/datainvoice?lang=" +
            data["type"] +
            "&doc=" +
            data["caption"] +
            "&id=" +
            id;
  
          const file = fs.readFileSync(htmlpath, "utf-8");
          var fixture_template = ejs.compile(file, { client: true });
          const html = fixture_template({ obj: data, url: url });
  
          res.send({ html: html });
          return;
        }
      }
      res.send({ html: "No Template added yet!" });
    } catch (err) {
      console.log(err);
      res.send({ html: "No Template added yet!" });
      // res.status(500).send({ error: 'Something failed!' })
    }
  });

router.post("/invoicetemplate", verify, async (req, res) => {
    try {
      console.log(req.body);
      if (
        !isEmptyOrSpaces(req.body.docModel) &&
        !isEmptyOrSpaces(req.body.docID)
      ) {
        var template = "";
        var field = req.body.docModel;
        if(field.includes("ProntoInvoice"))
        {
          template = "Pronto Invoice";
        }
        else if(field.includes("SwornInvoice")){
          template = "Sworn Invoice";
        }
        else if(field.includes("UnofficialInvoice")){
          template = "Unofficial Invoice";
        }
        else if(field.includes("PurchasedInvoice")){
          template = "Purchase Invoice";
        }
        else if(field.includes("ProntoPurchaseInvoice")){
          template = "Pronto Purchase Invoice";
        }
        else if(field.includes("UnofficialPurchaseInvoice")){
          template = "Unofficial Purchase Invoice";
        }
        else{
          res.send({ html: "" });
          return;
        }
        //let path = "./json/" + "English" + "/" + template + ".json";
        let htmlpath = "./GenerateHtml/" + template + ".ejs";

        //let rawdata = fs.readFileSync(path, "utf-8");
        let rawdataProntoSerive = fs.readFileSync("./json/" + "English" + "/servicepronto.json", "utf-8");
        let prontoSerive = JSON.parse(rawdataProntoSerive);
        let rawdataSwornSerive = fs.readFileSync("./json/" + "English" + "/servicesworn.json", "utf-8");
        let swornSerive = JSON.parse(rawdataSwornSerive);
        let rawdataLanguage = fs.readFileSync("./json/" + "English" + "/language.json", "utf-8");
        let languageType = JSON.parse(rawdataLanguage);
        //let data = JSON.parse(rawdata);

        var voucherID = req.body.voucher;
        var transcation = req.body.transcation;
        
        let id = req.body.id;
  
        console.log(req.body);
        var langCheck = "English";
        var modelCheck = req.body.docModel;
        var docID = req.body.docID != null ? req.body.docID : "";
        console.log("DOCUMENT ID :" + docID);
        // langCheck = langCheck.toLowerCase();
        modelCheck = modelCheck.replace(/\s/g, "");
  
        console.log(modelCheck);
  
        var docSaved = "";
        var schemaData = "";
  
        try {
  
          if (!isEmptyOrSpaces(docID)) {
            if (modelCheck.includes("ProntoInvoice")) {
              if (true) {
                docSaved = await ProntoIV.find({ _id: docID });
              }
            }
                else if (modelCheck.includes("UnofficialInvoice")) {
                if (true) {
                  docSaved = await UnofficialIV.find({ _id: docID });
                }
              } else if (modelCheck.includes("SwornInvoice")) {
              if (true) {
                docSaved = await SwornIV.find({ _id: docID });
              }
            } else if (modelCheck.includes("PurchasseIfnvoice")) {
              if (true) {
                docSaved = await PurchaseIV.find({ _id: docID });
              }
            } else if (modelCheck.includes("ProntoPurchaseInvoice")) {
              if (true) {
                docSaved = await ProntoPurchaseIV.find({ _id: docID });
              }
            } else if (modelCheck.includes("UnofficialPurchaseInvoice")) {
              if (true) {
                docSaved = await UnofficialPurchaseIV.find({ _id: docID });
              }
            }
               else {
            }

            

          var swornServiceResult = [];

          var query = await SwornServices.find(
            {},
            { __v: 0 }
          );
        
          //Format the json
          for (var i = 0; i < query.length; i++) {
            let temp = {
              _id: query[i]._id,
              sworn: query[i].sworn,
              name: query[i].s0.name,
              nameA: query[i].s0.nameA,
              father: query[i].s0.father,
            };

            countservice = i +1;
            swornServiceResult.push(query[i].sworn);
          }

          var prontoServiceResult = [];

          var queryP = await ProntoServices.find(
            {},
            { __v: 0 }
          );
        
          //Format the json
          for (var i = 0; i < queryP.length; i++) {
            let temp = {
              _id: queryP[i]._id,
              pronto: queryP[i].pronto,
              name: queryP[i].s0.name,
              nameA: queryP[i].s0.nameA,
              father: queryP[i].s0.father,
            };

            countservice = i +1;
            prontoServiceResult.push(queryP[i].pronto);
          }


          var languageResult = [];

          var queryL = await Language.find(
            {},
            { __v: 0 }
          );
        
          //Format the json
          for (var i = 0; i < queryL.length; i++) {
            let temp = {
              _id: queryL[i]._id,
              pronto: queryL[i].pronto,
              name: queryL[i].s0.name,
              nameA: queryL[i].s0.nameA,
              father: queryL[i].s0.father,
            };

            countservice = i +1;
            languageResult.push(queryL[i].language);
          }

            docSaved[0]["prontoServiceType"] = prontoServiceResult;
            docSaved[0]["swornServiceType"] = swornServiceResult;
            docSaved[0]["languageType"] = languageResult;
  
            /// ////////////////////////////////////
  
            //console.log(docSaved[0].s3.jobsP);
            var url = "";
  
            url =
            "/api/invoice/datainvoice?lang=" +
            docSaved[0]["type"] +
            "&doc=" +
            docSaved[0]["caption"] +
            "&docID=" + docID +  "&id=" +
            id +
            "&voucher=" + voucherID +  "&transcation=" +
            transcation;
  
            console.log("URL: " + url);
  
            // url =
            //   "/api/posts/data?lang=" +
            //   docSaved[0]["type"] +
            //   "&doc=" +
            //   docSaved[0]["caption"] +
            //   "&id=" +
            //   docSaved[0]["client"]["id"] +
            //   "&docID=" +
            //   docID;
  
            // console.log('docSaved: ' + docSaved[0])
            const file = fs.readFileSync(htmlpath, "utf-8");
            var fixture_template = ejs.compile(file, { client: true });
            const html = fixture_template({ obj: docSaved[0], url: url });
            //console.log(docSaved[0])
            res.send({ html: html });
            return;
          }
        } catch (err) {
          console.log(err);
        }
  
      res.send({ html: "No Template added yet!" });
  
    } 
  } catch (err) {
    console.log(err);
  }
});
  

router.get("/invoicecreatenew", verify, async (req, res) => {
  req.keep = "true";
  var query = Paid.find(
    {},
    { payment: 0, invoice: 0, English: 0, Español: 0, Français: 0, Arabic: 0, __v: 0 }
  );

  query.exec(function (err, result) {
    if (!err) {
      //let rawdata = "";
      //console.log(rawdata);
      //rawdata = result
      let dataReturn = result;

      //console.log(result)

      res.render("invoicecreatenew", {
        // req.session.
        name: req.name,
        email: req.email,
        clientname: result,
      });
    } else {
      console.log(err);
    }
  });
});

router.get("/invoicesearch", verify, async (req, res) => {
  // console.log(req.body);
  req.keep = "true";

  res.render("invoicesearch", {
    // req.session.
    name: req.name,
    email: req.email,
    //data: data
  });
});

router.post("/code/GetData", verify, async (req, res) => {
  var result = [];
  var subresult = [];

  console.log("start action");
  console.log(req.query);
  console.log(req.body);
  var flag = 0;

  try {

    res.send(result);
  } catch (err) {
    console.log(err);
    res.send({});
  }
});

router.get("/prontocode", verify, async (req, res) => {
  // console.log(req.body);
  req.keep = "true";

  res.render("codepronto", {
    // req.session.
    name: req.name,
    email: req.email,
    //data: data
  });
});

router.get("/sworncode", verify, async (req, res) => {
  // console.log(req.body);
  req.keep = "true";

  res.render("codesworn", {
    // req.session.
    name: req.name,
    email: req.email,
    //data: data
  });
});

router.get("/languagecode", verify, async (req, res) => {
  // console.log(req.body);
  req.keep = "true";

  res.render("codelanguage", {
    // req.session.
    name: req.name,
    email: req.email,
    //data: data
  });
});

router.post("/code", verify, async (req, res) => {
  req.keep = "true";
  try {
    //console.log("Code Table data collecting");
    let result = [];
    let typeOfService = req.query.type;
    if(typeOfService == "prontoservice")
    {
      let rawdataProntoSerive = fs.readFileSync("./json/" + "English" + "/servicepronto.json", "utf-8");
      let prontoSerive = JSON.parse(rawdataProntoSerive);

      for (var key in prontoSerive)
      {
        let subParent = {
          //put parent id temor
          id: "",
          value: ""
        };
        //console.log("{ id: " + key + ", value: " + prontoSerive[key] + "}");
        subParent.id = key;
        subParent.value = prontoSerive[key];
        result.push(subParent);
      }

      res.send(result);

    } else if(typeOfService == "swornservice")
    {
      let rawdataSwornSerive = fs.readFileSync("./json/" + "English" + "/servicesworn.json", "utf-8");
      let swornSerive = JSON.parse(rawdataSwornSerive);

      for (var key in swornSerive)
      {
        let subParent = {
          //put parent id temor
          id: "",
          value: ""
        };
        //console.log("{ id: " + key + ", value: " + swornSerive[key] + "}");
        subParent.id = key;
        subParent.value = swornSerive[key];
        result.push(subParent);
      }

      res.send(result);

    } else if(typeOfService == "language")
    {
      let rawdataLanguage = fs.readFileSync("./json/" + "English" + "/language.json", "utf-8");
      let languageType = JSON.parse(rawdataLanguage);

      for (var key in languageType)
      {
        let subParent = {
          //put parent id temor
          id: "",
          value: ""
        };
        //console.log("{ id: " + key + ", value: " + swornSerive[key] + "}");
        subParent.id = key;
        subParent.value = languageType[key];
        result.push(subParent);
      }

      res.send(result);
    }
    else {}
    //res.send(req);
  } catch (err) {
    console.log(err);
    res.send({});
  }
});


function downloadLink(datetime, modelCheck, clientName, language = "English") {
  let rawdata;
  if (language == "English") {
    rawdata = fs.readFileSync("./json/English/template.json", "utf-8");
  } else if (language == "Français") {
    rawdata = fs.readFileSync("./json/Français/template.json", "utf-8");
  } else if (language == "Español") {
    rawdata = fs.readFileSync("./json/Español/template.json", "utf-8");
  } else if (language == "Arabic") {
    rawdata = fs.readFileSync("./json/Arabic/template.json", "utf-8");
  } else {
    // console.log("lyugggggggggggggggggggggggggggggggggggggggggggggggggggggggg");
    // console.log(user["payment"][j].language);
    // console.log(user["payment"][j]);
    rawdata = "";
    // add default row json ... or send message to client to fuck off
  }

  let docView = "";
  if(rawdata != ""){
    docView = JSON.parse(rawdata);
  }

  let docModelViewText = "";

  if(docView != ""){
    if (modelCheck.includes("Birth")) {
          docModelViewText =  docView["Birth Certificate"];
    } else if (modelCheck.includes("Divorce")) {
          docModelViewText =  docView["Divorce Certificate"];
    } else if (modelCheck.includes("Death")) {
          docModelViewText =  docView["Death Certificate"];
    } else if (modelCheck.includes("Marriage")) {
          docModelViewText =  docView["Marriage Certificate"];
    } else if (modelCheck.includes("Work")) {       
          docModelViewText =  docView["Work Permit"];
    } else if (modelCheck.includes("ID")) {
          docModelViewText =  docView["ID Card"];
    } else if (modelCheck.includes("MoF")) {
          docModelViewText =  docView["MoF Registration"];
    } else if (modelCheck.includes("Residence")) {
          docModelViewText =  docView["Residence Certificate"];
    } else if (modelCheck.includes("PrivateDriver")) {
          docModelViewText =  docView["Private Driver's license"];
    } else if (modelCheck.includes("Police")) {
          docModelViewText =  docView["Police record"];
    } else if (modelCheck.includes("NSSF")) {
          docModelViewText =  docView["NSSF Service Certificate"];
    } else if (modelCheck.includes("Individual")) {
          docModelViewText =  docView["Individual Extract"];
    } else if (modelCheck.includes("Family")) {
          docModelViewText =  docView["Family Extract"];
    } else if (modelCheck.includes("Consent")) {
          docModelViewText =  docView["Consent to travel"];
    } else if (modelCheck.includes("ResidencyPermit")) {
          docModelViewText =  docView["Residency Permit"];
    } else if (modelCheck.includes("Driver")) {
          docModelViewText =  docView["Driver's license certificate"];
    } else if (modelCheck.includes("Empty")) {
          // console.log("dfdddddddddddddddddddddddddddddddddddddd")
          // var docSaved = await ETemplate.find({
          //   _id: user["payment"][j].docid,
          // });

          // if(docSaved[0]["s1"]["f1"]["value"] != null)
          // {
          //   docModelViewText = docSaved[0]["s1"]["f1"]["value"];
          // }
          // else
          // {
          docModelViewText = docView["Empty Template"];
          // }
    } else {
      docModelViewText = modelCheck;
    }
  }
  else{
    //console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhs");
    docModelViewText = modelCheck;
  }

  var outputPath =
    "./Output/" + docModelViewText + " - " + clientName + " - " + datetime + ".docx";

  return [outputPath, docModelViewText + " - " + clientName + " - " + datetime];
}

// add mongo id for the user
function GenerateDocx(
  data = 1,
  docxPath,
  docArray,
  modelCheck,
  clientName,
  datetime = "0",
  language = "English"
) {
  // Load the docx file as a binary
  var content = fs.readFileSync(docxPath, "binary");

  var zip = new PizZip(content);

  var doc = new Docxtemplater();
  doc.loadZip(zip);

  //console.log(docArray);

  // set the templateVariables
  doc.setData(docArray);

  try {
    // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
    doc.render();
  } catch (error) {
    var e = {
      message: error.message,
      name: error.name,
      stack: error.stack,
      properties: error.properties,
    };
    console.log(JSON.stringify({ error: e }));
    // The error thrown here contains additional information when logged with JSON.stringify (it contains a property object).
    throw error;
  }

  var buf = doc.getZip().generate({ type: "nodebuffer" });

  // buf is a nodejs buffer, you can either write it to a file or do anything else with it.

  const event = new Date();

  const options = { year: "numeric", month: "long", day: "numeric" };

  var date = datetime == "0" ? docArray["date"] : datetime;
  console.log("FUll path with time date" + date);

  var downloadLinkGenerator = downloadLink(datetime, modelCheck, clientName, language)

  
  
  var outputPath = downloadLinkGenerator[0];

  // var outputPath =
  //   "./Output/" + modelCheck + " - " + clientName + " - " + date + ".docx";
  // Get the path that been enter in mongo file for the client and save it with these path
  fs.writeFileSync(outputPath, buf);

  //[outputPath, modelCheck + ' ' + datetime];
  //return outputPath
  return [downloadLinkGenerator[0], downloadLinkGenerator[1]];
  //return [outputPath, modelCheck + " - " + clientName + " - " + date];
}

async function createHistoryLog(user, action, details, id) {
  try {
    const history = new History();

    history.fullname = user;
    history.details = details;
    history.action = action;
    history.idnumber = id;

    //var subdoc = paid.payment.push[0];
    // { _id: '501d86090d371bab2c0341c5', name: 'Liesl' }
    //subdoc.isNew; // true

    var result = await history.save(function (err) {
      if (err) return handleError(err);
      console.log("Success!");
    });
  } catch (error) {}
}

function isUndefinedOrNull(str) {
  return str == null;
}

function isNullOrDoesNotHaveCertainKeyWordOrEmptyOrSpaces(str,key){
  if(isEmptyOrSpaces(str))
  {
    return "";
  }
}

function isEmptyOrSpaces(str) {
  return str === null || str.match(/^ *$/) !== null;
}

function buildDocxHistory(str) {}

const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};



module.exports = router;
