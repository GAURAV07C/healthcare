const User = require("../models/Users");
const OTP = require("../models/Otp");
const Profile = require("../models/Profile");
const otpGenerator = require("otp-generator");
require("dotenv").config();
const jwt = require("jsonwebtoken");

exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    var otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    console.log("OTP generate", otp);

    let result = await OTP.findOne({ otp: otp });

    while (result) {
      otp = otpGenerator(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      result = await OTP.findOne({ otp: otp });
    }

    const otpPayload = { email, otp };
    const otpBody = await OTP.create(otpPayload);
    console.log(otpBody);

    res.status(200).json({
      success: true,
      message: "OTP Sent Successfully",
      otp,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


exports.verifyOTP = async (req, res) => {
  try {
    const { fullName, accountType, contactNumber, email, otp } = req.body;

    if (!email || !otp) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    }

    const recentOtp = await OTP.find({ email })
      .sort({ createdAt: -1 })
      .limit(1);

    console.log("recent otp", recentOtp)

    if (recentOtp.length == 0) {
      return res.status(400).json({
        success: false,
        message: "OTP Not Found",
      });
    } else if (otp !== recentOtp[0].otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    const user = await User.findOne({ email });

    if (user) {
      // User already exists, log them in
      const payload = {
        email: user.email,
        id: user._id,
        fullName: user.fullName, // Use the fullName from the database
        accountType: user.accountType, // Use the accountType from the database
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });

      user.token = token;

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "Logged in successfully",
      });
    } else {
      // User doesn't exist, create a new user and log them in
      const profileDetails = await Profile.create({
        gender: null,
        dateOfBirth: null,
        address: null,
        contactNumber: contactNumber,
        occupation: null,

        emergencyContact: null,
        phoneNumber: null

      });
      const newUser = await User.create({
        email,
        additionalDetails: profileDetails._id,
        image: `https://api.dicebear.com/5.x/initials/svg?seed=${fullName}`,
        fullName: req.body.fullName, // Use the fullName from the request body
        accountType: req.body.accountType, // Use the accountType from the request body
      });

      const payload = {
        email: newUser.email,
        id: newUser._id,
        fullName: req.body.fullName, // Use the fullName from the request body
        accountType: req.body.accountType, // Use the accountType from the request body
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });

      newUser.token = token;

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user: newUser,
        message: "Logged in successfully",
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Login Failure, please try again",
    });
  }
};


