import { Avatar, HStack, Icon, Stack, Text } from "@chakra-ui/react";
import { svgAssets } from "@neoWeb/assets/images/svgs";
import { IBeneficiaryAccountEditId } from "@neoWeb/pages/Authorized/BeneficiaryDetails/AddBeneficiary";
import { baseURL } from "@neoWeb/services/service-axios";
import { BeneficiaryCheckoutDetailRequest } from "@neoWeb/services/service-beneficiary";
import { Dispatch, SetStateAction } from "react";

interface BeneficiaryCardProps {
  setEditDetailId: Dispatch<SetStateAction<IBeneficiaryAccountEditId>>;
  onOpen: () => void;
  data: BeneficiaryCheckoutDetailRequest[];
}
const CardComponent = ({
  setEditDetailId,
  onOpen,
  data
}: BeneficiaryCardProps) => {
  return (
    <HStack gap={4} wrap={"wrap"}>
      {data?.map(item => {
        return (
          <Stack
            key={item.id}
            borderRadius={"16px"}
            bg={"#EDF2F7"}
            padding={"16px"}
            gap={4}
            width={"404px"}
          >
            <HStack justifyContent={"space-between"}>
              <HStack>
                <Avatar
                  height={"29px"}
                  width={"29px"}
                  src={`${baseURL}/document-service/master/payout/partner/image?fileId=${item?.payoutPartner?.image}`}
                />
                <Text textStyle={"beneficiaryCard"}>
                  {item?.payoutPartner?.name ?? item?.payoutPartner?.label}
                </Text>
              </HStack>
              <HStack justifyContent={"center"} alignItems={"center"}>
                {item?.isPrimary ? (
                  <Icon as={svgAssets.TickCircle} height={"24px"} w={"24px"} />
                ) : (
                  <Icon as={svgAssets.InfoCircle} height={"24px"} w={"24px"} />
                )}
                <Icon
                  onClick={() => {
                    setEditDetailId({
                      id: item?.id ?? item?.addId ?? null,
                      type: item?.id ? "backend" : "local"
                    });
                    onOpen();
                  }}
                  as={svgAssets.MoreInfo}
                  height={"24px"}
                  w={"24px"}
                  cursor={"pointer"}
                  mb={-1}
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
    </HStack>
  );
};

export default CardComponent;
