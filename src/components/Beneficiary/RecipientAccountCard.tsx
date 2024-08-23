import { Avatar, HStack, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { ISendMoneyForm } from "@neoWeb/pages/Authorized/SendMoney/SendMoney";
import { IBeneficiaryCheckoutDetailsResponse } from "@neoWeb/services/service-beneficiary";

interface BeneficiaryCardProps extends ISendMoneyForm {
  data: IBeneficiaryCheckoutDetailsResponse[] | undefined;
  // setBeneficiaryAccountId: Dispatch<SetStateAction<number | undefined>>;
}
const RecipientAccountCard = ({
  data,
  setPageName
  // setBeneficiaryAccountId
}: BeneficiaryCardProps) => {
  return (
    <SimpleGrid columns={3} gap={4}>
      {data?.map(item => {
        return (
          <Stack
            key={item.id}
            borderRadius={"16px"}
            bg={"#EDF2F7"}
            padding={"16px"}
            gap={4}
            cursor={"pointer"}
            onClick={() => {
              // setBeneficiaryAccountId(item?.id ?? 0);
              setPageName("paymentDetails");
            }}
          >
            <HStack>
              <Avatar
                height={"29px"}
                width={"29px"}
                // src={`${baseURL}/document-service/master/payout/partner/image?fileId=${item?.payoutPartner?.image}`}
              />
              {/* <Text textStyle={"beneficiaryCard"}>
                {item?.payoutPartner?.name}
              </Text> */}
            </HStack>
            <HStack flexDir={"column"} alignItems={"flex-start"}>
              <Stack
                flexDir={"row"}
                justifyContent={"space-between"}
                alignSelf={"stretch"}
              >
                <Text textStyle={"beneficiaryCardSubHeader"}>Account Name</Text>
                <Text textStyle={"beneficiaryCard"}>{item?.accountName}</Text>
              </Stack>
              <Stack
                flexDir={"row"}
                justifyContent={"space-between"}
                alignSelf={"stretch"}
              >
                <Text textStyle={"beneficiaryCardSubHeader"}>
                  Account Number
                </Text>
                <Text textStyle={"beneficiaryCard"}>{item?.accountNumber}</Text>
              </Stack>
            </HStack>
          </Stack>
        );
      })}
    </SimpleGrid>
  );
};

export default RecipientAccountCard;
