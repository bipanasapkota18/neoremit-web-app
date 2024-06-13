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
  return <AuthPageWrapper>{SwitchComponent()}</AuthPageWrapper>;
};

export default Register;
