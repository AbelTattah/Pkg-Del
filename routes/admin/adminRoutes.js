const express = require('express')
const Customer = require('../../models/customerModel')
const Rider = require('../../models/riderModel')
const Admin = require('../../models/adminModel')
const cors = require('cors')
const Observer = require('../../models/observerModel')
const app = express()
app.use(cors())

const route1 = express.Router()

route1.use((req, res, next) => {
  next()
})

// Register an admin
route1.post('/adminregister', async (req, res) => {
  const check = await Admin.find({ UserName: req.body.UserName }, {})
  // Make sure that the admin does not exist already
  if (check.length === 0) {
    const customer = await Admin.create(req.body)
    res.status(200).json(customer)
    console.log('Admin Registered Successfully')
  } else {
    res.status(404).json({ message: 'Admin Already exists' })
    console.log(check)
  }
})

// View all customers
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

// View all riders
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

// Remove a customer by deleting their document
route1.delete('/armuser/:username', async (req, res) => {
  try {
    const customer = await Customer.deleteOne(
      { UserName: req.params.username },
      {}
    )
    res.status(200).json(customer)
  } catch (error) {
    console.log(error.message)
  }
})

// Message all users
route1.put('/amsgusers', async (req, res) => {
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

// Message a particular customer
route1.put('amsgcust/:username', async (req, res) => {
  try {
    const customer = await Customer.findOneAndUpdate(
      { UserName: req.params.username },
      { Messages: req.body.Messages }
    )
    res.status(200).json(customer)
  } catch (error) {
    console.log(error.message)
  }
})

// Message a particular rider
route1.put('amsgrider/:username', async (req, res) => {
  try {
    const customer = await Rider.findOneAndUpdate(
      { UserName: req.params.username },
      { Messages: req.body.Messages }
    )
    res.status(200).json(customer)
  } catch (error) {
    console.log(error.message)
  }
})

// Message a particular observer
route1.put('amsgobserver/:username', async (req, res) => {
  try {
    const customer = await Observer.findOneAndUpdate(
      { UserName: req.params.username },
      { Messages: req.body.Messages }
    )
    res.status(200).json(customer)
  } catch (error) {
    console.log(error.message)
  }
})

// Get all messages for a particular Admin
route1.get('/avmessages/:username', async (req, res) => {
  try {
    const message = await Admin.find(
      { UserName: req.params.username },
      { Messages: true }
    )
    res.status(200).json(message)
  } catch (error) {
    console.log(error.message)
  }
})

// Get all delivery details for a particular customer
route1.get('/avcudeliv/:username', async (req, res) => {
  try {
    const customer = Customer.find(
      { UserName: req.params.username },
      { Deliveries: true }
    )
    res.status(200).json(customer)
  } catch (error) {
    console.log(error.message)
  }
})

// Get the details for a particular customer
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

// Get the details for a particular rider
route1.get('/avriderdetails/:username', async (req, res) => {
  try {
    const customer = await Rider.find(
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
