const express = require('express')
const Customer = require('../../models/customerModel')
const Rider = require('../../models/riderModel')
const router4 = express.Router()
const app = express()
const cors = require('cors')
app.use(cors())

router4.use((req, res, next) => {
  next()
})

// Register a rider
router4.post('/rideregister', async (req, res) => {
  const check = await Rider.find({ UserName: req.body.UserName }, {})

  if (check.length === 0) {
    const rider = await Rider.create(req.body)
    res.status(200).json(rider)
    console.log('Rider Registered Successfully')
  } else {
    res.status(404).json({ message: 'Rider Already exists' })
    console.log(check)
  }
})

// Message a customer
router4.put('/ridermsgcust', async (req, res) => {
  try {
    const customer = await Customer.findOneAndUpdate(
      { UserName: req.body.UserName },
      { Messages: req.body.Messages }
    )
    res.status(200).json(customer)
  } catch (error) {
    console.log(error.message)
  }
})

// View a rider's messages
router4.get('/ridervmessages/:username', async (req, res) => {
  try {
    const message = await Rider.find(
      { UserName: req.params.username },
      { Messages: true }
    )
    res.status(200).json(message)
  } catch (error) {
    console.log(error.message)
  }
})

// Accept a delivery request
router4.put('/rideliaccept', async (req, res) => {
  try {
    const delivery = await Rider.findOneAndUpdate(
      { UserName: req.body.UserName },
      { Deliveries: req.body.Deliveries }
    )
    res.status(200).json(delivery)
  } catch (error) {
    console.log(error.message)
  }
})

// Update rider location
router4.put('/riderlocation', async (req, res) => {
  try {
    const location = await Rider.findOneAndUpdate(
      { UserName: req.body.UserName },
      { Location: req.body.Location }
    )
    res.status(200).json(location)
  } catch (error) {
    console.log(error.message)
  }
})

//View a rider's pending deliveries
router4.get('/riderpending/:username', async (req, res) => {
  try {
    const delivery = await Rider.find(
      { UserName: req.params.username },
      { Deliveries: true }
    )
    res.status(200).json(delivery)
  } catch (error) {
    console.log(error.message)
  }
})

//Rider delivery Request
router4.put('/riderdelireq/:username', async (req, res) => {
  try {
    const delivery = await Rider.findOneAndUpdate(
      { UserName: req.params.username },
      { Deliveries: req.body.Deliveries }
    )
    res.status(200).json(delivery)
  } catch (error) {
    console.log(error.message)
  }
}
)

module.exports = router4
