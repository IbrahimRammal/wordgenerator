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
//const dateFormat = require("dateformat");
var PizZip = require("pizzip");
var Docxtemplater = require("docxtemplater");
var path = require("path");

var mongoose = require("mongoose");

//model client paider
const PaidModel = require("../models/Paid");

const Paid = PaidModel.Paid;
const Payment = PaidModel.Payment;

const paidpath = "./GenerateHtml/paidform.ejs";

var testdb = require("../db/test");

const {
  registerValidation,
  loginValidation,
} = require("../validate/validation");

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

          console.log(result);

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

      var langCheck = req.body.type;
      var modelCheck = req.body.template;
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

        var dataid = docSaved[0][langCheck][modelCheck];
        console.log(dataid);
        if (!isEmptyOrSpaces(dataid)) {
          if (modelCheck.includes("Birth")) {
            docSaved = await Birth.find({ _id: dataid });
          } else if (modelCheck.includes("Divorce")) {
            docSaved = await Divorce.find({ _id: dataid });
          } else if (modelCheck.includes("Death")) {
            docSaved = await Death.find({ _id: dataid });
          } else if (modelCheck.includes("Marriage")) {
            docSaved = await Marriage.find({ _id: dataid });
          } else if (modelCheck.includes("Work")) {
            docSaved = await WPermit.find({ _id: dataid });
          } else if (modelCheck.includes("ID")) {
            docSaved = await IDCard.find({ _id: dataid });
          } else if (modelCheck.includes("MoF")) {
            docSaved = await MoF.find({ _id: dataid });
          } else if (modelCheck.includes("Residence")) {
            docSaved = await Residence.find({ _id: dataid });
          } else if (modelCheck.includes("PrivateDriver")) {
            docSaved = await Private.find({ _id: dataid });
          } else if (modelCheck.includes("Police")) {
            docSaved = await Police.find({ _id: dataid });
          } else if (modelCheck.includes("NSSF")) {
            docSaved = await NSSF.find({ _id: dataid });
          } else if (modelCheck.includes("Individual")) {
            docSaved = await Individual.find({ _id: dataid });
          } else if (modelCheck.includes("Family")) {
            docSaved = await Family.find({ _id: dataid });
          } else if (modelCheck.includes("Consent")) {
            docSaved = await Consent.find({ _id: dataid });
          } else if (modelCheck.includes("ResidencyPermit")) {
            docSaved = await RPermit.find({ _id: dataid });
          } else if (modelCheck.includes("Driver")) {
            docSaved = await Driver.find({ _id: dataid });
          } else if (modelCheck.includes("Empty")) {
            console.log("foundit");
            docSaved = await ETemplate.find({ _id: dataid });
          } else {
          }

          /// ////////////////////////////////////
          docSaved[0]["client"]["id"] = id;

          // console.log('docSaved: ' + docSaved[0])
          const file = fs.readFileSync(htmlpath, "utf-8");
          var fixture_template = ejs.compile(file, { client: true });
          const html = fixture_template({ obj: docSaved[0] });
          // console.log(html)
          res.send({ html: html });
          return;
        }
      } catch (err) {
        console.log(err);
      }

      // console.log(htmlpath)
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

        const file = fs.readFileSync(htmlpath, "utf-8");
        var fixture_template = ejs.compile(file, { client: true });
        const html = fixture_template({ obj: data });

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
      // user get the downloaded docx
      // console.log('hello')
    }
  });
});

router.post("/Payment/GetData", verify, async (req, res) => {
  var result = [];
  var subresult = [];

  console.log(req.query);
  console.log(req.body);

  try {
    var action = req.query.action;
    var id = req.query.id;

    var query;

    if (req.body.action == "update") {
      console.log(req.body.value._id);

      await Paid.updateOne(
        {
            "_id": req.body.value._id,
            "payment._id": req.body.key
        },
        {
            "$set": { "payment.$.category": req.body.value.category, "payment.$.total": req.body.value.total, "payment.$.paid": req.body.value.paid}
        },
        function(error, updatedData) {
            if(error) {
               // return res.status(400).send(error);
            }
            console.log(updatedData);
            //return res.status(200).send(updatedData);
        }
      );

      console.log("Finsh reipte update");
      res.send({});
      return;
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
          console.log(user["payment"][j].href);
          let subParent = {
            //put parent id temor
            _id: getById,
            paymentid: user["payment"][j]._id,
            fullname: user["payment"][j].fullname,
            docid: user["payment"][j].docid,
            href: user["payment"][j].href,
            category: user["payment"][j].category,
            language: user["payment"][j].language,
            docModel: user["payment"][j].docModel,
            total: user["payment"][j].total,
            remain: user["payment"][j].remain,
            paid: user["payment"][j].paid,
            Download: "download",
          };

          result.push(subParent);

          //console.log("subParent: " + JSON.stringify(subParent));
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

    //console.log("result: " + result);
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
      console.log(req.body);
      await Paid.findById(req.body["key"], function (err, user) {
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
    }
    if (req.body.action == "remove") {
      console.log(req.body);
      var keyID = mongoose.Types.ObjectId(req.body.key);
      console.log("removed" + req.body["key"]);
      await Paid.findByIdAndDelete(req.body["key"], function (err) {
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
      await Paid.findByIdAndDelete(req.body["key"], function (err) {
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

  console.log(result);
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
        };

        // let promise = new Promise((resolve, reject) => {
        //   setTimeout(() => resolve("done!"), 1000)
        // });

        const client = new Client(data);
        const savedClient = await client.save();

        console.log("save new client :" + savedClient);

        // wait 3 seconds
        //await new Promise((resolve, reject) => setTimeout(resolve, 500));

        console.log(savedClient["_id"] + "asdfsadfds");
        respnseAddID = savedClient["_id"];
      }

      //return savedClient['_id']
    }
    if (req.body.action == "update") {
      console.log(req.body);

      await Client.findById(req.body["key"], function (err, user) {
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
      await Client.findByIdAndDelete(req.body["key"], function (err) {
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

router.get("/jsonget", verify, async (req, res) => {
  var query = await Client.find(
    {},
    { English: 0, Español: 0, Français: 0, __v: 0 }
  );

  //console.log(JSON.stringify(query));

  query = JSON.stringify(query);
  console.log(query);

  //let path = './json/public/mock_svc_load.json'
  //let writedata = fs.writeFileSync(path, query)
  //let rawdata = fs.readFileSync(path, 'utf-8')
  let data = JSON.parse(query);
  res.send(data);
});

router.get("/jsonok/:type", verify, async (req, res) => {
  console.log(req.params.type + "adsfasdfasd");
  var methode = req.params.type;
  var a = req.query;
  var respnseAddID = "";
  var okResponse = {
    _id: 1,
    fullname: "",
    name: "Name modified by server",
    surname: "",
    father: "",
    mother: "",
    sex: "",
    placeofbirthlocal: "",
    dateofbirth: "",
    noregistry: "",
  };
  if (methode == "type=PUT") {
    console.log("PUT");
    respnseAddID = await addClient(a);
  } else if (methode == "type=DELETE") {
    //_id
    Client.findByIdAndDelete(a["_id"], function (err) {
      if (err) console.log(err);
      console.log("Successful deletion");
    });
  } else if (methode == "type=POST") {
    Client.findById(a["_id"], function (err, user) {
      if (err) {
        console.log(err);
      } else {
        //you should to some checking if the supplied value is present (!= undefined) and if it differs from the currently stored one
        user.fullname = a.fullname;
        user.s0.name = a["s0.name"];
        user.s0.surname = a["s0.surname"];
        user.s0.father = a["s0.father"];
        user.s0.mother = a["s0.mother"];
        user.s0.sex = a["s0.sex"];
        user.s0.placeofbirthlocal = a["s0.placeofbirthlocal"];
        user.s0.dateofbirth = a["s0.dateofbirth"];
        user.s0.noregistry = a["s0.noregistry"];

        user.save(function (err) {
          if (err) {
            //handleError(err)
            console.log(err);
          } else {
            //res.json(user);
          }
        });
      }
    });
  } else {
  }
  let path = "./json/public/mock_svc_ok.json";
  let rawdata = fs.readFileSync(path, "utf-8");
  //let data = JSON.parse(rawdata)

  var sendId = respnseAddID != "" ? respnseAddID : a["_id"];

  //[{"s0":{
  // let data = {"_id":sendId, "fullname": a.fullname, "s0.name":a['s0.name'], "surname":a['s0.surname'],
  // "s0.father": a['s0.father'], "s0.mother": a['s0.mother'], "s0.sex": a['s0.sex'],
  // "s0.placeofbirthlocal": a['s0.placeofbirthlocal'], "s0.dateofbirth":  a['s0.dateofbirth'],"s0.noregistry": a['s0.noregistry'] }
  let data = {
    _id: sendId,
    fullname: a.fullname,
    s0: {
      name: a["s0.name"],
      surname: a["s0.surname"],
      father: a["s0.father"],
      mother: a["s0.mother"],
      sex: a["s0.sex"],
      placeofbirthlocal: a["s0.placeofbirthlocal"],
      dateofbirth: a["s0.dateofbirth"],
      noregistry: a["s0.noregistry"],
    },
  };

  console.log(data);
  res.send(data);
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

      var modelCheck = req.query.doc;
      modelCheck = modelCheck.replace(/\s/g, "");

      //create object form model
      var clientPaymentHistory;
      //var objPayment = {}

      //Get Client doc infromation
      await Client.findById(req.query.id, function (err, user) {
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
          };
        }
      });

      console.log("href: " + decodeURI(clientPaymentHistory.href));
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

      // console.log("clientpaid" + clientpaid['first'])

      var paidClientSelectedID = req.body["client"];

      //console.log("paidClientSelectedID" + paidClientSelectedID)

      //maybe need try catch
      // Object.keys(req.body).forEach(function(key) {
      //  clientpaid[key] = req.body[key]
      // })

      var fullname =
        clientpaid["first"] + clientpaid["middle"] + clientpaid["last"];

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
        const paid = new Paid();

        console.log(clientPaymentHistory);

        paid.payment.push(clientPaymentHistory);

        paid.mobile = clientpaid.mobile;
        paid.address = clientpaid.address;
        paid.combineid = fullname + clientpaid["mobile"];
        paid.fullname = fullname;
        paid.name = clientpaid.first;
        paid.surname = clientpaid.last;
        paid.father = clientpaid.middle;

        //var subdoc = paid.payment.push[0];
        // { _id: '501d86090d371bab2c0341c5', name: 'Liesl' }
        //subdoc.isNew; // true

        paid.save(function (err) {
          if (err) return handleError(err);
          console.log("Success!");
        });

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

        Paid.updateOne(
          { _id: paidClientSelectedID },
          { $push: { payment: clientPaymentHistory } },
          { upsert: true },
          function (err, docs) {
            //res.json(docs);
            console.log(docs);
          }
        );

        // const paid = await Paid.findOneAndUpdate(
        //   { _id: paidClientSelectedID },
        //   { $push: query },
        //   { upsert: true, new: true }
        // );

        //console.log("New Client Paid: " + paid[req.query.lang][modelCheck]);
      }

      res.send("success");
    }
  } catch (err) {
    console.log(err);
    res.send("error");
  }
});

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
          if (originalFlag) docArray["o1"] = "Véritable copie de l'original";
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

        var docid = "";

        if (modelCheck.includes("Birth")) {
          const birth = new Birth(data);
          const savedBirth = await birth.save();
          docid = savedBirth._id;

          console.log("saved birth: " + savedBirth._id);

          clientData[langCheck][modelCheck] = savedBirth._id;
          await clientData.save();
        } else if (modelCheck.includes("Divorce")) {
          const divorce = new Divorce(data);
          const savedDivorce = await divorce.save();
          docid = savedDivorce._id;

          console.log(savedDivorce._id);

          clientData[langCheck][modelCheck] = savedDivorce._id;
          await clientData.save();
        } else if (modelCheck.includes("Death")) {
          const death = new Death(data);
          const savedDeath = await death.save();
          docid = savedDeath._id;

          console.log(savedDeath._id);

          clientData[langCheck][modelCheck] = savedDeath._id;
          await clientData.save();
        } else if (modelCheck.includes("Marriage")) {
          const marriage = new Marriage(data);
          const savedMarriage = await marriage.save();
          docid = savedMarriage._id;

          console.log(savedMarriage._id);

          clientData[langCheck][modelCheck] = savedMarriage._id;
          await clientData.save();
        } else if (modelCheck.includes("Work")) {
          const work = new WPermit(data);
          const savedwork = await work.save();
          docid = savedwork._id;

          console.log(savedwork._id);

          clientData[langCheck][modelCheck] = savedwork._id;
          await clientData.save();
        } else if (modelCheck.includes("ResidencyPermit")) {
          const residencypermit = new RPermit(data);
          const savedresidencypermit = await residencypermit.save();
          docid = savedresidencypermit._id;

          console.log(savedresidencypermit._id);

          clientData[langCheck][modelCheck] = savedresidencypermit._id;
          await clientData.save();
        } else if (modelCheck.includes("Card")) {
          const card = new IDCard(data);
          const cardid = await card.save();
          docid = cardid._id;

          console.log(cardid._id);

          clientData[langCheck][modelCheck] = cardid._id;
          await clientData.save();
        } else if (modelCheck.includes("MoF")) {
          const mof = new MoF(data);
          const mofid = await mof.save();
          docid = mofid._id;

          console.log(mofid._id);

          clientData[langCheck][modelCheck] = mofid._id;
          await clientData.save();
        } else if (modelCheck.includes("Residence")) {
          const residence = new Residence(data);
          const residenceid = await residence.save();
          docid = residenceid._id;

          console.log(residenceid._id);

          clientData[langCheck][modelCheck] = residenceid._id;
          await clientData.save();
        } else if (modelCheck.includes("PrivateDriver")) {
          const private = new Private(data);
          const privateid = await private.save();
          docid = privateid._id;

          console.log(privateid._id);

          clientData[langCheck][modelCheck] = privateid._id;
          await clientData.save();
        } else if (modelCheck.includes("Police")) {
          const police = new Police(data);
          const policeid = await police.save();
          docid = policeid._id;

          console.log(policeid._id);

          clientData[langCheck][modelCheck] = policeid._id;
          await clientData.save();
        } else if (modelCheck.includes("NSSF")) {
          const nssf = new NSSF(data);
          const nssfid = await nssf.save();
          docid = nssfid._id;

          console.log(nssfid._id);

          clientData[langCheck][modelCheck] = nssfid._id;
          await clientData.save();
        } else if (modelCheck.includes("Individual")) {
          const individual = new Individual(data);
          const individualid = await individual.save();
          docid = individualid._id;

          console.log(individualid._id);

          clientData[langCheck][modelCheck] = individualid._id;
          await clientData.save();
        } else if (modelCheck.includes("Family")) {
          const family = new Family(data);
          const familyid = await family.save();
          docid = familyid._id;

          console.log(familyid._id);

          clientData[langCheck][modelCheck] = familyid._id;
          await clientData.save();
        } else if (modelCheck.includes("Consent")) {
          const consent = new Consent(data);
          const consentid = await consent.save();
          docid = consentid._id;

          console.log(consentid._id);

          clientData[langCheck][modelCheck] = consentid._id;
          await clientData.save();
        } else if (modelCheck.includes("Driver")) {
          const driver = new Driver(data);
          const driverid = await driver.save();
          docid = driverid._id;

          console.log(driverid._id);

          clientData[langCheck][modelCheck] = driverid._id;
          await clientData.save();
        } else if (modelCheck.includes("Empty")) {
          const empty = new ETemplate(data);
          const emptyid = await empty.save();
          docid = emptyid._id;

          console.log(emptyid._id);

          clientData[langCheck][modelCheck] = emptyid._id;
          await clientData.save();
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

        var query = Paid.find({}, { s0: 0, __v: 0 });
        query.exec(function (err, result) {
          if (!err) {
            const paidfile = fs.readFileSync(paidpath, "utf-8");
            var paid_template = ejs.compile(paidfile, { client: true });
            const paid = paid_template({
              obj: data,
              clientname: result,
              docid: docid,
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
    // res.status(500).send(err)
  }
});

function downloadLink(datetime, modelCheck, clientName) {
  var outputPath =
    "./Output/" + modelCheck + " - " + clientName + " - " + datetime + ".docx";

  return [outputPath, modelCheck + " - " + clientName + " - " + datetime];
}

// add mongo id for the user
function GenerateDocx(data, docxPath, docArray, modelCheck, clientName) {
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

  var datetime = docArray["date"];

  var outputPath =
    "./Output/" + modelCheck + " - " + clientName + " - " + datetime + ".docx";
  // Get the path that been enter in mongo file for the client and save it with these path
  fs.writeFileSync(outputPath, buf);

  //[outputPath, modelCheck + ' ' + datetime];
  //return outputPath
  return [outputPath, modelCheck + " - " + clientName + " - " + datetime];
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

async function addClient(a) {
  try {
    console.log("addclient");
    //var targetinfo = req.body
    if (!isEmptyOrSpaces(a.fullname)) {
      var data = {
        fullname: a.fullname,
        s0: {
          name: a["s0.name"],
          surname: a["s0.surname"],
          father: a["s0.father"],
          mother: a["s0.mother"],
          mothersurname: "",
          nationaltiy: "",
          sex: a["s0.sex"],
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
          placeofbirthlocal: a["s0.placeofbirthlocal"],
          placeofbirthdistrict: "",
          dateofbirth: a["s0.dateofbirth"],
          placeregistry: "",
          noregistry: a["s0.noregistry"],
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
      };

      // let promise = new Promise((resolve, reject) => {
      //   setTimeout(() => resolve("done!"), 1000)
      // });

      const client = new Client(data);
      const savedClient = await client.save();

      //console.log('save new client :' + savedClient)

      // wait 3 seconds
      await new Promise((resolve, reject) => setTimeout(resolve, 500));

      console.log(savedClient["_id"] + "asdfsadfds");

      return savedClient["_id"];
    }
  } catch (err) {
    console.log(err);
  }
}

function isUndefinedOrNull(str) {
  return str == null;
}

function isEmptyOrSpaces(str) {
  return str === null || str.match(/^ *$/) !== null;
}

module.exports = router;
