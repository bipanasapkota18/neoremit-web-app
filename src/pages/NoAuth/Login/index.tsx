import { HStack, Text, VStack } from "@chakra-ui/react";

import AuthPageWrapper from "../Components/AuthPageWrapper";
import LoginForm from "./LoginForm";

const Login = () => {
  return (
    <AuthPageWrapper>
      <VStack alignItems="flex-start" gap={"4px"}>
        <HStack gap={"12px"}>
          <Text textStyle={"loginPageHeader"}>Welcome !</Text>
          <Text fontSize={"24px"} lineHeight={"30.12px"}>
            &#128075;
          </Text>
        </HStack>
        <Text textStyle={"normalStyle"}>
          Log in to your account for seamless remittance transactions
        </Text>
      </VStack>
      <LoginForm />
    </AuthPageWrapper>
  );
};

export default Login;
