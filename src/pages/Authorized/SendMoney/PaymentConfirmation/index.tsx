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
import { colorScheme } from "@neoWeb/theme/colorScheme";
import { ISendMoneyForm } from "../SendMoney";

const PaymentConfirmation = ({ setPageName }: ISendMoneyForm) => {
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
            <Text textStyle={"beneficiaryCardHeader"}>John Doe</Text>
          </GridItem>
          <GridItem display={"flex"} flexDir={"column"} colSpan={1}>
            <Text textStyle={"normalStyle"} fontSize={"14px"}>
              Account Number
            </Text>
            <Text textStyle={"beneficiaryCardHeader"}>John Doe</Text>
          </GridItem>
          <GridItem display={"flex"} flexDir={"column"} colSpan={1}>
            <Text textStyle={"normalStyle"} fontSize={"14px"}>
              Bank Name
            </Text>
            <Text textStyle={"beneficiaryCardHeader"}>Kumari Bank</Text>
          </GridItem>
          {/* //asd */}
          <GridItem display={"flex"} flexDir={"column"} colSpan={1}>
            <Text textStyle={"normalStyle"} fontSize={"14px"}>
              Email Address
            </Text>
            <Text textStyle={"beneficiaryCardHeader"}>admin@neo.com</Text>
          </GridItem>
          <GridItem display={"flex"} flexDir={"column"} colSpan={1}>
            <Text textStyle={"normalStyle"} fontSize={"14px"}>
              Contact Number
            </Text>
            <Text textStyle={"beneficiaryCardHeader"}>9808129300</Text>
          </GridItem>
          <GridItem display={"flex"} flexDir={"column"} colSpan={1}>
            <Text textStyle={"normalStyle"} fontSize={"14px"}>
              Country
            </Text>
            <Text textStyle={"beneficiaryCardHeader"}>Nepal</Text>
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
            <Text textStyle={"beneficiaryCardHeader"}>John Doe</Text>
          </GridItem>
          <GridItem display={"flex"} flexDir={"column"} colSpan={1}>
            <Text textStyle={"normalStyle"} fontSize={"14px"}>
              Remarks
            </Text>
            <Text textStyle={"beneficiaryCardHeader"}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Error ab
              minus harum ut saepe
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
            <Text textStyle={"beneficiaryCardHeader"}>John Doe</Text>
          </GridItem>
          <GridItem display={"flex"} flexDir={"column"} colSpan={1}>
            <Text textStyle={"normalStyle"} fontSize={"14px"}>
              Exchange Rate
            </Text>
            <Text textStyle={"beneficiaryCardHeader"}>John Doe</Text>
          </GridItem>
          <GridItem display={"flex"} flexDir={"column"} colSpan={1}>
            <Text textStyle={"normalStyle"} fontSize={"14px"}>
              Sending Amount
            </Text>
            <Text textStyle={"beneficiaryCardHeader"}>Kumari Bank</Text>
          </GridItem>
          {/* //asd */}
          <GridItem display={"flex"} flexDir={"column"} colSpan={1}>
            <Text textStyle={"normalStyle"} fontSize={"14px"}>
              Receiver Receives
            </Text>
            <Text textStyle={"beneficiaryCardHeader"}>admin@neo.com</Text>
          </GridItem>
          <GridItem display={"flex"} flexDir={"column"} colSpan={1}>
            <Text textStyle={"normalStyle"} fontSize={"14px"}>
              Fee
            </Text>
            <Text textStyle={"beneficiaryCardHeader"}>9808129300</Text>
          </GridItem>
          <GridItem display={"flex"} flexDir={"column"} colSpan={1}>
            <Text textStyle={"normalStyle"} fontSize={"14px"}>
              Total Amount
            </Text>
            <Text textStyle={"beneficiaryCardHeader"}>Nepal</Text>
          </GridItem>
        </SimpleGrid>
      </Stack>
      <HStack justifyContent={"space-between"}>
        <GoBack onClick={() => console.log("first")} />

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
