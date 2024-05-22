import { HStack, Text, VStack } from "@chakra-ui/react";
import AuthPageWrapper from "../Components/AuthPageWrapper";
import RegisterForm from "./RegisterForm";

const Register = () => {
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
      <RegisterForm />
    </AuthPageWrapper>
  );
};

export default Register;
