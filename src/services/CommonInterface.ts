export interface BeneficiaryPayoutDetail {
  id: number;
  beneficiaryDetail?: any;
  payoutMethod: PayoutMethod;
  payoutPartner: PayoutPartner;
  accountName: string;
  accountNumber: string;
  isPrimary: boolean;
}

export interface PayoutPartner {
  id: number;
  payoutMethod: PayoutMethod;
  country: Country;
  name: string;
  code: string;
  image: string;
  isActive: boolean;
}

export interface Country {
  id: number;
  name: string;
}

export interface PayoutMethod {
  id: number;
  code: string;
  name: string;
  description: string;
  icon: string;
  isCash: boolean;
  isActive: boolean;
}

export interface IPageParams {
  page?: number;
  size?: number;
}
