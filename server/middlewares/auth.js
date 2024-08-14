const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/Users");

// This function is used as middleware to authenticate user requests
exports.auth = async (req, res, next) => {
  try {
    		// Extracting JWT from request cookies, body or header
    const token =
      req.cookies.token ||
      req.body.token ||
      req.header("Authorisation").replace("Bearer ", "");
	// If JWT is missing, return 401 Unauthorized response
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is missing",
      });
    }
// Verifying the JWT using the secret key stored in environment variables
    try {
      const decode = await jwt.verify(token, process.env.JWT_SECRET);
      console.log(decode);
      // Storing the decoded JWT payload in the request object for further use
      req.user = decode;
    } catch (err) {
        // If JWT verification fails, return 401 Unauthorized response
      return res.status(401).json({
        success: false,
        message: "token is invalid",
      });
    }
    // If JWT is valid, move on to the next middleware or request handler
    next();
  } catch (err) {
    // If there is an error during the authentication process, return 401 Unauthorized response
    return res.status(401).json({
      success: false,
      message: "Something went wrong while validating the token",
    });
  }
};

exports.isPatient = async (req, res, next) => {
  try {
    const userDetails = await User.findOne({ email: req.user.email });
  

    if (userDetails.accountType != "Patient") {
      return res.status(500).json({
        success: false,
        message: "This is a protected route for Student only",
      });
    }
    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "User role cannot be verified , please try again",
    });
  }
};

exports.isDoctor = async (req, res, next) => {
  try {
    const userDetails = await User.findOne({ email: req.user.email });
		console.log("ins ka details",userDetails);

		console.log(userDetails.accountType);
    if (userDetails.accountType != "Doctor") {
      return res.status(500).json({
        success: false,
        message: "This is a protected route for Instructor only",
      });
    }
    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "User role cannot be verified , please try again",
    });
  }
};


