const BASE_URL = "http://localhost:4000/api/v1" || process.env.BASE_URL;

export const userEndpoints = {
  SENDOTP_API: BASE_URL + "/auth/sendOtp",
  VERYFY_API: BASE_URL + "/auth/verifyOTP",
};
