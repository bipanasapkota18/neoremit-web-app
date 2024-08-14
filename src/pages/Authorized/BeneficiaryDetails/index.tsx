import {
  Button,
  Card,
  CardBody,
  Center,
  Flex,
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
import { NAVIGATION_ROUTES } from "@neoWeb/pages/App/navigationRoutes";
import { useGetBeneficiary } from "@neoWeb/services/service-beneficiary";
import { PageParams } from "@neoWeb/services/Support/service-faq";
import { useEffect, useRef, useState } from "react";
import ViAmericaAddBeneficiary from "./ViAmericaAddBeneficiary";
const BeneficiaryDetails = () => {
  const [pageParams, setPageParams] = useState<PageParams>({
    pageIndex: 0,
    pageSize: 20
  });
  const { data, mutateAsync, isPending } = useGetBeneficiary();

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
      filterParams: {}
    });
  }, [pageParams]);

  const lastScrollTop = useRef(0);
  const scrollTimeout = useRef<number | null>(null);

  const handleScroll = () => {
    if (scrollTimeout.current !== null) {
      window.clearTimeout(scrollTimeout.current);
    }

    scrollTimeout.current = window.setTimeout(() => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const scrollPosition = window.innerHeight + scrollTop;
      const pageHeight = document.documentElement.scrollHeight;
      const buffer = 100; // pixels before bottom

      if (
        scrollTop > lastScrollTop.current &&
        pageHeight - scrollPosition < buffer
      ) {
        setPageParams(prev => ({
          ...prev,
          pageSize: prev.pageSize + 10
        }));
      }

      lastScrollTop.current = scrollTop;
    }, 100);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout.current !== null) {
        window.clearTimeout(scrollTimeout.current);
      }
    };
  }, [window.scroll]);

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
              alignItems={
                data?.data?.data?.beneficiaryDetailList?.length === 0
                  ? "center"
                  : "flex-end"
              }
              width={"100%"}
              gap={4}
            >
              {data?.data?.data?.beneficiaryDetailList?.length === 0 ? (
                <>
                  {" "}
                  <Stack
                    flexDirection={"column"}
                    alignItems={"center"}
                    gap={8}
                    padding={6}
                  >
                    <Icon
                      as={svgAssets.NoBeneficiary}
                      height={"287px"}
                      w={"343px"}
                    />
                    <Flex flexDir={"column"} gap={2} alignItems={"center"}>
                      <Text fontSize={"17px"} fontWeight={"700"}>
                        No Data Available
                      </Text>
                      <Text fontSize={"14px"} fontWeight={"400"}>
                        It seems there is no content here yet.
                      </Text>
                    </Flex>
                  </Stack>
                </>
              ) : (
                <VStack alignItems={"flex-start"} width={"100%"} gap={4}>
                  <Heading fontSize={"17px"}>Beneficiary</Heading>

                  <SimpleGrid
                    w={"100%"}
                    columns={{ base: 1, sm: 1, md: 1, lg: 2, xl: 2 }}
                    gap={4}
                  >
                    {data?.data?.data?.beneficiaryDetailList?.map(
                      (item, index) => (
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
                      )
                    )}
                  </SimpleGrid>
                </VStack>
              )}
              <Button
                onClick={setFlag.on}
                minW={
                  data?.data?.data?.beneficiaryDetailList?.length === 0
                    ? "45%"
                    : "max-content"
                }
                py={"25px"}
              >
                Add Beneficiary
              </Button>
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
