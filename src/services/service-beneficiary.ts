import { toastFail, toastSuccess } from "@neoWeb/utility/Toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { NeoResponse, api } from "./service-api";
import { NeoHttpClient, toFormData } from "./service-axios";
import { PageParams } from "./Support/service-faq";

export interface IBeneficiaryRequest {
  beneficiaryDetailId?: number | null;
  name: string;
  lastName: string;
  secondLastName: string;
  mobileNumber: string;
  relationshipId: number | null;
  countryId: number | null;
  profileImage: string | null;
  bankId: number | null;
  address: string;
  address2: string;
  nickName: string;
  routingNo: string;
}

export interface BeneficiaryCheckoutDetail {
  id: number;
  payoutMethodId: number;
  payoutPartnerId: number;
  accountName: string;
  accountNumber: string;
  primary: boolean;
}

export interface IBeneficiaryResponse {
  totalItems: number;
  beneficiaryDetailList: BeneficiaryDetailList[];
}

export interface BeneficiaryDetailList {
  id: number;
  userId: number;
  fullName: string;
  secondLastName: string;
  lastName: string;
  mobileNumber: string;
  relationship: Relationship;
  country: Country;
  address: string;
  profileImage: string;
  recipientUUID?: any;
  routingNo: string;
  address2: string;
  nickName: string;
}
export interface BeneficiaryCheckoutDetailRequest {
  name: string;
  lastName: string;
  secondLastName: string;
  mobileNumber: string;
  relationshipId: number;
  countryId: number;
  stateId: number;
  cityName: string;
  profileImage: string;
  address: string;
  address2: string;
  nickName: string;
  routingNo: string;
}

export interface PayoutPartner {
  label?: string;
  value?: number;
  id: number;
  payoutMethod: PayoutMethod;
  country: Country2;
  name: string;
  code: string;
  image: string;
  isActive: boolean;
}

export interface Country2 {
  id: number;
  name: string;
}

export interface PayoutMethod {
  value?: number;
  id: number;
  code?: string;
  name: string;
  description?: string;
  icon?: string;
  isCash?: boolean;
  isActive?: boolean;
}

export interface Country {
  id: number;
  code: string;
  name: string;
  shortName: string;
  phoneCode: string;
  isoNumber: string;
  currency: Currency;
  canReceive: boolean;
  canSend: boolean;
  isActive: boolean;
  flagIcon?: any;
  hasState: boolean;
}

export interface Currency {
  id: number;
  code: string;
  name: string;
  shortName: string;
  symbol: string;
  isActive: boolean;
}

export interface Relationship {
  id: number;
  name: string;
  code: string;
  isActive: boolean;
}

export interface IBeneficiaryByIdResponse {
  id?: any;
  beneficiaryDetail?: any;
  payoutMethod?: any;
  payoutPartner?: any;
  accountName?: any;
  accountNumber?: any;
  isPrimary: boolean;
  payoutType: string;
  partnerAccountNo: string;
  accountType: string;
  paymentLocationCode: string;
  payer: string;
  type: string;
  payoutId: number;
  isActive: boolean;
  mobileNumber: string;
  country: Country;
}
interface IFilterParams {
  pageParams?: PageParams;
  filterParams: any;
}
const getBeneficiary = ({ pageParams, filterParams }: IFilterParams) => {
  return NeoHttpClient.post<NeoResponse<IBeneficiaryResponse>>(
    api.beneficiary.getAll,
    {
      ...filterParams
    },
    {
      params: {
        page: pageParams?.pageIndex,
        size: pageParams?.pageSize
      }
    }
  );
};

const useGetBeneficiary = () => {
  return useMutation({
    mutationKey: [api.beneficiary.getAll],
    mutationFn: getBeneficiary
  });
};

const addBeneficiary = (data: IBeneficiaryRequest) => {
  return NeoHttpClient.post<NeoResponse>(
    api.beneficiary.create,
    toFormData(data)
  );
};
const useAddBeneficiary = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addBeneficiary,

    onSuccess: success => {
      queryClient.invalidateQueries({
        queryKey: [api.beneficiary.getBeneficiaryById]
      });
      queryClient.refetchQueries({
        queryKey: [api.beneficiary.getAll]
      });
      toastSuccess(success?.data?.message);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toastFail(error?.response?.data?.message ?? error?.message);
    }
  });
};

const getBeneficiaryDetail = (id: number | null) => () => {
  return NeoHttpClient.get<NeoResponse<BeneficiaryDetailList>>(
    api.beneficiary.getBeneficiaryById.replace("{id}", id + "")
  );
};
const useGetBeneficiaryById = (id: number | null) => {
  return useQuery({
    select: data => data?.data?.data,
    enabled: !!id,
    queryKey: [api.beneficiary.getBeneficiaryById, id],
    queryFn: getBeneficiaryDetail(id)
  });
};

const deleteBeneficiary = (id: number | null) => {
  return NeoHttpClient.delete<NeoResponse>(
    api.beneficiary.delete.replace("{id}", id + "")
  );
};
const useDeleteBeneficiary = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteBeneficiary,

    onSuccess: success => {
      queryClient.invalidateQueries({
        queryKey: [api.beneficiary.getAll]
      });
      toastSuccess(success?.data?.message);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toastFail(error?.response?.data?.message ?? error?.message);
    }
  });
};

const deleteBeneficiaryDetails = (id: number | null) => {
  return NeoHttpClient.delete<NeoResponse>(
    api.beneficiary_detail.deleteBeneficiaryDetail.replace(
      "{beneficiaryCheckoutId}",
      id + ""
    )
  );
};
const useDeleteBeneficiaryDetails = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteBeneficiaryDetails,

    onSuccess: success => {
      queryClient.invalidateQueries({
        queryKey: [api.beneficiary.getBeneficiaryById]
      });
      toastSuccess(success?.data?.message);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toastFail(error?.response?.data?.message ?? error?.message);
    }
  });
};

const editBeneficiary = (data: IBeneficiaryRequest) => {
  return NeoHttpClient.post<NeoResponse>(
    api.beneficiary.update,
    toFormData(data)
  );
};
const useEditBeneficiary = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: editBeneficiary,

    onSuccess: success => {
      queryClient.invalidateQueries({
        queryKey: [api.beneficiary.getBeneficiaryById]
      });
      queryClient.refetchQueries({
        queryKey: [api.beneficiary.getAll]
      });
      toastSuccess(success?.data?.message);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toastFail(error?.response?.data?.message ?? error?.message);
    }
  });
};

export {
  useAddBeneficiary,
  useDeleteBeneficiary,
  useDeleteBeneficiaryDetails,
  useEditBeneficiary,
  useGetBeneficiary,
  useGetBeneficiaryById
};
