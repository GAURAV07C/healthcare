const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      require: true,
      trim: true,
    },
    email: {
      type: String,
      require: true,
      trim: true,
    },
    
    accountType: {
      type: String,
      enum: ["Patient", "Doctor"],
      require: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
    approved: {
      type: Boolean,
      default: true,
    },
    additionalDetails: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "Profile",
    },
    medicalDetails:{
      type: mongoose.Schema.Types.ObjectId,
      ref:'MedicalDetails'
    },
    resetPasswordExpires: {
      type: Date,
    },
    image: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
