import { toastFail, toastSuccess } from "@neoWeb/utility/Toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { NeoResponse, api } from "./service-api";
import { NeoHttpClient } from "./service-axios";
export interface IKYCFieldList {
  kycId: number;
  firstName: string;
  middleName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;
  phoneNumber: string;
  email: string;
  maritalStatusId: number;
  occupationId: number;
  ssnNumber: string;
  countryId: number;
  stateId: number;
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
  return NeoHttpClient.get<NeoResponse>(api.Kyc.getAll);
};

const useGetKycInformation = () => {
  return useQuery({
    queryKey: [api.Kyc.getAll],
    queryFn: getKycInformation
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

export { useGetCountryFields, useGetKycInformation, usecreateKYC };
