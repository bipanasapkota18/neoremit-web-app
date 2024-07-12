import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  HStack,
  Icon,
  Image,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useBoolean
} from "@chakra-ui/react";
import { svgAssets } from "@neoWeb/assets/images/svgs";
import { DropzoneComponentControlled } from "@neoWeb/components/Form/DropzoneComponent";
import Select from "@neoWeb/components/Form/SelectComponent";
import TextInput from "@neoWeb/components/Form/TextInput";
import {
  IFeedBackResponse,
  useGetAllFeedBacks
} from "@neoWeb/services/Support/service-support";
import { colorScheme } from "@neoWeb/theme/colorScheme";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import UserGuide from "../UserGuide";
import SupportResponse from "./SupportResponse";

interface CommonProps {
  setFlag: {
    on: () => void;
    off: () => void;
    toggle: () => void;
  };
  setFeedBackId: Dispatch<SetStateAction<number | null>>;
  data?: IFeedBackResponse[];
}

//Card shown in Support Request
const SupportCard = ({ setFlag, setFeedBackId, data }: CommonProps) => {
  return (
    <>
      {data?.map(item => {
        return (
          <HStack
            key={item.id}
            p={4}
            justifyContent={"space-between"}
            bg={colorScheme.gray_50}
            borderRadius={"8px"}
            onClick={() => {
              setFlag.on();
              setFeedBackId(item.id);
            }}
            cursor={"pointer"}
          >
            <Stack gap={0}>
              <Text textStyle={"beneficiaryCardHeader"}>{item.title}</Text>
              <Text textStyle={"transaction_date"}>{item.createdDate}</Text>
            </Stack>
            <Stack>
              <Icon as={svgAssets.ArrowRightIcon} />
            </Stack>
          </HStack>
        );
      })}
    </>
  );
};

//Support Request Component
const SupportRequest = ({ setFlag, setFeedBackId }: CommonProps) => {
  const { data: allFeedBackData } = useGetAllFeedBacks();
  return (
    <Stack>
      <SupportCard
        setFlag={setFlag}
        setFeedBackId={setFeedBackId}
        data={allFeedBackData}
      />
    </Stack>
  );
};

const MyRequest = () => {
  // const { mutateAsync, data } = useGetAllSupportReasons();
  // useEffect(() => {
  //   mutateAsync({
  //     pageParams: { page: 0, size: 10 },
  //     filterParams: {}
  //   });
  // }, []);
  const { control, handleSubmit } = useForm();

  const submitData = (data: any) => {
    console.log({
      ...data,
      image: data.image[0]
    });
  };
  return (
    <Stack>
      <Stack>
        <Text fontStyle={"beneficiaryCardHeader"} fontSize={"17px"}>
          Share your suggestions, ask questions, or report concerns.
        </Text>
      </Stack>
      <Stack as={"form"} gap={3} onSubmit={handleSubmit(submitData)}>
        <Select
          control={control}
          name={"reason"}
          placeholder={"Select Reason"}
          options={[
            { label: "Reason 1", value: "reason1" },
            { label: "Reason 2", value: "reason2" }
          ]}
        />
        <TextInput
          control={control}
          name={"title"}
          placeholder={"Your Message Here"}
          type={"textarea"}
        />
        <DropzoneComponentControlled
          isSupport
          name="image"
          control={control}
          options={{ maxSize: 2 }}
        />
        <Flex justifyContent={"flex-end"}>
          <Button colorScheme="primary" type="submit">
            Submit
          </Button>
        </Flex>
      </Stack>
    </Stack>
  );
};

//Main Component
const Support = () => {
  const [flag, setFlag] = useBoolean();
  const [flag1, setFlag1] = useBoolean();
  const [feedBackId, setFeedBackId] = useState<number | null>(null);
  // const { mutateAsync, data } = useGetAllSupportRequest();
  // useEffect(() => {
  //   mutateAsync({
  //     pageParams: { page: 0, size: 10 },
  //     filterParams: { searchParam: "" }
  //   });
  // }, []);
  const tabsList = [
    {
      title: "My Request",
      content: (
        <SupportRequest setFlag={setFlag} setFeedBackId={setFeedBackId} />
      )
    },
    {
      title: "Support Request",
      content: <MyRequest />
    }
  ];
  return (
    <HStack gap={6} width={"100%"} alignItems={"start"}>
      {flag1 ? (
        <UserGuide setFlag1={setFlag1} />
      ) : (
        <>
          <Card minHeight={"88vh"} minWidth={"632px"}>
            <CardBody
              display={"flex"}
              flexDirection={"column"}
              gap={6}
              padding={6}
            >
              {flag ? (
                <SupportResponse
                  setFlag={setFlag}
                  feedBackId={feedBackId}
                  setFeedBackId={setFeedBackId}
                />
              ) : (
                <Tabs variant="unstyled">
                  <TabList gap={3}>
                    {tabsList.map((tab, index) => (
                      <Tab
                        key={index}
                        border={`1px solid ${colorScheme.normalTextColor}`}
                        padding={"12px 24px"}
                        color={colorScheme.normalTextColor}
                        borderRadius={"32px"}
                        _selected={{
                          color: "white",
                          bg: colorScheme.primary_300
                        }}
                      >
                        {tab.title}
                      </Tab>
                    ))}
                  </TabList>
                  <TabPanels>
                    {tabsList.map((tab, index) => (
                      <TabPanel key={index}>{tab.content}</TabPanel>
                    ))}
                  </TabPanels>
                </Tabs>
              )}
            </CardBody>
          </Card>
          <Stack gap={6}>
            <Card>
              <CardBody display={"flex"} flexDir={"column"} padding={6} gap={6}>
                <Stack>
                  <HStack gap={"12px"}>
                    <Box
                      p={2}
                      bg={colorScheme.primary_50}
                      alignItems={"center"}
                      display={"flex"}
                      borderRadius={"full"}
                    >
                      <Icon
                        as={svgAssets.SupportMessageIcon}
                        height={"20px"}
                        width={"20px"}
                      />
                    </Box>
                    <Stack gap={0}>
                      <Text fontWeight={700} fontSize={"17px"}>
                        User Guides
                      </Text>
                      <Text color={colorScheme.search_icon} fontSize={"14px"}>
                        Self-Help Resources
                      </Text>
                    </Stack>
                  </HStack>
                </Stack>
                <Stack gap={3}>
                  <Image
                    src="https://akm-img-a-in.tosshub.com/indiatoday/images/story/202403/youtube-music-030422307-16x9_2.jpg?VersionId=5UDdS80A8db7Rf3fgi7X10TCZ876ALo6&size=690:388"
                    objectFit={"cover"}
                    height={"117px"}
                    borderRadius={"8px"}
                  />
                  <Stack gap={0}>
                    <Text fontWeight={700} fontSize={"17px"}>
                      Title
                    </Text>
                    <Text
                      color={colorScheme.gray_700}
                      fontWeight={600}
                      fontSize={"14px"}
                    >
                      VideoLink
                    </Text>
                    <Text
                      color={colorScheme.search_icon}
                      fontSize={"14px"}
                      fontWeight={400}
                    >
                      Lorem ipsum dolor sit amet consectetur adipisicing elit
                      kuqolas asuuek
                    </Text>
                  </Stack>
                </Stack>
                <Stack alignItems={"flex-end"} fontWeight={500}>
                  <Text
                    color={colorScheme.primary_500}
                    cursor={"pointer"}
                    onClick={setFlag1.on}
                  >
                    View More
                  </Text>
                </Stack>
              </CardBody>
            </Card>
            <Card>
              <CardBody display={"flex"} flexDir={"column"} padding={6} gap={6}>
                <Stack>
                  <Text fontWeight={700} fontSize={"17px"} gap={1}>
                    Contact us
                  </Text>
                  <Text
                    color={colorScheme.search_icon}
                    fontSize={"14px"}
                    fontWeight={400}
                  >
                    Get Help From Our Support Team
                  </Text>
                </Stack>
                <Stack gap={3}>
                  <HStack alignItems={"flex-start"}>
                    <Icon
                      as={svgAssets.SupportCall}
                      height={"20px"}
                      width={"20px"}
                    />
                    <Stack gap={0}>
                      <Text>9823123211</Text>
                      <Text>9823123211</Text>
                    </Stack>
                  </HStack>
                  <HStack alignItems={"flex-start"}>
                    <Icon as={svgAssets.SMS} height={"20px"} width={"20px"} />
                    <Stack gap={0}>
                      <Text>Neoremit@gmail.com</Text>
                      <Text>Neoremit@gmail.com</Text>
                    </Stack>
                  </HStack>
                  <HStack alignItems={"flex-start"}>
                    <Icon
                      as={svgAssets.SupportCall}
                      height={"20px"}
                      width={"20px"}
                    />
                    <Stack gap={0}>
                      <Text>017829128</Text>
                      <Text>017829128</Text>
                    </Stack>
                  </HStack>
                </Stack>
              </CardBody>
            </Card>
          </Stack>
        </>
      )}
    </HStack>
  );
};

export default Support;
