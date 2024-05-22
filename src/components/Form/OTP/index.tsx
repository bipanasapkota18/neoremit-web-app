import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  PinInput
} from "@chakra-ui/react";
import { Control, Controller } from "react-hook-form";
import { BsEyeSlash } from "react-icons/bs";
import OTPInput from "./OTPInput";
interface OTPProps {
  name: string;
  control: Control<any>;

  helperText?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
}
const OTPComponent = ({
  name,

  isDisabled,
  control,
  helperText,
  isRequired
}: OTPProps) => {
  const inputLength = name === "otp" ? 6 : 4;
  const otpComponent = Array.from({ length: inputLength }, (_, i) => (
    // const otpComponent = Array.from({ length: 6 }, (_, i) => (\

    <OTPInput key={i} />
  ));

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        return (
          <>
            <FormControl
              isRequired={!!isRequired}
              isInvalid={!!error}
              id={name}
              maxW={"350px !important"}
            >
              <Flex gap={{ base: "30px", sm: "35px", md: "35px" }}>
                <PinInput
                  placeholder=""
                  otp
                  value={value}
                  onChange={onChange}
                  isDisabled={isDisabled}
                >
                  {otpComponent}
                </PinInput>
                {/* {name === "mpin" && <AddIcon />} */}
                {name == "mpin" && (
                  <BsEyeSlash width={"12px"} height={"20px"} />
                )}
              </Flex>
              <FormErrorMessage>{error ? error?.message : ""}</FormErrorMessage>
              {helperText ? <FormHelperText>{helperText}</FormHelperText> : ""}
            </FormControl>
          </>
        );
      }}
    />
  );
};

export default OTPComponent;
