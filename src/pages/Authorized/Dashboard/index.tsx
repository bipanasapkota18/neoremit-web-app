import {
  Box,
  Flex,
  GridItem,
  HStack,
  Icon,
  SimpleGrid,
  Text
} from "@chakra-ui/react";
import { imageAssets } from "@neoWeb/assets/images";
import { svgAssets } from "@neoWeb/assets/images/svgs";
import { colorScheme } from "@neoWeb/theme/colorScheme";
import ReactSelect from "react-select";

const languageOptions = [
  {
    value: "en",
    label: "English",
    icon: <svgAssets.AppleIcon />
  },
  {
    value: "de",
    label: "German",
    icon: <svgAssets.AppleIcon />
  },
  { value: "fr", label: "France", icon: <svgAssets.AppleIcon /> }
];
function Dashboard() {
  return (
    <SimpleGrid columns={3} gap={6}>
      <GridItem colSpan={2} rowSpan={1}>
        <Box
          style={{
            backgroundImage: `url(${imageAssets.BackgroundImage})`
          }}
          backgroundRepeat={"no-repeat"}
          backgroundSize={"cover"}
          // maxWidth={"609px"}
          boxShadow="0px 4px 28px 0px rgba(0, 0, 0, 0.06)"
          borderRadius={"24px"}
          display={"flex"}
          flexDir={"column"}
          gap={6}
          py={12}
        >
          <Flex flexDir={"column"} gap={2} alignItems={"center"}>
            <Text
              textAlign={"center"}
              fontSize={"17px"}
              fontWeight={600}
              color={colorScheme.gray_50}
            >
              Conversion Rate
            </Text>
            <Text
              textAlign={"center"}
              fontSize={"20px"}
              fontWeight={700}
              color={colorScheme.gray_50}
            >
              1.00 USD = 132.00 NPR
            </Text>
          </Flex>
          <HStack gap={4} justifyContent={"center"}>
            <ReactSelect
              isSearchable={false}
              defaultValue={languageOptions[0]}
              options={languageOptions}
              components={{
                IndicatorSeparator: () => null
                // DropdownIndicator: () => <svgAssets.SelectDropdown />
              }}
              styles={{
                control: styles => ({
                  ...styles,
                  minWidth: "250px",
                  padding: "4px 8px",
                  backgroundColor: colorScheme.gray_50,
                  borderRadius: "30px",
                  border: "none"
                }),
                menu: styles => ({
                  ...styles,
                  borderRadius: "12px"
                }),
                option: () => ({
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                  backgroundColor: colorScheme.white,
                  color: colorScheme.gray_800,
                  cursor: "pointer"
                })
              }}
              formatOptionLabel={({ label, icon }) => (
                <HStack
                  p={2}
                  _hover={{ backgroundColor: colorScheme.gray_50 }}
                  _active={{ backgroundColor: colorScheme.gray_50 }}
                >
                  {icon}
                  <Text
                    color={colorScheme.gray_700}
                    fontSize="14px"
                    fontStyle="normal"
                    fontWeight={500}
                  >
                    {label}
                  </Text>
                </HStack>
              )}
            />
            <Icon as={svgAssets.ArrowSwap} height={"24px"} width={"24px"} />
            <ReactSelect
              isSearchable={false}
              defaultValue={languageOptions[0]}
              options={languageOptions}
              components={{
                IndicatorSeparator: () => null
                // DropdownIndicator: () => <svgAssets.SelectDropdown />
              }}
              styles={{
                control: styles => ({
                  ...styles,
                  minWidth: "250px",
                  padding: "4px 8px",
                  backgroundColor: colorScheme.gray_50,
                  borderRadius: "30px",
                  border: "none"
                }),
                menu: styles => ({
                  ...styles,
                  borderRadius: "12px"
                }),
                option: () => ({
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                  backgroundColor: colorScheme.white,
                  color: colorScheme.gray_800,
                  cursor: "pointer"
                })
              }}
              formatOptionLabel={({ label, icon }) => (
                <HStack
                  p={2}
                  _hover={{ backgroundColor: colorScheme.gray_50 }}
                  _active={{ backgroundColor: colorScheme.gray_50 }}
                >
                  {icon}
                  <Text
                    color={colorScheme.gray_700}
                    fontSize="14px"
                    fontStyle="normal"
                    fontWeight={500}
                  >
                    {label}
                  </Text>
                </HStack>
              )}
            />
          </HStack>
        </Box>
      </GridItem>
      <GridItem
        colSpan={1}
        rowSpan={2}
        background={colorScheme.white}
        borderRadius={"24px"}
        display={"flex"}
        flexDir={"column"}
        justifyContent={"center"}
        gap={8}
        alignItems={"center"}
      >
        <Icon as={svgAssets.NoTransaction} height={"107px"} width={"107px"} />
        <Text
          textStyle={"normalStyle"}
          fontWeight={700}
          color={colorScheme.gray_700}
        >
          No recent Transfers
        </Text>
      </GridItem>
      <GridItem colSpan={2} rowSpan={1}>
        <Box
          style={{
            backgroundImage: `url(${imageAssets.BackgroundImage})`
          }}
          backgroundRepeat={"no-repeat"}
          backgroundSize={"cover"}
          // maxWidth={"609px"}
          boxShadow="0px 4px 28px 0px rgba(0, 0, 0, 0.06)"
          borderRadius={"24px"}
          display={"flex"}
          flexDir={"column"}
          gap={6}
          py={12}
        >
          <Flex flexDir={"column"} gap={2} alignItems={"center"}>
            <Text
              textAlign={"center"}
              fontSize={"17px"}
              fontWeight={600}
              color={colorScheme.gray_50}
            >
              Conversion Rate
            </Text>
            <Text
              textAlign={"center"}
              fontSize={"20px"}
              fontWeight={700}
              color={colorScheme.gray_50}
            >
              1.00 USD = 132.00 NPR
            </Text>
          </Flex>
        </Box>
      </GridItem>
    </SimpleGrid>
  );
}

export default Dashboard;
