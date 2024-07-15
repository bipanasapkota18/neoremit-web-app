import {
  Box,
  Card,
  CardBody,
  Center,
  Flex,
  Image,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
  useBoolean
} from "@chakra-ui/react";
import BreadCrumbs from "@neoWeb/components/BreadCrumbs";
import GoBack from "@neoWeb/components/Button";
import CardPagination from "@neoWeb/components/CardPagination";
import { NAVIGATION_ROUTES } from "@neoWeb/pages/App/navigationRoutes";
import { useGetAllUserGuides } from "@neoWeb/services/Support/service-support";
import { colorScheme } from "@neoWeb/theme/colorScheme";
import parse from "html-react-parser";
import { useEffect, useState } from "react";
import UserGuideDetails from "./UserGuideDetails";
export interface CommonProps {
  setFlag1: {
    on: () => void;
    off: () => void;
    toggle: () => void;
  };
}
const UserGuide = ({ setFlag1 }: CommonProps) => {
  const [flag, setFlag] = useBoolean();
  const [guideId, setGuideId] = useState<number | null>(null); // [1
  const {
    mutateAsync,
    data,
    isPending: isDataFetchLoading
  } = useGetAllUserGuides();
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [pageSize, setPageSize] = useState(9);
  useEffect(() => {
    mutateAsync({
      pageParams: { page: pageIndex, size: pageSize },
      filterParams: { searchParam: "" }
    });
  }, [pageIndex, pageSize]);
  const pages = [
    {
      pageName: "Support",
      href: NAVIGATION_ROUTES.SUPPORT
    },
    {
      pageName: "User Guide",
      isCurrentPage: true
    }
  ];
  return (
    <Stack>
      <BreadCrumbs pages={pages} />

      <Card>
        <CardBody display={"flex"} gap={6} flexDirection={"column"}>
          <Box>
            <GoBack onClick={() => (flag ? setFlag.off() : setFlag1.off())} />
          </Box>
          {isDataFetchLoading ? (
            <Center height={"80vh"} w={"97vh"}>
              <Spinner />
            </Center>
          ) : flag ? (
            <UserGuideDetails
              guideData={data?.data?.data?.helpSetupResponseDtoList ?? []}
              guideId={guideId}
            />
          ) : (
            <Stack gap={2}>
              <SimpleGrid columns={3} spacing={4}>
                {data?.data?.data?.helpSetupResponseDtoList?.map(
                  (item, index) => {
                    return (
                      <Card key={index} bg={colorScheme.gray_50}>
                        <CardBody
                          display={"flex"}
                          flexDir={"column"}
                          gap={3}
                          cursor={"pointer"}
                          onClick={() => {
                            setFlag.on();
                            setGuideId(item.id);
                          }}
                        >
                          <Flex justifyContent={"center"}>
                            <Image
                              src="https://akm-img-a-in.tosshub.com/indiatoday/images/story/202403/youtube-music-030422307-16x9_2.jpg?VersionId=5UDdS80A8db7Rf3fgi7X10TCZ876ALo6&size=690:388"
                              objectFit={"cover"}
                              height={"117px"}
                              borderRadius={"8px"}
                            />
                          </Flex>
                          <Stack gap={0}>
                            <Text fontWeight={700} fontSize={"17px"}>
                              {item.title}
                            </Text>
                            <Text
                              color={colorScheme.gray_700}
                              fontWeight={600}
                              fontSize={"14px"}
                            >
                              {item.link}
                            </Text>
                            <Text
                              color={colorScheme.search_icon}
                              fontSize={"14px"}
                              fontWeight={400}
                              noOfLines={2}
                            >
                              {parse(item.description)}
                            </Text>
                          </Stack>
                        </CardBody>
                      </Card>
                    );
                  }
                )}
              </SimpleGrid>
              <CardPagination
                dataLength={data?.data?.data?.totalItems}
                pageSize={pageSize}
                setPageSize={setPageSize}
                setPageIndex={setPageIndex}
                pageIndex={pageIndex}
              />
            </Stack>
          )}
        </CardBody>
      </Card>
    </Stack>
  );
};

export default UserGuide;
