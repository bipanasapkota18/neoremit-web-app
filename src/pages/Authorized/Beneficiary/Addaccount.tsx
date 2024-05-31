import {
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay
} from "@chakra-ui/react";
import CheckBox from "@neoWeb/components/Form/Checkbox";
import Select from "@neoWeb/components/Form/SelectComponent";
import TextInput from "@neoWeb/components/Form/TextInput";
import { baseURL } from "@neoWeb/services/service-axios";
import { usegetPayoutPartnerById } from "@neoWeb/services/service-payout-partner";
import { ISelectOptions, formatSelectOptions } from "@neoWeb/utility/format";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { IArrayValues } from "./AddBeneficiary";

interface AddAccountProps {
  tableData: IArrayValues[];
  setTableData: Dispatch<SetStateAction<IArrayValues[]>>;
  editDetailId: number | null;
  data: any;
  setEditDetailId: Dispatch<SetStateAction<number | null>>;
  isOpen: boolean;
  onClose: () => void;
  payoutMethodId: number;
}

const defaultValues = {
  id: null as never as number,
  // payoutMethodId: null as never as number,
  payoutPartnerId: null as ISelectOptions<number> | null,
  accountName: "",
  accountNumber: "",
  primary: false
};
const AddAccount = ({
  isOpen,
  onClose,
  payoutMethodId,
  // tableData,
  setTableData
  // data,
  // setEditDetailId,
  // editDetailId
}: AddAccountProps) => {
  const { control, handleSubmit } = useForm({
    defaultValues
  });
  const { data: payoutPartnerData } = usegetPayoutPartnerById(payoutMethodId);
  const payout_methodoptions = formatSelectOptions<number>({
    data: payoutPartnerData,
    labelKey: "name",
    valueKey: "id",
    icon: {
      iconKey: "image",
      iconPath: `${baseURL}/document-service/master/payout/partner/image?fileId=`,
      iconCode: "image"
    }
  });

  const onAddAccount = async (data: typeof defaultValues) => {
    try {
      const preparedData = {
        ...data,
        accountNumber: data?.accountNumber.trim(),
        accountName: data?.accountName.trim(),
        payoutPartnerId: data?.payoutPartnerId?.value,
        payoutMethodId: payoutMethodId
      };
      setTableData(oldValues => [
        ...oldValues,
        {
          addId: oldValues.length + 1,
          ...preparedData,
          payoutPartnerName: data?.payoutPartnerId?.label ?? "",
          payoutPartnerId: preparedData?.payoutPartnerId ?? null
        }
      ]);

      console.log(preparedData);
    } catch (error) {
      console.log(error);
    }
    // onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Bank Details</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(onAddAccount)}>
          <ModalBody display={"flex"} gap={6} flexDirection={"column"}>
            <Select
              name="payoutPartnerId"
              placeholder="Select Payout Partner"
              control={control}
              options={payout_methodoptions}
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
              <CheckBox
                name="primary"
                control={control}
                label="Make primary account?"
              />
            </HStack>
            <Button type="submit" mt={4} width={"100%"}>
              Add Account
            </Button>
          </ModalBody>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default AddAccount;
