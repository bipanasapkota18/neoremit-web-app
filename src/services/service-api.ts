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
    resendOtp: `${service}/users/otp/resend`,
    email: `${service}/users/forgot-password`,
    changePassword: `${service}/users/otp/change-password`,
    setPasword: `${service}/internal/set-password`,
    setMPIN: `${service}/users/set-mpin`
  },

  common: {
    getAllCountryList: `${service}/country/list/app`,
    getAllRelationship: `${service}/relationship/list/app`,
    getAllMaritalStatus: `${service}/marital-status/list/app`,
    getAllOccupation: `${service}/occupation/list/app`,
    // get: `${service}/state/list/app/{countryId}`
    get: `${service}/state/list/app/36`
  },
  BeneficiaryDetail: {
    getAll: `${service}/beneficiary/detail`,
    create: `${service}/beneficiary/detail`
  },
  payout_method: {
    get: `${service}/payout-method/list/app/{id}`
  },
  payout_partner: {
    update: `${service}/payout_partner/{id}`
  },
  Kyc: {
    getAll: `${service}/customer/kyc`,

    update: `${service}/customer/kyc/update/personal`,
    getCountryKycFields: `${service}/country/kyc-form/{countryId}`
  },
  init: `${service}/users/init`
};

export interface NeoResponse<T = any> {
  data: T;
  responseStatus: string;
  message: string;
}
