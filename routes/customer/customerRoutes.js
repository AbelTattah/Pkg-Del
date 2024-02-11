const express = require("express");
const Customer = require("../../models/customerModel");
const Rider = require("../../models/riderModel");
const app = express();
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

app.use(cors());
const router2 = express.Router();

router2.use((req, res, next) => {
  next();
});

// Register a customer
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

// Message a rider
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

// View a customer's messages
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

// Record delivery information
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

var closestRiderIndex = 0;
var distanceOfRider = 0;

//Find closest coordinate
function findClosestCoordinate(coordinates, targetCoordinate) {
  if (!coordinates || !Array.isArray(coordinates) || coordinates.length === 0) {
    console.error("Invalid coordinates array");
    return;
  }

  if (
    !targetCoordinate ||
    typeof targetCoordinate !== "object" ||
    isNaN(targetCoordinate.lat) ||
    isNaN(targetCoordinate.long)
  ) {
    console.error("Invalid target coordinate");
    return;
  }

  let closestCoordinate = coordinates[0];
  let minDistance = getDistance(coordinates[0], targetCoordinate);

  for (let i = 1; i < coordinates.length; i++) {
    const distance = getDistance(coordinates[i], targetCoordinate);
    if (distance < minDistance) {
      minDistance = distance;
      distanceOfRider = minDistance;
      closestCoordinate = coordinates[i];
      closestRiderIndex = i;
    }
  }

  console.log(
    "Closest coordinate: " + closestCoordinate + "Index: " + closestRiderIndex
  );
  return closestRiderIndex;
}

//Get distance
function getDistance(coord1, coord2) {
  const lat1 = coord1.lat;
  const lon1 = coord1.long;
  const lat2 = coord2.lat;
  const lon2 = coord2.long;

  const R = 6371e3; // metres
  const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c; // in metres
  return distance;
}

//Handle delivery requests
async function handleDeliveryRequests(
  packageType,
  description,
  senderLocation,
  recipientLocation,
  recipientPhone,
  res,
  UserName
) {
  console.log("Validating delivery request");
  if (
    packageType.toLowerCase() === "food" ||
    (packageType.toLowerCase() === "gadget" &&
      description !== "" &&
      recipientLocation.lenth !== 0 &&
      recipientPhone.length === 10)
  ) {
    console.log("Delivery request validated");
    const riders = await axios.get(`${process.env.URL}/admin/avrideron`);
    console.log("Riders available: ", riders.data);
    if (riders.data.length === 0) {
      return res.status(406).json({ message: "No riders available" });
    } else {
      var arrayofCoords = [];
      //Arrange the coordinates of the riders in an array
      for (var i; i < riders.data.length; i++) {
        arrayofCoords.push({
          lat: riders[i].Location[0],
          long: riders[i].Location[1],
        });
      }
      //Get the closest rider
      console.log("Finding closest rider");
      const closestRider = findClosestCoordinate(arrayofCoords, {
        lat: senderLocation[0],
        long: senderLocation[1],
      });

      var usernameOfRider = riders[closestRider].UserName;

      //Get the pending deliveries of the rider
      const pendingDeliveries = await axios.get(
        `${process.env.URL}/rider/riderpending/${usernameOfRider}`
      );

      var deliveries = pendingDeliveries.data.Deliveries;

      deliveries.push({
        UserName: UserName,
        packageType: packageType,
        description: description,
        recipientLocation: recipientLocation,
        recipientPhone: recipientPhone,
      });

      //Send the delivery request to the closest rider
      const deliveryRequest = await axios.put(
        `${process.env.URL}/rider/riderdelireq/${usernameOfRider}`,
        { Deliveries: deliveries }
      );

      return res.status(200).json({ message: "Delivery request sent" });
    }
  } else {
    console.log("Invalid delivery request");
    res.status(406).json({ message: "Invalid delivery request" });
  }
}

router2.put("/custdelihandle", async (req, res) => {
  console.log("Handling delivery request");
  handleDeliveryRequests(
    req.body.packageType,
    req.body.description,
    req.body.senderLocation,
    req.body.recipientLocation,
    req.body.recipientPhone,
    res,
    req.body.senderUserName
  );
});

// Update customer location
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
