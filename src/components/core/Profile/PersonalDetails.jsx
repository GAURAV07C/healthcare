import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import CountryCode from "../../../data/countrycode.json";
import { PiAddressBookLight } from "react-icons/pi";

import Svg from "../../common/Svg";
const { SvgEmail, SvgName, SvgContact, SvgDate } = Svg;

const PersonalDetails = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        fullName: "",
        email: "",
        dateOfBirth: "",
        Address: "",
        EmergencyContact: "",
        contactNumber: "",
        insurance: "",
        ocuupation: "",
        phoneNumber: "",
      });
    }
  }, [reset, isSubmitSuccessful]);

  const submitHandler = async (data) => {
    console.log("data", data);
  };

  return (
    <div>
      <div>
        <h1>Personal Details</h1>
        <div>
          <form onSubmit={handleSubmit(submitHandler)}>
            <div>
              {/* name */}
              <div className="mb-4">
                <label
                  htmlFor="fullName"
                  className="block mb-2 leading-5 text-[14px] text-[#ABB8C4]"
                >
                  Full name
                </label>
                <div className="relative w-full flex flex-row  text-sm   p-2 pl-10 gap-3  bg-[#1A1D21] border border-[#363A3D] border-1 rounded-[8px]">
                  <div className="absolute left-3 top-2.5 py-1 -px-3 text-2xl">
                    <SvgName />
                  </div>
                  <input
                    type="text"
                    name="fullName"
                    id="fullName"
                    placeholder="Enter your full name"
                    className="w-[90%] bg-[#1A1D21] py-1 text-white focus:bg-[#1A1D21] focus:text-white focus:outline-none"
                    {...register("fullName", { required: true })}
                  />
                  {errors.fullName && (
                    <p className="text-red-500">{errors.fullName.message}</p>
                  )}
                </div>
              </div>
              <div className="flex flex-row">
                {/* left */}
                <div className="w-1/2">
                  {/* email */}
                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="block mb-2 leading-5 text-[14px] text-[#ABB8C4]"
                    >
                      Email address
                    </label>
                    <div
                      className="relative w-full flex flex-row  text-sm bg-[
                            #1A1D21]  p-2 pl-10 gap-3  bg-[#1A1D21] border border-[#363A3D] border-1 rounded-[8px] py-3"
                    >
                      <div className="absolute left-3 top-2.5 items-center  py-1 -px-3">
                        <SvgEmail />
                      </div>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="enter email address "
                        className="w-[90%] bg-[#1A1D21]  py-1 text-white focus:bg-[#1A1D21] focus:text-white focus:outline-none"
                        {...register("email", { required: true })}
                      />
                      {errors.email && (
                        <p className="text-red-500">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  {/* date of birth */}

                  <div className="mb-4">
                    <label
                      htmlFor="date"
                      className="block mb-2 leading-5 text-[14px] text-[#ABB8C4]"
                    >
                      Date of Birth:
                    </label>
                    <div
                      className="relative w-full flex flex-row  text-sm bg-[
                            #1A1D21]  p-2 pl-10 gap-3  bg-[#1A1D21] border border-[#363A3D] border-1 rounded-[8px] py-3"
                    >
                      <div className="absolute left-3 top-2.5 items-center  py-1 -px-3">
                        <SvgDate />
                      </div>

                      <input
                        type="date"
                        name="date"
                        id="date"
                        placeholder="Select your birth date"
                        className="w-[90%] bg-[#1A1D21] py-1 text-white focus:bg-[#1A1D21] focus:text-white focus:outline-none"
                        {...register("dateOfBirth", { required: true })}
                      />
                      {errors.dateOfBirth && (
                        <div>Date of birth is required</div>
                      )}
                    </div>
                  </div>

                  {/* Address */}
                  <div className="mb-4">
                    <label
                      htmlFor="Address"
                      className="block mb-2 leading-5 text-[14px] text-[#ABB8C4]"
                    >
                      Address
                    </label>
                    <div className="relative w-full flex flex-row  text-sm   p-2 pl-10 gap-3  bg-[#1A1D21] border border-[#363A3D] border-1 rounded-[8px]">
                      <div className="absolute left-3 top-2.5 py-0 -px-3 text-2xl font-bold">
                        <PiAddressBookLight />
                      </div>
                      <input
                        type="text"
                        name="Address"
                        id="Address"
                        placeholder="ex: 14 street, New York, NY - 5101"
                        className="w-[90%] bg-[#1A1D21] py-1 text-white focus:bg-[#1A1D21] focus:text-white focus:outline-none"
                        {...register("Address", { required: true })}
                      />
                      {errors.fullName && (
                        <p className="text-red-500">
                          {errors.fullName.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* emergency Contact */}

                  <div className="mb-4">
                    <label
                      htmlFor="EmergencyContact"
                      className="block mb-2 leading-5 text-[14px]  text-[#ABB8C4]"
                    >
                      Emergency contact name

                    </label>
                    <div
                      className="relative w-full flex flex-row  text-sm bg-[
#1A1D21]  p-2 pl-10 gap-3  bg-[#1A1D21] border border-[#363A3D] border-1 rounded-[8px]"
                    >
                      <div className="absolute left-3 top-2.5">
                        <SvgContact />
                      </div>
                      <div className="flex flex-row gap-5 ">
                        <select
                          name="dropdown"
                          id="dropdown"
                          className="w-[80px] bg-[#1A1D21]"
                          {...register("dropdown1")}
                        >
                          {CountryCode.map((option, index) => (
                            <option key={index} value={option.code}>
                              {option.code} -{option.country}
                            </option>
                          ))}
                        </select>
                        <input
                          type="tel"
                          name="EmergencyContact"
                          id="EmergencyContact"
                          placeholder="Guardian’s number"
                          className="w-[90%] bg-[#1A1D21] py-1 text-white focus:bg-[#1A1D21] focus:text-white focus:outline-none"
                          {...register("EmergencyContact", {
                            required: {
                              value: true,
                              message: "Please enter phone Number",
                            },
                            pattern: {
                              value: /^[0-9]+$/,
                              message: "Invalid Phone Number",
                            },
                            minLength: {
                              value: 8,
                              message: "Invalid Phone Number",
                            },
                            maxLength: {
                              value: 15,
                              message: "Invalid Phone Number",
                            },
                          })}
                        />
                      </div>
                      {errors.phoneNumber1 && (
                        <p className="text-red-500">
                          {errors.phoneNumber.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                {/* right */}

                <div className="w-1/2">
                  {/* phone */}
                  <div className="mb-4">
                    <label
                      htmlFor="phoneNumber"
                      className="block mb-2 leading-5 text-[14px]  text-[#ABB8C4]"
                    >
                      Phone number
                    </label>
                    <div
                      className="relative w-full flex flex-row  text-sm bg-[
#1A1D21]  p-2 pl-10 gap-3  bg-[#1A1D21] border border-[#363A3D] border-1 rounded-[8px]"
                    >
                      <div className="absolute left-3 top-2.5">
                        <SvgContact />
                      </div>
                      <div className="flex flex-row gap-5 ">
                        <select
                          name="dropdown"
                          id="dropdown"
                          className="w-[80px] bg-[#1A1D21]"
                          {...register("dropdown1")}
                        >
                          {CountryCode.map((option, index) => (
                            <option key={index} value={option.code}>
                              {option.code} -{option.country}
                            </option>
                          ))}
                        </select>
                        <input
                          type="tel"
                          name="contactNumber"
                          id="contactNumber"
                          placeholder="123 456 7890"
                          className="w-[90%] bg-[#1A1D21] py-1 text-white focus:bg-[#1A1D21] focus:text-white focus:outline-none"
                          {...register("contactNumber", {
                            required: {
                              value: true,
                              message: "Please enter phone Number",
                            },
                            pattern: {
                              value: /^[0-9]+$/,
                              message: "Invalid Phone Number",
                            },
                            minLength: {
                              value: 8,
                              message: "Invalid Phone Number",
                            },
                            maxLength: {
                              value: 15,
                              message: "Invalid Phone Number",
                            },
                          })}
                        />
                      </div>
                      {errors.phoneNumber1 && (
                        <p className="text-red-500">
                          {errors.phoneNumber.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;
