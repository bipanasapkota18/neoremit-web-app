import { Button, Text, VStack } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { svgAssets } from "@neoWeb/assets/images/svgs";
import TextInput from "@neoWeb/components/Form/TextInput";
import { useEmailVerification } from "@neoWeb/services/service-forgot-password";
import { useStore } from "@neoWeb/store/store";
import { colorScheme } from "@neoWeb/theme/colorScheme";
import { useForm } from "react-hook-form";
import { z } from "zod";

export interface AuthPageProps {
  type?: string;
  setScreen: (value: string) => void;
}
const defaultValues = {
  email: ""
};

const ForgotPasswordForm = ({ setScreen }: AuthPageProps) => {
  const { setEmail } = useStore();
  const {
    mutateAsync: emailVerification,
    isPending: isEmailVerificationPending
  } = useEmailVerification();

  const schema = z.object({
    email: z
      .string()
      .email({ message: "Invalid email format" })
      .min(1, { message: "Please enter your email address " })
  });
  const {
    handleSubmit,
    control,
    formState: { isValid }
  } = useForm({
    defaultValues,
    resolver: zodResolver(schema),
    mode: "onChange"
  });
  const submitHandler = async (data: typeof defaultValues) => {
    const response = await emailVerification(data);
    if (response.data.responseStatus === "SUCCESS") {
      setScreen("otp");
      setEmail(data.email);
    }
  };
  return (
    <>
      <VStack alignItems="flex-start" gap={"4px"}>
        <Text fontSize="2xl" fontWeight="600" color={colorScheme.gray_800}>
          Forget Password?
        </Text>
        <Text fontWeight="400" fontSize="md" color={colorScheme.gray_700}>
          Recover Acces to Your Account Reset Your Password
        </Text>
      </VStack>
      <VStack
        alignItems={"stretch"}
        justifyContent={"flex-start"}
        as={"form"}
        gap={"32px"}
        onSubmit={handleSubmit(submitHandler)}
      >
        <TextInput
          startIcon={<svgAssets.EmailIcon />}
          type="text"
          name="email"
          placeholder={"Email"}
          control={control}
        />
        <Button
          isLoading={isEmailVerificationPending}
          isDisabled={!isValid}
          size={"lg"}
          type="submit"
        >
          Send Code
        </Button>
      </VStack>
    </>
  );
};

export default ForgotPasswordForm;
