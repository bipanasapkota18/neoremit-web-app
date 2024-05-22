import { toastFail, toastSuccess } from "@neoWeb/utility/Toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { NeoResponse, api } from "./service-api";
import { NeoHttpClient } from "./service-axios";

export interface ISignUpRequest {
  fullName: string;
  email: string;
  sendFrom: number | null;
  receiveIn: number | null;
  phoneNumber: string;
  referralCode: string;
}

// const getCountryList = async () => {
//   return await NeoHttpClient.get<NeoResponse<ICountriesList[]>>(
//     api.common.getAllCountryList
//   );
// };
// const useGetCountryList = () => {
//   return useQuery({
//     queryKey: [api.common.getAllCountryList],
//     queryFn: getCountryList
//   });
// };
const signUp = (data: ISignUpRequest) => {
  return NeoHttpClient.post<NeoResponse<ISignUpRequest>>(
    api.users.signUp,
    data
  );
};
const useSignUpMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: signUp,
    onSuccess: success => {
      queryClient.invalidateQueries({ queryKey: [api.users.signUp] });
      toastSuccess(success?.data?.message);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toastFail(error?.response?.data?.message ?? error?.message);
    }
  });
};

export { useSignUpMutation };
