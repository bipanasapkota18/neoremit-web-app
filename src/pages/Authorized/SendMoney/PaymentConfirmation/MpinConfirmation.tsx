import {
  Button,
  Card,
  Center,
  Icon,
  IconButton,
  Stack,
  Text,
  useBoolean
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { svgAssets } from "@neoWeb/assets/images/svgs";
import TextInput from "@neoWeb/components/Form/TextInput";
import {
  ConfirmPaymentRequest,
  useConfirmPayment
} from "@neoWeb/services/service-send-money";
import {
  useBeneficiaryAccountStore,
  useSendMoneyStore,
  useTransactionStore
} from "@neoWeb/store/SendMoney";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ISendMoneyForm } from "../SendMoney";

const defaultValues = {
  mpin: ""
};
const MpinConfirmation = ({ setPageName }: ISendMoneyForm) => {
  const [flag, setFlag] = useBoolean();
  const { sendMoneyData } = useSendMoneyStore();
  const { beneficiaryAccountData } = useBeneficiaryAccountStore();
  const { setTransactionData } = useTransactionStore();
  const { mutateAsync: confirmMPIN, isPending: isConfirmationPending } =
    useConfirmPayment();
  const schema = z.object({
    mpin: z
      .string()
      .min(1, { message: "MPIN is required" })
      .length(4, "MPIN must be 4 digits")
  });
  const { control, handleSubmit } = useForm({
    defaultValues: defaultValues,
    resolver: zodResolver(schema)
  });

  const submitMpin = async (data: typeof defaultValues) => {
    const preparedData: ConfirmPaymentRequest = {
      beneficiaryName: beneficiaryAccountData?.accountName ?? "",
      beneficiaryAccountNumber: beneficiaryAccountData?.accountNumber ?? "",
      beneficiaryBankName: beneficiaryAccountData?.payoutPartnerId?.label ?? "",
      beneficiaryId: beneficiaryAccountData?.beneficiaryId ?? 0,
      remarks: beneficiaryAccountData?.remarks ?? "",
      paymentPurpose: beneficiaryAccountData?.purposeOfPayment?.label ?? "",
      sendingAmount: sendMoneyData?.sendingAmount ?? "",
      receivingAmount: sendMoneyData?.receivingAmount ?? "",
      sendingCountryId: sendMoneyData?.sendingCountry?.value ?? null,
      receivingCountryId: sendMoneyData?.receivingCountry?.value ?? null,
      processBy: "Master Card",
      payoutMethodId: sendMoneyData?.payoutMethod?.value ?? null,
      payoutPartnerId: beneficiaryAccountData?.payoutPartnerId?.value ?? null,
      totalAmount: sendMoneyData?.totalAmount ?? "",
      mpin: data?.mpin ?? ""
    };
    try {
      const response = await confirmMPIN(preparedData);
      console.log(response);
      setTransactionData(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
    setPageName("invoice");
  };
  return (
    <Card padding={"24px"} gap={"16px"}>
      <Stack
        padding={4}
        borderRadius={"16px"}
        alignItems={"center"}
        gap={"32px"}
        as={"form"}
        onSubmit={handleSubmit(submitMpin)}
      >
        <Icon as={svgAssets.Guard} width={"82px"} height={"104px"} />
        <Text textStyle={"paymentDetailsHeader"} fontSize={"20px"}>
          MPIN Confirmation
        </Text>
        <Center minW={"358px"} display={"flex"} flexDir={"column"} gap={"32px"}>
          <TextInput
            type={flag ? "text" : "password"}
            name="mpin"
            label="Enter MPIN"
            control={control}
            endIcons={
              <IconButton
                tabIndex={-1}
                colorScheme={"black"}
                size="xs"
                variant="link"
                aria-label="password-control"
                onClick={setFlag.toggle}
                icon={
                  flag ? (
                    <svgAssets.EyeIcon height={"20px"} width={"20px"} />
                  ) : (
                    <svgAssets.EyeSlashIcon height={"20px"} width={"20px"} />
                  )
                }
              />
            }
          />
          <Button
            py={"23px"}
            minW={"342px"}
            type="submit"
            isLoading={isConfirmationPending}
          >
            Confirm
          </Button>
        </Center>
      </Stack>
    </Card>
  );
};

export default MpinConfirmation;
