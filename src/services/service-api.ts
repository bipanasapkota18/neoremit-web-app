const service = `internal-service`;

export const api = {
  auth: {
    login: `${service}/api/auth/login`,
    refreshToken: `${service}/api/auth/refreshToken`,
    logout: `${service}/api/auth/logout`
  },

  users: {
    signUp: `${service}/users/register-user`,
    otp: `${service}/users/verify/otp`,
    resendOtp: `${service}/users/otp/resend`
  },

  common: {
    getAllCountryList: `${service}/country/list/app`
  },
  init: `${service}/users/init`
};

export interface NeoResponse<T = any> {
  data: T;
  responseStatus: string;
  message: string;
}
