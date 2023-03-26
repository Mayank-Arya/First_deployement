const express = require('express')
const {noteModel} = require("../models/notes.models")
const noteRouter = express.Router()

noteRouter.get("/",async(req,res)=>{
   try{
    const notes = await noteModel.find()
    res.status(200).send(notes)
   }
   catch(err){
    res.status(400).send(err.message)
   }
    
})

noteRouter.post('/create',async(req,res)=>{
    const payload = req.body
    try{
       const note = new noteModel(payload) 
       await note.save()
        res.status(200).send({'msg':"Note has been created"})
    }catch(err){
          res.send(err.message)
    }
    
})

noteRouter.patch("/updateNote/:id",async (req,res)=>{
    const Body = req.body
    const noteID = req.params.id
    try{
    const note = await noteModel.findByIdAndUpdate({_id:noteID},Body)
    res.status(200).send("The Note has been updated")
    }
    catch(err){
    res.status(400).send({"msg":"Something went wrong"})
    }
    res.send("Note Updated")
})

noteRouter.delete("/delete/:id",async(req,res)=>{
const nodeID = req.params.id
try{
 const note = await noteModel.findByIdAndDelete({_id:nodeID})
 res.status(200).send({"msg":"The Note has been deleted"})
}catch(err){
res.status(400).send({"msg":"There is some problem"})
}
})


module.exports = {noteRouter}
