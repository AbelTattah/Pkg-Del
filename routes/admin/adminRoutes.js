const express = require('express');
const app = express();
import Admin from '../../models/adminModel';
import Customer from '../../models/customerModel';
import Rider from '../../models/riderModel';

const admin = {
    viewAllCustomers:()=>{
        app.get('/avcustomers',async(req,res)=>{
        try {
            const customer = await Customer.find({},{FirstName:true,LastName:true,UserName:true,Email:true});
            res.status(200).json(customer);
        } catch (error) {
            console.log(error.message);
        }
        })
    },
    viewAllRiders:()=>{
        app.get('/avriders',async(req,res)=>{
        try {
            const customer = await Rider.find({},{FirstName:true,LastName:true,UserName:true,Email:true});
            res.status(200).json(customer);
        } catch (error) {
            console.log(error.message);
        }
        })
    },
    removeAUser:()=>{
        app.delete('armuser',async(req,res)=>{
            try {
            const customer = await Customer.deleteOne({UserName:req.body.UserName},{});
            res.status(200).json(customer);
            } catch (error) {
            console.log(error.message);
            }
        })
    },
    shareGenralMessage:()=>{
        app.put('amsguser',async(req,res)=>{
            try {
                const customer = await Customer.updateMany({},{Notifications:req.body.Notifications});
                const rider = await Rider.updateMany({},{Notifications:req.body.Notifications});
                res.send(200)
            } catch (error) {
                console.log(error.message);
                console.log("Error Sending notifications")
            }
        })
    },
    showCustomerDeliveryDetails:()=>{
        app.get('avcudeliv',async(req,res)=>{
            try {
                const customer = Customer.find({UserName:req.body.UserName},{Deliveries:true});
                res.status(200).json(customer);
            } catch (error) {
                console.log(error.message);
            }
        })
    }
}


export default function AdminRoutes(){
    admin.removeAUser();
    admin.shareGenralMessage();
    admin.showCustomerDeliveryDetails();
    admin.viewAllCustomers();
    admin.viewAllRiders();
}

