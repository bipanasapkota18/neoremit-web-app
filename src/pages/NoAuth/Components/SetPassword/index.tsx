import {
  Button,
  IconButton,
  Stack,
  Text,
  VStack,
  useBoolean
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { svgAssets } from "@neoWeb/assets/images/svgs";
import TextInput from "@neoWeb/components/Form/TextInput";
import { useResetPassword } from "@neoWeb/services/service-forgot-password";
import { useStore } from "@neoWeb/store/store";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import * as yup from "yup";
import AuthPageWrapper from "../AuthPageWrapper";
import PasswordStrength from "./passwordStrength";

const defaultValues = {
  password: "",
  confirm_password: ""
};

const SetPassword = () => {
  const { mutateAsync, isPending: isPasswordLoading } = useResetPassword();
  const { email } = useStore();
  const passwordSchema = yup.object().shape({
    password: yup
      .string()
      .min(8, "Password must be 8 characters long")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(
        /[!@#$%&*()]/,
        "Password must contain at least one symbol !@#$%&*"
      )
      .required("Password is required"),
    confirm_password: yup
      .string()
      .required("Please enter a password")
      .oneOf([yup.ref("password")], "Passwords don't match")
  });
  const { control, watch, handleSubmit } = useForm({
    defaultValues,
    resolver: yupResolver(passwordSchema)
  });

  const [flag, setFlag] = useBoolean();
  const [searchParams] = useSearchParams();
  const [confirmFlag, setConfirmFlag] = useBoolean();
  const navigate = useNavigate();

  const handlePasswordChange = async (data: any) => {
    try {
      const passwordSetResponse = await mutateAsync({
        email: email,
        newPassword: data.password,
        changePasswordFor: "USER_REGISTRATION"
      });
      
    } catch (error) {
      console.error("Error setting Password:", error);
    }
    navigate("/SETUPPIN");
  };

  return (
    <AuthPageWrapper>
      <VStack alignItems={"flex-start"} gap={"24px"}>
        <Text fontSize="29px" fontWeight="800" color="gray.700">
          Set login Password
        </Text>
        <Text fontSize={"14px"} fontWeight={"400"} color="#2D3748">
          Please enter your new password, make sure to save your password
        </Text>
      </VStack>
      <VStack as="form" gap={8} onSubmit={handleSubmit(handlePasswordChange)}>
        <Stack gap={"5"} width={"100%"}>
          <TextInput
            startIcon={<svgAssets.PasswordIcon />}
            type={flag ? "text" : "password"}
            name="password"
            placeholder={"Password"}
            control={control}
            size={"lg"}
            endIcons={
              <IconButton
                tabIndex={-1}
                colorScheme={"black"}
                size="xs"
                variant="link"
                aria-label="password-control"
                onClick={setFlag.toggle}
                icon={
                  flag ? (
                    <svgAssets.EyeIcon height={"20px"} width={"20px"} />
                  ) : (
                    <svgAssets.EyeSlashIcon height={"20px"} width={"20px"} />
                  )
                }
              />
            }
          />
          <PasswordStrength password={watch("password") ?? ""} />
          <TextInput
            startIcon={<svgAssets.PasswordIcon />}
            type={confirmFlag ? "text" : "password"}
            name="confirm_password"
            placeholder={"Confirm Password"}
            control={control}
            size={"lg"}
            endIcons={
              <IconButton
                tabIndex={-1}
                colorScheme={"black"}
                size="xs"
                variant="link"
                aria-label="password-control"
                onClick={setConfirmFlag.toggle}
                icon={
                  confirmFlag ? (
                    <svgAssets.EyeIcon height={"20px"} width={"20px"} />
                  ) : (
                    <svgAssets.EyeSlashIcon height={"20px"} width={"20px"} />
                  )
                }
              />
            }
          />
        </Stack>
        <Button type="submit" width={"100%"} isLoading={isPasswordLoading}>
          Confirm
        </Button>
      </VStack>
    </AuthPageWrapper>
  );
};

export default SetPassword;
