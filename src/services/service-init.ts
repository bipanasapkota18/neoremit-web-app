import { useStoreInitData } from "@neoWeb/store/initData";
import { useQuery } from "@tanstack/react-query";
import { NeoResponse, api } from "./service-api";
import { NeoHttpClient } from "./service-axios";

export interface Module {
  moduleCode: string;
  moduleName: string;
  scopes: string;
}
export interface IInitData {
  firstName: string;
  lastName: string;
  middleName: string;
  fullName: string;
  username: string;
  profilePicture?: any;
  sendingCountry: ISendingCountry;
  receivingCountry: ISendingCountry;
  baseRate: IBaseRate;
  logInFrom: string;
}

export interface IBaseRate {
  id: number;
  baseRate: number;
  marginRate: number;
  marginType: string;
  senderCountry: ISendingCountry;
  rateProvider: IRateProvider[];
}

export interface IRateProvider {
  id: number;
  rateProvider: string;
  costRate: number;
}

export interface ISendingCountry {
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
  flagIcon: string;
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

const fetchInitData = () => () => {
  return NeoHttpClient.get<NeoResponse<IInitData>>(api.init);
};

const useFetchInitData = (enabled?: boolean) => {
  const { setInitData } = useStoreInitData();

  return useQuery({
    queryKey: [api.init],
    queryFn: async () => {
      const initData = await fetchInitData()();
      setInitData(initData?.data?.data);
      return initData;
    },
    enabled: enabled,
    retry: 1
  });
};

export { useFetchInitData };
