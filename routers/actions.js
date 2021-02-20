const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verify = require("../middleware/verifyToken");
const bodyParser = require("body-parser");
const fs = require("fs");
var ejs = require("ejs");
const Client = require("../models/Clients");
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
const History = require("../models/History");

var mongoose = require("mongoose");

//model client paider
const PaidModel = require("../models/Paid");
const Expense = require("../models/Expense");

const Paid = PaidModel.Paid;
const Payment = PaidModel.Payment;

router.get("/create", verify, (req, res) => {
  req.keep = "true";
  var query = Client.find({}, { s0: 0, __v: 0 });
  query.exec(function (err, result) {
    if (!err) {
      //let rawdata = "";
      //console.log(rawdata);
      //rawdata = result
      let dataReturn = result;

      //console.log(result)

      res.render("create", {
        // req.session.
        name: req.name,
        email: req.email,
        clientname: result,
      });
    } else {
      console.log(err);
    }
  });

  // res.render('create',{
  //     // req.session.
  //     name: req.name,
  //     email: req.email,
  //     data:  data
  // });
});

router.get("/invoicecreate", verify, (req, res) => {
  req.keep = "true";
  //var query = Client.find({}, { s0: 0, __v: 0 });
  // query.exec(function (err, result) {
  //   if (!err) {
  //     //let rawdata = "";
  //     //console.log(rawdata);
  //     //rawdata = result
      //let dataReturn = result;

      //console.log(result)

      res.render("invoicecreate", {
        // req.session.
        name: req.name,
        email: req.email,
        //clientname: result,
      });
    // } else {
    //   console.log(err);
    // }
  //});

  // res.render('create',{
  //     // req.session.
  //     name: req.name,
  //     email: req.email,
  //     data:  data
  // });
});

router.get("/edit", verify, (req, res) => {
  req.keep = "true";
  var query = Client.find({}, { s0: 0, __v: 0 });
  query.exec(function (err, result) {
    if (!err) {
      //let rawdata = "";
      //console.log(rawdata);
      //rawdata = result
      let dataReturn = result;

      //console.log(result)

      res.render("edit", {
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

router.get("/editdocx", verify, (req, res) => {
  req.keep = "true";
  var query = Paid.find({}, { s0: 0, __v: 0 });
  query.exec(function (err, result) {
    if (!err) {
      //let rawdata = "";
      //console.log(rawdata);
      //rawdata = result
      let dataReturn = result;

      //console.log(result)

      res.render("editpaid", {
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

//IN Dashboard load check if user admin or regular user if regluar user load only his/here work flow 
router.get("/dashboard", verify, async (req, res) => {
  req.keep = "true";
  //get all clinet number paid or regular i think paid
  //get all generated document from the regular client
  try {
    var clientNumber = await Client.count({});

    // var documentNumber = await Birth.count({});
    // documentNumber += await Death.count({});
    // documentNumber += await Divorce.count({});
    // documentNumber += await Family.count({});
    // documentNumber += await MoF.count({});
    // documentNumber += await Private.count({});
    // documentNumber += await Driver.count({});
    // documentNumber += await Consent.count({});
    // documentNumber += await Marriage.count({});
    // documentNumber += await IDCard.count({});
    // documentNumber += await ETemplate.count({});
    // documentNumber += await WPermit.count({});
    // documentNumber += await RPermit.count({});
    // documentNumber += await Residence.count({});
    // documentNumber += await Police.count({});
    // documentNumber += await NSSF.count({});
    // documentNumber += await Individual.count({});

    var documentNumber = 0;

    var documentNumberFormHistoryLog = await Client.find(
      {},
      { English: 0, Español: 0, Français: 0, Arabic: 0, __v: 0 }
    );



    var language = ["English", "Arabic", "Español", "Français"];


    if (documentNumberFormHistoryLog != null) {
      for (var i = 0; i < language.length; i++) {
        var docLanguage = documentNumberFormHistoryLog[0]["History"][language[i]];
        //console.log(docLanguage);
        // for(var j = 0; j < docLanguage.length; j++)
        // {
          if(docLanguage["BirthCertificate"]!=null){
            documentNumber += docLanguage["BirthCertificate"].length;
          }
          if(docLanguage["Consenttotravel"]!=null){
            documentNumber += docLanguage["Consenttotravel"].length;
          }
          if(docLanguage["DeathCertificate"]!=null){
            documentNumber += docLanguage["DeathCertificate"].length;
          }
          if(docLanguage["DivorceCertificate"]!=null){
            documentNumber += docLanguage["DivorceCertificate"].length;
          }
          if(docLanguage["Driverslicensecertificate"]!=null){
            documentNumber += docLanguage["Driverslicensecertificate"].length;
          }
          if(docLanguage["PrivateDriverslicense"]!=null){
            documentNumber += docLanguage["PrivateDriverslicense"].length;
          }
          if(docLanguage["FamilyExtract"]!=null){
            documentNumber += docLanguage["FamilyExtract"].length;
          } 
          if(docLanguage["IDCard"]!=null){
            documentNumber += docLanguage["IDCard"].length;
          }
          if(docLanguage["IndividualExtract"]!=null){
            documentNumber += docLanguage["IndividualExtract"].length;
          } 
          if(docLanguage["MarriageCertificate"]!=null){
            documentNumber += docLanguage["MarriageCertificate"].length;
          }
          if(docLanguage["MoFRegistration"]!=null){
            documentNumber += docLanguage["MoFRegistration"].length;
          }
          if(docLanguage["NSSFServiceCertificate"]!=null){
            documentNumber += docLanguage["NSSFServiceCertificate"].length;
          }
          if(docLanguage["Policerecord"]!=null){
            documentNumber += docLanguage["Policerecord"].length;
          }
          if(docLanguage["ResidenceCertificate"]!=null){
            documentNumber += docLanguage["ResidenceCertificate"].length;
          }
          if(docLanguage["ResidencyPermit"]!=null){
            documentNumber += docLanguage["ResidencyPermit"].length;
          }
          if(docLanguage["WorkPermit"]!=null){
            documentNumber += docLanguage["WorkPermit"].length;
          }
          if(docLanguage["EmptyTemplate"]!=null){
            documentNumber += docLanguage["EmptyTemplate"].length;
          }
          // console.log("findone");
          //++documentNumber;
        //}

      }
    }

    //clientData["History"][langCheck][modelCheck]



    var query = await Paid.find(
      {},
      { English: 0, Español: 0, Français: 0, Arabic: 0, __v: 0 }
    );

    var totalUnit = 0;
    var paidSum = 0;
    var remainSum = 0;
    var totalAmountSum = 0;
    var sworn = 0;
    var pronto = 0;
    var nonlegal = 0;

    let data = {
      paidSum: 0,
      remainSum: 0,
      totalAmountSum: 0,
      totalUnit: 0,
      clientNumber: 0,
      nonlegal: 0,
      pronto: 0,
      sworn: 0,
      documentNumber: documentNumber,
    };

    var expenseLog = await Expense.find({});

    for (var j = 0; j < expenseLog.length; j++) {
      // var remains = expenseLog[j].total - expenseLog[j].paid;
      // console.log(expenseLog[j])


  
      if (
        expenseLog[j]["category"] != null &&
        expenseLog[j]["category"].includes("Income")
      ) {
        paidSum += expenseLog[j].paid;
        totalAmountSum += expenseLog[j].total;
        //totalIncome = totalIncome + expenseLog[j].paid;
        console.log("income");

      } else {
        console.log("asdfljaslkdf" + expenseLog[j]["category"]);
      }
    }

    //Get all payment
    for (var i = 0; i < query.length; i++) {
      // console.log(i);
      let totalpaidprice = 0;
      let totalremainprice = 0;
      let totalvalueprice = 0;
      let unit = 0;

      for (var j = 0; j < query[i]["payment"].length; j++) {
        try{
        unit = j + 1;
        totalpaidprice += query[i]["payment"][j].paid;
        totalremainprice += query[i]["payment"][j].remain;
        totalvalueprice += query[i]["payment"][j].total;

        if (query[i]["payment"][j].category.includes("Pronto")) {
          pronto = pronto + 1;
        } else if (query[i]["payment"][j].category.includes("Sworn lega")) {
          sworn = sworn + 1;
        } else if (query[i]["payment"][j].category.includes("Unofficial")) {
          nonlegal = nonlegal + 1;
        } else {
        }
      } catch(err){}
        //console.log("subParent: " + JSON.stringify(subParent));
      }
      //after finish loop parent json

      totalUnit += unit;
      paidSum += totalpaidprice;
      remainSum += totalremainprice;
      totalAmountSum += totalvalueprice;
    }

    data.totalUnit = totalUnit;
    data.clientNumber = clientNumber;
    data.paidSum = paidSum;
    data.remainSum = totalAmountSum - paidSum;
    data.totalAmountSum = totalAmountSum;
    data.count = i;
    data.pronto = pronto;
    data.sworn = sworn;
    data.nonlegal = nonlegal;

    console.log(data);

    res.render("dashboard", {
      // req.session.
      name: req.name,
      email: req.email,
      data: data,
    });

    // result;
  } catch (err) {
    console.log(err);
  }
});

router.get("/view", verify, async (req, res) => {
  req.keep = "true";
  res.render("view", {
    // req.session.
    name: req.name,
    email: req.email,
    //data: data
  });
});

//IN History load check if user admin or regular user if regluar user load only his/here work flow 
router.post("/history", verify, async (req, res) => {
  req.keep = "true";
  try {
    console.log("history Table data collecting");
    // var historyData = await History.find({});
    var historyData = await History.find({}).sort({created_at: 'descending'}).exec();
    // console.log(historyData);
    //res.send([{fullname: 'test', _id: "234234324", date: Date.now, details: "blablablabl"}]);
    res.send(historyData);
  } catch (err) {
    console.log(err);
    res.send({});
  }
});

router.get("/404", verify, async (req, res) => {
  req.keep = "true";
  //charts
  res.render("404", {
    // req.session.
    name: req.name,
    email: req.email,
    //data: data
  });
});


router.get("/chart", verify, async (req, res) => {
  if(req.role == "User"){
    res.redirect("/api/manage/403")

  }
  req.keep = "true";
  //charts
  res.render("blank", {
    // req.session.
    name: req.name,
    email: req.email,
    //data: data
  });
});

router.get("/paid", verify, async (req, res) => {
  req.keep = "true";
  res.render("paid", {
    // req.session.
    name: req.name,
    email: req.email,
    //data: data
  });
});

module.exports = router;
