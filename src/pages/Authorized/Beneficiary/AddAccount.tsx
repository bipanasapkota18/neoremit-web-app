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
import {
  BeneficiaryCheckoutDetailRequest,
  useDeleteBeneficiaryDetails,
  useSaveBeneficiaryDetails,
  useUpdateBeneficiaryDetails
} from "@neoWeb/services/service-beneficiary";
import { usegetPayoutPartnerById } from "@neoWeb/services/service-payout-partner";
import { ISelectOptions, formatSelectOptions } from "@neoWeb/utility/format";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useForm } from "react-hook-form";

interface AddAccountProps {
  data: BeneficiaryCheckoutDetailRequest[];
  setTableData: Dispatch<SetStateAction<BeneficiaryCheckoutDetailRequest[]>>;
  editDetailId: number | null;
  setEditDetailId: Dispatch<SetStateAction<number | null>>;
  isOpen: boolean;
  onClose: () => void;
  payoutMethodId: {
    value?: number;
    id: number;
    name: string;
  };
  beneficiaryId: number | null;
}

const defaultValues = {
  id: null as never as number,
  // payoutMethodId: null as never as number,
  payoutPartner: null as ISelectOptions<number> | null,
  accountName: "",
  accountNumber: "",
  isPrimary: false
};
const AddAccount = ({
  isOpen,
  onClose,
  payoutMethodId,
  // tableData,
  setTableData,
  data: editData,
  setEditDetailId,
  editDetailId,
  beneficiaryId
}: AddAccountProps) => {
  const selectedAccountDetail = editData?.find(
    (item: any) => item.id === editDetailId || item.addId === editDetailId
  );
  const { mutateAsync: addBeneficiaryDetails } = useSaveBeneficiaryDetails();
  const { mutateAsync: updateBeneficiaryDetails } =
    useUpdateBeneficiaryDetails();
  const { control, handleSubmit, reset } = useForm({
    defaultValues
  });
  const { mutateAsync } = useDeleteBeneficiaryDetails();
  useEffect(() => {
    if (editDetailId) {
      reset({
        payoutPartner: {
          label:
            selectedAccountDetail?.payoutPartner?.name ??
            selectedAccountDetail?.payoutPartner?.label,
          value: selectedAccountDetail?.payoutPartner?.id
        },
        accountName: selectedAccountDetail?.accountName,
        accountNumber: selectedAccountDetail?.accountNumber,
        isPrimary: selectedAccountDetail?.isPrimary
      });
    }
  }, [editDetailId, editData, reset]);

  const { data: payoutPartnerData } = usegetPayoutPartnerById(
    payoutMethodId?.value ?? null
  );

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
        payoutPartner: data?.payoutPartner as any,
        payoutMethod: payoutMethodId,
        isPrimary: data?.isPrimary
      };
      if (editDetailId) {
        if (selectedAccountDetail?.addId) {
          setTableData(oldValues =>
            oldValues.map(item =>
              item.addId === editDetailId
                ? {
                    ...item,
                    accountNumber: data?.accountNumber.trim(),
                    accountName: data?.accountName.trim(),
                    payoutPartner: data?.payoutPartner as any,
                    payoutMethod: payoutMethodId,
                    isPrimary: data?.isPrimary
                  }
                : item
            )
          );
        } else {
          await updateBeneficiaryDetails({
            id: beneficiaryId,
            data: {
              accountNumber: data?.accountNumber.trim(),
              accountName: data?.accountName.trim(),
              isPrimary: data?.isPrimary,
              payoutMethodId: payoutMethodId?.value,
              payoutPartnerId: data?.payoutPartner?.value,
              id: editDetailId
            }
          });
        }
      } else {
        if (editData) {
          await addBeneficiaryDetails({
            id: beneficiaryId,
            data: {
              accountNumber: data?.accountNumber.trim(),
              accountName: data?.accountName.trim(),
              isPrimary: data?.isPrimary,
              payoutMethodId: payoutMethodId?.value,
              payoutPartnerId: data?.payoutPartner?.value
            }
          });
        } else {
          setTableData(oldValues => [
            ...oldValues,
            {
              ...preparedData,
              addId: oldValues.length + 1
            }
          ]);
        }
      }
    } catch (error) {
      console.error(error);
    }
    handleModalClose();
  };

  const handleDelete = async () => {
    if (editDetailId) {
      await mutateAsync(editDetailId);
    } else {
      const filteredData = editData.filter(
        item => item.id !== editDetailId || item.addId !== editDetailId
      );
      setTableData(filteredData);
    }
    handleModalClose();
  };

  const handleModalClose = () => {
    reset(defaultValues);
    setEditDetailId(null);
    onClose();
  };
  return (
    <Modal isOpen={isOpen} onClose={handleModalClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Bank Details</ModalHeader>
        <ModalCloseButton mt={2} mr={2} />
        <form onSubmit={handleSubmit(onAddAccount)}>
          <ModalBody display={"flex"} gap={6} flexDirection={"column"}>
            <Select
              name="payoutPartner"
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
                name="isPrimary"
                control={control}
                label="Make primary account?"
              />
            </HStack>
            <HStack justifyContent={"space-between"}>
              {editDetailId && (
                <Button
                  variant={"light"}
                  type="button"
                  onClick={handleDelete}
                  mt={4}
                  width={"100%"}
                >
                  Delete
                </Button>
              )}
              <Button type="submit" mt={4} width={"100%"}>
                {editDetailId ? "Edit" : "Add"} Account
              </Button>
            </HStack>
          </ModalBody>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default AddAccount;
