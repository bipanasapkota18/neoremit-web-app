import {
  Box,
  Button,
  Flex,
  GridItem,
  HStack,
  SimpleGrid,
  Stack,
  Text,
  VStack
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { svgAssets } from "@neoWeb/assets/images/svgs";
import Select from "@neoWeb/components/Form/SelectComponent";
import TextInput from "@neoWeb/components/Form/TextInput";
import { baseURL } from "@neoWeb/services/service-axios";
import { useGetCountryList } from "@neoWeb/services/service-common";
import { useSignUpMutation } from "@neoWeb/services/service-register";
import { colorScheme } from "@neoWeb/theme/colorScheme";
import { ISelectOptions, formatSelectOptions } from "@neoWeb/utility/format";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const defaultValues = {
  fullName: "",
  email: "",
  sendFrom: null as ISelectOptions<number> | null,
  receiveIn: null as ISelectOptions<number> | null,
  phoneNumber: "",
  referralCode: ""
};

const RegisterForm = () => {
  const navigate = useNavigate();

  const signUpSchema = z.object({
    fullName: z.string().min(1, { message: "Full name is required" }),
    email: z
      .string()
      .email({ message: "Invalid email format" })
      .min(1, { message: "Please enter your email address" }),
    phoneNumber: z
      .string()
      .min(10, { message: "Phone number must be at least 10 digits" })
      .max(10, { message: "Phone number cannot exceed 10 digits" })
      .min(1, { message: "Phone number is required" }),
    referralCode: z.string().min(1, { message: "Please Enter  ReferralCode" }),
    sendFrom: z
      .object({
        label: z.string().min(1),
        value: z.number().min(0)
      })
      .nullable()
      .refine(data => !!data?.label && !!data?.value, {
        message: "Please enter send from"
      }),
    receiveIn: z
      .object({
        label: z.string().min(1),
        value: z.number().min(0)
      })
      .nullable()
      .refine(data => !!data?.label && !!data?.value, {
        message: "Please enter  Recieve In"
      })
  });
  const { mutateAsync: signUp, isPending: isSignUpLoading } =
    useSignUpMutation();
  const { data: countriesList } = useGetCountryList();
  const { control, handleSubmit } = useForm({
    defaultValues,
    resolver: zodResolver(signUpSchema)
  });

  const countryOptions = formatSelectOptions<number>({
    data: countriesList?.data?.data,
    labelKey: "name",
    valueKey: "id",
    icon: {
      iconKey: "flagIcon",
      iconPath: `${baseURL}/document-service/master/flag-icon?fileId=`
    }
  });
  const handleSignup = async (data: typeof defaultValues) => {
    try {
      await signUp({
        ...data,
        receiveIn: data?.receiveIn?.value ?? null,
        sendFrom: data?.sendFrom?.value ?? null
      });
      navigate("/OTP");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Flex gap={8} flexDir={"column"}>
      <VStack
        as="form"
        alignItems={"stretch"}
        justifyContent={"flex-start"}
        gap={8}
        onSubmit={handleSubmit(handleSignup)}
      >
        <Stack gap={6} width={"100%"}>
          <HStack>
            <TextInput
              startIcon={<svgAssets.ProfileIcon />}
              type="text"
              name="fullName"
              placeholder="Full Name"
              control={control}
            />
          </HStack>
          <HStack>
            <TextInput
              startIcon={<svgAssets.EmailIcon />}
              type="email"
              name="email"
              placeholder="Email"
              control={control}
            />
          </HStack>

          <SimpleGrid columns={2} gap={"20px"}>
            <GridItem colSpan={1}>
              <Select
                name="sendFrom"
                placeholder="Send From"
                control={control}
                options={countryOptions}
              />
            </GridItem>

            <GridItem colSpan={1}>
              <Select
                name="receiveIn"
                placeholder="Receive In"
                control={control}
                options={countryOptions}
              />
            </GridItem>
            <GridItem colSpan={1}>
              <TextInput
                startIcon={<svgAssets.CallIcon />}
                type="number"
                name="phoneNumber"
                placeholder="Phone Number"
                control={control}
              />
            </GridItem>
            <GridItem>
              <TextInput
                startIcon={<svgAssets.SecurityIcon />}
                type="text"
                name="referralCode"
                placeholder="Referral Code"
                control={control}
              />
            </GridItem>
          </SimpleGrid>
        </Stack>
        <Button isDisabled={isSignUpLoading} type="submit" size="lg">
          Proceed
        </Button>
      </VStack>
      <Box border={"1px solid #CBD5E0"} position={"relative"}>
        <Text
          position={"absolute"}
          textAlign={"center"}
          top={-2.5}
          left={"182px"}
          backgroundColor={colorScheme.white}
          color={colorScheme.search_icon}
          p={"0 18px"}
        >
          Or
        </Text>
      </Box>
      <Flex direction={"column"} gap={4}>
        <Button variant="social_login" leftIcon={<svgAssets.GoogleIcon />}>
          Login with Google
        </Button>
        <Button variant="social_login" leftIcon={<svgAssets.AppleIcon />}>
          Login with Apple ID
        </Button>
      </Flex>
      <Box display={"flex"} justifyContent={"center"}>
        <Text textStyle={"normalStyle"} fontSize={"14px"}>
          Already have an account?{" "}
          <Text as={"span"} fontWeight={500} lineHeight={4} cursor={"pointer"}>
            <u>Sign in</u>
          </Text>
        </Text>
      </Box>
    </Flex>
  );
};

export default RegisterForm;