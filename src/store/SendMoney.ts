import { ISelectOptions } from "@neoWeb/utility/format";
import create from "zustand";
import { persist } from "zustand/middleware";
interface SendMoneyData {
  sendingCountry: ISelectOptions<number> | null;
  receivingCountry: ISelectOptions<number> | null;
  sendingAmount: string;
  receivingAmount: string;
  payoutMethod: ISelectOptions<number> | null;
  promoCode: string;
  fee: number | null;
  totalAmount: string;
  exchangeRate: number | null;
}

export interface BeneficiaryAccountData {
  payoutMethodId: ISelectOptions<number> | null;
  payoutPartnerId: ISelectOptions<number> | null;
  accountName: string;
  accountNumber: string;
  purposeOfPayment: ISelectOptions<number> | null;
  remarks: string;
  mobileNumber: string;
  country: string;
  beneficiaryId: number | null;
}

export interface TransactionData {
  transactionId: string;
  beneficiaryName: string;
  beneficiaryBankName: string;
  beneficiaryAccountNumber: string;
  processBy: string;
  processDate: string;
  transactionStatus: string;
  remarks: string;
  totalAmount: number;
  sendingAmount: number;
}

export interface IFundingAccount {
  idPayment: string;
  mask: string;
  name: string;
  LoginRequired: boolean;
  BankName: string;
}
interface SendMoneyStore {
  sendMoneyData?: SendMoneyData;
  setSendMoneyData: (sendMoneyData?: SendMoneyData) => void;
}

export const useSendMoneyStore = create(
  persist<SendMoneyStore>(
    set => ({
      sendMoneyData: undefined,
      setSendMoneyData: sendMoneyData =>
        set(state => ({ ...state, sendMoneyData }))
    }),
    {
      name: "send-money-storage", // Unique name for the storage key
      getStorage: () => localStorage // Or sessionStorage
    }
  )
);

interface BeneficiaryAccountStore {
  beneficiaryAccountData?: BeneficiaryAccountData;
  setBeneficiaryAccountData: (
    beneficiaryAccountData?: BeneficiaryAccountData
  ) => void;
}

export const useBeneficiaryAccountStore = create<BeneficiaryAccountStore>(
  set => ({
    beneficiaryAccountData: undefined,
    setBeneficiaryAccountData: beneficiaryAccountData =>
      set(state => ({ ...state, beneficiaryAccountData }))
  })
);

interface TransactionDataStore {
  transactionData?: TransactionData;
  setTransactionData: (transactionData?: TransactionData) => void;
}

export const useTransactionStore = create<TransactionDataStore>(set => ({
  transactionData: undefined,
  setTransactionData: transactionData =>
    set(state => ({ ...state, transactionData }))
}));

interface FundingAccountDataStore {
  fundingData?: IFundingAccount;
  setFundingData: (fundingData?: IFundingAccount) => void;
}

export const useFundingAccountStore = create<FundingAccountDataStore>(set => ({
  fundingData: undefined,
  setFundingData: fundingData => set(state => ({ ...state, fundingData }))
}));
