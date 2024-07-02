import {
  Avatar,
  Box,
  Button,
  Card,
  GridItem,
  HStack,
  SimpleGrid,
  Stack,
  Text
} from "@chakra-ui/react";
import { svgAssets } from "@neoWeb/assets/images/svgs";
import { NAVIGATION_ROUTES } from "@neoWeb/pages/App/navigationRoutes";
import { useTransactionStore } from "@neoWeb/store/SendMoney";
import { useStoreInitData } from "@neoWeb/store/initData";
import { colorScheme } from "@neoWeb/theme/colorScheme";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const Invoice = () => {
  const navigate = useNavigate();
  const { transactionData } = useTransactionStore();
  const { initData } = useStoreInitData();

  console.log(transactionData);
  const sendingCountryCurrencySymbol =
    initData?.sendingCountry?.currency?.symbol ?? "";

  return (
    <Card padding={"24px"} gap={"16px"}>
      <HStack justifyContent={"space-between"}>
        <Text fontSize={"17px"} fontWeight={700} color={colorScheme.gray_700}>
          Invoice
        </Text>
        <HStack gap={"16px"}>
          <Button
            leftIcon={<svgAssets.ShareIcon height={"24px"} width={"24px"} />}
            variant={"share"}
            py={"25px"}
            px={6}
          >
            Share
          </Button>
          <Button
            leftIcon={<svgAssets.DownloadIcon height={"24px"} width={"24px"} />}
            variant={"download"}
            py={"25px"}
            px={6}
          >
            Download
          </Button>
        </HStack>
      </HStack>
      <HStack
        justifyContent={"space-between"}
        py={3}
        px={4}
        background={colorScheme.gray_50}
      >
        <HStack gap={2}>
          <Avatar borderRadius={"7px"} />
          <Box>
            <Text textStyle={"beneficiaryCardHeader"}>John Doe</Text>
            <Text textStyle={"beneficiaryCardSubHeader"}>
              {moment(transactionData?.processDate).format("DD MMM YYYY")}
            </Text>
          </Box>
        </HStack>
        <Box>
          <Text textStyle={"beneficiaryCardHeader"} color={"red"}>
            {sendingCountryCurrencySymbol + transactionData?.totalAmount}{" "}
            <Text as={"span"} fontSize={"12px"} color="black">
              USD
            </Text>
          </Text>
          <Text textStyle={"beneficiaryCardSubHeader"}>12:30 PM</Text>
        </Box>
      </HStack>
      <Stack background={colorScheme.gray_50} p={4} borderRadius={"16px"}>
        <Text fontSize={"14px"} fontWeight={700} color={colorScheme.gray_700}>
          Transaction Detail
        </Text>
        <SimpleGrid columns={3} columnGap={"100px"} rowGap={"30px"}>
          <GridItem display={"flex"} flexDir={"column"} colSpan={1}>
            <Text textStyle={"normalStyle"} fontSize={"14px"}>
              Transaction
            </Text>
            <Text textStyle={"beneficiaryCardHeader"}>
              {transactionData?.transactionStatus}
            </Text>
          </GridItem>
          <GridItem display={"flex"} flexDir={"column"} colSpan={1}>
            <Text textStyle={"normalStyle"} fontSize={"14px"}>
              Transaction PIN
            </Text>
            <Text textStyle={"beneficiaryCardHeader"}>
              {" "}
              {transactionData?.transactionId}
            </Text>
          </GridItem>
          <GridItem display={"flex"} flexDir={"column"} colSpan={1}>
            <Text textStyle={"normalStyle"} fontSize={"14px"}>
              Name
            </Text>
            <Text textStyle={"beneficiaryCardHeader"}>
              {transactionData?.beneficiaryName}
            </Text>
          </GridItem>
          {/* //asd */}
          <GridItem display={"flex"} flexDir={"column"} colSpan={1}>
            <Text textStyle={"normalStyle"} fontSize={"14px"}>
              Receiver Bank Account
            </Text>
            <Text textStyle={"beneficiaryCardHeader"}>
              {" "}
              {transactionData?.beneficiaryBankName}
            </Text>
          </GridItem>
          <GridItem display={"flex"} flexDir={"column"} colSpan={1}>
            <Text textStyle={"normalStyle"} fontSize={"14px"}>
              Account Number
            </Text>
            <Text textStyle={"beneficiaryCardHeader"}>
              {" "}
              {transactionData?.beneficiaryAccountNumber}
            </Text>
          </GridItem>
          <GridItem display={"flex"} flexDir={"column"} colSpan={1}>
            <Text textStyle={"normalStyle"} fontSize={"14px"}>
              Processed By
            </Text>
            <Text textStyle={"beneficiaryCardHeader"}>
              {" "}
              {transactionData?.processBy}
            </Text>
          </GridItem>
          <GridItem display={"flex"} flexDir={"column"} colSpan={1}>
            <Text textStyle={"normalStyle"} fontSize={"14px"}>
              Sent Amount
            </Text>
            <Text textStyle={"beneficiaryCardHeader"}>
              {" "}
              {sendingCountryCurrencySymbol + transactionData?.sendingAmount}
            </Text>
          </GridItem>
          <GridItem display={"flex"} flexDir={"column"} colSpan={1}>
            <Text textStyle={"normalStyle"} fontSize={"14px"}>
              Total Amount
            </Text>
            <Text textStyle={"beneficiaryCardHeader"}>
              {" "}
              {sendingCountryCurrencySymbol + transactionData?.totalAmount}
            </Text>
          </GridItem>
        </SimpleGrid>
      </Stack>
      <HStack justifyContent={"flex-end"}>
        <Button
          onClick={() => navigate(NAVIGATION_ROUTES.HOME)}
          variant="send_money"
        >
          Go Home
        </Button>
      </HStack>
    </Card>
  );
};

export default Invoice;
