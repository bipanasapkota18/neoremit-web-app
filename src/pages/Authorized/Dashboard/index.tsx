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
    // <SimpleGrid columns={3} gap={6}>
    //   <GridItem colSpan={2} rowSpan={1}>
    //     <Box
    //       style={{
    //         backgroundImage: `url(${imageAssets.BackgroundImage})`
    //       }}
    //       backgroundRepeat={"no-repeat"}
    //       backgroundSize={"cover"}
    //       // maxWidth={"609px"}
    //       boxShadow="0px 4px 28px 0px rgba(0, 0, 0, 0.06)"
    //       borderRadius={"24px"}
    //       display={"flex"}
    //       flexDir={"column"}
    //       gap={6}
    //       py={12}
    //     >
    //       <Flex flexDir={"column"} gap={2} alignItems={"center"}>
    //         <Text
    //           textAlign={"center"}
    //           fontSize={"17px"}
    //           fontWeight={600}
    //           color={colorScheme.gray_50}
    //         >
    //           Conversion Rate
    //         </Text>
    //         <Text
    //           textAlign={"center"}
    //           fontSize={"20px"}
    //           fontWeight={700}
    //           color={colorScheme.gray_50}
    //         >
    //           1.00 USD = 132.00 NPR
    //         </Text>
    //       </Flex>
    //       <HStack gap={4} justifyContent={"center"}>
    //         <ReactSelect
    //           isSearchable={false}
    //           defaultValue={languageOptions[0]}
    //           options={languageOptions}
    //           components={{
    //             IndicatorSeparator: () => null
    //             // DropdownIndicator: () => <svgAssets.SelectDropdown />
    //           }}
    //           styles={{
    //             control: styles => ({
    //               ...styles,
    //               minWidth: "250px",
    //               padding: "4px 8px",
    //               backgroundColor: colorScheme.gray_50,
    //               borderRadius: "30px",
    //               border: "none"
    //             }),
    //             menu: styles => ({
    //               ...styles,
    //               borderRadius: "12px"
    //             }),
    //             option: () => ({
    //               display: "flex",
    //               flexDirection: "column",
    //               gap: "4px",
    //               backgroundColor: colorScheme.white,
    //               color: colorScheme.gray_800,
    //               cursor: "pointer"
    //             })
    //           }}
    //           formatOptionLabel={({ label, icon }) => (
    //             <HStack
    //               p={2}
    //               _hover={{ backgroundColor: colorScheme.gray_50 }}
    //               _active={{ backgroundColor: colorScheme.gray_50 }}
    //             >
    //               {icon}
    //               <Text
    //                 color={colorScheme.gray_700}
    //                 fontSize="14px"
    //                 fontStyle="normal"
    //                 fontWeight={500}
    //               >
    //                 {label}
    //               </Text>
    //             </HStack>
    //           )}
    //         />
    //         <Icon as={svgAssets.ArrowSwap} height={"24px"} width={"24px"} />
    //         <ReactSelect
    //           isSearchable={false}
    //           defaultValue={languageOptions[0]}
    //           options={languageOptions}
    //           components={{
    //             IndicatorSeparator: () => null
    //             // DropdownIndicator: () => <svgAssets.SelectDropdown />
    //           }}
    //           styles={{
    //             control: styles => ({
    //               ...styles,
    //               minWidth: "250px",
    //               padding: "4px 8px",
    //               backgroundColor: colorScheme.gray_50,
    //               borderRadius: "30px",
    //               border: "none"
    //             }),
    //             menu: styles => ({
    //               ...styles,
    //               borderRadius: "12px"
    //             }),
    //             option: () => ({
    //               display: "flex",
    //               flexDirection: "column",
    //               gap: "4px",
    //               backgroundColor: colorScheme.white,
    //               color: colorScheme.gray_800,
    //               cursor: "pointer"
    //             })
    //           }}
    //           formatOptionLabel={({ label, icon }) => (
    //             <HStack
    //               p={2}
    //               _hover={{ backgroundColor: colorScheme.gray_50 }}
    //               _active={{ backgroundColor: colorScheme.gray_50 }}
    //             >
    //               {icon}
    //               <Text
    //                 color={colorScheme.gray_700}
    //                 fontSize="14px"
    //                 fontStyle="normal"
    //                 fontWeight={500}
    //               >
    //                 {label}
    //               </Text>
    //             </HStack>
    //           )}
    //         />
    //       </HStack>
    //     </Box>
    //   </GridItem>
    //   <GridItem
    //     colSpan={1}
    //     rowSpan={2}
    //     background={colorScheme.white}
    //     borderRadius={"24px"}
    //     display={"flex"}
    //     flexDir={"column"}
    //     justifyContent={"center"}
    //     gap={8}
    //     alignItems={"center"}
    //   >
    //     <Icon as={svgAssets.NoTransaction} height={"107px"} width={"107px"} />
    //     <Text
    //       textStyle={"normalStyle"}
    //       fontWeight={700}
    //       color={colorScheme.gray_700}
    //     >
    //       No recent Transfers
    //     </Text>
    //   </GridItem>
    //   <GridItem colSpan={2} rowSpan={1}>
    //     <Box
    //       style={{
    //         backgroundImage: `url(${imageAssets.BackgroundImage})`
    //       }}
    //       backgroundRepeat={"no-repeat"}
    //       backgroundSize={"cover"}
    //       // maxWidth={"609px"}
    //       boxShadow="0px 4px 28px 0px rgba(0, 0, 0, 0.06)"
    //       borderRadius={"24px"}
    //       display={"flex"}
    //       flexDir={"column"}
    //       gap={6}
    //       py={12}
    //     >
    //       <Flex flexDir={"column"} gap={2} alignItems={"center"}>
    //         <Text
    //           textAlign={"center"}
    //           fontSize={"17px"}
    //           fontWeight={600}
    //           color={colorScheme.gray_50}
    //         >
    //           Conversion Rate
    //         </Text>
    //         <Text
    //           textAlign={"center"}
    //           fontSize={"20px"}
    //           fontWeight={700}
    //           color={colorScheme.gray_50}
    //         >
    //           1.00 USD = 132.00 NPR
    //         </Text>
    //       </Flex>
    //     </Box>
    //   </GridItem>
    // </SimpleGrid>
  );
}

export default Dashboard;
