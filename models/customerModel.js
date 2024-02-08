const mongoose = require('mongoose')

const customerSchema = mongoose.Schema({
  FirstName: {
    type: String,
    required: true
  },
  LastName: {
    type: String,
    required: true
  },
  UserName: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    required: true
  },
  Location: {
    type: Array
  },
  Messages: {
    type: Array
  },
  Deliveries: {
    type: Array
  }
})

const Customer = mongoose.model('pkgcustomer', customerSchema)

module.exports = Customer
