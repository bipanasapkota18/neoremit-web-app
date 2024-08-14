import {
  Box,
  Button,
  Card,
  CardBody,
  GridItem,
  HStack,
  Icon,
  SimpleGrid,
  Stack,
  Text
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { svgAssets } from "@neoWeb/assets/images/svgs";
import BreadCrumbs from "@neoWeb/components/BreadCrumbs";
import Select from "@neoWeb/components/Form/SelectComponent";
import TextInputWithRef from "@neoWeb/components/Form/TextInput/InputWithRef";
import SendMoneyView from "@neoWeb/components/MoneyView";
import { NAVIGATION_ROUTES } from "@neoWeb/pages/App/navigationRoutes";
import { baseURL } from "@neoWeb/services/service-axios";
import { useGetCountryList } from "@neoWeb/services/service-common";
import { useGetPayoutMethodById } from "@neoWeb/services/service-payoutmethod";
import { useCreateQuote } from "@neoWeb/services/service-send-money";
import { useSendMoneyStore } from "@neoWeb/store/SendMoney";
import { useStoreInitData } from "@neoWeb/store/initData";
import { colorScheme } from "@neoWeb/theme/colorScheme";
import { currencyFormat, formatAmount } from "@neoWeb/utility/currencyFormat";
import { ISelectOptions, formatSelectOptions } from "@neoWeb/utility/format";
import { debounce } from "lodash";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export interface IChargeDetails {
  id: number;
  payoutMethods: PayoutMethod[];
  feeAndChargeType: string;
  fromAmount: number;
  toAmount: number;
  fee: number;
}

export interface PayoutMethod {
  id: number;
  code: string;
  name: string;
  description: string;
  icon: string;
  isCash: boolean;
  isActive: boolean;
}
export interface IVAmericaSendMoneyForm {
  setPageName: Dispatch<SetStateAction<string>>;
}
const defaultValues = {
  sendFrom: null as ISelectOptions<number> | null,
  sendTo: null as ISelectOptions<number> | null,
  sendAmount: "",
  receiveAmount: "",
  paymentMethod: null as ISelectOptions<number> | null,
  promoCode: ""
};

const VAmericaSendMoneyForm = ({ setPageName }: IVAmericaSendMoneyForm) => {
  const schema = z.object({
    sendFrom: z
      .object({
        label: z.string().min(1),
        value: z.number().min(0)
      })
      .nullable()
      .refine(data => !!data?.label && !!data?.value, {
        message: "Please select sending country"
      }),
    sendTo: z
      .object({
        label: z.string().min(1),
        value: z.number().min(0)
      })
      .nullable()
      .refine(data => !!data?.label && !!data?.value, {
        message: "Please select receiving country"
      }),
    sendAmount: z.string().min(1, { message: "Please enter sending amount" }),
    receiveAmount: z.string(),
    paymentMethod: z
      .object({
        label: z.string().min(1),
        value: z.number().min(0)
      })
      .nullable()
      .refine(data => !!data?.label && !!data?.value, {
        message: "Please select a payment method"
      }),
    promoCode: z.string().optional()
  });

  const {
    control,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { isValid }
  } = useForm({
    defaultValues: defaultValues,
    resolver: zodResolver(schema)
  });

  //Ref for sending amount and receiving amount
  // const sendRef = useRef(null);
  //   const receiveRef = useRef(null);

  const { initData } = useStoreInitData();
  const { setSendMoneyData, sendMoneyData } = useSendMoneyStore();

  //country list API
  const { data: countriesList } = useGetCountryList();

  const countryOptions = formatSelectOptions<number>({
    data: countriesList,
    labelKey: "name",
    valueKey: "id",
    icon: {
      iconKey: "flagIcon",
      iconPath: `${baseURL}/document-service/master/flag-icon?fileId=`,
      iconCode: "flagIcon"
    }
  });
  //create Quote API
  const {
    mutateAsync,
    data: createQuoteData,
    isSuccess,
    isPending
  } = useCreateQuote();

  const debouncedFunction = debounce(() => {
    mutateAsync({
      amount: watch("sendAmount") ?? null,
      sendFrom: watch("sendFrom")?.value ?? null,
      receiveIn: watch("sendTo")?.value ?? null,
      paymentOptionId:
        (watch("paymentMethod")?.value as unknown as ISelectOptions<number>) ??
        null
    });
  }, 1000);
  useEffect(() => {
    if (watch("sendAmount") && watch("paymentMethod")?.value)
      debouncedFunction();
  }, [watch("sendAmount"), watch("paymentMethod")?.value]);

  //sending country currency symbol
  const sendingCountryCurrencySymbol =
    initData?.sendingCountry?.currency?.symbol;

  //payout method API
  const { data: Payoutmethoddata } = useGetPayoutMethodById(
    watch("sendTo")?.value ?? null
  );

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

  useEffect(() => {
    reset(oldValues => ({
      ...oldValues,
      sendFrom:
        countryOptions?.find(
          item => item.value === initData?.sendingCountry?.id
        ) ?? null,
      sendTo:
        countryOptions?.find(
          item => item.value === initData?.receivingCountry?.id
        ) ?? null
    }));
  }, [countriesList]);

  useEffect(() => {
    // if (receiveRef.current === document.activeElement) {
    setValue(
      "receiveAmount",
      formatAmount(isSuccess ? createQuoteData.data?.data?.totalToBePay : "") +
        ""
    );
    // }
  }, [watch("sendAmount"), isSuccess]);

  // useEffect(() => {
  //   if (receiveRef.current === document.activeElement) {
  //     setValue(
  //       "sendAmount",
  //       formatAmount(parseFloat(watch("receiveAmount")) / calculatdRate) + ""
  //     );
  //   }
  // }, [watch("receiveAmount")]);

  useEffect(() => {
    if (sendMoneyData) {
      reset({
        sendFrom:
          countryOptions?.find(
            item => item.value === sendMoneyData?.sendingCountry?.value
          ) ?? null,
        sendTo: countryOptions?.find(
          item => item.value === sendMoneyData?.receivingCountry?.value
        ),
        ...(sendMoneyData?.sendingAmount
          ? { sendAmount: sendMoneyData?.sendingAmount ?? "" }
          : {}),
        receiveAmount: sendMoneyData?.receivingAmount ?? "",
        paymentMethod: paymentMethodOptions?.find(
          item => item.value === sendMoneyData?.payoutMethod?.value
        )
      });
    }
  }, [sendMoneyData, Payoutmethoddata]);

  const handleSendMoney = (data: typeof defaultValues) => {
    // if (!isSuccess) {
    //   return;
    // } else {
    try {
      setSendMoneyData({
        sendingCountry: data?.sendFrom ?? null,
        receivingCountry: data?.sendTo ?? null,
        sendingAmount: data?.sendAmount ?? "",
        receivingAmount: data?.receiveAmount ?? "",
        payoutMethod: data?.paymentMethod ?? null,
        promoCode: data?.promoCode ?? "",
        fee: formatAmount(createQuoteData?.data?.data?.fees ?? 0),
        totalAmount:
          formatAmount(createQuoteData?.data?.data?.totalToPay ?? 0) + "",
        exchangeRate: formatAmount(
          createQuoteData?.data?.data?.exchangeRate ?? 0
        )
      });
      setPageName("selectRecipient");
    } catch (e) {
      console.error(e);
    }
    // }
  };

  const calculatedValues = [
    {
      label: "ExchangeRate",
      value: `${sendingCountryCurrencySymbol} 1 =  ${initData?.receivingCountry?.currency?.symbol + " " + formatAmount(createQuoteData?.data?.data?.exchangeRate ?? 0)}`
    },
    {
      label: "Sending Amount",
      value:
        (sendingCountryCurrencySymbol + " " ?? "") +
        currencyFormat(
          formatAmount(createQuoteData?.data?.data?.amount ?? 0),
          true
        )
    },
    {
      label: "Fee",
      value: ` ${
        (sendingCountryCurrencySymbol + " " ?? "") +
        currencyFormat(
          formatAmount(createQuoteData?.data?.data?.fees ?? 0),
          true
        )
      }`
    },
    {
      label: "Total Amount To Pay",
      value:
        (sendingCountryCurrencySymbol + " " ?? "") +
        currencyFormat(
          formatAmount(createQuoteData?.data?.data?.totalToPay ?? 0),
          true
        )
    },
    {
      label: "Receiving Amount",
      value:
        (createQuoteData?.data?.data?.isoCurrency + " " ?? "") +
        currencyFormat(
          formatAmount(createQuoteData?.data?.data?.totalToBePay ?? 0),
          true
        )
    }
  ];
  const pages = [
    {
      pageName: "Send Money",
      href: NAVIGATION_ROUTES.SEND_MONEY,
      isCurrentPage: true
    }
  ];
  return (
    <Stack>
      <BreadCrumbs pages={pages} />

      <Card>
        <CardBody
          as="form"
          onSubmit={handleSubmit(handleSendMoney)}
          display={"flex"}
          flexDir={"column"}
          padding={6}
          gap={4}
        >
          <Box
            textStyle={"normalStyle"}
            color={colorScheme.gray_700}
            fontWeight={700}
          >
            Send Money
          </Box>
          <SendMoneyView
            amount={watch("sendAmount") ? Number(watch("sendAmount")) : 0}
          />

          <SimpleGrid columns={{ base: 1, sm: 1, md: 2 }} gap={4}>
            <GridItem colSpan={{ base: 1, sm: 1, md: 2 }}>
              <HStack gap={4} w={"full"} alignItems={"center"}>
                <Select
                  name="sendFrom"
                  options={countryOptions}
                  placeholder="Sending From"
                  control={control}
                  noFloating
                  isDisabled
                />
                <Icon
                  as={svgAssets.ArrowSwap}
                  height={"24px"}
                  width={"24px"}
                  color={colorScheme.primary_500}
                />
                <Select
                  name="sendTo"
                  options={countryOptions}
                  placeholder="Receiving"
                  control={control}
                  noFloating
                  isDisabled={isPending}
                />
              </HStack>
            </GridItem>
            <GridItem mt={"2px"} colSpan={1}>
              <Select
                name="paymentMethod"
                options={paymentMethodOptions}
                placeholder="Select Payment Method"
                control={control}
                noFloating
                isDisabled={isPending}
              />
            </GridItem>
            <GridItem colSpan={1}>
              <TextInputWithRef
                // ref={sendRef}
                control={control}
                name="sendAmount"
                type="number"
                label="You Send"
                isDisabled={isPending}
              />
            </GridItem>

            {/* <GridItem colSpan={1}>
              <TextInputWithRef
                ref={receiveRef}
                control={control}
                name="receiveAmount"
                type="number"
                label="Receiver Receives"
              />
            </GridItem> */}
          </SimpleGrid>
          {createQuoteData && (
            <Stack
              borderRadius={16}
              padding={4}
              gap={4}
              background={colorScheme.gray_50}
            >
              <Stack>
                {calculatedValues.map((item, index) => (
                  <HStack key={index} justifyContent={"space-between"}>
                    <Text textStyle={"beneficiaryCardSubHeader"}>
                      {item.label}
                    </Text>
                    <Text textStyle={"beneficiaryCardHeader"}>
                      {item.value}
                    </Text>
                  </HStack>
                ))}
              </Stack>
            </Stack>
          )}
          <HStack justifyContent={"flex-end"}>
            <Button
              type="submit"
              leftIcon={<svgAssets.WalletIcon />}
              variant="send_money"
              isDisabled={!isValid || !createQuoteData}
            >
              Send Money
            </Button>
          </HStack>
        </CardBody>
      </Card>
    </Stack>
  );
};
export default VAmericaSendMoneyForm;
