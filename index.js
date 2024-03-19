const express = require('express') // Import express
const mongoose = require('mongoose')// Import mongoose
const AdminRoutes = require('./routes/admin/adminRoutes') // Import admin routes
const CustomerRoutes = require('./routes/customer/customerRoutes') // Import customer routes
const RiderRoutes = require('./routes/rider/riderRoutes') // Import rider routes
const ObserverRoutes = require('./routes/observer/observerRoutes') // Import observer routes
const cors = require('cors')
require('dotenv').config()

// Create express instance
const app = express()

// Middleware
app.use(express.json())

// Connect to MongoDB
mongoose
  .connect(
    'mongodb+srv://tattahabelk:@cluster0.bkxk0nq.mongodb.net/',
    {}
  )
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => console.log(error.message))

// Enable All CORS Requests
app.use(cors())

// Register Admin Routes
app.use('/admin', AdminRoutes)

// Register Customer Routes
app.use('/cust', CustomerRoutes)

// Register Observer Routes
app.use('/obse', ObserverRoutes)

// Register Rider Routes
app.use('/rider', RiderRoutes)

// Listen to port 4000
app.listen(4000, () => {
  console.log('PKG-DEL server is running')
})
