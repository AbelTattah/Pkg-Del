const express = require('express');
const Customer = require('../../models/customerModel');
const Rider = require('../../models/riderModel');
const app  = express();


const rider = {
    login:()=>{
        app.get()
    },
    register:()=>{
        app.post("/rideregister",async(req,res)=>{
            const check = await Rider.find({FirstName:req.body.FirstName,Surname:req.body.Surname},{FirstName:true});
          
                if (check.length==0) {
                    const rider = await Rider.create(req.body);
                    res.status(200).json(rider);
                    console.log("Rider Registered Successfully");
                   }    
                   else {
                    res.status(404).json({message:"Rider Already exists"}); 
                    console.log(check);
                   }
        
        })
    },
    login:()=>{

    },
    messageRider:()=>{
        app.put('ridermsgcust',async(req,res)=>{
            try {
                const customer = Customer.findOneAndUpdate({UserName:req.body.UserName},{Messages:req.body.Messages});
                res.status(200).json(customer);
            } catch (error) {
                console.log(error.message);
            }
        })
    },
    acceptDelivery: ()=>{
        app.put('rideliaccept',async(req,res)=>{
            try {
                const delivery = await Rider.findOneAndUpdate({UserName:req.body.UserName},{Deliveries:req.body.Deliveries});
                res.status(200).json(delivery);
            } catch (error) {
                console.log(error.message);
            }
        })
    },
    location: () => {
        app.put('custlocation',async(req,res)=>{
            try {
                const location = await Customer.findOneAndUpdate({UserName:req.body.UserName},{Location:req.body.Location});
                res.status(200).json(location);
            } catch (error) {
                console.log(error.message);
            }
        })
    },
    pay:  () => {

    }
}


export default function RiderRoutes() {
    rider.location();
    rider.login();
    rider.messageRider();
    rider.pay();
    rider.acceptDelivery();
    rider.register();
}