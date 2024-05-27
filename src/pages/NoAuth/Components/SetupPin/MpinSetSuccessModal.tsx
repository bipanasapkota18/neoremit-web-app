import {
  Button,
  Icon,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text
} from "@chakra-ui/react";
import { svgAssets } from "@neoWeb/assets/images/svgs";
import { NAVIGATION_ROUTES } from "@neoWeb/pages/App/navigationRoutes";
import { useNavigate } from "react-router-dom";

interface MpinSetSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const MpinSetSuccessModal = ({ isOpen, onClose }: MpinSetSuccessModalProps) => {
  const navigate = useNavigate();
  const handleClick = () => {
    onClose();
    navigate(NAVIGATION_ROUTES.LOGIN);
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent padding={6} gap={2} borderRadius={"32px"}>
        <ModalBody
          display={"flex"}
          alignItems={"center"}
          flexDirection={"column"}
        >
          <Icon as={svgAssets.PinSetSuccess} height={"240px"} width={"240px"} />
          <Text fontSize={"20px"} fontWeight={800} color={"1A202C"}>
            Successfully Registered
          </Text>
          <Text textAlign={"center"}>
            Your MPIN has been set successfully. You can now use it to login to
            your account.
          </Text>
        </ModalBody>
        <ModalFooter justifyContent={"center"}>
          <Button onClick={handleClick} width={"100%"}>
            Continue
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default MpinSetSuccessModal;
