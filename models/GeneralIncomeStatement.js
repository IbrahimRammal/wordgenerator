const mongoose = require('mongoose')

const generalIncomeStatementSchema = mongoose.Schema({
    "type": {
    "type": "String"
    },
    "client": {
    "id": {
        "type": "Date"
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
        "type": "Date"
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
        "type": "Date"
    },
    "email": {
        "type": "String"
    },
    "name": {
        "type": "String"
    }
    },
    "revenue": {
    "type": [
        "Mixed"
    ]
    },
    "expense": {
    "type": [
        "Mixed"
    ]
    },
    "ctrev": {
    "type": "String"
    },
    "ptrev": {
    "type": "String"
    },
    "ctexp": {
    "type": "String"
    },
    "ptexp": {
    "type": "String"
    },
    "ctax": {
    "type": "String"
    },
    "ptax": {
    "type": "String"
    },
    "cbtax": {
    "type": "String"
    },
    "pbtax": {
    "type": "String"
    },
    "cnet": {
    "type": "String"
    },
    "pnet": {
    "type": "String"
    },
    "date": {
    "type": "String"
    },
    "download": {
    "type": "String"
    },
    "caption": {
    "type": "String"
    },
    user_created: {type: 'String'},
    user_edit: {type: 'String'},
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    note: {type: 'String'},
    docArray: {type: 'Object'}
//   payment : [subPayment]
});

// Sets the created_at parameter equal to the current time
generalIncomeStatementSchema.pre("save", function (next) {
now = new Date();
this.updated_at = now;
if (!this.created_at) {
  this.created_at = now;
}
next();
});

const GeneralIncomeStatement = mongoose.model('GeneralIncomeStatement', generalIncomeStatementSchema)

module.exports = GeneralIncomeStatement
