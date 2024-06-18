import { KYCInfo } from "@neoWeb/services/service-kyc";
import create from "zustand";

interface KYCDataStore {
  kycData?: KYCInfo;
  setKycData: (kycData?: KYCInfo) => void;
}

export const useKycStoreData = create<KYCDataStore>(set => ({
  kycData: undefined,
  setKycData: kycData => set(state => ({ ...state, kycData }))
}));
