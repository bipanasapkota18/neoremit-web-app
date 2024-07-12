import {
  Box,
  Button,
  Link as ChakraLink,
  Flex,
  HStack,
  IconButton,
  Stack,
  Text,
  VStack,
  useBoolean
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import CheckBox from "@neoWeb/components/Form/Checkbox";
import TextInput from "@neoWeb/components/Form/TextInput";
import { NAVIGATION_ROUTES } from "@neoWeb/pages/App/navigationRoutes";
import { useLoginMutation } from "@neoWeb/services/service-auth";
import { colorScheme } from "@neoWeb/theme/colorScheme";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";
import { svgAssets } from "../../../assets/images/svgs/index";

interface LoginPageProps {
  email: string | null;
  password: string;
  remember?: boolean | undefined;
}
const defaultValues = {
  email: "",
  password: "",
  remember: false
};

const LoginForm = () => {
  const { mutateAsync: login, isPending: isLoginLoading } = useLoginMutation();

  const [flag, setFlag] = useBoolean();

  const loginSchema = z.object({
    password: z.string().min(1, { message: "Password is required" }),
    email: z
      .string()
      .email({ message: "Invalid email format" })
      .min(1, { message: "Please enter your email address" }),
    remember: z.boolean().optional()
  });

  const { control, handleSubmit, reset } = useForm({
    defaultValues,
    resolver: zodResolver(loginSchema)
  });
  useEffect(() => {
    reset({
      email: localStorage.getItem("email") ?? "",
      remember: !!localStorage.getItem("email")
    });
  }, []);

  const handleLogin = async (data: LoginPageProps) => {
    if (data?.remember === true) {
      localStorage.setItem("email", data?.email + "");
    }
    if (data?.remember === false) {
      localStorage.removeItem("email");
    }
    try {
      const loginResponse = await login({
        username: data.email,
        password: data.password
      });
      if (loginResponse?.status === 200) {
        localStorage.setItem(
          "userID",
          loginResponse?.data?.data?.userDetails?.id + ""
        );
      }
      reset(defaultValues);
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
        onSubmit={handleSubmit(handleLogin)}
      >
        <Stack gap={6} width={"100%"}>
          <HStack>
            <TextInput
              startIcon={<svgAssets.EmailIcon />}
              type="text"
              name="email"
              placeholder="Email"
              control={control}
            />
          </HStack>
          <HStack mt={2}>
            <TextInput
              startIcon={<svgAssets.PasswordIcon />}
              type={flag ? "text" : "password"}
              name="password"
              placeholder="Password"
              control={control}
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
          </HStack>
          <HStack justifyContent={"space-between"}>
            <CheckBox name="remember" label="Remember me" control={control} />
            <ChakraLink
              as={Link}
              to={NAVIGATION_ROUTES.FORGOT_PASSWORD}
              whiteSpace={"nowrap"}
              fontWeight={"500"}
              color="primary.500"
            >
              Forgot Password ?
            </ChakraLink>
          </HStack>
        </Stack>
        <Button isDisabled={isLoginLoading} type="submit" size="lg">
          Login
        </Button>
      </VStack>
      <Box border={"1px solid #CBD5E0"} position={"relative"}>
        <Text
          position={"absolute"}
          top={-2.5}
          textAlign={"center"}
          left={"182px"}
          backgroundColor={colorScheme.white}
          color={colorScheme.search_icon}
          p={"0 18px"}
        >
          OR
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
          {"Don't have an account ?"}{" "}
          <ChakraLink
            as={Link}
            to={NAVIGATION_ROUTES.REGISTER}
            fontWeight={500}
            color={colorScheme.primary_500}
          >
            Register
          </ChakraLink>
        </Text>
      </Box>
    </Flex>
  );
};

export default LoginForm;
