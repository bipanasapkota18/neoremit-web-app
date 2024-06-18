import {
  Button,
  Card,
  Flex,
  Heading,
  SimpleGrid,
  VStack
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import GoBack from "@neoWeb/components/Button";
import Select from "@neoWeb/components/Form/SelectComponent";
import TextInput from "@neoWeb/components/Form/TextInput";
import {
  useGetCountryList,
  useGetStateById
} from "@neoWeb/services/service-common";
import { useCreateAddressData } from "@neoWeb/services/service-kyc";
import { useKycStoreData } from "@neoWeb/store/kycData";
import { ISelectOptions, formatSelectOptions } from "@neoWeb/utility/format";
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

const defaultValues = {
  kycId: null as never as number | null,
  firstName: "",
  middleName: "",
  lastName: "",
  gender: "",
  dateOfBirth: "",
  phoneNumber: "",
  emailAddress: "",
  maritalStatus: null as ISelectOptions<number> | null,
  occupation: null as ISelectOptions<number> | null,
  ssnNumber: "",
  country: null as ISelectOptions<number> | null,
  state: null as ISelectOptions<number> | null,
  zipCode: "",
  nationality: "",
  identificationNumber: "",
  streetAddress: "",
  city: "",
  residentialStatus: "",
  postalCode: ""
};
const AddressDetails = ({ stepProps, formFieldData }: IStepProps) => {
  const { data: countryList } = useGetCountryList();
  const { mutateAsync: mutateAddressData, isPending: isAddressSavePending } =
    useCreateAddressData();

  const { kycData } = useKycStoreData();

  const addressInfo = useMemo(() => {
    return kycData?.addressInfo;
  }, [kycData]);

  const [schema, setSchema] = useState(z.object({}));
  const { control, handleSubmit, watch, reset } = useForm({
    defaultValues: defaultValues,
    resolver: zodResolver(schema)
  });
  const { data: stateList } = useGetStateById(watch("country")?.value ?? null);
  const [editId] = useState();

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

  useEffect(() => {
    if (kycData) {
      reset({
        country: countryOptions?.find(
          item => item?.value === addressInfo?.country?.id
        ),
        state: StateOptions?.find(
          item => item?.value === addressInfo?.state?.id
        ),
        nationality: addressInfo?.nationality ?? "",
        streetAddress: addressInfo?.streetAddress ?? "",
        city: addressInfo?.city ?? "",
        residentialStatus: addressInfo?.residentialStatus ?? "",
        zipCode: addressInfo?.zipCode ?? "",
        postalCode: addressInfo?.postalCode ?? ""
      });
    }
  }, [kycData]);

  const AddressDataFormFields = {
    country: {
      validation: {
        required: z
          .object({
            label: z.string(),
            value: z.number()
          })
          .nullable()
          .refine(data => !!data?.label && !!data?.value, {
            message: "Country is required"
          }),
        notRequired: z.object({
          label: z.string(),
          value: z.number()
        })
      },
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
    nationality: {
      validation: {
        required: z.string().min(1, { message: "Street address is required" }),
        notRequired: z.string()
      },
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
      validation: {
        required: z.string().min(1, { message: "Street address is required" }),
        notRequired: z.string()
      },
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
      validation: {
        required: z.string().min(1, { message: "City is required" }),
        notRequired: z.string()
      },
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
      validation: {
        required: z.string().min(1, { message: "City is required" }),
        notRequired: z.string()
      },
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
      validation: {
        required: z.string().min(1, { message: "Zip Code is required" }),
        notRequired: z.string()
      },

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
      validation: {
        required: z
          .object({
            label: z.string().min(1),
            value: z.number().min(0)
          })
          .nullable()
          .refine(data => !!data?.label && !!data?.value, {
            message: "State is required"
          }),
        notRequired: z.object({
          label: z.string(),
          value: z.number()
        })
      },
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
      validation: {
        required: z.string().min(1, { message: "Zip Code is required" }),
        notRequired: z.string()
      },

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
  }, [formFieldData, countryList, stateList]);
  useEffect(() => {
    const requiredFieldValidations = AddressDataFormFieldList?.reduce(
      (acc: any, item) => {
        if (item?.isRequired && item?.display) {
          acc[convertToCamelCase(item?.name)] =
            AddressDataFormFields[
              convertToCamelCase(item?.name)
            ]?.validation?.required;
        } else {
          acc[convertToCamelCase(item?.name)] =
            AddressDataFormFields[
              convertToCamelCase(item?.name)
            ]?.validation?.notRequired;
        }
        return acc;
      },
      {}
    );
    setSchema(z.object(requiredFieldValidations));
  }, [AddressDataFormFieldList]);

  const onSubmitAddressDetails = async (data: any) => {
    const preparedData = {
      ...data,
      kycId: kycData?.personalInfo?.kycId ?? null,
      countryId: data?.country?.value,
      stateId: data?.state?.value
    };
    console.log(preparedData);
    try {
      await mutateAddressData(preparedData);
      stepProps.nextStep();
    } catch (error) {
      console.error(error);
    }
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
            <GoBack onClick={() => stepProps.prevStep()} />

            <Button
              isLoading={isAddressSavePending}
              colorScheme="teal"
              type="submit"
            >
              Save and Continue
            </Button>
          </Flex>
        </VStack>
      </Card>
    </Flex>
  );
};
export default AddressDetails;
