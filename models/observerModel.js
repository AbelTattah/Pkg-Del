const mongoose = require("mongoose");


const observerSchema = mongoose.Schema({
  FirstName: {
    type: String,
    required: true,
  },
  LastName: {
    type: String,
    required: true,
  },
  UserName: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  Messages: {
    type: Array,
  },
});


const Observer = mongoose.model("pkgobserver", observerSchema);


module.exports = Observer;
