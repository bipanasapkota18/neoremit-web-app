import { Button, Flex, Stack, Text, VStack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import OTPComponent from "@neoWeb/components/Form/OTP";
import { useTimer } from "@neoWeb/hooks/useTimer";
import { useVerifyOTP } from "@neoWeb/services/service-forgot-password";
import { useStore } from "@neoWeb/store/store";
import { colorScheme } from "@neoWeb/theme/colorScheme";
import { useForm } from "react-hook-form";
import { object, string } from "yup";

const defaultValues = {
  otpCode: ""
};

export interface AuthPageProps {
  type?: string;
  setScreen: (value: string) => void;
}

const OTP = ({ setScreen }: AuthPageProps) => {
  const { email } = useStore();
  const { minutes, formattedSeconds } = useTimer(0.5);

  const { mutateAsync: emailVerification, isPending: isOTPLoading } =
    useVerifyOTP();
  const otpSchema = object().shape({
    otpCode: string().required("Please Enter OTP").min(6)
  });
  const { control, handleSubmit } = useForm({
    defaultValues,

    resolver: yupResolver(otpSchema)
  });

  const handleOtpValidation = async (data: typeof defaultValues) => {
    try {
      const response = await emailVerification({
        otpCode: data?.otpCode,
        email: email,
        otpFor: "USER_REGISTRATION"
      });
      if (response?.data?.responseStatus == "SUCCESS") {
        setScreen("passwordForm");
      }
    } catch (error) {
      console.error("Verification failed", error);
    }
  };

  return (
    <>
      <VStack alignItems={"flex-start"} gap={1}>
        <Text
          fontSize="2xl"
          color={colorScheme.gray_700}
          fontWeight={"800"}
          lineHeight={"36.4px"}
        >
          Otp verification
        </Text>
        <Text
          fontWeight={"600"}
          gap={"4px"}
          lineHeight={"21.34px"}
          fontFamily={"Mulish"}
          color={colorScheme.gray_600}
        >
          Please enter the OTP verification code we sent to Gmail
        </Text>
      </VStack>
      <VStack
        as={"form"}
        gap={8}
        alignItems={"stretch"}
        onSubmit={handleSubmit(handleOtpValidation)}
      >
        <Stack gap={5} alignItems={"center"} width={"100%"}>
          <Flex
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            alignSelf="stretch"
            gap={"24px"}
          >
            <OTPComponent control={control} name="otpCode" />
          </Flex>
          <Flex gap={"24px"} alignItems={"flex-start"} alignSelf={"stretch"}>
            <Text textAlign={"center"} cursor={"pointer"} fontWeight={700}>
              Resend OTP code in :
              <Text as="span" pl={1} color={colorScheme.primary_400}>
                {minutes}:{formattedSeconds}
              </Text>
            </Text>
            <Text marginLeft={"auto"}>Resend</Text>
          </Flex>
        </Stack>

        <Button type="submit" isDisabled={isOTPLoading} width={"100%"}>
          Confirm
        </Button>
      </VStack>
    </>
  );
};

export default OTP;
