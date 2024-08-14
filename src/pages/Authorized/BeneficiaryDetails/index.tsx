import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  Card,
  CardBody,
  Center,
  Flex,
  HStack,
  Heading,
  Icon,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
  VStack,
  useBoolean
} from "@chakra-ui/react";
import { svgAssets } from "@neoWeb/assets/images/svgs";
import BeneficiaryCard from "@neoWeb/components/Beneficiary/BeneficiaryCard";
import BreadCrumbs from "@neoWeb/components/BreadCrumbs";
import SearchInput from "@neoWeb/components/Form/SearchInput";
import { NAVIGATION_ROUTES } from "@neoWeb/pages/App/navigationRoutes";
import {
  BeneficiaryDetailList,
  useGetBeneficiary
} from "@neoWeb/services/service-beneficiary";
import { PageParams } from "@neoWeb/services/Support/service-faq";
import { useEffect, useState } from "react";
import ViAmericaAddBeneficiary from "./ViAmericaAddBeneficiary";

const NoBeneficiary = () => {
  return (
    <Stack flexDirection={"column"} alignItems={"center"} gap={8} padding={6}>
      <Icon as={svgAssets.NoBeneficiary} height={"287px"} w={"343px"} />
      <Flex flexDir={"column"} gap={2} alignItems={"center"}>
        <Text fontSize={"17px"} fontWeight={"700"}>
          No Data Available
        </Text>
        <Text fontSize={"14px"} fontWeight={"400"}>
          It seems there is no content here yet.
        </Text>
      </Flex>
    </Stack>
  );
};
const BeneficiaryDetails = () => {
  const [pageParams, setPageParams] = useState<PageParams>({
    pageIndex: 0,
    pageSize: 10
  });

  const [searchText, setSearchText] = useState<string>("");
  const [beneficiaryData, setBeneficiaryData] = useState<
    BeneficiaryDetailList[]
  >([]);
  const { data, mutateAsync, isPending } = useGetBeneficiary();

  useEffect(() => {
    // setBeneficiaryData(prev => [
    //   ...prev,
    //   ...(data?.data?.data?.beneficiaryDetailList ?? [])
    // ]);
    setBeneficiaryData(data?.data?.data?.beneficiaryDetailList ?? []);
  }, [data]);
  const [flag, setFlag] = useBoolean();
  const [editId, setEditId] = useState<number | null>(null);
  const pages = [
    {
      pageName: flag ? "Add Beneficiary" : "Beneficiary",
      href: NAVIGATION_ROUTES.BENEFICIARY,
      isCurrentPage: true
    }
  ];

  useEffect(() => {
    mutateAsync({
      pageParams: pageParams,
      filterParams: {
        searchParam: searchText
      }
    });
  }, [pageParams, searchText]);

  // const lastScrollTop = useRef(0);
  // const scrollTimeout = useRef<number | null>(null);

  // const handleScroll = () => {
  //   if (scrollTimeout.current !== null) {
  //     window.clearTimeout(scrollTimeout.current);
  //   }

  //   scrollTimeout.current = window.setTimeout(() => {
  //     const scrollTop =
  //       window.pageYOffset || document.documentElement.scrollTop;
  //     const scrollPosition = window.innerHeight + scrollTop;
  //     const pageHeight = document.documentElement.scrollHeight;
  //     const buffer = 100; // pixels before bottom

  //     if (
  //       scrollTop > lastScrollTop.current &&
  //       pageHeight - scrollPosition < buffer
  //     ) {
  //       setPageParams(prev => ({
  //         pageIndex: prev.pageIndex + 1,
  //         pageSize: prev.pageSize + 10
  //       }));
  //     }

  //     lastScrollTop.current = scrollTop;
  //   }, 100);
  // };

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll, { passive: true });

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //     if (scrollTimeout.current !== null) {
  //       window.clearTimeout(scrollTimeout.current);
  //     }
  //   };
  // }, [window.scroll]);

  return (
    <Stack>
      <BreadCrumbs pages={pages} />

      {!flag ? (
        <Card background={"#FEFEFE"} borderRadius="24px" alignItems={"center"}>
          {isPending ? (
            <Center height={"70vh"}>
              <Spinner size={"xl"} />
            </Center>
          ) : (
            <CardBody
              display={"flex"}
              flexDir={"column"}
              alignItems={"center"}
              width={"100%"}
              gap={4}
            >
              {beneficiaryData?.length === 0 && searchText == "" ? (
                <NoBeneficiary />
              ) : (
                <VStack alignItems={"flex-start"} width={"100%"} gap={6}>
                  <Heading fontSize={"17px"}>Beneficiary</Heading>
                  <HStack w={"100%"} justifyContent={"space-between"}>
                    <SearchInput
                      type="text"
                      name="searchText"
                      onSearch={setSearchText}
                      flex={0.5}
                      label="Search Beneficiary"
                    />
                    <Button
                      onClick={setFlag.on}
                      py={"25px"}
                      px={"25px"}
                      marginLeft={
                        beneficiaryData?.length === 0 ? "none" : "auto"
                      }
                    >
                      Add Beneficiary
                    </Button>
                  </HStack>
                  {beneficiaryData?.length === 0 ? (
                    <Flex w={"100%"} justifyContent={"space-around"}>
                      <NoBeneficiary />
                    </Flex>
                  ) : (
                    <SimpleGrid
                      w={"100%"}
                      columns={{ base: 1, sm: 1, md: 1, lg: 2, xl: 2 }}
                      gap={4}
                    >
                      {beneficiaryData?.map((item, index) => (
                        <BeneficiaryCard
                          setBeneficiaryEditId={setEditId}
                          setFlag={setFlag}
                          id={item?.id}
                          fullName={item?.fullName}
                          address={item?.address}
                          mobileNumber={item?.mobileNumber}
                          profileImage={item?.profileImage}
                          key={index}
                        />
                      ))}
                    </SimpleGrid>
                  )}
                </VStack>
              )}
              {data && data?.data?.data?.totalItems > pageParams?.pageSize ? (
                <Flex
                  justifyContent={"center"}
                  fontSize={"15px"}
                  cursor={"pointer"}
                  onClick={() => {
                    setPageParams(prev => ({
                      ...prev,
                      pageSize: prev.pageSize + 10
                    }));
                  }}
                >
                  View More
                  <Icon
                    boxSize={5}
                    as={ChevronDownIcon}
                    alignItems={"center"}
                  />
                </Flex>
              ) : null}

              {beneficiaryData?.length === 0 && searchText == "" && (
                <Button
                  onClick={setFlag.on}
                  minW={"45%"}
                  py={"25px"}
                  marginLeft={"none"}
                >
                  Add Beneficiary
                </Button>
              )}
            </CardBody>
          )}
        </Card>
      ) : (
        <ViAmericaAddBeneficiary
          editBeneficiaryId={editId}
          setBeneficiaryEditId={setEditId}
          setFlag={setFlag}
        />
      )}
    </Stack>
  );
};

export default BeneficiaryDetails;
