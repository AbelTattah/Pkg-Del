const express = require("express");
const Customer = require("../../models/customerModel");
const Rider = require("../../models/riderModel");
const app = express();
const cors = require("cors");
app.use(cors());
const router2 = express.Router();

router2.use((req, res, next) => {
  next();
});

//Register a customer
router2.post("/custregister", async (req, res) => {
  const check = await Customer.find({ UserName: req.body.UserName }, {});

  if (check.length === 0) {
    const customer = await Customer.create(req.body);
    res.status(200).json(customer);
    console.log("User Registered Successfully");
  } else {
    res.status(404).json({ message: "User Already exists" });
    console.log(check);
  }
});

//Message a rider
router2.put("/custmsgrider/:username", async (req, res) => {
  try {
    const rider = await Rider.findOneAndUpdate(
      { UserName: req.params.username },
      { Messages: req.body.Messages }
    );
    res.status(200).json(rider);
  } catch (error) {
    console.log(error.message);
  }
});

//View a customer's messages
router2.get("/custvmessages/:username", async (req, res) => {
  try {
    const message = await Customer.find(
      { UserName: req.params.username },
      { Messages: true }
    );
    res.status(200).json(message);
  } catch (error) {
    console.log(error.message);
  }
});

//Record delivery information
router2.put("/custdelireq", async (req, res) => {
  try {
    const delivery = await Customer.findOneAndUpdate(
      { UserName: req.body.UserName },
      { Deliveries: req.body.Deliveries }
    );
    res.status(200).json(delivery);
  } catch (error) {
    console.log(error.message);
  }
});

//Update customer location
router2.put("/custlocation", async (req, res) => {
  try {
    const location = await Customer.findOneAndUpdate(
      { UserName: req.body.UserName },
      { Location: req.body.Location }
    );
    res.status(200).json(location);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router2;
