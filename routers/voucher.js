// const compression = require('compression');
const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verify = require("../middleware/verifyToken");
const bodyParser = require("body-parser");
const fs = require("fs");
var ejs = require("ejs");
const Client = require("../models/Clients");

//const dateFormat = require("dateformat");
var PizZip = require("pizzip");
var Docxtemplater = require("docxtemplater");
var path = require("path");

var mongoose = require("mongoose");

//model client paider
const PaidModel = require("../models/Paid");
const SupplierModel = require("../models/Supplier");

const Expense = require("../models/Expense");

const History = require("../models/History");

const converter = require("number-to-words");
const { ToWords } = require('to-words');

const dollarConvert = new ToWords({
  localeCode: 'en-US',
  converterOptions: {
    currency: true,
    ignoreDecimal: false,
    ignoreZeroCurrency: false,
    doNotAddOnly: true,
    currencyOptions: { // can be used to override defaults for the selected locale
      name: 'Dollar',
      plural: 'Dollars',
      symbol: '$',
      fractionalUnit: {
        name: 'Cent',
        plural: 'Cents',
        symbol: '¢',
      },
    }
  }
});

// const liraConvert = new ToWords({
//   localeCode: 'en-US',
//   converterOptions: {
//     currency: true,
//     ignoreDecimal: false,
//     ignoreZeroCurrency: false,
//     doNotAddOnly: false,
//     currencyOptions: { // can be used to override defaults for the selected locale
//       name: 'Dollar',
//       plural: 'Dollars',
//       symbol: '$',
//       fractionalUnit: {
//         name: 'Cent',
//         plural: 'Cents',
//         symbol: '¢',
//       },
//     }
//   }
// });

const Paid = PaidModel.Paid;
const Suppliers = SupplierModel.Supplier;
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
const { query } = require("express");
const UnofficialPV = UnofficialPaymentVoucherS.UnofficialPV;
const UnofficialPaymentCounter = UnofficialPaymentVoucherS.UnofficialPaymentCounter; 

const SwornInvoice = require("../models/SwornInvoice");
const SwornIV = SwornInvoice.SwornInvoice;
const SwornInvoiceCounter = SwornInvoice.SwornInvoiceCounter; 


const ProntoInvoice = require("../models/ProntoInvoice");
const ProntoIV = ProntoInvoice.ProntoInvoice;
const ProntoInvoiceCounter = ProntoInvoice.ProntoInvoiceCounter; 


const UnofficialInvoice = require("../models/UnofficialInvoice");
const UnofficialIV = UnofficialInvoice.UnofficialInvoice;
const UnofficialInvoiceCounter = UnofficialInvoice.UnofficialInvoiceCounter; 

const PurchaseInvoice = require("../models/PurchaseInvoice");
const PurchaseIV = PurchaseInvoice.PurchaseInvoice;
const PurchaseInvoiceCounter = PurchaseInvoice.PurchaseInvoiceCounter; 

const ProntoPurchaseInvoice = require("../models/ProntoPurchaseInvoice");
const ProntoPurchaseIV = ProntoPurchaseInvoice.ProntoPurchaseInvoice;
const ProntoPurchaseInvoiceCounter = ProntoPurchaseInvoice.ProntoPurchaseInvoiceCounter; 

const UnofficialPurchaseInvoice = require("../models/UnofficialPurchaseInvoice");
const UnofficialPurchaseIV = UnofficialPurchaseInvoice.UnofficialPurchaseInvoice;
const UnofficialPurchaseInvoiceCounter = UnofficialPurchaseInvoice.UnofficialPurchaseInvoiceCounter; 

const Transaction = require("../models/Transaction");


router.post("/receiptedit/GetData", verify, async (req, res) => {
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

    if (req.body.action == "remove") {
      //console.log(req.body);
      //var keyID = mongoose.Types.ObjectId(req.body.key);
      console.log("removed" + req.body["key"]);
      console.log("removed" + req.body);
      // Equivalent to `parent.children.pull(_id)`
      var key = req.body["key"];
      var keys = [];
      keys = key.split("_");
      var anything = "";
      if(action == "purchase"){
        anything = await Suppliers.findById(keys[0], function (err, user) {
          if (err) {
            console.log(err);
          } else {
            //console.log();
            // createHistoryLog(req.email,"Delete Payment", "Delete Payment for client " + isUndefinedOrNull(user.fullname) ? "" : user.fullname, req.id);

            if (action == "unofficial") {
              user.unofficialInvoice.id(keys[1]).remove();
            } else if (action == "sworn") {
              user.swornInvoice.id(keys[1]).remove();
            } else if (action == "pronto") {
              user.prontoInvoice.id(keys[1]).remove();
            } else if (action == "purchase") {
              user.purchaseInvoice.id(keys[1]).remove();
              //console.log(query);
            } else {

            }      
            // Equivalent to `parent.child = null`
            //user.child.remove();
            user.save(function (err) {
              if (err) return handleError(err);
  
              console.log("the subdocs were removed");
            });
          }
        });

        console.log("anything" + anything);

        var deleted;

        if (action == "unofficial") {
          deleted = await UnofficialIV.findByIdAndDelete({_id: keys[2]})
          if(keys.length == 3 && keys[3]!= "undefined")
          {
            await UnofficialRV.findByIdAndDelete({_id: keys[3]});
          }
          //deleted = await UnofficialRV.findByIdAndDelete({_id: keys[2]})
          //deleted = await UnofficialPV.findByIdAndDelete({_id: keys[2]})
        } else if (action == "sworn") {
          deleted = await SwornIV.findByIdAndDelete({_id: keys[2]})
          //deleted = await SwornRV.findByIdAndDelete({_id: keys[2]})
          //deleted = await SwornPV.findByIdAndDelete({_id: keys[2]})
          if(keys.length == 3 && keys[3]!= "undefined")
          {
            await SwornRV.findByIdAndDelete({_id: keys[3]});
          }
        } else if (action == "pronto") {
          deleted = await ProntoIV.findByIdAndDelete({_id: keys[2]})
          //deleted = await ProntoRV.findByIdAndDelete({_id: keys[2]})
          //deleted = await ProntoPV.findByIdAndDelete({_id: keys[2]})
          if(keys.length == 3 && keys[3]!= "undefined")
          {
            await ProntoRV.findByIdAndDelete({_id: keys[3]});
          }
        } else if (action == "purchase") {
          deleted = await PurchaseIV.findByIdAndDelete({_id: keys[2]})
          if(keys.length == 3 && keys[3]!= "undefined")
          {
            //await PurchaseIV.findByIdAndDelete({_id: keys[5]});
          }
        } else {

        }  
      }
      else {
        anything = await Paid.findById(keys[0], function (err, user) {
          if (err) {
            console.log(err);
          } else {
            //console.log();
            // createHistoryLog(req.email,"Delete Payment", "Delete Payment for client " + isUndefinedOrNull(user.fullname) ? "" : user.fullname, req.id);

            if (action == "unofficial") {
              user.unofficialInvoice.id(keys[1]).remove();
            } else if (action == "sworn") {
              user.swornInvoice.id(keys[1]).remove();
            } else if (action == "pronto") {
              user.prontoInvoice.id(keys[1]).remove();
            } else if (action == "purchase") {
              user.purchaseInvoice.id(keys[1]).remove();
              //console.log(query);
            } else {

            }      
            // Equivalent to `parent.child = null`
            //user.child.remove();
            user.save(function (err) {
              if (err) return handleError(err);
  
              console.log("the subdocs were removed");
            });
          }
        });

        var deleted;

        if (action == "unofficial") {
          deleted = await UnofficialIV.findByIdAndDelete({_id: keys[2]})
          if(keys.length == 3 && keys[3]!= "undefined")
          {
            await UnofficialRV.findByIdAndDelete({_id: keys[3]});
          }
          //deleted = await UnofficialRV.findByIdAndDelete({_id: keys[2]})
          //deleted = await UnofficialPV.findByIdAndDelete({_id: keys[2]})
        } else if (action == "sworn") {
          deleted = await SwornIV.findByIdAndDelete({_id: keys[2]})
          //deleted = await SwornRV.findByIdAndDelete({_id: keys[2]})
          //deleted = await SwornPV.findByIdAndDelete({_id: keys[2]})
          if(keys.length == 3 && keys[3]!= "undefined")
          {
            await SwornRV.findByIdAndDelete({_id: keys[3]});
          }
        } else if (action == "pronto") {
          deleted = await ProntoIV.findByIdAndDelete({_id: keys[2]})
          //deleted = await ProntoRV.findByIdAndDelete({_id: keys[2]})
          //deleted = await ProntoPV.findByIdAndDelete({_id: keys[2]})
          if(keys.length == 3 && keys[3]!= "undefined")
          {
            await ProntoRV.findByIdAndDelete({_id: keys[3]});
          }
        } else if (action == "purchase") {
          deleted = await PurchaseIV.findByIdAndDelete({_id: keys[2]})
          if(keys.length == 3 && keys[3]!= "undefined")
          {
            //await PurchaseIV.findByIdAndDelete({_id: keys[5]});
          }
        } else {

        }  
      }

      if(keys.length == 4 && keys[4]!= "undefined")
      {
        await Transaction.findByIdAndDelete({_id: keys[5]});
      }

      await createHistoryLog(
        req.email,
        "Delete Invoice",
        "Delete Invoice from client " + anything.fullname,
        req.id
      );
      res.send({});
      return;
    }

    if (isEmptyOrSpaces(id) && action == "all") {
      query = await Paid.find(
        {},
        { English: 0, Español: 0, Français: 0, Arabic: 0, __v: 0 }
      );
    } else if (action == "unofficial") {

      query = await Paid.find(
        {},
        { English: 0, Español: 0, Français: 0, Arabic: 0, __v: 0 }
      );

    //console.log("queryinvoice.length " + query["invoice"].length); 
    for(var i = 0; i< query.length;i++){
    for (var j = 0; j < query[i]["unofficialInvoice"].length; j++) {
      //console.log(user["invoice"][j].href);
        try{
          //new
          // s1fi
          //console.log("query invoice" + query[i]["unofficialInvoice"]);
          let invoiceNumber = "";
        
          subParent = {
            //put parent id temor
            _id: query[i]["unofficialInvoice"][j].clientID,
            combineid: query[i]["unofficialInvoice"][j].clientID + "_" + query[i]["unofficialInvoice"][j]._id + "_" + query[i]["unofficialInvoice"][j].docid  + "_" + query[i]["unofficialInvoice"][j].voucher  + "_" + query[i]["unofficialInvoice"][j].transcation,
            paymentid: query[i]["unofficialInvoice"][j].clientID,
            clientID: query[i]["unofficialInvoice"][j].clientID,
            fullname: query[i]["unofficialInvoice"][j].fullname,
            docid: query[i]["unofficialInvoice"][j].docid,
            invoiceNumber: query[i]["unofficialInvoice"][j].invoiceNumber,
            countervalue: query[i]["unofficialInvoice"][j].countervalue,
            transcation: query[i]["unofficialInvoice"][j].transcation,
            voucher: query[i]["unofficialInvoice"][j].voucher,
            href: query[i]["unofficialInvoice"][j].href,
            category: query[i]["unofficialInvoice"][j].category,
            total: query[i]["unofficialInvoice"][j].total,
            remain: query[i]["unofficialInvoice"][j].remain,
            paid: query[i]["unofficialInvoice"][j].paid,
            rate: query[i]["unofficialInvoice"][j].paid,
            currency: query[i]["unofficialInvoice"][j].currency,
            Download: "DOWNLOAD",
            Voucher: "VOUCHER",
            Edit: "EDIT",
            createTime: query[i]["unofficialInvoice"][j].createTime,
            updateTime: query[i]["unofficialInvoice"][j].updateTime
          };


          //subParent.invoiceNumber = invoiceNumber;
          //console.log(subParent);

          result.push(subParent);

        //console.log("subParent: " + JSON.stringify(subParent));
      } 
      catch(err){
        console.log(err);
      }
    }
  }
    //console.log(result);
    res.send(result);
    // res.send(result);
    return;
      //console.log(query);
    } else if (action == "sworn") {

      query = await Paid.find(
          {},
          { English: 0, Español: 0, Français: 0, Arabic: 0, __v: 0 }
        );

      //console.log("queryinvoice.length " + query["invoice"].length); 
      for(var i = 0; i< query.length;i++){
      for (var j = 0; j < query[i]["swornInvoice"].length; j++) {
        //console.log(user["invoice"][j].href);
          try{
            //new
            // s1fi
            //console.log("query invoice" + query[i]["swornInvoice"]);
            let invoiceNumber = "";
          
            subParent = {
              //put parent id temor
              _id: query[i]["swornInvoice"][j].clientID,
              combineid: query[i]["swornInvoice"][j].clientID + "_" + query[i]["swornInvoice"][j]._id + "_" + query[i]["swornInvoice"][j].docid  + "_" + query[i]["swornInvoice"][j].voucher  + "_" + query[i]["swornInvoice"][j].transcation,
              transcation: query[i]["swornInvoice"][j].transcation,
              voucher: query[i]["swornInvoice"][j].voucher,
              paymentid: query[i]["swornInvoice"][j].clientID,
              clientID: query[i]["swornInvoice"][j].clientID,
              fullname: query[i]["swornInvoice"][j].fullname,
              docid: query[i]["swornInvoice"][j].docid,
              invoiceNumber: query[i]["swornInvoice"][j].invoiceNumber,
              href: query[i]["swornInvoice"][j].href,
              category: query[i]["swornInvoice"][j].category,
              total: query[i]["swornInvoice"][j].total,
              countervalue: query[i]["swornInvoice"][j].countervalue,
              remain: query[i]["swornInvoice"][j].remain,
              paid: query[i]["swornInvoice"][j].paid,
              rate: query[i]["swornInvoice"][j].paid,
              currency: query[i]["swornInvoice"][j].currency,
              Download: "DOWNLOAD",
              Voucher: "VOUCHER",
              Edit: "EDIT",
              createTime: query[i]["swornInvoice"][j].createTime,
              updateTime: query[i]["swornInvoice"][j].updateTime
            };
  
  
            //subParent.invoiceNumber = invoiceNumber;
            console.log(subParent);
  
            result.push(subParent);
  
          //console.log("subParent: " + JSON.stringify(subParent));
        } 
        catch(err){
          console.log(err);
        }
      }
    }
      //console.log(result);
      res.send(result);
      // res.send(result);
      return;
      //console.log(query);
    } else if (action == "pronto") {

      query = await Paid.find(
          {},
          { English: 0, Español: 0, Français: 0, Arabic: 0, __v: 0 }
        );

      //console.log("queryinvoice.length " + query["invoice"].length); 
      for(var i = 0; i< query.length;i++){
      for (var j = 0; j < query[i]["prontoInvoice"].length; j++) {
        //console.log(user["invoice"][j].href);
          try{
            //new
            // s1fi
            //console.log("query invoice" + query[i]["prontoInvoice"]);
            let invoiceNumber = "";
          
            subParent = {
              //put parent id temor
              _id: query[i]["prontoInvoice"][j].clientID,
              combineid: query[i]["prontoInvoice"][j].clientID + "_" + query[i]["prontoInvoice"][j]._id + "_" + query[i]["prontoInvoice"][j].docid  + "_" + query[i]["prontoInvoice"][j].voucher  + "_" + query[i]["prontoInvoice"][j].transcation,
              transcation: query[i]["prontoInvoice"][j].transcation,
              voucher: query[i]["prontoInvoice"][j].voucher,
              paymentid: query[i]["prontoInvoice"][j].clientID,
              clientID: query[i]["prontoInvoice"][j].clientID,
              fullname: query[i]["prontoInvoice"][j].fullname,
              docid: query[i]["prontoInvoice"][j].docid,
              invoiceNumber: query[i]["prontoInvoice"][j].invoiceNumber,
              countervalue: query[i]["prontoInvoice"][j].countervalue,
              href: query[i]["prontoInvoice"][j].href,
              category: query[i]["prontoInvoice"][j].category,
              total: query[i]["prontoInvoice"][j].total,
              remain: query[i]["prontoInvoice"][j].remain,
              paid: query[i]["prontoInvoice"][j].paid,
              rate: query[i]["prontoInvoice"][j].paid,
              currency: query[i]["prontoInvoice"][j].currency,
              Download: "DOWNLOAD",
              Voucher: "VOUCHER",
              Edit: "EDIT",
              createTime: query[i]["prontoInvoice"][j].createTime,
              updateTime: query[i]["prontoInvoice"][j].updateTime
            };
  
  
            //subParent.invoiceNumber = invoiceNumber;
            console.log(subParent);
  
            result.push(subParent);
  
          //console.log("subParent: " + JSON.stringify(subParent));
        } 
        catch(err){
          console.log(err);
        }
      }
    }
      //console.log(result);
      res.send(result);
      // res.send(result);
      return;
      //console.log(query);
    } else if (action == "purchase") {

      query = await Suppliers.find(
          {},
          { English: 0, Español: 0, Français: 0, Arabic: 0, __v: 0 }
        );

      //console.log("queryinvoice.length " + query["invoice"].length); 
      for(var i = 0; i< query.length;i++){
      for (var j = 0; j < query[i]["purchaseInvoice"].length; j++) {
        //console.log(user["invoice"][j].href);
          try{
            //new
            // s1fi
            //console.log("query invoice" + query[i]["purchaseInvoice"]);
            let invoiceNumber = "";
          
            subParent = {
              //put parent id temor
              _id: query[i]["purchaseInvoice"][j].clientID,
              combineid: query[i]["purchaseInvoice"][j].clientID + "_" + query[i]["purchaseInvoice"][j]._id + "_" + query[i]["purchaseInvoice"][j].docid  + "_" + query[i]["purchaseInvoice"][j].voucher  + "_" + query[i]["purchaseInvoice"][j].transcation,
              transcation: query[i]["purchaseInvoice"][j].transcation,
              voucher: query[i]["purchaseInvoice"][j].voucher,
              paymentid: query[i]["purchaseInvoice"][j].clientID,
              clientID: query[i]["purchaseInvoice"][j].clientID,
              fullname: query[i]["purchaseInvoice"][j].fullname,
              docid: query[i]["purchaseInvoice"][j].docid,
              invoiceNumber: query[i]["purchaseInvoice"][j].invoiceNumber,
              countervalue: query[i]["purchaseInvoice"][j].countervalue,
              href: query[i]["purchaseInvoice"][j].href,
              category: query[i]["purchaseInvoice"][j].category,
              total: query[i]["purchaseInvoice"][j].total,
              remain: query[i]["purchaseInvoice"][j].remain,
              paid: query[i]["purchaseInvoice"][j].paid,
              rate: query[i]["purchaseInvoice"][j].paid,
              currency: query[i]["purchaseInvoice"][j].currency,
              Type: query[i]["purchaseInvoice"][j].voucherType,
              Download: "DOWNLOAD",
              Voucher: "VOUCHER",
              Edit: "EDIT",
              createTime: query[i]["purchaseInvoice"][j].createTime,
              updateTime: query[i]["purchaseInvoice"][j].updateTime
            };
  
  
            //subParent.invoiceNumber = invoiceNumber;
            console.log(subParent);
  
            result.push(subParent);
  
          //console.log("subParent: " + JSON.stringify(subParent));
        } 
        catch(err){
          console.log(err);
        }
      }
    }
      //console.log(result);
      res.send(result);
      // res.send(result);
      return;
      //console.log(query);
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

    //console.log("result: " + result);
    //console.log("result: " + JSON.stringify(result));
    res.send(result);
  } catch (err) {
    console.log(err);
    res.send({});
  }
});


router.post("/ReceiptSearch/GetData", verify, async (req, res) => {
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

      // 👇️ Get the last 2 digits of the current year
      const twoDigitYear = new Date().getFullYear().toString().slice(-2);
      console.log(twoDigitYear); // 👉️ '23'
      const last2Num = Number(twoDigitYear);
  
      if (req.body.action == "remove") {
        //console.log(req.body);
        //var keyID = mongoose.Types.ObjectId(req.body.key);
        console.log("removed" + req.body["key"]);
        // Equivalent to `parent.children.pull(_id)`
        var key = req.body["key"];
        var keys = [];
        keys = key.split("_");
        var category = keys[3];
  
        const anything = await Paid.findById(keys[0], function (err, user) {
          if (err) {
            console.log(err);
          } else {
            console.log();
            if(category.includes("Pronto"))
            {
              user.prontoVoucher.id(keys[1]).remove();
            } else if(category.includes("Sworn"))
            {
              user.swornVoucher.id(keys[1]).remove();
            } else if(category.includes("Unofficial"))
            {
              user.unofficialVoucher.id(keys[1]).remove();
            } else 
            {

            }

            // Equivalent to `parent.child = null`
            //user.child.remove();
            user.save(function (err) {
              if (err) return handleError(err);
  
              console.log("the subdocs were removed");
            });
          }
        });
        if(category.includes("Pronto"))
        {
          //var deleted = await ProntoRV.findByIdAndDelete({_id: keys[2]})
        } else if(category.includes("Sworn"))
        {
          //var deleted = await SwornRV.findByIdAndDelete({_id: keys[2]})
        } else if(category.includes("Unofficial"))
        {
          //var deleted = await UnofficialRV.findByIdAndDelete({_id: keys[2]})
        } else 
        {

        }
  
        await createHistoryLog(
          req.email,
          "Delete Voucher",
          "Delete Voucher from client " + anything.fullname,
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
  
      if (isEmptyOrSpaces(id) && action == "allsss") {
        query = await Paid.find(
          {},
          { English: 0, Español: 0, Français: 0, Arabic: 0, __v: 0 }
        );
      } else if (action == "all") { //sub
        //var getById;
        //var getById = id;
        // if (isUndefinedOrNull(id) || isEmptyOrSpaces(id)) {
        //   getById = req.body.where[0].value;
        // } else {
        //   var getById = id;
        // }
        //console.log("body.id: " + getById);
        let subParent = {};
  
        // query = await Paid.findById(getById, function (err, user) {
  
        // });
  
        query = await Paid.find(
          {},
          { English: 0, Español: 0, Français: 0, Arabic: 0, __v: 0 }
        );

        receiptType = ["swornVoucher","prontoVoucher","unofficialVoucher"];
        receiptType.forEach(element => {
            for(var x = 0; x < query.length; x++)
            {
                //console.log(query[x][element].length);
                for (var j = 0; j < query[x][element].length; j++) {
                    //console.log(query[x][element][j] + "mmmmmmmmmmmmmmmmmmmmmmm");
                    try{
                    //new
                    // s1f0
                    //console.log("docid: " + user[element][j].docid + "  category: " + user[element][j].category);
                    let invoiceSNumber = "";
                    let invoiceYear = query[x][element][j].invoiceNumber;

                    var totalValue = parseFloat(query[x][element][j].total);
                    var rateValue = parseFloat(query[x][element][j].rate);
                    var currencyCheck = query[x][element][j].currency;
          
                    if(currencyCheck == "LBP")
                    {
                      totalValue = totalValue / rateValue;
                      totalValue = totalValue.toFixed(2)
                    } else {
          
                    }

                    if(parseInt(id) == 1)
                    {
                      if(!invoiceYear.endsWith("/" + last2Num)){
                        console.log(last2Num + " not same year");
                        continue;
                      }
                    } else if(parseInt(id) == 2) {
                      if(invoiceYear.endsWith("/" + last2Num)){
                        console.log(last2Num + " same year");
                        continue;
                      }
                    } else {}
                    
                    subParent = {
                        //put parent id temor
                        // _id: getById,
                        combineid: query[x]._id + "_" + query[x][element][j]._id + "_" + query[x][element][j].docid + "_" + query[x][element][j].category,
                        paymentid: query[x]._id,
                        fullname: query[x][element][j].fullname,
                        docid: query[x][element][j].docid,
                        invoiceNumber: query[x][element][j].invoiceNumber,
                        countervalue: query[x][element][j].countervalue,
                        href: query[x][element][j].href,
                        category: query[x][element][j].category,
                        total: query[x][element][j].total,
                        totalValue: totalValue,
                        remain: query[x][element][j].remain,
                        paid: query[x][element][j].paid,
                        currency: query[x][element][j].currency,
                        rate: query[x][element][j].rate,
                        Download: "DOWNLOAD",
                        Edit: "EDIT",
                        createTime: query[x][element][j].createTime,
                        updateTime: query[x][element][j].updateTime
                    };
        
                    //console.log("docid: " + subParent.docid + "  category: " + subParent.category);
                    result.push(subParent);
        
                    //subParent.invoiceNumber = invoiceNumber;
                    //console.log(subParent);
        
                    //console.log("subParent: " + JSON.stringify(subParent));
                } catch(err){}
                }
            }
        });

  
        //console.log(result);
        //res.send({ result: result, count: result.length });
        res.send(result);
        return;
        //console.log(query);
      } else if (action == "byuser") { //sub
        //var getById;
        //var getById = id;
        // if (isUndefinedOrNull(id) || isEmptyOrSpaces(id)) {
        //   getById = req.body.where[0].value;
        // } else {
        //   var getById = id;
        // }
        //console.log("body.id: " + getById);
        let subParent = {};
  
        // query = await Paid.findById(getById, function (err, user) {
  
        // });
        console.log(id);

        const query = await Paid.findById(id, function (err, data) {
            if (err) {
              console.log(err);
            } else {
                //console.log(data);
                receiptType = ["swornVoucher","prontoVoucher","unofficialVoucher"];
                receiptType.forEach(element => {

                        //console.log(data[x][element].length);
                        for (var j = 0; j < data[element].length; j++) {
                            //console.log(data[element][j] + "mmmmmmmmmmmmmmmmmmmmmmm");
                            try{
                            //new
                            // s1f0
                            //console.log("docid: " + user[element][j].docid + "  category: " + user[element][j].category);
                            let invoiceSNumber = "";
                            //console.log(data._id);
                            
                            subParent = {
                                //put parent id temor
                                // _id: getById,
                                combineid: data._id + "_" + data[element][j]._id,
                                paymentid: data._id,
                                fullname: data[element][j].fullname,
                                docid: data[element][j].docid,
                                invoiceNumber: data[element][j].invoiceNumber,
                                countervalue: data[element][j].countervalue,
                                href: data[element][j].href,
                                category: data[element][j].category,
                                total: data[element][j].total,
                                remain: data[element][j].remain,
                                paid: data[element][j].paid,
                                currency: data[element][j].currency,
                                Download: "DOWNLOAD",
                                Edit: "EDIT",
                                createTime: data[element][j].createTime,
                                updateTime: data[element][j].updateTime
                            };
                
                            //console.log("docid: " + subParent.docid + "  category: " + subParent.category);
                            result.push(subParent);
                
                            //subParent.invoiceNumber = invoiceNumber;
                            //console.log(subParent);
                
                            //console.log("subParent: " + JSON.stringify(subParent));
                        } catch(err){}
                        }
                });
            }
          });

  
        //console.log(result);
        //res.send({ result: result, count: result.length });
        res.send(result);
        return;
        //console.log(query);
      } else if (action == "allS") { //sub
        //var getById;
        //var getById = id;
        // if (isUndefinedOrNull(id) || isEmptyOrSpaces(id)) {
        //   getById = req.body.where[0].value;
        // } else {
        //   var getById = id;
        // }
        //console.log("body.id: " + getById);
        let subParent = {};
  
        // query = await Paid.findById(getById, function (err, user) {
  
        // });
  
        query = await Suppliers.find(
          {},
          { English: 0, Español: 0, Français: 0, Arabic: 0, __v: 0 }
        );

        //console.log(query[0]);
        //console.log("queryinvoice.length " + query["invoice"].length); 
        receiptType = ["swornVoucher","prontoVoucher","unofficialVoucher"];
        receiptType.forEach(element => {
            for(var x = 0; x < query.length; x++)
            {
                //console.log(query[x][element].length);
                for (var j = 0; j < query[x][element].length; j++) {
                    //console.log(query[x][element][j] + "mmmmmmmmmmmmmmmmmmmmmmm");
                    try{
                    //new
                    // s1f0
                    //console.log("docid: " + user[element][j].docid + "  category: " + user[element][j].category);
                    let invoiceSNumber = "";
                    //console.log(query[x]._id);
                    
                    subParent = {
                        //put parent id temor
                        // _id: getById,
                        combineid: query[x]._id + "_" + query[x][element][j]._id,
                        paymentid: query[x]._id,
                        fullname: query[x][element][j].fullname,
                        docid: query[x][element][j].docid,
                        invoiceNumber: query[x][element][j].invoiceNumber,
                        countervalue: query[x][element][j].countervalue,
                        href: query[x][element][j].href,
                        category: query[x][element][j].category,
                        total: query[x][element][j].total,
                        remain: query[x][element][j].remain,
                        paid: query[x][element][j].paid,
                        currency: query[x][element][j].currency,
                        Download: "DOWNLOAD",
                        Edit: "EDIT",
                        createTime: query[x][element][j].createTime,
                        updateTime: query[x][element][j].updateTime
                    };
        
                    //console.log("docid: " + subParent.docid + "  category: " + subParent.category);
                    result.push(subParent);
        
                    //subParent.invoiceNumber = invoiceNumber;
                    //console.log(subParent);
        
                    //console.log("subParent: " + JSON.stringify(subParent));
                } catch(err){}
                }
            }
        });

  
        //console.log(result);
        //res.send({ result: result, count: result.length });
        res.send(result);
        return;
        //console.log(query);
      } 
      else if (action == "byuserS") { //sub
        //var getById;
        //var getById = id;
        // if (isUndefinedOrNull(id) || isEmptyOrSpaces(id)) {
        //   getById = req.body.where[0].value;
        // } else {
        //   var getById = id;
        // }
        //console.log("body.id: " + getById);
        let subParent = {};
  
        // query = await Paid.findById(getById, function (err, user) {
  
        // });
        console.log(id);

        const query = await Suppliers.findById(id, function (err, data) {
            if (err) {
              console.log(err);
            } else {
                //console.log(data);
                receiptType = ["swornVoucher","prontoVoucher","unofficialVoucher"];
                receiptType.forEach(element => {

                        //console.log(data[x][element].length);
                        for (var j = 0; j < data[element].length; j++) {
                            //console.log(data[element][j] + "mmmmmmmmmmmmmmmmmmmmmmm");
                            try{
                            //new
                            // s1f0
                            //console.log("docid: " + user[element][j].docid + "  category: " + user[element][j].category);
                            let invoiceSNumber = "";
                            //console.log(data._id);
                            
                            subParent = {
                                //put parent id temor
                                // _id: getById,
                                combineid: data._id + "_" + data[element][j]._id,
                                paymentid: data._id,
                                fullname: data[element][j].fullname,
                                docid: data[element][j].docid,
                                invoiceNumber: data[element][j].invoiceNumber,
                                countervalue: data[element][j].countervalue,
                                href: data[element][j].href,
                                category: data[element][j].category,
                                total: data[element][j].total,
                                remain: data[element][j].remain,
                                paid: data[element][j].paid,
                                currency: data[element][j].currency,
                                Download: "DOWNLOAD",
                                Edit: "EDIT",
                                createTime: data[element][j].createTime,
                                updateTime: data[element][j].updateTime
                            };
                
                            //console.log("docid: " + subParent.docid + "  category: " + subParent.category);
                            result.push(subParent);
                
                            //subParent.invoiceNumber = invoiceNumber;
                            //console.log(subParent);
                
                            //console.log("subParent: " + JSON.stringify(subParent));
                        } catch(err){}
                        }
                });
            }
          });

  
        //console.log(result);
        //res.send({ result: result, count: result.length });
        res.send(result);
        return;
        //console.log(query);
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
          //unit = j + 1;
          // if(query[i]["invoice"][j].currency == "USD"){
          //   totalpaidpriceUSD += query[i]["invoice"][j].paid;
          //   totalremainpriceUSD += query[i]["invoice"][j].remain;
          //   totalvaluepriceUSD += query[i]["invoice"][j].total;
          // }
          // else{
          //   totalpaidpriceLBP += query[i]["invoice"][j].paid;
          //   totalremainpriceLBP += query[i]["invoice"][j].remain;
          //   totalvaluepriceLBP += query[i]["invoice"][j].total;
          // }
  
  
          if (action == "sub") {
            //console.log("sudfasdjfkl jaslkdjf klasjdf lkjaskldj fklsdj ");
            result.push(subParent);
            console.log("result: " + JSON.stringify(result));
          }
        } catch(err){
          console.log(err)
        }
  
        }
  
        // parent.unit = unit;
  
        // parent.totalPaidUSD = totalpaidpriceUSD;
        // parent.totalRemainUSD = totalremainpriceUSD;
        // parent.totalUSD = totalvaluepriceUSD;
  
        // parent.totalPaidLBP = totalpaidpriceLBP;
        // parent.totalRemainLBP = totalremainpriceLBP;
        // parent.totalLBP = totalvaluepriceLBP;
  
  
        // if (action == "all") result.push(parent);
  
      }
  
      //console.log("result: " + result);
      //console.log("result: " + JSON.stringify(result));
      res.send(result);
    } catch (err) {
      console.log(err);
      res.send({});
    }
});

router.post("/PaymentSearch/GetData", verify, async (req, res) => {
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

    // 👇️ Get the last 2 digits of the current year
    const twoDigitYear = new Date().getFullYear().toString().slice(-2);
    console.log(twoDigitYear); // 👉️ '23'
    const last2Num = Number(twoDigitYear);

    if (req.body.action == "remove") {
      //console.log(req.body);
      //var keyID = mongoose.Types.ObjectId(req.body.key);
      console.log("removed" + req.body["key"]);
      // Equivalent to `parent.children.pull(_id)`
      var key = req.body["key"];
      var keys = [];
      keys = key.split("_");
      var category = keys[3];

      console.log("keys:  " + key);

      const anything = await Suppliers.findById(keys[0], function (err, user) {
        if (err) {
          console.log(err);
        } else {
          console.log();
          if(category.includes("Pronto"))
          {
            //prontoVoucher     prontoPurchaseInvoice
            user.prontoVoucher.id(keys[1]).remove();
          } else if(category.includes("Unofficial"))
          {
            //unofficialVoucher     unofficialPurchaseInvoice
            user.unofficialVoucher.id(keys[1]).remove();
          } else 
          {

          }

          // Equivalent to `parent.child = null`
          //user.child.remove();
          user.save(function (err) {
            if (err) return handleError(err);

            console.log("the subdocs were removed");
          });
        }
      });
      if(category.includes("Pronto"))
      {
        //var deleted = await ProntoRV.findByIdAndDelete({_id: keys[2]})
      } else if(category.includes("Sworn"))
      {
        //var deleted = await SwornRV.findByIdAndDelete({_id: keys[2]})
      } else if(category.includes("Unofficial"))
      {
        //var deleted = await UnofficialRV.findByIdAndDelete({_id: keys[2]})
      } else 
      {

      }

      await createHistoryLog(
        req.email,
        "Delete Voucher",
        "Delete Voucher from client " + anything.fullname,
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

    if (isEmptyOrSpaces(id) && action == "allsss") {
      query = await Suppliers.find(
        {},
        { English: 0, Español: 0, Français: 0, Arabic: 0, __v: 0 }
      );
    } else if (action == "all") { //sub
      //var getById;
      //var getById = id;
      // if (isUndefinedOrNull(id) || isEmptyOrSpaces(id)) {
      //   getById = req.body.where[0].value;
      // } else {
      //   var getById = id;
      // }
      //console.log("body.id: " + getById);
      let subParent = {};

      // query = await Paid.findById(getById, function (err, user) {

      // });

      query = await Suppliers.find(
        {},
        { English: 0, Español: 0, Français: 0, Arabic: 0, __v: 0 }
      );

      //console.log(query[0]);
      //console.log("queryinvoice.length " + query["invoice"].length); 
      receiptType = ["prontoVoucher","unofficialVoucher"];
      receiptType.forEach(element => {
          for(var x = 0; x < query.length; x++)
          {
            console.log(query[x][element].length);
            console.log(query[x][element]);
            console.log(element);
            for (var j = 0; j < query[x][element].length; j++) {
                //console.log(query[x][element][j] + "mmmmmmmmmmmmmmmmmmmmmmm");
                try{
                //new
                // s1f0
                //console.log("docid: " + user[element][j].docid + "  category: " + user[element][j].category);
                let invoiceSNumber = "";
                let invoiceYear = query[x][element][j].invoiceNumber;

                var totalValue = parseFloat(query[x][element][j].total);
                var rateValue = parseFloat(query[x][element][j].rate);
                var currencyCheck = query[x][element][j].currency;
      
                if(currencyCheck == "LBP")
                {
                  totalValue = totalValue / rateValue;
                  totalValue = totalValue.toFixed(2)
                } else {
      
                }

                if(parseInt(id) == 1)
                {
                  if(!invoiceYear.endsWith("/" + last2Num)){
                    console.log(last2Num + " not same year");
                    continue;
                  }
                } else if(parseInt(id) == 2) {
                  if(invoiceYear.endsWith("/" + last2Num)){
                    console.log(last2Num + " same year");
                    continue;
                  }
                } else {}
                
                subParent = {
                    //put parent id temor
                    // _id: getById,
                    combineid: query[x]._id + "_" + query[x][element][j]._id + "_" + query[x][element][j].docid + "_" + query[x][element][j].category,
                    paymentid: query[x]._id,
                    fullname: query[x][element][j].fullname,
                    docid: query[x][element][j].docid,
                    invoiceNumber: query[x][element][j].invoiceNumber,
                    countervalue: query[x][element][j].countervalue,
                    href: query[x][element][j].href,
                    category: query[x][element][j].category,
                    total: query[x][element][j].total,
                    totalValue: totalValue,
                    remain: query[x][element][j].remain,
                    paid: query[x][element][j].paid,
                    rate: query[x][element][j].rate,
                    currency: query[x][element][j].currency,
                    Download: "DOWNLOAD",
                    Edit: "EDIT",
                    createTime: query[x][element][j].createTime,
                    updateTime: query[x][element][j].updateTime
                };
    
                //console.log("docid: " + subParent.docid + "  category: " + subParent.category);
                result.push(subParent);
    
                //subParent.invoiceNumber = invoiceNumber;
                //console.log(subParent);
    
                //console.log("subParent: " + JSON.stringify(subParent));
              } catch(err){}
            }
          }
      });


      console.log(result);
      //res.send({ result: result, count: result.length });
      res.send(result);
      return;
      //console.log(query);
    } else if (action == "byuser") { //sub
      //var getById;
      //var getById = id;
      // if (isUndefinedOrNull(id) || isEmptyOrSpaces(id)) {
      //   getById = req.body.where[0].value;
      // } else {
      //   var getById = id;
      // }
      //console.log("body.id: " + getById);
      let subParent = {};

      // query = await Paid.findById(getById, function (err, user) {

      // });
      console.log(id);

      const query = await Paid.findById(id, function (err, data) {
          if (err) {
            console.log(err);
          } else {
              //console.log(data);
              receiptType = ["swornVoucher","prontoVoucher","unofficialVoucher"];
              receiptType.forEach(element => {

                      //console.log(data[x][element].length);
                      for (var j = 0; j < data[element].length; j++) {
                          //console.log(data[element][j] + "mmmmmmmmmmmmmmmmmmmmmmm");
                          try{
                          //new
                          // s1f0
                          //console.log("docid: " + user[element][j].docid + "  category: " + user[element][j].category);
                          let invoiceSNumber = "";
                          //console.log(data._id);
                          
                          subParent = {
                              //put parent id temor
                              // _id: getById,
                              combineid: data._id + "_" + data[element][j]._id,
                              paymentid: data._id,
                              fullname: data[element][j].fullname,
                              docid: data[element][j].docid,
                              invoiceNumber: data[element][j].invoiceNumber,
                              countervalue: data[element][j].countervalue,
                              href: data[element][j].href,
                              category: data[element][j].category,
                              total: data[element][j].total,
                              remain: data[element][j].remain,
                              paid: data[element][j].paid,
                              currency: data[element][j].currency,
                              Download: "DOWNLOAD",
                              Edit: "EDIT",
                              createTime: data[element][j].createTime,
                              updateTime: data[element][j].updateTime
                          };
              
                          //console.log("docid: " + subParent.docid + "  category: " + subParent.category);
                          result.push(subParent);
              
                          //subParent.invoiceNumber = invoiceNumber;
                          //console.log(subParent);
              
                          //console.log("subParent: " + JSON.stringify(subParent));
                      } catch(err){}
                      }
              });
          }
        });


      //console.log(result);
      //res.send({ result: result, count: result.length });
      res.send(result);
      return;
      //console.log(query);
    } else if (action == "allS") { //sub
      //var getById;
      //var getById = id;
      // if (isUndefinedOrNull(id) || isEmptyOrSpaces(id)) {
      //   getById = req.body.where[0].value;
      // } else {
      //   var getById = id;
      // }
      //console.log("body.id: " + getById);
      let subParent = {};

      // query = await Paid.findById(getById, function (err, user) {

      // });

      query = await Suppliers.find(
        {},
        { English: 0, Español: 0, Français: 0, Arabic: 0, __v: 0 }
      );

      //console.log(query[0]);
      //console.log("queryinvoice.length " + query["invoice"].length); 
      receiptType = ["swornVoucher","prontoVoucher","unofficialVoucher"];
      receiptType.forEach(element => {
          for(var x = 0; x < query.length; x++)
          {
              //console.log(query[x][element].length);
              for (var j = 0; j < query[x][element].length; j++) {
                  //console.log(query[x][element][j] + "mmmmmmmmmmmmmmmmmmmmmmm");
                  try{
                  //new
                  // s1f0
                  //console.log("docid: " + user[element][j].docid + "  category: " + user[element][j].category);
                  let invoiceSNumber = "";
                  //console.log(query[x]._id);
                  
                  subParent = {
                      //put parent id temor
                      // _id: getById,
                      combineid: query[x]._id + "_" + query[x][element][j]._id,
                      paymentid: query[x]._id,
                      fullname: query[x][element][j].fullname,
                      docid: query[x][element][j].docid,
                      invoiceNumber: query[x][element][j].invoiceNumber,
                      countervalue: query[x][element][j].countervalue,
                      href: query[x][element][j].href,
                      category: query[x][element][j].category,
                      total: query[x][element][j].total,
                      //rate: query[x][element][j].rate,
                      remain: query[x][element][j].remain,
                      paid: query[x][element][j].paid,
                      currency: query[x][element][j].currency,
                      Download: "DOWNLOAD",
                      Edit: "EDIT",
                      createTime: query[x][element][j].createTime,
                      updateTime: query[x][element][j].updateTime
                  };
      
                  //console.log("docid: " + subParent.docid + "  category: " + subParent.category);
                  result.push(subParent);
      
                  //subParent.invoiceNumber = invoiceNumber;
                  //console.log(subParent);
      
                  //console.log("subParent: " + JSON.stringify(subParent));
              } catch(err){}
              }
          }
      });


      //console.log(result);
      //res.send({ result: result, count: result.length });
      res.send(result);
      return;
      //console.log(query);
    } 
    else if (action == "byuserS") { //sub
      let subParent = {};

      console.log(id);

      const query = await Suppliers.findById(id, function (err, data) {
          if (err) {
            console.log(err);
          } else {
              //console.log(data);
              receiptType = ["swornVoucher","prontoVoucher","unofficialVoucher"];
              receiptType.forEach(element => {

                      //console.log(data[x][element].length);
                      for (var j = 0; j < data[element].length; j++) {
                          //console.log(data[element][j] + "mmmmmmmmmmmmmmmmmmmmmmm");
                          try{
                          //new
                          // s1f0
                          //console.log("docid: " + user[element][j].docid + "  category: " + user[element][j].category);
                          let invoiceSNumber = "";
                          //console.log(data._id);
                          
                          subParent = {
                              //put parent id temor
                              // _id: getById,
                              combineid: data._id + "_" + data[element][j]._id,
                              paymentid: data._id,
                              fullname: data[element][j].fullname,
                              docid: data[element][j].docid,
                              invoiceNumber: data[element][j].invoiceNumber,
                              countervalue: data[element][j].countervalue,
                              href: data[element][j].href,
                              category: data[element][j].category,
                              total: data[element][j].total,
                              remain: data[element][j].remain,
                              paid: data[element][j].paid,
                              //rate: data[element][j].rate,
                              currency: data[element][j].currency,
                              Download: "DOWNLOAD",
                              Edit: "EDIT",
                              createTime: data[element][j].createTime,
                              updateTime: data[element][j].updateTime
                          };
              
                          //console.log("docid: " + subParent.docid + "  category: " + subParent.category);
                          result.push(subParent);
              
                          //subParent.invoiceNumber = invoiceNumber;
                          //console.log(subParent);
              
                          //console.log("subParent: " + JSON.stringify(subParent));
                      } catch(err){}
                      }
              });
          }
        });


      //console.log(result);
      //res.send({ result: result, count: result.length });
      res.send(result);
      return;
      //console.log(query);
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

        if (action == "sub") {
          //console.log("sudfasdjfkl jaslkdjf klasjdf lkjaskldj fklsdj ");
          result.push(subParent);
          console.log("result: " + JSON.stringify(result));
        }
      } catch(err){
        console.log(err)
      }
      }
    }

    res.send(result);
  } catch (err) {
    console.log(err);
    res.send({});
  }
});
  
router.post("/datareceiptvoucher", verify, async (req, res) => {
  try {

    console.log(req.query);
  //   if(req.body.hasOwnProperty("doc"))
  //   {
  //     req.query = req.body;
  //   }
    if (
      !isEmptyOrSpaces(req.query.doc) &&
      !isEmptyOrSpaces(req.query.id)
    ) {
        if(req.query.doc == "SwornReceiptVoucher")
        {
          req.query.doc = "Sworn Receipt Voucher";
        }
        else if(req.query.doc == "ProntoReceiptVoucher"){
          req.query.doc = "Pronto Receipt Voucher";
        } else if (req.query.doc == "UnofficialReceiptVoucher"){
          req.query.doc = "Unofficial Receipt Voucher";
        } else {}
      let path = "./json/" + "English" + "/" + req.query.doc + ".json";
      let docxPath =
        "./DocumentTemplate/" + "English" + "/" + req.query.doc + ".docx";
      //console.log(path)
      if (fs.existsSync(path) && fs.existsSync(docxPath)) {
        console.log("Begain");
        let rawdata = fs.readFileSync(path, "utf-8");
        let data = JSON.parse(rawdata);
        let docArray = { clients: [], users: [], check: [] }; // sar fe mwskleh bel array fams:[]
        let jsonObj = [];

        var invoice = req.query.invoice;
        var invoiceSchemaID = req.query.invoiceSchemaID;
        var transcation = req.query.transcation;
        var clientID = req.query.ClientID;
        var invoiceNumber = req.query.invoiceNumber;
        var rate = req.query.rate;
        var transcation = req.query.transcation;
        var rateEditT = "";
        
        if(transcation === 'undefined'){
          transcation = "";
        } else {
          //Update rate from transcation 
          var TransactionRateValue =  await Transaction.findById(transcation, function (err, docs) {
              if (err){
                  console.log(err);
              }
              else{
              }
          });

          rateEditT = TransactionRateValue.rate;
        }

        data.s3.f6.value = invoiceNumber;
        //data.s2.f7.value = rate;


        //console.log(req.body);

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

        docArray["s3f6"] = invoiceNumber;

      //   {
      //     "checkno": "",
      //     "valuedate": "",
      //     "bankname": ""
      // },
      let totalPayment = 0;

        if (data.hasOwnProperty("s4")) {
          if (data.s3.hasOwnProperty("check")) {
            for (var i = 0; i < data.s4.check.length; i++) {
              console.log(data.s4.check.length);
              console.log(i);
              if (req.body["s4_check_checkno_" + i] != null && !isEmptyOrSpaces(req.body["s4_check_checkno_" + i])) {
                data.s4.check[i].checkno = req.body["s4_check_checkno_" + i];
                data.s4.check[i].valuedate =
                  req.body["s4_check_valuedate_" + i];
                data.s4.check[i].bankname = req.body["s4_check_bankname_" + i];

                docArray.check.push({
                  pro: req.body["s4_check_checkno_" + i],
                  stype: req.body["s4_check_valuedate_" + i],
                  slan: req.body["s4_check_bankname_" + i]
                });
              }
            }
          } else{}
        }


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
        
        if(data.s3.f7.value == "Cash")
        {
	  docArray["s3f4"] = "";
          docArray["s3f5"] = "";
          totalPayment = data.s2.f3.value;
        } else if(data.s3.f7.value == "Check")
        {
	  docArray["s3f1"] = "";
          docArray["s3f2"] = "";
          //totalPayment = data.s2.f3.value;
        } else {
          data.s3.f7.value = "Cash";
          totalPayment = data.s2.f3.value;
        }
        docArray["s3f7"] = data.s3.f7.value;
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

        console.log("docArray[s3f7]: " + docArray["s3f7"] + "    " + data["s3"]["f7"]["value"])

        console.log("before save");

        var modelCheck = req.query.doc;
        var langCheck = "English";
        var id = req.query.id;
        var docID = req.query.docID != null ? req.query.docID : "";
        modelCheck = modelCheck.replace(/\s/g, "");

        var voucherID = "";

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

        var ObjectId = require("mongoose").Types.ObjectId;
        var email = req.email;

        var currency = data.s2.f4.value;

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
          rate: rateEditT,
          currency: currency,
          invoiceNumber: "",
          countervalue: "",
          accountNumber: ""
        };

      //   unofficialVoucher: unofficialVoucher,
      //   prontoVoucher: prontoVoucher,
      //   swornVoucher: swornVoucher

        console.log(modelCheck + "modelChecksdffffffff")
        if (modelCheck.includes("SwornReceiptVoucher")) {
          if (ObjectId.isValid(docID)) {
            voucherID = docID;
            data["user_edit"] = email;
            console.log("Update doc by ID " + docID);
            const swornRV = await SwornRV.findOneAndUpdate(
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
                "swornVoucher.docid": docID,
              },
              {
                $set: {
                  "swornVoucher.$.invoiceNumber": invoiceNumber,
                  "swornVoucher.$.total": totalPayment,
                  "swornVoucher.$.updateTime": datetime,
                  "swornVoucher.$.rate": rateEditT
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

            if(transcation != ""){
              var transactionEdit = await Transaction.updateOne(
                { _id: transcation },
                {
                  $set: {
                    // "invoice.$.category": req.body.value.category,
                    "debit": totalPayment,
                    "voucherType": "SwornReceiptVoucher",
                    "voucherAddress": docID
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
            }

          } else {
            console.log("swornRV");
            data["invoiceNumber"] = invoiceNumber;
            //data["invoiceNumber"] = data.s1.f4.value;

            clientInvoiceHistory.invoiceNumber = invoiceNumber;

            console.log(clientInvoiceHistory);

            //return;
            data["user_created"] = email;
            console.log(data)
            const swornRV = new SwornRV(data);
            const savedSwornRV = await swornRV.save();
            docid = savedSwornRV._id;
            voucherID = docid;

            console.log(savedSwornRV.docArray);

            console.log(savedSwornRV.countervalue + "counter valuefffffff");

            clientInvoiceHistory.docid = docid;
            //clientInvoiceHistory.currency = "";
            clientInvoiceHistory.countervalue = savedSwornRV.countervalue;
            
            //console.log(clientInvoiceHistory)

            var savedPaid = await Paid.updateOne(
              { _id: id },
              { $push: { swornVoucher: clientInvoiceHistory } },
              { upsert: true, new: true  }
            );

            if(transcation != ""){
              var transactionEdit = await Transaction.updateOne(
                { _id: transcation },
                {
                  $set: {
                    // "invoice.$.category": req.body.value.category,
                    "debit": totalPayment,
                    "voucherType": "SwornReceiptVoucher",
                    "voucherAddress": docid
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
            }

            console.log(clientInvoiceHistory);
          }
        } else if (modelCheck.includes("ProntoReceiptVoucher")) {
          if (ObjectId.isValid(docID)) {
              voucherID = docID;
              data["user_edit"] = email;
              console.log("Update doc by ID " + docID);
              const prontoRV = await ProntoRV.findOneAndUpdate(
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
                  "prontoVoucher.docid": docID,
                },
                {
                  $set: {
                    // "invoice.$.category": req.body.value.category,
                    "prontoVoucher.$.rate": rate,
                    "prontoVoucher.$.invoiceNumber": invoiceNumber,
                    "prontoVoucher.$.total": totalPayment,
                    "prontoVoucher.$.updateTime": datetime,
                    "prontoVoucher.$.rate": rateEditT
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

              if(transcation != ""){
                var transactionEdit = await Transaction.updateOne(
                  { _id: transcation },
                  {
                    $set: {
                      // "invoice.$.category": req.body.value.category,
                      //"rate": rate,
                      "debit": totalPayment,
                      "voucherType": "ProntoReceiptVoucher",
                      "voucherAddress": docID
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
              }
  
            } else {
              console.log("prontoRV");
              data["invoiceNumber"] = invoiceNumber;
              //data["invoiceNumber"] = data.s1.f4.value;
  
              clientInvoiceHistory.invoiceNumber = invoiceNumber;
  
              console.log(clientInvoiceHistory);
  
              //return;
              data["user_created"] = email;
              console.log(data)
              const prontoRV = new ProntoRV(data);
              const savedprontoRV = await prontoRV.save();
              docid = savedprontoRV._id;
              voucherID = docid;
  
              console.log(savedprontoRV.docArray);
  
              console.log(savedprontoRV.countervalue + "counter valuefffffff");
  
              clientInvoiceHistory.docid = docid;
              //clientInvoiceHistory.currency = "";
              clientInvoiceHistory.countervalue = savedprontoRV.countervalue;
              
              //console.log(clientInvoiceHistory)
  
              var savedPaid = await Paid.updateOne(
                { _id: id },
                { $push: { prontoVoucher: clientInvoiceHistory } },
                { upsert: true, new: true  }
              );

              if(transcation != ""){
                var transactionEdit = await Transaction.updateOne(
                  { _id: transcation },
                  {
                    $set: {
                      // "invoice.$.category": req.body.value.category,
                      //"rate": rate,
                      "debit": totalPayment,
                      "voucherType": "ProntoReceiptVoucher",
                      "voucherAddress": docid
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
              }
  
              //console.log(savedPaid);
            }
        } else if (modelCheck.includes("UnofficialReceiptVoucher")) {
          if (ObjectId.isValid(docID)) {
              voucherID = docID;
              data["user_edit"] = email;
              console.log("Update doc by ID " + docID);
              const unofficialRV = await UnofficialRV.findOneAndUpdate(
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
                  "unofficialVoucher.docid": docID,
                },
                {
                  $set: {
                    // "invoice.$.category": req.body.value.category,
                    "unofficialVoucher.$.invoiceNumber": invoiceNumber,
                    "unofficialVoucher.$.total": totalPayment,
                    "unofficialVoucher.$.updateTime": datetime,
                    "unofficialVoucher.$.rate": rateEditT
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

              if(transcation != ""){
                var transactionEdit = await Transaction.updateOne(
                  { _id: transcation },
                  {
                    $set: {
                      // "invoice.$.category": req.body.value.category,
                      "debit": totalPayment,
                      "voucherType": "UnofficialReceiptVoucher",
                      "voucherAddress": docID
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
              }
  
            } else {
              console.log("UnofficialRV");
              data["invoiceNumber"] = invoiceNumber;
              //data["invoiceNumber"] = data.s1.f4.value;
  
              clientInvoiceHistory.invoiceNumber = invoiceNumber;
  
              console.log(clientInvoiceHistory);
  
              //return;
              data["user_created"] = email;
              console.log(data)
              const unofficialRV = new UnofficialRV(data);
              const savedUnofficialRV = await unofficialRV.save();
              docid = savedUnofficialRV._id;
              voucherID = docid;
  
              console.log(savedUnofficialRV.docArray);
  
              console.log(savedUnofficialRV.countervalue + "counter valuefffffff");
  
              clientInvoiceHistory.docid = docid;
              //clientInvoiceHistory.currency = "";
              clientInvoiceHistory.countervalue = savedUnofficialRV.countervalue;
              
              //console.log(clientInvoiceHistory)
  
              var savedPaid = await Paid.updateOne(
                { _id: id },
                { $push: { unofficialVoucher: clientInvoiceHistory } },
                { upsert: true, new: true  }
              );
  
              if(transcation != ""){
                var transactionEdit = await Transaction.updateOne(
                  { _id: transcation },
                  {
                    $set: {
                      // "invoice.$.category": req.body.value.category,
                      "debit": totalPayment,
                      "voucherType": "UnofficialReceiptVoucher",
                      "voucherAddress": docid
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
              }
            }
        } else {
        }


        if (modelCheck.includes("Sworn")) {
          if (ObjectId.isValid(invoice)) {
            var dummyData = await Paid.updateOne(
              { _id: id,
                "swornInvoice.docid": invoice,
              },
              {
                $set: {
                  "swornInvoice.$.voucher": voucherID
                },
              },
              function (error, updatedData) {
                if (error) {
                  // return res.status(400).send(error);
                }

                ////console.log(updatedData);
                //return res.status(200).send(updatedData);
              }
            );

          } 
        } else if (modelCheck.includes("Pronto")) {
          if (ObjectId.isValid(invoice)) {

            var dummyData = await Paid.updateOne(
              { _id: id,
                "prontoInvoice.docid": invoice,
              },
              {
                $set: {
                  "prontoInvoice.$.voucher": voucherID,
                },
              },
              function (error, updatedData) {
                if (error) {
                  // return res.status(400).send(error);
                }
      
                //console.log(updatedData);
                //return res.status(200).send(updatedData);
              }
            );

          } 
        } else if (modelCheck.includes("Unofficial")) {
          if (ObjectId.isValid(invoice)) 

            var dummyData = await Paid.updateOne(
              { _id: id,
                "unofficialInvoice.docid": invoice,
              },
              {
                $set: {
                  "unofficialInvoice.$.voucher": voucherID,
                },
              },
              function (error, updatedData) {
                if (error) {
                  // return res.status(400).send(error);
                }
      
                //console.log(updatedData);
                //return res.status(200).send(updatedData);
              }
            );

          } 
         else {
        }

        if(modelCheck.includes("Purchase"))
        {
          
        } else{
          var selectpayment = docArray["s3f7"];
          console.log(selectpayment);
          if(selectpayment =="Cash"){
            //docArray["s2f3"] = total;
            //docArray["s2f4"] = currency;
            //docArray["s2f6"] = currency;
            //docArray["s3f1"] = total;
            //docArray["s3f2"] = currency;
            docArray["s3f4"] = "";
            docArray["s3f5"] = "";
          } else if(selectpayment =="Check") {
            docArray["s3f1"] = "";
            docArray["s3f2"] = "";
          } else {}
        }

        var clientName = clientData.fullname;

        console.log("finish");

        //Put condition if verified or not "/unverified"
        var outputPath = GenerateDocx(
          data,
          docxPath,
          docArray,
          req.query.doc,
          clientName,
          datetime
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

router.post("/datapaymentvoucher", verify, async (req, res) => {
  try {

      console.log(req.query);
  //   if(req.body.hasOwnProperty("doc"))
  //   {
  //     req.query = req.body;
  //   }
    if (
      !isEmptyOrSpaces(req.query.doc) &&
      !isEmptyOrSpaces(req.query.id)
    ) {
        if(req.query.doc == "SwornPaymentVoucher")
        {
          req.query.doc = "Sworn Payment Voucher";
        }
        else if(req.query.doc == "ProntoPaymentVoucher"){
          req.query.doc = "Pronto Payment Voucher";
        } else if (req.query.doc == "UnofficialPaymentVoucher"){
          req.query.doc = "Unofficial Payment Voucher";
        } else {}
      let path = "./json/" + "English" + "/" + req.query.doc + ".json";
      let docxPath =
        "./DocumentTemplate/" + "English" + "/" + req.query.doc + ".docx";
      //console.log(path)
      if (fs.existsSync(path) && fs.existsSync(docxPath)) {
        console.log("Begain");
        let rawdata = fs.readFileSync(path, "utf-8");
        let data = JSON.parse(rawdata);
        let docArray = { clients: [], users: [], check: [] }; // sar fe mwskleh bel array fams:[]
        let jsonObj = [];

        var invoice = req.query.invoice;
        var invoiceSchemaID = req.query.invoiceSchemaID;
        var transcation = req.query.transcation;
        var clientID = req.query.ClientID;
        var invoiceNumber = req.query.invoiceNumber;
        //var transcation = req.query.transcation;
        
        var rateEditT = "";
        
        if(transcation === 'undefined'){
          transcation = "";
        } else {
          //Update rate from transcation 
          var TransactionRateValue =  await Transaction.findById(transcation, function (err, docs) {
              if (err){
                  console.log(err);
              }
              else{
              }
          });

          rateEditT = TransactionRateValue.rate;
        }

        data.s3.f6.value = invoiceNumber;
        //console.log(req.body);

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

        docArray["s3f6"] = invoiceNumber;

        //console.log("docArray[s3f6]: " + docArray["s3f7"])
        
      let totalPayment = 0;

        if (data.hasOwnProperty("s4")) {
          if (data.s3.hasOwnProperty("check")) {
            for (var i = 0; i < data.s4.check.length; i++) {
              console.log(data.s4.check.length);
              console.log(i);
              if (req.body["s4_check_checkno_" + i] != null && !isEmptyOrSpaces(req.body["s4_check_checkno_" + i])) {
                data.s4.check[i].checkno = req.body["s4_check_checkno_" + i];
                data.s4.check[i].valuedate =
                  req.body["s4_check_valuedate_" + i];
                data.s4.check[i].bankname = req.body["s4_check_bankname_" + i];

                docArray.check.push({
                  pro: req.body["s4_check_checkno_" + i],
                  stype: req.body["s4_check_valuedate_" + i],
                  slan: req.body["s4_check_bankname_" + i]
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
        
        if(data.s3.f7.value == "Cash")
        {
	  docArray["s3f4"] = "";
	  docArray["s3f5"] = "";
          totalPayment = data.s2.f3.value;
        } else if(data.s3.f7.value == "Check")
        {
	  docArray["s3f1"] = "";
	  docArray["s3f2"] = "";
          //totalPayment = data.s2.f3.value;
        } else {
          data.s3.f7.value = "Cash";
          totalPayment = data.s2.f3.value;
        }
        // } else if(data.s3.f6.value == "Check")
        // {
        //   //totalPayment
        // } else {}
        docArray["s3f7"] = data.s3.f7.value;
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


        var voucherID = "";

        let clientData = await Suppliers.findOne({ _id: id });
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
        // docid: "string",
        // clientID: "string",
        // fullname: "string",
        // category: "string",
        // paid: "string",
        // remain: "string",
        // invoiceNumber: "string",
        // href: "string",
        // total: "Number",
        // currency: "string",
        // createUser: "string",
        // updateUser: "string",
        // createTime: "string",
        // updateTime: "string"

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
          rate: rateEditT,
          remain: "",
          currency: "",
          invoiceNumber: "",
          countervalue: "",
          accountNumber: ""
        };

      //   unofficialVoucher: unofficialVoucher,
      //   prontoVoucher: prontoVoucher,
      //   swornVoucher: swornVoucher

        console.log(modelCheck + "modelChecksdffffffff")
        if (modelCheck.includes("SwornPaymentVoucher")) {
          if (ObjectId.isValid(docID)) {
            data["user_edit"] = email;
            console.log("Update doc by ID " + docID);
            const swornPV = await SwornPV.findOneAndUpdate(
              { _id: docID },
              data,
              { upsert: true },
              function (err, doc) {
                if (err) console.log(err);
                // console.log(doc.docArray)
                console.log("Succesfully saved.");
              }
            );

            var dummyData = await Suppliers.updateOne(
              { _id: id,
                "swornVoucher.docid": docID,
              },
              {
                $set: {
                  // "invoice.$.category": req.body.value.category,
                  "swornVoucher.$.invoiceNumber": invoiceNumber,
                  "swornVoucher.$.total": totalPayment,
                  "swornVoucher.$.updateTime": datetime,
                  "swornVoucher.$.rate": rateEditT
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
            console.log("swornPV");
            data["invoiceNumber"] = invoiceNumber;
            //data["invoiceNumber"] = data.s1.f4.value;

            clientInvoiceHistory.invoiceNumber = invoiceNumber;

            console.log(clientInvoiceHistory);

            //return;
            data["user_created"] = email;
            console.log(data)
            const swornPV = new SwornPV(data);
            const savedSwornPV = await swornPV.save();
            docid = savedSwornPV._id;

            console.log(savedSwornPV.docArray);

            console.log(savedSwornPV.countervalue + "counter valuefffffff");

            clientInvoiceHistory.docid = docid;
            clientInvoiceHistory.currency = "LBP";
            clientInvoiceHistory.countervalue = savedSwornPV.countervalue;
            
            //console.log(clientInvoiceHistory)

            var savedPaid = await Suppliers.updateOne(
              { _id: id },
              { $push: { swornVoucher: clientInvoiceHistory } },
              { upsert: true, new: true  }
            );

            console.log(clientInvoiceHistory);
          }
        } else if (modelCheck.includes("ProntoPaymentVoucher")) {
          console.log("currency: " + data.s2.f4.value);
          data["currency"] = data.s2.f4.value;
          var currencyEdit = data.s2.f4.value;
          if (ObjectId.isValid(docID)  && docID != "") {
              data["user_edit"] = email;
              console.log("Update doc by ID " + docID);
              const prontoPV = await ProntoPV.findOneAndUpdate(
                { _id: docID },
                data,
                { upsert: true },
                function (err, doc) {
                  if (err) console.log(err);
                  // console.log(doc.docArray)
                  console.log("Succesfully saved.");
                }
              );
  
              var dummyData = await Suppliers.updateOne(
                { _id: id,
                  "prontoVoucher.docid": docID,
                },
                {
                  $set: {
                    // "invoice.$.category": req.body.value.category,
                    "prontoVoucher.$.currency": currencyEdit,
                    "prontoVoucher.$.invoiceNumber": invoiceNumber,
                    "prontoVoucher.$.total": totalPayment,
                    "prontoVoucher.$.updateTime": datetime,
                    "prontoVoucher.$.rate": rateEditT
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

              if(transcation != ""){
                var transactionEdit = await Transaction.updateOne(
                  { _id: transcation },
                  {
                    $set: {
                      // "invoice.$.category": req.body.value.category,
                      "debit": totalPayment,
                      "voucherType": "ProntoPaymentVoucher",
                      "voucherAddress": docID
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
              }
  
            } else {
              console.log("prontoPV");
              data["invoiceNumber"] = invoiceNumber;
              //data["invoiceNumber"] = data.s1.f4.value;
  
              clientInvoiceHistory.invoiceNumber = invoiceNumber;
  
              console.log(clientInvoiceHistory);
  
              //return;
              data["user_created"] = email;
              console.log(data)
              const prontoPV = new ProntoPV(data);
              const savedprontoPV = await prontoPV.save();
              docid = savedprontoPV._id;
  
              console.log(savedprontoPV.docArray);
  
              console.log(savedprontoPV.countervalue + "counter valuefffffff");
  
              clientInvoiceHistory.docid = docid;
              clientInvoiceHistory.currency = currencyEdit;
              clientInvoiceHistory.countervalue = savedprontoPV.countervalue;
              
              var dummyData = await Suppliers.updateOne(
                { _id: id },
                { $push: { prontoVoucher: clientInvoiceHistory } },
                { upsert: true, new: true  }
              );

              if(transcation != ""){
                var transactionEdit = await Transaction.updateOne(
                  { _id: transcation },
                  {
                    $set: {
                      // "invoice.$.category": req.body.value.category,
                      "debit": totalPayment,
                      "voucherType": "ProntoPaymentVoucher",
                      "voucherAddress": docid
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
              }
              
            }
        } else if (modelCheck.includes("UnofficialPaymentVoucher")) {
          console.log("currency: " + data.s2.f4.value);
          data["currency"] = data.s2.f4.value;
          var currencyEdit = data.s2.f4.value;
          if (ObjectId.isValid(docID) && docID != "") {
              data["user_edit"] = email;
              console.log("Update doc by ID " + docID);
              const unofficialPV = await UnofficialPV.findOneAndUpdate(
                { _id: docID },
                data,
                { upsert: true },
                function (err, doc) {
                  if (err) console.log(err);
                  // console.log(doc.docArray)
                  console.log("Succesfully saved.");
                }
              );
  
              var dummyData = await Suppliers.updateOne(
                { _id: id,
                  "unofficialVoucher.docid": docID,
                },
                {
                  $set: {
                    // "invoice.$.category": req.body.value.category,
                    "unofficialVoucher.$.currency": currencyEdit,
                    "unofficialVoucher.$.invoiceNumber": invoiceNumber,
                    "unofficialVoucher.$.total": totalPayment,
                    "unofficialVoucher.$.updateTime": datetime,
                    "unofficialVoucher.$.rate": rateEditT
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

              if(transcation != ""){
                var transactionEdit = await Transaction.updateOne(
                  { _id: transcation },
                  {
                    $set: {
                      // "invoice.$.category": req.body.value.category,
                      "debit": totalPayment,
                      "voucherType": "UnofficialPaymentVoucher",
                      "voucherAddress": docID
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
              }
  
            } else {
              console.log("UnofficialPV");
              data["invoiceNumber"] = invoiceNumber;
              //data["invoiceNumber"] = data.s1.f4.value;
  
              clientInvoiceHistory.invoiceNumber = invoiceNumber;
  
              console.log(clientInvoiceHistory);
  
              //return;
              data["user_created"] = email;
              console.log(data)
              const unofficialPV = new UnofficialPV(data);
              const savedUnofficialPV = await unofficialPV.save();
              docid = savedUnofficialPV._id;
  
              console.log(savedUnofficialPV.docArray);
  
              console.log(savedUnofficialPV.countervalue + "counter valuefffffff");
  
              clientInvoiceHistory.docid = docid;
              clientInvoiceHistory.currency = currencyEdit;
              clientInvoiceHistory.countervalue = savedUnofficialPV.countervalue;
              
              //console.log(clientInvoiceHistory)
  
              var dummyData = await Suppliers.updateOne(
                { _id: id },
                { $push: { unofficialVoucher: clientInvoiceHistory } },
                { upsert: true, new: true  }
              );

              if(transcation != ""){
                var transactionEdit = await Transaction.updateOne(
                  { _id: transcation },
                  {
                    $set: {
                      // "invoice.$.category": req.body.value.category,
                      "debit": totalPayment,
                      "voucherType": "UnofficialPaymentVoucher",
                      "voucherAddress": docid
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
              }
            }
        } else {
        }

        var selectpayment = docArray["s3f7"];
        console.log(selectpayment);
        if(selectpayment =="Cash"){
          //docArray["s2f3"] = total;
          //docArray["s2f4"] = currency;
          //docArray["s2f6"] = currency;
          //docArray["s3f1"] = total;
          //docArray["s3f2"] = currency;
          docArray["s3f4"] = "";
          docArray["s3f5"] = "";
        } else if(selectpayment =="Check") {
          docArray["s3f1"] = "";
          docArray["s3f2"] = "";
        } else {}

        var clientName = clientData.fullname;

        console.log("finish");

        //Put condition if verified or not "/unverified"
        var outputPath = GenerateDocx(
          data,
          docxPath,
          docArray,
          req.query.doc,
          clientName,
          datetime
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

router.post("/vouchertemplate", verify, async (req, res) => {
  try {
    //console.log(req.body);
    if (
      !isEmptyOrSpaces(req.body.docModel) &&
      !isEmptyOrSpaces(req.body.docID)
    ) {
      var template = "";
      var field = req.body.docModel;

      var invoice = req.body.invoice;
      var invoiceSchemaID = req.body.invoiceSchemaID;
      var transcation = req.body.transcation;
      var docID = req.body.docID;
      var clientID = req.body.ClientID;
      var invoiceNumber = req.body.invoiceNumber;
      var rate = req.body.rate;

      console.log("rate" + rate);

      var total = req.body.total;
      var currency = req.body.currency;

      if(field == "SwornReceiptVoucher")
      {
          template = "Sworn Receipt Voucher";
      }
      else if(field== "ProntoReceiptVoucher"){
          template= "Pronto Receipt Voucher";
      } else if (field== "UnofficialReceiptVoucher"){
          template= "Unofficial Receipt Voucher";
      }  else if(field == "SwornPaymentVoucher")
      {
          template = "Sworn Payment Voucher";
      }
      else if(field== "ProntoPaymentVoucher"){
          template= "Pronto Payment Voucher";
      } else if (field== "UnofficialPaymentVoucher"){
          template= "Unofficial Payment Voucher";
      }else {
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
          if (modelCheck.includes("ProntoReceipt")) {
            if (true) {
              docSaved = await ProntoRV.find({ _id: docID });
              docSaved[0]["s2"]["f4"]["value"] = currency;
              docSaved[0]["s2"]["f6"]["value"] = currency;
              //docSaved[0]["s2"]["f7"]["value"] = rate;
              //docSaved[0]["s3"]["f1"]["value"] = total;
              docSaved[0]["s3"]["f2"]["value"] = currency;
              //docSaved[0]["s3"]["f4"]["value"] = total;
              docSaved[0]["s3"]["f5"]["value"] = currency;
              docSaved[0]["Currency"] = currency;
            }
          }
              else if (modelCheck.includes("UnofficialReceiptVoucher")) {
              if (true) {
                docSaved = await UnofficialRV.find({ _id: docID });
                docSaved[0]["s2"]["f4"]["value"] = currency;
                docSaved[0]["s2"]["f6"]["value"] = currency;
                //docSaved[0]["s3"]["f1"]["value"] = total;
                docSaved[0]["s3"]["f2"]["value"] = currency;
                //docSaved[0]["s3"]["f4"]["value"] = total;
                docSaved[0]["s3"]["f5"]["value"] = currency;
                docSaved[0]["Currency"] = currency;
              }
            } else if (modelCheck.includes("SwornReceiptVoucher")) {
            if (true) {
              docSaved = await SwornRV.find({ _id: docID });
            }
          } else if (modelCheck.includes("ProntoReceiptVoucher")) {
            if (true) {
              //docSaved = await PurchaseRV.find({ _id: docID });
            }
          } else if (modelCheck.includes("ProntoPayment")) {
              if (true) {
                docSaved = await ProntoPV.find({ _id: docID });
              }
            }
                else if (modelCheck.includes("UnofficialPaymentVoucher")) {
                if (true) {
                  docSaved = await UnofficialPV.find({ _id: docID });
                }
              } else if (modelCheck.includes("SwornPaymentVoucher")) {
              if (true) {
                docSaved = await SwornPV.find({ _id: docID });
              }
            } else if (modelCheck.includes("ProntoPaymentVoucher")) {
              if (true) {
                docSaved = await ProntoPV.find({ _id: docID });
              }
            }
              else {
          }

          var url = "";
          if(modelCheck.includes("Receipt")){
              // url =
              // "/api/voucher/datareceiptvoucher?lang=" +
              // docSaved[0]["type"] +
              // "&doc=" +
              // docSaved[0]["caption"] +
              // "&docID=" + docID +  "&id=" +
              // id;
              url =
              "/api/voucher/datareceiptvoucher?lang=" +
              docSaved[0]["type"] +
              "&doc=" +
              docSaved[0]["caption"] +
              "&id=" +
              id +
              "&invoice=" +
              invoice +
              "&invoiceSchemaID=" +
              invoiceSchemaID +
              "&transcation=" +
              transcation +
              "&docID=" +
              docID +
              "&clientID=" +
              clientID +
              "&invoiceNumber=" +
              invoiceNumber +
              "&rate=" +
              rate;

              
          } else {
              url =
              "/api/voucher/datapaymentvoucher?lang=" +
              docSaved[0]["type"] +
              "&doc=" +
              docSaved[0]["caption"] +
              "&id=" +
              id +
              "&invoice=" +
              invoice +
              "&invoiceSchemaID=" +
              invoiceSchemaID +
              "&transcation=" +
              transcation +
              "&docID=" +
              docID +
              "&clientID=" +
              clientID +
              "&invoiceNumber=" +
              invoiceNumber +
              "&rate=" +
              rate;
          }

          console.log("URL: " + url);


          // console.log('docSaved: ' + docSaved[0])
          const file = fs.readFileSync(htmlpath, "utf-8");
          var fixture_template = ejs.compile(file, { client: true });
          const html = fixture_template({ obj: docSaved[0], url: url });
          //console.log(docSaved[0])
          res.send({ html: html });
          return;
        }
      } catch (err) {
        console.log(err);
      }

    res.send({ html: "No Template added yet! vvv" });

  } 
} catch (err) {
  console.log(err);
}
});
  

router.post("/receiptvoucher", verify, async (req, res) => {
    try {
      if (
        !isEmptyOrSpaces(req.body.type)
      ) {
        let path = "./json/" + "English" + "/" + req.body.type + ".json";
        let htmlpath = "./GenerateHtml/" + req.body.type + ".ejs";
        let id = req.body.ClientID;
  
        console.log(req.body);
        var invoiceTemplate = req.body.type;
        var invoiceNumber = "";
        var rate = "";
        if (req.body.invoiceNumber != "") 
          invoiceNumber = req.body.invoiceNumber;

        if (req.body.rate != "") 
          rate = req.body.rate;
        // langCheck = langCheck.toLowerCase();

        var invoice = req.body.invoice;
        var invoiceSchemaID = req.body.invoiceSchemaID;
        var transcation = req.body.transcation;
        var docID = req.body.docID;
        var clientID = req.body.ClientID;
        var total = req.body.total;
        var currency = req.body.currency;
  
        var docSaved = "";
        var schemaData = "";
  
        try {
  
          var dataid = "";
          // console.log(dataid);
          if (!isEmptyOrSpaces(dataid)) {
  
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

          const event = new Date();
          const options = { year: "numeric", month: "long", day: "numeric" };
          
          let datetime = event.toLocaleDateString("en-US", {
            year: "numeric",
            day: "numeric",
            month: "long",
          });

          var numberWord;

          if(currency.toUpperCase() == "USD"){
            const str = dollarConvert.convert(parseFloat(total).toFixed(2));
            //const str2 = str.charAt(0).toUpperCase() + str.slice(1);
            numberWord = str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();
          } else {
            numberWord = converter.toWords(parseInt(total));
            numberWord = numberWord.charAt(0).toUpperCase() + numberWord.substring(1).toLowerCase();
            //numberWord = converter.toWords(parseFloat(total).toFixed(2));
            //numberWord = numberWord.charAt(0).toUpperCase() + numberWord.substring(1).toLowerCase();
            //const str = numberWord;
            //const str2 = str.charAt(0).toUpperCase() + str.slice(1);
            //numberWord = str2;
          }

          if(invoiceTemplate.includes("Pronto"))
          {
            data["s1"]["f4"]["value"] = datetime;
            data["s1"]["f3"]["value"] = invoiceNumber;
            data["s3"]["f6"]["value"] = invoiceNumber;
            data["s2"]["f3"]["value"] = total;
            //data["s2"]["f5"]["value"] = converter.toWords(parseInt(total));
            data["s2"]["f5"]["value"] = numberWord;
            data["s2"]["f4"]["value"] = currency;
            data["s2"]["f7"]["value"] = rate;
            data["s2"]["f6"]["value"] = currency;
            data["s3"]["f1"]["value"] = total;
            data["s3"]["f2"]["value"] = currency;
            data["s3"]["f4"]["value"] = total;
            data["s3"]["f5"]["value"] = currency;
          }
          else if(invoiceTemplate.includes("Sworn")){
            data["s1"]["f5"]["value"] = datetime;
            data["s1"]["f3"]["value"] = invoiceNumber;
            data["s3"]["f6"]["value"] = invoiceNumber;
            data["s2"]["f3"]["value"] = total;
            data["s2"]["f5"]["value"] = numberWord;
            //converter.toWords(parseInt(total));
            data["s2"]["f4"]["value"] = currency;
            data["s2"]["f6"]["value"] = currency;
            data["s3"]["f1"]["value"] = total;
            data["s3"]["f2"]["value"] = currency;
            data["s3"]["f4"]["value"] = total;
            data["s3"]["f5"]["value"] = currency;
          }
          else if(invoiceTemplate.includes("Unofficial")){
            data["s1"]["f4"]["value"] = datetime;
            data["s1"]["f3"]["value"] = invoiceNumber;
            data["s3"]["f6"]["value"] = invoiceNumber;
            data["s2"]["f3"]["value"] = total;
            data["s2"]["f5"]["value"] = numberWord;
            //converter.toWords(parseInt(total));
            data["s2"]["f4"]["value"] = currency;
            data["s2"]["f6"]["value"] = currency;
            data["s3"]["f1"]["value"] = total;
            data["s3"]["f2"]["value"] = currency;
            data["s3"]["f4"]["value"] = total;
            data["s3"]["f5"]["value"] = currency;
          }
          else if(invoiceTemplate.includes("Purchase")){
            data["s1"]["f4"]["value"] = datetime;
            data["s1"]["f3"]["value"] = invoiceNumber;
            data["s3"]["f6"]["value"] = invoiceNumber;
          }
          else{

          }
  
          data["rate"] = rate;

          url =
            "/api/voucher/datareceiptvoucher?lang=" +
            data["type"] +
            "&doc=" +
            data["caption"] +
            "&id=" +
            id +
            "&invoice=" +
            invoice +
            "&invoiceSchemaID=" +
            invoiceSchemaID +
            "&transcation=" +
            transcation +
            "&docID=" +
            docID +
            "&clientID=" +
            clientID +
            "&invoiceNumber=" +
            invoiceNumber +
            "&rate=" +
            rate;

  
          const file = fs.readFileSync(htmlpath, "utf-8");
          var fixture_template = ejs.compile(file, { client: true });
          const html = fixture_template({ obj: data, url: url });
  
          res.send({ html: html });
          return;
        }
      }
      res.send({ html: "No Template added yet! vvvv" });
    } catch (err) {
      console.log(err);
      res.send({ html: "No Template added yet! vvvvv" + err });
      // res.status(500).send({ error: 'Something failed!' })
    }
  });
  
  router.post("/paymentvoucher", verify, async (req, res) => {
    try {
      if (
        !isEmptyOrSpaces(req.body.type)
      ) {
        let path = "./json/" + "English" + "/" + req.body.type + ".json";
        let htmlpath = "./GenerateHtml/" + req.body.type + ".ejs";
        let id = req.body.ClientID;
  
        // langCheck = langCheck.toLowerCase();
  
        var docSaved = "";
        var schemaData = "";

        console.log(req.body);
        var invoiceTemplate = req.body.type;
        var invoiceNumber = "";
        if (req.body.invoiceNumber != "") 
          invoiceNumber = req.body.invoiceNumber;

        // langCheck = langCheck.toLowerCase();

        var invoice = req.body.invoice;
        var invoiceSchemaID = req.body.invoiceSchemaID;
        var transcation = req.body.transcation;
        var docID = req.body.docID;
        var clientID = req.body.ClientID;
        var total = req.body.total;
        var currency = req.body.currency;
  
        try {
  
          var dataid = "";
          // console.log(dataid);
          if (!isEmptyOrSpaces(dataid)) {
  
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
          if(invoiceTemplate.includes("Payment")){
            try {
              data1 = await Suppliers.find(
                { _id: key }
              );
              data1 = data1[0];
              //console.log(data1)
            } catch (err) {
              console.log(err);
            }
          } else {
            try {
              data1 = await Paid.find(
                { _id: key }
              );
              data1 = data1[0];
              //console.log(data1)
            } catch (err) {
              console.log(err);
            }
          }
  
          //console.log(data1["fullname"])
  
          console.log(data1);
  
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

          const event = new Date();
          const options = { year: "numeric", month: "long", day: "numeric" };
          
          let datetime = event.toLocaleDateString("en-US", {
            year: "numeric",
            day: "numeric",
            month: "long",
          });

          var numberWord;

          if(currency.toUpperCase() == "USD"){
            const str = dollarConvert.convert(parseFloat(total).toFixed(2));
            //const str2 = str.charAt(0).toUpperCase() + str.slice(1);
            numberWord = str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();
          } else {
            numberWord = converter.toWords(parseInt(total));
            numberWord = numberWord.charAt(0).toUpperCase() + numberWord.substring(1).toLowerCase();
            //numberWord = converter.toWords(parseFloat(total).toFixed(2));
            //numberWord = numberWord.charAt(0).toUpperCase() + numberWord.substring(1).toLowerCase();
            //const str = numberWord;
            //const str2 = str.charAt(0).toUpperCase() + str.slice(1);
            //numberWord = str2;
          }

  
          if(invoiceTemplate.includes("Purchase")){
            data["s2"]["f5"]["value"] = datetime;
            data["s1"]["f0"]["value"] = invoiceNumber;
            data["s2"]["f0"]["value"] = invoiceNumber;
          }
          else if(invoiceTemplate.includes("Pronto"))
          {
            data["s1"]["f5"]["value"] = datetime;
            data["s1"]["f4"]["value"] = invoiceNumber;
            data["s3"]["f6"]["value"] = invoiceNumber;
            data["s2"]["f3"]["value"] = total;
            data["s2"]["f5"]["value"] = numberWord;
            //converter.toWords(parseInt(total));
            data["s2"]["f4"]["value"] = currency;
            data["s2"]["f6"]["value"] = currency;
            data["s3"]["f1"]["value"] = total;
            data["s3"]["f2"]["value"] = currency;
            data["s3"]["f4"]["value"] = total;
            data["s3"]["f5"]["value"] = currency;
          }
          else if(invoiceTemplate.includes("Sworn")){
            data["s1"]["f5"]["value"] = datetime;
            data["s1"]["f4"]["value"] = invoiceNumber;
            data["s3"]["f6"]["value"] = invoiceNumber;
          }
          else if(invoiceTemplate.includes("Unofficial")){
            data["s1"]["f5"]["value"] = datetime;
            data["s1"]["f4"]["value"] = invoiceNumber;
            data["s3"]["f6"]["value"] = invoiceNumber;
            data["s2"]["f3"]["value"] = total;
            data["s2"]["f5"]["value"] = numberWord;
            //converter.toWords(parseInt(total));
            data["s2"]["f4"]["value"] = currency;
            data["s2"]["f6"]["value"] = currency;
            data["s3"]["f1"]["value"] = total;
            data["s3"]["f2"]["value"] = currency;
            data["s3"]["f4"]["value"] = total;
            data["s3"]["f5"]["value"] = currency;
          }
          else if(invoiceTemplate.includes("Purchfase")){
            data["s1"]["f5"]["value"] = datetime;
            data["s1"]["f4"]["value"] = invoiceNumber;
            data["s3"]["f6"]["value"] = invoiceNumber;
          }
          else{

          }

          url =
          "/api/voucher/datapaymentvoucher?lang=" +
          data["type"] +
          "&doc=" +
          data["caption"] +
          "&id=" +
          id +
          "&invoice=" +
          invoice +
          "&invoiceSchemaID=" +
          invoiceSchemaID +
          "&transcation=" +
          transcation +
          "&docID=" +
          docID +
          "&clientID=" +
          clientID +
          "&invoiceNumber=" +
          invoiceNumber;
  
          const file = fs.readFileSync(htmlpath, "utf-8");
          var fixture_template = ejs.compile(file, { client: true });
          const html = fixture_template({ obj: data, url: url });
  
          res.send({ html: html });
          return;
        }
      }
      res.send({ html: "No Template added yet! vv" });
    } catch (err) {
      console.log(err);
      res.send({ html: "No Template added yet! v" });
      // res.status(500).send({ error: 'Something failed!' })
    }
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
      } else if (docModel.includes("SwornInvoice")) {
        console.log("foundit");
        docxPath = "./DocumentTemplate/" + language + "/" + "Sworn Invoice.docx";
        docSaved = await SwornIV.find({ _id: docID });
      }else if (docModel.includes("UnofficialInvoice")) {
        console.log("foundit");
        docxPath = "./DocumentTemplate/" + language + "/" + "Unofficial Invoice.docx";
        docSaved = await UnofficialIV.find({ _id: docID });
  
      }else if (docModel.includes("ProntoInvoice")) {
        console.log("foundit");
        docxPath = "./DocumentTemplate/" + language + "/" + "Pronto Invoice.docx";
        docSaved = await ProntoIV.find({ _id: docID });
      }else if (docModel.includes("SwornReceiptVoucher")) {
        console.log("founditffffff");
        docxPath = "./DocumentTemplate/" + language + "/" + "Sworn Receipt Voucher.docx";
        docSaved = await SwornRV.find({ _id: docID });
        console.log(docSaved);
      }else if (docModel.includes("SwornPaymentVoucher")) {
        console.log("foundit");
        docxPath = "./DocumentTemplate/" + language + "/" + "Sworn Payment Voucher.docx";
        docSaved = await SwornPV.find({ _id: docID });
      }else if (docModel.includes("ProntoReceiptVoucher")) {
        console.log("foundit");
        docxPath = "./DocumentTemplate/" + language + "/" + "Pronto Receipt Voucher.docx";
        docSaved = await ProntoRV.find({ _id: docID });
      }else if (docModel.includes("ProntoPaymentVoucher")) {
        console.log("foundit");
        docxPath = "./DocumentTemplate/" + language + "/" + "Pronto Payment Voucher.docx";
        docSaved = await ProntoPV.find({ _id: docID });
      }else if (docModel.includes("UnofficialReceiptVoucher")) {
        console.log("foundit");
        docxPath = "./DocumentTemplate/" + language + "/" + "Unofficial Receipt Voucher.docx";
        docSaved = await UnofficialRV.find({ _id: docID });
      }else if (docModel.includes("UnofficialPaymentVoucher")) {
        console.log("foundit");
        docxPath = "./DocumentTemplate/" + language + "/" + "Unofficial Payment Voucher.docx";
        docSaved = await UnofficialPV.find({ _id: docID });
      }else if (docModel.includes("ProntoPurchaseInvoice")) {
        console.log("foundit");
        docxPath = "./DocumentTemplate/" + language + "/" + "Pronto Purchase Invoice.docx";
        docSaved = await ProntoPurchaseIV.find({ _id: docID });
      }else if (docModel.includes("UnofficialPurchaseInvoice")) {
        console.log("foundit");
        docxPath = "./DocumentTemplate/" + language + "/" + "Unofficial Purchase Invoice.docx";
        docSaved = await UnofficialPurchaseIV.find({ _id: docID });
      } else {
      }
	  
  
      console.log(docSaved[0]["docArray"]);
  
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
        datetime,
        language
      );
  
      console.log(outputPath[0]);
  
      var downloadLinkGenerator = downloadLink(datetime, docModel, client,language);
  
      var part1 = encodeURIComponent(downloadLinkGenerator[0]);
      var part2 = encodeURIComponent(downloadLinkGenerator[1]);
  
      res.send({ href: "/api/posts/r/?valid=" + part1 + "&pass=" + part2 });
    } catch (err) {
      console.log(err);
      res.send("error");
    }
  });

  router.get("/createreceiptvoucher", verify, (req, res) => {
    req.keep = "true";
    var query = Paid.find(
      {},
      { payment: 0, invoice: 0, English: 0, Español: 0, Français: 0, Arabic: 0, __v: 0 }
    );
  
    query.exec(function (err, result) {
      if (!err) {
        //let rawdata = "";
        //console.log(rawdata);
        //rawdata = result
        let dataReturn = result;
  
        //console.log(result)
  
        res.render("receiptvoucher", {
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
  
  router.get("/createpaymentvoucher", verify, (req, res) => {
    req.keep = "true";
    var query = Suppliers.find(
      {},
      { payment: 0, invoice: 0, English: 0, Español: 0, Français: 0, Arabic: 0, __v: 0 }
    );
    query.exec(function (err, result) {
      if (!err) {
        //let rawdata = "";
        //console.log(rawdata);
        //rawdata = result
        let dataReturn = result;
  
        //console.log(result)
  
        res.render("paymentvoucher", {
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


  router.get("/receiptvoucheredit", verify, (req, res) => {
    req.keep = "true";
    var query = Paid.find({}, { s0: 0, __v: 0 });
    query.exec(function (err, result) {
      if (!err) {
        //let rawdata = "";
        //console.log(rawdata);
        //rawdata = result
        let dataReturn = result;
  
        //console.log(result)
  
        res.render("editreceipt", {
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
  
  router.get("/paymentvoucheredit", verify, (req, res) => {
    req.keep = "true";
    var query = Suppliers.find({}, { s0: 0, __v: 0 });
    query.exec(function (err, result) {
      if (!err) {
        //let rawdata = "";
        //console.log(rawdata);
        //rawdata = result
        let dataReturn = result;
  
        //console.log(result)
  
        res.render("editpayment", {
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

  router.get("/receiptvouchertable", verify, async (req, res) => {
    req.keep = "true";
    res.render("receiptvouchertable", {
      // req.session.
      name: req.name,
      email: req.email,
      //data: data
    });
  });

  router.get("/receiptvouchertableold", verify, async (req, res) => {
    req.keep = "true";
    res.render("receiptvouchertableold", {
      // req.session.
      name: req.name,
      email: req.email,
      //data: data
    });
  });
  
  router.get("/paymentvouchertable", verify, async (req, res) => {
    req.keep = "true";
    res.render("paymentvouchertable", {
      // req.session.
      name: req.name,
      email: req.email,
      //data: data
    });
  });

  router.get("/paymentvouchertableold", verify, async (req, res) => {
    req.keep = "true";
    res.render("paymentvouchertableold", {
      // req.session.
      name: req.name,
      email: req.email,
      //data: data
    });
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


  function downloadLink(datetime, modelCheck, clientName, language = "English") {
    let rawdata;
    if (language == "English") {
      rawdata = fs.readFileSync("./json/English/template.json", "utf-8");
    } else if (language == "Français") {
      rawdata = fs.readFileSync("./json/Français/template.json", "utf-8");
    } else if (language == "Español") {
      rawdata = fs.readFileSync("./json/Español/template.json", "utf-8");
    } else if (language == "Arabic") {
      rawdata = fs.readFileSync("./json/Arabic/template.json", "utf-8");
    } else {
      // console.log("lyugggggggggggggggggggggggggggggggggggggggggggggggggggggggg");
      // console.log(user["payment"][j].language);
      // console.log(user["payment"][j]);
      rawdata = "";
      // add default row json ... or send message to client to fuck off
    }
  
    let docView = "";
    if(rawdata != ""){
      docView = JSON.parse(rawdata);
    }
  
    let docModelViewText = "";
  
    if(docView != ""){
      if (modelCheck.includes("Birth")) {
            docModelViewText =  docView["Birth Certificate"];
      } else if (modelCheck.includes("Divorce")) {
            docModelViewText =  docView["Divorce Certificate"];
      } else if (modelCheck.includes("Death")) {
            docModelViewText =  docView["Death Certificate"];
      } else if (modelCheck.includes("Marriage")) {
            docModelViewText =  docView["Marriage Certificate"];
      } else if (modelCheck.includes("Work")) {       
            docModelViewText =  docView["Work Permit"];
      } else if (modelCheck.includes("ID")) {
            docModelViewText =  docView["ID Card"];
      } else if (modelCheck.includes("MoF")) {
            docModelViewText =  docView["MoF Registration"];
      } else if (modelCheck.includes("Residence")) {
            docModelViewText =  docView["Residence Certificate"];
      } else if (modelCheck.includes("PrivateDriver")) {
            docModelViewText =  docView["Private Driver's license"];
      } else if (modelCheck.includes("Police")) {
            docModelViewText =  docView["Police record"];
      } else if (modelCheck.includes("NSSF")) {
            docModelViewText =  docView["NSSF Service Certificate"];
      } else if (modelCheck.includes("Individual")) {
            docModelViewText =  docView["Individual Extract"];
      } else if (modelCheck.includes("Family")) {
            docModelViewText =  docView["Family Extract"];
      } else if (modelCheck.includes("Consent")) {
            docModelViewText =  docView["Consent to travel"];
      } else if (modelCheck.includes("ResidencyPermit")) {
            docModelViewText =  docView["Residency Permit"];
      } else if (modelCheck.includes("Driver")) {
            docModelViewText =  docView["Driver's license certificate"];
      } else if (modelCheck.includes("Empty")) {
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
      } else {
        docModelViewText = modelCheck;
      }
    }
    else{
      //console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhs");
      docModelViewText = modelCheck;
    }
  
    var outputPath =
      "./Output/" + docModelViewText + " - " + clientName + " - " + datetime + ".docx";
  
    return [outputPath, docModelViewText + " - " + clientName + " - " + datetime];
  }
  
  // add mongo id for the user
  function GenerateDocx(
    data = 1,
    docxPath,
    docArray,
    modelCheck,
    clientName,
    datetime = "0",
    language = "English"
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
  
    var downloadLinkGenerator = downloadLink(datetime, modelCheck, clientName, language)
  
    
    
    var outputPath = downloadLinkGenerator[0];
  
    // var outputPath =
    //   "./Output/" + modelCheck + " - " + clientName + " - " + date + ".docx";
    // Get the path that been enter in mongo file for the client and save it with these path
    fs.writeFileSync(outputPath, buf);
  
    //[outputPath, modelCheck + ' ' + datetime];
    //return outputPath
    return [downloadLinkGenerator[0], downloadLinkGenerator[1]];
    //return [outputPath, modelCheck + " - " + clientName + " - " + date];
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
  
  function isNullOrDoesNotHaveCertainKeyWordOrEmptyOrSpaces(str,key){
    if(isEmptyOrSpaces(str))
    {
      return "";
    }
  }
  
  function isEmptyOrSpaces(str) {
    return str === null || str.match(/^ *$/) !== null;
  }
  
  function buildDocxHistory(str) {}
  
  const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };
  
  module.exports = router;
  
