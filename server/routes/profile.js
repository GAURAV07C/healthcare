const express = require('express');
const router = express.Router();

const {ProfileDetails} =require('../controller/Profile');
const {auth , isPatient} = require("../middlewares/auth");

router.use("/user",auth,isPatient ,ProfileDetails);


module.exports = router;
