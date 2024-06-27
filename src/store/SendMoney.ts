import create from "zustand";

interface SendMoneyData {
  sendingCountryId: number | null;
  receivingCountryId: number | null;
  sendingAmount: string;
  receivingAmount: string;
  payoutMethodId: number | null;
}
interface SendMoneyStore {
  sendMoneyData?: SendMoneyData;
  setSendMoneyData: (sendMoneyData?: SendMoneyData) => void;
}

export const useSendMoneyStore = create<SendMoneyStore>(set => ({
  sendMoneyData: undefined,
  setSendMoneyData: sendMoneyData => set(state => ({ ...state, sendMoneyData }))
}));
