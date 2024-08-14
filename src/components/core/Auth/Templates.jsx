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

    const signupData ={
      ...data
    }

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
                <Svg />
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
                          <svg
                            width="16"
                            height="20"
                            viewBox="0 0 16 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M15 19C15 15.6863 12.3137 13 9 13H7C3.68629 13 1 15.6863 1 19M12 5C12 7.20914 10.2091 9 8 9C5.79086 9 4 7.20914 4 5C4 2.79086 5.79086 1 8 1C10.2091 1 12 2.79086 12 5Z"
                              stroke="#CDE9DF"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
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
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M4 6L10 12M20 6L14 12M10 12L10.5858 12.5858C11.3668 13.3668 12.6332 13.3668 13.4142 12.5858L14 12M10 12L3.87868 18.1213M14 12L20.1213 18.1213M20.1213 18.1213C20.6642 17.5784 21 16.8284 21 16V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V16C3 16.8284 3.33579 17.5784 3.87868 18.1213M20.1213 18.1213C19.5784 18.6642 18.8284 19 18 19H6C5.17157 19 4.42157 18.6642 3.87868 18.1213"
                              stroke="#CDE9DF"
                              stroke-linecap="round"
                            />
                          </svg>
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
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M13.9157 20.2681L11.8489 18.8627C9.20932 17.0678 6.93225 14.7907 5.1373 12.1511L3.73188 10.0843C2.47798 8.24028 2.87204 5.73943 4.63223 4.3704L5.53514 3.66814C6.98923 2.53718 9.09777 2.87934 10.1196 4.41209L10.5588 5.07092C10.9656 5.68114 11.0143 6.46257 10.6863 7.11854C10.0829 8.32531 10.1139 9.7521 10.7692 10.9315L10.9339 11.2281C11.363 12.0004 11.9996 12.637 12.7719 13.0661L13.0685 13.2308C14.2479 13.8861 15.6747 13.9171 16.8815 13.3137C17.5374 12.9857 18.3189 13.0344 18.9291 13.4412L19.5879 13.8804C21.1207 14.9022 21.4628 17.0108 20.3319 18.4649L19.6296 19.3678C18.2606 21.128 15.7597 21.522 13.9157 20.2681Z"
                              stroke="#CDE9DF"
                              stroke-width="1.5"
                              stroke-linecap="round"
                            />
                          </svg>
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
        showModel && <VerifyEmail  onclose={() => setShowModel(false)} />
      )}
        
    </div>
  );
};

export default Templates;
