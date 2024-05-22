import {
  Button,
  Flex,
  GridItem,
  Select,
  SimpleGrid,
  Stack,
  VStack
} from "@chakra-ui/react";
import { svgAssets } from "@neoWeb/assets/images/svgs";
import TextInput from "@neoWeb/components/Form/TextInput";
import { useForm } from "react-hook-form";

// const defaultValues = {
//   sendFrom: null as ISelectOptions<number> | null,
//   receiveIn: null as ISelectOptions<number> | null,
//   contactNumber: null as number | null,
//   referralCode: ""
// };
const AdditionalInformation = () => {
  // const { data: countriesList } = useGetCountryList();

  // const countryOptions = formatSelectOptions<number>({
  //   data: countriesList?.data?.data,
  //   labelKey: "name",
  //   valueKey: "id"
  // });
  const { control } = useForm();
  return (
    <Flex gap={8} flexDir={"column"}>
      <VStack
        as="form"
        alignItems={"stretch"}
        justifyContent={"flex-start"}
        gap={8}
      >
        <Stack gap={6} width={"100%"}>
          <SimpleGrid columns={2} gap={"20px"}>
            <GridItem>
              <Select name="sendFrom" placeholder="Send From" />
            </GridItem>

            <GridItem>
              <Select name="receiveIn" placeholder="Receive In" />
            </GridItem>
            <GridItem colSpan={2}>
              <TextInput
                startIcon={<svgAssets.CallIcon />}
                control={control}
                type="text"
                name="contactNumber"
                placeholder="Contact Number"
              />
            </GridItem>
            <GridItem colSpan={2}>
              <TextInput
                startIcon={<svgAssets.SecurityIcon />}
                control={control}
                type="text"
                name="referralCode"
                placeholder="Referral Code"
              />
            </GridItem>
          </SimpleGrid>
        </Stack>
        <Button type="submit" size="lg">
          Proceed
        </Button>
      </VStack>
    </Flex>
  );
};
export default AdditionalInformation;
