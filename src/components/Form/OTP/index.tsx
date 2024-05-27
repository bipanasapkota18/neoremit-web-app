import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  IconButton,
  PinInput,
  useBoolean
} from "@chakra-ui/react";
import { svgAssets } from "@neoWeb/assets/images/svgs";
import { Control, Controller } from "react-hook-form";
import OTPInput from "./OTPInput";
interface OTPProps {
  name: string;
  control: Control<any>;
  page: string;
  helperText?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
}
const OTPComponent = ({
  name,
  page,
  isDisabled,
  control,
  helperText,
  isRequired
}: OTPProps) => {
  const [flag, setFlag] = useBoolean();
  const inputLength = page === "otpCode" ? 6 : 4;
  const otpComponent = Array.from({ length: inputLength }, (_, i) => (
    <OTPInput key={i} name={page} type={flag ? "text" : "password"} />
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
              <Flex gap={page === "otpCode" ? 7 : 14}>
                <PinInput
                  placeholder=""
                  otp
                  value={value}
                  onChange={onChange}
                  isDisabled={isDisabled}
                >
                  {otpComponent}
                </PinInput>
                {page == "mpin" && (
                  <IconButton
                    colorScheme={"black"}
                    size="xs"
                    variant="link"
                    aria-label="mpin-control"
                    onClick={setFlag.toggle}
                    icon={
                      flag ? (
                        <svgAssets.EyeIcon height={"38px"} width={"38px"} />
                      ) : (
                        <svgAssets.EyeSlashIcon
                          height={"38px"}
                          width={"38px"}
                        />
                      )
                    }
                  />
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
