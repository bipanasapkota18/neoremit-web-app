import { Box, HStack, Stack, Text } from "@chakra-ui/react";
import GoBack from "@neoWeb/components/Button";
import { useGetCommentByFeedBack } from "@neoWeb/services/Support/service-support";
import { Dispatch, SetStateAction } from "react";

interface SupportResponseProps {
  setFlag: {
    on: () => void;
    off: () => void;
    toggle: () => void;
  };
  feedBackId: number | null;
  setFeedBackId: Dispatch<SetStateAction<number | null>>;
}

const SupportResponse = ({
  setFlag,
  feedBackId,
  setFeedBackId
}: SupportResponseProps) => {
  const { data: commentData } = useGetCommentByFeedBack(feedBackId ?? 0);
  return (
    <Stack gap={6}>
      <Box>
        <GoBack
          onClick={() => {
            setFlag.off();
            setFeedBackId(null);
          }}
        />
      </Box>
      <Stack>
        {commentData?.map((item, index) => {
          return (
            <Stack key={index} gap={4}>
              <HStack justifyContent={"space-between"}>
                <HStack gap={3}>
                  <Text
                    color={"#2D3748"}
                    fontWeight={700}
                    fontSize={"14px"}
                    w={"100px"}
                    px={2}
                  >
                    {item.commentUserName}
                  </Text>

                  <Text color={"#2D3748"} fontWeight={400} fontSize={"14px"}>
                    {item.content}
                  </Text>
                </HStack>
                <HStack></HStack>
              </HStack>
            </Stack>
          );
        })}
      </Stack>
    </Stack>
  );
};

export default SupportResponse;
