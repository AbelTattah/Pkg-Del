const express = require('express');
const Customer = require('../../models/customerModel');
const Rider = require('../../models/riderModel');
const app  = express();


const cust = {
    register:()=>{
        app.post("/patient",async(req,res)=>{
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
        app.put('cusmsgrider',async(req,res)=>{
            try {
                const rider = Rider.findOneAndUpdate({UserName:req.body.UserName},{Messages:req.body.Messages});
                res.status(200).json(rider);
            } catch (error) {
                console.log(error.message);
            }
        })
    }
}