import {
  Box,
  Button,
  Card,
  CardBody,
  GridItem,
  HStack,
  Icon,
  SimpleGrid,
  Text
} from "@chakra-ui/react";
import { svgAssets } from "@neoWeb/assets/images/svgs";
import Select from "@neoWeb/components/Form/SelectComponent";
import TextInput from "@neoWeb/components/Form/TextInput";
import { baseURL } from "@neoWeb/services/service-axios";
import { useGetCountryList } from "@neoWeb/services/service-common";
import { colorScheme } from "@neoWeb/theme/colorScheme";
import { formatSelectOptions } from "@neoWeb/utility/format";
import { useForm } from "react-hook-form";

const SendMoney = () => {
  const { data: countriesList } = useGetCountryList();

  const countryOptions = formatSelectOptions<number>({
    data: countriesList?.data?.data,
    labelKey: "name",
    valueKey: "id",
    icon: {
      iconKey: "flagIcon",
      iconPath: `${baseURL}/document-service/master/flag-icon?fileId=`,
      iconCode: "flagIcon"
    }
  });
  const { control } = useForm();
  return (
    <Card>
      <CardBody display={"flex"} flexDir={"column"} padding={6} gap={4}>
        <Box
          textStyle={"normalStyle"}
          color={colorScheme.gray_700}
          fontWeight={700}
        >
          Send Money
        </Box>
        <Box
          w="full"
          pos="relative"
          backgroundColor={colorScheme.gray_100}
          display={"flex"}
          flexDir={"column"}
          alignItems={"center"}
          overflow={"hidden"}
          gap={1}
          borderRadius={"8px"}
          padding={6}
        >
          <Text
            textStyle={"normalStyle"}
            color={colorScheme.sideBar_text}
            fontWeight={600}
          >
            Sending Amount
          </Text>
          <Text
            fontSize={"20px"}
            fontWeight={700}
            color={colorScheme.primary_500}
          >
            $00.00
          </Text>
          <Box sx={{ pos: "absolute", top: 7, right: -8 }}>
            <svgAssets.ArtifactFlower />
          </Box>
        </Box>
        <SimpleGrid columns={2} gap={4}>
          <GridItem colSpan={2}>
            <HStack gap={4} w={"full"}>
              <Select
                name="sendFrom"
                options={countryOptions}
                placeholder="Sending From"
                control={control}
                noFloating
              />
              <Icon as={svgAssets.ArrowSwap} height={"24px"} width={"24px"} />
              <Select
                name="sendTo"
                options={countryOptions}
                placeholder="Receiving"
                control={control}
                noFloating
              />
            </HStack>
          </GridItem>
          <GridItem colSpan={1}>
            <TextInput
              control={control}
              name="sendAmount"
              type="number"
              label="You Send"
            />
          </GridItem>
          <GridItem colSpan={1}>
            <TextInput
              control={control}
              name="receiveAmount"
              type="number"
              label="Receiver Receives"
            />
          </GridItem>
          <GridItem mt={2} colSpan={1}>
            <Select
              name="method"
              options={countryOptions}
              placeholder="Select Payment Method"
              control={control}
              noFloating
            />
          </GridItem>
        </SimpleGrid>
        <HStack justifyContent={"space-between"}>
          <Button>GoBack</Button>
          <Button>Send Money</Button>
        </HStack>
      </CardBody>
    </Card>
  );
};
export default SendMoney;
