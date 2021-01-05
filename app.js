var express = require("express");
var path = require("path");
var https = require('https');
var http = require('http');
var fs = require('fs');
var session = require("express-session");
var cookieParser = require("cookie-parser");
// var ejs = require('ejs')
var bodyParser = require("body-parser");
// var fs = require('fs');
// var https = require('https');
const port = process.env.PORT;
const verify = require("./middleware/verifyToken");

// const compression = require('compression');

//const userRouter = require('./routers/user')

const app = express();

var options = {
  key: fs.readFileSync('/home/ubt/gitWordGenerator/wordgenerator/keys/private.key'),
  cert: fs.readFileSync('/home/ubt/gitWordGenerator/wordgenerator/keys/certificate.crt')
};

app.use(
  express.static(
    path.join("/home/ubt/gitWordGenerator/wordgenerator", "public")
  )
);

// Create an HTTP service.
http.createServer(app).listen(port);
// Create an HTTPS service identical to the HTTP service.
https.createServer(options, app).listen(443);

//Import ROutes
const authRoute = require("./routers/auth");
const postRoute = require("./routers/posts");
const actionRoute = require("./routers/actions");
const actionManage = require("./routers/manage");

//connect to mongoose
require("./db/db");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

////////////////////////
//   app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });
//////////////////////////

//Middleware
app.use(express.json());

app.use(cookieParser());

// app.use(compression());

//Route Middlewares
app.use("/api/user", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/actions", actionRoute);
app.use("/api/manage", actionManage);

// app.get('*', function(req, res) {  
//   res.redirect('https://' + req.headers.host + req.url);

//   // Or, if you don't want to automatically detect the domain name from the request header, you can hard code it:
//   // res.redirect('https://example.com' + req.url);
// });

app.get("/", verify, function (req, res, next) {
  res.redirect("/api/actions/dashboard");
  //   res.render('dashbord',{
  //     name: req.name,
  //     email: req.email
  // });
});

app.get("*", verify, function (req, res, next) {
  // if (req.keep != null && req.keep != "true") {
    res.redirect("/api/actions/404");
  // console.log("no route exits")
  //   res.render("404", {
  //     name: req.name,
  //     email: req.email,
  //   });
});

app.get("*", function (req, res, next) {
  res.render("login");
});

app.set("view engine", "ejs");

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });

