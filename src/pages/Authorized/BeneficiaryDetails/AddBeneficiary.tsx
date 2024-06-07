import {
  Button,
  Card,
  Flex,
  GridItem,
  HStack,
  Heading,
  Icon,
  SimpleGrid,
  Stack,
  Text,
  VStack,
  useDisclosure
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { svgAssets } from "@neoWeb/assets/images/svgs";
import CardComponent from "@neoWeb/components/Beneficiary/CardComponent";
import GoBack from "@neoWeb/components/Button";
import { DropzoneComponentControlled } from "@neoWeb/components/Form/DropzoneComponent";
import Select from "@neoWeb/components/Form/SelectComponent";
import TextInput from "@neoWeb/components/Form/TextInput";
import { baseURL } from "@neoWeb/services/service-axios";
import {
  BeneficiaryCheckoutDetailRequest,
  PayoutMethod,
  useAddBeneficiary,
  useGetBeneficiaryById
} from "@neoWeb/services/service-beneficiary";
import {
  useGetCountryList,
  useGetRelationship
} from "@neoWeb/services/service-common";
import { useGetPayoutMethodById } from "@neoWeb/services/service-payoutmethod";
import { ISelectOptions, formatSelectOptions } from "@neoWeb/utility/format";
import { SetStateAction } from "jotai";
import { Dispatch, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import AddBeneficiaryAccount from "./AddBeneficiaryAccount";

const defaultValues = {
  fullName: "",
  mobileNumber: "",
  relationshipId: null as ISelectOptions<number> | null,
  countryId: null as ISelectOptions<number> | null,
  profileImage: "",
  bankId: null as ISelectOptions<number> | null,
  address: ""
};
export type IBeneficiaryAccountEditId = {
  id: null | number;
  type: "backend" | "local";
};
interface IAddBeneficiary {
  editBeneficiaryId: number | null;
  setBeneficiaryEditId: Dispatch<SetStateAction<number | null>>;
  setFlag: {
    on: () => void;
    off: () => void;
    toggle: () => void;
  };
}

const AddBeneficiary = ({
  editBeneficiaryId,
  setBeneficiaryEditId,
  setFlag
}: IAddBeneficiary) => {
  const schema = z.object({
    fullName: z.string().min(1, { message: "Full name is required" }),
    mobileNumber: z.string().min(1, { message: "Mobile number is required" }),
    profileImage: editBeneficiaryId
      ? z.any()
      : z.any().refine(data => !!data, {
          message: "Please upload a profile image"
        }),
    countryId: z
      .object({
        label: z.string(),
        value: z.number()
      })
      .nullable()
      .refine(data => !!data?.label && !!data?.value, {
        message: "Please select a country"
      }),
    address: z.string().min(1, { message: "Address is required" }),
    relationshipId: z
      .object({
        label: z.string(),
        value: z.number()
      })
      .nullable()
      .refine(data => !!data?.label && !!data?.value, {
        message: "Please select a relationship"
      }),
    bankId: z
      .object({
        label: z.string(),
        value: z.number()
      })
      .nullable()
      .refine(data => !!data?.label && !!data?.value, {
        message: "Please select payout method"
      })
  });
  const { data: beneficiaryData } = useGetBeneficiaryById(editBeneficiaryId);
  const [tableData, setTableData] = useState<
    BeneficiaryCheckoutDetailRequest[]
  >([]);
  const [editedAccountData, setEditedAccountData] = useState<
    BeneficiaryCheckoutDetailRequest[]
  >([] as BeneficiaryCheckoutDetailRequest[]);
  const [editId, setEditId] = useState<IBeneficiaryAccountEditId>({
    id: null,
    type: "local"
  });

  const {
    isOpen: isOpenAddAccountModal,
    onOpen: onOpenAddAccountModal,
    onClose: onCloseAddAccountModal
  } = useDisclosure();

  const { control, watch, handleSubmit, reset } = useForm({
    defaultValues: defaultValues,
    resolver: zodResolver(schema)
  });
  const { data: countriesList } = useGetCountryList();
  const { data: RelationshipList } = useGetRelationship();
  const {
    mutateAsync: mutateAddBeneficiary,
    isPending: isAddBeneficiaryLoading
  } = useAddBeneficiary();
  const { data: Payoutmethoddata } = useGetPayoutMethodById(
    watch("countryId")?.value ?? null
  );

  useEffect(() => {
    if (editBeneficiaryId) {
      setTableData(beneficiaryData?.beneficiaryCheckoutDetail ?? []);
      reset({
        fullName: beneficiaryData?.fullName,
        mobileNumber: beneficiaryData?.mobileNumber,
        countryId: {
          label: beneficiaryData?.country?.name,
          value: beneficiaryData?.country?.id
        },
        address: beneficiaryData?.address,
        relationshipId: {
          label: beneficiaryData?.relationship?.name,
          value: beneficiaryData?.relationship?.id
        },
        bankId: {
          label: (
            beneficiaryData?.beneficiaryCheckoutDetail[0]
              ?.payoutMethod as PayoutMethod
          )?.name,
          value: (
            beneficiaryData?.beneficiaryCheckoutDetail[0]
              ?.payoutMethod as PayoutMethod
          )?.id
        }
      });
    }
  }, [beneficiaryData]);

  const countryOptions = formatSelectOptions<number>({
    data: countriesList?.data?.data,
    labelKey: "name",
    valueKey: "id",
    icon: {
      iconKey: "flagIcon",
      iconPath: `${baseURL}/document-service/master/flag-icon?fieldId=`,
      iconCode: "shortName"
    }
  });
  const payout_methodoptions = formatSelectOptions<number>({
    data: Payoutmethoddata?.filter(item => !item?.isCash),
    labelKey: "name",
    valueKey: "id",
    icon: {
      iconKey: "icon",
      iconPath: `${baseURL}/document-service/payout/method/icon/master?fileId=`,
      iconCode: "icon"
    }
  });

  const RelationshipOptions = formatSelectOptions({
    data: RelationshipList?.data?.data,
    labelKey: "name",
    valueKey: "id"
  });

  const addBeneficiaryy = async (data: any) => {
    const finalTableData = editedAccountData.map(item => {
      return {
        id: item.id ?? null,
        payoutMethodId:
          (item.payoutMethod as PayoutMethod)?.id ?? item.payoutMethod?.value,
        payoutPartnerId: item.payoutPartner?.id ?? item.payoutPartner?.value,
        accountName: item.accountName,
        accountNumber: item.accountNumber,
        primary: item.isPrimary
      };
    });
    const preparedData = {
      ...data,
      bankId: data.bankId?.value,
      countryId: data.countryId?.value,
      relationshipId: data.relationshipId?.value,
      profileImage: data?.profileImage ? data.profileImage[0] : null,
      beneficiaryCheckoutDetail: finalTableData
    };
    try {
      await mutateAddBeneficiary({
        ...preparedData,
        beneficiaryDetailId: editBeneficiaryId
      });

      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = () => {
    setEditId({ id: null, type: "local" });
    setBeneficiaryEditId(null);
    setFlag.off();
    reset();
  };
  return (
    <Flex direction={"column"}>
      <Card borderRadius={"24px"}>
        <VStack
          as="form"
          alignItems={"stretch"}
          onSubmit={handleSubmit(addBeneficiaryy)}
        >
          <Stack gap={"16px"} p={"24px"}>
            <GridItem colSpan={2}>
              <DropzoneComponentControlled
                name="profileImage"
                control={control}
                options={{ maxSize: 2 }}
                imagePreview={
                  editBeneficiaryId
                    ? `${baseURL}/document-service/customer/profile-image?fileId=${beneficiaryData?.profileImage}`
                    : ""
                }
              />
            </GridItem>
            <Heading fontSize={"14px "}>Beneficiary Details</Heading>
            <SimpleGrid columns={2} gap={"20px"}>
              <GridItem colSpan={1}>
                <TextInput
                  type="text"
                  name="fullName"
                  label="Full Name"
                  control={control}
                />
              </GridItem>

              <GridItem colSpan={1}>
                <TextInput
                  type="text"
                  name="mobileNumber"
                  label="Mobile Number"
                  control={control}
                />
              </GridItem>

              <GridItem mt={1} colSpan={1}>
                <Select
                  // noFloating
                  name="countryId"
                  placeholder="Country"
                  control={control}
                  options={countryOptions}
                />
              </GridItem>

              <GridItem mt={1}>
                <TextInput
                  type="text"
                  name="address"
                  label="Address"
                  control={control}
                />
              </GridItem>

              <GridItem>
                <Select
                  name="relationshipId"
                  placeholder="Relationship"
                  control={control}
                  options={RelationshipOptions}
                />
              </GridItem>
            </SimpleGrid>

            <Heading fontSize={"14px"}>Account Details</Heading>
            <SimpleGrid>
              <GridItem>
                <Select
                  // noFloating
                  name="bankId"
                  placeholder="Select Payout method"
                  control={control}
                  options={payout_methodoptions}
                />
              </GridItem>
            </SimpleGrid>
            <Button
              variant="light"
              isDisabled={editBeneficiaryId ? false : !watch("bankId")}
              leftIcon={<svgAssets.AddCircle />}
              onClick={onOpenAddAccountModal}
              width={"max-content"}
            >
              Add {watch("bankId")?.label ?? ""} Account
            </Button>
            <HStack gap={4} wrap={"wrap"}>
              {tableData?.length === 0 &&
                beneficiaryData?.beneficiaryCheckoutDetail.length === 0 && (
                  <Stack
                    borderRadius={"16px"}
                    bg={"#EDF2F7"}
                    padding={"24px"}
                    gap={4}
                    width={"404px"}
                    alignItems={"center"}
                  >
                    <Icon
                      as={svgAssets.ClipText}
                      height={"24px"}
                      width={"24px"}
                    />
                    <Text>Account Details Will be shown here</Text>
                  </Stack>
                )}
              <CardComponent
                setEditDetailId={setEditId}
                data={tableData}
                onOpen={onOpenAddAccountModal}
              />
            </HStack>
          </Stack>
          <HStack justifyContent={"space-between"} padding={"16px"}>
            <GoBack onClick={handleClose} />
            <Button
              width={"20%"}
              type="submit"
              isLoading={isAddBeneficiaryLoading}
            >
              Save
            </Button>
          </HStack>
        </VStack>
      </Card>
      <AddBeneficiaryAccount
        accountData={editedAccountData}
        editDetailId={editId}
        setEditDetailId={setEditId}
        tableData={tableData}
        setTableData={setTableData}
        payoutMethodId={watch("bankId")}
        isOpen={isOpenAddAccountModal}
        onClose={onCloseAddAccountModal}
        setAccountData={setEditedAccountData}
      />
    </Flex>
  );
};

export default AddBeneficiary;
