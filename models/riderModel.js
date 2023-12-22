const mongoose = require('mongoose');


const riderSchema = mongoose.Schema({
    FirstName:{
        type:String,
        required:true
    },
    LastName:{
        type:String,
        required:true
    },
    UserName:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true
    },
    Location:{
        type:Array,
    },
    Messages:{
        type:Array,
    },
    Deliveries:{
        type:Array
    }
})



const Rider = mongoose.model("pkgrider",riderSchema)

module.exports = Rider;