import { HStack, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import AuthPageWrapper from "../Components/AuthPageWrapper";
import SetPassword from "../Components/SetPassword";
import SetupPin from "../Components/SetupPin";
import OTP from "../OTP";
import RegisterForm from "./RegisterForm";

const Register = () => {
  const [screen, setScreen] = useState("registerForm");

  const SwitchComponent = () => {
    switch (screen) {
      case "otp":
        return <OTP setScreen={setScreen} type="USER_REGISTRATION" />;
      case "passwordForm":
        return <SetPassword setScreen={setScreen} />;
      case "setmpin":
        return <SetupPin />;
      default:
        return <RegisterForm setScreen={setScreen} />;
    }
  };
  return (
    <AuthPageWrapper>
      <VStack alignItems="flex-start" gap={"4px"}>
        <HStack gap={"12px"}>
          <Text
            textStyle={"registerPageHeader"}
            fontSize={"29px"}
            fontFamily={"Mulish"}
            fontWeight={"800"}
          >
            Sign Up
          </Text>
        </HStack>
        <Text textStyle={"normalStyle"}>
          A 6 code verification OTP code will be sent to your Email account.
        </Text>
      </VStack>
      {SwitchComponent()}
    </AuthPageWrapper>
  );
};

export default Register;
