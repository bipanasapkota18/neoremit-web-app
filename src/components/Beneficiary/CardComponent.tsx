import { HStack, Icon, Stack, Text } from "@chakra-ui/react";
import { svgAssets } from "@neoWeb/assets/images/svgs";

interface BeneficiaryCardProps {
  primary: boolean;
  payoutPartnerName: string;
  accountName: string;
  accountNumber: string;
}
const CardComponent = ({
  primary,
  payoutPartnerName,
  accountName,
  accountNumber
}: BeneficiaryCardProps) => {
  return (
    <Stack
      borderRadius={"16px"}
      bg={"#EDF2F7"}
      padding={"16px"}
      gap={4}
      width={"404px"}
    >
      <HStack justifyContent={"space-between"}>
        <Text textStyle={"beneficiaryCard"}>{payoutPartnerName}</Text>
        <HStack>
          {primary ? (
            <Icon as={svgAssets.TickCircle} height={"24px"} w={"24px"} />
          ) : (
            <Icon as={svgAssets.InfoCircle} height={"24px"} w={"24px"} />
          )}
          <Icon
            as={svgAssets.MoreInfo}
            height={"24px"}
            w={"24px"}
            cursor={"pointer"}
          />
        </HStack>
      </HStack>
      <HStack flexDir={"column"} alignItems={"flex-start"}>
        <Stack
          flexDir={"row"}
          justifyContent={"space-between"}
          alignSelf={"stretch"}
        >
          <Text textStyle={"beneficiaryCardSubHeader"}>Account Name</Text>
          <Text textStyle={"beneficiaryCard"}>{accountName}</Text>
        </Stack>
        <Stack
          flexDir={"row"}
          justifyContent={"space-between"}
          alignSelf={"stretch"}
        >
          <Text textStyle={"beneficiaryCardSubHeader"}>Account Number</Text>
          <Text textStyle={"beneficiaryCard"}>{accountNumber}</Text>
        </Stack>
      </HStack>
    </Stack>
  );
};

export default CardComponent;
