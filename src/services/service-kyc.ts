import { useKycStoreData } from "@neoWeb/store/kycData";
import { toastFail, toastSuccess } from "@neoWeb/utility/Toast";
import { ISelectOptions } from "@neoWeb/utility/format";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { NeoResponse, api } from "./service-api";
import { NeoHttpClient } from "./service-axios";
export interface IKYCFieldList {
  kycId: number | null;
  firstName: string;
  middleName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;
  phoneNumber: string;
  email: string;
  maritalStatusId: number | undefined;
  occupationId: number | undefined;
  ssnNumber: string;
  countryId: ISelectOptions<number> | null;
  stateId: ISelectOptions<number> | null;
  zipCode: string;
  nationality: string;
  identificationNumber: string;
  streetAddress: string;
  city: string;
  residentialStatus: string;
  postalCode: string;
}
export interface IKycFormFields {
  countryId: number;
  documents: Document[];
  kycFormField: KycFormField[];
}

export interface KycFormField {
  id: number;
  countryDetail: CountryDetail;
  isRequired: boolean;
  display: boolean;
  allowUpdate: boolean;
  keyField: KeyField;
}

export interface KeyField {
  id: number;
  name: string;
  type: string;
  label: string;
  category: string;
  displayOrder: number;
}

export interface CountryDetail {
  id: number;
  name: string;
}

export interface Document {
  id: number;
  documentName: string;
  documentCode: string;
  allowedExtensions: string[];
  documentSize: number;
  isActive: boolean;
}

export interface KYCInfo {
  personalInfo: PersonalInfo;
  addressInfo: AddressInfo;
  kycStatus: string;
  kycVerificationLink?: any;
}

export interface AddressInfo {
  country?: any;
  state?: any;
  zipCode?: any;
  postalCode?: any;
  nationality?: any;
  residentialStatus?: any;
  city?: any;
  streetAddress?: any;
}

export interface PersonalInfo {
  kycId: number;
  firstName: string;
  middleName?: any;
  lastName: string;
  gender: string;
  dateOfBirth: string;
  phoneNumber: string;
  email: string;
  maritalStatus: MaritalStatus;
  occupation: MaritalStatus;
  ssnNumber?: any;
}

export interface MaritalStatus {
  id: number;
  name: string;
  code: string;
  isActive: boolean;
}

const countryFields = (countryId: number | null) => {
  return NeoHttpClient.get<NeoResponse<IKycFormFields>>(
    api.Kyc.getCountryKycFields?.replace("{countryId}", countryId + "")
  );
};

const useGetCountryFields = (countryId: number | null) => {
  return useQuery({
    queryKey: [api.Kyc.getCountryKycFields, countryId],
    queryFn: () => countryFields(countryId)
  });
};
const getKycInformation = () => {
  return NeoHttpClient.get<NeoResponse<KYCInfo>>(api.Kyc.getAll);
};

const useGetKycInformation = (enabled?: boolean) => {
  const { setKycData } = useKycStoreData();
  return useQuery({
    queryKey: [api.Kyc.getAll],
    queryFn: async () => {
      const kycData = await getKycInformation();
      setKycData(kycData?.data?.data);
      return kycData;
    },
    enabled: enabled,
    retry: 1
  });
};

const createKYC = (data: IKYCFieldList) => {
  return NeoHttpClient.post<NeoResponse>(api.Kyc.update, data);
};

const usecreateKYC = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createKYC,
    onSuccess: success => {
      queryClient.invalidateQueries({ queryKey: [api.Kyc.update] });
      toastSuccess(success?.data?.message);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toastFail(error?.response?.data?.message ?? error?.message);
    }
  });
};

const createAddressData = (data: IKYCFieldList) => {
  return NeoHttpClient.post<NeoResponse>(api.Kyc.addressData, data);
};
const useCreateAddressData = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createAddressData,
    onSuccess: success => {
      queryClient.invalidateQueries({
        queryKey: [api.Kyc.addressData]
      });
      toastSuccess(success?.data?.message);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toastFail(error?.response?.data?.message ?? error?.message);
    }
  });
};

export {
  useCreateAddressData,
  useGetCountryFields,
  useGetKycInformation,
  usecreateKYC
};
