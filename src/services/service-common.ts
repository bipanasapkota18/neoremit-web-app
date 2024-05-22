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

const getCountryList = async () => {
  return await NeoHttpClient.get<NeoResponse<ICountriesList[]>>(
    api.common.getAllCountryList
  );
};
const useGetCountryList = () => {
  return useQuery({
    queryKey: [api.common.getAllCountryList],
    queryFn: getCountryList
  });
};
export { useGetCountryList };
