const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

var CounterSchema = mongoose.Schema({
    _id: {type: String, required: true},
    seq: { type: Number, default: 1 },
    year: {type: Number, default: 23}
});

var UnofficialInvoiceCounter = mongoose.model('UnofficialInvoiceCounter', CounterSchema);

const unofficialInvoiceSchema = mongoose.Schema({
    "type": {
      "type": "String"
    },
    "client": {
      "id": {
        "type": "String"
      },
      "email": {
        "type": "String"
      },
      "name": {
        "type": "String"
      }
    },
    "createuser": {
      "id": {
        "type": "String"
      },
      "email": {
        "type": "String"
      },
      "name": {
        "type": "String"
      }
    },
    "modifieduser": {
      "id": {
        "type": "String"
      },
      "email": {
        "type": "String"
      },
      "name": {
        "type": "String"
      }
    },
    "s0": {
      "fullname": {
        "type": "String"
      },
      "name": {
        "type": "String"
      },
      "surname": {
        "type": "String"
      },
      "father": {
        "type": "String"
      },
      "address": {
        "type": "String"
      },
      "mobile": {
        "type": "String"
      },
      "registration": {
        "type": "String"
      },
      "vat": {
        "type": "String"
      },
      "mof": {
        "type": "String"
      }
    },
    "s1": {
      "caption": {
        "type": "String"
      },
      "f0": {
        "caption": {
          "type": "String"
        },
        "value": {
          "type": "String"
        }
      },
      "f1": {
        "caption": {
          "type": "String"
        },
        "value": {
          "type": "String"
        }
      },
      "f2": {
        "caption": {
          "type": "String"
        },
        "value": {
          "type": "String"
        }
      },
      "f3": {
        "caption": {
          "type": "String"
        },
        "value": {
          "type": "String"
        }
      }
    },
    "s2": {
      "caption": {
        "type": "String"
      },
      "f0": {
        "caption": {
          "type": "String"
        },
        "value": {
          "type": "String"
        }
      },
      "f1": {
        "caption": {
          "type": "String"
        },
        "value": {
          "type": "String"
        }
      },
      "f2": {
        "caption": {
          "type": "String"
        },
        "value": {
          "type": "String"
        }
      },
      "f3": {
        "caption": {
          "type": "String"
        },
        "value": {
          "type": "String"
        }
      },
      "f4": {
        "caption": {
          "type": "String"
        },
        "value": {
          "type": "String"
        }
      },
      "f5": {
        "caption": {
          "type": "String"
        },
        "value": {
          "type": "String"
        }
      },
      "f6": {
        "caption": {
          "type": "String"
        },
        "value": {
          "type": "String"
        }
      },
      "f7": {
        "caption": {
          "type": "String"
        },
        "value": {
          "type": "String"
        }
      }
  },
    "s3": {
      "jobp": {
        "type": [
          "Mixed"
        ]
      }
    },
    "total": {
      "type": "String"
    },
    "date": {
      "type": "String"
    },
    "original": {
      "type": "String"
    },
    "download": {
      "type": "String"
    },
    "currency": {
      "type": "String"
    },
    "countervalue": {"type": "String"},
    "category": {
      "type": "String"
    },
    "caption": {
      "type": "String"
    },
    "leftheader": {
      "title": {
        "type": "String"
      },
      "defulat": {
        "type": "String"
      },
      "value": {
        "type": "String"
      },
      "style": {
        "type": "String"
      }
    },
    "centerheader": {
      "title": {
        "type": "String"
      },
      "defulat": {
        "type": "String"
      },
      "value": {
        "type": "String"
      },
      "style": {
        "type": "String"
      }
    },
    "rightheader": {
      "title": {
        "type": "String"
      },
      "defulat": {
        "type": "String"
      },
      "value": {
        "type": "String"
      },
      "style": {
        "type": "String"
      }
    },
    "centerfooter": {
      "title": {
        "type": "String"
      },
      "defulat": {
        "type": "String"
      },
      "value": {
        "type": "String"
      },
      "style": {
        "type": "String"
      }
    },
    docArray: {type: 'Object'},
    user_created: {type: 'String'},
    user_edit: {type: 'String'},
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    note: {type: 'String'}
});

// Sets the created_at parameter equal to the current time
unofficialInvoiceSchema.pre("save", function (next) {
  var doc = this;

  //var query = counter.find({}, { s0: 0, __v: 0 });
  //console.log(query);

  //updateOne     findOneAndUpdate
  UnofficialInvoiceCounter.findByIdAndUpdate({_id: "61f7f1819d18dd4559a00a7d"}, {$inc: { seq: 1} }, function(error, UnofficialInvoiceCounter)   {
      if(error)
      {
          console.log(UnofficialInvoiceCounter);
          return next(error);
      }
      console.log(UnofficialInvoiceCounter.seq + "ffffffffffffffffffffffff");

      // 👇️ Get the last 2 digits of the current year
      const twoDigitYear = new Date().getFullYear().toString().slice(-2);
      console.log(twoDigitYear); // 👉️ '23'
      const last2Num = Number(twoDigitYear);

      if(UnofficialInvoiceCounter.year == last2Num)
      {
        console.log(last2Num + " same year");
      } else {
        UnofficialInvoiceCounter.year = last2Num;
        UnofficialInvoiceCounter.seq = 1;

        UnofficialInvoiceCounter.save(function (err) {
          if (err) return handleError(err);

          console.log("the subdocs were removed");
        });
      }

      var sequenc = UnofficialInvoiceCounter.seq;
      
      if(sequenc.toString().length == 1)
      {
        sequenc = "0" + "0" + sequenc; 
      } else if(sequenc.toString().length == 2)
      {
        sequenc = "0" + sequenc; 
      } else if(sequenc.toString().length == 3)
      {
        //number = "0" + "0" + number; 
      } else{
    
      }

      doc.countervalue = sequenc + "/" + last2Num;
      //next();
      now = new Date();
      this.updated_at = now;
      if (!this.created_at) {
      this.created_at = now;
      }
      next();
  });


  // now = new Date();
  // this.updated_at = now;
  // if (!this.created_at) {
  // this.created_at = now;
  // }
  // next();
});

const UnofficialInvoice = mongoose.model('unofficialInvoice', unofficialInvoiceSchema)

module.exports = {
  UnofficialInvoice: UnofficialInvoice,
  UnofficialInvoiceCounter: UnofficialInvoiceCounter
};

//module.exports = UnofficialPV
