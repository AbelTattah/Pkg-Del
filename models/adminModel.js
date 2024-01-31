const mongoose = require('mongoose')

const adminSchema = mongoose.Schema({
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
  Messages: {
    type: Array
  }
})

const Admin = mongoose.model('pkgadmin', adminSchema)

module.exports = Admin
