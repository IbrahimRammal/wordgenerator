var express = require('express')
var path = require('path')
var session = require('express-session');
var cookieParser = require('cookie-parser')
// var ejs = require('ejs')
var bodyParser = require('body-parser')
// var fs = require('fs');
// var https = require('https');
const port = process.env.PORT
const verify = require('./middleware/verifyToken');


//const userRouter = require('./routers/user')

const app = express()


app.use(express.static(path.join("/home/ubt/gitWordGenerator/wordgenerator", 'public')));

//Import ROutes
const authRoute = require('./routers/auth');
const postRoute = require('./routers/posts');
const actionRoute = require('./routers/actions');
const actionManage = require('./routers/manage');

//connect to mongoose
require('./db/db');

app.use(bodyParser.urlencoded({
    extended: true
  }));

//Middleware
app.use(express.json())

app.use(cookieParser());

//Route Middlewares
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);
app.use('/api/actions', actionRoute);
app.use('/api/manage', actionManage);

app.get('*',verify, function(req, res, next) {
    res.render('blank',{ 
      name: req.name,
      email: req.email
  });
});

app.get('*', function(req, res, next) {
  res.render('login');
});

app.set('view engine', 'ejs')

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
