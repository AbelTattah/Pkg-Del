const express = require('express');
const app = express();
const mongoose = require('mongoose');
import AdminRoutes from './routes/admin/adminRoutes';


mongoose.connect('',()=>{
    console.log("Connected to MongoDB")
})

AdminRoutes();


app.listen(3000,()=>{
console.log("Node server is running")
})




