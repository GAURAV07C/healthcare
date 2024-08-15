import React, { useEffect, useState } from "react";
import logo from "../../../assets/images/form.png";
import { useForm } from "react-hook-form";
import { sendOtp } from "../../../services/operations/Auth";
import CountryCode from "../../../data/countrycode.json";
import VerifyEmail from "../../../pages/VerifyEmail";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSignupData } from "../../../slices/authSlice";

import Svg from "../../common/Svg";
const { SvgLogo, SvgEmail, SvgName, SvgContact } = Svg;

const Templates = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [showModel, setShowModel] = useState(false);
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
        contactNumber: "",
      });
    }
  }, [reset, isSubmitSuccessful]);

  const submitHandler = async (data) => {
    console.log("data", data);

    const signupData = {
      ...data,
    };

    // submit form
    try {
      setLoading(true);
      dispatch(setSignupData(signupData));
      dispatch(sendOtp(data.email, navigate));
      setLoading(false);
      setShowModel(true);
    } catch (err) {}
  };

  return (
    <div>
      <div className="grid place-items-center h-screen">
        <div className="mx-auto flex w-full flex-col justify-between gap-y-12  md:flex-row md:gap-y-0 md:gap-x-12 bg-[#131619] rounded-lg shadow-md">
          {/* left */}
          <div className="md:w-1/2 flex md:flex-row lg:flex-col  justify-center items-center">
            {/* logo */}
            <div className="w-2/3  flex flex-col justify-start">
              <div className="flex">
                <SvgLogo />
              </div>
              {/* content */}
              <div className="">
                <div className="flex flex-col gap-4">
                  <h1 className="text-[#FFFFFF] font-bold text-4xl leading-10 mt-20">
                    Hi there, ...
                  </h1>
                  <p className="text-[#ABB8C4]">
                    Get Started with Appointments
                  </p>
                </div>
                <div className="mt-14 text-[#FFFFFF]">
                  <form onSubmit={handleSubmit(submitHandler)}>
                    {/* full name */}
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
                        <input
                          type="hidden"
                          name="accountType"
                          id="accountType"
                          value="Patient"
                          {...register("accountType", { required: true })}
                        />
                        {errors.fullName && (
                          <p className="text-red-500">
                            {errors.fullName.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* email address */}
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

                    {/* phone number */}
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

                    {/* Get Started button */}
                    <button
                      disabled={loading}
                      type="submit"
                      className={`w-full rounded-md bg-[#24AE7C] px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)]
                     ${
                       !loading &&
                       "transition-all duration-200 hover:scale-95 hover:shadow-none"
                     }  disabled:bg-richblack-500 sm:text-[16px] `}
                    >
                      Get Started
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          {/* right */}
          <div
            className="md:w-1/2 h-screen rounded-[24px] bg-cover mt-0 "
            style={{ backgroundImage: `url(${logo})` }}
          />
        </div>
      </div>
      {loading ? (
        <div>ffggf </div>
      ) : (
        showModel && <VerifyEmail onclose={() => setShowModel(false)} />
      )}
    </div>
  );
};

export default Templates;
