const { type } = require("express/lib/response");
const mongoose = require("mongoose");

const mediacalDetailsSchema = new mongoose.Schema(
    {
        Physician:{
            type: mongoose.Schema.Types.ObjectId,
            require:true,
            ref:"Physician"
        },
        insurance:{
            type: String,

        },
        insurancePolicyNumber:{
            type: String,
        },
        Allergies:{
            type: String,
        },
        CurrentMedication:{
            type:String,
        },
        MedicalHistory:{
            type:String,
        },
        FamilyMedicalHistory:{
            type:String,
        }
    }
)

module.exports = mongoose.model("MedicalDetails",mediacalDetailsSchema);