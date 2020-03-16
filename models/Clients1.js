const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const clientSchema = mongoose.Schema({
  info: {
    firstname: {
        caption: 'First Name',
        value: ''
    },
    fathername: {
        caption: 'Father Name',
        value: ''
    },
    lastname: {
        caption: 'Surname Name',
        value: ''
    },
    motherfirstname: {
        caption: 'Mother Name',
        value: ''
    },
    motherfathername: {
        caption: 'Mother Middle Name',
        value: ''
    },
    motherlastname: {
        caption: 'Mohter SurName',
        value: ''
    },
    placeofbirth: {
        caption: 'Place of Birth',
        value: ''
    },
    dateofbirth: {
        caption: 'Date of Birth',
        value: ''
    },
    sex: {
        caption: 'Gender',
        value: ''
    },
    familystatus: {
        caption: 'Family status',
        value: ''
    },
    registrynumber: {
        caption: 'Civil Registry Nº',
        value: ''
    },
    locality: {
        caption: 'Locality or Village',
        value: ''
    },
    district: {
        caption: 'District',
        value: ''
    },
    governorate: {
        caption: 'Governorate',
        value: ''
    },
    registryplace: {
        caption: 'Civil Registry Place',
        value: ''
    },
    religion:{
        caption: 'Religion',
        value: ''
    },
    city: {
        caption: 'City',
        value: ''
    },
    quarter: {
        caption: 'Quarter',
        value: ''
    },
    street: {
        caption: 'Street',
        value: ''
    },
    bldg: {
        caption: 'Bldg',
        value: ''
    },
    floor: {
        caption: 'Floor',
        value: ''
    },
    telphone: {
        caption: 'Tel.',
        value: ''
    },
    mobile: {
        caption: 'Mobile',
        value: ''
    },
    work: {
        caption: 'Work',
        value: ''
    },
    fax: {
        caption: 'Fax',
        value: ''
    },
    email: {
        caption: 'Email',
        value: ''
    }
  }
})

const Client = mongoose.model('Client', clientSchema)

module.exports = Client
