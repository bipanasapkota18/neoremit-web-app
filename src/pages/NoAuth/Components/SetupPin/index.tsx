import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, Button, HStack, Text, VStack } from "@chakra-ui/react";
import OTPComponent from "@neoWeb/components/Form/OTP";
import { useForm } from "react-hook-form";
import AuthPageWrapper from "../AuthPageWrapper";

const SetupPin = () => {
  const { control } = useForm();
  return (
    <AuthPageWrapper>
      <VStack alignItems={"flex-start"} gap={1}>
        <Text
          fontFamily={"Mulish"}
          color={"#2D3748"}
          fontSize={"29px"}
          fontWeight={"800"}
        >
          Setup MPIn
        </Text>
        <Text
          fontFamily={"Mulish"}
          fontWeight={"400"}
          fontSize={"17px"}
          color={"#4A5568"}
        >
          Establish a Secure Transaction PIN for Remittance Transfers
        </Text>
      </VStack>
      <Box
        borderRadius={"16px"}
        bg={"#EDF2F7"}
        padding={"16px"}
        gap={"8px"}
        width={"404px"}
      >
        <Text
          fontFamily={"Mulish"}
          fontWeight={"800"}
          fontSize={"16px"}
          color={"#2D3748"}
        >
          Your MPIN must:
        </Text>
        <Text
          color={"#5A2F8D"}
          fontFamily={"Mulish"}
          fontSize={"16px"}
          fontWeight={"400"}
        >
          <ArrowBackIcon />
          Be 4 Digit Number
        </Text>
        <Text
          color={"#5A2F8D"}
          fontFamily={"Mulish"}
          fontSize={"16px"}
          fontWeight={"400"}
        >
          <ArrowBackIcon />
          Sequential or repetitive
        </Text>
      </Box>

      <VStack alignItems={"flex-start"}>
        <Text> Enter MPIN</Text>
        <HStack>
          <OTPComponent name="mpin" control={control} />
        </HStack>
        <Text color={"red"}> Error message</Text>
        <Text>Confirm MPIN</Text>
        <HStack>
          <OTPComponent name="mpin" control={control} />
        </HStack>
      </VStack>

      <Button>Confirm</Button>
    </AuthPageWrapper>
  );
};

export default SetupPin;
{
  /* <AuthPageWrapper isPassword screen={screen}>
      <Stack gap={"32px"} width="100%">
        <HStack>
          <GoBack
            onClick={() => {
              if (screen === "otp") {
                setScreen("registerForm");
              } else if (screen === "passwordForm") {
                setScreen("otp");
              } else if (screen === "registerForm") {
                navigate(NAVIGATION_ROUTES.LOGIN);
              }
            }}
          />
        </HStack>
        <HStack justifyContent={"space-between"} alignItems={"flex-start"}>
          <Image src={imageAssets.Logo} />
        </HStack>
        {SwitchComponent()}
      </Stack>
    </AuthPageWrapper> */
}
