const express = require('express');
const Customer = require('../../models/customerModel');
const Rider = require('../../models/riderModel');
const app  = express();


const cust = {
    login:()=>{
        app.get()
    },
    register:()=>{
        app.post("/custregister",async(req,res)=>{
            const check = await Customer.find({FirstName:req.body.FirstName,Surname:req.body.Surname},{FirstName:true});
          
                if (check.length==0) {
                    const customer = await Customer.create(req.body);
                    res.status(200).json(customer);
                    console.log("User Registered Successfully");
                   }    
                   else {
                    res.status(404).json({message:"User Already exists"}); 
                    console.log(check);
                   }
        
        })
    },
    login:()=>{

    },
    messageRider:()=>{
        app.put('/custmsgrider',async(req,res)=>{
            try {
                const rider = Rider.findOneAndUpdate({UserName:req.body.UserName},{Messages:req.body.Messages});
                res.status(200).json(rider);
            } catch (error) {
                console.log(error.message);
            }
        })
    },
    requestDelivery: ()=>{
        app.put('/custdelireq',async(req,res)=>{
            try {
                const delivery = await Customer.findOneAndUpdate({UserName:req.body.UserName},{Deliveries:req.body.Deliveries});
                res.status(200).json(delivery);
            } catch (error) {
                console.log(error.message);
            }
        })
    },
    location: () => {
        app.put('/custlocation',async(req,res)=>{
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


export default function CustomerRoutes() {
    cust.location();
    cust.login();
    cust.messageRider();
    cust.pay();
    cust.requestDelivery();
    cust.register();
}