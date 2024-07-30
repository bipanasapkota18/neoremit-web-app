import {
  Box,
  Button,
  Link as ChakraLink,
  Flex,
  GridItem,
  HStack,
  SimpleGrid,
  Text,
  VStack
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { svgAssets } from "@neoWeb/assets/images/svgs";
import Select from "@neoWeb/components/Form/SelectComponent";
import TextInput from "@neoWeb/components/Form/TextInput";
import { NAVIGATION_ROUTES } from "@neoWeb/pages/App/navigationRoutes";
import { baseURL } from "@neoWeb/services/service-axios";
import { useGetCountryList } from "@neoWeb/services/service-common";
import { useSignUpMutation } from "@neoWeb/services/service-register";
import { useStore } from "@neoWeb/store/store";
import { colorScheme } from "@neoWeb/theme/colorScheme";
import { ISelectOptions, formatSelectOptions } from "@neoWeb/utility/format";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";

const defaultValues = {
  firstName: "",
  middleName: "",
  lastName: "",
  email: "",
  sendFrom: null as ISelectOptions<number> | null,
  receiveIn: null as ISelectOptions<number> | null,
  phoneNumber: ""
};
export interface AuthPageProps {
  type?: string;
  setScreen: (value: string) => void;
}

const RegisterForm = ({ setScreen }: AuthPageProps) => {
  const { setEmail } = useStore();

  const signUpSchema = z.object({
    firstName: z.string().min(1, { message: "First name is required" }),
    middleName: z.string(),
    lastName: z.string().min(1, { message: "Last name is required" }),
    email: z
      .string()
      .email({ message: "Invalid email format" })
      .min(1, { message: "Please enter your email address" }),
    phoneNumber: z
      .string()
      .min(10, { message: "Phone number must be 10 digits" })
      .max(10, { message: "Phone number cannot exceed 10 digits" })
      .min(1, { message: "Phone number is required" }),
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
    data: countriesList,
    labelKey: "name",
    valueKey: "id",
    icon: {
      iconKey: "flagIcon",
      iconPath: `${baseURL}/document-service/master/flag-icon?fileId=`,
      iconCode: "shortName"
    }
  });
  const handleSignup = async (data: typeof defaultValues) => {
    try {
      const signupResponse = await signUp({
        ...data,
        receiveIn: data?.receiveIn?.value ?? null,
        sendFrom: data?.sendFrom?.value ?? null
      });
      if (signupResponse?.data?.responseStatus === "SUCCESS") {
        setEmail(data?.email);
        setScreen("otp");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Flex gap={8} flexDir={"column"}>
      <VStack alignItems="flex-start" gap={"4px"}>
        <HStack gap={"12px"}>
          <Text
            textStyle={"registerPageHeader"}
            fontSize={"29px"}
            fontFamily={"Mulish"}
            fontWeight={"800"}
          >
            Sign Up
          </Text>
        </HStack>
        <Text textStyle={"normalStyle"}>
          A 6 code verification OTP code will be sent to your Email account.
        </Text>
      </VStack>
      <VStack
        as="form"
        alignItems={"stretch"}
        justifyContent={"flex-start"}
        gap={8}
        onSubmit={handleSubmit(handleSignup)}
      >
        <SimpleGrid columns={2} rowGap={6} columnGap={2}>
          <GridItem colSpan={2}>
            <TextInput
              startIcon={<svgAssets.ProfileIcon />}
              type="text"
              name="firstName"
              placeholder="First Name"
              control={control}
            />
          </GridItem>
          <GridItem>
            <TextInput
              startIcon={<svgAssets.ProfileIcon />}
              type="text"
              name="middleName"
              placeholder="Middle Name"
              control={control}
            />
          </GridItem>
          <GridItem>
            <TextInput
              startIcon={<svgAssets.ProfileIcon />}
              type="text"
              name="lastName"
              placeholder="Last Name"
              control={control}
            />
          </GridItem>
          <GridItem colSpan={2}>
            <TextInput
              startIcon={<svgAssets.EmailIcon />}
              type="email"
              name="email"
              placeholder="Email"
              control={control}
            />
          </GridItem>

          <GridItem colSpan={1}>
            <Select
              noFloating
              name="sendFrom"
              placeholder="Send From"
              control={control}
              options={countryOptions}
            />
          </GridItem>

          <GridItem colSpan={1}>
            <Select
              noFloating
              name="receiveIn"
              placeholder="Receive In"
              control={control}
              options={countryOptions}
            />
          </GridItem>
          <GridItem colSpan={2}>
            <TextInput
              startIcon={<svgAssets.CallIcon />}
              type="number"
              name="phoneNumber"
              placeholder="Phone Number"
              control={control}
            />
          </GridItem>
        </SimpleGrid>
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
          <ChakraLink
            as={Link}
            to={NAVIGATION_ROUTES.LOGIN}
            fontWeight={500}
            color={colorScheme.primary_500}
          >
            Sign In
          </ChakraLink>
        </Text>
      </Box>
    </Flex>
  );
};

export default RegisterForm;
