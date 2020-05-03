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
  
  console.log("expense loddingg");

  var query = await Expense.find({});

  let totalExpense = 0;
  let totalIncome = 0;


  let expense = {
    expenses: 0,
    income: 0,
    totalAmountSum: 0
  };

  for (var j = 0; j < query.length; j++) {

    var total = query[j].total - query[j].paid;
    // console.log(query[j])

    if (query[j]["category"] != null && query[j]["category"].includes("Expenses")) {
      console.log("expense")
      totalExpense = totalExpense + total;
    } else if (query[j]["category"] != null && query[j]["category"].includes("Income")) {
      totalIncome = totalIncome + query[j].paid;
      console.log("income")
    } else {
      console.log("asdfljaslkdf" + query[j]["category"])
    }
  }
  

  expense.expenses = totalExpense;
  expense.income = totalIncome;

  console.log("Data income expense :  " + expense.income);
  console.log("Data income expense :  " + expense.expenses);
  //after finish loop parent json

  req.keep = "true";

  res.render("expense", {
    // req.session.
    name: req.name,
    email: req.email,
    expense: expense
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

module.exports = router;
