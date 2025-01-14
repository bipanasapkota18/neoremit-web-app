import {
  Button,
  Card,
  GridItem,
  HStack,
  SimpleGrid,
  Stack,
  Text
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import GoBack from "@neoWeb/components/Button";
import Select from "@neoWeb/components/Form/SelectComponent";
import TextInput from "@neoWeb/components/Form/TextInput";
import SendMoneyView from "@neoWeb/components/MoneyView";
import { baseURL } from "@neoWeb/services/service-axios";
import { useGetBeneficiaryById } from "@neoWeb/services/service-beneficiary";
import { useGetPurposeOfPayment } from "@neoWeb/services/service-common";
import { useGetPayoutMethodById } from "@neoWeb/services/service-payoutmethod";
import {
  useBeneficiaryAccountStore,
  useSendMoneyStore
} from "@neoWeb/store/SendMoney";
import { colorScheme } from "@neoWeb/theme/colorScheme";
import { ISelectOptions, formatSelectOptions } from "@neoWeb/utility/format";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ISendMoneyForm } from "./SendMoney";

const defaultValues = {
  payoutMethodId: null as ISelectOptions<number> | null,
  payoutPartnerId: null as ISelectOptions<number> | null,
  accountName: "",
  accountNumber: "",
  purposeOfPayment: null as ISelectOptions<number> | null,
  remarks: ""
};

interface IPaymentDetailsProps extends ISendMoneyForm {
  beneficiaryId: number | null;
  // beneficiaryAccountId: number;
  newTransfer: boolean;
}

const PaymentDetails = ({
  setPageName,
  beneficiaryId,
  // beneficiaryAccountId,
  newTransfer
}: IPaymentDetailsProps) => {
  const { sendMoneyData } = useSendMoneyStore();
  const { data: benificiaryAccount } = useGetBeneficiaryById(beneficiaryId);
  const { data: Payoutmethoddata } = useGetPayoutMethodById(
    sendMoneyData?.receivingCountry?.value ?? 0
  );

  const { data: purposeOfPaymentData } = useGetPurposeOfPayment();

  const { setBeneficiaryAccountData } = useBeneficiaryAccountStore();
  // const benificiaryAccount = useMemo(
  //   () =>
  //     beneficiaryAccountData?.find(item => item?.id === beneficiaryAccountId),
  //   [beneficiaryAccountData]
  // );
  const { beneficiaryAccountData: beneficiaryAccountStoreData } =
    useBeneficiaryAccountStore();

  // const beneficiaryAccountOptions = formatSelectOptions<number>({
  //   data: beneficiaryAccountData?.map(item => item?.payoutPartner),
  //   labelKey: "name",
  //   valueKey: "id",
  //   icon: {
  //     iconKey: "image",
  //     iconPath: `${baseURL}/document-service/master/payout/partner/image?fileId=`,
  //     iconCode: "image"
  //   }
  // });
  const paymentMethodOptions = formatSelectOptions<number>({
    data: Payoutmethoddata,
    labelKey: "name",
    valueKey: "id",
    icon: {
      iconKey: "icon",
      iconPath: `${baseURL}/document-service/payout/method/icon/master?fileId=`,
      iconCode: "icon"
    }
  });

  const paymentPurposeOptions = formatSelectOptions<number>({
    data: purposeOfPaymentData,
    labelKey: "name",
    valueKey: "id"
  });
  const schema = z.object({
    // payoutMethodId: z
    //   .object({
    //     label: z.string().min(1),
    //     value: z.number().min(0)
    //   })
    //   .nullable()
    //   .refine(data => !!data?.label && !!data?.value, {
    //     message: "Please select payment method"
    //   }),
    payoutMethodId: z.object({
      label: z.string(),
      value: z.number()
    }),
    // payoutPartnerId: z.object({}),
    accountName: z.string(),
    accountNumber: z.string(),
    purposeOfPayment: z
      .object({
        label: z.string().min(1),
        value: z.number().min(0)
      })
      .nullable()
      .refine(data => !!data?.label && !!data?.value, {
        message: "Please select purpose of payment"
      }),
    remarks: z.string().min(1, { message: "Remarks is required" })
  });
  const { control, reset, handleSubmit } = useForm({
    defaultValues: defaultValues,
    resolver: zodResolver(schema)
  });

  useEffect(() => {
    const selectedPaymentMethod = paymentMethodOptions?.find(
      item => item?.value === sendMoneyData?.payoutMethod?.value
    );
    // const selectedPartner = beneficiaryAccountOptions?.find(
    //   item => item?.value === benificiaryAccount?.payoutPartner?.id
    // );
    reset({
      payoutMethodId: selectedPaymentMethod,
      // payoutPartnerId: selectedPartner,
      // accountName: benificiaryAccount?.accountName ?? "",
      // accountNumber: benificiaryAccount?.accountNumber ?? "",
      purposeOfPayment: beneficiaryAccountStoreData?.purposeOfPayment ?? null,
      remarks: beneficiaryAccountStoreData?.remarks ?? ""
    });
  }, [benificiaryAccount]);

  const submitDetails = (data: typeof defaultValues) => {
    setBeneficiaryAccountData({
      ...data,
      mobileNumber: benificiaryAccount?.mobileNumber ?? "",
      country: benificiaryAccount?.country?.name ?? "",
      beneficiaryId: benificiaryAccount?.id ?? 0
    });
    setPageName("accountDetails");
  };
  return (
    <Card
      as={"form"}
      onSubmit={handleSubmit(submitDetails)}
      padding={"24px"}
      gap={"16px"}
    >
      <Text fontSize={"17px"} fontWeight={700} color={colorScheme.gray_700}>
        Payment Details
      </Text>
      <SendMoneyView />
      <Stack gap={4}>
        <Stack>
          <Text textStyle={"paymentDetailsHeader"}>Payout Method</Text>
          <Select
            name="payoutMethodId"
            options={paymentMethodOptions}
            placeholder="Select Payment Method"
            control={control}
            noFloating
            isDisabled={!newTransfer}
          />
        </Stack>
        <Stack>
          <HStack justifyContent={"space-between"}>
            <Text textStyle={"paymentDetailsHeader"}>Bank Details</Text>
            <Text>Transaction Limit</Text>
          </HStack>
          <SimpleGrid columns={2} gap={4}>
            <Select
              name="payoutPartnerId"
              options={[]}
              placeholder="Select Payout Partner"
              control={control}
              noFloating
              isDisabled={!newTransfer}
            />
            <TextInput
              type="text"
              control={control}
              name="accountName"
              label="Account Name"
              isReadOnly={!newTransfer}
            />
            <GridItem colSpan={2}>
              <TextInput
                type="text"
                control={control}
                name="accountNumber"
                label="Account Number"
                isReadOnly={!newTransfer}
              />
            </GridItem>
          </SimpleGrid>
        </Stack>
        <Stack>
          <Text textStyle={"paymentDetailsHeader"}>Purpose</Text>
          <Select
            name="purposeOfPayment"
            options={paymentPurposeOptions}
            placeholder="Select Purpose of Payment"
            control={control}
            noFloating
          />
          <TextInput
            mt={2}
            type="textarea"
            control={control}
            name="remarks"
            placeholder="Remarks"
          />
        </Stack>
      </Stack>
      <HStack justifyContent={"space-between"}>
        <GoBack
          onClick={() => {
            reset(defaultValues);
            setPageName("selectRecipient");
          }}
        />

        <Button type="submit" variant="send_money">
          Proceed to Payment
        </Button>
      </HStack>
    </Card>
  );
};

export default PaymentDetails;
