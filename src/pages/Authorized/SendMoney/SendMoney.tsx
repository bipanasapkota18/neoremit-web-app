import {
  Box,
  Button,
  Card,
  CardBody,
  GridItem,
  HStack,
  Icon,
  SimpleGrid,
  Stack
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
import {
  useCalculatedBaseRate,
  useCreateQuote
} from "@neoWeb/services/service-send-money";
import { useSendMoneyStore } from "@neoWeb/store/SendMoney";
import { useStoreInitData } from "@neoWeb/store/initData";
import { colorScheme } from "@neoWeb/theme/colorScheme";
import { formatAmount } from "@neoWeb/utility/currencyFormat";
import { ISelectOptions, formatSelectOptions } from "@neoWeb/utility/format";
import { debounce, inRange } from "lodash";
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
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
export interface ISendMoneyForm {
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
// interface PromoCodeValidationResponse {
//   promoCode: string;
//   newCustomerRate: number;
//   serviceChargeDiscount: number;
// }
const SendMoneyForm = ({ setPageName }: ISendMoneyForm) => {
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
    formState: { isValid }
  } = useForm({
    defaultValues: defaultValues,
    resolver: zodResolver(schema)
  });

  //Ref for sending amount and receiving amount
  const sendRef = useRef(null);
  const receiveRef = useRef(null);

  const [chargeDeatils, setChargeDetails] = useState<IChargeDetails[]>([]);

  const feeDetail = useMemo(
    () =>
      chargeDeatils
        ?.filter(
          item => item.payoutMethods[0]?.id === watch("paymentMethod")?.value
        )
        ?.find(item =>
          item?.toAmount === null
            ? +watch("sendAmount") >= item.fromAmount
            : inRange(+watch("sendAmount") ?? 0, item.fromAmount, item.toAmount)
        ),
    [watch("paymentMethod"), watch("sendAmount"), chargeDeatils]
  );

  const { initData } = useStoreInitData();
  const { setSendMoneyData, sendMoneyData } = useSendMoneyStore();
  // const {
  //   mutateAsync: mutateValidatePromoCode,
  //   isPending: isPromocodeValidationLoading
  // } = useValidatePromoCode();
  const { mutateAsync: mutateBaseRate } = useCalculatedBaseRate();
  //state for promocode response
  // const [promoCodeResponse, setPromoCodeResponse] =
  //   useState<PromoCodeValidationResponse | null>(null);

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
  // const [flag, setFlag] = useBoolean(false);
  //create Quote API
  const { mutateAsync } = useCreateQuote();

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
  // const sendingCountryCurrencySymbol =
  //   initData?.sendingCountry?.currency?.symbol;

  //calculated rate based on base rate and margin rate
  // const calculatdRate = useMemo(() => {
  //   return initData?.baseRate?.marginType === "PERCENTAGE"
  //     ? initData?.baseRate?.baseRate -
  //         initData?.baseRate?.baseRate * (initData?.baseRate?.marginRate / 100)
  //     : (initData?.baseRate?.baseRate ?? 0) -
  //         (initData?.baseRate?.marginRate ?? 0);
  // }, [initData]);

  //get base rate details according to sending and receiving country
  const getBaseRateDetails = async () => {
    const baseRateResponse = await mutateBaseRate({
      sendingCountryId: initData?.sendingCountry?.id ?? null,
      receivingCountryId: watch("sendTo")?.value ?? null
    });
    if (baseRateResponse?.data?.data) {
      setChargeDetails(
        baseRateResponse?.data?.data?.feeAndCharges?.feeAndChargesDetails
      );
    }
  };

  useEffect(() => {
    if (watch("sendTo")) {
      getBaseRateDetails();
    }
  }, [watch("sendTo")]);

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

  // useEffect(() => {
  //   if (sendRef.current === document.activeElement) {
  //     setValue(
  //       "receiveAmount",
  //       formatAmount(parseFloat(watch("sendAmount")) * calculatdRate) + ""
  //     );
  //   }
  // }, [watch("sendAmount")]);

  // useEffect(() => {
  //   if (promoCodeResponse) {
  //     setValue(
  //       "receiveAmount",
  //       formatAmount(
  //         (+watch("sendAmount") ?? 0) *
  //           (promoCodeResponse?.newCustomerRate ?? 0)
  //       ) + ""
  //     );
  //   }
  // }, [promoCodeResponse]);

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

  // const validatePromoCode = async (data: typeof defaultValues) => {
  //   const preparedData = {
  //     code: data?.promoCode?.trim(),
  //     amount: data?.sendAmount?.trim() ?? "",
  //     sendingCountryId: data?.sendFrom?.value ?? null,
  //     receivingCountryId: data?.sendTo?.value ?? null,
  //     payoutMethodId: data?.paymentMethod?.value ?? null
  //   };
  //   try {
  //     const response = await mutateValidatePromoCode(preparedData);

  //     setPromoCodeResponse(response?.data?.data);
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  const handleSendMoney = (data: typeof defaultValues) => {
    try {
      setSendMoneyData({
        sendingCountry: data?.sendFrom ?? null,
        receivingCountry: data?.sendTo ?? null,
        sendingAmount: data?.sendAmount ?? "",
        receivingAmount: data?.receiveAmount ?? "",
        payoutMethod: data?.paymentMethod ?? null,
        promoCode: data?.promoCode ?? "",
        fee: feeDetail
          ? formatAmount(
              feeDetail?.feeAndChargeType === "FLAT"
                ? feeDetail?.fee
                : ((feeDetail?.fee ?? 0) / 100) * (+watch("sendAmount") ?? 0) +
                    ""
            )
          : 0,
        totalAmount: "1",
        exchangeRate: 0
        // totalAmount:
        //   formatAmount(
        //     +(watch("sendAmount") ?? 0) +
        //       feeAmount -
        //       (promoCodeResponse?.serviceChargeDiscount ?? 0)
        //   ) + "" ?? "",
        // exchangeRate:
        //   promoCodeResponse?.newCustomerRate ??
        //   initData?.baseRate?.baseRate ??
        //   null
      });
      setPageName("selectRecipient");
    } catch (e) {
      console.error(e);
    }
  };

  // const feeAmount =
  //   feeDetail?.feeAndChargeType === "FLAT"
  //     ? feeDetail?.fee
  //     : ((feeDetail?.fee ?? 0) / 100) * +watch("sendAmount");

  // const calculatedValues = [
  //   {
  //     label: "Promo Code",
  //     value: promoCodeResponse ? promoCodeResponse?.promoCode : "--"
  //   },
  //   {
  //     label: "ExchangeRate",
  //     value: `${sendingCountryCurrencySymbol} 1 =  ${initData?.receivingCountry?.currency?.symbol + " " + (promoCodeResponse?.newCustomerRate ?? calculatdRate)}`
  //   },
  //   {
  //     label: "Fee",
  //     value: ` ${
  //       (sendingCountryCurrencySymbol ?? "") +
  //       (feeDetail
  //         ? formatAmount(
  //             feeDetail?.feeAndChargeType === "FLAT"
  //               ? feeDetail?.fee
  //               : ((feeDetail?.fee ?? 0) / 100) * (+watch("sendAmount") ?? 0) +
  //                   ""
  //           )
  //         : 0)
  //     }`
  //   },
  //   ...(promoCodeResponse
  //     ? [
  //         {
  //           label: "Discount",
  //           value: (
  //             <s>
  //               {(sendingCountryCurrencySymbol ?? "") +
  //                 formatAmount(promoCodeResponse?.serviceChargeDiscount + "")}
  //             </s>
  //           )
  //         }
  //       ]
  //     : []),

  //   {
  //     label: "Total Amount",
  //     value:
  //       (sendingCountryCurrencySymbol ?? "") +
  //       formatAmount(
  //         +(watch("sendAmount") ?? 0) +
  //           feeAmount -
  //           (promoCodeResponse?.serviceChargeDiscount ?? 0)
  //       )
  //   }
  // ];
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
              />
            </GridItem>
            <GridItem colSpan={1}>
              <TextInputWithRef
                ref={sendRef}
                control={control}
                name="sendAmount"
                type="number"
                label="You Send"
              />
            </GridItem>

            <GridItem colSpan={1}>
              <TextInputWithRef
                isDisabled
                ref={receiveRef}
                control={control}
                name="receiveAmount"
                type="number"
                label="Receiver Receives"
              />
            </GridItem>
          </SimpleGrid>
          {/* {watch("paymentMethod") && (
            <Stack
              borderRadius={16}
              padding={4}
              gap={4}
              background={colorScheme.gray_50}
            >
              <Stack gap={3}>
                <HStack
                  justifyContent={"space-between"}
                  borderRadius={8}
                  border={`1px dashed ${colorScheme.primary_500}`}
                >
                  <Box></Box>
                  <Text
                    textStyle={"normalStyle"}
                    color={colorScheme.sideBar_text}
                    fontWeight={600}
                    textAlign={"center"}
                    padding={2}
                    cursor={"pointer"}
                    onClick={setFlag.on}
                  >
                    Do You have promo code?
                  </Text>
                  <CloseIcon
                    cursor={"pointer"}
                    onClick={setFlag.off}
                    height={"10px"}
                    width={"10px"}
                    mr={2}
                  />
                </HStack>
                {flag && (
                  <HStack alignItems={"center"}>
                    <TextInput
                      type="text"
                      label="Enter Promo Code"
                      control={control}
                      name="promoCode"
                    />

                    <Button
                      flex={"25%"}
                      mt={1}
                      py={"25px"}
                      isDisabled={!watch("promoCode")}
                      isLoading={isPromocodeValidationLoading}
                      onClick={handleSubmit(validatePromoCode)}
                    >
                      Apply
                    </Button>
                  </HStack>
                )}
              </Stack>
              <Stack>
                {calculatedValues.map((item, index) => (
                  <HStack key={index} justifyContent={"space-between"}>
                    <Text textStyle={"beneficiaryCardSubHeader"}>
                      {item.label}
                    </Text>
                    <Text
                      backgroundColor={
                        item.label === "Promo Code"
                          ? promoCodeResponse?.promoCode
                            ? "#C6F6D5"
                            : colorScheme.gray_100
                          : "inherit"
                      }
                      px={item.label === "Promo Code" ? 4 : 0}
                      py={item.label === "Promo Code" ? 1 : 0}
                      borderRadius={item.label === "Promo Code" ? 8 : 0}
                      textStyle={"beneficiaryCardHeader"}
                    >
                      {item.value}
                    </Text>
                  </HStack>
                ))}
              </Stack>
            </Stack>
          )} */}
          <HStack justifyContent={"flex-end"}>
            <Button
              type="submit"
              leftIcon={<svgAssets.WalletIcon />}
              variant="send_money"
              isDisabled={!isValid}
            >
              Send Money
            </Button>
          </HStack>
        </CardBody>
      </Card>
    </Stack>
  );
};
export default SendMoneyForm;
