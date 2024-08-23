import { Button, Flex, Stack, Text, VStack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import OTPComponent from "@neoWeb/components/Form/OTP";
import {
  useResendOTp,
  useVerifyOTP
} from "@neoWeb/services/service-forgot-password";

import { useStore } from "@neoWeb/store/store";
import { colorScheme } from "@neoWeb/theme/colorScheme";
import moment from "moment";
import { useForm } from "react-hook-form";
import { useTimer } from "react-timer-hook";
import { object, string } from "yup";

const defaultValues = {
  otpCode: ""
};

export interface AuthPageProps {
  type: "FORGOT_PASSWORD" | "USER_REGISTRATION";
  setScreen: (value: string) => void;
}

const OTP = ({ setScreen, type }: AuthPageProps) => {
  const { seconds, minutes, isRunning, restart } = useTimer({
    expiryTimestamp: moment().add(30, "seconds").toDate()
  });
  const { email } = useStore();

  const { mutateAsync: emailVerification, isPending: isOTPLoading } =
    useVerifyOTP();

  const { mutateAsync: mutateResendOtp, isPending: isResendLoading } =
    useResendOTp();
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
        otpFor: type
      });
      if (response?.data?.responseStatus == "SUCCESS") {
        setScreen("passwordForm");
      }
    } catch (error) {
      console.error("Verification failed", error);
    }
  };

  const resendOtp = async () => {
    try {
      await mutateResendOtp({
        email: email,
        otpFor: type
      });
      restart(moment().add(30, "seconds").toDate());
    } catch (error) {
      console.error("Resend OTP failed", error);
    }
  };

  return (
    <>
      <VStack alignItems={"flex-start"} gap={8}>
        <Text
          fontSize="2xl"
          color={colorScheme.gray_700}
          fontWeight={"800"}
          lineHeight={"36.4px"}
        >
          OTP Verification
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
            flex={1}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            alignSelf="stretch"
          >
            <OTPComponent
              control={control}
              name="otpCode"
              page="otpCode"
              inputLength={6}
            />
          </Flex>
          <Flex gap={"24px"} alignItems={"flex-start"} alignSelf={"stretch"}>
            <Text textAlign={"center"} cursor={"pointer"} fontWeight={700}>
              Resend OTP code in :
              <Text as="span" pl={1} color={colorScheme.primary_400}>
                {moment(minutes, "minutes").format("mm")}:
                {moment(seconds, "seconds").format("ss")}
              </Text>
            </Text>
            {!isRunning &&
              (isResendLoading ? (
                <Text marginLeft={"auto"}>Resending...</Text>
              ) : (
                <Text
                  marginLeft={"auto"}
                  cursor={"pointer"}
                  onClick={() => resendOtp()}
                >
                  Resend
                </Text>
              ))}
          </Flex>
        </Stack>

        <Button
          type="submit"
          isDisabled={isOTPLoading || isResendLoading}
          width={"100%"}
        >
          Confirm
        </Button>
      </VStack>
    </>
  );
};

export default OTP;
