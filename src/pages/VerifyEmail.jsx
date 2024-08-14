import { useState } from "react";
import OtpInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { verify } from "../services/operations/Auth";

const VerifyEmail = ({ onclose }) => {
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { signupData, loading } = useSelector((state) => state.auth);

  const handleVerifyAndSignup = () => {
    const { accountType, fullName, email, contactNumber } = signupData;

    dispatch(
      verify(accountType, fullName, email, contactNumber, otp, navigate)
    );
  };

  return (
    <div className="fixed  inset-0 bg-opacity-30 backdrop-blur-sm flex justify-center items-center ">
      <div className="bg-[#1A1D21] bg-opacity-96 px-5 py-5 border-[#FFFFFF] border-1 rounded-[8px]">
        <div>
          <div>
            
            <div className="flex flex-row justify-between">
              <h1 className="text-white text-xl px-3 py-4 font-semibold">
                Verify OTP
              </h1>
              <button className="place-see" onClick={onclose}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.16669 4.1665L15.8334 15.8332M15.8334 4.1665L4.16669 15.8332"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                </svg>
              </button>
            </div>
            <div>
              <p className="text-[#ABB8C4] px-2 py-2">
                Please enter the OTP sent to your registered mobile number.
              </p>
            </div>
          </div>
          <div>
            <form onSubmit={handleVerifyAndSignup}>
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderInput={(props) => (
                  <input
                    {...props}
                    placeholder="0"
                    style={{
                      boxShadow: "0px 1px 2px 0px #1018280D",
                    }}
                    className="w-[48px] lg:w-[60px] border border-[1px] border-solid border-[#363A3D] bg-[#131619] rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                  />
                )}
                containerStyle={{
                  justifyContent: "space-between",
                  gap: "0 6px",
                }}
              />
              <button
                type="submit"
                className="w-full bg-[#24AE7C] py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900"
              >
                Verify
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
