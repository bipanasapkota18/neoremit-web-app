import { useQuery } from "@tanstack/react-query";
import { api, NeoResponse } from "../service-api";
import { NeoHttpClient } from "../service-axios";

export interface FAQResponse {
  totalItems: number;
  faqList: FaqList[];
}

export interface FaqList {
  id: number;
  question: string;
  answer: string;
  status: boolean;
}
const getAllFaq = () => {
  return NeoHttpClient.get<NeoResponse<FAQResponse>>(api.support.faq.getAll);
};

const useGetAllFaq = () => {
  return useQuery({
    select: data => data?.data?.data,
    queryKey: [api.support.faq.getAll],
    queryFn: getAllFaq
  });
};

export { useGetAllFaq };
