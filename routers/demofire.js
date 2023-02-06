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
const PaidModel = require("../models/Paid");
const Paid = PaidModel.Paid;
const Payment = PaidModel.Payment;

const SwornReceiptVoucherS = require("../models/SwornReceiptVoucher");
const SwornRV = SwornReceiptVoucherS.SwornRV;
const SwornReceiptCounter = SwornReceiptVoucherS.SwornReceiptCounter; 

const SwornPaymentVoucherS = require("../models/SwornPaymentVoucher");
const SwornPV = SwornPaymentVoucherS.SwornPV;
const SwornPaymentCounter = SwornPaymentVoucherS.SwornPaymentCounter; 


const ProntoReceiptVoucherS = require("../models/ProntoReceiptVoucher");
const ProntoRV = ProntoReceiptVoucherS.ProntoRV;
const ProntoReceiptCounter = ProntoReceiptVoucherS.ProntoReceiptCounter; 

const ProntoPaymentVoucherS = require("../models/ProntoPaymentVoucher");
const ProntoPV = ProntoPaymentVoucherS.ProntoPV;
const ProntoPaymentCounter = ProntoPaymentVoucherS.ProntoPaymentCounter; 

const UnofficialReceiptVoucherS = require("../models/UnofficialReceiptVoucher");
const UnofficialRV = UnofficialReceiptVoucherS.UnofficialRV;
const UnofficialReceiptCounter = UnofficialReceiptVoucherS.UnofficialReceiptCounter; 

const UnofficialPaymentVoucherS = require("../models/UnofficialPaymentVoucher");
const UnofficialPV = UnofficialPaymentVoucherS.UnofficialPV;
const UnofficialPaymentCounter = UnofficialPaymentVoucherS.UnofficialPaymentCounter; 

//FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF
const ProntoInvoiceS = require("../models/ProntoInvoice");
const ProntoIV = ProntoInvoiceS.ProntoInvoice;
const ProntoInvoiceCounter = ProntoInvoiceS.ProntoInvoiceCounter; 

const SwornInvoiceS = require("../models/SwornInvoice");
const SwornIV = SwornInvoiceS.SwornInvoice;
const SwornInvoiceCounter = SwornInvoiceS.SwornInvoiceCounter; 

const PurchaseInvoiceS = require("../models/PurchaseInvoice");
const PurchaseIV = PurchaseInvoiceS.PurchaseInvoice;
const PurchaseInvoiceCounter = PurchaseInvoiceS.PurchaseInvoiceCounter; 

const UnofficialPurchaseInvoice = require("../models/UnofficialPurchaseInvoice");
const UnofficialPurchaseIV = UnofficialPurchaseInvoice.UnofficialPurchaseInvoice;
const UnofficialPurchaseInvoiceCounter = UnofficialPurchaseInvoice.UnofficialPurchaseInvoiceCounter; 

const ProntoPurchaseInvoice = require("../models/ProntoPurchaseInvoice");
const ProntoPurchaseIV = ProntoPurchaseInvoice.ProntoPurchaseInvoice;
const ProntoPurchaseInvoiceCounter = ProntoPurchaseInvoice.ProntoPurchaseInvoiceCounter; 

const UnofficialInvoiceS = require("../models/UnofficialInvoice");
const UnofficialIV = UnofficialInvoiceS.UnofficialInvoice;
const UnofficialInvoiceCounter = UnofficialInvoiceS.UnofficialInvoiceCounter; 


const Transaction = require("../models/Transaction");


const {
  registerValidation,
  loginValidation,
} = require("../validate/validation");

router.get("/countermanage", verify, async (req, res) => {
    // console.log(req.body);
    // req.keep = "true";
  
    res.render("counterinvoice", {
      // req.session.
      name: req.name,
      email: req.email,
      //data: data
    });
  });

  router.post("/Counter/GetData", verify, async (req, res) => {

    
    var query = [];
    var seqNumber = 1;

    const savedSwornInvoiceRC = await SwornInvoiceCounter.findById({_id:'61f7f1819d18dd4559a00a7d'});
    seqNumber = savedSwornInvoiceRC.seq;
    query.push({"name": "SwornInvoiceCounter", "number": seqNumber});
    
    const savedProntoInvoiceRC = await ProntoInvoiceCounter.findById({_id:'61f7f1819d18dd4559a00a7d'});
    seqNumber = savedProntoInvoiceRC.seq;
    query.push({"name": "ProntoInvoiceCounter", "number": seqNumber});

    const savedUnofficialInvoiceRC = await UnofficialInvoiceCounter.findById({_id:'61f7f1819d18dd4559a00a7d'});
    seqNumber = savedUnofficialInvoiceRC.seq;
    query.push({"name": "UnofficialInvoiceCounter", "number": seqNumber});
    console.log(savedUnofficialInvoiceRC);

    const savedProntoPC = await ProntoPurchaseInvoiceCounter.findById({_id:'61f7f1819d18dd4559a00a7d'});
    seqNumber = savedProntoPC.seq;
    query.push({"name": "ProntoPurchaseInvoiceCounter", "number": seqNumber});

    const savedUnofficialPC = await UnofficialPurchaseInvoiceCounter.findById({_id:'61f7f1819d18dd4559a00a7d'});
    seqNumber = savedUnofficialPC.seq;
    query.push({"name": "UnofficialPurchaseInvoiceCounter", "number": seqNumber});

    res.send(query);
  });
  
  router.post("/Counter/BatchData", verify, async (req, res) => {
    try {
      //console.log(req.body.value);
      var counterEdit = req.body.value;
  
      var data = "";  
      var result = "";  
      var now = new Date();
  
      //console.log("insert pyament" + a);
    //   console.log("action: " + req.body.action);
    //   console.log("req.body.value: " + req.body);
    //   for (const [key, value] of Object.entries(req.body)) {
    //     console.log(`${key}: ${value}`);
    //   }
      
      if (req.body.action == "update") {
        if(counterEdit.name == "SwornInvoiceCounter"){
            console.log(counterEdit.name);
            var CounterNumverEdit = await SwornInvoiceCounter.updateOne(
                { _id: '61f7f1819d18dd4559a00a7d' },
                {
                  $set: {
                    // "invoice.$.category": req.body.value.category,
                    "seq": counterEdit.number,
                  },
                },
                function (error, updatedData) {
                  if (error) {
                  }
        
                  console.log(updatedData);
                }
              );
        } else if (counterEdit.name == "ProntoInvoiceCounter")
        {
            console.log(counterEdit.name);
            var CounterNumverEdit = await ProntoInvoiceCounter.updateOne(
                { _id: '61f7f1819d18dd4559a00a7d' },
                {
                  $set: {
                    // "invoice.$.category": req.body.value.category,
                    "seq": counterEdit.number,
                  },
                },
                function (error, updatedData) {
                  if (error) {
                  }
        
                  console.log(updatedData);
                }
              );
        }  else if (counterEdit.name == "UnofficialInvoiceCounter")
        {
            console.log(counterEdit.name);
            var CounterNumverEdit = await UnofficialInvoiceCounter.updateOne(
                { _id: '61f7f1819d18dd4559a00a7d' },
                {
                  $set: {
                    // "invoice.$.category": req.body.value.category,
                    "seq": counterEdit.number,
                  },
                },
                function (error, updatedData) {
                  if (error) {
                  }
        
                  console.log(updatedData);
                }
              );
        }  else if (counterEdit.name == "ProntoPurchaseInvoiceCounter")
        {
            console.log(counterEdit.name);
            var CounterNumverEdit = await ProntoPurchaseInvoiceCounter.updateOne(
                { _id: '61f7f1819d18dd4559a00a7d' },
                {
                  $set: {
                    // "invoice.$.category": req.body.value.category,
                    "seq": counterEdit.number,
                  },
                },
                function (error, updatedData) {
                  if (error) {
                  }
        
                  console.log(updatedData);
                }
              );
        }  else if (counterEdit.name == "UnofficialPurchaseInvoiceCounter")
        {
            console.log(counterEdit.name);
            var CounterNumverEdit = await UnofficialPurchaseInvoiceCounter.updateOne(
                { _id: '61f7f1819d18dd4559a00a7d' },
                {
                  $set: {
                    // "invoice.$.category": req.body.value.category,
                    "seq": counterEdit.number,
                  },
                },
                function (error, updatedData) {
                  if (error) {
                  }
        
                  console.log(updatedData);
                }
              );
        } else {}
      }
  
      res.send(result);
    } catch (err) {
      console.log("Error: " + err);
      res.send("error");
    }
  });
  


router.get("/firemongo", verify, async (req, res) => {
    try{
        // console.log(req.body);
        req.keep = "true";

        const savedProntoPurchasePaymentCounter = await ProntoPurchaseInvoiceCounter({_id: "61f7f1819d18dd4559a00a7d"});
        const savedProntoPurchasePC = await savedProntoPurchasePaymentCounter.save();
        docid = savedProntoPurchasePC._id;

        const savedUnofficialPurchasePaymentCounter = await UnofficialPurchaseInvoiceCounter({_id: "61f7f1819d18dd4559a00a7d"});
        const savedUnofficialPurchasePC = await savedUnofficialPurchasePaymentCounter.save();
        docid = savedUnofficialPurchasePC._id;

        const savedSwornCounter = await SwornInvoiceCounter({_id: "61f7f1819d18dd4559a00a7d"});
        const savedSworn = await savedSwornCounter.save();
        docid = savedSworn._id;

        const savedProntoCounter = await ProntoInvoiceCounter({_id: "61f7f1819d18dd4559a00a7d"});
        const savedPronto = await savedProntoCounter.save();
        docid = savedPronto._id;

        const savedUnofficialCounter = await UnofficialInvoiceCounter({_id: "61f7f1819d18dd4559a00a7d"});
        const savedUnofficial = await savedUnofficialCounter.save();
        docid = savedUnofficial._id;

        const savedSwornReceiptCounter = await SwornReceiptCounter({_id: "61f7f1819d18dd4559a00a7d"});
        const savedSwornRC = await savedSwornReceiptCounter.save();
        docid = savedSwornRC._id;

        const savedSwornPaymentCounter = await SwornPaymentCounter({_id: "61f7f1819d18dd4559a00a7d"});
        const savedSwornPC = await savedSwornPaymentCounter.save();
        docid = savedSwornPC._id;

        const savedProntoReceiptCounter = await ProntoReceiptCounter({_id: "61f7f1819d18dd4559a00a7d"});
        const savedProntoRC = await savedProntoReceiptCounter.save();
        docid = savedProntoRC._id;

        const savedProntoPaymentCounter = await ProntoPaymentCounter({_id: "61f7f1819d18dd4559a00a7d"});
        const savedProntoPC = await savedProntoPaymentCounter.save();
        docid = savedProntoPC._id;

        const savedUnofficialReceiptCounter = await UnofficialReceiptCounter({_id: "61f7f1819d18dd4559a00a7d"});
        const savedUnofficialRC = await savedUnofficialReceiptCounter.save();
        docid = savedUnofficialRC._id;

        const savedUnofficialPaymentCounter = await UnofficialPaymentCounter({_id: "61f7f1819d18dd4559a00a7d"});
        const savedUnofficialPC = await savedUnofficialPaymentCounter.save();
        docid = savedUnofficialPC._id;

        const savedPurchasePaymentCounter = await PurchaseInvoiceCounter({_id: "61f7f1819d18dd4559a00a7d"});
        const savedPurchasePC = await savedPurchasePaymentCounter.save();
        docid = savedPurchasePC._id;



        //console.log(savedSwornRC)

        res.render("404", {
            // req.session.
            name: req.name,
            email: req.email,
            //data: data
        });
    }
    catch(err) { console.log(err)}
});

router.get("/firemongoc", verify, async (req, res) => {
    try{
        // console.log(req.body);
        req.keep = "true";

        //const savedSwornReceiptCounter = await SwornReceiptCounter({_id: "61f7f1819d18dd4559a00a7c"});

        const savedSwornInvoiceRC = await SwornInvoiceCounter.find();
        docid = savedSwornInvoiceRC._id;
        console.log(savedSwornInvoiceRC)

        const savedProntoInvoiceRC = await ProntoInvoiceCounter.find();
        docid = savedProntoInvoiceRC._id;
        console.log(savedProntoInvoiceRC)

        const savedPurchaseInvoiceRC = await PurchaseInvoiceCounter.find();
        docid = savedPurchaseInvoiceRC._id;
        console.log(savedPurchaseInvoiceRC)

        const savedUnofficialInvoiceRC = await UnofficialInvoiceCounter.find();
        docid = savedUnofficialInvoiceRC._id;
        console.log(savedUnofficialInvoiceRC)

        
        const savedSwornRC = await SwornReceiptCounter.find();
        docid = savedSwornRC._id;
        console.log(savedSwornRC)
        

        const savedSwornPC = await SwornPaymentCounter.find();
        docid = savedSwornPC._id;
        console.log(savedSwornPC)

        const savedProntoRC = await ProntoReceiptCounter.find();
        docid = savedProntoRC._id;
        console.log(savedProntoRC)

        const savedProntoPC = await ProntoPaymentCounter.find();
        docid = savedProntoPC._id;
        console.log(savedProntoPC)

        const savedUnofficialRC = await UnofficialReceiptCounter.find();
        docid = savedUnofficialRC._id;
        console.log(savedUnofficialRC)

        const savedUnofficialPC = await UnofficialPaymentCounter.find();
        docid = savedUnofficialPC._id;
        console.log(savedUnofficialPC)

        

        res.render("404", {
            // req.session.
            name: req.name,
            email: req.email,
            //data: data
        });
    }
    catch(err) { console.log(err)}
  });

  router.get("/transaction", verify, async (req, res) => {
    try{
        // console.log(req.body);
        req.keep = "true";
    
        //const savedSwornReceiptCounter = await SwornReceiptCounter({_id: "61f7f1819d18dd4559a00a7c"});
    
        const savedTransaction = await Transaction.find();
        docid = savedTransaction._id;
        console.log(savedTransaction)
        
    
        res.render("404", {
            // req.session.
            name: req.name,
            email: req.email,
            //data: data
        });
    }
    catch(err) { console.log(err)}
    });


router.get("/invoicelist", verify, async (req, res) => {
try{
    // console.log(req.body);
    req.keep = "true";

    //const savedSwornReceiptCounter = await SwornReceiptCounter({_id: "61f7f1819d18dd4559a00a7c"});

    const savedSwornInvoice = await SwornIV.find();
    docid = savedSwornInvoice._id;
    console.log(savedSwornInvoice)

    const savedProntoInvoice = await ProntoIV.find();
    docid = savedProntoInvoice._id;
    console.log(savedProntoInvoice)
    

    res.render("404", {
        // req.session.
        name: req.name,
        email: req.email,
        //data: data
    });
}
catch(err) { console.log(err)}
});



router.get("/invoicedeleteall", verify, async (req, res) => {
    try{
        // console.log(req.body);
        req.keep = "true";
    
        //const savedSwornReceiptCounter = await SwornReceiptCounter({_id: "61f7f1819d18dd4559a00a7c"});
    
        const savedSwornInvoice = await SwornIV.remove({});
        const savedProntoInvoice = await ProntoIV.remove({});
        const savedUnofficialInvoice = await UnofficialIV.remove({});
        const savedPurchaseInvoice = await PurchaseIV.remove({});
        const savedProntoPurchaseInvoice = await ProntoPurchaseIV.remove({});
        const savedUnofficialPurchaseInvoice = await UnofficialPurchaseIV.remove({});

        const savedSwornCounter = await SwornInvoiceCounter.remove({});
        const savedProntoCounter = await ProntoInvoiceCounter.remove({});
        const savedUnofficialCounter = await UnofficialInvoiceCounter.remove({});
        const purchaseCounter = await PurchaseInvoiceCounter.remove({});
        const prontoPurchaseCounter = await ProntoPurchaseInvoiceCounter.remove({});
        const unofficialPurchaseCounter = await UnofficialPurchaseInvoiceCounter.remove({});


        const swornReceiptVoucherS = await SwornRV.remove({});
        const swornPaymentVoucherS = await SwornPV.remove({});
        const swornPaymentCounter = await SwornPaymentCounter.remove({});
        const swornReceiptCounter = await SwornReceiptCounter.remove({});

        const prontoReceiptVoucherS = await ProntoRV.remove({});
        const prontoPaymentVoucherS = await ProntoPV.remove({});
        const prontoReceiptCounter = await ProntoReceiptCounter.remove({});
        const prontoPaymentCounter = await ProntoPaymentCounter.remove({});

        const unofficialReceiptVoucherS = await UnofficialRV.remove({});
        const unofficialPaymentVoucherS = await UnofficialPV.remove({});
        const unofficialReceiptCounter = await UnofficialReceiptCounter.remove({});
        const unofficialPaymentCounter = await UnofficialPaymentCounter.remove({});

        const transaction = await Transaction.remove({});
        
    
        res.render("404", {
            // req.session.
            name: req.name,
            email: req.email,
            //data: data
        });
    }
    catch(err) { console.log(err)}
});
    


router.get("/firemongoinvoice", verify, async (req, res) => {
    try{
        // console.log(req.body);
        req.keep = "true";

        //const ProntoInvoiceCounter = ProntoInvoiceS.ProntoInvoiceCounter; 

        const prontoInvoiceCounter = await ProntoInvoiceCounter({_id: "61f7f1819d18dd4559a00a7d"});
        const savedProntoRC = await prontoInvoiceCounter.save();
        docid = savedProntoRC._id;

        const swornInvoiceCounter = await SwornInvoiceCounter({_id: "61f7f1819d18dd4559a00a7d"});
        const savedSwornRC = await swornInvoiceCounter.save();
        docid = savedSwornRC._id;

        const purchaseInvoiceCounter = await PurchaseInvoiceCounter({_id: "61f7f1819d18dd4559a00a7d"});
        const savedPurchaseRC = await purchaseInvoiceCounter.save();
        docid = savedPurchaseRC._id;

        const unofficialInvoiceCounter = await UnofficialInvoiceCounter({_id: "61f7f1819d18dd4559a00a7d"});
        const savedUnofficialRC = await unofficialInvoiceCounter.save();
        docid = savedUnofficialRC._id;

        //console.log(savedSwornRC)

        res.render("404", {
            // req.session.
            name: req.name,
            email: req.email,
            //data: data
        });
    }
    catch(err) { console.log(err)}
});

function isEmptyOrSpaces(str) {
  return str === null || str.match(/^ *$/) !== null;
}

module.exports = router;
