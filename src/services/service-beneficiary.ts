import { toastFail, toastSuccess } from "@neoWeb/utility/Toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { BeneficiaryPayoutDetail } from "./CommonInterface";
import { NeoResponse, api } from "./service-api";
import { NeoHttpClient, toFormData } from "./service-axios";

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

export interface IBeneficiaryResponse {
  id: number;
  userId: number;
  fullName: string;
  mobileNumber: string;
  relationship: Relationship;
  country: Country;
  address: string;
  profileImage: string;
  beneficiaryCheckoutDetail: BeneficiaryCheckoutDetailRequest[];
}

export interface BeneficiaryCheckoutDetailRequest {
  addId?: number | null;
  id?: number;
  beneficiaryDetail?: BeneficiaryPayoutDetail;
  payoutMethod: PayoutMethod;
  payoutPartner: PayoutPartner;
  accountName: string;
  accountNumber: string;
  isPrimary: boolean;
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
const getBeneficiary = () => {
  return NeoHttpClient.get<NeoResponse<IBeneficiaryResponse[]>>(
    api.beneficiary.getAll
  );
};

const useGetBeneficiary = () => {
  return useQuery({
    select: data => data?.data?.data,
    queryKey: [api.beneficiary.getAll],
    queryFn: getBeneficiary
  });
};

const addBeneficiary = (data: any) => {
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
  return NeoHttpClient.get<NeoResponse<IBeneficiaryResponse>>(
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

const updateBeneficiary = ({ id, data }: { id: number | null; data: any }) => {
  return NeoHttpClient.post<NeoResponse>(
    api.beneficiary.updatae.replace("{id}", id + ""),
    toFormData(data)
  );
};
const useUpdateBeneficiary = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateBeneficiary,

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

//Beneficiary Detail
const getBeneficiaryDetails = (id: number | null) => () => {
  return NeoHttpClient.get<NeoResponse<BeneficiaryPayoutDetail>>(
    api.beneficiary_detail.getBeneficiaryDetail.replace(
      "{beneficiaryDetailId}",
      id + ""
    )
  );
};
const useGetBeneficiaryDetails = (id: number | null) => {
  return useQuery({
    select: data => data?.data?.data,
    enabled: !!id,
    queryKey: [api.beneficiary_detail.getBeneficiaryDetail, id],
    queryFn: getBeneficiaryDetails(id)
  });
};

const saveBeneficiaryDetails = ({ id, data }: { id: number; data: any }) => {
  return NeoHttpClient.post<NeoResponse>(
    api.beneficiary_detail.createBeneficiaryDetail.replace(
      "{beneficiaryDetailId}",
      id + ""
    ),
    data
  );
};
const useSaveBeneficiaryDetails = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: saveBeneficiaryDetails,

    onSuccess: success => {
      queryClient.invalidateQueries({
        queryKey: [api.beneficiary_detail.getBeneficiaryDetail]
      });
      toastSuccess(success?.data?.message);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toastFail(error?.response?.data?.message ?? error?.message);
    }
  });
};

const updateBeneficiaryDetails = ({ id, data }: { id: number; data: any }) => {
  return NeoHttpClient.post<NeoResponse>(
    api.beneficiary_detail.updateBeneficiaryDetail.replace(
      "{beneficiaryDetailId}",
      id + ""
    ),
    data
  );
};
const useUpdateBeneficiaryDetails = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateBeneficiaryDetails,

    onSuccess: success => {
      queryClient.invalidateQueries({
        queryKey: [api.beneficiary_detail.getBeneficiaryDetail]
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
        queryKey: [api.beneficiary_detail.getBeneficiaryDetail]
      });
      toastSuccess(success?.data?.message);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toastFail(error?.response?.data?.message ?? error?.message);
    }
  });
};

const getBeneficiaryDetailById = (id: number | null) => () => {
  return NeoHttpClient.get<NeoResponse<BeneficiaryPayoutDetail>>(
    api.beneficiary_detail.getBeneficiaryDetailById.replace(
      "{beneficiaryCheckoutId}",
      id + ""
    )
  );
};
const useGetBeneficiaryDetailsById = (id: number | null) => {
  return useQuery({
    select: data => data?.data?.data,
    enabled: !!id,
    queryKey: [api.beneficiary_detail.getBeneficiaryDetailById, id],
    queryFn: getBeneficiaryDetailById(id)
  });
};
export {
  useAddBeneficiary,
  useDeleteBeneficiary,
  useDeleteBeneficiaryDetails,
  useGetBeneficiary,
  useGetBeneficiaryById,
  useGetBeneficiaryDetails,
  useGetBeneficiaryDetailsById,
  useSaveBeneficiaryDetails,
  useUpdateBeneficiary,
  useUpdateBeneficiaryDetails
};
