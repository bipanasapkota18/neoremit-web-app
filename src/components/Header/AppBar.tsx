import {
  Flex,
  FlexProps,
  ThemingProps,
  useStyleConfig
} from "@chakra-ui/react";

export interface AppBarProps extends FlexProps {
  // Extend with FlexProps
  children?: React.ReactNode;
  variants?: ThemingProps;
}

const AppBar = (props: AppBarProps) => {
  const { children, variants, ...rest } = props;
  const styles = useStyleConfig("AppBar", variants);

  return (
    <Flex py={4} __css={styles} {...rest} position={"sticky"} top={0}>
      {children}
    </Flex>
  );
};

export default AppBar;
