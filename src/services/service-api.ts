const service = `internal-service`;
const transaction_service = `transaction-service`;

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
    get: `${service}/state/list/app/{id}`
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
  purpose_of_payment: {
    get: `${service}/payment-purpose/list/app`
  },
  Kyc: {
    getAll: `${service}/customer/kyc`,
    update: `${service}/customer/kyc/update/personal`,
    addressData: `${service}/customer/kyc/update/address`,
    getCountryKycFields: `${service}/country/kyc-form/{countryId}`
  },
  send_money: {
    promo_code_validate: `${service}/promo-code/validate`,
    beneficiary_validate: `${transaction_service}/trans/validate/beneficiary/account`,
    validate_sender: `${transaction_service}/trans/validate/sender/account`,
    confirm_payment: `${transaction_service}/trans/confirm-payment`,
    calculated_base_rate: `${service}/master/base-rate-config/getSendAmountCalculationDetails`,

    creat_quote: `${transaction_service}/api/v1/transactions/create-quote`
  },
  support: {
    faq: {
      getAll: `${service}/v1/faqs/list`
    },
    feedback: {
      getAll: `${service}/v1/help/feedback/user/all`,
      createFeedback: `${service}/v1/help/feedback/create`
    },
    support_request: {
      getAll: `${service}/support-requests/list`
    },
    comment: {
      getByFeedBack: `${service}/v1/help/{feedbackId}/comment/all`,
      create: `${service}/v1/help/create/{feedbackId}/comment`
    },
    support_reason: {
      getAll: `${service}/support-reasons/list`
    },
    user_guide: {
      getAll: `${service}/v1/help/setup/all`
    }
  },
  init: `${service}/users/init`
};

export interface NeoResponse<T = any> {
  data: T;
  responseStatus: string;
  message: string;
}
