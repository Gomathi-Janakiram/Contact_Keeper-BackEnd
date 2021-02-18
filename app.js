// npm installed pkgs
const express=require("express")
const app=express()
const mongoose=require("mongoose")
const cors=require("cors")


// PORT
const port=process.env.PORT||4000
// o9nYLyOPmMequybc

// mongoose db configuration
mongoose.connect("mongodb+srv://contact:o9nYLyOPmMequybc@cluster0.cxqlm.mongodb.net/<dbname>?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useUnifiedTopology:true
},(err)=>{
    if(err){
        console.log("Error connecting to database Contact-Keeper :(")
    }else{
        console.log("Connected to database Contact-Keeper :)")
    }
})
 

// models




// middlewares

app.use(express.json())
app.use(cors())

// routes
app.use(require("./routes/authRoutes"))
app.use(require("./routes/contactRoutes"))

app.get("/",(req,res)=>{
    res.json("hi")
})

// listening

app.listen(port,()=>{
    console.log(`server is running in ${port}`)
})