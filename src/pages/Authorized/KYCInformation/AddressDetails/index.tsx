import {
  Button,
  Card,
  Flex,
  Heading,
  SimpleGrid,
  VStack
} from "@chakra-ui/react";
import Select from "@neoWeb/components/Form/SelectComponent";
import TextInput from "@neoWeb/components/Form/TextInput";
import {
  useGetCountryList,
  useGetStateById
} from "@neoWeb/services/service-common";
import { formatSelectOptions } from "@neoWeb/utility/format";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Fragment } from "react/jsx-runtime";
import { IStepProps, createKycFieldMappingData } from "..";

const AddressDetails = ({ stepProps, formFieldData }: IStepProps) => {
  const [editId, setEditId] = useState();

  const { control } = useForm();
  const { data: countryList } = useGetCountryList();
  const { data: stateList } = useGetStateById(36);
  const countryOptions = formatSelectOptions<number>({
    data: countryList?.data?.data,
    labelKey: "name",
    valueKey: "id"
  });
  const StateOptions = formatSelectOptions<number>({
    data: stateList?.data?.data,
    labelKey: "name",
    valueKey: "id"
  });

  const AddressDataFormFields = {
    street_address: {
      reactElement: (editDisabled: boolean) => (
        <TextInput
          type="text"
          name="streetAddress"
          label="-Street Address-"
          control={control}
          disabled={editId && editDisabled}
        />
      )
    },
    city: {
      reactElement: (editDisabled: boolean) => (
        <TextInput
          type="text"
          name="city"
          label="-City-"
          control={control}
          disabled={editId && editDisabled}
        />
      )
    },
    zip_code: {
      
      reactElement: (editDisabled: boolean) => (
        <TextInput
          type="text"
          name="zipCode"
          label="-Zip Code"
          control={control}
          disabled={editId && editDisabled}
        />
      )
    },
    country: {
      reactElement: (editDisabled: boolean) => (
        <Select
          name="country"
          placeholder="Country"
          control={control}
          options={countryOptions}
          isDisabled={editId && editDisabled}
        />
      )
    },
    state: {
      reactElement: (editDisabled: boolean) => (
        <Select
          name="state"
          placeholder="-State-"
          control={control}
          options={StateOptions}
          isDisabled={editId && editDisabled}
        />
      )
    }
  };
  const AddressDataFormFieldList = createKycFieldMappingData(
    formFieldData,
    AddressDataFormFields
  )?.sort((a, b) => a?.displayOrder - b?.displayOrder);

  return (
    <Flex direction={"column"}>
      <Card borderRadius={"16px"} p={5}>
        <Heading size={"lg"}>Account Details</Heading>
        <VStack spacing={10}>
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={4} w={"100%"} pt={5}>
            {AddressDataFormFieldList?.map(item => (
              <Fragment key={item?.id}>{item?.element}</Fragment>
            ))}
          </SimpleGrid>
          {/* <SimpleGrid columns={{ base: 1, md: 2 }} gap={4} w={"100%"} pt={5}>
            <GridItem>
              <Select
                name="country"
                placeholder="Country"
                control={control}
                options={countryOptions}
              />
            </GridItem>
            <GridItem>
              <Select
                name="state"
                placeholder="-State-"
                control={control}
                options={StateOptions}
              />
            </GridItem>
            <GridItem>
              <TextInput
                type="text"
                name="city"
                label="-City-"
                control={control}
              />
            </GridItem>
            <GridItem>
              <TextInput
                type="text"
                name="streetAddress"
                label="-Street Address-"
                control={control}
              />
            </GridItem>
            <GridItem>
              <TextInput
                type="text"
                name="zipCode"
                label="-Zip Code"
                control={control}
              />
            </GridItem>
          </SimpleGrid> */}

          <Flex justifyContent={"space-between"} w={"100%"} mt={4}>
            <Button
              variant="filter"
              mr={1}
              onClick={() => stepProps.prevStep()}
            >
              Go Back
            </Button>

            <Button colorScheme="teal">Save and Continue</Button>
          </Flex>
        </VStack>
      </Card>
    </Flex>
  );
};
export default AddressDetails;
