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
export interface PageParams {
  pageSize: number;
  pageIndex: number;
}
const getAllFaq =
  ({ pageSize, pageIndex }: PageParams) =>
  () => {
    return NeoHttpClient.get<NeoResponse<FAQResponse>>(api.support.faq.getAll, {
      params: {
        page: pageIndex,
        size: pageSize
      }
    });
  };

const useGetAllFaq = ({ pageSize, pageIndex }: PageParams) => {
  return useQuery({
    select: data => data?.data?.data,
    queryKey: [api.support.faq.getAll],
    queryFn: getAllFaq({ pageSize, pageIndex })
  });
};

export { useGetAllFaq };
