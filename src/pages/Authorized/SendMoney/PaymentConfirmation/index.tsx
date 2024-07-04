import {
  Button,
  Card,
  GridItem,
  HStack,
  SimpleGrid,
  Stack,
  Text
} from "@chakra-ui/react";
import GoBack from "@neoWeb/components/Button";
import SendMoneyView from "@neoWeb/components/MoneyView";
import {
  useBeneficiaryAccountStore,
  useSendMoneyStore
} from "@neoWeb/store/SendMoney";
import { useStoreInitData } from "@neoWeb/store/initData";
import { colorScheme } from "@neoWeb/theme/colorScheme";
import { ISendMoneyForm } from "../SendMoney";

const PaymentConfirmation = ({ setPageName }: ISendMoneyForm) => {
  const { sendMoneyData } = useSendMoneyStore();
  const { initData } = useStoreInitData();
  const { beneficiaryAccountData } = useBeneficiaryAccountStore();

  const sendingCountryCurrencySymbol =
    initData?.sendingCountry?.currency?.symbol ?? "";

  const receivingCountryCurrencySymbol =
    initData?.receivingCountry?.currency?.symbol ?? "";
  return (
    <Card padding={"24px"} gap={"16px"}>
      <Text fontSize={"17px"} fontWeight={700} color={colorScheme.gray_700}>
        Confirmation
      </Text>
      <SendMoneyView />
      <Stack padding={6} background={colorScheme.gray_50} borderRadius={"16px"}>
        <Text fontSize={"14px"} fontWeight={700} color={colorScheme.gray_700}>
          Receiver Detail
        </Text>
        <SimpleGrid columns={3} columnGap={"100px"} rowGap={"30px"}>
          <GridItem display={"flex"} flexDir={"column"} colSpan={1}>
            <Text textStyle={"normalStyle"} fontSize={"14px"}>
              Name
            </Text>
            <Text textStyle={"beneficiaryCardHeader"}>
              {beneficiaryAccountData?.accountName}
            </Text>
          </GridItem>
          <GridItem display={"flex"} flexDir={"column"} colSpan={1}>
            <Text textStyle={"normalStyle"} fontSize={"14px"}>
              Account Number
            </Text>
            <Text textStyle={"beneficiaryCardHeader"}>
              {" "}
              {beneficiaryAccountData?.accountNumber}
            </Text>
          </GridItem>
          <GridItem display={"flex"} flexDir={"column"} colSpan={1}>
            <Text textStyle={"normalStyle"} fontSize={"14px"}>
              Bank Name
            </Text>
            <Text textStyle={"beneficiaryCardHeader"}>
              {" "}
              {beneficiaryAccountData?.payoutPartnerId?.label}
            </Text>
          </GridItem>
          <GridItem display={"flex"} flexDir={"column"} colSpan={1}>
            <Text textStyle={"normalStyle"} fontSize={"14px"}>
              Contact Number
            </Text>
            <Text textStyle={"beneficiaryCardHeader"}>
              {" "}
              {beneficiaryAccountData?.mobileNumber}
            </Text>
          </GridItem>
          <GridItem display={"flex"} flexDir={"column"} colSpan={1}>
            <Text textStyle={"normalStyle"} fontSize={"14px"}>
              Country
            </Text>
            <Text textStyle={"beneficiaryCardHeader"}>
              {beneficiaryAccountData?.country}
            </Text>
          </GridItem>
        </SimpleGrid>
      </Stack>
      <Stack padding={6} background={colorScheme.gray_50} borderRadius={"16px"}>
        <Text fontSize={"14px"} fontWeight={700} color={colorScheme.gray_700}>
          Transaction Detail
        </Text>
        <SimpleGrid columns={3} columnGap={"100px"} rowGap={"30px"}>
          <GridItem display={"flex"} flexDir={"column"} colSpan={1}>
            <Text textStyle={"normalStyle"} fontSize={"14px"}>
              Processed By
            </Text>
            <Text textStyle={"beneficiaryCardHeader"}>Master Card</Text>
          </GridItem>
          <GridItem display={"flex"} flexDir={"column"} colSpan={1}>
            <Text textStyle={"normalStyle"} fontSize={"14px"}>
              Purpose
            </Text>
            <Text textStyle={"beneficiaryCardHeader"}>
              {beneficiaryAccountData?.purposeOfPayment?.label}
            </Text>
          </GridItem>
          <GridItem display={"flex"} flexDir={"column"} colSpan={1}>
            <Text textStyle={"normalStyle"} fontSize={"14px"}>
              Remarks
            </Text>
            <Text textStyle={"beneficiaryCardHeader"}>
              {beneficiaryAccountData?.remarks}
            </Text>
          </GridItem>
        </SimpleGrid>
      </Stack>
      <Stack padding={6} background={colorScheme.gray_50} borderRadius={"16px"}>
        <Text fontSize={"14px"} fontWeight={700} color={colorScheme.gray_700}>
          Total Calculation
        </Text>
        <SimpleGrid columns={3} columnGap={"100px"} rowGap={"30px"}>
          <GridItem display={"flex"} flexDir={"column"} colSpan={1}>
            <Text textStyle={"normalStyle"} fontSize={"14px"}>
              Promo Code
            </Text>
            <Text
              backgroundColor={
                sendMoneyData?.promoCode != ""
                  ? "#C6F6D5"
                  : colorScheme.gray_100
              }
              px={4}
              py={1}
              borderRadius={8}
              textStyle={"beneficiaryCardHeader"}
              width={"max-content"}
            >
              {sendMoneyData?.promoCode != ""
                ? sendMoneyData?.promoCode
                : "---"}
            </Text>
          </GridItem>
          <GridItem display={"flex"} flexDir={"column"} colSpan={1}>
            <Text textStyle={"normalStyle"} fontSize={"14px"}>
              Exchange Rate
            </Text>
            <Text textStyle={"beneficiaryCardHeader"}>
              {sendingCountryCurrencySymbol +
                sendMoneyData?.exchangeRate +
                " = " +
                receivingCountryCurrencySymbol +
                "1"}
            </Text>
          </GridItem>
          <GridItem display={"flex"} flexDir={"column"} colSpan={1}>
            <Text textStyle={"normalStyle"} fontSize={"14px"}>
              Sending Amount
            </Text>
            <Text textStyle={"beneficiaryCardHeader"}>
              {sendingCountryCurrencySymbol + sendMoneyData?.sendingAmount}
            </Text>
          </GridItem>
          {/* //asd */}
          <GridItem display={"flex"} flexDir={"column"} colSpan={1}>
            <Text textStyle={"normalStyle"} fontSize={"14px"}>
              Receiver Receives
            </Text>
            <Text textStyle={"beneficiaryCardHeader"}>
              {receivingCountryCurrencySymbol + sendMoneyData?.receivingAmount}
            </Text>
          </GridItem>
          <GridItem display={"flex"} flexDir={"column"} colSpan={1}>
            <Text textStyle={"normalStyle"} fontSize={"14px"}>
              Fee
            </Text>
            <Text textStyle={"beneficiaryCardHeader"}>
              {sendingCountryCurrencySymbol + sendMoneyData?.fee}
            </Text>
          </GridItem>
          <GridItem display={"flex"} flexDir={"column"} colSpan={1}>
            <Text textStyle={"normalStyle"} fontSize={"14px"}>
              Total Amount
            </Text>
            <Text textStyle={"beneficiaryCardHeader"}>
              {sendingCountryCurrencySymbol + sendMoneyData?.totalAmount}
            </Text>
          </GridItem>
        </SimpleGrid>
      </Stack>
      <HStack justifyContent={"space-between"}>
        <GoBack onClick={() => setPageName("cardPayment")} />

        <Button
          onClick={() => setPageName("mpinConfirmation")}
          variant="send_money"
        >
          Proceed
        </Button>
      </HStack>
    </Card>
  );
};

export default PaymentConfirmation;
