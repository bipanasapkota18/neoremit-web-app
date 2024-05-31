import { AddIcon } from "@chakra-ui/icons";
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
  Text,
  VStack,
  useDisclosure
} from "@chakra-ui/react";
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
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
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

const AddBeneficiary = () => {
  const [searchParams] = useSearchParams();
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
    watch("country")?.value
  );

  const countryOptions = formatSelectOptions<number>({
    data: countriesList?.data?.data,
    labelKey: "name",
    valueKey: "id",
    icon: {
      iconKey: "flagIcon",
      iconPath: `${baseURL}/document-service/master/flag-icon?fieldId=`
    }
  });

  const payout_methodoptions = formatSelectOptions<number>({
    data: Payoutmethoddata,
    labelKey: "name",
    valueKey: "id"
  });

  const RelationshipOptions = formatSelectOptions({
    data: RelationshipList?.data?.data,
    labelKey: "name",
    valueKey: "id"
  });

  // const addBeneficiaryy = async (data: typeof defaultValues) => {
  //   try {
  //     await mutateAddBeneficiary;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

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
                name="flagIcon"
                control={control}
                options={{ maxSize: 4 }}
                imagePreview={
                  searchParams.get("countryId")
                    ? `${baseURL}/document-service/master/flag-icon?fileId={flagIcon}`
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

              <GridItem colSpan={1}>
                <Select
                  name="country"
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
                  name="relationship"
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
                  name="bank"
                  placeholder="Select Payout method"
                  control={control}
                  options={payout_methodoptions}
                />
              </GridItem>
            </SimpleGrid>
            <Button
              width={"178px"}
              leftIcon={<AddIcon />}
              onClick={onOpenAddAccountModal}
            >
              Add Bank Account
            </Button>
            <Box
              borderRadius={"16px"}
              bg={"#EDF2F7"}
              padding={"16px"}
              gap={"8px"}
              width={"404px"}
            >
              <HStack>
                <Text color={"#5A2F8D"} fontSize={"16px"} fontWeight={"400"}>
                  Account Details Will be shown here
                </Text>
              </HStack>
            </Box>
          </Stack>
          <Flex
            justifyContent={"flex-end"}
            padding={"16px"}
            width={"100%"}
            gap={"8px"}
          >
            <Button type="submit">Save</Button>
          </Flex>
        </VStack>
      </Card>
      <AddAccount
        isOpen={isOpenAddAccountModal}
        onClose={onCloseAddAccountModal}
      />
    </Flex>
  );
};

export default AddBeneficiary;
