import {
  Button,
  GridItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Text
} from "@chakra-ui/react";
import TextInput from "@neoWeb/components/Form/TextInput";
import React from "react";
import { useForm } from "react-hook-form";

interface AddFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddFilterModal: React.FC<AddFilterModalProps> = ({ isOpen, onClose }) => {
  const { control } = useForm();
  const fetchedData = [
    {
      label: "30 Days",
      value: 30
    },
    {
      label: "6 Months",
      value: "6"
    },
    {
      label: "1 year",
      value: "12"
    }
  ];

  const paymentOption = [
    {
      label: "Wallet",
      value: "wallet"
    },
    {
      label: "Bank",
      value: "bank"
    },
    {
      label: "Cash",
      value: "cash"
    }
  ];
  const paymentoptionData = [
    {
      label: "Pending",
      value: "pending"
    },
    {
      label: "Success",
      value: "success"
    },
    {
      label: "Failed",
      value: "failed"
    },
    {
      label: "Verification",
      value: "veriication"
    }
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Filter</ModalHeader>
        <ModalBody justifyContent={"space-between"}>
          <Text fontSize={"16px"} fontWeight={600}>
            Date
          </Text>
          {fetchedData.map((data, index) => (
            <Button key={index}>{data.label}</Button>
          ))}

          <SimpleGrid columns={{ sm: 1 }} gap={"8"}>
            <GridItem colSpan={1}>
              <TextInput
                type="date"
                name="from"
                label="From"
                control={control}
              />
            </GridItem>
            <GridItem>
              <TextInput type="date" name="to" label="To" control={control} />
            </GridItem>
          </SimpleGrid>
        </ModalBody>
        <Text fontSize={"16px"} fontWeight={600} pl={5}>
          Payment Option
        </Text>
        <ModalFooter justifyContent={"space-between"}>
          {paymentOption.map((data, index) => (
            <Button key={index}>{data.label}</Button>
          ))}
        </ModalFooter>
        <Text fontSize={"18px"} pl={5}>
          Types
        </Text>
        <ModalFooter justifyContent={"space-between"}>
          {paymentoptionData.map((data, index) => (
            <Button key={index}>{data.label}</Button>
          ))}
        </ModalFooter>

        <ModalFooter justifyContent={"space-between"}>
          <Button onClick={onClose}>Close</Button>
          <Button>Apply</Button>
        </ModalFooter>
        <ModalCloseButton />
      </ModalContent>
    </Modal>
  );
};

export default AddFilterModal;
