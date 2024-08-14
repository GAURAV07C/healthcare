
const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");

const emailTemplate = require("../mail/templates/emailVerificationTemplate");

 const OTPSchema = new mongoose.Schema({
    email:{
        type:String,
        require:true,
    },
    otp:{
        type:String,
        require:true,
    },
    createdAt:{
        type :Date,
        default:Date.now(),
        expires:5*60
    },
 });


 async function sendVerificationEmail(email,otp){
    try{
        const mailResponse = await mailSender(email,"Verification Email",emailTemplate(otp));

        console.log(`Email send Successfully : ${mailResponse}`);

    }catch(err){
        console.log(`error occur while sending mails : ${err}`);
        throw err;

    }
 }

 OTPSchema.pre("save",async function(next) {
    console.log("New document saved to database");

	// Only send an email when a new document is created
	if (this.isNew) {
		await sendVerificationEmail(this.email, this.otp);
	}
	next();
 });

 module.exports = mongoose.model("OTP",OTPSchema);