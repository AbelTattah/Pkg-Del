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
    }
}