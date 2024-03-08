var express = require("express");
var path = require("path");
var https = require('https');
var http = require('http');
var fs = require('fs');
var session = require("express-session");
var cookieParser = require("cookie-parser");
// var ejs = require('ejs')
var bodyParser = require("body-parser");

/*jshint esversion: 8 */
var yargs = require('yargs');
var size = 0;
var copyName = "";
var location = "";
var isRenameChecking = false;
var accessDetails = null;
const archiver = require('archiver');
const multer = require('multer');
var cors = require('cors');
const pattern = /(\.\.\/)/g;

// const contentRootPath = yargs.argv.d;

// *****************************************************************

// var fs = require('fs');
var https = require('https');
const port = process.env.PORT;
const verify = require("./middleware/verifyToken");

// const compression = require('compression');

//const userRouter = require('./routers/user')

const app = express();

var agent = new https.Agent({
  keepAlive: true
 });

var options = {
  key: fs.readFileSync('/home/ubt/gitWordGenerator/wordgenerator/keys/private.key'),
  cert: fs.readFileSync('/home/ubt/gitWordGenerator/wordgenerator/keys/certificate.crt'),
  agent: agent
};

app.use(
  express.static(
    path.join("/home/ubt/gitWordGenerator/wordgenerator", "public"),{
      // etag: true, // Just being explicit about the default.
      // lastModified: true,  // Just being explicit about the default.
      // setHeaders: (res, path) => {
      //   const hashRegExp = new RegExp('\\.[0-9a-f]{8}\\.');
    
      //   if (path.endsWith('.html')) {
      //     // All of the project's HTML files end in .html
      //     res.setHeader('Cache-Control', 'no-cache');
      //   } else if (hashRegExp.test(path)) {
      //     // If the RegExp matched, then we have a versioned URL.
      //     res.setHeader('Cache-Control', 'max-age=31536000');
      //   }
      // },
    }
  )
);

// ********************
app.use(cors());
// *******************

// Create an HTTP service.
http.createServer(app).listen(port);
// Create an HTTPS service identical to the HTTP service.
https.createServer(options, app).listen(4333);

//Import ROutes
const authRoute = require("./routers/auth");
const postRoute = require("./routers/posts");
const actionRoute = require("./routers/actions");
const actionManage = require("./routers/manage");
const actionAdmin = require("./routers/admin");
const actionDemo = require("./routers/demofire");
const actionInvoice = require("./routers/invoice");
const actionVoucher = require("./routers/voucher");


//connect to mongoose
require("./db/db");


app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// app.use(express.static('public', {
//   etag: true, // Just being explicit about the default.
//   lastModified: true,  // Just being explicit about the default.
//   setHeaders: (res, path) => {
//     const hashRegExp = new RegExp('\\.[0-9a-f]{8}\\.');

//     if (path.endsWith('.html')) {
//       // All of the project's HTML files end in .html
//       res.setHeader('Cache-Control', 'no-cache');
//     } else if (hashRegExp.test(path)) {
//       // If the RegExp matched, then we have a versioned URL.
//       res.setHeader('Cache-Control', 'max-age=31536000');
//     }
//   },
// }));

////////////////////////
//   app.use(function (req, res, next) {
//     res.set('Cache-control', 'public, max-age=300');
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
app.use("/api/admin", actionAdmin);
app.use("/api/demofire", actionDemo);
app.use("/api/invoice", actionInvoice);
app.use("/api/voucher", actionVoucher);



// app.get('*', function(req, res) {  
//   res.redirect('https://' + req.headers.host + req.url);

//   // Or, if you don't want to automatically detect the domain name from the request header, you can hard code it:
//   // res.redirect('https://example.com' + req.url);
// });

app.get("/", verify, function (req, res, next) {
  res.redirect("/api/actions/create");
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

