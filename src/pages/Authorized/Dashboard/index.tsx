import {
  Box,
  Button,
  Card,
  CardBody,
  Center,
  GridItem,
  HStack,
  Icon,
  Image,
  SimpleGrid,
  Stack,
  Text,
  VStack
} from "@chakra-ui/react";
import { imageAssets } from "@neoWeb/assets/images";
import { svgAssets } from "@neoWeb/assets/images/svgs";
import Select from "@neoWeb/components/Form/SelectComponent";
import { baseURL } from "@neoWeb/services/service-axios";
import { useGetCountryList } from "@neoWeb/services/service-common";
import { colorScheme } from "@neoWeb/theme/colorScheme";
import { formatSelectOptions } from "@neoWeb/utility/format";
import { useForm } from "react-hook-form";

function Dashboard() {
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
    <>
      <VStack w="full" gap={6}>
        <Card w="full" pos="relative" overflow={"hidden"}>
          <Box sx={{ pos: "absolute", bottom: -4, right: -8 }}>
            <svgAssets.ArtifactFlower />
          </Box>
          <CardBody>
            <HStack gap={4}>
              <Image src={imageAssets.KycIllustration} />
              <Stack flex={1} gap={0}>
                <Text fontWeight={"bold"}>KYC Verification</Text>
                <Text maxW={"70%"}>
                  Kindly complete your KYC verification to initiate the money
                  transfer
                </Text>
              </Stack>
              <Button px={8} py={4} size={"sm"}>
                Verify KYC
              </Button>
            </HStack>
          </CardBody>
        </Card>
        <SimpleGrid columns={3} w={"full"} spacing={6}>
          <GridItem colSpan={2}>
            <Center
              sx={{
                color: colorScheme.white,
                p: 6,
                py: 14,
                gap: 4,
                borderRadius: 8,
                backgroundImage: `url(${imageAssets.BackgroundImage})`,
                backgroundSize: "100%, 60%",
                backgroundRepeat: "no-repeat"
              }}
              flexDir={"column"}
            >
              <VStack gap={0}>
                <Text>Conversion Rate</Text>
                <Text fontSize={"large"}>1.00 USD = 132.00 NPR</Text>
              </VStack>
              {/* PLEASE FIX THE REACT SELECT COMPOEMENT */}
              <HStack gap={4} w={"full"}>
                <Select
                  name="sendFrom"
                  options={countryOptions}
                  placeholder="Select Currency"
                  control={control}
                  noFloating
                />
                <Icon as={svgAssets.ArrowSwap} height={"24px"} width={"24px"} />
                <Select
                  name="sendTo"
                  options={countryOptions}
                  placeholder="Select Currency"
                  control={control}
                  noFloating
                />
              </HStack>
            </Center>
          </GridItem>
          <GridItem colSpan={1} rowSpan={2}>
            <Center
              bg={"white"}
              w="full"
              h="full"
              borderRadius={24}
              flexDir={"column"}
            >
              <svgAssets.NoTransaction />
              <Text>No Recent Transfers</Text>
            </Center>
          </GridItem>
          <GridItem colSpan={2}>
            <HStack bg={"white"} borderRadius={24} px={6} py={12}>
              <Stack>
                <Text fontWeight={"bold"}>Effortless Money Transfers</Text>
                <Text>
                  Effortlessly Initiate Fund Transfers with the Simple Touch of
                  a Button
                </Text>
              </Stack>
              <Button
                px={8}
                py={4}
                size={"sm"}
                leftIcon={<svgAssets.SendIcon />}
              >
                Send Money
              </Button>
            </HStack>
          </GridItem>
        </SimpleGrid>
      </VStack>
    </>
  );
}

export default Dashboard;
