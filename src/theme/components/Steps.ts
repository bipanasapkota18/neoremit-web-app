import { StepsTheme as StepsStyleConfig } from "chakra-ui-steps";
import { colorScheme } from "../colorScheme";

export const CustomSteps = {
  ...StepsStyleConfig,
  baseStyle: (props: any) => {
    return {
      ...StepsStyleConfig.baseStyle(props),
      stepIconContainer: {
        ...StepsStyleConfig.baseStyle(props).stepIconContainer,
        _activeStep: {
          bg: colorScheme.primary_500,
          border: `${colorScheme.primary_500}`
        },
        "& .completedStep ": {
          bg: "red",
          border: `${colorScheme.primary_500}`
        }
      }
    };
  }
};
