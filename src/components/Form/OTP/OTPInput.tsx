import { PinInputField } from "@chakra-ui/react";
import { colorScheme } from "@neoWeb/theme/colorScheme";

const OTPInput = () => {
  return (
    <PinInputField
      textAlign={"center"}
      width="38px"
      height="38px"
      borderRadius="8px"
      border={`1px solid ${colorScheme.primary_400}`}
      _focus={{
        outline: "none"
      }}
      background={colorScheme.gray_100}
    />
  );
};

export default OTPInput;
