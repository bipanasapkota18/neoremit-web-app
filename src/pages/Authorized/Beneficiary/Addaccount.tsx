import {
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text
} from "@chakra-ui/react";
import CustomRadioGroup from "@neoWeb/components/Form/Radio/RadioGroup";
import Select from "@neoWeb/components/Form/SelectComponent";
import TextInput from "@neoWeb/components/Form/TextInput";
import { useForm } from "react-hook-form";

interface AddAccountProps {
  isOpen: boolean;
  onClose: () => void;
}

const defaultValues = {
  id: "",
  payoutMethodId: "",
  countryId: "",
  name: "",
  code: "",
  image: "",
  isActive: ""
};
const radioOptions = [{ value: "", label: "" }];
const AddAccount = ({ isOpen, onClose }: AddAccountProps) => {
  const { control } = useForm({
    defaultValues
  });

  // const { data: selectedPartner } = usegetPayoutPartnerById(1);

  // const onAddAccount = async (data: typeof defaultValues) => {
  //   try {
  //     await selectedPartner;
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   onClose();
  // };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent padding={6} borderRadius={"32px"} gap={2}>
        <ModalHeader>Bank Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody
          display={"flex"}
          gap={6}
          alignItems={"center"}
          flexDirection={"column"}
        >
          {/* <form onSubmit={handleSubmit}> */}
          <Select
            name="bankName"
            placeholder="Select Bank"
            control={control}
            // options={bankOptions}
          />
          <TextInput
            type="text"
            name="accountName"
            label="Account Name"
            control={control}
          />
          <TextInput
            type="text"
            name="accountNumber"
            label="Account Number"
            control={control}
          />
          <HStack flexDirection={"row"} alignItems={"flex-start"}>
            <HStack pl={"10px"}>
              <CustomRadioGroup
                name="makePrimary"
                control={control}
                options={radioOptions}
              />
            </HStack>
            <Text fontSize={"14px"} fontWeight={"500"} color={"#718096"}>
              Make this account primary
            </Text>
          </HStack>
          <Button mt={4} width={"100%"}>
            Add Account
          </Button>
          {/* </form> */}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddAccount;
