const Profile = require("../models/Profile");
const Medical = require("../models/MedicalDetails");
const User = require("../models/Users");

exports.ProfileDetails = async (req, res) => {
  try {
    const {
      gender,
      dateOfBirth,
      address,
      phoneNumber,
      occupation,
      emergencyContact,
      Physician,
      insurance,
      insurancePolicyNumber,
      Allergies,
      CurrentMedication,
      MedicalHistory,
      FamilyMedicalHistory,
    } = req.body;

    if (
      !gender ||
      !dateOfBirth ||
      !address ||
      !phoneNumber ||
      !occupation ||
      !emergencyContact ||
      !CurrentMedication ||
      !MedicalHistory
    ) {
      return res.status(400).json({
        success: false,
        message: "please filled all the details",
      });
    }

    const id = req.user.id;

    console.log("id",id)

    const userDetails = await User.findById(id);
    const profile = await Profile.findById(userDetails.additionalDetails);

    profile.dateOfBirth = dateOfBirth;
    profile.gender = gender;
    profile.address = address;
    profile.occupation = occupation;
    profile.phoneNumber = phoneNumber;
    profile.emergencyContact = emergencyContact;

    await profile.save();

    const medical = await Medical.findById(userDetails.medicalDetails);

    medical.insurance=insurance;
    medical.insurancePolicyNumber= insurancePolicyNumber;
    medical.Allergies=Allergies;
    medical.CurrentMedication= CurrentMedication;
    medical.MedicalHistory=MedicalHistory;
    medical.FamilyMedicalHistory=FamilyMedicalHistory;

    await medical.save();

    const updatedProfile = await User.findById(id)
      .populate("additionalDetails")
      .exec();

    return res.json({
      success: true,
      message: "Profile Updated Successfully",
      userDetails,
      profile,
      updatedProfile,
    });
  } catch (err) {
    console.log("err", err);
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};
