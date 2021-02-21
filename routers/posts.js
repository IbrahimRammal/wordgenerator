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

//const dateFormat = require("dateformat");
var PizZip = require("pizzip");
var Docxtemplater = require("docxtemplater");
var path = require("path");

var mongoose = require("mongoose");

//model client paider
const PaidModel = require("../models/Paid");
const Expense = require("../models/Expense");

const History = require("../models/History");

const Paid = PaidModel.Paid;
const Payment = PaidModel.Payment;

const paidpath = "./GenerateHtml/paidform.ejs";

var testdb = require("../db/test");

const {
  registerValidation,
  loginValidation,
} = require("../validate/validation");
const { Console } = require("console");
const { PaymentProntoInvoiceinUSA } = require("../models/Paid");
const PILBP = require("../models/ProntoInvoiceinLBP");

router.post("/selector", verify, async (req, res) => {
  try {
    let rawdata;
    if (req.body.type != null && req.body.type == "English") {
      rawdata = fs.readFileSync("./json/English/template.json", "utf-8");
    } else if (req.body.type != null && req.body.type == "Français") {
      rawdata = fs.readFileSync("./json/Français/template.json", "utf-8");
    } else if (req.body.type != null && req.body.type == "Español") {
      rawdata = fs.readFileSync("./json/Español/template.json", "utf-8");
    } else if (req.body.type != null && req.body.type == "Arabic") {
      rawdata = fs.readFileSync("./json/Arabic/template.json", "utf-8");
    } else {
      // add default row json ... or send message to client to fuck off
    }
    let data = JSON.parse(rawdata);

    // console.log(data)

    // const file = fs.readFileSync('./GenerateHtml/selector.ejs', 'utf-8')
    // var fixture_template = ejs.compile(file, { client: true })
    // const html = fixture_template({ obj: data })

    res.send({ html: data });
  } catch (err) {
    // send to client feed back of error or save the error for the super admin me :)
    console.log(err);
    // res.status(500).send({ error: 'Something failed!' })
  }
});

router.post("/clientpaidselect", verify, async (req, res) => {
  try {
    if (!isEmptyOrSpaces(req.body.client)) {
      let id = req.body.client;

      console.log("id : " + id);

      var docSaved = "";
      var schemaData = "";

      docSaved = await Paid.find(
        { _id: id },
        {
          _id: 0,
          fullname: 0,
          s0: 0,
          __v: 0,
          Arabic: 0,
          English: 0,
          Français: 0,
          Español: 0,
        }
      );

      console.log(docSaved);

      res.send({
        first: docSaved[0].name,
        last: docSaved[0].surname,
        middle: docSaved[0].father,
        phone: docSaved[0].mobile,
        address: docSaved[0].address,
        registration: docSaved[0].registration,
        vat: docSaved[0].vat,
        mof: docSaved[0].mof
      });
    }
  } catch (err) {
    // send to client feed back of error or save the error for the super admin me :)
    console.log(err);
    // res.status(500).send({ error: 'Something failed!' })
  }
});

router.post("/addclient", verify, async (req, res) => {
  try {
    console.log("addclient");
    var targetinfo = req.body;
    if (!isEmptyOrSpaces(targetinfo.value)) {
      var data = {
        fullname: targetinfo.value,
        s0: {
          name: "",
          surname: "",
          father: "",
          mother: "",
          mothersurname: "",
          nationaltiy: "",
          sex: "",
          familystatus: "",
          governorate: "",
          district: "",
          city: "",
          quarter: "",
          street: "",
          building: "",
          floor: "",
          mobile: "",
          work: "",
          fax: "",
          email: "",
          profession: "",
          address: "",
          telephone: "",
          religion: "",
          placeofbirthlocal: "",
          placeofbirthdistrict: "",
          dateofbirth: "",
          placeregistry: "",
          noregistry: "",
        },
        Arabic: {
          EmptyTemplate: "",
        },
        English: {
          BirthCertificate: "",
          Consenttotravel: "",
          DeathCertificate: "",
          DivorceCertificate: "",
          Driverslicensecertificate: "",
          PrivateDriverslicense: "",
          FamilyExtract: "",
          IDCard: "",
          IndividualExtract: "",
          MarriageCertificate: "",
          MoFRegistration: "",
          NSSFServiceCertificate: "",
          Policerecord: "",
          ResidenceCertificate: "",
          ResidencyPermit: "",
          WorkPermit: "",
          EmptyTemplate: "",
        },
        Español: {
          BirthCertificate: "",
          Consenttotravel: "",
          DeathCertificate: "",
          DivorceCertificate: "",
          Driverslicensecertificate: "",
          PrivateDriverslicense: "",
          FamilyExtract: "",
          IDCard: "",
          IndividualExtract: "",
          MarriageCertificate: "",
          MoFRegistration: "",
          NSSFServiceCertificate: "",
          Policerecord: "",
          ResidenceCertificate: "",
          ResidencyPermit: "",
          WorkPermit: "",
          EmptyTemplate: "",
        },
        Français: {
          BirthCertificate: "",
          Consenttotravel: "",
          DeathCertificate: "",
          DivorceCertificate: "",
          Driverslicensecertificate: "",
          PrivateDriverslicense: "",
          FamilyExtract: "",
          IDCard: "",
          IndividualExtract: "",
          MarriageCertificate: "",
          MoFRegistration: "",
          NSSFServiceCertificate: "",
          Policerecord: "",
          ResidenceCertificate: "",
          ResidencyPermit: "",
          WorkPermit: "",
          EmptyTemplate: "",
        },
        History: {
          Arabic: {
            EmptyTemplate: [],
          },
          English: {
            BirthCertificate: [],
            Consenttotravel: [],
            DeathCertificate: [],
            DivorceCertificate: [],
            Driverslicensecertificate: [],
            PrivateDriverslicense: [],
            FamilyExtract: [],
            IDCard: [],
            IndividualExtract: [],
            MarriageCertificate: [],
            MoFRegistration: [],
            NSSFServiceCertificate: [],
            Policerecord: [],
            ResidenceCertificate: [],
            ResidencyPermit: [],
            WorkPermit: [],
            EmptyTemplate: [],
          },
          Español: {
            BirthCertificate: [],
            Consenttotravel: [],
            DeathCertificate: [],
            DivorceCertificate: [],
            Driverslicensecertificate: [],
            PrivateDriverslicense: [],
            FamilyExtract: [],
            IDCard: [],
            IndividualExtract: [],
            MarriageCertificate: [],
            MoFRegistration: [],
            NSSFServiceCertificate: [],
            Policerecord: [],
            ResidenceCertificate: [],
            ResidencyPermit: [],
            WorkPermit: [],
            EmptyTemplate: [],
          },
          Français: {
            BirthCertificate: [],
            Consenttotravel: [],
            DeathCertificate: [],
            DivorceCertificate: [],
            Driverslicensecertificate: [],
            PrivateDriverslicense: [],
            FamilyExtract: [],
            IDCard: [],
            IndividualExtract: [],
            MarriageCertificate: [],
            MoFRegistration: [],
            NSSFServiceCertificate: [],
            Policerecord: [],
            ResidenceCertificate: [],
            ResidencyPermit: [],
            WorkPermit: [],
            EmptyTemplate: [],
          },
        },
      };

      const client = new Client(data);
      const savedClient = await client.save();

      console.log("save new client :" + savedClient);

      // var query = Client.find({}).select({"_id": 1, "s0": 0});
      //render select pickers
      var query = Client.find({}, { s0: 0, __v: 0 });
      query.exec(function (err, result) {
        if (!err) {
          // let rawdata = "";
          // console.log(rawdata);
          // rawdata = result
          let dataReturn = result;

          // console.log(result);

          res.send({ html: dataReturn });
        } else {
          console.log(err);
        }
      });
    }
  } catch (err) {
    console.log(err);
    // res.send({ html: 'No Template added yet!' })
    // res.status(500).send({ error: 'Something failed!' })
  }
});

router.post("/edit", verify, async (req, res) => {
  // if (false) {
  try {
    if (!isEmptyOrSpaces(req.body.client)) {
      let id = req.body.client;
      var url = "";
      var result = [];

      // var objEsp = JSON.parse(fs.readFileSync('./json/Español/template.json', 'utf8'));
      // var objFrance = JSON.parse(fs.readFileSync('./json/Français/template.json', 'utf8'));
      // var objArabic = JSON.parse(fs.readFileSync('./json/Arabic/template.json', 'utf8'));

      try {
        var clientDocx = await Client.find(
          { _id: id },
          { _id: 0, fullname: 0, s0: 0, __v: 0 }
        );

        var language = ["English", "Arabic", "Español", "Français"];

        if (clientDocx != null) {
          // language.forEach((element) => {
          //console.log(clientDocx[0][element]);
          for (var i = 0; i < language.length; i++) {
            var docLanguage = clientDocx[0]["History"][language[i]];


            let rawdata;
            if (language[i] == "English") {
              rawdata = fs.readFileSync("./json/English/template.json", "utf-8");
            } else if (language[i] == "Français") {
              rawdata = fs.readFileSync("./json/Français/template.json", "utf-8");
            } else if (language[i] == "Español") {
              rawdata = fs.readFileSync("./json/Español/template.json", "utf-8");
            } else if (language[i] == "Arabic") {
              rawdata = fs.readFileSync("./json/Arabic/template.json", "utf-8");
            } else {
              // add default row json ... or send message to client to fuck off
            }
            let docView = JSON.parse(rawdata);
            
            for (const docModel in docLanguage) {
              var ObjectId = require("mongoose").Types.ObjectId;
              // console.log(docLanguage[docModel][0][0]);
              if (docLanguage[docModel][0] != null && ObjectId.isValid(docLanguage[docModel][0][0])) {
                console.log(docLanguage[docModel]);
                if (docModel.includes("Birth")) {
                  for (var j = 0; j < docLanguage[docModel].length; j++) {
                    var docSaved = await Birth.find({
                      _id: docLanguage[docModel][j],
                    });
                    // console.log("asdfdsfdf" + docLanguage[docModel]);
                    console.log(docSaved);
                    result.push({
                      _id: docLanguage[docModel][j],
                      client_id: id,
                      language: language[i],
                      docModel: "Birth Certificate",
                      docModelView: docView["Birth Certificate"],
                      created_at: docSaved[0].created_at,
                      updated_at: docSaved[0].updated_at,
                      createdBy: docSaved[0].user_created,
                      updateddBy: docSaved[0].user_edit,
                      note: docSaved[0].note,
                      download: "DOWNLOAD",
                      edit: "EDIT",
                      delete: "DELETE",
                    });
                  }
                } else if (docModel.includes("Divorce")) {
                  for (var j = 0; j < docLanguage[docModel].length; j++) {
                    var docSaved = await Divorce.find({
                      _id: docLanguage[docModel][j],
                    });
                    result.push({
                      _id: docLanguage[docModel][j],
                      client_id: id,
                      language: language[i],
                      docModel: "Divorce Certificate",
                      docModelView: docView["Divorce Certificate"],
                      created_at: docSaved[0].created_at,
                      updated_at: docSaved[0].updated_at,
                      createdBy: docSaved[0].user_created,
                      updateddBy: docSaved[0].user_edit,
                      note: docSaved[0].note,
                      download: "DOWNLOAD",
                      edit: "EDIT",
                      delete: "DELETE",
                    });
                  }
                } else if (docModel.includes("Death")) {
                  for (var j = 0; j < docLanguage[docModel].length; j++) {
                    var docSaved = await Death.find({
                      _id: docLanguage[docModel][j],
                    });
                    result.push({
                      _id: docLanguage[docModel][j],
                      client_id: id,
                      language: language[i],
                      docModel: "Death Certificate",
                      docModelView: docView["Death Certificate"],
                      created_at: docSaved[0].created_at,
                      updated_at: docSaved[0].updated_at,
                      createdBy: docSaved[0].user_created,
                      updateddBy: docSaved[0].user_edit,
                      note: docSaved[0].note,
                      download: "DOWNLOAD",
                      edit: "EDIT",
                      delete: "DELETE",
                    });
                  }
                } else if (docModel.includes("Marriage")) {
                  for (var j = 0; j < docLanguage[docModel].length; j++) {
                    var docSaved = await Marriage.find({
                      _id: docLanguage[docModel][j],
                    });
                    result.push({
                      _id: docLanguage[docModel][j],
                      client_id: id,
                      language: language[i],
                      docModel: "Marriage Certificate",
                      docModelView: docView["Marriage Certificate"],
                      created_at: docSaved[0].created_at,
                      updated_at: docSaved[0].updated_at,
                      createdBy: docSaved[0].user_created,
                      updateddBy: docSaved[0].user_edit,
                      note: docSaved[0].note,
                      download: "DOWNLOAD",
                      edit: "EDIT",
                      delete: "DELETE",
                    });
                  }
                } else if (docModel.includes("Work")) {
                  for (var j = 0; j < docLanguage[docModel].length; j++) {
                    var docSaved = await WPermit.find({
                      _id: docLanguage[docModel][j],
                    });
                    result.push({
                      _id: docLanguage[docModel][j],
                      client_id: id,
                      language: language[i],
                      docModel: "Work Permit",
                      docModelView: docView["Work Permit"],
                      created_at: docSaved[0].created_at,
                      updated_at: docSaved[0].updated_at,
                      createdBy: docSaved[0].user_created,
                      updateddBy: docSaved[0].user_edit,
                      note: docSaved[0].note,
                      download: "DOWNLOAD",
                      edit: "EDIT",
                      delete: "DELETE",
                    });
                  }
                } else if (docModel.includes("ID")) {
                  for (var j = 0; j < docLanguage[docModel].length; j++) {
                    var docSaved = await IDCard.find({
                      _id: docLanguage[docModel][j],
                    });
                    result.push({
                      _id: docLanguage[docModel][j],
                      client_id: id,
                      language: language[i],
                      docModel: "ID Card",
                      docModelView: docView["ID Card"],
                      created_at: docSaved[0].created_at,
                      updated_at: docSaved[0].updated_at,
                      createdBy: docSaved[0].user_created,
                      updateddBy: docSaved[0].user_edit,
                      note: docSaved[0].note,
                      download: "DOWNLOAD",
                      edit: "EDIT",
                      delete: "DELETE",
                    });
                  }
                } else if (docModel.includes("MoF")) {
                  for (var j = 0; j < docLanguage[docModel].length; j++) {
                    var docSaved = await MoF.find({
                      _id: docLanguage[docModel][j],
                    });
                    result.push({
                      _id: docLanguage[docModel][j],
                      client_id: id,
                      language: language[i],
                      docModel: "MoF Registration",
                      docModelView: docView["MoF Registration"],
                      created_at: docSaved[0].created_at,
                      updated_at: docSaved[0].updated_at,
                      createdBy: docSaved[0].user_created,
                      updateddBy: docSaved[0].user_edit,
                      note: docSaved[0].note,
                      download: "DOWNLOAD",
                      edit: "EDIT",
                      delete: "DELETE",
                    });
                  }
                } else if (docModel.includes("Residence")) {
                  for (var j = 0; j < docLanguage[docModel].length; j++) {
                    var docSaved = await Residence.find({
                      _id: docLanguage[docModel][j],
                    });
                    result.push({
                      _id: docLanguage[docModel][j],
                      client_id: id,
                      language: language[i],
                      docModel: "Residence Certificate",
                      docModelView: docView["Residence Certificate"],
                      created_at: docSaved[0].created_at,
                      updated_at: docSaved[0].updated_at,
                      createdBy: docSaved[0].user_created,
                      updateddBy: docSaved[0].user_edit,
                      note: docSaved[0].note,
                      download: "DOWNLOAD",
                      edit: "EDIT",
                      delete: "DELETE",
                    });
                  }
                } else if (docModel.includes("PrivateDriver")) {
                  for (var j = 0; j < docLanguage[docModel].length; j++) {
                    var docSaved = await Private.find({
                      _id: docLanguage[docModel][j],
                    });
                    result.push({
                      _id: docLanguage[docModel][j],
                      client_id: id,
                      language: language[i],
                      docModel: "Private Driver's license",
                      docModelView: docView["Private Driver's license"],
                      created_at: docSaved[0].created_at,
                      updated_at: docSaved[0].updated_at,
                      createdBy: docSaved[0].user_created,
                      updateddBy: docSaved[0].user_edit,
                      note: docSaved[0].note,
                      download: "DOWNLOAD",
                      edit: "EDIT",
                      delete: "DELETE",
                    });
                  }
                } else if (docModel.includes("Police")) {
                  for (var j = 0; j < docLanguage[docModel].length; j++) {
                    var docSaved = await Police.find({
                      _id: docLanguage[docModel][j],
                    });
                    result.push({
                      _id: docLanguage[docModel][j],
                      client_id: id,
                      language: language[i],
                      docModel: "Police record",
                      docModelView: docView["Police record"],
                      created_at: docSaved[0].created_at,
                      updated_at: docSaved[0].updated_at,
                      createdBy: docSaved[0].user_created,
                      updateddBy: docSaved[0].user_edit,
                      note: docSaved[0].note,
                      download: "DOWNLOAD",
                      edit: "EDIT",
                      delete: "DELETE",
                    });
                  }
                } else if (docModel.includes("NSSF")) {
                  for (var j = 0; j < docLanguage[docModel].length; j++) {
                    var docSaved = await NSSF.find({
                      _id: docLanguage[docModel][j],
                    });
                    result.push({
                      _id: docLanguage[docModel][j],
                      client_id: id,
                      language: language[i],
                      docModel: "NSSF Service Certificate",
                      docModelView: docView["NSSF Service Certificate"],
                      created_at: docSaved[0].created_at,
                      updated_at: docSaved[0].updated_at,
                      createdBy: docSaved[0].user_created,
                      updateddBy: docSaved[0].user_edit,
                      note: docSaved[0].note,
                      download: "DOWNLOAD",
                      edit: "EDIT",
                      delete: "DELETE",
                    });
                  }
                } else if (docModel.includes("Individual")) {
                  for (var j = 0; j < docLanguage[docModel].length; j++) {
                    var docSaved = await Individual.find({
                      _id: docLanguage[docModel][j],
                    });
                    result.push({
                      _id: docLanguage[docModel][j],
                      client_id: id,
                      language: language[i],
                      docModel: "Individual Extract",
                      docModelView: docView["Individual Extract"],
                      created_at: docSaved[0].created_at,
                      updated_at: docSaved[0].updated_at,
                      createdBy: docSaved[0].user_created,
                      updateddBy: docSaved[0].user_edit,
                      note: docSaved[0].note,
                      download: "DOWNLOAD",
                      edit: "EDIT",
                      delete: "DELETE",
                    });
                  }
                } else if (docModel.includes("Family")) {
                  for (var j = 0; j < docLanguage[docModel].length; j++) {
                    var docSaved = await Family.find({
                      _id: docLanguage[docModel][j],
                    });
                    result.push({
                      _id: docLanguage[docModel][j],
                      client_id: id,
                      language: language[i],
                      docModel: "Family Extract",
                      docModelView: docView["Family Extract"],
                      created_at: docSaved[0].created_at,
                      updated_at: docSaved[0].updated_at,
                      createdBy: docSaved[0].user_created,
                      updateddBy: docSaved[0].user_edit,
                      note: docSaved[0].note,
                      download: "DOWNLOAD",
                      edit: "EDIT",
                      delete: "DELETE",
                    });
                  }
                } else if (docModel.includes("Consent")) {
                  for (var j = 0; j < docLanguage[docModel].length; j++) {
                    var docSaved = await Consent.find({
                      _id: docLanguage[docModel][j],
                    });
                    result.push({
                      _id: docLanguage[docModel][j],
                      client_id: id,
                      language: language[i],
                      docModel: "Consent to travel",
                      docModelView: docView["Consent to travel"],
                      created_at: docSaved[0].created_at,
                      updated_at: docSaved[0].updated_at,
                      createdBy: docSaved[0].user_created,
                      updateddBy: docSaved[0].user_edit,
                      note: docSaved[0].note,
                      download: "DOWNLOAD",
                      edit: "EDIT",
                      delete: "DELETE",
                    });
                  }
                } else if (docModel.includes("ResidencyPermit")) {
                  for (var j = 0; j < docLanguage[docModel].length; j++) {
                    var docSaved = await RPermit.find({
                      _id: docLanguage[docModel][j],
                    });
                    result.push({
                      _id: docLanguage[docModel][j],
                      client_id: id,
                      language: language[i],
                      docModel: "Residency Permit",
                      docModelView: docView["Residency Permit"],
                      created_at: docSaved[0].created_at,
                      updated_at: docSaved[0].updated_at,
                      createdBy: docSaved[0].user_created,
                      updateddBy: docSaved[0].user_edit,
                      note: docSaved[0].note,
                      download: "DOWNLOAD",
                      edit: "EDIT",
                      delete: "DELETE",
                    });
                  }
                } else if (docModel.includes("Driver")) {
                  for (var j = 0; j < docLanguage[docModel].length; j++) {
                    var docSaved = await Driver.find({
                      _id: docLanguage[docModel][j],
                    });
                    result.push({
                      _id: docLanguage[docModel][j],
                      client_id: id,
                      language: language[i],
                      docModel: "Driver's license certificate",
                      docModelView: docView["Driver's license certificate"],
                      created_at: docSaved[0].created_at,
                      updated_at: docSaved[0].updated_at,
                      createdBy: docSaved[0].user_created,
                      updateddBy: docSaved[0].user_edit,
                      note: docSaved[0].note,
                      download: "DOWNLOAD",
                      edit: "EDIT",
                      delete: "DELETE",
                    });
                  }
                } else if (docModel.includes("Empty")) {
                  for (var j = 0; j < docLanguage[docModel].length; j++) {
                    console.log("foundit");
                    var docSaved = await ETemplate.find({
                      _id: docLanguage[docModel][j],
                    });
                    var documentTitle = "";
                    if(docSaved[0]["s1"]["f1"]["value"] != null)
                    {
                      documentTitle = docSaved[0]["s1"]["f1"]["value"];
                    }
                    else
                    {
                      documentTitle = docView["Empty Template"];
                    }
                    result.push({
                      _id: docLanguage[docModel][j],
                      client_id: id,
                      language: language[i],
                      docModel: "Empty Template",
                      docModelView: documentTitle,
                      created_at: docSaved[0].created_at,
                      updated_at: docSaved[0].updated_at,
                      createdBy: docSaved[0].user_created,
                      updateddBy: docSaved[0].user_edit,
                      note: docSaved[0].note,
                      download: "DOWNLOAD",
                      edit: "EDIT",
                      delete: "DELETE",
                    });
                  }
                } else {
                }
              }
            }
          }
          // });
        } else {
        }
        // console.log(html)
        // console.log(result);

        res.send(result);
      } catch (err) {
        console.log(err);
      }
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/delete", verify, async (req, res) => {
  try {
    if (
      !isEmptyOrSpaces(req.body.type) &&
      !isEmptyOrSpaces(req.body.template) &&
      !isEmptyOrSpaces(req.body.client)
    ) {

      let id = req.body.client;

      console.log(req.body);
      var langCheck = req.body.type;
      var modelCheck = req.body.template;
      var docID = req.body.docID != null ? req.body.docID : "";
      console.log("DOCUMENT ID :" + docID);
      // langCheck = langCheck.toLowerCase();
      modelCheck = modelCheck.replace(/\s/g, "");

      console.log(modelCheck);

      var docSaved = "";
      var schemaData = "";


        // console.log('docSaved: ' + docSaved[0])

        var dataid = ""

        //dataid = docID != "" ? docID : docSaved[0][langCheck][modelCheck];
        dataid = docID;

        console.log(dataid);
        try {
          let clientData = await Client.findOne({ _id: id });
          //clientData["History"][langCheck][modelCheck].pull(docid);
          console.log(clientData["History"][langCheck][modelCheck]);

        //   const removeById = (arr, id) => {
        //     const requiredIndex = arr.findIndex(el => {
        //        return el === String(id);        
        //     });
        //     if(requiredIndex === -1){
        //        return false;
        //     };
        //     return !!arr.splice(requiredIndex, 1);
        //  };
        for( var i = 0; i < clientData["History"][langCheck][modelCheck].length; i++){ 
          console.log(clientData["History"][langCheck][modelCheck][i][0]);
          // console.log(dataid[0]);
    
          if ( clientData["History"][langCheck][modelCheck][i][0] == dataid[0]) { 
      
            clientData["History"][langCheck][modelCheck].splice(i, 1); 
          }
      
        }
        console.log(clientData["History"][langCheck][modelCheck]);

          //removeById(clientData["History"][langCheck][modelCheck], docID);
          await clientData.save();
          // console.log(data1)
        } catch (err) {
          console.log(err);
        }



          // console.log(html)
        res.send({ html: "success" });
        return;
  }  else {}
}
    // res.send({ html: "No Template added yet!" });
   catch (err) {
    console.log(err);
    res.send({ html: "Error in delete!" });
    // res.status(500).send({ error: 'Something failed!' })
  }
});

router.post("/invoiceSelect", verify, async (req, res) => {
  try {
    if (
      !isEmptyOrSpaces(req.body.type)
    ) {
      let path = "./json/" + "English" + "/" + req.body.type + ".json";
      let htmlpath = "./GenerateHtml/" + req.body.type + ".ejs";
      let id = req.body.id;

      console.log(req.body);
      var invoiceTemplate = req.body.type;

      // langCheck = langCheck.toLowerCase();

      var docSaved = "";
      var schemaData = "";

      try {
        //Find user paid not client ???????????????????????????????????????????
        // docSaved = await Client.find(
        //   { _id: id },
        //   { _id: 0, fullname: 0, s0: 0, __v: 0 }
        // );

        // console.log('docSaved: ' + docSaved[0])

        var dataid = "";
        // console.log(dataid);
        if (!isEmptyOrSpaces(dataid)) {
        //   if (modelCheck.includes("Birth")) {
        //     docSaved = await Birth.find({ _id: dataid });
        //   } else if (modelCheck.includes("Divorce")) {
        //     docSaved = await Divorce.find({ _id: dataid });
        //   } else if (modelCheck.includes("Death")) {
        //     docSaved = await Death.find({ _id: dataid });
        //   } else if (modelCheck.includes("Marriage")) {
        //     docSaved = await Marriage.find({ _id: dataid });
        //   } else if (modelCheck.includes("Work")) {
        //     docSaved = await WPermit.find({ _id: dataid });
        //   } else if (modelCheck.includes("ID")) {
        //     docSaved = await IDCard.find({ _id: dataid });
        //   } else if (modelCheck.includes("MoF")) {
        //     docSaved = await MoF.find({ _id: dataid });
        //   } else if (modelCheck.includes("Residence")) {
        //     docSaved = await Residence.find({ _id: dataid });
        //   } else if (modelCheck.includes("PrivateDriver")) {
        //     docSaved = await Private.find({ _id: dataid });
        //   } else if (modelCheck.includes("Police")) {
        //     docSaved = await Police.find({ _id: dataid });
        //   } else if (modelCheck.includes("NSSF")) {
        //     docSaved = await NSSF.find({ _id: dataid });
        //   } else if (modelCheck.includes("Individual")) {
        //     docSaved = await Individual.find({ _id: dataid });
        //   } else if (modelCheck.includes("Family")) {
        //     docSaved = await Family.find({ _id: dataid });
        //   } else if (modelCheck.includes("Consent")) {
        //     docSaved = await Consent.find({ _id: dataid });
        //   } else if (modelCheck.includes("ResidencyPermit")) {
        //     docSaved = await RPermit.find({ _id: dataid });
        //   } else if (modelCheck.includes("Driver")) {
        //     docSaved = await Driver.find({ _id: dataid });
        //   } else if (modelCheck.includes("Empty")) {
        //     console.log("foundit");
        //     docSaved = await ETemplate.find({ _id: dataid });
        //   } else {
        //   }

          /// ////////////////////////////////////
          //docSaved[0]["client"]["id"] = id;

          // url =
          //   "/api/posts/data?lang=" +
          //   docSaved[0]["type"] +
          //   "&doc=" +
          //   docSaved[0]["caption"] +
          //   "&id=" +
          //   docSaved[0]["client"]["id"] +
          //   "&docID=" +
          //   docID;
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
          "/api/posts/datainvoice?lang=" +
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

router.post("/datainvoice", verify, async (req, res) => {
  try {
    // req.query.lang req.query.lang doc
    // get request parms
    // make the path string
    // check file if exits
    // If else for every schema to save
    // add path to parmaters on GenerateBCDocx function
    console.log(req.query);
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
        let docArray = { clients: [], users: [], job: [], jobs: [] }; // sar fe mwskleh bel array fams:[]
        let jsonObj = [];

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

        var totalPayment = 0;

        if (data.hasOwnProperty("s3")) {
          if (data.s3.hasOwnProperty("job")) {
            for (var i = 0; i < data.s3.job.length; i++) {
              if (!isEmptyOrSpaces(req.body["s3_job_pro_" + i])) {
                data.s3.job[i].pro = req.body["s3_job_pro_" + i];
                data.s3.job[i].stype =
                  req.body["s3_job_stype_" + i];
                data.s3.job[i].slan = req.body["s3_job_slan_" + i];
                data.s3.job[i].tlan = req.body["s3_job_tlan_" + i];
                data.s3.job[i].unit = req.body["s3_job_unit_" + i];

                data.s3.job[i].unitp = req.body["s3_job_unitp_" + i];
                data.s3.job[i].wcount = req.body["s3_job_wcount_" + i];
                data.s3.job[i].t = req.body["s3_job_t_" + i];

                totalPayment += parseFloat(req.body["s3_job_t_" + i]);

                docArray.job.push({
                  pro: req.body["s3_job_pro_" + i],
                  stype: req.body["s3_job_stype_" + i],
                  slan: req.body["s3_job_slan_" + i],
                  tlan: req.body["s3_job_tlan_" + i],
                  unit: req.body["s3_job_unit_" + i],
                  unitp: req.body["s3_job_unitp_" + i],
                  wcount: req.body["s3_job_wcount_" + i],
                  t: req.body["s3_job_t_" + i]
                });
              }
            }
          } else{}
        }

        if (data.hasOwnProperty("s3")) {
          if (data.s3.hasOwnProperty("jobs")) {
            for (var i = 0; i < data.s3.jobs.length; i++) {
              if (!isEmptyOrSpaces(req.body["s3_jobs_pro_" + i])) {
                data.s3.jobs[i].pro = req.body["s3_jobs_pro_" + i];
                data.s3.jobs[i].stype =
                  req.body["s3_jobs_stype_" + i];
                  
                data.s3.jobs[i].jn = req.body["s3_jobs_jn_" + i];
                data.s3.jobs[i].slan = req.body["s3_jobs_slan_" + i];
                data.s3.jobs[i].tlan = req.body["s3_jobs_tlan_" + i];
                data.s3.jobs[i].unit = req.body["s3_jobs_unit_" + i];

                data.s3.jobs[i].unitp = req.body["s3_jobs_unitp_" + i];
                data.s3.jobs[i].nunit = req.body["s3_jobs_nunit_" + i];
                data.s3.jobs[i].t = req.body["s3_jobs_t_" + i];

                totalPayment += parseFloat(req.body["s3_jobs_t_" + i]);

                docArray.jobs.push({
                  jn : req.body["s3_jobs_jn_" + i],
                  pro: req.body["s3_jobs_pro_" + i],
                  stype: req.body["s3_jobs_stype_" + i],
                  slan: req.body["s3_jobs_slan_" + i],
                  tlan: req.body["s3_jobs_tlan_" + i],
                  unit: req.body["s3_jobs_unit_" + i],
                  unitp: req.body["s3_jobs_unitp_" + i],
                  nunit: req.body["s3_jobs_nunit_" + i],
                  t: req.body["s3_jobs_t_" + i]
                });
              }
            }
          } else{}
        }

        // console.log(docArray)

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

        // console.log(docArray['o1'])
        //console.log(data["o1"]);

        // data['date'] = dateFormat(new Date(), "mmm d yyyy");
        // docArray['date'] = dateFormat(new Date(), "mmm d yyyy");

        console.log("before save");

        var modelCheck = req.query.doc;
        var langCheck = "English";
        var id = req.query.id;
        var docID = req.query.docID != null ? req.query.docID : "";
        modelCheck = modelCheck.replace(/\s/g, "");

        let clientData = await Paid.findOne({ _id: id });
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

        data["docArray"] = docArray;


        //console.log(data["docArray"])

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
          currency: ""
        };

        // console.log(modelCheck + "modelCheck")
        if (modelCheck.includes("ProntoInvoiceinUSD")) {
          if (ObjectId.isValid(docID)) {
            data["user_edit"] = email;
            console.log("Update doc by ID " + docID);
            const piusa = await PIUSA.findOneAndUpdate(
              { _id: docID },
              data,
              { upsert: true },
              function (err, doc) {
                if (err) console.log(err);
                // console.log(doc.docArray)
                console.log("Succesfully saved.");
              }
            );

            var dummyData = await Paid.updateOne(
              { _id: id,
                "invoice.docid": docID,
              },
              {
                $set: {
                  // "invoice.$.category": req.body.value.category,
                  "invoice.$.total": totalPayment,
                  "invoice.$.updateTime": datetime
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

            // var savedPaid = await Paid.updateOne(
            //   { _id: id },
            //   { $push: { invoice: clientInvoiceHistory } },
            //   { upsert: true, new: true  }
            // );

          } else {
            data["user_created"] = email;
            //console.log(data)
            const piusa = new PIUSA(data);
            const savedPiusa = await piusa.save();
            docid = savedPiusa._id;

            clientInvoiceHistory.docid = docid;
            clientInvoiceHistory.currency = "USD";
            
            //console.log(clientInvoiceHistory)

            var savedPaid = await Paid.updateOne(
              { _id: id },
              { $push: { invoice: clientInvoiceHistory } },
              { upsert: true, new: true  }
            );
          }
        } else if (modelCheck.includes("ProntoInvoiceinLBP")) {
          if (ObjectId.isValid(docID)) {
            data["user_edit"] = email;

            console.log(data["docArray"])
            console.log("Update doc by ID " + docID);
            const pilbd = await PILBD.findOneAndUpdate(
              { _id: docID },
              data,
              { upsert: true },
              function (err, doc) {
                if (err) console.log(err);
                // console.log(doc.docArray)
              }
            );

            var dummyData = await Paid.updateOne(
              { _id: id,
                "invoice.docid": docID,
              },
              {
                $set: {
                  // "invoice.$.category": req.body.value.category,
                  "invoice.$.total": totalPayment,
                  "invoice.$.updateTime": datetime
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
          } else {
            data["user_created"] = email;
            console.log(data["docArray"])
            //console.log(data)
            const pilbd = new PILBD(data);
            const savedPilbd = await pilbd.save();
            docid = savedPilbd._id;
            clientInvoiceHistory.docid = docid;
            clientInvoiceHistory.currency = "LBP";
            
            //console.log(clientInvoiceHistory)

            var savedPaid = await Paid.updateOne(
              { _id: id },
              { $push: { invoice: clientInvoiceHistory } },
              { upsert: true, new: true  }
            );
          } 
        } else if (modelCheck.includes("SwornTranslationInvoice")) {
          if (ObjectId.isValid(docID)) {
            data["user_edit"] = email;
            console.log("Update doc by ID " + docID);
            const sworni = await SWORNI.findOneAndUpdate(
              { _id: docID },
              data,
              { upsert: true },
              function (err, doc) {
                if (err) console.log(err);
                // console.log(doc.docArray)
              }
            );

            var dummyData = await Paid.updateOne(
              { _id: id,
                "invoice.docid": docID,
              },
              {
                $set: {
                  // "invoice.$.category": req.body.value.category,
                  "invoice.$.total": totalPayment,
                  "invoice.$.updateTime": datetime
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
          } else {
            data["user_created"] = email;
            //console.log(data)
            const sworni = new SWORNI(data);
            const savedSworni = await sworni.save();
            docid = savedSworni._id;
            clientInvoiceHistory.docid = docid;
            clientInvoiceHistory.currency = "LBP";
            
            //console.log(clientInvoiceHistory)

            var savedPaid = await Paid.updateOne(
              { _id: id },
              { $push: { invoice: clientInvoiceHistory } },
              { upsert: true, new: true  }
            );
          }
        } else {
        }

        var clientName = clientData.fullname;

        console.log("finish");

        //Put condition if verified or not "/unverified"
        var outputPath = GenerateDocx(
          data,
          docxPath,
          docArray,
          req.query.doc,
          clientName
        );

        //query = outputPath[0]
        var string1 = encodeURIComponent(outputPath[0]);
        var string2 = encodeURIComponent(outputPath[1]);

        //download button on the form as a button
        //res.redirect('/api/posts/r/?valid=' + string1 + '&pass=' + string2)
        console.log("/api/posts/r/?valid=" + string1 + "&pass=" + string2);

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

        res.send({ link: link});
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

router.post("/Invoice/GetData", verify, async (req, res) => {
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

    // if (req.body.action == "update") {
    //   console.log(req.body.value._id);

    //   var dummyData = await Paid.updateOne(
    //     {
    //       _id: req.body.value._id,
    //       "invoice._id": req.body.value.invoiceid,
    //     },
    //     {
    //       $set: {
    //         "invoice.$.category": req.body.value.category,
    //         "invoice.$.total": req.body.value.total,
    //         "invoice.$.paid": req.body.value.paid,
    //       },
    //     },
    //     function (error, updatedData) {
    //       if (error) {
    //         // return res.status(400).send(error);
    //       }

    //       console.log(updatedData);
    //       //return res.status(200).send(updatedData);
    //     }
    //   );

    //   await createHistoryLog(
    //     req.email,
    //     "Update Invoice",
    //     "Update Invoice for client " + dummyData.fullname,
    //     req.id
    //   );

    //   console.log("Finsh Invoice update");
    //   res.send({});
    //   return;
    // }
    if (req.body.action == "remove") {
      //console.log(req.body);
      //var keyID = mongoose.Types.ObjectId(req.body.key);
      console.log("removed" + req.body["key"]);
      // Equivalent to `parent.children.pull(_id)`
      var key = req.body["key"];
      var keys = [];
      keys = key.split("_");

      const anything = await Paid.findById(keys[0], function (err, user) {
        if (err) {
          console.log(err);
        } else {
          console.log();
          // createHistoryLog(req.email,"Delete Payment", "Delete Payment for client " + isUndefinedOrNull(user.fullname) ? "" : user.fullname, req.id);
          user.invoice.id(keys[1]).remove();
          // Equivalent to `parent.child = null`
          //user.child.remove();
          user.save(function (err) {
            if (err) return handleError(err);

            console.log("the subdocs were removed");
          });
        }
      });

      await createHistoryLog(
        req.email,
        "Delete Invoice",
        "Delete Invoice from client " + anything.fullname,
        req.id
      );
      res.send({});
      return;
    }
    if (!isUndefinedOrNull(req.body.where) && req.body.where.length > 1) {
      // console.log(req.body.where);
      // res.send({});
      // return;
    }

    if (isEmptyOrSpaces(id) && action == "all") {
      query = await Paid.find(
        {},
        { English: 0, Español: 0, Français: 0, Arabic: 0, __v: 0 }
      );
    } else if (action == "sub") {
      var getById;
      //var getById = id;
      if (isUndefinedOrNull(id) || isEmptyOrSpaces(id)) {
        getById = req.body.where[0].value;
      } else {
        var getById = id;
      }
      console.log("body.id: " + getById);
      query = await Paid.findById(getById, function (err, user) {
        for (var j = 0; j < user["invoice"].length; j++) {
          //console.log(user["invoice"][j].href);
          try{
          let subParent = {
            //put parent id temor
            _id: getById,
            combineid: getById + "_" + user["invoice"][j]._id,
            paymentid: getById,
            fullname: user["invoice"][j].fullname,
            docid: user["invoice"][j].docid,
            href: user["invoice"][j].href,
            category: user["invoice"][j].category,
            total: user["invoice"][j].total,
            remain: user["invoice"][j].remain,
            paid: user["invoice"][j].paid,
            currency: user["invoice"][j].currency,
            Download: "DOWNLOAD",
            Edit: "EDIT",
            createTime: user["invoice"][j].createTime,
            updateTime: user["invoice"][j].updateTime
          };

          result.push(subParent);

          //console.log("subParent: " + JSON.stringify(subParent));
        } catch(err){}
        }
      });
      //console.log(result);
      res.send({ result: result, count: result.length });
      // res.send(result);
      return;
      console.log(query);
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

    console.log("result: " + result);
    //console.log("result: " + JSON.stringify(result));
    res.send(result);
  } catch (err) {
    console.log(err);
    res.send({});
  }
});

router.post("/Invoice/BatchData", verify, async (req, res) => {
  try {
    // console.log(req.body.value);
    var a = req.body.value;

    var result = "";

    var respnseAddID = "";
    if (req.body.action == "insert") {
      createHistoryLog(
        req.email,
        "Insert New invoice",
        "Insert New invoice for client " + a.fullname,
        req.id
      );
      var userPaid = {};
      userPaid.fullname = a.fullname;
      userPaid.first = isUndefinedOrNull(a.name) ? "" : a.name;
      userPaid.last = isUndefinedOrNull(a.surname) ? "" : a.surname;
      userPaid.middle = isUndefinedOrNull(a.father) ? "" : a.father;
      userPaid.phone = isUndefinedOrNull(a.mobile) ? "" : a.mobile;
      userPaid.address = isUndefinedOrNull(a.address) ? "" : a.address;
      var data = addPaidClient(
        a.fullname,
        userPaid.fullname + userPaid.phone,
        userPaid
      );
      //data[req.query.lang][modelCheck].push(clientpaid)
      const paid = new Paid(data);
      const savedPaid = await paid.save();
      result = {
        _id: savedPaid._id,
        fullname: savedPaid.fullname,
        name: savedPaid.name,
        surname: savedPaid.surname,
        father: savedPaid.father,
        mobile: savedPaid.mobile,
        address: savedPaid.address,
        combineid: savedPaid.combineid,
      };
      //console.log("New Client Paid: " + json.stringify(paid))
    }
    if (req.body.action == "update") {
      await createHistoryLog(
        req.email,
        "Update Payment",
        "Update Payment for client " + a.fullname,
        req.id
      );
      console.log(req.body);
      var anyThing = await Paid.findById(req.body["key"], function (err, user) {
        if (err) {
          console.log(err);
        } else {
          //you should to some checking if the supplied value is present (!= undefined) and if it differs from the currently stored one
          user.fullname = a.fullname;
          // var combineid = a.fullname;
          // combineid += isUndefinedOrNull(a.mobile) ? "" : a.mobile;
          user.combineid =
            a.fullname + isUndefinedOrNull(a.mobile) ? "" : a.mobile;
          user.name = isUndefinedOrNull(a.name) ? "" : a.name;
          user.surname = isUndefinedOrNull(a.surname) ? "" : a.surname;
          user.father = isUndefinedOrNull(a.father) ? "" : a.father;
          user.mobile = isUndefinedOrNull(a.mobile) ? "" : a.mobile;
          user.address = isUndefinedOrNull(a.address) ? "" : a.address;
          // console.log("New Client Paid: " + json.stringify(user))
          user.save(function (err) {
            if (err) {
              //handleError(err)
              console.log(err);
            } else {
              // res.send({})
              // return
            }
          });
        }
      });
      await createHistoryLog(
        req.email,
        "Update Payment",
        "Update Payment for client " + anyThing.fullname,
        req.id
      );
    }
    if (req.body.action == "remove") {
      console.log(req.body);
      var keyID = mongoose.Types.ObjectId(req.body.key);
      console.log("removed" + req.body["key"]);
      const anything = await Paid.findById(req.body["key"], function (
        err,
        user
      ) {
        console.log("delete pyament" + user);
        // createHistoryLog(req.email,"Delete Expense", "Delete Expense for client " + isUndefinedOrNull(user.fullname) ? "" : user.fullname, req.id);
        // createHistoryLog(req.email,"Delete Payment", "Delete Payment for client " + user.fullname, req.id);
      });
      await createHistoryLog(
        req.email,
        "Delete Payment",
        "Delete Payment for client " + anything.fullname,
        req.id
      );
      await Paid.findByIdAndDelete(req.body["key"], function (user, err) {
        // createHistoryLog(req.email,"Delete Payment", "Delete Payment for client " + user.fullname, req.id);
        if (err) console.log(err);
        console.log("Successful deletion");
      });
    }

    res.send(result);
  } catch (err) {
    console.log(err);
    res.send("error");
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
      if(field.includes("ProntoInvoiceinLBP"))
      {
        template = "Pronto Invoice in LBP";
      }
      else if(field.includes("ProntoInvoiceinUSD")){
        template = "Pronto Invoice in USD";
      }
      else if(field.includes("SwornTranslationInvoice")){
        template = "Sworn Translation Invoice";
      }
      else{
        res.send({ html: "" });
        return;
      }
      let path = "./json/" + "English" + "/" + template + ".json";
      let htmlpath = "./GenerateHtml/" + template + ".ejs";
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

        // docSaved = await Client.find(
        //   { _id: id },
        //   { _id: 0, fullname: 0, s0: 0, __v: 0 }
        // );

        // console.log('docSaved: ' + docSaved[0])

        if (!isEmptyOrSpaces(docID)) {
          if (modelCheck.includes("ProntoInvoiceinUSD")) {
            if (true) {
              docSaved = await PIUSA.find({ _id: docID });
            }
          }
              else if (modelCheck.includes("ProntoInvoiceinLBP")) {
              if (true) {
                docSaved = await PILBP.find({ _id: docID });
              }
            } else if (modelCheck.includes("SwornTranslationInvoice")) {
            if (true) {
              docSaved = await SWORNI.find({ _id: docID });
            }
          }
             else {
          }

          /// ////////////////////////////////////

          // console.log(docSaved[0].s3.job);
          var url = "";

          url =
          "/api/posts/datainvoice?lang=" +
          docSaved[0]["type"] +
          "&doc=" +
          docSaved[0]["caption"] +
          "&docID=" + docID +  "&id=" +
          id;

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
          // console.log(html)
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

router.post("/template", verify, async (req, res) => {
  try {
    if (
      !isEmptyOrSpaces(req.body.type) &&
      !isEmptyOrSpaces(req.body.template) &&
      !isEmptyOrSpaces(req.body.client)
    ) {
      let path = "./json/" + req.body.type + "/" + req.body.template + ".json";
      let htmlpath = "./GenerateHtml/" + req.body.template + ".ejs";
      let id = req.body.client;

      console.log(req.body);
      var langCheck = req.body.type;
      var modelCheck = req.body.template;
      var docID = req.body.docID != null ? req.body.docID : "";
      console.log("DOCUMENT ID :" + docID);
      // langCheck = langCheck.toLowerCase();
      modelCheck = modelCheck.replace(/\s/g, "");

      console.log(modelCheck);

      var docSaved = "";
      var schemaData = "";

      try {
        docSaved = await Client.find(
          { _id: id },
          { _id: 0, fullname: 0, s0: 0, __v: 0 }
        );

        // console.log('docSaved: ' + docSaved[0])

        var dataid = ""

        dataid = docID != "" ? docID : docSaved[0][langCheck][modelCheck];
        console.log(dataid);
        if (dataid !="" && dataid != null) {
          if (modelCheck.includes("Birth")) {
            docSaved = await Birth.find({ _id: docID });
          } else if (modelCheck.includes("Divorce")) {
            docSaved = await Divorce.find({ _id: docID });
          } else if (modelCheck.includes("Death")) {
            docSaved = await Death.find({ _id: docID });
          } else if (modelCheck.includes("Marriage")) {
            docSaved = await Marriage.find({ _id: docID });
          } else if (modelCheck.includes("Work")) {
            docSaved = await WPermit.find({ _id: docID });
          } else if (modelCheck.includes("ID")) {
            docSaved = await IDCard.find({ _id: docID });
          } else if (modelCheck.includes("MoF")) {
            docSaved = await MoF.find({ _id: docID });
          } else if (modelCheck.includes("Residence")) {
            docSaved = await Residence.find({ _id: docID });
          } else if (modelCheck.includes("PrivateDriver")) {
            docSaved = await Private.find({ _id: docID });
          } else if (modelCheck.includes("Police")) {
            docSaved = await Police.find({ _id: docID });
          } else if (modelCheck.includes("NSSF")) {
            docSaved = await NSSF.find({ _id: docID });
          } else if (modelCheck.includes("Individual")) {
            docSaved = await Individual.find({ _id: docID });
          } else if (modelCheck.includes("Family")) {
            docSaved = await Family.find({ _id: docID });
          } else if (modelCheck.includes("Consent")) {
            docSaved = await Consent.find({ _id: docID });
          } else if (modelCheck.includes("ResidencyPermit")) {
            docSaved = await RPermit.find({ _id: docID });
          } else if (modelCheck.includes("Driver")) {
            docSaved = await Driver.find({ _id: docID });
          } else if (modelCheck.includes("Empty")) {
            console.log("foundit");
            docSaved = await ETemplate.find({ _id: docID });
          } else {
          }

          /// ////////////////////////////////////
          docSaved[0]["client"]["id"] = id;

          url =
            "/api/posts/data?lang=" +
            docSaved[0]["type"] +
            "&doc=" +
            docSaved[0]["caption"] +
            "&id=" +
            docSaved[0]["client"]["id"] +
            "&docID=" +
            docID;

          // console.log('docSaved: ' + docSaved[0])
          const file = fs.readFileSync(htmlpath, "utf-8");
          var fixture_template = ejs.compile(file, { client: true });
          const html = fixture_template({ obj: docSaved[0], url: url });
          // console.log(html)
          res.send({ html: html });
          return;
        }
      } catch (err) {
        console.log(err);
      }

      console.log(htmlpath)
      if (fs.existsSync(path) && fs.existsSync(htmlpath)) {
        // if recode doesnot exits in data base file exists
        let rawdata = fs.readFileSync(path, "utf-8");
        let data = JSON.parse(rawdata);

        console.log(id);

        var data1 = "";
        try {
          data1 = await Client.find(
            { _id: id },
            { _id: 0, fullname: 0, __v: 0 }
          );
          data1 = data1[0];
          // console.log(data1)
        } catch (err) {
          console.log(err);
        }

        data["client"]["id"] = id;

        if (data.hasOwnProperty("s0")) {
          Object.keys(data.s0).forEach(function (key) {
            let keys = data.s0[key];

            if (!isEmptyOrSpaces(keys)) {
              keys = keys.split("_");
              // console.log(keys)
              // console.log(data1.s0[key])
              if (keys.length == 2) {
                if (data1.s0.hasOwnProperty(key)) {
                  console.log("key: " + key);
                  console.log("mongodata: " + data1.s0[key]);
                  console.log(keys[0] + " " + keys[1]);
                  data[keys[0]][keys[1]]["value"] = data1.s0[key];
                  console.log(data[keys[0]][keys[1]]["value"]);
                }
                // data1.s0[key] = req.body[key]
              } else if (keys.length == 3) {
                if (data1.s0.hasOwnProperty(key)) {
                  data[keys[0]][keys[1]][keys[2]]["value"] = data1.s0[key];
                  console.log(data[keys[0]][keys[1]][keys[2]]["value"]);
                }
              } else {
              }
            }
          });
        }

        /// /////////

        // Document Template form box
        //app.engine('html', require('ejs-locals'));
        url =
          "/api/posts/data?lang=" +
          data["type"] +
          "&doc=" +
          data["caption"] +
          "&id=" +
          data["client"]["id"];

        const file = fs.readFileSync(htmlpath, "utf-8");
        var fixture_template = ejs.compile(file, { client: true });
        const html = fixture_template({ obj: data, url: url });

        // Document Paid Form
        // Need to load paid template with data from stored on mango
        // Need to put paid client id on data json

        // const paidfile = fs.readFileSync(paidpath, 'utf-8')
        // var paid_template = ejs.compile(paidfile, { client: true })
        // const paid = paid_template({ obj: data })

        // console.log(html)
        //res.send({ html: html , paid: paid})
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

// make the access only from the server
router.get("/r", verify, async (req, res) => {
  console.log("download request: " + req.query.valid);
  var passedVariable = req.query.valid;
  //console.log(passedVariable)
  var passedpassVariable = req.query.pass + ".docx";
  console.log("passedpassVariable: " + passedpassVariable);
  //console.log(passedpassVariable)
  res.download(passedVariable, passedpassVariable, (err) => {
    if (err) {
      // handle error
      console.log(err);
    } else {
      // var file = fs.createReadStream(passedVariable);
      // file.on('end', function() {
      //   fs.unlink(passedVariable, function() {
      //     // file deleted
      //   });
      // });
      // file.pipe(res);
    }
  });
});

router.post("/deleteAfterDownload", verify, async function (req, res) {
  try {
    console.log(req.body);

    var language = req.body.language;
    var client = req.body.clientname;
    var docID = req.body.docID;
    var docModel = req.body.docModel;
    var docxPath = "./DocumentTemplate/" + language + "/" + docModel + ".docx";

    var docSaved = "";

    if (docModel.includes("Birth")) {
      docSaved = await Birth.find({ _id: docID });
    } else if (docModel.includes("Divorce")) {
      docSaved = await Divorce.find({ _id: docID });
    } else if (docModel.includes("Death")) {
      docSaved = await Death.find({ _id: docID });
    } else if (docModel.includes("Marriage")) {
      docSaved = await Marriage.find({ _id: docID });
    } else if (docModel.includes("Work")) {
      docSaved = await WPermit.find({ _id: docID });
    } else if (docModel.includes("ID")) {
      docSaved = await IDCard.find({ _id: docID });
    } else if (docModel.includes("MoF")) {
      docSaved = await MoF.find({ _id: docID });
    } else if (docModel.includes("Residence")) {
      docSaved = await Residence.find({ _id: docID });
    } else if (docModel.includes("PrivateDriver")) {
      docSaved = await Private.find({ _id: docID });
    } else if (docModel.includes("Police")) {
      docSaved = await Police.find({ _id: docID });
    } else if (docModel.includes("NSSF")) {
      docSaved = await NSSF.find({ _id: docID });
    } else if (docModel.includes("Individual")) {
      docSaved = await Individual.find({ _id: docID });
    } else if (docModel.includes("Family")) {
      docSaved = await Family.find({ _id: docID });
    } else if (docModel.includes("Consent")) {
      docSaved = await Consent.find({ _id: docID });
    } else if (docModel.includes("ResidencyPermit")) {
      docSaved = await RPermit.find({ _id: docID });
    } else if (docModel.includes("Driver")) {
      docSaved = await Driver.find({ _id: docID });
    } else if (docModel.includes("Empty")) {
      console.log("foundit");
      docSaved = await ETemplate.find({ _id: docID });
    } else if (docModel.includes("SwornTranslationInvoice")) {
      console.log("foundit");
      docxPath = "./DocumentTemplate/" + language + "/" + "Sworn Translation Invoice.docx";
      docSaved = await SWORNI.find({ _id: docID });
    }else if (docModel.includes("ProntoInvoiceinLBP")) {
      console.log("foundit");
      docxPath = "./DocumentTemplate/" + language + "/" + "Pronto Invoice in LBP.docx";
      docSaved = await PILBP.find({ _id: docID });
    }else if (docModel.includes("ProntoInvoiceinUSA")) {
      console.log("foundit");
      docxPath = "./DocumentTemplate/" + language + "/" + "Pronto Invoice in USD.docx";
      docSaved = await PIUSA.find({ _id: docID });
    }else {
    }

    const event = new Date();

    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false,
      timeZone: "Asia/Beirut",
    };

    var datetime = "";

    if (language != null && language == "Français") {
      datetime = event.toLocaleDateString("fr-GB", options);
    } else if (language != null && language == "Arabic") {
      datetime = event.toLocaleDateString("ar-EG", options);
    } else if (language != null && language == "English") {
      datetime = event.toLocaleDateString("en-US", {
        year: "numeric",
        day: "numeric",
        month: "long",
        hour12: false,
        timeZone: "Asia/Beirut",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      });
    } else if (language != null && language == "Español") {
      datetime = event.toLocaleDateString("es-GB", options);
    } else {
    }

    // var docArray = docSaved[0]["docArray"];
    // docArray["date"] = docSaved[0]["docArray"]["date"];
    // console.log(docSaved[0]["docArray"]["date"]);

    console.log("datet time before genreate docx" + datetime);

    //console.log(docSaved);
    // .replace(/\s/g, "");
    var outputPath = GenerateDocx(
      1,
      docxPath,
      docSaved[0]["docArray"],
      docModel,
      client,
      datetime
    );

    console.log(outputPath[0]);

    var downloadLinkGenerator = downloadLink(datetime, docModel, client);

    var part1 = encodeURIComponent(downloadLinkGenerator[0]);
    var part2 = encodeURIComponent(downloadLinkGenerator[1]);

    res.send({ href: "/api/posts/r/?valid=" + part1 + "&pass=" + part2 });
  } catch (err) {
    console.log(err);
    res.send("error");
  }
});

function deleteFile(file) {
  fs.unlink(file, function (err) {
    if (err) {
      console.error(err.toString());
    } else {
      console.warn(file + " deleted");
    }
  });
}

router.post("/Expense/GetData", verify, async (req, res) => {
  var query = await Expense.find({}).sort({ created_at: "descending" }).exec();

  // console.log(query);
  res.send(query);
});

router.post("/Expense/BatchData", verify, async (req, res) => {
  try {
    // console.log(req.body.value);
    var a = req.body.value;
    console.log(a);

    var data = "";

    var result = "";

    var respnseAddID = "";
    if (req.body.action == "insert") {
      createHistoryLog(
        req.email,
        "Insert Expense",
        "Insert Expense for client " + a.fullname,
        req.id
      );
      var receipt = {};

      var now = new Date();
      //this.updated_at = now;
      var now = new Date();

      console.log("insert pyament" + a);

      receipt.fullname = isUndefinedOrNull(a.fullname) ? "" : a.fullname;
      receipt.phone = isUndefinedOrNull(a.phone) ? "" : a.phone;
      receipt.category = isUndefinedOrNull(a.category) ? "" : a.category;
      receipt.type = isUndefinedOrNull(a.type) ? "" : a.type;
      receipt.paid = isUndefinedOrNull(a.paid) ? "" : a.paid;
      receipt.total = isUndefinedOrNull(a.total) ? "" : a.total;
      receipt.created_at = now;
      receipt.updated_at = now;
      receipt.note = isUndefinedOrNull(a.note) ? "" : a.note;
      receipt.address = isUndefinedOrNull(a.address) ? "" : a.address;
      receipt.paymentMode = isUndefinedOrNull(a.paymentMode)
        ? ""
        : a.paymentMode;

      const expense = new Expense(receipt);
      const savedPaid = await expense.save();

      result = receipt;

      // console.log("New Client Paid: " + json.stringify(paid))
    }
    if (req.body.action == "update") {
      console.log(a.paymentMode);
      await createHistoryLog(
        req.email,
        "Update Expense",
        "Update Expense for client " + a.fullname,
        req.id
      );

      await Expense.findById(req.body["key"], function (err, receiptRecored) {
        if (err) {
          console.log(err);
        } else {
          var now = new Date();
          //you should to some checking if the supplied value is present (!= undefined) and if it differs from the currently stored one
          receiptRecored.fullname = isUndefinedOrNull(a.fullname)
            ? ""
            : a.fullname;
          receiptRecored.phone = isUndefinedOrNull(a.phone) ? 0 : a.phone;
          receiptRecored.category = isUndefinedOrNull(a.category)
            ? ""
            : a.category;
          receiptRecored.type = isUndefinedOrNull(a.type)
            ? ""
            : a.type;
          receiptRecored.paid = isUndefinedOrNull(a.paid) ? 0 : a.paid;
          receiptRecored.total = isUndefinedOrNull(a.total) ? 0 : a.total;
          receiptRecored.paymentMode = isUndefinedOrNull(a.paymentMode)
            ? ""
            : a.paymentMode;
          receiptRecored.created_at = isUndefinedOrNull(a.created_at)
            ? ""
            : a.created_at;
          receiptRecored.updated_at = now;
          receiptRecored.note = isUndefinedOrNull(a.note) ? "" : a.note;
          receiptRecored.address = isUndefinedOrNull(a.address)
            ? ""
            : a.address;

          console.log(receiptRecored);

          //result = receiptRecored;

          // console.log("New Client Paid: " + json.stringify(receiptRecored))

          receiptRecored.save(function (err) {
            if (err) {
              //handleError(err)
              console.log(err);
            } else {
              // res.send({})
              // return
            }
          });
        }
      });
    }
    if (req.body.action == "remove") {
      console.log(req.body);
      var keyID = mongoose.Types.ObjectId(req.body.key);
      console.log("removed" + req.body["key"]);
      const anyThing = await Expense.findById(req.body["key"], function (
        err,
        user
      ) {
        console.log("delete pyament" + user);
        // createHistoryLog(req.email,"Delete Expense", "Delete Expense for client " + isUndefinedOrNull(user.fullname) ? "" : user.fullname, req.id);
      });

      await createHistoryLog(
        req.email,
        "Delete Expense",
        "Delete Expense for client " + anyThing.fullname,
        req.id
      );

      await Expense.findByIdAndDelete(req.body["key"], function (err, user) {
        console.log("delete pyament" + user);
        if (err) console.log(err);
        // createHistoryLog(req.email,"Delete Expense", "Delete Expense for client " + isUndefinedOrNull(user.fullname) ? "" : user.fullname, req.id);
        console.log("Successful deletion");
      });
    }

    res.send(result);
  } catch (err) {
    console.log(err);
    res.send("error");
  }
});

router.post("/Payment/GetData", verify, async (req, res) => {
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

    if (req.body.action == "update") {
      console.log(req.body.value._id);

      var dummyData = await Paid.updateOne(
        {
          _id: req.body.value._id,
          "payment._id": req.body.value.paymentid,
        },
        {
          $set: {
            "payment.$.category": req.body.value.category,
            "payment.$.total": req.body.value.total,
            "payment.$.paid": req.body.value.paid,
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

      await createHistoryLog(
        req.email,
        "Update Payment",
        "Update Payment for client " + dummyData.fullname,
        req.id
      );

      console.log("Finsh reipte update");
      res.send({});
      return;
    }
    if (req.body.action == "remove") {
      //console.log(req.body);
      //var keyID = mongoose.Types.ObjectId(req.body.key);
      console.log("removed" + req.body["key"]);
      // Equivalent to `parent.children.pull(_id)`
      var key = req.body["key"];
      var keys = [];
      keys = key.split("_");

      const anything = await Paid.findById(keys[0], function (err, user) {
        if (err) {
          console.log(err);
        } else {
          console.log();
          // createHistoryLog(req.email,"Delete Payment", "Delete Payment for client " + isUndefinedOrNull(user.fullname) ? "" : user.fullname, req.id);
          user.payment.id(keys[1]).remove();
          // Equivalent to `parent.child = null`
          //user.child.remove();
          user.save(function (err) {
            if (err) return handleError(err);

            console.log("the subdocs were removed");
          });
        }
      });

      await createHistoryLog(
        req.email,
        "Delete Payment",
        "Delete Payment from client " + anything.fullname,
        req.id
      );
      res.send({});
      return;
    }
    if (!isUndefinedOrNull(req.body.where) && req.body.where.length > 1) {
      // console.log(req.body.where);
      // res.send({});
      // return;
    }

    if (isEmptyOrSpaces(id) && action == "all") {
      query = await Paid.find(
        {},
        { English: 0, Español: 0, Français: 0, Arabic: 0, __v: 0 }
      );
    } else if (action == "sub") {
      var getById;
      //var getById = id;
      if (isUndefinedOrNull(id) || isEmptyOrSpaces(id)) {
        getById = req.body.where[0].value;
      } else {
        var getById = id;
      }
      console.log("body.id: " + getById);
      query = await Paid.findById(getById, function (err, user) {
        for (var j = 0; j < user["payment"].length; j++) {
          //console.log(user["payment"][j].href);
          try{
            let rawdata;
            if (user["payment"][j].language == "English") {
              rawdata = fs.readFileSync("./json/English/template.json", "utf-8");
            } else if (user["payment"][j].language == "Français") {
              rawdata = fs.readFileSync("./json/Français/template.json", "utf-8");
            } else if (user["payment"][j].language == "Español") {
              rawdata = fs.readFileSync("./json/Español/template.json", "utf-8");
            } else if (user["payment"][j].language == "Arabic") {
              rawdata = fs.readFileSync("./json/Arabic/template.json", "utf-8");
            } else {
              // add default row json ... or send message to client to fuck off
            }
            let docView = JSON.parse(rawdata);
            let docModelKey = user["payment"][j].docModel;
            let docModelViewText = "";

            if (docModelKey.includes("Birth")) {
                  docModelViewText =  docView["Birth Certificate"];
            } else if (docModelKey.includes("Divorce")) {
                  docModelViewText =  docView["Divorce Certificate"];
            } else if (docModelKey.includes("Death")) {
                  docModelViewText =  docView["Death Certificate"];
            } else if (docModelKey.includes("Marriage")) {
                  docModelViewText =  docView["Marriage Certificate"];
            } else if (docModelKey.includes("Work")) {       
                  docModelViewText =  docView["Work Permit"];
            } else if (docModelKey.includes("ID")) {
                  docModelViewText =  docView["ID Card"];
            } else if (docModelKey.includes("MoF")) {
                  docModelViewText =  docView["MoF Registration"];
            } else if (docModelKey.includes("Residence")) {
                  docModelViewText =  docView["Residence Certificate"];
            } else if (docModelKey.includes("PrivateDriver")) {
                  docModelViewText =  docView["Private Driver's license"];
            } else if (docModelKey.includes("Police")) {
                  docModelViewText =  docView["Police record"];
            } else if (docModelKey.includes("NSSF")) {
                  docModelViewText =  docView["NSSF Service Certificate"];
            } else if (docModelKey.includes("Individual")) {
                  docModelViewText =  docView["Individual Extract"];
            } else if (docModelKey.includes("Family")) {
                  docModelViewText =  docView["Family Extract"];
            } else if (docModelKey.includes("Consent")) {
                  docModelViewText =  docView["Consent to travel"];
            } else if (docModelKey.includes("ResidencyPermit")) {
                  docModelViewText =  docView["Residency Permit"];
            } else if (docModelKey.includes("Driver")) {
                  docModelViewText =  docView["Driver's license certificate"];
            } else if (docModelKey.includes("Empty")) {
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
            } else {}

            console.log(docModelKey);
            console.log(docView[docModelKey]);

          let subParent = {
            //put parent id temor
            _id: getById,
            combineid: getById + "_" + user["payment"][j]._id,
            paymentid: user["payment"][j]._id,
            fullname: user["payment"][j].fullname,
            docid: user["payment"][j].docid,
            href: user["payment"][j].href,
            category: user["payment"][j].category,
            language: user["payment"][j].language,
            docModel: user["payment"][j].docModel,
            docModelView: docModelViewText,
            total: user["payment"][j].total,
            remain: user["payment"][j].remain,
            paid: user["payment"][j].paid,
            Download: "download",
            createTime: user["payment"][j].createTime,
            updateTime: user["payment"][j].updateTime
          };

          result.push(subParent);

          //console.log("subParent: " + JSON.stringify(subParent));
        } catch(err){}
        }
      });
      res.send({ result: result, count: result.length });
      // res.send(result);
      return;
      console.log(query);
    } else {
      res.send({});
      return;
    }

    //Get all payment
    for (var i = 0; i < query.length; i++) {
      let totalpaidprice = 0;
      let totalremainprice = 0;
      let totalvalueprice = 0;
      let unit = 0;

      let parent = {
        _id: "",
        fullname: "",
        mobile: "",
        address: "",
        unit: "",
        paid: "",
        remain: "",
        total: "",
        subtasks: [],
      };

      parent._id = query[i]._id;
      parent.fullname = query[i].fullname;
      parent.mobile = query[i].mobile;
      parent.address = query[i].address;
      for (var j = 0; j < query[i]["payment"].length; j++) {
        try{
        let subParent = {
          _id: query[i]["payment"][j]._id,
          fullname: query[i]["payment"][j].fullname,
          docid: query[i]["payment"][j].docid,
          href: query[i]["payment"][j].href,
          category: query[i]["payment"][j].category,
          language: query[i]["payment"][j].language,
          docModel: query[i]["payment"][j].docModel,
          total: query[i]["payment"][j].total,
          remains: query[i]["payment"][j].remains,
          paid: query[i]["payment"][j].paid,
          createTime: query[i]["payment"][j].createTime,
          updateTime: query[i]["payment"][j].updateTime
        };

        unit = j + 1;
        totalpaidprice += query[i]["payment"][j].paid;
        totalremainprice += query[i]["payment"][j].remain;
        totalvalueprice += query[i]["payment"][j].total;
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

      console.log(
        "totalpaidprice: " +
          totalpaidprice +
          "totalremainprice: " +
          totalremainprice +
          "totalvalueprice: " +
          totalvalueprice
      );
      parent.unit = unit;
      parent.paid = totalpaidprice;
      parent.remain = totalremainprice;
      parent.total = totalvalueprice;

      if (action == "all") result.push(parent);

      //console.log("parent: " + parent);
      //console.log("subParent: " + JSON.stringify(parent));
    }

    console.log("result: " + result);
    //console.log("result: " + JSON.stringify(result));
    res.send(result);
  } catch (err) {
    console.log(err);
    res.send({});
  }
});

//i miss some thing
router.post("/Payment/BatchData", verify, async (req, res) => {
  try {
    // console.log(req.body.value);
    var a = req.body.value;

    var result = "";

    var respnseAddID = "";
    if (req.body.action == "insert") {
      createHistoryLog(
        req.email,
        "Insert New Payment",
        "Insert New Payment for client " + a.fullname,
        req.id
      );
      var userPaid = {};
      userPaid.fullname = a.fullname;
      userPaid.first = isUndefinedOrNull(a.name) ? "" : a.name;
      userPaid.last = isUndefinedOrNull(a.surname) ? "" : a.surname;
      userPaid.middle = isUndefinedOrNull(a.father) ? "" : a.father;
      userPaid.phone = isUndefinedOrNull(a.mobile) ? "" : a.mobile;
      userPaid.address = isUndefinedOrNull(a.address) ? "" : a.address;
      var data = addPaidClient(
        a.fullname,
        userPaid.fullname + userPaid.phone,
        userPaid
      );
      //data[req.query.lang][modelCheck].push(clientpaid)
      const paid = new Paid(data);
      const savedPaid = await paid.save();
      result = {
        _id: savedPaid._id,
        fullname: savedPaid.fullname,
        name: savedPaid.name,
        surname: savedPaid.surname,
        father: savedPaid.father,
        mobile: savedPaid.mobile,
        address: savedPaid.address,
        combineid: savedPaid.combineid,
      };
      //console.log("New Client Paid: " + json.stringify(paid))
    }
    if (req.body.action == "update") {
      await createHistoryLog(
        req.email,
        "Update Payment",
        "Update Payment for client " + a.fullname,
        req.id
      );
      console.log(req.body);
      var anyThing = await Paid.findById(req.body["key"], function (err, user) {
        if (err) {
          console.log(err);
        } else {
          //you should to some checking if the supplied value is present (!= undefined) and if it differs from the currently stored one
          user.fullname = a.fullname;
          // var combineid = a.fullname;
          // combineid += isUndefinedOrNull(a.mobile) ? "" : a.mobile;
          user.combineid =
            a.fullname + isUndefinedOrNull(a.mobile) ? "" : a.mobile;
          user.name = isUndefinedOrNull(a.name) ? "" : a.name;
          user.surname = isUndefinedOrNull(a.surname) ? "" : a.surname;
          user.father = isUndefinedOrNull(a.father) ? "" : a.father;
          user.mobile = isUndefinedOrNull(a.mobile) ? "" : a.mobile;
          user.address = isUndefinedOrNull(a.address) ? "" : a.address;
          // console.log("New Client Paid: " + json.stringify(user))
          user.save(function (err) {
            if (err) {
              //handleError(err)
              console.log(err);
            } else {
              // res.send({})
              // return
            }
          });
        }
      });
      await createHistoryLog(
        req.email,
        "Update Payment",
        "Update Payment for client " + anyThing.fullname,
        req.id
      );
    }
    if (req.body.action == "remove") {
      console.log(req.body);
      var keyID = mongoose.Types.ObjectId(req.body.key);
      console.log("removed" + req.body["key"]);
      const anything = await Paid.findById(req.body["key"], function (
        err,
        user
      ) {
        console.log("delete pyament" + user);
        // createHistoryLog(req.email,"Delete Expense", "Delete Expense for client " + isUndefinedOrNull(user.fullname) ? "" : user.fullname, req.id);
        // createHistoryLog(req.email,"Delete Payment", "Delete Payment for client " + user.fullname, req.id);
      });
      await createHistoryLog(
        req.email,
        "Delete Payment",
        "Delete Payment for client " + anything.fullname,
        req.id
      );
      await Paid.findByIdAndDelete(req.body["key"], function (user, err) {
        // createHistoryLog(req.email,"Delete Payment", "Delete Payment for client " + user.fullname, req.id);
        if (err) console.log(err);
        console.log("Successful deletion");
      });
    }

    res.send(result);
  } catch (err) {
    console.log(err);
    res.send("error");
  }
});

router.post("/Paid/GetData", verify, async (req, res) => {
  //console.log(req.body);

  //var result = [];

  var query = await Paid.find(
    {},
    { English: 0, Español: 0, Français: 0, Arabic: 0, __v: 0 }
  );

  // for (var i = 0; i < query.length; i++) {
  //   for(var j = 0; j < query[i]["payment"].length; j++)
  //   {
  //     console.log(query[i].payment[j])
  //   }
  // }

  console.log(query);
  res.send(query);
});

router.post("/Paid/BatchData", verify, async (req, res) => {
  try {
    // console.log(req.body.value);
    var a = req.body.value;

    var data = "";

    var result = "";

    var respnseAddID = "";
    if (req.body.action == "insert") {
      var userPaid = {};

      createHistoryLog(
        req.email,
        "Insert Paid Client",
        "Insert Paid Client with name " + a.fullname,
        req.id
      );

      userPaid.fullname = a.fullname;
      userPaid.first = isUndefinedOrNull(a.name) ? "" : a.name;
      userPaid.last = isUndefinedOrNull(a.surname) ? "" : a.surname;
      userPaid.middle = isUndefinedOrNull(a.father) ? "" : a.father;
      userPaid.phone = isUndefinedOrNull(a.mobile) ? "" : a.mobile;
      userPaid.address = isUndefinedOrNull(a.address) ? "" : a.address;

      var data = addPaidClient(
        a.fullname,
        userPaid.fullname + userPaid.phone,
        userPaid
      );
      //data[req.query.lang][modelCheck].push(clientpaid)

      const paid = new Paid(data);
      const savedPaid = await paid.save();

      result = {
        _id: savedPaid._id,
        fullname: savedPaid.fullname,
        name: savedPaid.name,
        surname: savedPaid.surname,
        father: savedPaid.father,
        mobile: savedPaid.mobile,
        address: savedPaid.address,
        combineid: savedPaid.combineid,
      };

      // console.log("New Client Paid: " + json.stringify(paid))
    }
    if (req.body.action == "update") {
      console.log(req.body);

      await Paid.findById(req.body["key"], function (err, user) {
        if (err) {
          console.log(err);
        } else {
          createHistoryLog(
            req.email,
            "Update Paid Client",
            "Updated Paid Client with name " + user.fullname,
            req.id
          );
          //you should to some checking if the supplied value is present (!= undefined) and if it differs from the currently stored one
          user.fullname = a.fullname;
          // var combineid = a.fullname;
          // combineid += isUndefinedOrNull(a.mobile) ? "" : a.mobile;
          user.combineid =
            a.fullname + isUndefinedOrNull(a.mobile) ? "" : a.mobile;
          user.name = isUndefinedOrNull(a.name) ? "" : a.name;
          user.surname = isUndefinedOrNull(a.surname) ? "" : a.surname;
          user.father = isUndefinedOrNull(a.father) ? "" : a.father;
          user.mobile = isUndefinedOrNull(a.mobile) ? "" : a.mobile;
          user.address = isUndefinedOrNull(a.address) ? "" : a.address;

          // console.log("New Client Paid: " + json.stringify(user))

          user.save(function (err) {
            if (err) {
              //handleError(err)
              console.log(err);
            } else {
              // res.send({})
              // return
            }
          });
        }
      });
    }
    if (req.body.action == "remove") {
      console.log(req.body);
      var keyID = mongoose.Types.ObjectId(req.body.key);
      console.log("removed" + req.body["key"]);
      const anything = await Paid.findById(req.body["key"], function (
        err,
        user
      ) {
        console.log("delete pyament" + user);
        // createHistoryLog(req.email,"Delete Paid Client", "Delete Paid Client with name " + isUndefinedOrNull(user.fullname) ? "" : user.fullname, req.id);
      });

      await createHistoryLog(
        req.email,
        "Delete Paid Client",
        "Delete Paid Client with name " + anything.fullname,
        req.id
      );

      await Paid.findByIdAndDelete(req.body["key"], function (err, user) {
        if (err) console.log(err);
        // createHistoryLog(req.email,"Delete Paid Client", "Delete Paid Client with name " + isUndefinedOrNull(user.fullname) ? "" : user.fullname, req.id);
        console.log("Successful deletion");
      });
    }

    res.send(result);
  } catch (err) {
    console.log(err);
    res.send("error");
  }
});

// get all todos
router.post("/GetData", verify, async (req, res) => {
  console.log(req.body);

  var result = [];

  var query = await Client.find(
    {},
    { English: 0, Español: 0, Français: 0, Arabic: 0, __v: 0 }
  );

  //Format the json
  for (var i = 0; i < query.length; i++) {
    let temp = {
      _id: query[i]._id,
      fullname: query[i].fullname,
      name: query[i].s0.name,
      surname: query[i].s0.surname,
      father: query[i].s0.father,
      mother: query[i].s0.mother,
      sex: query[i].s0.sex,
      placeofbirthlocal: query[i].s0.placeofbirthlocal,
      dateofbirth: query[i].s0.dateofbirth,
      noregistry: query[i].s0.noregistry,
    };
    result.push(temp);
  }

  // console.log(result);
  res.send(result);
});

router.post("/BatchData", verify, async (req, res) => {
  try {
    // console.log(req.body.value);
    var a = req.body.value;
    console.log(a);

    var data = "";

    var respnseAddID = "";
    if (req.body.action == "insert") {
      if (!isEmptyOrSpaces(a.fullname)) {
        data = {
          fullname: a.fullname,
          s0: {
            name: isUndefinedOrNull(a.name) ? "" : a.name,
            surname: isUndefinedOrNull(a.surname) ? "" : a.surname,
            father: isUndefinedOrNull(a.father) ? "" : a.father,
            mother: isUndefinedOrNull(a.mother) ? "" : a.mother,
            mothersurname: "",
            nationaltiy: "",
            sex: isUndefinedOrNull(a.sex) ? "" : a.sex,
            familystatus: "",
            governorate: "",
            district: "",
            city: "",
            quarter: "",
            street: "",
            building: "",
            floor: "",
            mobile: "",
            work: "",
            fax: "",
            email: "",
            profession: "",
            address: "",
            telephone: "",
            religion: "",
            placeofbirthlocal: isUndefinedOrNull(a.placeofbirthlocal)
              ? ""
              : a.placeofbirthlocal,
            placeofbirthdistrict: "",
            dateofbirth: isUndefinedOrNull(a.dateofbirth) ? "" : a.dateofbirth,
            placeregistry: "",
            noregistry: isUndefinedOrNull(a.noregistry) ? "" : a.noregistry,
          },
          Arabic: {
            EmptyTemplate: "",
          },
          English: {
            BirthCertificate: "",
            Consenttotravel: "",
            DeathCertificate: "",
            DivorceCertificate: "",
            Driverslicensecertificate: "",
            PrivateDriverslicense: "",
            FamilyExtract: "",
            IDCard: "",
            IndividualExtract: "",
            MarriageCertificate: "",
            MoFRegistration: "",
            NSSFServiceCertificate: "",
            Policerecord: "",
            ResidenceCertificate: "",
            ResidencyPermit: "",
            WorkPermit: "",
            EmptyTemplate: "",
          },
          Español: {
            BirthCertificate: "",
            Consenttotravel: "",
            DeathCertificate: "",
            DivorceCertificate: "",
            Driverslicensecertificate: "",
            PrivateDriverslicense: "",
            FamilyExtract: "",
            IDCard: "",
            IndividualExtract: "",
            MarriageCertificate: "",
            MoFRegistration: "",
            NSSFServiceCertificate: "",
            Policerecord: "",
            ResidenceCertificate: "",
            ResidencyPermit: "",
            WorkPermit: "",
            EmptyTemplate: "",
          },
          Français: {
            BirthCertificate: "",
            Consenttotravel: "",
            DeathCertificate: "",
            DivorceCertificate: "",
            Driverslicensecertificate: "",
            PrivateDriverslicense: "",
            FamilyExtract: "",
            IDCard: "",
            IndividualExtract: "",
            MarriageCertificate: "",
            MoFRegistration: "",
            NSSFServiceCertificate: "",
            Policerecord: "",
            ResidenceCertificate: "",
            ResidencyPermit: "",
            WorkPermit: "",
            EmptyTemplate: "",
          },
          History: {
            Arabic: {
              EmptyTemplate: [],
            },
            English: {
              BirthCertificate: [],
              Consenttotravel: [],
              DeathCertificate: [],
              DivorceCertificate: [],
              Driverslicensecertificate: [],
              PrivateDriverslicense: [],
              FamilyExtract: [],
              IDCard: [],
              IndividualExtract: [],
              MarriageCertificate: [],
              MoFRegistration: [],
              NSSFServiceCertificate: [],
              Policerecord: [],
              ResidenceCertificate: [],
              ResidencyPermit: [],
              WorkPermit: [],
              EmptyTemplate: [],
            },
            Español: {
              BirthCertificate: [],
              Consenttotravel: [],
              DeathCertificate: [],
              DivorceCertificate: [],
              Driverslicensecertificate: [],
              PrivateDriverslicense: [],
              FamilyExtract: [],
              IDCard: [],
              IndividualExtract: [],
              MarriageCertificate: [],
              MoFRegistration: [],
              NSSFServiceCertificate: [],
              Policerecord: [],
              ResidenceCertificate: [],
              ResidencyPermit: [],
              WorkPermit: [],
              EmptyTemplate: [],
            },
            Français: {
              BirthCertificate: [],
              Consenttotravel: [],
              DeathCertificate: [],
              DivorceCertificate: [],
              Driverslicensecertificate: [],
              PrivateDriverslicense: [],
              FamilyExtract: [],
              IDCard: [],
              IndividualExtract: [],
              MarriageCertificate: [],
              MoFRegistration: [],
              NSSFServiceCertificate: [],
              Policerecord: [],
              ResidenceCertificate: [],
              ResidencyPermit: [],
              WorkPermit: [],
              EmptyTemplate: [],
            },
          },
        };

        // let promise = new Promise((resolve, reject) => {
        //   setTimeout(() => resolve("done!"), 1000)
        // });

        const client = new Client(data);
        const savedClient = await client.save();

        console.log("save new client :" + savedClient);

        // wait 3 seconds
        //await new Promise((resolve, reject) => setTimeout(resolve, 500));
        createHistoryLog(
          req.email,
          "Create New Client",
          "Created a new Client with name " + a.fullname,
          req.id
        );

        console.log(savedClient["_id"] + "asdfsadfds");
        respnseAddID = savedClient["_id"];
      }

      //return savedClient['_id']
    }
    if (req.body.action == "update") {
      console.log(req.body);

      await createHistoryLog(
        req.email,
        "Update Client",
        "Updated Client with name " + a.fullname,
        req.id
      );

      var anyThing = await Client.findById(req.body["key"], function (
        err,
        user
      ) {
        if (err) {
          console.log(err);
        } else {
          //you should to some checking if the supplied value is present (!= undefined) and if it differs from the currently stored one
          user.fullname = a.fullname;
          user.s0.name = isUndefinedOrNull(a.name) ? "" : a.name;
          user.s0.surname = isUndefinedOrNull(a.surname) ? "" : a.surname;
          user.s0.father = isUndefinedOrNull(a.father) ? "" : a.father;
          user.s0.mother = isUndefinedOrNull(a.mother) ? "" : a.mother;
          user.s0.sex = isUndefinedOrNull(a.sex) ? "" : a.sex;
          user.s0.placeofbirthlocal = isUndefinedOrNull(a.placeofbirthlocal)
            ? ""
            : a.placeofbirthlocal;
          user.s0.dateofbirth = isUndefinedOrNull(a.dateofbirth)
            ? ""
            : a.dateofbirth;
          user.s0.noregistry = isUndefinedOrNull(a.noregistry)
            ? ""
            : a.noregistry;

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
      const anyThing = await Client.findById(req.body["key"], function (
        err,
        user
      ) {
        // console.log("delete pyament" + user);
        // userFullname = isUndefinedOrNull(user.s0.fullname) ? "" : user.s0.fullname;
        // const start = createHistoryLog(req.email,"Delete Client", "Delete Client with name " + isUndefinedOrNull(user.s0.fullname) ? "" : user.s0.fullname, req.id);
      });

      console.log("delete pyament" + anyThing.fullname);
      await createHistoryLog(
        req.email,
        "Delete Client",
        "Delete Client with name " + anyThing.fullname,
        req.id
      );

      await Client.findByIdAndDelete(req.body["key"], function (err, user) {
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
      fullname: data.fullname,
      name: data.s0.name,
      surname: data.s0.surname,
      father: data.s0.father,
      mother: data.s0.mother,
      sex: data.s0.sex,
      placeofbirthlocal: data.s0.placeofbirthlocal,
      dateofbirth: data.s0.dateofbirth,
      noregistry: data.s0.noregistry,
    };

    //console.log("Add client : " + JSON.stringify(result))
    res.send(result);
  } catch (err) {
    console.log(err);
    res.send("error");
  }
});

router.post("/paid", verify, async (req, res) => {
  try {
    if (
      !isEmptyOrSpaces(req.query.lang) &&
      !isEmptyOrSpaces(req.query.doc) &&
      !isEmptyOrSpaces(req.query.id) &&
      !isEmptyOrSpaces(req.query.docid)
    ) {
      // console.log(req.query.href);

      //const encoded = encodeURIComponent(req.body.href);
      const encoded = req.body.href;
      console.log("encode url: " + encoded);

      console.log(req.body);

      var modelCheck = req.query.doc;
      modelCheck = modelCheck.replace(/\s/g, "");

      var docidQuery = req.query.docid;

      //create object form model
      var clientPaymentHistory;
      //var objPayment = {}

      //Get Client doc infromation
      var clientData = await Client.findById(req.query.id, function (err, user) {
        if (err) {
          console.log(err);
        } else {
          //you should to some checking if the supplied value is present (!= undefined) and if it differs from the currently stored one
          const event = new Date();

          var datetime = event.toLocaleDateString("en-US", {
            year: "numeric",
            day: "numeric",
            month: "long",
          });

          clientPaymentHistory = {
            fullname: user.fullname,
            surname: user.s0.surname,
            father: user.s0.father,
            mobile: user.s0.mobile,
            address: user.s0.address,
            clientID: req.query.id,
            docid: req.query.docid,
            href: encoded,
            language: req.query.lang,
            docModel: modelCheck,
            docid: req.query.docid,
            paid: req.body.paid,
            total: req.body.total,
            category: req.body.category,
            createUser: "",
            updateUser: "",
            createTime: datetime,
            updateTime: datetime,
            numberOfUpdate: 0,
            remain: req.body.remain,
            registration : req.body.registration,
            vat: req.body.vat,
            mof: req.body.mof
          };
        }
      });

      //console.log("href: " + decodeURI(clientPaymentHistory.href));
      //need to make unique id combination different from _id to make update more easer

      var clientpaid = {
        clientID: req.query.id,
        first: "",
        middle: "",
        last: "",
        address: "",
        mobile: "",
        category: "",
        paid: "",
        remain: "",
        docid: req.query.docid,
        href: req.query.href,
      };

      // this only in use if the paid client is new
      clientpaid["first"] = req.body.first;
      clientpaid["middle"] = req.body.middle;
      clientpaid["last"] = req.body.last;
      clientpaid["address"] = req.body.address;
      clientpaid["mobile"] = req.body.mobile;
      clientpaid["category"] = req.body.category;
      clientpaid["paid"] = req.body.paid;
      clientpaid["remain"] = req.body.remain;
      clientpaid["docid"] = req.query.docid;
      clientpaid["href"] = req.body.href;
      clientpaid["registration"] = req.body.registration;
      clientpaid["vat"] = req.body.vat;
      clientpaid["mof"] = req.body.mof;
      

      // console.log("clientpaid" + clientpaid['first'])

      var paidClientSelectedID = req.body["client"];

      //console.log("paidClientSelectedID" + paidClientSelectedID)

      //maybe need try catch
      // Object.keys(req.body).forEach(function(key) {
      //  clientpaid[key] = req.body[key]
      // })

      var fullname =
        clientpaid["first"] + " " + clientpaid["middle"] + " "  + clientpaid["last"];

      if (
        !isEmptyOrSpaces(paidClientSelectedID) &&
        paidClientSelectedID == "op1"
      ) {
        // var data = addPaidClient(
        //   fullname,
        //   fullname + clientpaid["phone"],
        //   clientpaid
        // );

        //data[req.query.lang][modelCheck].push(clientpaid);

        //const paid = new Paid(data);
        let paid = new Paid();

        console.log(clientPaymentHistory);

        paid.payment.push(clientPaymentHistory);

        paid.mobile = clientpaid.mobile;
        paid.address = clientpaid.address;
        paid.combineid = fullname + clientpaid["mobile"];
        paid.fullname = fullname;
        paid.name = clientpaid.first;
        paid.surname = clientpaid.last;
        paid.father = clientpaid.middle;
        paid.registration = clientpaid.registration;
        paid.vat = clientpaid.vat;
        paid.mof = clientpaid.mof;
        

        //var subdoc = paid.payment.push[0];
        // { _id: '501d86090d371bab2c0341c5', name: 'Liesl' }
        //subdoc.isNew; // true
        var flagPaidSuccess = false;

        var savedPaid = await paid.save(function (err) {
          if (err) return handleError(err);
          console.log("Success!");
          console.log("paid finished");
          // console.log(clientData["History"][clientPaymentHistory.language][clientPaymentHistory.docModel])
          // flagPaidSuccess = true;
        });

        console.log("Create new payemnet")
        console.log(clientpaid)

        await createHistoryLog(
          req.email,
          "Create Payment",
          "New Payment for client " +
          clientPaymentHistory.fullname +
            ", Receipt Create by Name " +
            clientpaid["first"] +
            " " +
            clientpaid["middle"] +
            " " +
            clientpaid["last"] ,
          req.id
        );

        if(flagPaidSuccess)
        {
          // console.log("paid finished");
          // console.log(clientData[0]["History"][clientPaymentHistory.language][clientPaymentHistory.docModel])
          // clientData[0]["History"][clientPaymentHistory.language][clientPaymentHistory.docModel]; //.shift();
          // await clientData.save();

          //var savedClient = await clientData.save();
          //console.log(savedClient);
        }

        console.log(paid);

        //const savedPaid = await paid.save();
        //console.log("New Client Paid: " + data[req.query.lang][modelCheck]);
      } else {
        //var query = req.query.lang + '.' + modelCheck

        // var language = req.query.lang;
        // var query = {};
        // var criteria = language + "." + modelCheck;
        // query[criteria] = clientpaid;

        // console.log("query: " + query[criteria]);

        //{_id: id, "language.modelCheck.docid": {$nin: [clientpaid.docid] }},
        var flagPaidSuccess = false;

      //   PersonModel.update(
      //     { _id: person._id }, 
      //     { $push: { friends: friend } },
      //     done
      // );

          Paid.updateOne(
          { _id: paidClientSelectedID },
          { $push: { payment: clientPaymentHistory } },
          { upsert: true, new: true },
          function (err, docs) {
            //res.json(docs);
            // console.log(docs);

            console.log("Success!");
            console.log("paid finished");

            flagPaidSuccess = true;
            
          }

        );

        console.log(            req.body.name +
          " " +
          req.body.father +
          " " +
          req.body.surname);



        await createHistoryLog(
          req.email,
          "Create Payment",
          "Add new Payment for client " +
            clientPaymentHistory.fullname +
            ",Receipt Create by Name " +
            req.body.name +
            " " +
            req.body.father +
            " " +
            req.body.surname,
          req.id
        );
      }

      res.send("success");
    }
  } catch (err) {
    console.log(err);
    res.send("error");
  }
});

function removeA(arr) {
  var what, a = arguments, L = a.length, ax;
  while (L > 1 && arr.length) {
      what = a[--L];
      while ((ax= arr.indexOf(what)) !== -1) {
          arr.splice(ax, 1);
      }
  }
  return arr;
}

router.post("/data", verify, async (req, res) => {
  try {
    // req.query.lang req.query.lang doc
    // get request parms
    // make the path string
    // check file if exits
    // If else for every schema to save
    // add path to parmaters on GenerateBCDocx function
    console.log(req.query.doc);
    if (
      !isEmptyOrSpaces(req.query.lang) &&
      !isEmptyOrSpaces(req.query.doc) &&
      !isEmptyOrSpaces(req.query.id)
    ) {
      let path = "./json/" + req.query.lang + "/" + req.query.doc + ".json";
      let docxPath =
        "./DocumentTemplate/" + req.query.lang + "/" + req.query.doc + ".docx";
      //console.log(path)
      if (fs.existsSync(path) && fs.existsSync(docxPath)) {
        console.log("Begain");
        let rawdata = fs.readFileSync(path, "utf-8");
        let data = JSON.parse(rawdata);
        let docArray = { clients: [], users: [] }; // sar fe mwskleh bel array fams:[]
        let jsonObj = [];

        //Search all filed had been submit when get to the paid form break from this loop and then make another keys's
        //For paid client form to enter or check if there is already one there

        Object.keys(req.body).forEach(function (key) {
          let keys = key.split("_");
          console.log(keys);
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

        if (data.hasOwnProperty("s2")) {
          if (data.s2.hasOwnProperty("clients")) {
            for (var i = 0; i < data.s2.clients.length; i++) {
              if (!isEmptyOrSpaces(req.body["s2_clients_num_" + i])) {
                data.s2.clients[i].num = req.body["s2_clients_num_" + i];
                data.s2.clients[i].establishment =
                  req.body["s2_clients_establishment_" + i];
                data.s2.clients[i].emp = req.body["s2_clients_emp_" + i];
                data.s2.clients[i].ter = req.body["s2_clients_ter_" + i];
                data.s2.clients[i].note = req.body["s2_clients_note_" + i];
                docArray.clients.push({
                  num: req.body["s2_clients_num_" + i],
                  establishment: req.body["s2_clients_establishment_" + i],
                  emp: req.body["s2_clients_emp_" + i],
                  ter: req.body["s2_clients_ter_" + i],
                  note: req.body["s2_clients_note_" + i],
                });
              }
            }
          } else if (data.s2.hasOwnProperty("fams")) {
            for (var i = 0; i < data.s2.fams.length; i++) {
              if (!isEmptyOrSpaces(req.body["s2_fams_nsname_" + i])) {
                data.s2.fams[i].nsname = req.body["s2_fams_nsname_" + i];
                data.s2.fams[i].faname = req.body["s2_fams_faname_" + i];
                data.s2.fams[i].moname = req.body["s2_fams_moname_" + i];
                data.s2.fams[i].pdbirth = req.body["s2_fams_pdbirth_" + i];
                data.s2.fams[i].sect = req.body["s2_fams_sect_" + i];
                data.s2.fams[i].stat = req.body["s2_fams_stat_" + i];
                data.s2.fams[i].s = req.body["s2_fams_s_" + i];
                data.s2.fams[i].remark = req.body["s2_fams_remark_" + i];
                docArray.users.push({
                  nsname: req.body["s2_fams_nsname_" + i],
                  faname: req.body["s2_fams_faname_" + i],
                  moname: req.body["s2_fams_moname_" + i],
                  pdbirth: req.body["s2_fams_pdbirth_" + i],
                  sect: req.body["s2_fams_sect_" + i],
                  stat: req.body["s2_fams_stat_" + i],
                  s: req.body["s2_fams_s_" + i],
                  remark: req.body["s2_fams_remark_" + i],
                });
              }
            }
          } else {
          }
        }

        // console.log(docArray)

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
        console.log();

        docArray["o1"] = "0";

        if (req.query.lang != null && req.query.lang == "Français") {
          if (originalFlag) docArray["o1"] = "Copie conforme à l’original";
          datetime = event.toLocaleDateString("fr-GB", options);
        } else if (req.query.lang != null && req.query.lang == "Arabic") {
          datetime = event.toLocaleDateString("ar-EG", options);
        } else if (req.query.lang != null && req.query.lang == "English") {
          if (originalFlag) docArray["o1"] = "True Copy of the Original";
          datetime = event.toLocaleDateString("en-US", {
            year: "numeric",
            day: "numeric",
            month: "long",
          });
        } else if (req.query.lang != null && req.query.lang == "Español") {
          if (originalFlag) docArray["o1"] = "Copia verdadera del original";
          datetime = event.toLocaleDateString("es-GB", options);
        } else {
        }

        data["date"] = datetime;
        docArray["date"] = datetime;

        //track if original or not
        data["original"] = docArray["o1"];

        //return to defualt state ""
        if (docArray["o1"] == "0") docArray["o1"] = "";

        // console.log(docArray['o1'])
        //console.log(data["o1"]);

        // data['date'] = dateFormat(new Date(), "mmm d yyyy");
        // docArray['date'] = dateFormat(new Date(), "mmm d yyyy");

        console.log("before save");

        var modelCheck = req.query.doc;
        var langCheck = req.query.lang;
        var id = req.query.id;
        var docID = req.query.docID != null ? req.query.docID : "";
        modelCheck = modelCheck.replace(/\s/g, "");

        let clientData = await Client.findOne({ _id: id });
        data["client"]["id"] = id;

        if (data.hasOwnProperty("s0")) {
          Object.keys(data.s0).forEach(function (key) {
            let keys = data.s0[key];

            if (!isEmptyOrSpaces(keys)) {
              keys = keys.split("_");
              // console.log(keys)
              // console.log(data1.s0[key])
              if (keys.length == 2) {
                if (clientData.s0.hasOwnProperty(key)) {
                  // console.log('key: ' + key)
                  // console.log('mongodata: ' + clientData.s0[key])
                  // console.log(keys[0] + ' ' + keys[1])
                  clientData.s0[key] = data[keys[0]][keys[1]]["value"];
                  // console.log(data[keys[0]][keys[1]]['value'])
                }
                // data1.s0[key] = req.body[key]
              } else if (keys.length == 3) {
                if (clientData.s0.hasOwnProperty(key)) {
                  clientData.s0[key] = data[keys[0]][keys[1]][keys[2]]["value"];
                  // console.log(data[keys[0]][keys[1]][keys[2]]['value'])
                }
              } else {
              }
            }
          });
        }

        // console.log(clientData);
        var downloadLinkGenerator = downloadLink(
          datetime,
          req.query.doc,
          clientData["fullname"]
        );

        var part1 = encodeURIComponent(downloadLinkGenerator[0]);
        var part2 = encodeURIComponent(downloadLinkGenerator[1]);

        data["download"] = "/api/posts/r/?valid=" + part1 + "&pass=" + part2;
        console.log(data["download"]);

        data["docArray"] = docArray;

        var docid = "";
        var ObjectId = require("mongoose").Types.ObjectId;
        var email = req.email;

        if (modelCheck.includes("Birth")) {
          if (ObjectId.isValid(docID)) {
            data["user_edit"] = email;
            console.log("Update doc by ID " + docID);
            const birth = await Birth.findOneAndUpdate(
              { _id: docID },
              data,
              { upsert: true, new: true },
              function (err, doc) {
                if (err) console.log(err);
                // console.log(doc.docArray)
                console.log("Succesfully saved.");
              }
            );
          } else {
            data["user_created"] = email;
            const birth = new Birth(data);
            const savedBirth = await birth.save();
            docid = savedBirth._id;

            console.log("saved birth: " + savedBirth._id);

            clientData[langCheck][modelCheck] = savedBirth._id;
            clientData["History"][langCheck][modelCheck].push(docid);
            console.log(clientData["History"][langCheck][modelCheck]);
            await clientData.save();
          }
        } else if (modelCheck.includes("Divorce")) {
          if (ObjectId.isValid(docID)) {
            data["user_edit"] = email;
            console.log("Update doc by ID " + docID);
            const birth = await Divorce.findOneAndUpdate(
              { _id: docID },
              data,
              { upsert: true },
              function (err, doc) {
                if (err) console.log(err);
                console.log("Succesfully saved.");
              }
            );
          } else {
            data["user_created"] = email;
            const divorce = new Divorce(data);
            const savedDivorce = await divorce.save();
            docid = savedDivorce._id;

            console.log(savedDivorce._id);

            clientData[langCheck][modelCheck] = savedDivorce._id;
            clientData["History"][langCheck][modelCheck].push(docid);
            await clientData.save();
          }
        } else if (modelCheck.includes("Death")) {
          if (ObjectId.isValid(docID)) {
            data["user_edit"] = email;
            console.log("Update doc by ID " + docID);
            const birth = await Death.findOneAndUpdate(
              { _id: docID },
              data,
              { upsert: true },
              function (err, doc) {
                if (err) console.log(err);
                console.log("Succesfully saved.");
              }
            );
          } else {
            data["user_created"] = email;
            const death = new Death(data);
            const savedDeath = await death.save();
            docid = savedDeath._id;

            console.log(savedDeath._id);

            clientData[langCheck][modelCheck] = savedDeath._id;
            clientData["History"][langCheck][modelCheck].push(docid);
            await clientData.save();
          }
        } else if (modelCheck.includes("Marriage")) {
          if (ObjectId.isValid(docID)) {
            data["user_edit"] = email;
            console.log("Update doc by ID " + docID);
            const birth = await Marriage.findOneAndUpdate(
              { _id: docID },
              data,
              { upsert: true },
              function (err, doc) {
                if (err) console.log(err);
                console.log("Succesfully saved.");
              }
            );
          } else {
            data["user_created"] = email;
            const marriage = new Marriage(data);
            const savedMarriage = await marriage.save();
            docid = savedMarriage._id;

            console.log(savedMarriage._id);

            clientData[langCheck][modelCheck] = savedMarriage._id;
            clientData["History"][langCheck][modelCheck].push(docid);
            await clientData.save();
          }
        } else if (modelCheck.includes("Work")) {
          if (ObjectId.isValid(docID)) {
            data["user_edit"] = email;
            console.log("Update doc by ID " + docID);
            const birth = await WPermit.findOneAndUpdate(
              { _id: docID },
              data,
              { upsert: true },
              function (err, doc) {
                if (err) console.log(err);
                console.log("Succesfully saved.");
              }
            );
          } else {
            data["user_created"] = email;
            const work = new WPermit(data);
            const savedwork = await work.save();
            docid = savedwork._id;

            console.log(savedwork._id);

            clientData[langCheck][modelCheck] = savedwork._id;
            clientData["History"][langCheck][modelCheck].push(docid);
            await clientData.save();
          }
        } else if (modelCheck.includes("ResidencyPermit")) {
          if (ObjectId.isValid(docID)) {
            data["user_edit"] = email;
            console.log("Update doc by ID " + docID);
            const birth = await RPermit.findOneAndUpdate(
              { _id: docID },
              data,
              { upsert: true },
              function (err, doc) {
                if (err) console.log(err);
                console.log("Succesfully saved.");
              }
            );
          } else {
            data["user_created"] = email;
            const residencypermit = new RPermit(data);
            const savedresidencypermit = await residencypermit.save();
            docid = savedresidencypermit._id;

            console.log(savedresidencypermit._id);

            clientData[langCheck][modelCheck] = savedresidencypermit._id;
            clientData["History"][langCheck][modelCheck].push(docid);
            await clientData.save();
          }
        } else if (modelCheck.includes("Card")) {
          if (ObjectId.isValid(docID)) {
            data["user_edit"] = email;
            console.log("Update doc by ID " + docID);
            const birth = await IDCard.findOneAndUpdate(
              { _id: docID },
              data,
              { upsert: true },
              function (err, doc) {
                if (err) console.log(err);
                console.log("Succesfully saved.");
              }
            );
          } else {
            data["user_created"] = email;
            const card = new IDCard(data);
            const cardid = await card.save();
            docid = cardid._id;

            console.log(cardid._id);

            clientData[langCheck][modelCheck] = cardid._id;
            clientData["History"][langCheck][modelCheck].push(docid);
            await clientData.save();
          }
        } else if (modelCheck.includes("MoF")) {
          if (ObjectId.isValid(docID)) {
            data["user_edit"] = email;
            console.log("Update doc by ID " + docID);
            const birth = await MoF.findOneAndUpdate(
              { _id: docID },
              data,
              { upsert: true },
              function (err, doc) {
                if (err) console.log(err);
                console.log("Succesfully saved.");
              }
            );
          } else {
            data["user_created"] = email;
            const mof = new MoF(data);
            const mofid = await mof.save();
            docid = mofid._id;

            console.log(mofid._id);

            clientData[langCheck][modelCheck] = mofid._id;
            clientData["History"][langCheck][modelCheck].push(docid);
            await clientData.save();
          }
        } else if (modelCheck.includes("Residence")) {
          if (ObjectId.isValid(docID)) {
            data["user_edit"] = email;
            console.log("Update doc by ID " + docID);
            const birth = await Residence.findOneAndUpdate(
              { _id: docID },
              data,
              { upsert: true },
              function (err, doc) {
                if (err) console.log(err);
                console.log("Succesfully saved.");
              }
            );
          } else {
            data["user_created"] = email;
            const residence = new Residence(data);
            const residenceid = await residence.save();
            docid = residenceid._id;

            console.log(residenceid._id);

            clientData[langCheck][modelCheck] = residenceid._id;
            clientData["History"][langCheck][modelCheck].push(docid);
            await clientData.save();
          }
        } else if (modelCheck.includes("PrivateDriver")) {
          if (ObjectId.isValid(docID)) {
            data["user_edit"] = email;
            console.log("Update doc by ID " + docID);
            const birth = await Private.findOneAndUpdate(
              { _id: docID },
              data,
              { upsert: true },
              function (err, doc) {
                if (err) console.log(err);
                console.log("Succesfully saved.");
              }
            );
          } else {
            data["user_created"] = email;
            const private = new Private(data);
            const privateid = await private.save();
            docid = privateid._id;
            
            console.log(privateid._id);
            console.log("PrivateDriverslicense");

            clientData[langCheck]["PrivateDriverslicense"] = privateid._id;
            clientData["History"][langCheck]["PrivateDriverslicense"].push(docid);
            await clientData.save();
          }
        } else if (modelCheck.includes("Police")) {
          if (ObjectId.isValid(docID)) {
            data["user_edit"] = email;
            console.log("Update doc by ID " + docID);
            const birth = await Police.findOneAndUpdate(
              { _id: docID },
              data,
              { upsert: true },
              function (err, doc) {
                if (err) console.log(err);
                console.log("Succesfully saved.");
              }
            );
          } else {
            data["user_created"] = email;
            const police = new Police(data);
            const policeid = await police.save();
            docid = policeid._id;

            console.log(policeid._id);

            clientData[langCheck][modelCheck] = policeid._id;
            clientData["History"][langCheck][modelCheck].push(docid);
            await clientData.save();
          }
        } else if (modelCheck.includes("NSSF")) {
          if (ObjectId.isValid(docID)) {
            data["user_edit"] = email;
            console.log("Update doc by ID " + docID);
            const birth = await NSSF.findOneAndUpdate(
              { _id: docID },
              data,
              { upsert: true },
              function (err, doc) {
                if (err) console.log(err);
                console.log("Succesfully saved.");
              }
            );
          } else {
            data["user_created"] = email;
            const nssf = new NSSF(data);
            const nssfid = await nssf.save();
            docid = nssfid._id;

            console.log(nssfid._id);

            clientData[langCheck][modelCheck] = nssfid._id;
            clientData["History"][langCheck][modelCheck].push(docid);
            await clientData.save();
          }
        } else if (modelCheck.includes("Individual")) {
          if (ObjectId.isValid(docID)) {
            data["user_edit"] = email;
            console.log("Update doc by ID " + docID);
            const birth = await Individual.findOneAndUpdate(
              { _id: docID },
              data,
              { upsert: true },
              function (err, doc) {
                if (err) console.log(err);
                console.log("Succesfully saved.");
              }
            );
          } else {
            data["user_created"] = email;
            const individual = new Individual(data);
            const individualid = await individual.save();
            docid = individualid._id;

            console.log(individualid._id);

            clientData[langCheck][modelCheck] = individualid._id;
            clientData["History"][langCheck][modelCheck].push(docid);
            await clientData.save();
          }
        } else if (modelCheck.includes("Family")) {
          if (ObjectId.isValid(docID)) {
            data["user_edit"] = email;
            console.log("Update doc by ID " + docID);
            const birth = await Family.findOneAndUpdate(
              { _id: docID },
              data,
              { upsert: true },
              function (err, doc) {
                if (err) console.log(err);
                console.log("Succesfully saved.");
              }
            );
          } else {
            data["user_created"] = email;
            const family = new Family(data);
            const familyid = await family.save();
            docid = familyid._id;

            console.log(familyid._id);

            clientData[langCheck][modelCheck] = familyid._id;
            clientData["History"][langCheck][modelCheck].push(docid);
            await clientData.save();
          }
        } else if (modelCheck.includes("Consent")) {
          if (ObjectId.isValid(docID)) {
            data["user_edit"] = email;
            console.log("Update doc by ID " + docID);
            const birth = await Consent.findOneAndUpdate(
              { _id: docID },
              data,
              { upsert: true },
              function (err, doc) {
                if (err) console.log(err);
                console.log("Succesfully saved.");
              }
            );
          } else {
            data["user_created"] = email;
            const consent = new Consent(data);
            const consentid = await consent.save();
            docid = consentid._id;

            console.log(consentid._id);

            clientData[langCheck][modelCheck] = consentid._id;
            clientData["History"][langCheck][modelCheck].push(docid);
            await clientData.save();
          }
        } else if (modelCheck.includes("Driver")) {
          if (ObjectId.isValid(docID)) {
            data["user_edit"] = email;
            console.log("Update doc by ID " + docID);
            const birth = await Driver.findOneAndUpdate(
              { _id: docID },
              data,
              { upsert: true },
              function (err, doc) {
                if (err) console.log(err);
                console.log("Succesfully saved.");
              }
            );
          } else {
            data["user_created"] = email;
            const driver = new Driver(data);
            const driverid = await driver.save();
            docid = driverid._id;

            console.log(driverid._id);

            clientData[langCheck]["Driverslicensecertificate"] = driverid._id;
            clientData["History"][langCheck]["Driverslicensecertificate"].push(docid);
            await clientData.save();
          }
        } else if (modelCheck.includes("Empty")) {
          if (ObjectId.isValid(docID)) {
            data["user_edit"] = email;
            console.log(email);
            console.log(data["user_edit"]);
            console.log("Update doc by ID " + docID);
            const birth = await ETemplate.findOneAndUpdate(
              { _id: docID },
              data,
              { upsert: true },
              function (err, doc) {
                if (err) console.log(err);
                console.log("Succesfully saved.");
              }
            );
          } else {
            data["user_created"] = email;
            const empty = new ETemplate(data);
            const emptyid = await empty.save();
            docid = emptyid._id;

            console.log(emptyid._id);

            clientData[langCheck][modelCheck] = emptyid._id;
            clientData["History"][langCheck][modelCheck].push(docid);
            await clientData.save();
          }
        } else {
        }

        var clientName = clientData.fullname;

        console.log("finish");

        //Put condition if verified or not "/unverified"
        var outputPath = GenerateDocx(
          data,
          docxPath,
          docArray,
          req.query.doc,
          clientName
        );

        //query = outputPath[0]
        var string1 = encodeURIComponent(outputPath[0]);
        var string2 = encodeURIComponent(outputPath[1]);

        //download button on the form as a button
        //res.redirect('/api/posts/r/?valid=' + string1 + '&pass=' + string2)
        console.log("/api/posts/r/?valid=" + string1 + "&pass=" + string2);

        var link = "/api/posts/r/?valid=" + string1 + "&pass=" + string2;

        createHistoryLog(
          req.email,
          "Create Document",
          "Create Document for client " +
            clientName +
            ", " +
            langCheck +
            "/ " +
            modelCheck +
            " Document",
          req.id
        );

        var query = Paid.find({}, { s0: 0, __v: 0 });
        query.exec(function (err, result) {
          if (!err) {
            const paidfile = fs.readFileSync(paidpath, "utf-8");
            var paid_template = ejs.compile(paidfile, { client: true });
            const paid = paid_template({
              obj: data,
              clientname: result,
              docid: docid != "" ? docid : docID,
            });

            // console.log(html)
            res.send({ link: link, paid: paid });
          } else {
            console.log(err);
          }
        });
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

router.post("/editpaid", verify, async (req, res) => {
  // if (false) {
  try {
    console.log(req.body);
    if (!isEmptyOrSpaces(req.body.client)) {
      let id = req.body.client;
      var url = "";
      var result = [];

      try {
        var clientDocx = await Paid.find({ _id: id });

        // console.log(clientDocx);

        var language = ["Arabic", "English", "Español", "Français"];

        if (clientDocx != null) {
          // language.forEach((element) => {
          //console.log(clientDocx[0][element]);
          // user["payment"].length
          for (var i = 0; i < clientDocx[0]["payment"].length; i++) {
            try{
            var docLanguage = clientDocx[0]["payment"][i];

            let rawdata;
            if (docLanguage["language"] == "English") {
              rawdata = fs.readFileSync("./json/English/template.json", "utf-8");
            } else if (docLanguage["language"] == "Français") {
              rawdata = fs.readFileSync("./json/Français/template.json", "utf-8");
            } else if (docLanguage["language"] == "Español") {
              rawdata = fs.readFileSync("./json/Español/template.json", "utf-8");
            } else if (docLanguage["language"] == "Arabic") {
              rawdata = fs.readFileSync("./json/Arabic/template.json", "utf-8");
            } else {
              // add default row json ... or send message to client to fuck off
            }
            let docView = JSON.parse(rawdata);

            // for (const docModel in clientDocx.payment[i]) {
            var ObjectId = require("mongoose").Types.ObjectId;
            if (docLanguage != null && ObjectId.isValid(docLanguage["docid"])) {
              // console.log(docLanguage["docid"]);
              if (docLanguage["docModel"].includes("Birth")) {
                var docSaved = await Birth.find({
                  _id: docLanguage["docid"],
                });
                // console.log(docSaved);
                // updated_at
                // user_created
                // user_edit

                result.push({
                  _id: docLanguage["docid"],
                  client_id: docSaved[0]["client"]["id"],
                  language: docLanguage["language"],
                  docModel: "Birth Certificate",
                  docModelView: docView["Birth Certificate"],
                  created_at: docSaved[0]["created_at"],
                  updated_at: docSaved[0]["updated_at"],
                  createdBy: docSaved[0]["user_created"],
                  updateddBy: docSaved[0]["user_edit"],
                  note: "",
                  href: docLanguage["href"],
                  download: "DOWNLOAD",
                  edit: "EDIT",
                });
              } else if (docLanguage["docModel"].includes("Divorce")) {
                var docSaved = await Divorce.find({
                  _id: docLanguage["docid"],
                });
                result.push({
                  _id: docLanguage["docid"],
                  client_id: docSaved[0]["client"]["id"],
                  language: docLanguage["language"],
                  docModel: "Divorce Certificate",
                  docModelView: docView["Divorce Certificate"],
                  created_at: docSaved[0]["created_at"],
                  updated_at: docSaved[0]["updated_at"],
                  createdBy: docSaved[0]["user_created"],
                  updateddBy: docSaved[0]["user_edit"],
                  note: "",
                  href: docLanguage["href"],
                  download: "DOWNLOAD",
                  edit: "EDIT",
                });
              } else if (docLanguage["docModel"].includes("Death")) {
                var docSaved = await Death.find({
                  _id: docLanguage["docid"],
                });
                result.push({
                  _id: docLanguage["docid"],
                  client_id: docSaved[0]["client"]["id"],
                  language: docLanguage["language"],
                  docModel: "Death Certificate",
                  docModelView: docView["Death Certificate"],
                  created_at: docSaved[0]["created_at"],
                  updated_at: docSaved[0]["updated_at"],
                  createdBy: docSaved[0]["user_created"],
                  updateddBy: docSaved[0]["user_edit"],
                  note: "",
                  href: docLanguage["href"],
                  download: "DOWNLOAD",
                  edit: "EDIT",
                });
              } else if (docLanguage["docModel"].includes("Marriage")) {
                var docSaved = await Marriage.find({
                  _id: docLanguage["docid"],
                });
                result.push({
                  _id: docLanguage["docid"],
                  client_id: docSaved[0]["client"]["id"],
                  language: docLanguage["language"],
                  docModel: "Marriage Certificate",
                  docModelView: docView["Marriage Certificate"],
                  created_at: docSaved[0]["created_at"],
                  updated_at: docSaved[0]["updated_at"],
                  createdBy: docSaved[0]["user_created"],
                  updateddBy: docSaved[0]["user_edit"],
                  note: "",
                  href: docLanguage["href"],
                  download: "DOWNLOAD",
                  edit: "EDIT",
                });
              } else if (docLanguage["docModel"].includes("Work")) {
                var docSaved = await WPermit.find({
                  _id: docLanguage["docid"],
                });
                result.push({
                  _id: docLanguage["docid"],
                  client_id: docSaved[0]["client"]["id"],
                  language: docLanguage["language"],
                  docModel: "Work Permit",
                  docModelView: docView["Work Permit"],
                  created_at: docSaved[0]["created_at"],
                  updated_at: docSaved[0]["updated_at"],
                  createdBy: docSaved[0]["user_created"],
                  updateddBy: docSaved[0]["user_edit"],
                  note: "",
                  href: docLanguage["href"],
                  download: "DOWNLOAD",
                  edit: "EDIT",
                });
              } else if (docLanguage["docModel"].includes("ID")) {
                var docSaved = await IDCard.find({
                  _id: docLanguage["docid"],
                });
                result.push({
                  _id: docLanguage["docid"],
                  client_id: docSaved[0]["client"]["id"],
                  language: docLanguage["language"],
                  docModel: "ID Card",
                  docModelView: docView["ID Card"],
                  created_at: docSaved[0]["created_at"],
                  updated_at: docSaved[0]["updated_at"],
                  createdBy: docSaved[0]["user_created"],
                  updateddBy: docSaved[0]["user_edit"],
                  note: "",
                  href: docLanguage["href"],
                  download: "DOWNLOAD",
                  edit: "EDIT",
                });
              } else if (docLanguage["docModel"].includes("MoF")) {
                var docSaved = await MoF.find({ _id: docLanguage["docid"] });
                result.push({
                  _id: docLanguage["docid"],
                  client_id: docSaved[0]["client"]["id"],
                  language: docLanguage["language"],
                  docModel: "MoF Registration",
                  docModelView: docView["MoF Registration"],
                  created_at: docSaved[0]["created_at"],
                  updated_at: docSaved[0]["updated_at"],
                  createdBy: docSaved[0]["user_created"],
                  updateddBy: docSaved[0]["user_edit"],
                  note: "",
                  href: docLanguage["href"],
                  download: "DOWNLOAD",
                  edit: "EDIT",
                });
              } else if (docLanguage["docModel"].includes("Residence")) {
                var docSaved = await Residence.find({
                  _id: docLanguage["docid"],
                });
                result.push({
                  _id: docLanguage["docid"],
                  client_id: docSaved[0]["client"]["id"],
                  language: docLanguage["language"],
                  docModel: "Residence Certificate",
                  docModelView: docView["Residence Certificate"],
                  created_at: docSaved[0]["created_at"],
                  updated_at: docSaved[0]["updated_at"],
                  createdBy: docSaved[0]["user_created"],
                  updateddBy: docSaved[0]["user_edit"],
                  note: "",
                  href: docLanguage["href"],
                  download: "DOWNLOAD",
                  edit: "EDIT",
                });
              } else if (docLanguage["docModel"].includes("PrivateDriver")) {
                var docSaved = await Private.find({
                  _id: docLanguage["docid"],
                });
                result.push({
                  _id: docLanguage["docid"],
                  client_id: docSaved[0]["client"]["id"],
                  language: docLanguage["language"],
                  docModel: "Private Driver's license",
                  docModelView: docView["Private Driver's license"],
                  created_at: docSaved[0]["created_at"],
                  updated_at: docSaved[0]["updated_at"],
                  createdBy: docSaved[0]["user_created"],
                  updateddBy: docSaved[0]["user_edit"],
                  note: "",
                  href: docLanguage["href"],
                  download: "DOWNLOAD",
                  edit: "EDIT",
                });
              } else if (docLanguage["docModel"].includes("Police")) {
                var docSaved = await Police.find({
                  _id: docLanguage["docid"],
                });
                result.push({
                  _id: docLanguage["docid"],
                  client_id: docSaved[0]["client"]["id"],
                  language: docLanguage["language"],
                  docModel: "Police record",
                  docModelView: docView["Police record"],
                  created_at: docSaved[0]["created_at"],
                  updated_at: docSaved[0]["updated_at"],
                  createdBy: docSaved[0]["user_created"],
                  updateddBy: docSaved[0]["user_edit"],
                  note: "",
                  href: docLanguage["href"],
                  download: "DOWNLOAD",
                  edit: "EDIT",
                });
              } else if (docLanguage["docModel"].includes("NSSF")) {
                var docSaved = await NSSF.find({
                  _id: docLanguage["docid"],
                });
                result.push({
                  _id: docLanguage["docid"],
                  client_id: docSaved[0]["client"]["id"],
                  language: docLanguage["language"],
                  docModel: "NSSF Service Certificate",
                  docModelView: docView["NSSF Service Certificate"],
                  created_at: docSaved[0]["created_at"],
                  updated_at: docSaved[0]["updated_at"],
                  createdBy: docSaved[0]["user_created"],
                  updateddBy: docSaved[0]["user_edit"],
                  note: "",
                  href: docLanguage["href"],
                  download: "DOWNLOAD",
                  edit: "EDIT",
                });
              } else if (docLanguage["docModel"].includes("Individual")) {
                var docSaved = await Individual.find({
                  _id: docLanguage["docid"],
                });
                result.push({
                  _id: docLanguage["docid"],
                  client_id: docSaved[0]["client"]["id"],
                  language: docLanguage["language"],
                  docModel: "Individual Extract",
                  docModelView: docView["Individual Extract"],
                  created_at: docSaved[0]["created_at"],
                  updated_at: docSaved[0]["updated_at"],
                  createdBy: docSaved[0]["user_created"],
                  updateddBy: docSaved[0]["user_edit"],
                  note: "",
                  href: docLanguage["href"],
                  download: "DOWNLOAD",
                  edit: "EDIT",
                });
              } else if (docLanguage["docModel"].includes("Family")) {
                var docSaved = await Family.find({
                  _id: docLanguage["docid"],
                });
                result.push({
                  _id: docLanguage["docid"],
                  client_id: docSaved[0]["client"]["id"],
                  language: docLanguage["language"],
                  docModel: "Family Extract",
                  docModelView: docView["Family Extract"],
                  created_at: docSaved[0]["created_at"],
                  updated_at: docSaved[0]["updated_at"],
                  createdBy: docSaved[0]["user_created"],
                  updateddBy: docSaved[0]["user_edit"],
                  note: "",
                  href: docLanguage["href"],
                  download: "DOWNLOAD",
                  edit: "EDIT",
                });
              } else if (docLanguage["docModel"].includes("Consent")) {
                var docSaved = await Consent.find({
                  _id: docLanguage["docid"],
                });
                result.push({
                  _id: docLanguage["docid"],
                  client_id: docSaved[0]["client"]["id"],
                  language: docLanguage["language"],
                  docModel: "Consent to travel",
                  docModelView: docView["Consent to travel"],
                  created_at: docSaved[0]["created_at"],
                  updated_at: docSaved[0]["updated_at"],
                  createdBy: docSaved[0]["user_created"],
                  updateddBy: docSaved[0]["user_edit"],
                  note: "",
                  href: docLanguage["href"],
                  download: "DOWNLOAD",
                  edit: "EDIT",
                });
              } else if (docLanguage["docModel"].includes("ResidencyPermit")) {
                var docSaved = await RPermit.find({
                  _id: docLanguage["docid"],
                });
                result.push({
                  _id: docLanguage["docid"],
                  client_id: docSaved[0]["client"]["id"],
                  language: docLanguage["language"],
                  docModel: "Residency Permit",
                  docModelView: docView["Residency Permit"],
                  created_at: docSaved[0]["created_at"],
                  updated_at: docSaved[0]["updated_at"],
                  createdBy: docSaved[0]["user_created"],
                  updateddBy: docSaved[0]["user_edit"],
                  note: "",
                  href: docLanguage["href"],
                  download: "DOWNLOAD",
                  edit: "EDIT",
                });
              } else if (docLanguage["docModel"].includes("Driver")) {
                var docSaved = await Driver.find({
                  _id: docLanguage["docid"],
                });
                result.push({
                  _id: docLanguage["docid"],
                  client_id: docSaved[0]["client"]["id"],
                  language: docLanguage["language"],
                  docModel: "Driver's license certificate",
                  docModelView: docView["Driver's license certificate"],
                  created_at: docSaved[0]["created_at"],
                  updated_at: docSaved[0]["updated_at"],
                  createdBy: docSaved[0]["user_created"],
                  updateddBy: docSaved[0]["user_edit"],
                  note: "",
                  href: docLanguage["href"],
                  download: "DOWNLOAD",
                  edit: "EDIT",
                });
              } else if (docLanguage["docModel"].includes("Empty")) {
                console.log("foundit");
                var docSaved = await ETemplate.find({
                  _id: docLanguage["docid"],
                });

                var documentTitle = "";
                if(docSaved[0]["s1"]["f1"]["value"] != null)
                {
                  documentTitle = docSaved[0]["s1"]["f1"]["value"];
                }
                else
                {
                  documentTitle = docView["Empty Template"];
                }

                console.log(docSaved);
                result.push({
                  _id: docLanguage["docid"],
                  client_id: docSaved[0]["client"]["id"],
                  language: docLanguage["language"],
                  docModel: "Empty Template",
                  docModelView: documentTitle,
                  created_at: docSaved[0]["created_at"],
                  updated_at: docSaved[0]["updated_at"],
                  createdBy: docSaved[0]["user_created"],
                  updateddBy: docSaved[0]["user_edit"],
                  note: "",
                  href: docLanguage["href"],
                  download: "DOWNLOAD",
                  edit: "EDIT",
                });
              } else {
              }
            }
            }
            catch(err){console.log(err);}
          }
          // });
        } else {
        }
        // console.log(html)
        // console.log(result);

        res.send(result);
      } catch (err) {
        console.log(err);
      }
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/download", verify, async (req, res) => {
  try {
    if (
      !isEmptyOrSpaces(req.body.lang) &&
      !isEmptyOrSpaces(req.body.doc) &&
      !isEmptyOrSpaces(req.body.id)
    ) {
      let path = "./json/" + req.body.lang + "/" + req.body.doc + ".json";
      let docxPath =
        "./DocumentTemplate/" + req.body.lang + "/" + req.body.doc + ".docx";
      //console.log(path)
      if (fs.existsSync(path) && fs.existsSync(docxPath)) {
        console.log("Begain");
        let rawdata = fs.readFileSync(path, "utf-8");
        let data = JSON.parse(rawdata);
        let docArray = { clients: [], users: [] }; // sar fe mwskleh bel array fams:[]
        let jsonObj = [];

        //Search all filed had been submit when get to the paid form break from this loop and then make another keys's
        //For paid client form to enter or check if there is already one there

        Object.keys(req.body).forEach(function (key) {
          let keys = key.split("_");
          console.log(keys);
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

        if (data.hasOwnProperty("s2")) {
          if (data.s2.hasOwnProperty("clients")) {
            for (var i = 0; i < data.s2.clients.length; i++) {
              if (!isEmptyOrSpaces(req.body["s2_clients_num_" + i])) {
                data.s2.clients[i].num = req.body["s2_clients_num_" + i];
                data.s2.clients[i].establishment =
                  req.body["s2_clients_establishment_" + i];
                data.s2.clients[i].emp = req.body["s2_clients_emp_" + i];
                data.s2.clients[i].ter = req.body["s2_clients_ter_" + i];
                data.s2.clients[i].note = req.body["s2_clients_note_" + i];
                docArray.clients.push({
                  num: req.body["s2_clients_num_" + i],
                  establishment: req.body["s2_clients_establishment_" + i],
                  emp: req.body["s2_clients_emp_" + i],
                  ter: req.body["s2_clients_ter_" + i],
                  note: req.body["s2_clients_note_" + i],
                });
              }
            }
          } else if (data.s2.hasOwnProperty("fams")) {
            for (var i = 0; i < data.s2.fams.length; i++) {
              if (!isEmptyOrSpaces(req.body["s2_fams_nsname_" + i])) {
                data.s2.fams[i].nsname = req.body["s2_fams_nsname_" + i];
                data.s2.fams[i].faname = req.body["s2_fams_faname_" + i];
                data.s2.fams[i].moname = req.body["s2_fams_moname_" + i];
                data.s2.fams[i].pdbirth = req.body["s2_fams_pdbirth_" + i];
                data.s2.fams[i].sect = req.body["s2_fams_sect_" + i];
                data.s2.fams[i].stat = req.body["s2_fams_stat_" + i];
                data.s2.fams[i].s = req.body["s2_fams_s_" + i];
                data.s2.fams[i].remark = req.body["s2_fams_remark_" + i];
                docArray.users.push({
                  nsname: req.body["s2_fams_nsname_" + i],
                  faname: req.body["s2_fams_faname_" + i],
                  moname: req.body["s2_fams_moname_" + i],
                  pdbirth: req.body["s2_fams_pdbirth_" + i],
                  sect: req.body["s2_fams_sect_" + i],
                  stat: req.body["s2_fams_stat_" + i],
                  s: req.body["s2_fams_s_" + i],
                  remark: req.body["s2_fams_remark_" + i],
                });
              }
            }
          } else {
          }
        }

        // console.log(docArray)

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
        console.log();

        docArray["o1"] = "0";

        if (req.query.lang != null && req.query.lang == "Français") {
          if (originalFlag) docArray["o1"] = "Copie conforme à l’original";
          datetime = event.toLocaleDateString("fr-GB", options);
        } else if (req.query.lang != null && req.query.lang == "Arabic") {
          datetime = event.toLocaleDateString("ar-EG", options);
        } else if (req.query.lang != null && req.query.lang == "English") {
          if (originalFlag) docArray["o1"] = "True Copy of the Original";
          datetime = event.toLocaleDateString("en-US", {
            year: "numeric",
            day: "numeric",
            month: "long",
          });
        } else if (req.query.lang != null && req.query.lang == "Español") {
          if (originalFlag) docArray["o1"] = "Copia verdadera del original";
          datetime = event.toLocaleDateString("es-GB", options);
        } else {
        }

        data["date"] = datetime;
        docArray["date"] = datetime;

        //track if original or not
        data["original"] = docArray["o1"];

        //return to defualt state ""
        if (docArray["o1"] == "0") docArray["o1"] = "";

        //console.log("before save");

        var modelCheck = req.query.doc;
        var langCheck = req.query.lang;
        var id = req.query.id;
        var docID = req.query.docID != null ? req.query.docID : "";
        modelCheck = modelCheck.replace(/\s/g, "");

        let clientData = await Client.findOne({ _id: id });
        data["client"]["id"] = id;

        if (data.hasOwnProperty("s0")) {
          Object.keys(data.s0).forEach(function (key) {
            let keys = data.s0[key];

            if (!isEmptyOrSpaces(keys)) {
              keys = keys.split("_");
              // console.log(keys)
              // console.log(data1.s0[key])
              if (keys.length == 2) {
                if (clientData.s0.hasOwnProperty(key)) {
                  // console.log('key: ' + key)
                  // console.log('mongodata: ' + clientData.s0[key])
                  // console.log(keys[0] + ' ' + keys[1])
                  clientData.s0[key] = data[keys[0]][keys[1]]["value"];
                  // console.log(data[keys[0]][keys[1]]['value'])
                }
                // data1.s0[key] = req.body[key]
              } else if (keys.length == 3) {
                if (clientData.s0.hasOwnProperty(key)) {
                  clientData.s0[key] = data[keys[0]][keys[1]][keys[2]]["value"];
                  // console.log(data[keys[0]][keys[1]][keys[2]]['value'])
                }
              } else {
              }
            }
          });
        }

        var downloadLinkGenerator = downloadLink(
          datetime,
          req.query.doc,
          clientData["fullname"]
        );

        var part1 = encodeURIComponent(downloadLinkGenerator[0]);
        var part2 = encodeURIComponent(downloadLinkGenerator[1]);

        data["download"] = "/api/posts/r/?valid=" + part1 + "&pass=" + part2;
        console.log(data["download"]);

        var outputPath = GenerateDocx(
          data,
          docxPath,
          docArray,
          req.query.doc,
          clientName
        );
      }
    }
  } catch (err) {
    console.log(err);
  }
});

function downloadLink(datetime, modelCheck, clientName) {
  var outputPath =
    "./Output/" + modelCheck + " - " + clientName + " - " + datetime + ".docx";

  return [outputPath, modelCheck + " - " + clientName + " - " + datetime];
}

// add mongo id for the user
function GenerateDocx(
  data = 1,
  docxPath,
  docArray,
  modelCheck,
  clientName,
  datetime = "0"
) {
  // Load the docx file as a binary
  var content = fs.readFileSync(docxPath, "binary");

  var zip = new PizZip(content);

  var doc = new Docxtemplater();
  doc.loadZip(zip);

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

  var outputPath =
    "./Output/" + modelCheck + " - " + clientName + " - " + date + ".docx";
  // Get the path that been enter in mongo file for the client and save it with these path
  fs.writeFileSync(outputPath, buf);

  //[outputPath, modelCheck + ' ' + datetime];
  //return outputPath
  return [outputPath, modelCheck + " - " + clientName + " - " + date];
}

function addPaidClient(a, b, obj) {
  try {
    //console.log("addPaid");
    //var targetinfo = req.body
    if (!isEmptyOrSpaces(a) && !isEmptyOrSpaces(b)) {
      var data = {
        combineid: b,
        fullname: a,
        name: obj.first,
        surname: obj.last,
        father: obj.middle,
        mother: "",
        mothersurname: "",
        nationaltiy: "",
        sex: "",
        familystatus: "",
        governorate: "",
        district: "",
        city: "",
        quarter: "",
        street: "",
        building: "",
        floor: "",
        mobile: obj.phone,
        work: "",
        fax: "",
        email: "",
        profession: "",
        address: obj.address,
        telephone: "",
        religion: "",
        placeofbirthlocal: "",
        placeofbirthdistrict: "",
        dateofbirth: "",
        placeregistry: "",
        noregistry: "",
        payment: [],
      };

      // let promise = new Promise((resolve, reject) => {
      //   setTimeout(() => resolve("done!"), 1000)
      // });
      //^^^^^^^^^^^^^^^^^^^^^^^66
      // const paid = new Paid(data)
      // const savedPaid = await paid.save()

      //console.log('save new client :' + savedClient)

      // wait 3 seconds
      //^^^^^^^^^^^^^^^^^^^^^^^66
      // await new Promise((resolve, reject) => setTimeout(resolve, 500));

      // console.log(savedPaid['_id'] + "asdfsadfds")
      return data;
      //return savedPaid['_id']
    }
  } catch (err) {
    console.log(err);
  }
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

function isEmptyOrSpaces(str) {
  return str === null || str.match(/^ *$/) !== null;
}

function buildDocxHistory(str) {}

const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

module.exports = router;
