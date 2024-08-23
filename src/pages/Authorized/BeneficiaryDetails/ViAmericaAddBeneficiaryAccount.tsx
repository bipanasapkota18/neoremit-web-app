import {
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import CheckBox from "@neoWeb/components/Form/Checkbox";
import TextInput from "@neoWeb/components/Form/TextInput";
import { useAddBeneficiaryCheckoutDetailsDetails } from "@neoWeb/services/service-beneficiary";
import { ISelectOptions } from "@neoWeb/utility/format";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface AddBeneficiaryAccountProps {
  editDetailId: number | null;
  setEditDetailId: Dispatch<SetStateAction<number | null>>;
  isOpen: boolean;
  onClose: () => void;
  payoutMethodId: ISelectOptions<number> | null;
  beneficiaryId: number | null;
  isNewBeneficiary?: boolean;
}
const defaultValues = {
  id: null as never as number,
  payoutPartner: null as ISelectOptions<number> | null,
  accountName: "",
  accountNumber: "",
  primary: false,
  routingNumber: "",
  paymentLocationCode: "",
  accountType: "",
  phone: ""
};
const ViAmericaAddBeneficiaryAccount = ({
  isOpen,
  onClose,
  payoutMethodId,
  setEditDetailId,
  editDetailId,
  isNewBeneficiary,
  beneficiaryId
}: AddBeneficiaryAccountProps) => {
  //   const { data: payoutPartnerData } = usegetPayoutPartnerById(
  //     payoutMethodId?.value ?? null
  //   );

  //   const payout_methodoptions = formatSelectOptions<number>({
  //     data: payoutPartnerData,
  //     labelKey: "name",
  //     valueKey: "id",
  //     icon: {
  //       iconKey: "image",
  //       iconPath: `${baseURL}/document-service/master/payout/partner/image?fileId=`,
  //       iconCode: "image"
  //     }
  //   });
  const { mutateAsync: addBeneficiaryAccount, isPending: isAddPending } =
    useAddBeneficiaryCheckoutDetailsDetails();
  const schema = z.object({
    // payoutPartner: z
    //   .object({
    //     label: z.string(),
    //     value: z.number()
    //   })
    //   .nullable()
    //   .refine(data => !!data?.label && !!data?.value, {
    //     message: "Please select a payout partner"
    //   }),
    accountName: z.string().min(1, "Account Name is required"),
    accountNumber: z.string().min(1, "Account Number is required"),
    routingNumber: z.string().min(1, "Routing Number is required"),
    paymentLocationCode: z.string().min(1, "Payment Location Code is required"),
    accountType: z.string().min(1, "Account Type is required"),
    phone: z
      .string()
      .min(1, "Phone is required")
      .refine(value => {
        const phoneRegex = /^9\d{9}$/;
        return phoneRegex.test(value);
      }, "Phone Number must be 10 digits"),
    primary: z.boolean()
  });
  const { control, handleSubmit, reset } = useForm({
    defaultValues: defaultValues,
    resolver: zodResolver(schema)
  });

  const onAddAccount = async (data: typeof defaultValues) => {
    try {
      const preparedData = {
        ...data,
        accountNumber: data?.accountNumber.trim(),
        accountName: data?.accountName.trim(),
        // payoutPartner: data?.payoutPartner as any,
        payoutMethodId: payoutMethodId?.value ?? null,
        primary: data?.primary
      };
      await addBeneficiaryAccount({
        beneficiaryId: beneficiaryId,
        data: { ...preparedData }
      });
    } catch (error) {
      console.error(error);
    }
  };
  const handleModalClose = () => {
    reset(defaultValues);
    setEditDetailId(null);

    onClose();
  };
  return (
    <Modal
      isOpen={isOpen}
      onClose={handleModalClose}
      closeOnOverlayClick={false}
      size={"2xl"}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Bank Details</ModalHeader>
        {!isNewBeneficiary && <ModalCloseButton mt={2} mr={2} />}
        <form onSubmit={handleSubmit(onAddAccount)}>
          <ModalBody>
            <SimpleGrid columns={2} rowGap={6} columnGap={4}>
              {/* <Select
                name="payoutPartner"
                placeholder="Select Payout Partner"
                control={control}
                options={payout_methodoptions}
              /> */}
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
              <TextInput
                type="text"
                name="routingNumber"
                label="Routing Number"
                control={control}
              />
              <TextInput
                type="text"
                name="paymentLocationCode"
                label="Payment Location Code"
                control={control}
              />
              <TextInput
                type="text"
                name="accountType"
                label="Account Type"
                control={control}
              />
              <TextInput
                type="text"
                name="phone"
                label="Phone"
                control={control}
              />
              <HStack flexDirection={"row"} alignItems={"center"}>
                <CheckBox
                  name="primary"
                  control={control}
                  label="Make primary account?"
                />
              </HStack>
            </SimpleGrid>
            <HStack justifyContent={"flex-end"}>
              <Button
                type="submit"
                mt={4}
                isLoading={isAddPending}
                width={"max-content"}
              >
                {editDetailId ? "Edit" : "Add"} Account
              </Button>
            </HStack>
          </ModalBody>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default ViAmericaAddBeneficiaryAccount;
