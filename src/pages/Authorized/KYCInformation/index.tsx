import { Box, Flex } from "@chakra-ui/react";
import { svgAssets } from "@neoWeb/assets/images/svgs";
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

  // const { pathname } = useLocation();
  // const activePath = breadcrumbTitle(pathname);

  return (
    <Flex flexDir="column" gap={"16px"} width="100%" userSelect={"none"}>
      <Steps
        onClickStep={i => {
          activeStep > i ? setStep(i) : null;
        }}
        pointerEvents={"auto"}
        variant={"circles-alt"}
        colorScheme="none"
        sx={{
          backgroundColor: "#FFF",
          padding: "24px",
          borderRadius: "32px",
          border: "1px solid  #E2E8F0",
          boxShadow: "md",

          "& .cui-steps__horizontal-step-container": {
            display: "flex",
            width: "100%",
            justifyContent: "flex-start",
            columnGap: 3,
            position: "relative"
          },
          "& .cui-steps__horizontal-step": {
            "&::after": {
              backgroundColor: "#CBD5E0 !important",
              borderRadius: "4px !important"
            },
            display: "flex",
            justifyContent: "space-between",
            padding: "0 1%",
            minWidth: "230px",
            "& .cui-steps__step-icon-container": {
              backgroundColor: `${colorScheme.primary_100}`,
              _activeStep: {
                backgroundColor: `${colorScheme.primary_500}`,
                svg: {
                  path: {
                    fill: "#EFEAF4"
                  }
                }
              }
            },
            _active: {
              span: {
                color: "#2D3748"
              }
            }
          }
        }}
        activeStep={activeStep}
      >
        {steps.map(({ label, icon, component }) => (
          <Step checkIcon={icon} label={label} key={label} icon={icon}>
            <Box sx={{ bg, my: 8, rounded: "md" }}>{component}</Box>
          </Step>
        ))}
      </Steps>
    </Flex>
  );
}

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
