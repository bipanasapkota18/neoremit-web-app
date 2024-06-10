import {
  Button,
  Card,
  Flex,
  GridItem,
  Heading,
  Icon,
  SimpleGrid,
  Text,
  VStack
} from "@chakra-ui/react";
import { svgAssets } from "@neoWeb/assets/images/svgs";
import Select from "@neoWeb/components/Form/SelectComponent";
import TextInput from "@neoWeb/components/Form/TextInput";
import {
  useGetMaritalStatus,
  useGetOccupation
} from "@neoWeb/services/service-common";

import { usecreateKYC } from "@neoWeb/services/service-kyc";
import { formatSelectOptions } from "@neoWeb/utility/format";

import { zodResolver } from "@hookform/resolvers/zod";
import { Fragment, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { IDataFormFields, IStepProps, createKycFieldMappingData } from "..";

const defaultValues = {
  kycId: "",
  firstName: "",
  middleName: "",
  lastName: "",
  gender: "",
  dateOfBirth: "",
  phoneNumber: "",
  email: "",
  maritalStatusId: "",
  occupationId: "",
  ssnNumber: "",
  countryId: "",
  stateId: "",
  zipCode: "",
  nationality: "",
  identificationNumber: "",
  streetAddress: "",
  city: "",
  residentialStatus: "",
  postalCode: ""
};
const PersonalDetails = ({ stepProps, formFieldData }: IStepProps) => {
  const [schema, setSchema] = useState(z.object({}));

  console.log(schema);

  const [editId, setEditId] = useState();

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    resolver: zodResolver(schema)
  });

  const { mutateAsync: mutateKycCreate, isPending: isKycLoading } =
    usecreateKYC();
  const [selectedGender, setSelectedGender] = useState<string | undefined>();

  const { data: maritalList } = useGetMaritalStatus();
  const { data: occupationList } = useGetOccupation();

  const maritalOptions = formatSelectOptions<number>({
    data: maritalList?.data?.data,
    labelKey: "name",
    valueKey: "id"
  });
  const occupationOptions = formatSelectOptions<number>({
    data: occupationList?.data?.data,
    labelKey: "name",
    valueKey: "id"
  });

  const GenderOptions = [
    {
      label: "Male",
      icon: svgAssets.MaleIcon
    },
    {
      label: "Female",
      icon: svgAssets.FemaleIcon
    },
    {
      label: "Others",
      icon: svgAssets.OtherIcon
    }
  ];

  const personalDataFormFields = {
    first_name: {
      validation: z.string().min(1, { message: "First Name is required" }),
      reactElement: (editDisabled: boolean) => (
        <GridItem colSpan={1}>
          <TextInput
            type="text"
            name="first_name"
            label="First Name"
            control={control}
            disabled={editId && editDisabled}
          />
        </GridItem>
      )
    },
    middle_name: {
      validation: z.string().min(1, { message: "Middle Name is required" }),
      reactElement: (editDisabled: boolean) => (
        <GridItem colSpan={1}>
          <TextInput
            type="text"
            name="middle_name"
            label="Middle Name"
            control={control}
            disabled={editId && editDisabled}
          />
        </GridItem>
      )
    },
    last_name: {
      validation: z.string().min(1, { message: "Last Name is required" }),
      reactElement: (editDisabled: boolean) => (
        <GridItem colSpan={1}>
          <TextInput
            type="text"
            name="last_name"
            label="Last Name"
            control={control}
            disabled={editId && editDisabled}
          />
        </GridItem>
      )
    },
    email_address: {
      validation: z
        .string()
        .email({ message: "Invalid email format" })
        .min(1, { message: "Email is required" }),
      reactElement: (editDisabled: boolean) => (
        <GridItem colSpan={1}>
          <TextInput
            type="email"
            name="email_address"
            label="Email Address"
            control={control}
            disabled={editId && editDisabled}
          />
        </GridItem>
      )
    },
    marital_status: {
      validation: z
        .object({
          label: z.string().min(1),
          value: z.number().min(0)
        })
        .nullable()
        .refine(data => !!data?.label && !!data?.value, {
          message: "Marital Status is required"
        }),
      reactElement: (editDisabled: boolean) => (
        <GridItem colSpan={1}>
          <Select
            name="marital_status"
            placeholder="Marital Status"
            control={control}
            options={maritalOptions}
            isDisabled={editId && editDisabled}
          />
        </GridItem>
      )
    },
    date_of_birth: {
      validation: z.string().min(1, { message: "Date of Birth is required" }),
      reactElement: (editDisabled: boolean) => (
        <GridItem colSpan={1}>
          <TextInput
            type="date"
            name="date_of_birth"
            label="DOB"
            control={control}
            disabled={editId && editDisabled}
          />
        </GridItem>
      )
    },
    occupation: {
      validation: z
        .object({
          label: z.string().min(1),
          value: z.number().min(0)
        })
        .nullable()
        .refine(data => !!data?.label && !!data?.value, {
          message: "Occupation is required"
        }),
      reactElement: (editDisabled: boolean) => (
        <GridItem colSpan={1}>
          <Select
            name="occupation"
            placeholder="Occupation"
            control={control}
            options={occupationOptions}
            isDisabled={editId && editDisabled}
          />
        </GridItem>
      )
    },
    phone_number: {
      validation: z.string().min(1, { message: "Phone Number is required" }),
      reactElement: (editDisabled: boolean) => (
        <GridItem>
          <TextInput
            type="text"
            name="phone_number"
            label="Contact Number"
            control={control}
          />
        </GridItem>
      )
    },
    ssn_number: {
      validation: z.string().min(1, { message: "SSN Number is required" }),
      reactElement: (editDisabled: boolean) => (
        <GridItem colSpan={1}>
          <TextInput
            type="text"
            name="ssn_number"
            label="SSN Number (optional)"
            control={control}
            disabled={editId && editDisabled}
          />
        </GridItem>
      )
    },
    gender: {
      reactElement: (editDisabled: boolean) => (
        <VStack align="start" spacing={4} w="100%">
          <Text fontSize={"lg"}>Gender</Text>

          <Flex gap={"16px"}>
            {GenderOptions.map((data, index) => (
              <Button
                key={index}
                sx={{ pointerEvents: editId && editDisabled ? "none" : "all" }}
                leftIcon={<Icon as={data.icon} />}
                variant={selectedGender === data.label ? "solid" : "outline"}
                onClick={() => setSelectedGender(data.label)}
                colorScheme={selectedGender === data.label ? "blue" : "#5A2F8D"}
              >
                {data.label}
              </Button>
            ))}
          </Flex>
        </VStack>
      )
    }
  } as IDataFormFields;

  const personalDetailFieldList = useMemo(() => {
    return createKycFieldMappingData(
      formFieldData,
      personalDataFormFields
    )?.sort((a, b) => a?.displayOrder - b?.displayOrder);
  }, [formFieldData]);

  useEffect(() => {
    const requiredFieldValidations = personalDetailFieldList
      ?.filter(item => item?.isRequired)
      ?.reduce((acc, item) => {
        if (item?.name && personalDataFormFields[item?.name]?.validation) {
          acc[item.name] = personalDataFormFields[item.name].validation;
        }
        return acc;
      }, {});
    console.log(requiredFieldValidations);
    setSchema(z.object(requiredFieldValidations));
    // kycSchema.object(requiredFieldValidations);
  }, [personalDetailFieldList]);

  const onSubmit = async (data: typeof defaultValues) => {
    // try {
    //   await mutateKycCreate();
    //   stepProps.nextStep();
    // } catch (error) {
    //   console.error(error);
    // }
  };

  return (
    <Flex direction={"column"}>
      <Card borderRadius={"16px"} p={5} w={"100%"}>
        <Heading size="lg">Personal Information</Heading>
        <VStack spacing={10} as={"form"} onSubmit={handleSubmit(onSubmit)}>
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={4} w={"100%"} pt={5}>
            {personalDetailFieldList?.map(item => (
              <Fragment key={item?.id}>
                {item?.display && item?.element}
              </Fragment>
            ))}
          </SimpleGrid>

          <Flex w={"100%"} mt={4} justifyContent={"flex-end"}>
            <Button colorScheme="teal" type="submit" isLoading={isKycLoading}>
              Save and Continue
            </Button>
          </Flex>
        </VStack>
      </Card>
    </Flex>
  );
};

export default PersonalDetails;
