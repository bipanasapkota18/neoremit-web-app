import { Flex, IconButton } from "@chakra-ui/react";
import { HiMenuAlt1 } from "react-icons/hi";

export const LeftHeader = ({
  handleDrawerToggle
}: {
  handleDrawerToggle: () => void;
  width: number;
}) => {
  return (
    <Flex align="center">
      <IconButton
        variant="link"
        aria-label="Minify sidebar"
        color="black"
        onClick={handleDrawerToggle}
      >
        <HiMenuAlt1 />
      </IconButton>
    </Flex>
  );
};
