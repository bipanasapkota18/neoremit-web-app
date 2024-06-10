import { useQuery } from "@tanstack/react-query";
import { NeoResponse, api } from "./service-api";
import { NeoHttpClient } from "./service-axios";
export interface ICountriesList {
  id: number;
  name: string;
  code: string;
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
export interface IRelationshipList {
  id?: number | null;
  name: string;
  code: string;
  isActive: boolean;
}
export interface IMaritalStatusList {
  id?: number | null;
  name: string;
  code: string;
  isActive: boolean;
}
export interface IOccupationList {
  id?: number | null;
  name: string;
  code: string;
  isActive: boolean;
}
const getCountryList = () => {
  return NeoHttpClient.get<NeoResponse<ICountriesList[]>>(
    api.common.getAllCountryList
  );
};
const useGetCountryList = () => {
  return useQuery({
    queryKey: [api.common.getAllCountryList],
    queryFn: getCountryList
  });
};

const getRelationshipList = () => {
  return NeoHttpClient.get<NeoResponse<IRelationshipList[]>>(
    api.common.getAllRelationship
  );
};
const useGetRelationship = () => {
  return useQuery({
    queryKey: [api.common.getAllRelationship],
    queryFn: getRelationshipList
  });
};

const getMaritalStatus = () => {
  return NeoHttpClient.get<NeoResponse>(api.common.getAllMaritalStatus);
};
const useGetMaritalStatus = () => {
  return useQuery({
    queryKey: [api.common.getAllMaritalStatus],
    queryFn: getMaritalStatus
  });
};
const getOccupation = () => {
  return NeoHttpClient.get<NeoResponse>(api.common.getAllOccupation);
};
const useGetOccupation = () => {
  return useQuery({
    queryKey: [api.common.getAllOccupation],
    queryFn: getOccupation
  });
};
const getStateById = (id: number | null) => {
  return NeoHttpClient.get<NeoResponse>(
    api.common.get.replace("{id}", id + "")
  );
};
const useGetStateById = (id: number | null) => {
  return useQuery({
    queryKey: [api.common.get, id],
    queryFn: () => getStateById(id),
    enabled: !!id
  });
};
export {
  useGetCountryList,
  useGetMaritalStatus,
  useGetOccupation,
  useGetRelationship,
  useGetStateById
};
