import {
  Button,
  Link as ChakraLink,
  HStack,
  IconButton,
  Stack,
  VStack,
  useBoolean
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import CheckBox from "@neoWeb/components/Form/Checkbox";
import TextInput from "@neoWeb/components/Form/TextInput";
import { NAVIGATION_ROUTES } from "@neoWeb/pages/App/navigationRoutes";
import { useLoginMutation } from "@neoWeb/services/service-auth";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { svgAssets } from "../../../assets/images/svgs/index";

interface LoginPageProps {
  email: string | null;
  password: string;
  remember?: boolean | undefined;
}
const defaultValues = {
  email: "" as null | string,
  password: "",
  remember: false
};

const LoginForm = () => {
  const { mutateAsync: login, isLoading: isLoginLoading } = useLoginMutation();

  const [flag, setFlag] = useBoolean();

  const loginSchema = yup.object().shape({
    password: yup.string().required("Please enter a password"),
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Please enter email")
      .nullable(),
    remember: yup.boolean()
  });
  const { control, handleSubmit, reset } = useForm({
    defaultValues,
    resolver: yupResolver(loginSchema)
  });
  useEffect(() => {
    reset({
      email: localStorage.getItem("email")
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
      await login({
        username: data.email,
        password: data.password
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <VStack
      as="form"
      alignItems={"stretch"}
      justifyContent={"flex-start"}
      gap={8}
      onSubmit={handleSubmit(handleLogin)}
    >
      <Stack gap={"16px"} width={"100%"}>
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
            to={NAVIGATION_ROUTES.HOME}
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
  );
};

export default LoginForm;
