import {
  Button,
  Card,
  Flex,
  GridItem,
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
import { ISelectOptions, formatSelectOptions } from "@neoWeb/utility/format";

import { zodResolver } from "@hookform/resolvers/zod";
import { useKycStoreData } from "@neoWeb/store/kycData";
import { colorScheme } from "@neoWeb/theme/colorScheme";
import moment from "moment";
import { Fragment, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
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
  countryId: null as ISelectOptions<number> | null,
  stateId: null as ISelectOptions<number> | null,
  zipCode: "",
  nationality: "",
  identificationNumber: "",
  streetAddress: "",
  city: "",
  residentialStatus: "",
  postalCode: ""
};
const PersonalDetails = ({ stepProps, formFieldData }: IStepProps) => {
  const [gender, setGender] = useState<string>("");
  const { data: maritalList } = useGetMaritalStatus();
  const { data: occupationList } = useGetOccupation();
  const { mutateAsync: mutateKycCreate, isPending: isKycLoading } =
    usecreateKYC();

  const { kycData } = useKycStoreData();

  const personalData = useMemo(() => {
    return kycData?.personalInfo;
  }, [kycData]);

  const [schema, setSchema] = useState(z.object({}));

  const [editId] = useState();

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { isValid }
  } = useForm({
    defaultValues,
    resolver: zodResolver(schema)
  });
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

  useEffect(() => {
    if (kycData) {
      setValue("gender", personalData?.gender ?? "");
      setGender(personalData?.gender ?? "");
      reset(oldValues => ({
        ...oldValues,
        firstName: personalData?.firstName ?? "",
        middleName: personalData?.middleName ?? "",
        lastName: personalData?.lastName ?? "",
        emailAddress: personalData?.email ?? "",
        maritalStatus:
          maritalOptions?.find(
            item => item?.value === personalData?.maritalStatus?.id
          ) ?? null,
        dateOfBirth:
          moment(personalData?.dateOfBirth).format("YYYY-MM-DD") ?? "",
        occupation:
          occupationOptions?.find(
            item => item?.value === personalData?.occupation?.id
          ) ?? null,
        ssnNumber: personalData?.ssnNumber ?? "",
        phoneNumber: personalData?.phoneNumber ?? ""
      }));
    }
  }, [kycData, maritalList, occupationList]);
  const checkRequired = (fieldName: string) => {
    return formFieldData?.find(
      item => convertToCamelCase(item?.keyField?.name) === fieldName
    )?.isRequired;
  };
  const personalDataFormFields = {
    firstName: {
      validation: {
        required: z.string().min(1, { message: "First Name is required" }),
        notRequired: z.string()
      },
      reactElement: (editDisabled: boolean) => (
        <GridItem colSpan={1}>
          <TextInput
            type="text"
            name="firstName"
            label="First Name"
            control={control}
            disabled={editId && editDisabled}
            required={checkRequired("firstName")}
          />
        </GridItem>
      )
    },
    middleName: {
      validation: {
        required: z.string().min(1, { message: "Middle Name is required" }),
        notRequired: z.string()
      },
      reactElement: (editDisabled: boolean) => (
        <GridItem colSpan={1}>
          <TextInput
            type="text"
            name="middleName"
            label="Middle Name"
            control={control}
            disabled={editId && editDisabled}
            required={checkRequired("middleName")}
          />
        </GridItem>
      )
    },
    lastName: {
      validation: {
        required: z.string().min(1, { message: "Last Name is required" }),
        notRequired: z.string()
      },
      reactElement: (editDisabled: boolean) => (
        <GridItem colSpan={1}>
          <TextInput
            type="text"
            name="lastName"
            label="Last Name"
            control={control}
            disabled={editId && editDisabled}
            required={checkRequired("lastName")}
          />
        </GridItem>
      )
    },
    emailAddress: {
      validation: {
        required: z
          .string()
          .email({ message: "Invalid email format" })
          .min(1, { message: "Email is required" }),
        notRequired: z.string().email({ message: "Invalid email format" })
      },
      reactElement: (editDisabled: boolean) => (
        <GridItem colSpan={1}>
          <TextInput
            type="email"
            name="emailAddress"
            label="Email Address"
            control={control}
            disabled={editId && editDisabled}
            required={checkRequired("emailAddress")}
          />
        </GridItem>
      )
    },
    maritalStatus: {
      validation: {
        required: z
          .object({
            label: z.string().min(1),
            value: z.number().min(0)
          })
          .nullable()
          .refine(data => !!data?.label && !!data?.value, {
            message: "Marital Status is required"
          }),
        notRequired: z
          .object({
            label: z.string(),
            value: z.number()
          })
          .nullable()
      },
      reactElement: (editDisabled: boolean) => (
        <GridItem colSpan={1}>
          <Select
            name="maritalStatus"
            placeholder="Marital Status"
            control={control}
            options={maritalOptions}
            isDisabled={editId && editDisabled}
            required={checkRequired("maritalStatus")}
          />
        </GridItem>
      )
    },
    dateOfBirth: {
      validation: {
        required: z.string().min(1, { message: "Date of Birth is required" }),
        notRequired: z.string()
      },
      reactElement: (editDisabled: boolean) => (
        <GridItem colSpan={1}>
          <TextInput
            type="date"
            name="dateOfBirth"
            label="DOB"
            control={control}
            disabled={editId && editDisabled}
            required={checkRequired("dateOfBirth")}
          />
        </GridItem>
      )
    },
    occupation: {
      validation: {
        required: z
          .object({
            label: z.string().min(1),
            value: z.number().min(0)
          })
          .refine(data => !!data?.label && !!data?.value, {
            message: "Occupation is required"
          }),
        notRequired: z
          .object({
            label: z.string(),
            value: z.number()
          })
          .nullable()
      },
      reactElement: (editDisabled: boolean) => (
        <GridItem colSpan={1}>
          <Select
            name="occupation"
            placeholder="Occupation"
            control={control}
            options={occupationOptions}
            isDisabled={editId && editDisabled}
            required={checkRequired("occupation")}
          />
        </GridItem>
      )
    },
    phoneNumber: {
      validation: {
        required: z.string().min(1, { message: "Phone Number is required" }),
        notRequired: z.string()
      },
      reactElement: (editDisabled: boolean) => (
        <GridItem>
          <TextInput
            type="text"
            name="phoneNumber"
            label="Contact Number"
            control={control}
            isDisabled={editId && editDisabled}
            required={checkRequired("phoneNumber")}
          />
        </GridItem>
      )
    },
    ssnNumber: {
      validation: {
        required: z.string().min(1, { message: "SSN Number is required" }),
        notRequired: z.string()
      },
      reactElement: (editDisabled: boolean) => (
        <GridItem colSpan={1}>
          <TextInput
            type="text"
            name="ssnNumber"
            label="SSN Number"
            control={control}
            disabled={editId && editDisabled}
            required={checkRequired("ssnNumber")}
          />
        </GridItem>
      )
    },
    gender: {
      validation: {
        required: z.string().min(1, { message: "Choose a gender" }),
        notRequired: z.string()
      },
      reactElement: (editDisabled: boolean) => (
        <GridItem
          display={"flex"}
          flexDir={"column"}
          gap={4}
          colSpan={2}
          w="100%"
        >
          <Text fontSize={"lg"}>Gender</Text>
          <Flex gap={"16px"}>
            {GenderOptions.map((data, index) => {
              return (
                <Button
                  pointerEvents={editId && editDisabled ? "none" : "all"}
                  key={index}
                  variant={"gender_button"}
                  leftIcon={<Icon as={data.icon} />}
                  _active={{
                    bg: colorScheme.primary_500,
                    color: colorScheme.white,
                    "svg > *": {
                      fill: `${colorScheme.white}!important`
                    }
                  }}
                  isActive={gender === data.label.toUpperCase()}
                  onClick={() => {
                    setValue("gender", data.label.toUpperCase());
                    setGender(data.label.toUpperCase());
                  }}
                >
                  {data.label}
                </Button>
              );
            })}
          </Flex>
        </GridItem>
      )
    }
  } as IDataFormFields;

  const personalDetailFieldList = useMemo(() => {
    return createKycFieldMappingData(
      formFieldData,
      personalDataFormFields
    )?.sort((a, b) => a?.displayOrder - b?.displayOrder);
  }, [formFieldData, gender]);
  useEffect(() => {
    try {
      const requiredFieldValidations = personalDetailFieldList.reduce(
        (acc: any, item) => {
          const fieldName = convertToCamelCase(item?.name);
          const fieldValidation = personalDataFormFields[fieldName]?.validation;

          if (fieldValidation) {
            if (item?.isRequired && item?.display) {
              acc[fieldName] = fieldValidation.required;
            } else {
              acc[fieldName] = fieldValidation.notRequired;
            }
          }
          return acc;
        },
        {}
      );

      // Only create the schema if we have validations
      if (Object.keys(requiredFieldValidations).length > 0) {
        const newSchema = z.object(requiredFieldValidations);
        setSchema(newSchema);
      } else {
        console.warn("No field validations were generated");
      }
    } catch (error) {
      console.error("Error creating schema:", error);
    }
  }, [personalDetailFieldList]);

  const onSubmitPersonalDetails = async (data: typeof defaultValues) => {
    const preparedData = {
      ...data,
      kycId: personalData?.kycId ?? null,
      email: data?.emailAddress,
      gender: data?.gender,
      maritalStatusId: data?.maritalStatus?.value,
      occupationId: data?.occupation?.value,
      dateOfBirth: data?.dateOfBirth ?? ""
    };
    try {
      await mutateKycCreate(preparedData);
      stepProps.nextStep();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Card padding={"24px"} w={"100%"} boxShadow={"none"}>
      <Text fontSize={"14px"} fontWeight={700} color={colorScheme.gray_700}>
        Personal Information
      </Text>
      <VStack
        spacing={10}
        as={"form"}
        onSubmit={handleSubmit(onSubmitPersonalDetails)}
      >
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={7} w={"100%"} pt={5}>
          {personalDetailFieldList?.map(item => (
            <Fragment key={item?.id}>{item?.display && item?.element}</Fragment>
          ))}
        </SimpleGrid>

        <Flex w={"100%"} mt={4} justifyContent={"flex-end"}>
          <Button
            colorScheme="teal"
            type="submit"
            isLoading={isKycLoading}
            isDisabled={!isValid}
          >
            Save and Continue
          </Button>
        </Flex>
      </VStack>
    </Card>
  );
};

export default PersonalDetails;
