import { NeoResponse, api } from "./service-api";
import { NeoHttpClient } from "./service-axios";

export interface ISignUpRequest {
  fullName: string;
  email: string;
  sendFrom: number | null;
  receiveIn: number | null;
  phoneNumber: number | null;
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
const useSignUpMutation = () => {};
// const useSignUpMutation = () => {
//   const QueryClient = useQueryClient();
//   return useMutation(signUp, {
//     onSuccess: success => {
//       QueryClient.invalidateQueries(api.users.signUp);
//       toastSuccess(success?.data?.message);
//     },
//     onError: (error: AxiosError<{ message: string }>) => {
//       toastFail(error?.response?.data?.message ?? error?.message);
//     }
//   });
// };

export { useSignUpMutation };
