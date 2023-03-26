const express = require('express')
const {userModel} = require('../models/users.models')
const userRouter = express.Router()
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')

userRouter.post("/register",async (req,res)=>{
    const {name,email,pass} = req.body
    try{
        bcrypt.hash(pass,5,async(err,hash)=>{
            if(err){
                res.status(400).send(err.message)
            }else{
                const user = new userModel({name,email,pass:hash})
                await user.save()
                res.status(200).send({'msg':"New User Has Been Registered"}) 
            }
        })
    }
    catch(err){
        res.status(400).send({'msg':"Something went wrong","error":err.message})
    }
    
})

userRouter.post("/login",async(req,res)=>{
    const {email,pass} = req.body
    try{
        const user = await userModel.find({email})
        if(user.length>0){
        bcrypt.compare(pass,user[0].pass,(err,result)=>{
            if(result){
            let token = jwt.sign({userID:user[0]._id},'masai')
            res.status(200).send({"msg":"Logged In","token":token})
            }else{
          res.status(400).send({"msg":"Wrong Credentials"})
            }
        })

        }else{ 
            res.status(400).send({"msg":"Wrong Credentials"})
        }
        
    }
    catch(err){
           res.status(400).send({"msg":"Wrong Credentials"})
    }
})

// userRouter.get("/allusers",async(req,res)=>{
//     try{
//     const user = await userModel.find()
    
//     res.status(200).send(user)
//     }
//     catch(err){
//     res.status(400).send("Something went wrong")
//     }
// })


module.exports = {userRouter}