import {
  Button,
  IconButton,
  Stack,
  Text,
  VStack,
  useBoolean
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { svgAssets } from "@neoWeb/assets/images/svgs";
import TextInput from "@neoWeb/components/Form/TextInput";
import { useStore, useTokenStore } from "@neoWeb/store/store";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AuthPageProps } from "../../Register/RegisterForm";
import PasswordStrength from "./passwordStrength";
import { useResetPassword } from "@neoWeb/services/service-forgot-password";
const defaultValues = {
  password: "",
  confirm_password: ""
};

const SetPassword = ({ setScreen }: AuthPageProps) => {
  const { mutateAsync, isPending: isPasswordLoading } = useResetPassword();
  const { email } = useStore();
  const { setToken } = useTokenStore();

  const passwordSchema = z
    .object({
      password: z.string().min(1, { message: "Name is required" }),
      confirm_password: z.string().min(1, { message: "Name is required" })
    })
    .refine(data => data.password === data.confirm_password, {
      message: "Passwords don't match",
      path: ["confirm_password"]
    });
  const { control, watch, handleSubmit } = useForm({
    defaultValues,
    resolver: zodResolver(passwordSchema)
  });

  const [flag, setFlag] = useBoolean();
  const [confirmFlag, setConfirmFlag] = useBoolean();

  const handlePasswordChange = async (data: typeof defaultValues) => {
    try {
      const passwordSetResponse = await mutateAsync({
        email: email,
        newPassword: data.password,
        changePasswordFor: "USER_REGISTRATION"
      });
      if (passwordSetResponse?.data?.responseStatus == "SUCCESS") {
        setToken(passwordSetResponse?.data?.data?.accessToken);
        setScreen("setmpin");
      }
    } catch (error) {
      console.error("Error setting Password:", error);
    }
  };

  return (
    <>
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
    </>
  );
};

export default SetPassword;
