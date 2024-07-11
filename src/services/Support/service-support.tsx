import { useMutation, useQuery } from "@tanstack/react-query";
import { IPageParams } from "../CommonInterface";
import { api, NeoResponse } from "../service-api";
import { NeoHttpClient } from "../service-axios";

export interface IFeedBackResponse {
  id: number;
  type: string;
  content: string;
  title: string;
  userId: number;
  username: string;
  createdDate: string;
}

export interface ICommentResponse {
  id: number;
  content?: string;
  feedbackId: number;
  commentImage?: string;
  userId: number;
  commentUserName: string;
  createdDate: string;
  updatedDate: string;
}

const getAllFeedBacks = () => {
  return NeoHttpClient.get<NeoResponse<IFeedBackResponse[]>>(
    api.support.feedback.getAll
  );
};

const useGetAllFeedBacks = () => {
  return useQuery({
    select: data => data?.data?.data,
    queryKey: [api.support.feedback.getAll],
    queryFn: getAllFeedBacks
  });
};

interface IFilterParams {
  pageParams?: IPageParams;
  filterParams: any;
}
const getAllSupportRequest = ({ pageParams, filterParams }: IFilterParams) => {
  return NeoHttpClient.post<NeoResponse>(
    api.support.support_request.getAll,
    {
      ...filterParams
    },
    {
      params: {
        page: pageParams?.page,
        size: pageParams?.size
      }
    }
  );
};
const useGetAllSupportRequest = () => {
  return useMutation({
    mutationKey: [api.support.support_request.getAll],
    mutationFn: getAllSupportRequest
  });
};

const getCommentByFeedBack = (feedbackId: number) => () => {
  return NeoHttpClient.get<NeoResponse<ICommentResponse[]>>(
    api.support.comment.getByFeedBack.replace(
      "{feedbackId}",
      feedbackId.toString()
    )
  );
};

const useGetCommentByFeedBack = (feedbackId: number) => {
  return useQuery({
    select: data => data?.data?.data,
    queryKey: [api.support.comment.getByFeedBack],
    queryFn: getCommentByFeedBack(feedbackId)
  });
};

const getAllSupportReasons = ({ pageParams, filterParams }: IFilterParams) => {
  return NeoHttpClient.post<NeoResponse>(
    api.support.support_reason.getAll,
    {
      ...filterParams
    },
    {
      params: {
        page: pageParams?.page,
        size: pageParams?.size
      }
    }
  );
};
const useGetAllSupportReasons = () => {
  return useMutation({
    mutationKey: [api.support.support_reason.getAll],
    mutationFn: getAllSupportReasons
  });
};
export {
  useGetAllFeedBacks,
  useGetAllSupportReasons,
  useGetAllSupportRequest,
  useGetCommentByFeedBack
};
