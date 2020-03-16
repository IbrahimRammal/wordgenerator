const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const clientSchema = mongoose.Schema({
  fullname: {
    type: 'String'
  },
  s0: {
    name: {
      type: 'String'
    },
    surname: {
      type: 'String'
    },
    father: {
      type: 'String'
    },
    mother: {
      type: 'String'
    },
    mothersurname: {
      type: 'String'
    },
    nationaltiy: {
      type: 'String'
    },
    sex: {
      type: 'String'
    },
    familystatus: {
      type: 'String'
    },
    governorate: {
      type: 'String'
    },
    district: {
      type: 'String'
    },
    city: {
      type: 'String'
    },
    quarter: {
      type: 'String'
    },
    street: {
      type: 'String'
    },
    building: {
      type: 'String'
    },
    floor: {
      type: 'String'
    },
    mobile: {
      type: 'String'
    },
    work: {
      type: 'String'
    },
    fax: {
      type: 'String'
    },
    email: {
      type: 'String'
    },
    profession: {
      type: 'String'
    },
    address: {
      type: 'String'
    },
    telephone: {
      type: 'String'
    },
    religion: {
      type: 'String'
    },
    placeofbirthlocal: {
      type: 'String'
    },
    placeofbirthdistrict: {
      type: 'String'
    },
    dateofbirth: {
      type: 'String'
    },
    placeregistry: {
      type: 'String'
    },
    noregistry: {
      type: 'String'
    }
  },
  Arabic: {
    EmptyTemplate: {
      type: 'String'
    }
  },
  English: {
    BirthCertificate: {
      type: 'String'
    },
    Consenttotravel: {
      type: 'String'
    },
    DeathCertificate: {
      type: 'String'
    },
    DivorceCertificate: {
      type: 'String'
    },
    Driverslicensecertificate: {
      type: 'String'
    },
    PrivateDriverslicense: {
      type: 'String'
    },
    FamilyExtract: {
      type: 'String'
    },
    IDCard: {
      type: 'String'
    },
    IndividualExtract: {
      type: 'String'
    },
    MarriageCertificate: {
      type: 'String'
    },
    MoFRegistration: {
      type: 'String'
    },
    NSSFServiceCertificate: {
      type: 'String'
    },
    Policerecord: {
      type: 'String'
    },
    ResidenceCertificate: {
      type: 'String'
    },
    ResidencyPermit: {
      type: 'String'
    },
    WorkPermit: {
      type: 'String'
    },
    EmptyTemplate: {
      type: 'String'
    }
  },
  Español: {
    BirthCertificate: {
      type: 'String'
    },
    Consenttotravel: {
      type: 'String'
    },
    DeathCertificate: {
      type: 'String'
    },
    DivorceCertificate: {
      type: 'String'
    },
    Driverslicensecertificate: {
      type: 'String'
    },
    PrivateDriverslicense: {
      type: 'String'
    },
    FamilyExtract: {
      type: 'String'
    },
    IDCard: {
      type: 'String'
    },
    IndividualExtract: {
      type: 'String'
    },
    MarriageCertificate: {
      type: 'String'
    },
    MoFRegistration: {
      type: 'String'
    },
    NSSFServiceCertificate: {
      type: 'String'
    },
    Policerecord: {
      type: 'String'
    },
    ResidenceCertificate: {
      type: 'String'
    },
    ResidencyPermit: {
      type: 'String'
    },
    WorkPermit: {
      type: 'String'
    },
    EmptyTemplate: {
      type: 'String'
    }
  },
  Français: {
    BirthCertificate: {
      type: 'String'
    },
    Consenttotravel: {
      type: 'String'
    },
    DeathCertificate: {
      type: 'String'
    },
    DivorceCertificate: {
      type: 'String'
    },
    Driverslicensecertificate: {
      type: 'String'
    },
    PrivateDriverslicense: {
      type: 'String'
    },
    FamilyExtract: {
      type: 'String'
    },
    IDCard: {
      type: 'String'
    },
    IndividualExtract: {
      type: 'String'
    },
    MarriageCertificate: {
      type: 'String'
    },
    MoFRegistration: {
      type: 'String'
    },
    NSSFServiceCertificate: {
      type: 'String'
    },
    Policerecord: {
      type: 'String'
    },
    ResidenceCertificate: {
      type: 'String'
    },
    ResidencyPermit: {
      type: 'String'
    },
    WorkPermit: {
      type: 'String'
    },
    EmptyTemplate: {
      type: 'String'
    }
  }
})

const Client = mongoose.model('Client', clientSchema)

module.exports = Client
