const express = require('express');
const router = express.Router();



const {
    sendOTP,
    verifyOTP

} = require("../controller/Auth")



router.post("/sendOtp",sendOTP);
router.post("/verifyOTP",verifyOTP);





module.exports = router;
