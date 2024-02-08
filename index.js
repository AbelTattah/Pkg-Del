const express = require('express')
const app = express()
const mongoose = require('mongoose')
const AdminRoutes = require('./routes/admin/adminRoutes')
const CustomerRoutes = require('./routes/customer/customerRoutes')
const RiderRoutes = require('./routes/rider/riderRoutes')
const ObserverRoutes = require('./routes/observer/observerRoutes')
const cors = require('cors')

app.use(express.json())

mongoose
  .connect(
    'mongodb+srv://tattahabelk:Abel1919@cluster0.bkxk0nq.mongodb.net/',
    {}
  )
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => console.log(error.message))

app.use(cors())

app.use('/admin', AdminRoutes)

app.use('/cust', CustomerRoutes)

app.use('/obse', ObserverRoutes)

app.use('/rider', RiderRoutes)

app.listen(4000, () => {
  console.log('PKG-DEL server is running')
})
