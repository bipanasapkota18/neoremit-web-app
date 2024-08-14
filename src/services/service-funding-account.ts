import { useQuery } from "@tanstack/react-query";
import { api, NeoResponse } from "./service-api";
import { NeoHttpClient } from "./service-axios";

export interface FundingAccountResponse {
  idPayment: string;
  mask: string;
  name: string;
  LoginRequired: boolean;
  BankName: string;
}
const getAllFundingAccount = () => {
  return NeoHttpClient.get<NeoResponse<FundingAccountResponse[]>>(
    api.funding_account.getAll
  );
};
const useGetAllFundingAccount = () => {
  return useQuery({
    select: data => data?.data?.data,
    queryKey: [api.funding_account.getAll],
    queryFn: getAllFundingAccount
  });
};

const addFuncingAccount = () => {
  return NeoHttpClient.get<NeoResponse>(api.funding_account.addAccount);
};
const useAddFundingAccount = () => {
  return useQuery({
    select: data => data?.data?.data,
    queryKey: [api.funding_account.addAccount],
    queryFn: addFuncingAccount
  });
};

export { useAddFundingAccount, useGetAllFundingAccount };
