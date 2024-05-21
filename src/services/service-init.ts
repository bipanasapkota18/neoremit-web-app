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
  name: string;
  role: string;
  moduleList: any[];
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
    },
    enabled: enabled,
    retry: 1
  });
};

export { useFetchInitData };
