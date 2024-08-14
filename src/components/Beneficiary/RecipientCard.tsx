import { Avatar, HStack, Icon, Stack, Text } from "@chakra-ui/react";
import { svgAssets } from "@neoWeb/assets/images/svgs";
import { sidebarSvg } from "@neoWeb/assets/images/svgs/Sidebar";
import { baseURL } from "@neoWeb/services/service-axios";
import { colorScheme } from "@neoWeb/theme/colorScheme";
import { Dispatch, SetStateAction } from "react";

interface IBeneficiaryProps {
  id: number | null;
  fullName: string;
  address: string;
  mobileNumber: string;
  profileImage: string;
  relationship: string;
  setPageName: Dispatch<SetStateAction<string>>;
  setBeneficiaryId: Dispatch<SetStateAction<number | null>>;
}
const RecipientCard = ({
  id,
  fullName,
  address,
  mobileNumber,
  profileImage,
  relationship,
  setBeneficiaryId,
  setPageName
}: IBeneficiaryProps) => {
  const handleClick = () => {
    setBeneficiaryId(id);
    setPageName("recipientAccountDetails");
  };
  return (
    <HStack
      justifyContent={"space-between"}
      padding={"12px"}
      gap={2}
      background={"#FFFFFF"}
      boxShadow={"4px 0px 26px 0px rgba(0, 0, 0, 0.06)"}
      borderRadius={"12px"}
      cursor={"pointer"}
      onClick={handleClick}
    >
      <Avatar
        height={"64px"}
        minW={"64px"}
        name="Dan Abrahmov"
        src={`${baseURL}/document-service/customer/profile-image?fileId=${profileImage}`}
        borderRadius={0}
      />
      <Stack gap={1} marginRight={"auto"}>
        <Text
          textStyle={"normalStyle"}
          fontWeight={700}
          color={colorScheme.gray_700}
        >
          {fullName}
        </Text>
        <Text
          textStyle={"beneficiaryCardHeader"}
          display={"flex"}
          alignItems={"center"}
          gap={1}
        >
          <Icon as={svgAssets.Phone} />
          {mobileNumber}
        </Text>
        <Text
          textStyle={"beneficiaryCardHeader"}
          display={"flex"}
          alignItems={"center"}
          gap={1}
        >
          <Icon as={svgAssets.Location} height={"16px"} width={"16px"} />
          {address}
        </Text>
      </Stack>
      <HStack marginLeft={"auto"} gap={2} justifyContent={"flex-end"} pr={2}>
        <Text
          color={colorScheme.primary_500}
          fontWeight={600}
          fontSize={"14px"}
          alignItems={"center"}
        >
          <Icon as={sidebarSvg.Ellipse} height={"10px"} width={"10px"} />{" "}
          {relationship}
        </Text>
      </HStack>
    </HStack>
  );
};

export default RecipientCard;
