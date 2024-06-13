import {
  Button,
  Card,
  Flex,
  Heading,
  SimpleGrid,
  VStack
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import Select from "@neoWeb/components/Form/SelectComponent";
import TextInput from "@neoWeb/components/Form/TextInput";
import {
  useGetCountryList,
  useGetStateById
} from "@neoWeb/services/service-common";
import { formatSelectOptions } from "@neoWeb/utility/format";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Fragment } from "react/jsx-runtime";
import { z } from "zod";
import {
  IDataFormFields,
  IStepProps,
  convertToCamelCase,
  createKycFieldMappingData
} from "..";

const AddressDetails = ({ stepProps, formFieldData }: IStepProps) => {
  const [editId] = useState();

  const [schema, setSchema] = useState(z.object({}));

  const { control, handleSubmit } = useForm({ resolver: zodResolver(schema) });
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
    nationality: {
      validation: z.string().min(1, { message: "Street address is required" }),
      reactElement: (editDisabled: boolean) => (
        <TextInput
          type="text"
          name="nationality"
          label="Nationality"
          control={control}
          disabled={editId && editDisabled}
        />
      )
    },
    streetAddress: {
      validation: z.string().min(1, { message: "Street address is required" }),
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
    country: {
      validation: z
        .object({
          label: z.string().min(1),
          value: z.number().min(0)
        })
        .refine(data => !!data?.label && !!data?.value, {
          message: "Country is required"
        }),
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
    city: {
      validation: z.string().min(1, { message: "City is required" }),
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
    residentialStatus: {
      validation: z.string().min(1, { message: "City is required" }),
      reactElement: (editDisabled: boolean) => (
        <TextInput
          type="text"
          name="residentialStatus"
          label="Residential Status"
          control={control}
          disabled={editId && editDisabled}
        />
      )
    },
    zipCode: {
      validation: z.string().min(1, { message: "Zip Code is required" }),

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

    state: {
      validation: z
        .object({
          label: z.string().min(1),
          value: z.number().min(0)
        })
        .refine(data => !!data?.label && !!data?.value, {
          message: "State is required"
        }),
      reactElement: (editDisabled: boolean) => (
        <Select
          name="state"
          placeholder="-State-"
          control={control}
          options={StateOptions}
          isDisabled={editId && editDisabled}
        />
      )
    },
    postalCode: {
      validation: z.string().min(1, { message: "Zip Code is required" }),

      reactElement: (editDisabled: boolean) => (
        <TextInput
          type="text"
          name="postalCode"
          label="-Postal Code"
          control={control}
          disabled={editId && editDisabled}
        />
      )
    }
  } as IDataFormFields;
  const AddressDataFormFieldList = useMemo(() => {
    return createKycFieldMappingData(
      formFieldData,
      AddressDataFormFields
    )?.sort((a, b) => a?.displayOrder - b?.displayOrder);
  }, [formFieldData]);
  useEffect(() => {
    const requiredFieldValidations = AddressDataFormFieldList?.filter(
      item => item?.isRequired
    )?.reduce((acc: any, item) => {
      if (
        item?.name &&
        AddressDataFormFields[convertToCamelCase(item?.name)]?.validation
      ) {
        acc[convertToCamelCase(item?.name)] =
          AddressDataFormFields[convertToCamelCase(item?.name)]?.validation;
      }
      return acc;
    }, {});
    setSchema(z.object(requiredFieldValidations));
  }, [AddressDataFormFieldList]);

  const onSubmitAddressDetails = (data: any) => {
    console.log(data);
    // stepProps.nextStep();
  };

  return (
    <Flex direction={"column"}>
      <Card borderRadius={"16px"} p={5}>
        <Heading size={"lg"}>Adress Details</Heading>
        <VStack
          as={"form"}
          onSubmit={handleSubmit(onSubmitAddressDetails)}
          spacing={10}
        >
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={7} w={"100%"} pt={5}>
            {AddressDataFormFieldList?.map(item => (
              <Fragment key={item?.id}>
                {item?.display && item?.element}
              </Fragment>
            ))}
          </SimpleGrid>

          <Flex justifyContent={"space-between"} w={"100%"} mt={4}>
            <Button
              variant="filter"
              mr={1}
              onClick={() => stepProps.prevStep()}
            >
              Go Back
            </Button>

            <Button colorScheme="teal" type="submit">
              Save and Continue
            </Button>
          </Flex>
        </VStack>
      </Card>
    </Flex>
  );
};
export default AddressDetails;
