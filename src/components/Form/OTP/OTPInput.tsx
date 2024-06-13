import { PinInputField } from "@chakra-ui/react";
import { colorScheme } from "@neoWeb/theme/colorScheme";

export interface pageName {
  length: number;
  type: string;
}
const OTPInput = ({ length, type }: pageName) => {
  return (
    <PinInputField
      type={type}
      textAlign={"center"}
      width={length == 6 ? "38px" : "46px"}
      height={length == 6 ? "38px" : "46px"}
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
