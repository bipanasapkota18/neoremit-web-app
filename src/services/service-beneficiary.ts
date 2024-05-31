import { toastFail, toastSuccess } from "@neoWeb/utility/Toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { NeoResponse, api } from "./service-api";
import { NeoHttpClient } from "./service-axios";

export interface IBeneficiaryRequest {
  beneficiaryDetailId?: number;
  fullName: string;
  mobileNumber: string;
  relationshipId: number;
  countryId: number;
  profileImage: string;
  bankId: number;
  address: string;
  beneficiaryCheckoutDetail: BeneficiaryCheckoutDetail[];
}

export interface BeneficiaryCheckoutDetail {
  id: number;
  payoutMethodId: number;
  payoutPartnerId: number;
  accountName: string;
  accountNumber: string;
  primary: boolean;
}
const BeneficiaryDetail = () => {
  return NeoHttpClient.get<NeoResponse>(api.BeneficiaryDetail.getAll);
};

const useGetBeneficiaryDetail = () => {
  return useQuery({
    queryKey: [api.BeneficiaryDetail.getAll],
    queryFn: BeneficiaryDetail
  });
};

const AddBeneficiary = () => {
  return NeoHttpClient.post<NeoResponse>(api.BeneficiaryDetail.create);
};
const useAddBeneficiary = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: AddBeneficiary,

    onSuccess: success => {
      queryClient.invalidateQueries({
        queryKey: [api.BeneficiaryDetail.create]
      });
      toastSuccess(success?.data?.message);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toastFail(error?.response?.data?.message ?? error?.message);
    }
  });
};

export { useAddBeneficiary, useGetBeneficiaryDetail };
