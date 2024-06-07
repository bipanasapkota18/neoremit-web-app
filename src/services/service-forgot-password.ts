import { toastFail, toastSuccess } from "@neoWeb/utility/Toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { NeoResponse, api } from "./service-api";
import { NeoHttpClient } from "./service-axios";

interface IEmailVerification {
  email: string;
}

interface IOTPVerification {
  email: string;
  otpCode: string;
  otpFor: string;
}
interface IResendOTP {
  email: string;
  otpFor: string;
}
interface IsetMPIN {
  mPin: string;
}
export interface ISetPassword {
  email: string;
  newPassword: string;
  changePasswordFor: string;
}
export interface ISetPasswordResponse {
  email: string;
  newPassword: string;
  changePasswordFor: string;
}
export interface ISetPasswordFirst {
  email: string;
  newPassword: string;
  confirmPassword: string;
}

const verifyOTP = (data: IOTPVerification) => {
  return NeoHttpClient.post<NeoResponse<IOTPVerification>>(api.users.otp, data);
};

const useVerifyOTP = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: verifyOTP,
    onSuccess: success => {
      queryClient.invalidateQueries({ queryKey: [api.users.otp] });
      toastSuccess(success?.data?.message);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toastFail(error?.response?.data?.message ?? error?.message);
    }
  });
};

const emailVerification = (data: IEmailVerification) => {
  return NeoHttpClient.post<NeoResponse>(api.users.email, data);
};
const useEmailVerification = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: emailVerification,
    onSuccess: success => {
      queryClient.invalidateQueries({ queryKey: [api.users.email] });
      toastSuccess(success?.data?.message);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toastFail(error?.response?.data?.message ?? error?.message);
    }
  });
};

const resendOTP = (data: IResendOTP) => {
  return NeoHttpClient.post<NeoResponse<IResendOTP>>(api.users.resendOtp, data);
};

const useResendOTp = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: resendOTP,
    onSuccess: success => {
      queryClient.invalidateQueries({ queryKey: [api.users.resendOtp] });
      toastSuccess(success?.data?.message);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toastFail(error?.response?.data?.message ?? error?.message);
    }
  });
};
const resetPassword = (data: ISetPassword) => {
  return NeoHttpClient.post(api.users.changePassword, data);
};
const useResetPassword = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: resetPassword,
    onSuccess: success => {
      queryClient.invalidateQueries({ queryKey: [api.users.changePassword] });
      toastSuccess(success?.data?.message);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toastFail(error?.response?.data?.message ?? error?.message);
    }
  });
};
const setPassword = (data: ISetPasswordFirst) => {
  return NeoHttpClient.post<NeoResponse>(api.users.setPasword, data);
};

const useSetPassword = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: setPassword,
    onSuccess: success => {
      queryClient.invalidateQueries({ queryKey: [api.users.setPasword] });
      toastSuccess(success?.data?.message);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toastFail(error?.response?.data?.message ?? error?.message);
    }
  });
};
const setMPIN = ({ data, token }: { data: IsetMPIN; token: string }) => {
  return NeoHttpClient.post<NeoResponse<IsetMPIN>>(api.users.setMPIN, data, {
    headers: {
      customAuth: `Bearer ${token}`
    }
  });
};
const usesetMPIN = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: setMPIN,
    onSuccess: success => {
      queryClient.invalidateQueries({ queryKey: [api.users.setMPIN] });
      toastSuccess(success?.data?.message);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toastFail(error?.response?.data?.message ?? error?.message);
    }
  });
};

// const setMPIN = (data: IsetMPIN) => {
//   const token = TokenService.getToken()?.accessToken;
//   return NeoHttpClient.post<NeoResponse<IsetMPIN>>(api.users.setMPIN, data, {
//     headers: {
//       Authorization: `Bearer ${token}`
//     }
//   });
// };

export {
  useEmailVerification,
  useResendOTp,
  useResetPassword,
  useSetPassword,
  useVerifyOTP,
  usesetMPIN
};
