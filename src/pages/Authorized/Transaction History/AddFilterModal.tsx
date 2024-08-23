import {
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text
} from "@chakra-ui/react";
import TextInput from "@neoWeb/components/Form/TextInput";
import { NAVIGATION_ROUTES } from "@neoWeb/pages/App/navigationRoutes";
import { colorScheme } from "@neoWeb/theme/colorScheme";
import React, { MouseEvent, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface AddFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const defaultValues = {
  fromDate: "",
  toDate: "",
  paymentMethod: "",
  type: "",
  date: ""
};

const AddFilterModal: React.FC<AddFilterModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { control } = useForm({
    defaultValues: defaultValues
  });

  const [paymentOptionValue, setPaymentOptionValue] = useState<string>("");
  const [month, setMonth] = useState<string>("1");
  const [typeValue, setTypeValue] = useState<string>("");
  const fetchedData = [
    {
      label: "30 Days",
      value: "1"
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
      label: "Verification Failed",
      value: "veriicationFailed"
    }
  ];

  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [scrollLeft, setScrollLeft] = useState<number>(0);
  const hStackRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartX(e.pageX - (hStackRef.current?.offsetLeft || 0));
    setScrollLeft(hStackRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !hStackRef.current) return;
    const x = e.pageX - (hStackRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2; // Adjust the scroll speed multiplier as needed
    hStackRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent borderRadius={"16px"} padding={"0 0 32px 0"}>
        <ModalHeader>Filter</ModalHeader>
        <ModalBody display={"flex"} flexDirection={"column"} gap={4}>
          <Stack gap={2}>
            <Text fontSize={"14px"} fontWeight={600}>
              Date
            </Text>
            <HStack>
              {fetchedData.map((data, index) => (
                <Button
                  variant={"transaction_filter_buttons"}
                  key={index}
                  isActive={month === data.value}
                  onClick={() => {
                    setMonth(data.value);
                  }}
                >
                  {data.label}
                </Button>
              ))}
            </HStack>
          </Stack>
          <Stack gap={"8"}>
            <TextInput
              type="date"
              name="fromDate"
              label="From"
              control={control}
            />

            <TextInput type="date" name="toDate" label="To" control={control} />
          </Stack>
          <Stack>
            <Text fontSize={"14px"} fontWeight={600}>
              Channel
            </Text>
            <HStack>
              {paymentOption.map((data, index) => (
                <Button
                  variant={"transaction_filter_buttons"}
                  key={index}
                  isActive={paymentOptionValue === data.value}
                  onClick={() => {
                    setPaymentOptionValue(data.value);
                  }}
                >
                  {data.label}
                </Button>
              ))}
            </HStack>
          </Stack>
          <Stack>
            <Text fontSize={"14px"}>Types</Text>
            <HStack
              ref={hStackRef}
              cursor={"grab"}
              sx={{
                overflowX: "auto",
                "&::-webkit-scrollbar": {
                  height: "4px"
                },
                "&::-webkit-scrollbar-thumb": {
                  background: "gray.300",
                  borderRadius: "full"
                }
              }}
              py={1}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              gap={4}
            >
              {paymentoptionData.map((data, index) => (
                <Button
                  variant={"transaction_filter_buttons"}
                  minW={"max-content"}
                  key={index}
                  isActive={typeValue === data.value}
                  onClick={() => {
                    setTypeValue(data.value);
                  }}
                >
                  {data.label}
                </Button>
              ))}
            </HStack>
          </Stack>
          <HStack justifyContent={"space-between"}>
            <Button
              padding={"12px 24px"}
              background={"white"}
              color={colorScheme.primary_500}
              border={`1px solid ${colorScheme.primary_500}`}
              onClick={() => {
                navigate(
                  `${NAVIGATION_ROUTES.SEND_MONEY}?page=accountDetails&status=error`
                );
                // onClose();
                // reset();
              }}
              _hover={{
                background: "white"
              }}
              _focus={{
                background: "white"
              }}
              flex={1}
            >
              Reset
            </Button>
            <Button
              flex={1}
              padding={"12px 24px"}
              onClick={() =>
                navigate(
                  `${NAVIGATION_ROUTES.SEND_MONEY}?page=accountDetails&status=success`
                )
              }
            >
              Apply
            </Button>
          </HStack>
        </ModalBody>
        <ModalCloseButton />
      </ModalContent>
    </Modal>
  );
};

export default AddFilterModal;
