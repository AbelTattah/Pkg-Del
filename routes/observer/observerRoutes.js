const express = require("express");
const Observer = require("../../models/observerModel");
const router3 = express.Router();
const app = express();
const cors = require("cors");
const Customer = require("../../models/customerModel");
const Rider = require("../../models/riderModel");
app.use(cors());

router3.use((req, res, next) => {
  next();
});

//Register an observer
router3.post("/obregister", async (req, res) => {
  const check = await Observer.find(
    { FirstName: req.body.FirstName, Surname: req.body.Surname },
    { FirstName: true }
  );

  if (check.length === 0) {
    const observer = await Observer.create(req.body);
    res.status(200).json(observer);
    console.log("Observer Registered Successfully");
  } else {
    res.status(404).json({ message: "Observer Already exists" });
    console.log(check);
  }
});

//View all riders information
router3.get("/obvriders", async (req, res) => {
  try {
    const rider = await Rider.find(
      {},
      { FirstName: true, LastName: true, UserName: true, Email: true }
    );
    res.status(200).json(rider);
  } catch (error) {
    console.log(error.message);
  }
});

//View all observers messages
router3.get("/obsvmessages/:username", async (req, res) => {
  try {
    const message = await Observer.find(
      { UserName: req.params.username },
      { Messages: true }
    );
    res.status(200).json(message);
  } catch (error) {
    console.log(error.message);
  }
});

//View all customers information
router3.get("/obvcustomers", async (req, res) => {
  try {
    const customer = await Customer.find(
      {},
      { FirstName: true, LastName: true, UserName: true, Email: true }
    );
    res.status(200).json(customer);
  } catch (error) {
    console.log(error.message);
  }
});

//View a customer's delivery info
router3.get("/obvcudeliv/:username", async (req, res) => {
  try {
    const customer = Customer.find(
      { UserName: req.params.username },
      { Deliveries: true }
    );
    res.status(200).json(customer);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router3;
