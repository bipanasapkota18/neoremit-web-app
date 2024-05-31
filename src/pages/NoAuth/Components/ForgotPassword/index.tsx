import { HStack, Stack } from "@chakra-ui/react";
import { useState } from "react";
import OTP from "../../OTP";
import AuthPageWrapper from "../AuthPageWrapper";
import SetPassword from "../SetPassword";
import ForgotPasswordForm from "./forgotPassword";

const ForgotPassword = () => {
  const [screen, setScreen] = useState("registerForm");

  const SwitchComponent = () => {
    switch (screen) {
      case "otp":
        return <OTP type="FORGOT_PASSWORD" setScreen={setScreen} />;
      case "passwordForm":
        return <SetPassword setScreen={setScreen} />;
      default:
        return <ForgotPasswordForm setScreen={setScreen} />;
    }
  };
  return (
    <AuthPageWrapper isPassword screen={screen}>
      <Stack gap={"32px"} width="100%">
        <HStack>
          {/* <GoBack
            onClick={() => {
              if (screen === "otp") {
                setScreen("registerForm");
              } else if (screen === "passwordForm") {
                setScreen("otp");
              } else if (screen === "registerForm") {
                navigate(NAVIGATION_ROUTES.LOGIN);
              }
            }}
          /> */}
        </HStack>
        <HStack
          justifyContent={"space-between"}
          alignItems={"flex-start"}
        ></HStack>
        {SwitchComponent()}
      </Stack>
    </AuthPageWrapper>
  );
};

export default ForgotPassword;
