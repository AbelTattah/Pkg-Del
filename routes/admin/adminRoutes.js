const express = require('express')
const Customer = require('../../models/customerModel')
const Rider = require('../../models/riderModel')
const Admin = require('../../models/adminModel')
const cors = require('cors')
const app = express()
app.use(cors())

const route1 = express.Router()

route1.use((req, res, next) => {
  next()
})

route1.post('/adminregister', async (req, res) => {
  const check = await Admin.find({ UserName: req.body.UserName }, {})

  if (check.length === 0) {
    const customer = await Admin.create(req.body)
    res.status(200).json(customer)
    console.log('Admin Registered Successfully')
  } else {
    res.status(404).json({ message: 'Admin Already exists' })
    console.log(check)
  }
})

route1.get('/avcustomers', async (req, res) => {
  try {
    const customer = await Customer.find(
      {},
      {
        FirstName: true,
        LastName: true,
        UserName: true,
        Email: true,
        _id: false
      }
    )
    res.status(200).json(customer)
  } catch (error) {
    console.log(error.message)
  }
})

route1.get('/avriders', async (req, res) => {
  try {
    const customer = await Rider.find(
      {},
      {
        FirstName: true,
        LastName: true,
        UserName: true,
        Email: true,
        _id: false,
        Location: true
      }
    )
    res.status(200).json(customer)
  } catch (error) {
    console.log(error.message)
  }
})

route1.delete('/armuser', async (req, res) => {
  try {
    const customer = await Customer.deleteOne(
      { UserName: req.body.UserName },
      {}
    )
    res.status(200).json(customer)
  } catch (error) {
    console.log(error.message)
  }
})

route1.put('/amsguser', async (req, res) => {
  try {
    const customer = await Customer.updateMany(
      {},
      { Messages: req.body.Messages }
    )
    const rider = await Rider.updateMany({}, { Messages: req.body.Messages })
    res.send(200).json({ customer, rider })
  } catch (error) {
    console.log(error.message)
    console.log('Error Sending notifications')
  }
})

route1.get('/avcudeliv', async (req, res) => {
  try {
    const customer = Customer.find(
      { UserName: req.body.UserName },
      { Deliveries: true }
    )
    res.status(200).json(customer)
  } catch (error) {
    console.log(error.message)
  }
})

route1.get('/avcustdetails/:username', async (req, res) => {
  try {
    const customer = await Customer.find(
      { UserName: req.params.username },
      { FirstName: true, LastName: true, Email: true, Location: true }
    )
    res.status(200).json(customer)
  } catch (error) {
    console.log(error.message)
  }
})

// Get Riders who are sharing their location

route1.get('/avrideron', async (req, res) => {
  try {
    const rider = await Rider.find(
      {
        Location: {
          $exists: true,
          $not: { $size: 0 }
        }
      },
      { FirstName: true, LastName: true, Email: true, Location: true }
    )
    res.status(200).json(rider)
  } catch (error) {
    console.log(error.message)
  }
})

module.exports = route1
