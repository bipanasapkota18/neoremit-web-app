import {
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import ConfirmationModal from "@neoWeb/components/ConfirmationModal";
import CheckBox from "@neoWeb/components/Form/Checkbox";
import Select from "@neoWeb/components/Form/SelectComponent";
import TextInput from "@neoWeb/components/Form/TextInput";
import { baseURL } from "@neoWeb/services/service-axios";
import {
  BeneficiaryCheckoutDetailRequest,
  useDeleteBeneficiaryDetails
} from "@neoWeb/services/service-beneficiary";
import { usegetPayoutPartnerById } from "@neoWeb/services/service-payout-partner";
import { ISelectOptions, formatSelectOptions } from "@neoWeb/utility/format";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { IBeneficiaryAccountEditId } from "./AddBeneficiary";

interface AddBeneficiaryAccountProps {
  tableData: BeneficiaryCheckoutDetailRequest[];
  accountData: BeneficiaryCheckoutDetailRequest[];
  setTableData: Dispatch<SetStateAction<BeneficiaryCheckoutDetailRequest[]>>;
  setAccountData: Dispatch<SetStateAction<BeneficiaryCheckoutDetailRequest[]>>;
  editDetailId: IBeneficiaryAccountEditId;
  setEditDetailId: Dispatch<SetStateAction<IBeneficiaryAccountEditId>>;
  isOpen: boolean;
  onClose: () => void;
  payoutMethodId: ISelectOptions<number> | null;
}

const defaultValues = {
  id: null as never as number,
  payoutPartner: null as ISelectOptions<number> | null,
  accountName: "",
  accountNumber: "",
  isPrimary: false
};
const AddBeneficiaryAccount = ({
  accountData,
  isOpen,
  onClose,
  payoutMethodId,
  setTableData,
  tableData,
  setEditDetailId,
  editDetailId,
  setAccountData
}: AddBeneficiaryAccountProps) => {
  const {
    isOpen: isOpenDeleteModal,
    onOpen: onOpenDeleteModal,
    onClose: onCloseDeleteModal
  } = useDisclosure();

  const schema = z.object({
    payoutPartner: z
      .object({
        label: z.string(),
        value: z.number()
      })
      .nullable()
      .refine(data => !!data?.label && !!data?.value, {
        message: "Please select a payout partner"
      }),
    accountName: z.string().nonempty("Account Name is required"),
    accountNumber: z.string().nonempty("Account Number is required"),
    isPrimary: z.boolean()
  });
  const selectedAccountDetail = tableData?.find(
    (item: any) =>
      item.id === editDetailId?.id || item.addId === editDetailId?.id
  );
  const { mutateAsync: deleteBeneficiaryDetails, isPending: isDeleteLoading } =
    useDeleteBeneficiaryDetails();
  const { control, handleSubmit, reset } = useForm({
    defaultValues: defaultValues,
    resolver: zodResolver(schema)
  });
  useEffect(() => {
    if (editDetailId?.id) {
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
  }, [editDetailId?.id, tableData, reset]);

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
        id: editDetailId?.type == "backend" ? editDetailId?.id : null,
        accountNumber: data?.accountNumber.trim(),
        accountName: data?.accountName.trim(),
        payoutPartner: data?.payoutPartner as any,
        payoutMethod: payoutMethodId,
        isPrimary: data?.isPrimary
      };
      if (editDetailId?.id) {
        if (editDetailId?.type == "local") {
          // For initial data adding in local state where we check if the item is already added using the local addId
          setAccountData(oldValues => {
            return oldValues?.find(item => item?.addId == editDetailId?.id)
              ? oldValues?.map(item => {
                  if (item?.addId == editDetailId?.id) {
                    return { ...item, ...preparedData };
                  } else {
                    return item;
                  }
                })
              : [...oldValues, preparedData];
          });
          setTableData(oldValues => {
            return oldValues?.find(item => item?.addId == editDetailId?.id)
              ? oldValues?.map(item => {
                  if (item?.addId == editDetailId?.id) {
                    return { ...item, ...preparedData };
                  } else {
                    return item;
                  }
                })
              : [...oldValues, preparedData];
          });
        } else if (editDetailId?.type == "backend") {
          // For editing the existing data from backend
          setAccountData(oldValues => {
            return oldValues?.find(item => item?.id == editDetailId?.id)
              ? oldValues?.map(item => {
                  if (item?.id == editDetailId?.id) {
                    return { ...item, ...preparedData };
                  } else {
                    return item;
                  }
                })
              : [...oldValues, preparedData];
          });
          setTableData(oldValues => {
            return oldValues?.find(item => item?.id == editDetailId?.id)
              ? oldValues?.map(item => {
                  if (item?.id == editDetailId?.id) {
                    return { ...item, ...preparedData };
                  } else {
                    return item;
                  }
                })
              : [...oldValues, preparedData];
          });
        }
      } else {
        setAccountData(oldValues => [
          ...oldValues,
          { addId: tableData?.length + 1, ...preparedData }
        ]);
        setTableData(oldValues => [
          ...oldValues,
          { addId: tableData?.length + 1, ...preparedData }
        ]);
      }
    } catch (error) {
      console.error(error);
    }
    handleModalClose();
  };
  const handleDelete = async () => {
    if (editDetailId?.type == "local") {
      setAccountData(
        accountData.filter(item => item.addId !== editDetailId?.id)
      );
      setTableData(tableData.filter(item => item.addId !== editDetailId?.id));
    } else if (editDetailId?.type == "backend") {
      await deleteBeneficiaryDetails(editDetailId?.id);
    }

    handleModalClose();
  };

  const handleModalClose = () => {
    onCloseDeleteModal();
    reset(defaultValues);
    setEditDetailId({ id: null, type: "local" });

    onClose();
  };
  return (
    <>
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
                {editDetailId?.id && (
                  <Button
                    variant={"light"}
                    type="button"
                    onClick={() => onOpenDeleteModal()}
                    mt={4}
                    width={"100%"}
                  >
                    Delete
                  </Button>
                )}
                <Button type="submit" mt={4} width={"100%"}>
                  {editDetailId?.id ? "Edit" : "Add"} Account
                </Button>
              </HStack>
            </ModalBody>
          </form>
        </ModalContent>
      </Modal>
      <ConfirmationModal
        variant={"delete"}
        buttonText={"Delete"}
        title={"Are You Sure?"}
        isLoading={isDeleteLoading}
        onApprove={handleDelete}
        message="Deleting will permanently remove this data from the system. This cannot be Undone."
        isOpen={isOpenDeleteModal}
        onClose={onCloseDeleteModal}
      />
    </>
  );
};

export default AddBeneficiaryAccount;
