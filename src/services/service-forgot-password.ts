import { useMutation } from "@tanstack/react-query";
import { NeoResponse, api } from "./service-api";
import { NeoHttpClient } from "./service-axios";

// interface IEmailVerification {
//   email: string;
// }

interface IOTPVerification {
  email: string;
  otpCode: number;
  otpFor: string;
}
interface IResendOTP {
  email: string;
  otpFor: string;
}
const verifyOTP = () => {
  return NeoHttpClient.post<NeoResponse<IOTPVerification>>(api.users.otp);
};

const useVerifyOTP = () => {
  return useMutation({ mutationFn: verifyOTP });
};

const resendOTP = (data: IResendOTP) => {
  return NeoHttpClient.post<NeoResponse<IResendOTP>>(api.users.resendOtp, data);
};
const useResendOTP = () => {
  return useMutation({ mutationFn: resendOTP });
};
export { useResendOTP, useVerifyOTP };
