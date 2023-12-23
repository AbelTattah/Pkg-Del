const express = require('express');
const Observer = require('../../models/observerModel');
const app = express();


const observer = {
    register:()=>{
        app.post("/obregister",async(req,res)=>{
            const check = await Observer.find({FirstName:req.body.FirstName,Surname:req.body.Surname},{FirstName:true});
          
                if (check.length==0) {
                    const observer = await Observer.create(req.body);
                    res.status(200).json(observer);
                    console.log("Observer Registered Successfully");
                   }    
                   else {
                    res.status(404).json({message:"Observer Already exists"}); 
                    console.log(check);
                   }
        
        })
    },
    viewAllRiders:()=>{
        app.get('/obvriders',async(req,res)=>{
        try {
            const rider = await Rider.find({},{FirstName:true,LastName:true,UserName:true,Email:true});
            res.status(200).json(rider);
        } catch (error) {
            console.log(error.message);
        }
        })
    },
    viewAllCustomers:()=>{
        app.get('/obvcustomers',async(req,res)=>{
        try {
            const customer = await Customer.find({},{FirstName:true,LastName:true,UserName:true,Email:true});
            res.status(200).json(customer);
        } catch (error) {
            console.log(error.message);
        }
        })
    },
    showCustomerDeliveryDetails:()=>{
        app.get('obvcudeliv',async(req,res)=>{
            try {
                const customer = Customer.find({UserName:req.body.UserName},{Deliveries:true});
                res.status(200).json(customer);
            } catch (error) {
                console.log(error.message);
            }
        })
    }
}


export default function() {
    observer.register();
    observer.showCustomerDeliveryDetails();
    observer.viewAllCustomers();
    observer.viewAllRiders();
}