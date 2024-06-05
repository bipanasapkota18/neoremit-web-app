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
    getAllRelationship: `${service}/relationship/list/app`
  },
  beneficiary: {
    getAll: `${service}/beneficiary/detail`,
    create: `${service}/beneficiary/detail`,
    getBeneficiaryById: `${service}/beneficiary/detail/{id}`,
    delete: `${service}/beneficiary/detail/{id}`,
    updatae: `${service}/beneficiary/detail/{id}`
  },
  beneficiary_detail: {
    getBeneficiaryDetail: `${service}/beneficiary/checkout/detail/{beneficiaryDetailId}`,
    createBeneficiaryDetail: `${service}/beneficiary/checkout/detail/{beneficiaryDetailId}`,
    updateBeneficiaryDetail: `${service}/beneficiary/checkout/detail/update/{beneficiaryDetailId}`,
    getBeneficiaryDetailById: `${service}/beneficiary/checkout/detail/{beneficiaryCheckoutId}`,
    deleteBeneficiaryDetail: `${service}/beneficiary/checkout/detail/{beneficiaryCheckoutId}`
  },
  payout_method: {
    get: `${service}/payout-method/list/app/{id}`
  },
  payout_partner: {
    get: `${service}/payout-partner/list/app/{payoutMethodId}`
  },
  init: `${service}/users/init`
};

export interface NeoResponse<T = any> {
  data: T;
  responseStatus: string;
  message: string;
}
