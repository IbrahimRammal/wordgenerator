const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verify = require("../middleware/verifyToken");
const bodyParser = require("body-parser");
const fs = require("fs");
var ejs = require("ejs");
var path = require("path");
const Expense = require("../models/Expense");

const {
  registerValidation,
  loginValidation,
} = require("../validate/validation");

router.get("/users", verify, async (req, res) => {
  try {
    req.keep = "true";
    res.render("users", {
      name: req.name,
      email: req.email,
    });
  } catch (err) {
    console.log(err);
    // res.status(500).send({ error: 'Something failed!' })
  }
});

router.post("/User/BatchData", verify, async (req, res) => {
  // console.log(req.body);

  try {

    if (req.role == "User" || req.role == "Admin") {
      res.redirect("/api/manage/403");
      return;
    }
    
    // console.log(req.body.value);
    var a = req.body.value;
    console.log(a);

    var data = "";

    var result = "";

    var respnseAddID = "";
    if (req.body.action == "insert") {
      // console.log(a)
      var userData = {};

      var now = new Date();

      console.log("insert User" + a);

      userData.name = a.name;
      userData.email = a.email;
      userData.role = a.role;

      console.log("password: " + a.password);

      //Hash passwords
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(a.password, salt);

      console.log(hashedPassword);

      // userData.created_at = now;
      // userData.updated_at = now;

      const user = new User({
        name: a.name,
        email: a.email,
        password: hashedPassword,
        role: a.role,
      });
      const savedPaid = await user.save();

      userData._id = savedPaid._id;
      userData.date = now;
      // userData.password = savedPaid.password;
      result = userData;

      // console.log("New Client Paid: " + json.stringify(paid))
    }
    if (req.body.action == "update") {
      var pass = a.password;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(pass, salt);

      await User.findById(req.body["key"], function (err, userRecored) {
        if (err) {
          console.log(err);
        } else {
          var now = new Date();
          userRecored.name = a.name;
          userRecored.email = a.email;
          userRecored.role = a.role;
          if (pass != null && !isEmptyOrSpaces(a.password)) {
            userRecored.password = hashedPassword;
          }

          userRecored.save(function (err) {
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

      console.log("removed" + req.body["key"]);

      await User.findByIdAndDelete(req.body["key"], function (err, user) {
        console.log("delete user " + user);
        if (err) console.log(err);
        // createHistoryLog(req.email,"Delete Expense", "Delete Expense for client " + isUndefinedOrNull(user.name) ? "" : user.name, req.id);
        console.log("Successful deletion");
      });
    }

    res.send(result);
  } catch (err) {
    console.log(err);
    res.send("error");
  }
});

router.post("/User/GetData", verify, async (req, res) => {
  // console.log(req.body);
  if (req.role == "User" || req.role == "Admin") {
    res.redirect("/api/manage/403");
    return;
  }
  console.log(req.body);

  //   var result = [{}];
  //   var user = await User.findById("5ea4a4585bf48e2786fdb232");
  // user.role = "SuperAdmin";
  // user.save();
  var result = await User.find(
    { role: { $nin: ["SuperAdmin", "SuperAdmin", "Observer"] } },
    { password: 0 }
  ).sort({date: 'descending'}).exec();

  console.log(result);
  res.send(result);
});

router.get("/User", verify, async (req, res) => {
  // console.log(req.body);
  if (req.role == "User" || req.role == "Admin") {
    res.redirect("/api/manage/403");
    return;
  }

  res.render("managment", {
    // req.session.
    name: req.name,
    email: req.email,
    //data: data
  });
});

router.get("/403", verify, async (req, res) => {
  // console.log(req.body);
  res.render("nopermisssion", {
    // req.session.
    name: req.name,
    email: req.email,
    //data: data
  });
});

router.get("/paid", verify, async (req, res) => {
  // console.log(req.body);
  req.keep = "true";

  res.render("paid", {
    // req.session.
    name: req.name,
    email: req.email,
    //data: data
  });
});

router.get("/expense", verify, async (req, res) => {
  if (req.role == "User") {
    res.redirect("/api/manage/403");
  }

  console.log("expense loddingg");

  var query = await Expense.find({});

  let totalExpense = 0;
  let totalIncome = 0;

  let prontoExpense = 0;
  let unofficalExpense = 0;
  let swornExpense = 0;
  let prontoIncome = 0;
  let unofficalIncome = 0;
  let swornIncome = 0;

  let expense = {
    expenses: 0,
    income: 0,
    totalAmountSum: 0,
    prontoExpense: 0,
    unofficalExpense: 0,
    swornExpense: 0,
    prontoIncome: 0,
    unofficalIncome: 0,
    swornIncome: 0
  };

  for (var j = 0; j < query.length; j++) {
    var total = query[j].total - query[j].paid;
    // console.log(query[j])

    if (
      query[j]["category"] != null &&
      query[j]["category"].includes("Expenses") &&
      query[j]["type"] != null
    ) {
      console.log("expense");
      totalExpense = totalExpense + total;
      console.log("Type json object " + query[j]["type"]);
      if(query[j]["type"] == "PRONTO")
      {
        console.log("Type json object " + query[j]["type"]);
        prontoExpense = prontoExpense + total;
      } else if(query[j]["type"] == "SWORN LEGA"){
        swornExpense = swornExpense + total;
      } else if(query[j]["type"] == "UNOFFICIAL"){
        unofficalExpense = unofficalExpense + total;
      } else {}
    } else if (
      query[j]["category"] != null &&
      query[j]["category"].includes("Income")
    ) {
      totalIncome = totalIncome + query[j].paid;
      console.log("income");
      console.log("Type json object" + query[j]["type"]);
      console.log("Type jsossdsddsdsn object" + query[j]["type"]);
      if(query[j]["type"] == "PRONTO")
      {
        console.log("Type jsossdsddsdsn object" + query[j]["type"]);
        prontoIncome = prontoIncome + query[j].paid;
      } else if(query[j]["type"] == "SWORN LEGAL"){
        swornIncome = swornIncome + query[j].paid;
      } else if(query[j]["type"] == "UNOFFICIAL"){
        unofficalIncome = unofficalIncome + query[j].paid;
      } else {}
    } else {
      console.log("asdfljaslkdf" + query[j]["category"]);
    }
  }

  expense.expenses = totalExpense;
  expense.income = totalIncome;
  expense.prontoExpense = prontoExpense;
  expense.swornExpense = swornExpense;
  expense.unofficalExpense = unofficalExpense;
  expense.prontoIncome = prontoIncome;
  expense.swornIncome = swornIncome;
  expense.unofficalIncome = unofficalIncome;

  console.log("Expnense json object" + expense.swornIncome);
  //after finish loop parent json

  req.keep = "true";

  res.render("expense", {
    // req.session.
    name: req.name,
    email: req.email,
    expense: expense,
    //data: data
  });
  // res.finished
});

router.get("/clients", verify, async (req, res) => {
  // console.log(req.body);
  req.keep = "true";

  res.render("view", {
    // req.session.
    name: req.name,
    email: req.email,
    //data: data
  });
});

router.get("/payment", verify, async (req, res) => {
  // console.log(req.body);
  req.keep = "true";

  res.render("payment", {
    // req.session.
    name: req.name,
    email: req.email,
    //data: data
  });
});

router.get("/invoice", verify, async (req, res) => {
  // console.log(req.body);
  req.keep = "true";

  res.render("invoice", {
    // req.session.
    name: req.name,
    email: req.email,
    //data: data
  });
});

function isEmptyOrSpaces(str) {
  return str === null || str.match(/^ *$/) !== null;
}

module.exports = router;
