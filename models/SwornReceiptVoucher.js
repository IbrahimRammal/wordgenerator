const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

var CounterSchema = mongoose.Schema({
    _id: {type: String, required: true},
    seq: { type: Number, default: 0 }
});

var SwornReceiptCounter = mongoose.model('SwornReceiptCounter', CounterSchema);

const swornReceiptVoucherSchema = mongoose.Schema({
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
      }
    },
    "s3": {
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
    "s4": {
      "check": {
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
    "category": {
      "type": "String"
    },
    "invoiceNumber": {
        "type": "String"
    },
    "caption": {
      "type": "String"
    },
    "accountNumber": {
      "type": "String"
    },
    "countervalue": {"type": "String"},
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
swornReceiptVoucherSchema.pre("save", function (next) {
    var doc = this;

    //var query = counter.find({}, { s0: 0, __v: 0 });
    //console.log(query);

    // SwornReceiptCounter.findOneAndUpdate({_id: "61f7f1819d18dd4559a00a7d"}, function(error, SwornReceiptCounter)   {
    //   if(error)
    //   {
    //       console.log(SwornReceiptCounter + "asjfkas;ldfkl;f");
    //       return next(error);
    //   }

    //   console.log(SwornReceiptCounter);
    // });

    //updateOne     findOneAndUpdate   findByIdAndUpdate
    SwornReceiptCounter.findByIdAndUpdate({_id: "61f7f1819d18dd4559a00a7d"}, {$inc: { seq: 1} }, function(error, SwornReceiptCounter)   {
        if(error)
        {
            console.log(SwornReceiptCounter);
            return next(error);
        }
        console.log(SwornReceiptCounter.seq + "ffffffffffffffffffffffff");
        doc.countervalue = SwornReceiptCounter.seq;
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

const SwornRV = mongoose.model('SwornReceiptVoucher', swornReceiptVoucherSchema)

//module.exports = SwornRV

module.exports = {
  SwornRV: SwornRV,
  SwornReceiptCounter: SwornReceiptCounter
};

