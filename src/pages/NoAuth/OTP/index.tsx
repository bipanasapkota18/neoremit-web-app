import { Button, Flex, Stack, Text, VStack } from "@chakra-ui/react";
import OTPComponent from "@neoWeb/components/Form/OTP";
import { useTimer } from "@neoWeb/hooks/useTimer";
import { useVerifyOTP } from "@neoWeb/services/service-forgot-password";
import { colorScheme } from "@neoWeb/theme/colorScheme";
import { useForm } from "react-hook-form";
import AuthPageWrapper from "../Components/AuthPageWrapper";

const OTP = () => {
  const { mutateAsync: emailVerification } = useVerifyOTP();

  // const schema = yup.object().shape({
  //   otpCode: yup.string().required("Please Enter OTP").min(6).nullable()

  const { control } = useForm();
  const { minutes, formattedSeconds } = useTimer(0.5);
  return (
    <AuthPageWrapper>
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
          Please enter the OTP verification code we sent to Gmail ,
          ab*******123@gmail.com
        </Text>
      </VStack>
      <VStack as={"form"} gap={8} alignItems={"stretch"}>
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

        <Button type="submit" width={"100%"}>
          Confirm
        </Button>
      </VStack>
    </AuthPageWrapper>
  );
};

export default OTP;
