import { toast } from "react-hot-toast";
import { userEndpoints } from "../apis";
import { setLoading, setToken } from "../../slices/authSlice";
import { apiConnector } from "../apiConnector";

const { SENDOTP_API, VERYFY_API } = userEndpoints;

export function sendOtp(email , navigate) {
  return async (dispatch) => {
    const loadingToastId = toast.loading("Loading...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("POST", SENDOTP_API, {
        email,
      });

      console.log("SENDOTP API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("OTP Sent Successfully");
      navigate("/");
    } catch (error) {
      console.log("SENDOTP API ERROR............", error);
      if (error.response && error.response.status === 401) {
        toast.error("Unauthorized request. Please check your API credentials.");
      } else {
        toast.error("Could Not Send OTP. Please try again later.");
      }
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(loadingToastId);
    }
  };
}

export function verify(accountType, fullName, email,contactNumber, otp, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try{
        const response = await apiConnector("POST",VERYFY_API , {
            fullName,
            email,
            accountType,
            contactNumber,
            otp

        })

        
      console.log("LOGIN API RESPONSE............", response);
      toast.success("Login Successful");
      dispatch(setToken(response.data.token));

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      localStorage.setItem("token", JSON.stringify(response.data.token));
      navigate("/dashboard");

    } catch (error) {
        console.log("LOGIN API ERROR............", error);
        toast.error("Login Failed");
      }
      dispatch(setLoading(false));
      toast.dismiss(toastId);
  };
}

export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null));
    //   dispatch(setUser(null));
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged Out");
    navigate("/");
  };
}
