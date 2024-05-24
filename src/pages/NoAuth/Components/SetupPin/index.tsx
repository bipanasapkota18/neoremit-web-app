import { Box, Button, HStack, Text, VStack } from "@chakra-ui/react";
import { svgAssets } from "@neoWeb/assets/images/svgs";
import OTPComponent from "@neoWeb/components/Form/OTP";
import { usesetMPIN } from "@neoWeb/services/service-forgot-password";
import { useState } from "react";
import { useForm } from "react-hook-form";
import AuthPageWrapper from "../AuthPageWrapper";

const defaultValues = {
  mpin: "",
  confirmMpin: ""
};

const SetupPin = () => {
  const { mutateAsync: setMPIN } = usesetMPIN();
  const { control, handleSubmit } = useForm({
    defaultValues
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handlesetMpin = async (data: typeof defaultValues) => {
    if (data.mpin !== data.confirmMpin) {
      setErrorMessage("MPIN and Confirm MPIN do not match");
      return;
    }
    try {
      await setMPIN({
        mPin: data.mpin
      });
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Failed to set MPIN. Please try again.");
      console.error(error);
    }
  };

  return (
    <AuthPageWrapper>
      <VStack alignItems={"flex-start"} gap={1}>
        <Text color={"#2D3748"} fontSize={"29px"} fontWeight={"800"}>
          Setup MPIN
        </Text>
        <Text fontWeight={"400"} fontSize={"17px"} color={"#4A5568"}>
          Establish a Secure Transaction PIN for Remittance Transfers
        </Text>
      </VStack>
      <Box
        borderRadius={"16px"}
        bg={"#EDF2F7"}
        padding={"16px"}
        gap={"8px"}
        width={"404px"}
      >
        <Text fontWeight={"800"} fontSize={"16px"} color={"#2D3748"}>
          Your MPIN must:
        </Text>
        <HStack>
          <svgAssets.ListItemArrow />
          <Text color={"#5A2F8D"} fontSize={"16px"} fontWeight={"400"}>
            Be 4 Digit Number
          </Text>
        </HStack>
        <HStack>
          <svgAssets.ListItemArrow />
          <Text color={"#5A2F8D"} fontSize={"16px"} fontWeight={"400"}>
            Sequential or repetitive
          </Text>
        </HStack>
      </Box>
      <VStack
        as={"form"}
        alignItems={"flex-start"}
        onSubmit={handleSubmit(handlesetMpin)}
      >
        <Text>Enter MPIN</Text>
        <HStack>
          <OTPComponent name="mpin" control={control} />
        </HStack>

        <Text color="red">error message</Text>
        <Text>Confirm MPIN</Text>
        <HStack>
          <OTPComponent name="confirmMpin" control={control} />
        </HStack>
        <Button type="submit" width={"100%"}>
          Confirm
        </Button>
      </VStack>
    </AuthPageWrapper>
  );
};

export default SetupPin;
