const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verify = require("../middleware/verifyToken");
const bodyParser = require("body-parser");
const Client = require("../models/Clients");
const {
  registerValidation,
  loginValidation,
} = require("../validate/validation");

router.post("/register", async (req, res) => {
  var superKey = req.body["challenge"];

  if (superKey == "852456951753852456951753") {
    return;
  } else {
    return;
  }

  delete req.body["challenge"];
  delete req.body["passwordConf"];
  //console.log(req.body);
  //Lets validate the data before we a user
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Checking if the user is already in the database
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already exists");

  //Hash passwords
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    role: "SuperAdmin"
  });

  try {
    const savedUser = await user.save();
    res.render("login");
    //res.send({user: user._id});
  } catch (error) {
    res.status(400).send(error);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  //Lets validate the data before we a user
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Checking if the email is already in the database
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email doest exists"); //Email or password is wrong

  // //Password is Correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Invalid Password");

  //Create and assign a token
  const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY, {
    expiresIn: "24h",
  });
  //console.log(token);

//   const token = jwt.sign({user:username},'secret_key')
// //save token in cookie
// res.cookie('authcookie',token,{maxAge:900000,httpOnly:true}) 
// })

  //res.header('auth-token', token);
  // res.cookie("auth", token);
  // secure: true,
  res.cookie("auth", token,{httpOnly:true});
  //res.cookie('name',user.name);
  //res.cookie('email',user.email);
  //req.user = user;
  //req.token = token;

  var query = Client.find({}, { s0: 0, __v: 0 });
  query.exec(function (err, result) {
    if (!err) {
      //let rawdata = "";
      //console.log(rawdata);
      //rawdata = result
      let dataReturn = result;

      console.log(result);

      //res.render('create',{
      // res.render("dashboard", {
      //   // req.session.
      //   name: user.name,
      //   email: user.email,
      //   clientname: result,
      // });
      res.redirect('/api/invoice/dashboard');

    } else {
      console.log(err);
    }
  });
});

router.get("/config", verify, async (req, res) => {
  //passwordConf password oldpass

  return res.render("config", {
    // req.session.
    name: req.name,
    email: req.email,
    role: req.role
  });
});

router.post("/config", verify, async (req, res) => {
  //passwordConf password oldpass

  console.log(req.email)
  var email = req.role == "SuperAdmin" ? req.body.email : req.email; 
  var myobject = {
    name: req.body.name,
    email: email,
    password: req.body.password,
  };
  console.log(myobject);

  const { error } = registerValidation(myobject);
  if (error) return res.status(400).send(error.details[0].message);

  //Checking if changing password for another user ..............

  console.log(req.id);
  console.log(req.email);

  //Checking if the email is already in the database
  if (req.email != email) {
    const modifyUser = await User.findOne({ email: email });
    if (modifyUser) {
      return res.status(400).send("Email already exists"); //Email or password is wrong
    }
  }

  //req.id

  // //Password is Correct
  const validPass = await bcrypt.compare(req.body.password_old, req.password);
  if (!validPass) return res.status(400).send("Invalid Password");

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(myobject.password, salt);

    const modifyUserData = await User.update(
      { _id: req.id },
      {
        $set: {
          name: req.body.name,
          email: email,
          password: hashedPassword,
        },
      },
      function (err, result) {
        console.log(result);
      }
    );

    // await req.user.save()

    var query = Client.find({}, { s0: 0, __v: 0 });
    query.exec(function (err, result) {
      if (!err) {
        //let rawdata = "";
        //console.log(rawdata);
        //rawdata = result
        let dataReturn = result;

        console.log(result);

        res.redirect("/api/invoice/dashboard");
        // res.render("/api/posts/dashboard", {
        //   // req.session.
        //   name: req.body.name,
        //   email: email,
        //   clientname: result,
        // });
      } else {
        console.log(err);
      }
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/", verify, (req, res) => {
  var query = Client.find({}, { s0: 0, __v: 0 });
  query.exec(function (err, result) {
    if (!err) {
      //let rawdata = "";
      //console.log(rawdata);
      //rawdata = result
      let dataReturn = result;

      console.log(result);

      res.render("index", {
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

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/logout", verify, async (req, res) => {
  try {
    res.clearCookie("auth");
    res.render("login");
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/logoutall", verify, async (req, res) => {
  // Log user out of all devices
  try {
    res.clearCookie("auth");
    res.render("login");
    //res.send()
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/register", function (req, res, next) {
  res.render("register");
});

function isEmptyOrSpaces(str) {
  return str === null || str.match(/^ *$/) !== null;
}

module.exports = router;
