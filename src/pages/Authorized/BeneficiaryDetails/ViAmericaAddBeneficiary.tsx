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
  useAddBeneficiary,
  useEditBeneficiary,
  useGetBeneficiaryById
} from "@neoWeb/services/service-beneficiary";
import {
  useGetCountryList,
  useGetRelationship,
  useGetStateById
} from "@neoWeb/services/service-common";
import { useGetPayoutMethodById } from "@neoWeb/services/service-payoutmethod";
import { colorScheme } from "@neoWeb/theme/colorScheme";
import { ISelectOptions, formatSelectOptions } from "@neoWeb/utility/format";
import { SetStateAction } from "jotai";
import { Dispatch, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ViAmericaAddBeneficiaryAccount from "./ViAmericaAddBeneficiaryAccount";

const defaultValues = {
  name: "",
  lastName: "",
  secondLastName: "",
  mobileNumber: "",
  relationshipId: null as ISelectOptions<number> | null,
  countryId: null as ISelectOptions<number> | null,
  profileImage: "",
  bankId: null as ISelectOptions<number> | null,
  stateId: null as ISelectOptions<number> | null,
  address: "",
  nickName: "",
  routingNo: ""
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

const ViAmericaAddBeneficiary = ({
  editBeneficiaryId,
  setBeneficiaryEditId,
  setFlag
}: IAddBeneficiary) => {
  const [editId, setEditId] = useState<number | null>(null);
  const schema = z.object({
    name: z.string().min(1, { message: "First name is required" }),
    secondLastName: z.string(),
    lastName: z.string().min(1, { message: "Last name is required" }),
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
    stateId: z
      .object({
        label: z.string(),
        value: z.number()
      })
      .nullable()
      .refine(data => !!data?.label && !!data?.value, {
        message: "Please select state"
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
    // bankId: z
    //   .object({
    //     label: z.string(),
    //     value: z.number()
    //   })
    //   .nullable()
    //   .refine(data => !!data?.label && !!data?.value, {
    //     message: "Please select payout method"
    //   }),
    nickName: z.string().min(1, { message: "Nick name is required" }),
    routingNo: z.string().min(1, { message: "Routing number is required" })
  });

  const { data: beneficiaryData } = useGetBeneficiaryById(editBeneficiaryId);

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
    isPending: isAddBeneficiaryLoading,
    isSuccess
  } = useAddBeneficiary();
  const {
    mutateAsync: mutateEditBeneficiary,
    isPending: isEditBeneficiaryPending
  } = useEditBeneficiary();

  const { data: stateData } = useGetStateById(
    watch("countryId")?.value ?? null
  );

  const { data: Payoutmethoddata } = useGetPayoutMethodById(
    watch("countryId")?.value ?? null
  );
  const payout_methodoptions = formatSelectOptions<number>({
    data: Payoutmethoddata?.filter(item => !item?.isCash),
    labelKey: "name",
    valueKey: "id",
    defaultValue: Payoutmethoddata?.filter(item => !item?.isCash)[0]?.id,
    icon: {
      iconKey: "icon",
      iconPath: `${baseURL}/document-service/payout/method/icon/master?fileId=`,
      iconCode: "icon"
    }
  });

  useEffect(() => {
    if (editBeneficiaryId) {
      reset({
        name: beneficiaryData?.fullName,
        secondLastName: beneficiaryData?.secondLastName,
        lastName: beneficiaryData?.lastName,
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
        routingNo: beneficiaryData?.routingNo,
        nickName: beneficiaryData?.nickName,
        stateId: {
          label: beneficiaryData?.state?.name,
          value: beneficiaryData?.state?.id
        }
      });
    }
  }, [beneficiaryData]);

  useEffect(() => {
    reset(oldValues => {
      return {
        ...oldValues,
        bankId:
          payout_methodoptions?.find(item => item.label === "Bank") ?? null
      };
    });
  }, [Payoutmethoddata]);

  const countryOptions = formatSelectOptions<number>({
    data: countriesList,
    labelKey: "name",
    valueKey: "id",
    icon: {
      iconKey: "flagIcon",
      iconPath: `${baseURL}/document-service/master/flag-icon?fieldId=`,
      iconCode: "shortName"
    }
  });

  const stateOptions = formatSelectOptions<number>({
    data: stateData?.data?.data,
    labelKey: "name",
    valueKey: "id"
  });
  const RelationshipOptions = formatSelectOptions({
    data: RelationshipList?.data?.data,
    labelKey: "name",
    valueKey: "id"
  });

  const addBeneficiaryy = async (data: typeof defaultValues) => {
    const preparedData = {
      ...data,
      countryId: data.countryId?.value ?? null,
      relationshipId: data.relationshipId?.value ?? null,
      profileImage: data?.profileImage ? data.profileImage[0] : null,
      stateId: data.stateId?.value ?? null,
      address2: ""
    };
    try {
      if (editBeneficiaryId) {
        await mutateEditBeneficiary({
          ...preparedData,
          beneficiaryDetailId: editBeneficiaryId
        });
      } else {
        const addRes = await mutateAddBeneficiary({
          ...preparedData
        });
        if (addRes?.status === 200) onOpenAddAccountModal();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = () => {
    // setEditId({ id: null, type: "local" });
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
                  name="name"
                  label="First Name"
                  control={control}
                  required
                />
              </GridItem>
              <GridItem colSpan={1}>
                <TextInput
                  type="text"
                  name="secondLastName"
                  label="Middle Name"
                  control={control}
                />
              </GridItem>
              <GridItem colSpan={1}>
                <TextInput
                  type="text"
                  name="lastName"
                  label="Last Name"
                  control={control}
                  required
                />
              </GridItem>

              <GridItem colSpan={1}>
                <TextInput
                  type="text"
                  name="mobileNumber"
                  label="Mobile Number"
                  control={control}
                  required
                />
              </GridItem>

              <GridItem mt={1} colSpan={1}>
                <Select
                  noFloating
                  name="countryId"
                  placeholder="Country"
                  control={control}
                  options={countryOptions}
                  required
                />
              </GridItem>
              <GridItem mt={1} colSpan={1}>
                <Select
                  noFloating
                  name="stateId"
                  placeholder="State"
                  control={control}
                  options={stateOptions}
                  required
                />
              </GridItem>

              <GridItem mt={1}>
                <TextInput
                  type="text"
                  name="address"
                  label="Address"
                  control={control}
                  required
                />
              </GridItem>

              <GridItem>
                <Select
                  name="relationshipId"
                  placeholder="Relationship"
                  control={control}
                  options={RelationshipOptions}
                  required
                />
              </GridItem>
              <GridItem mt={1}>
                <TextInput
                  type="text"
                  name="nickName"
                  label="Nick Name"
                  control={control}
                  required
                />
              </GridItem>
              <GridItem mt={1}>
                <TextInput
                  type="text"
                  name="routingNo"
                  label="Routing Number"
                  control={control}
                  required
                />
              </GridItem>
            </SimpleGrid>

            {editBeneficiaryId && (
              <>
                <Heading fontSize={"14px"}>Account Details</Heading>
                <SimpleGrid>
                  <GridItem>
                    <Select
                      noFloating
                      name="bankId"
                      placeholder="Select Payout method"
                      control={control}
                      options={payout_methodoptions}
                    />
                  </GridItem>
                </SimpleGrid>
                <Button
                  variant="light"
                  isDisabled={!watch("bankId")}
                  leftIcon={
                    <svgAssets.AddCircle color={colorScheme.primary_500} />
                  }
                  onClick={onOpenAddAccountModal}
                  width={"max-content"}
                >
                  Add {watch("bankId")?.label ?? ""} Account
                </Button>
                <HStack gap={4} wrap={"wrap"}>
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
                  <CardComponent
                    setEditDetailId={setEditId}
                    data={[]}
                    onOpen={onOpenAddAccountModal}
                  />
                </HStack>
              </>
            )}
          </Stack>
          <HStack justifyContent={"space-between"} padding={"16px"}>
            <GoBack onClick={handleClose} />
            <Button
              width={"20%"}
              type="submit"
              isLoading={isAddBeneficiaryLoading || isEditBeneficiaryPending}
            >
              Save
            </Button>
          </HStack>
        </VStack>
      </Card>
      <ViAmericaAddBeneficiaryAccount
        editDetailId={editId}
        setEditDetailId={setEditId}
        payoutMethodId={watch("bankId")}
        isOpen={isOpenAddAccountModal}
        onClose={onCloseAddAccountModal}
        isNewBeneficiary={isSuccess}
        beneficiaryId={editBeneficiaryId}
      />
    </Flex>
  );
};

export default ViAmericaAddBeneficiary;
