const mongoose = require("mongoose");

const physicianSchema = new mongoose.Schema({
  name: {
    type: String,
  },
});

module.exports = mongoose.module("Physician", physicianSchema);
