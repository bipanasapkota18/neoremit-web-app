import { HStack, Image, Stack } from "@chakra-ui/react";
import { imageAssets } from "@neoWeb/assets/images";
import GoBack from "@neoWeb/components/Button";
import { NAVIGATION_ROUTES } from "@neoWeb/pages/App/navigationRoutes";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import OTP from ".";
import AuthPageWrapper from "../Components/AuthPageWrapper";
import SetPassword from "../Components/SetPassword";
import SetupPin from "../Components/SetupPin";

const otp = () => {
  const navigate = useNavigate();

  const [screen, setScreen] = useState("registerForm");

  const SwitchComponent = () => {
    switch (screen) {
      case "passwordForm":
        return <OTP type="" setScreen={setScreen} />;
      case "passwordForm":
        return <SetPassword />;
      case "setmpin":
        return <SetupPin />;
      default:
        return <OTP setScreen={setScreen} />;
    }
  };

  return (
    <AuthPageWrapper isPassword screen={screen}>
      <Stack gap={"32px"} width="100%">
        <HStack>
          <GoBack
            onClick={() => {
              if (screen === "passwordForm") {
                setScreen("registerForm");
              } else if (screen === "setmpin") {
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
    </AuthPageWrapper>
  );
};

export default otp;
