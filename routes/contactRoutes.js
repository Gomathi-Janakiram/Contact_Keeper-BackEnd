const express = require("express")
const router = express.Router()
const Contacts = require("../models/contacts")
const requireLogin=require("../middlewares/requireLogin")

// get route
router.get("/contacts",requireLogin, (req, res) => {
    Contacts.find({user:req.user._id}).sort({_id:"-1"})
        .then(contacts => {
            res.json(contacts)
        }).catch(err => {
            res.json(err)
        })
})

// post route
router.post("/add",requireLogin, (req, res) => {
    const { name, email, phone, type } = req.body
    if(!name||!phone){
        res.json({error:"Please fill all the fields"})
    }
    const contact = new Contacts({
        name,
        email,
        phone,
        type,
        user:req.user._id
    })
    contact.save()
        .then(contact => {
            res.json({ message: "Contact saved successfully" })
        })
        .catch(err => {
            res.json(err)
        })
})

// put route

router.put("/edit",requireLogin,(req,res)=>{
    const {name,email,phone,type}=req.body
    console.log(req.body)
    Contacts.updateOne({_id:req.body.id},{$set:{
        name:name,
        email:email,
        phone:phone,
        type:type
    }})
    .then(contact=>{
        res.json(contact)
    }).catch(err=>{
        res.json(err)
    })
})

// delete route

router.delete("/:id",requireLogin,(req,res)=>{
    console.log(req.body)
    Contacts.deleteOne({_id:req.params.id},(err)=>{
        if(err){
            res.json(err)
        }else{
            res.json({message:"Contact deleted"})
        }
    })
    
})

module.exports=router
