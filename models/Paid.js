const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const paidSchema = mongoose.Schema({
    combineid: {
      type: 'String'
    },
    fullname: {
      type: 'String'
    },
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
      },
    Arabic: {
      EmptyTemplate: {
        type: ['Mixed']
      }
    },
    English: {
      BirthCertificate: {
        type: ['Mixed']
      },
      Consenttotravel: {
        type: ['Mixed']
      },
      DeathCertificate: {
        type: ['Mixed']
      },
      DivorceCertificate: {
        type: ['Mixed']
      },
      Driverslicensecertificate: {
        type: ['Mixed']
      },
      PrivateDriverslicense: {
        type: ['Mixed']
      },
      FamilyExtract: {
        type: ['Mixed']
      },
      IDCard: {
        type: ['Mixed']
      },
      IndividualExtract: {
        type: ['Mixed']
      },
      MarriageCertificate: {
        type: ['Mixed']
      },
      MoFRegistration: {
        type: ['Mixed']
      },
      NSSFServiceCertificate: {
        type: ['Mixed']
      },
      Policerecord: {
        type: ['Mixed']
      },
      ResidenceCertificate: {
        type: ['Mixed']
      },
      ResidencyPermit: {
        type: ['Mixed']
      },
      WorkPermit: {
        type: ['Mixed']
      },
      EmptyTemplate: {
        type: ['Mixed']
      }
    },
    Español: {
      BirthCertificate: {
        type: ['Mixed']
      },
      Consenttotravel: {
        type: ['Mixed']
      },
      DeathCertificate: {
        type: ['Mixed']
      },
      DivorceCertificate: {
        type: ['Mixed']
      },
      Driverslicensecertificate: {
        type: ['Mixed']
      },
      PrivateDriverslicense: {
        type: ['Mixed']
      },
      FamilyExtract: {
        type: ['Mixed']
      },
      IDCard: {
        type: ['Mixed']
      },
      IndividualExtract: {
        type: ['Mixed']
      },
      MarriageCertificate: {
        type: ['Mixed']
      },
      MoFRegistration: {
        type: ['Mixed']
      },
      NSSFServiceCertificate: {
        type: ['Mixed']
      },
      Policerecord: {
        type: ['Mixed']
      },
      ResidenceCertificate: {
        type: ['Mixed']
      },
      ResidencyPermit: {
        type: ['Mixed']
      },
      WorkPermit: {
        type: ['Mixed']
      },
      EmptyTemplate: {
        type: ['Mixed']
      }
    },
    Français: {
      BirthCertificate: {
        type: ['Mixed']
      },
      Consenttotravel: {
        type: ['Mixed']
      },
      DeathCertificate: {
        type: ['Mixed']
      },
      DivorceCertificate: {
        type: ['Mixed']
      },
      Driverslicensecertificate: {
        type: ['Mixed']
      },
      PrivateDriverslicense: {
        type: ['Mixed']
      },
      FamilyExtract: {
        type: ['Mixed']
      },
      IDCard: {
        type: ['Mixed']
      },
      IndividualExtract: {
        type: ['Mixed']
      },
      MarriageCertificate: {
        type: ['Mixed']
      },
      MoFRegistration: {
        type: ['Mixed']
      },
      NSSFServiceCertificate: {
        type: ['Mixed']
      },
      Policerecord: {
        type: ['Mixed']
      },
      ResidenceCertificate: {
        type: ['Mixed']
      },
      ResidencyPermit: {
        type: ['Mixed']
      },
      WorkPermit: {
        type: ['Mixed']
      },
      EmptyTemplate: {
        type: ['Mixed']
      }
    }
  })

const Paid = mongoose.model('Paid', paidSchema)

module.exports = Paid
