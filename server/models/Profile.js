const { type } = require("express/lib/response");
const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    gender:{
        type:String,
    },
    dateOfBirth:{
        type:String,
    },
    address:{
        type:String,
        trim:true,
    },
    contactNumber:{
        type:String,
        trim:true,
    },
    occupation:{
        type:String,
        trim:true
    },
    emergencyContact:{
        type:String,
        trim:true
    },
    phoneNumber:{
        type:String,
    }
});

module.exports = mongoose.model("Profile",profileSchema);
