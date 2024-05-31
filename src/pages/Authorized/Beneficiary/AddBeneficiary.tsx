import {
  Box,
  Button,
  Card,
  Flex,
  GridItem,
  HStack,
  Heading,
  SimpleGrid,
  Stack,
  VStack,
  useDisclosure
} from "@chakra-ui/react";
import { svgAssets } from "@neoWeb/assets/images/svgs";
import CardComponent from "@neoWeb/components/Beneficiary/CardComponent";
import { DropzoneComponentControlled } from "@neoWeb/components/Form/DropzoneComponent";
import Select from "@neoWeb/components/Form/SelectComponent";
import TextInput from "@neoWeb/components/Form/TextInput";
import { baseURL } from "@neoWeb/services/service-axios";
import {
  useGetCountryList,
  useGetRelationship
} from "@neoWeb/services/service-common";
import { useGetPayoutMethodById } from "@neoWeb/services/service-payoutmethod";
import { formatSelectOptions } from "@neoWeb/utility/format";
import { useState } from "react";
import { useForm } from "react-hook-form";
import AddAccount from "./Addaccount";
// const defaultValues = {
//   fullName: "",
//   mobileNumber: "",
//   relationshipId: null as number | null,
//   countryId: null as number | null,
//   profileImage: "",
//   bankId: null as number | null,
//   address: "",
//   BeneficiaryCheckoutDetail: [
//     {
//       id: null as number | null,
//       payoutMethodId: null as number | null,
//       payoutPartnerId: "",
//       accountName: "",
//       accountNumber: "",
//       primary: ""
//     }
//   ]
// };

export interface IArrayValues {
  addId: number;
  payoutPartnerName: string;
  payoutMethodId: number;
  payoutPartnerId: number | null;
  accountName: string;
  accountNumber: string;
  primary: boolean;
}

const AddBeneficiary = () => {
  const [tableData, setTableData] = useState<IArrayValues[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const { control, watch } = useForm({});

  const {
    isOpen: isOpenAddAccountModal,
    onOpen: onOpenAddAccountModal,
    onClose: onCloseAddAccountModal
  } = useDisclosure();

  const { data: countriesList } = useGetCountryList();
  const { data: RelationshipList } = useGetRelationship();
  // const { data: Beneficiarydata } = useGetBeneficiaryDetail();
  // const { mutateAsync: mutateAddBeneficiary } = useAddBeneficiary();
  const { data: Payoutmethoddata } = useGetPayoutMethodById(
    watch("countryId")?.value
  );
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

  return (
    <Flex direction={"column"}>
      <Card borderRadius={"24px"}>
        <VStack
          as="form"
          alignItems={"stretch"}
          // onSubmit={handleSubmit(addBeneficiaryy)}
        >
          <Stack gap={"16px"} p={"24px"}>
            <GridItem colSpan={2}>
              <DropzoneComponentControlled
                name="profileImage"
                control={control}
                options={{ maxSize: 4 }}
                // imagePreview={
                //   searchParams.get("countryId")
                //     ? `${baseURL}/document-service/customer/profile-image?fileId=${profileImage}`
                //     : ""
                // }
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

              <GridItem colSpan={1}>
                <Select
                  // noFloating
                  name="countryId"
                  placeholder="Country"
                  control={control}
                  options={countryOptions}
                />
              </GridItem>

              <GridItem>
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
              isDisabled={!watch("bankId")}
              leftIcon={<svgAssets.AddCircle />}
              onClick={onOpenAddAccountModal}
              width={"max-content"}
            >
              Add {watch("bankId")?.label ?? ""} Account
            </Button>
            {/* <Box
              borderRadius={"16px"}
              bg={"#EDF2F7"}
              padding={"16px"}
              gap={"8px"}
              width={"404px"}
            >
              <Stack
                flexDir={"column"}
                alignItems={"center"}
                gap={4}
                padding={4}
              >
                <svgAssets.ClipText />
                <Text textStyle={"normalStyle"}>
                  Account Details Will be shown here
                </Text>
              </Stack>
            </Box> */}
            <Box overflowY={"scroll"}>
              <HStack gap={2}>
                {tableData.map((item, index) => (
                  <CardComponent
                    primary={item.primary}
                    key={index}
                    payoutPartnerName={item.payoutPartnerName}
                    accountName={item.accountName}
                    accountNumber={item.accountNumber}
                  />
                ))}
              </HStack>
            </Box>
          </Stack>
          <HStack justifyContent={"flex-end"} padding={"16px"}>
            <Button width={"20%"} type="submit">
              Save
            </Button>
          </HStack>
        </VStack>
      </Card>
      <AddAccount
        data={tableData}
        editDetailId={editId}
        setEditDetailId={setEditId}
        tableData={tableData}
        setTableData={setTableData}
        payoutMethodId={watch("bankId")?.value ? watch("bankId")?.value : null}
        isOpen={isOpenAddAccountModal}
        onClose={onCloseAddAccountModal}
      />
    </Flex>
  );
};

export default AddBeneficiary;
