import { toastFail } from "@neoWeb/utility/Toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { IPageParams } from "../CommonInterface";
import { api, NeoResponse } from "../service-api";
import { NeoHttpClient, toFormData } from "../service-axios";

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

export interface UserGuideResponse {
  totalItems: number;
  helpSetupResponseDtoList: HelpSetupResponseDtoList[];
}

export interface HelpSetupResponseDtoList {
  id: number;
  title: string;
  description: string;
  thumbNail: string;
  link?: any;
  status: boolean;
}

export interface CommentRequest {
  content: string;
  commentImage: string;
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

const createComment = ({
  feedbackId,
  data
}: {
  feedbackId: number;
  data: CommentRequest;
}) => {
  return NeoHttpClient.post<NeoResponse>(
    api.support.comment.create.replace("{feedbackId}", feedbackId + ""),
    toFormData(data)
  );
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

const useCreateComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [api.support.comment.create],
    mutationFn: createComment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [api.support.comment.getByFeedBack]
      });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toastFail(error?.response?.data?.message ?? "Failed to create comment");
    }
  });
};

const useGetAllSupportRequest = () => {
  return useMutation({
    mutationKey: [api.support.support_request.getAll],
    mutationFn: getAllSupportRequest
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

const getAllUserGuides = ({ pageParams, filterParams }: IFilterParams) => {
  return NeoHttpClient.post<NeoResponse<UserGuideResponse>>(
    api.support.user_guide.getAll,
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
const useGetAllUserGuides = () => {
  return useMutation({
    mutationKey: [api.support.user_guide.getAll],
    mutationFn: getAllUserGuides
  });
};
export {
  useCreateComment,
  useGetAllFeedBacks,
  useGetAllSupportReasons,
  useGetAllSupportRequest,
  useGetAllUserGuides,
  useGetCommentByFeedBack
};
