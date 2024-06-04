import {
  Avatar,
  HStack,
  Icon,
  IconButton,
  Stack,
  Text
} from "@chakra-ui/react";
import { svgAssets } from "@neoWeb/assets/images/svgs";
import { baseURL } from "@neoWeb/services/service-axios";
import { colorScheme } from "@neoWeb/theme/colorScheme";
import { SetStateAction } from "jotai";
import { Dispatch } from "react";

interface IBeneficiaryProps {
  id: number;
  fullName: string;
  address: string;
  mobileNumber: string;
  profileImage: string;
  setBeneficiaryEditId: Dispatch<SetStateAction<number | null>>;
  setFlag: {
    on: () => void;
    off: () => void;
    toggle: () => void;
  };
}
const BeneficiaryCard = ({
  setBeneficiaryEditId,
  setFlag,
  id,
  fullName,
  address,
  mobileNumber,
  profileImage
}: IBeneficiaryProps) => {
  return (
    <HStack
      justifyContent={"space-between"}
      padding={"12px"}
      gap={2}
      background={"#FFFFFF"}
      boxShadow={"4px 0px 26px 0px rgba(0, 0, 0, 0.06)"}
      borderRadius={"12px"}
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
          <Icon as={svgAssets.Location} />
          {address}
        </Text>
      </Stack>
      <HStack marginLeft={"auto"} gap={2} justifyContent={"flex-end"}>
        <IconButton
          variant={"light"}
          border={"none"}
          aria-label="Edit"
          height={"20px"}
          minW={"20px !important"}
          onClick={() => {
            setBeneficiaryEditId(id);
            setFlag.on();
          }}
          icon={<svgAssets.UserEdit />}
        />
        <IconButton
          variant={"light"}
          border={"none"}
          aria-label="Delete"
          height={"20px"}
          minWidth={"20px !important"}
          icon={<svgAssets.Delete />}
        />
      </HStack>
    </HStack>
  );
};

export default BeneficiaryCard;
