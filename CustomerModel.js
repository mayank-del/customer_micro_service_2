const mongoose=require("mongoose");

const CustomerSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    address:{
        type:String,
        require:true
    },
    age:{
        type:Number,
        require:true
    }
    
       
},{timestamps:true})

Customer=mongoose.model("customer",CustomerSchema);
module.exports={Customer};
