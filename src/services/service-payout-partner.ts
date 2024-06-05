import { useQuery } from "@tanstack/react-query";
import { NeoResponse, api } from "./service-api";
import { NeoHttpClient } from "./service-axios";
export interface IPayoutPartnerResponse {
  id?: number;
  payoutMethodId: number | null;
  countryId: number | null;
  name: string;
  code: string;
  image: string;
  isActive: boolean;
}

const getPayoutPartnerById = (id: number | null) => {
  return NeoHttpClient.get<NeoResponse<IPayoutPartnerResponse>>(
    api.payout_partner.get.replace("{payoutMethodId}", id + "")
  );
};

const usegetPayoutPartnerById = (id: number | null) => {
  return useQuery({
    select: data => data?.data?.data,
    queryKey: [api.payout_partner.get, id],
    queryFn: () => getPayoutPartnerById(id),
    enabled: !!id
  });
};
export { usegetPayoutPartnerById };
