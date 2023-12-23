const express = require('express');
const app = express();
const mongoose = require('mongoose');
import AdminRoutes from './routes/admin/adminRoutes';
import CustomerRoutes from './routes/customer/customerRoutes';
import ObserverRoutes from './routes/observer/observerRoutes';
import RiderRoutes from './routes/rider/riderRoutes';


mongoose.connect('',()=>{
    console.log("Connected to MongoDB")
})

AdminRoutes();
CustomerRoutes();
ObserverRoutes();
RiderRoutes();

app.listen(3000,()=>{
console.log("Node server is running")
})




