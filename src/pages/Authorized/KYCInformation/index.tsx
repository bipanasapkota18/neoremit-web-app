import { Box, Stack } from "@chakra-ui/react";
import { svgAssets } from "@neoWeb/assets/images/svgs";
import BreadCrumbs from "@neoWeb/components/BreadCrumbs";
import { NAVIGATION_ROUTES } from "@neoWeb/pages/App/navigationRoutes";
import {
  KycFormField,
  useGetCountryFields
} from "@neoWeb/services/service-kyc";
import { useStoreInitData } from "@neoWeb/store/initData";
import { colorScheme } from "@neoWeb/theme/colorScheme";
import { Step, Steps, useSteps } from "chakra-ui-steps";
import AddressDetails from "./AddressDetails";
import DocumentDetail from "./DocumentDetails";
import PersonalDetails from "./PersonalDetails";
export interface IStepProps {
  stepProps: {
    nextStep: () => void;
    prevStep: () => void;
  };
  formFieldData: KycFormField[];
}

export interface IDataFormFields {
  [key: string]: {
    validation?: any;
    reactElement: (editDisabled: boolean) => JSX.Element;
  };
}

interface CategorizedKycFields {
  personalDetails: KycFormField[];
  addressDetails: KycFormField[];
  documentDetails: KycFormField[];
}

export default function KYCInformation() {
  const { initData } = useStoreInitData();

  const { nextStep, prevStep, activeStep, setStep } = useSteps({
    initialStep: 0
  });
  // const navigate = useNavigate();

  // const [searchParams] = useSearchParams();

  const { data: countryKycFieldValues } = useGetCountryFields(
    initData?.sendingCountry?.id ?? null
  );

  const categorizedFields = categorizeKycFields(
    countryKycFieldValues?.data?.data?.kycFormField ?? []
  );
  const steps = [
    {
      label: "Personal Detail",
      icon: svgAssets.PersonalDetail,
      component: (
        <PersonalDetails
          stepProps={{ nextStep, prevStep }}
          formFieldData={categorizedFields?.personalDetails}
        />
      )
    },
    {
      label: "Address Detail",
      icon: svgAssets.AddressDetail,
      component: (
        <AddressDetails
          stepProps={{ nextStep, prevStep }}
          formFieldData={categorizedFields?.addressDetails}
        />
      )
    },
    {
      label: "Document Detail",
      icon: svgAssets.DocumentDetail,
      component: (
        <DocumentDetail
          stepProps={{ nextStep, prevStep }}
          formFieldData={categorizedFields?.documentDetails}
        />
      )
    }
  ];

  // const hasCompletedAllSteps = activeStep === steps.length;

  // if (hasCompletedAllSteps) {
  //   navigate(NAVIGATION_ROUTES.KYC);
  // }
  const bg = "white";
  const pages = [
    {
      pageName: "Account",
      href: NAVIGATION_ROUTES.ACCOUNT
    },
    {
      pageName: "KYC",
      href: NAVIGATION_ROUTES.KYC_INFORMATION,
      isCurrentPage: true
    }
  ];
  return (
    <Stack gap={0} width="100%" userSelect={"none"}>
      <BreadCrumbs pages={pages} />
      <Steps
        onClickStep={i => {
          activeStep > i ? setStep(i) : null;
        }}
        pointerEvents={"auto"}
        variant={"circles-alt"}
        colorScheme="primary"
        sx={{
          backgroundColor: "#FFFFFF",
          paddingTop: "24px"
        }}
        trackColor={colorScheme.primary_200}
        activeStep={activeStep}
      >
        {steps.map(({ label, icon, component }) => (
          <Step checkIcon={icon} label={label} key={label} icon={icon}>
            <Box sx={{ bg, rounded: "md" }}>{component}</Box>
          </Step>
        ))}
      </Steps>
    </Stack>
  );
}

//Util Functions for KYCInformation
function categorizeKycFields(fields: KycFormField[]): CategorizedKycFields {
  const personalDetails: KycFormField[] = [];
  const addressDetails: KycFormField[] = [];
  const documentDetails: KycFormField[] = [];

  fields.forEach(field => {
    switch (field.keyField.category) {
      case "PERSONAL_INFORMATION":
        personalDetails.push(field);
        break;
      case "ADDRESS_INFORMATION":
        addressDetails.push(field);
        break;
      case "DOCUMENT_INFORMATION":
        documentDetails.push(field);
        break;
    }
  });

  return { personalDetails, addressDetails, documentDetails };
}

export function convertToCamelCase(str: string) {
  return str.replace(/_([a-z])/g, function (match, letter) {
    return letter.toUpperCase();
  });
}

export function createKycFieldMappingData(
  data: KycFormField[],
  personalDataFormFields: IDataFormFields
) {
  return data?.map(item => {
    return {
      id: item?.id,
      display: item?.display,
      allowUpdate: item?.allowUpdate,
      isRequired: item?.isRequired,
      label: item?.keyField?.label,
      name: item?.keyField?.name,
      displayOrder: item?.keyField?.displayOrder,
      keyFieldId: item?.keyField?.id,
      element: personalDataFormFields[
        convertToCamelCase(item?.keyField?.name)
      ]?.reactElement(item?.allowUpdate)
    };
  });
}
