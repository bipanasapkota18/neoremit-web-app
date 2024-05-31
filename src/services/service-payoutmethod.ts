import { useQuery } from "@tanstack/react-query";
import { NeoResponse, api } from "./service-api";

import { NeoHttpClient } from "./service-axios";

export interface IPayoutMethodResponse {
  id: number;
  code: string;
  name: string;
  description?: any;
  isCash: boolean;
  icon: string;
  isActive: boolean;
}

const getPayoutMethodById = (id: number | null) => {
  return NeoHttpClient.get<NeoResponse<IPayoutMethodResponse>>(
    api.payout_method.get.replace("{id}", id + "")
  );
};
const useGetPayoutMethodById = (id: number | null) => {
  return useQuery({
    queryKey: [api.payout_method.get, id],
    queryFn: () => getPayoutMethodById(id),
    enabled: !!id
  });
};

export { useGetPayoutMethodById };
