import { HStack, Text, VStack } from "@chakra-ui/react";
import AuthPageWrapper from "../AuthPageWrapper";
import AdditionalInformation from "./AdditionalInfoForm";
const AdditionalInfo = () => {
  return (
    <AuthPageWrapper>
      <VStack alignItems="flex-start" gap={"4px"}>
        <HStack gap={"12px"}>
          <Text
            textStyle={"loginPageHeader"}
            fontSize={"29px"}
            fontFamily={"Mulish"}
            fontWeight={"800"}
          >
            Additional Information
          </Text>
        </HStack>
        <Text
          fontFamily={"Mulish"}
          fontWeight={"400"}
          fontSize={"14px"}
          color={"#2D3748"}
        >
          Please Fill this additional Information to continue.
        </Text>
      </VStack>
      <AdditionalInformation />
    </AuthPageWrapper>
  );
};

export default AdditionalInfo;
