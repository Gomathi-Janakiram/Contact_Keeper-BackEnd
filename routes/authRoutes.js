const express = require("express")
const router = express.Router()
const User = require("../models/users")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const JWT_SECRET = "ertybvtrtub5678hybkkbgdtyu";


// signup route
router.post("/signup", (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.json({ error: "Please fill all the fields" })
    }
    // checking whether email exists in db
    User.findOne({ email: email })
        .then(savedUser => {
            // if exists we throw the error
            if (savedUser) {
                res.json({ error: "User already exists!" })
            } else {
                // otherwise we get the password,hash that and store in db
                bcrypt.hash(password, 10)
                    .then(hashedPassword => {
                        // storing the details with hashed password in db
                        const user = new User({
                            name,
                            email,
                            password: hashedPassword
                        })
                        user.save()
                            .then(user => {
                                res.json({ message: "User saved successfully!!!" })
                            })
                            .catch(err => {
                                res.json(err)
                            })
                    })
                    .catch(err => {
                        res.json(err)
                    })
            }
        })
        .catch(err => {
            res.json(err)
        })
})

// login route

router.post("/login",(req,res)=>{
    const {email,password}=req.body;
    if(!email||!password){
        res.json({error:'Please fill all the fields'})
    }
    // checking whether email exists in db
    User.findOne({email:email})
    .then(savedUser=>{
        // if not exists,,we say to register
        if(!savedUser){
            res.json({error:"No such user!.Please register"})
        }else{
            // else we compare the password with db password
            bcrypt.compare(password,savedUser.password)
            .then(isPasswordMatched=>{
                // if matched we give the jwt_token to the user
                if(isPasswordMatched){
                   const token= jwt.sign({_id:savedUser._id},JWT_SECRET)
                   res.json({token:token,user:savedUser})
                }else{
                    // else we give error
                    res.json({error:"Wrong Credentials!!!"})
                }
            })
            .catch(err=>{
                res.json(err)
            })
        }
    }).catch(err=>{
        res.json(err)
    })
})

module.exports=router