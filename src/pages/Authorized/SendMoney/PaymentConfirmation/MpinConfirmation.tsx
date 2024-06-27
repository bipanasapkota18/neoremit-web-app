import {
  Button,
  Card,
  Center,
  Icon,
  IconButton,
  Stack,
  Text,
  useBoolean
} from "@chakra-ui/react";
import { svgAssets } from "@neoWeb/assets/images/svgs";
import TextInput from "@neoWeb/components/Form/TextInput";
import { useForm } from "react-hook-form";
import { ISendMoneyForm } from "../SendMoney";

const MpinConfirmation = ({ setPageName }: ISendMoneyForm) => {
  const [flag, setFlag] = useBoolean();
  const { control } = useForm();
  return (
    <Card padding={"24px"} gap={"16px"}>
      <Stack
        padding={4}
        borderRadius={"16px"}
        alignItems={"center"}
        gap={"32px"}
      >
        <Icon as={svgAssets.Guard} width={"82px"} height={"104px"} />
        <Text textStyle={"paymentDetailsHeader"} fontSize={"20px"}>
          MPIN Confirmation
        </Text>
        <Center minW={"358px"} display={"flex"} flexDir={"column"} gap={"32px"}>
          <TextInput
            type={flag ? "text" : "password"}
            name="mpin"
            label="Enter MPIN"
            control={control}
            endIcons={
              <IconButton
                tabIndex={-1}
                colorScheme={"black"}
                size="xs"
                variant="link"
                aria-label="password-control"
                onClick={setFlag.toggle}
                icon={
                  flag ? (
                    <svgAssets.EyeIcon height={"20px"} width={"20px"} />
                  ) : (
                    <svgAssets.EyeSlashIcon height={"20px"} width={"20px"} />
                  )
                }
              />
            }
          />
          <Button
            py={"23px"}
            minW={"342px"}
            onClick={() => {
              setPageName("invoice");
            }}
          >
            Confirm
          </Button>
        </Center>
      </Stack>
    </Card>
  );
};

export default MpinConfirmation;
