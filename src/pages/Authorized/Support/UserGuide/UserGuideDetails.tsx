import { Stack, Text } from "@chakra-ui/react";
import { HelpSetupResponseDtoList } from "@neoWeb/services/Support/service-support";
import { colorScheme } from "@neoWeb/theme/colorScheme";
import parse from "html-react-parser";

interface UserGuideDetailsProps {
  guideId: number | null;
  guideData: HelpSetupResponseDtoList[];
}

const UserGuideDetails = ({ guideData, guideId }: UserGuideDetailsProps) => {
  const selectedGuide = guideData?.find((item: any) => item.id === guideId);
  return (
    <Stack gap={2}>
      <iframe
        width="790"
        height="480"
        src={`https://www.youtube.com/embed/Tn6-PIqc4UM?autoplay=1`}
        allow="autoplay; encrypted-media; "
        allowFullScreen
        title="Youtube Video"
      />
      <Text
        fontSize={"17px"}
        fontWeight={700}
        color={colorScheme.gray_700}
        maxW={"790px"}
        pl={2}
      >
        {selectedGuide?.title}
      </Text>
      <Text fontSize={"14px"} pl={2} fontWeight={400} maxW={"790px"}>
        {parse(selectedGuide?.description ?? "")}
      </Text>
    </Stack>
  );
};

export default UserGuideDetails;
