const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const verify = require('../middleware/verifyToken')
const bodyParser = require('body-parser')
const fs = require('fs')
var ejs = require('ejs')
const Client = require('../models/Clients')

router.get('/create',verify ,(req,res) => {

    var query = Client.find({},{s0:0,__v:0})
    query.exec(function (err, result) {
      if (!err) {
        //let rawdata = "";
        //console.log(rawdata);
        //rawdata = result
        let dataReturn = result

        console.log(result)
  
        res.render('create',{ 
            // req.session.
            name: req.name,
            email: req.email,
            clientname:  result
        });
      } else {
        console.log(err);
      }
    })

    // res.render('create',{ 
    //     // req.session.
    //     name: req.name,
    //     email: req.email,
    //     data:  data
    // });
});


router.get('/view',verify , async (req,res) => {


  // console.log(req.body); 

  // var query = await Client.find({}, { English: 0, Español: 0, Français: 0, Arabic: 0, __v: 0 })

  // //console.log(JSON.stringify(query));

  // query = JSON.stringify(query);
  // //console.log(query)

  // let data = JSON.parse(query)

  //   res.status(200).send({
  //   success: 'true',
  //   message: 'todos retrieved successfully',
  //   result: data,
  //   Count: data.length
  // })

  //res.status(200).send({result: data, count: data.length})

  res.render('view',{ 
      // req.session.
      name: req.name,
      email: req.email
      //data: data
  });
});


module.exports = router;