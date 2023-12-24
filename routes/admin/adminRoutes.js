const express = require('express');
const Customer = require('../../models/customerModel');
const Rider = require('../../models/riderModel');

const route1 = express.Router();

route1.use((req,res,next)=>{
    next();
})


   
        route1.get('/avcustomers',async(req,res)=>{
        try {
            const customer = await Customer.find({},{FirstName:true,LastName:true,UserName:true,Email:true,_id:false});
            res.status(200).json(customer);
        } catch (error) {
            console.log(error.message);
        }
        })
    

        route1.get('/avriders',async(req,res)=>{
        try {
            const customer = await Rider.find({},{FirstName:true,LastName:true,UserName:true,Email:true,_id:false});
            res.status(200).json(customer);
        } catch (error) {
            console.log(error.message);
        }
        })
    

        route1.delete('/armuser',async(req,res)=>{
            try {
            const customer = await Customer.deleteOne({UserName:req.body.UserName},{});
            res.status(200).json(customer);
            } catch (error) {
            console.log(error.message);
            }
        })

        route1.put('/amsguser',async(req,res)=>{
            try {
                const customer = await Customer.updateMany({},{Notifications:req.body.Notifications});
                const rider = await Rider.updateMany({},{Notifications:req.body.Notifications});
                res.send(200)
            } catch (error) {
                console.log(error.message);
                console.log("Error Sending notifications")
            }
        })
    
        route1.get('/avcudeliv',async(req,res)=>{
            try {
                const customer = Customer.find({UserName:req.body.UserName},{Deliveries:true});
                res.status(200).json(customer);
            } catch (error) {
                console.log(error.message);
            }
        })
        



module.exports = route1;