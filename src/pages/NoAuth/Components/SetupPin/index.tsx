import {
  Box,
  Button,
  HStack,
  Text,
  VStack,
  useDisclosure
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { svgAssets } from "@neoWeb/assets/images/svgs";
import OTPComponent from "@neoWeb/components/Form/OTP";
import { usesetMPIN } from "@neoWeb/services/service-forgot-password";
import { useTokenStore } from "@neoWeb/store/store";
import { useForm } from "react-hook-form";
import { z } from "zod";
import MpinSetSuccessModal from "./MpinSetSuccessModal";
const defaultValues = {
  mpin: "",
  confirmMpin: ""
};

const SetupPin = () => {
  const {
    onOpen: onOpenMpinSetSuccessfulModal,
    onClose: onCloseMpinSetSuccessfulModal,
    isOpen: isMpinSetSuccessfulModalOpen
  } = useDisclosure();
  const { token } = useTokenStore();
  const schema = z.object({
    mpin: z.string().min(4, "MPIN must be 4 digit number"),
    confirmMpin: z.string().min(4, "MPIN must be 4 digit number")
  });
  const { mutateAsync: setMPIN } = usesetMPIN();
  const { control, handleSubmit } = useForm({
    defaultValues,
    resolver: zodResolver(schema)
  });

  const handlesetMpin = async (data: typeof defaultValues) => {
    try {
      const mpinResponse = await setMPIN({
        data: {
          mPin: data.mpin
        },
        token: token
      });
      if (mpinResponse?.data?.responseStatus == "SUCCESS") {
        onOpenMpinSetSuccessfulModal();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
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
        gap={4}
        onSubmit={handleSubmit(handlesetMpin)}
      >
        <Text>Enter MPIN</Text>
        <HStack>
          <OTPComponent name="mpin" page="mpin" control={control} />
        </HStack>

        <Text>Confirm MPIN</Text>
        <HStack>
          <OTPComponent name="confirmMpin" control={control} page="mpin" />
        </HStack>
        <Button type="submit" width={"100%"}>
          Confirm
        </Button>
      </VStack>
      <MpinSetSuccessModal
        isOpen={isMpinSetSuccessfulModalOpen}
        onClose={onCloseMpinSetSuccessfulModal}
      />
    </>
  );
};

export default SetupPin;
