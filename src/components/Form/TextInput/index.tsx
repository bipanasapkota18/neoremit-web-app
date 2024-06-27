import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputProps,
  InputRightElement,
  Textarea,
  TextareaProps
} from "@chakra-ui/react";
import { imageAssets } from "@neoWeb/assets/images";
import { colorScheme } from "@neoWeb/theme/colorScheme";
import React from "react";
import { Control, Controller } from "react-hook-form";
interface TextInputProps {
  name: string;
  control: Control<any>;
  type: string;
  label?: string;
  helperText?: string;
  isRequired?: boolean;
  startIcon?: React.ReactNode;
  endIcons?: React.ReactNode;
  disabled?: boolean;
  onIconClick?: () => void;
  variant?: string;
  noFloating?: boolean;
  colorInput?: boolean;
  required?: boolean;
}
const TextInput: React.FC<TextInputProps & InputProps & TextareaProps> = ({
  name,
  control,
  label,
  type,
  helperText,
  isRequired,
  startIcon,
  disabled,
  endIcons,
  onIconClick,
  variant,
  noFloating,
  colorInput,
  required,
  ...extraProps
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const color = e.target.value;
          onChange(color); // Update the field value with the selected color
        };

        return (
          <>
            <FormControl
              variant={noFloating ? "default" : "floating"}
              id={name}
              isRequired={!!isRequired}
              isInvalid={!!error}
            >
              <InputGroup height={type !== "textarea" ? "46px" : "auto"}>
                {colorInput ? (
                  <InputRightElement top="6%" right="2%">
                    <Input
                      placeholder={label}
                      type={"color"}
                      p={0}
                      border={"none"}
                      onChange={handleColorChange}
                      value={value ?? ""}
                      errorBorderColor={colorScheme.danger_500}
                      disabled={disabled}
                      {...extraProps}
                    />
                  </InputRightElement>
                ) : startIcon ? (
                  <InputLeftElement
                    marginRight={"25px !important"}
                    top="20%"
                    pointerEvents="none"
                    onClick={onIconClick}
                  >
                    {startIcon}
                  </InputLeftElement>
                ) : null}
                {type == "textarea" ? (
                  <Textarea
                    borderRadius={"16px"}
                    paddingLeft={startIcon ? 9 : ""}
                    placeholder={label}
                    height={"120px"}
                    onChange={onChange}
                    value={value ?? ""}
                    isInvalid={!!error}
                    errorBorderColor={colorScheme.danger_500}
                    boxShadow="none !important"
                    disabled={disabled}
                    variant={variant}
                    _hover={{ borderColor: colorScheme.primary_500 }}
                    _focus={{ borderColor: colorScheme.primary_500 }}
                    {...extraProps}
                  />
                ) : (
                  <Input
                    paddingLeft={startIcon ? 9 : ""}
                    paddingBottom={startIcon ? "" : 0}
                    placeholder={""}
                    type={type}
                    height={"inherit"}
                    onChange={onChange}
                    onWheel={e => {
                      const target = e.target as HTMLInputElement;
                      type == "number" && target.blur();
                    }}
                    value={value ?? ""}
                    isInvalid={!!error}
                    errorBorderColor={colorScheme.danger_500}
                    disabled={disabled}
                    variant={variant}
                    css={{
                      "&::-webkit-calendar-picker-indicator": {
                        color: "rgba(0, 0, 0, 0)",
                        opacity: 1,
                        display: "block",
                        width: "20px",
                        height: "20px",
                        borderWidth: "thin",
                        borderStyle: "solid",
                        backgroundImage: `url(${imageAssets.CalendarIcon})`
                      }
                    }}
                    _hover={{ borderColor: colorScheme.primary_500 }}
                    _focus={{
                      borderColor: colorScheme.primary_500,
                      boxShadow: "none"
                    }}
                    {...extraProps}
                  />
                )}
                {!noFloating && (
                  <FormLabel position={"absolute"} left={"60px"}>
                    {label}
                    {required && (
                      <span style={{ color: "red", marginLeft: 4 }}>*</span>
                    )}
                  </FormLabel>
                )}
                {endIcons ? (
                  <InputRightElement onClick={onIconClick} top="20%">
                    {endIcons}
                  </InputRightElement>
                ) : (
                  ""
                )}
              </InputGroup>

              <FormErrorMessage ml={2} paddingTop={2}>
                {error ? error?.message : ""}
              </FormErrorMessage>
              {helperText ? (
                <FormHelperText color={colorScheme.sideBar_text} mt={0} ml={2}>
                  {helperText}
                </FormHelperText>
              ) : (
                ""
              )}
            </FormControl>
          </>
        );
      }}
    />
  );
};
export default TextInput;
