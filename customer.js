const express=require("express");
const app=express();
const mongoose=require("mongoose");
const jwt=require("jsonwebtoken");
//const {privateKey}=require("../certs/private.pem")

const fs=require("fs");

const {Customer}=require("./CustomerModel")
app.use(express.json());


mongoose.connect("mongodb+srv://chat:chat@cluster0.vgstvmx.mongodb.net/?retryWrites=true&w=majority")
console.log("Database connected!")


app.post('/cust/login',async(req,res)=>{
    const user=await Customer.findOne({email:req.body.email})
    if(!user){
        return res.status(404).send("User not found, first register, then login!");
    }
    else if(user.password!==req.body.password){
        return res.status(401).send("Wrong Password!");
    }
    const secret=fs.readFileSync("../certs/private.pem")
    //console.log(privateKey);
    const token=jwt.sign({uid:user._id,name:user.name,email:user.email,add:user.address},secret,{expiresIn:"20m",algorithm:"RS256"})
    return res.status(200).send(token)
})

app.post("/create/cust",async(req,res)=>{
    try {
        //console.log(req.body);
        const result=await new Customer({
            email:req.body.email,
            password:req.body.password,
            name:req.body.name,
            age:req.body.age,
            address:req.body.address,
            
        }).save();
        return res.status(201).send(result);
    } catch (error) {
        
    }
})

app.listen(4006,()=>{
    console.log("customers service is running on:",4006);
})