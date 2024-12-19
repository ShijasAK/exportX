import { Button, useColorMode } from "@chakra-ui/react";
import React from "react";
import { colorKeys, getColor } from "../../../config/constants/colors";

const SecondaryButton = ({ children, onClick, ...rest }) => {
  const { colorMode } = useColorMode();
  return (
    <Button
      color={getColor(colorKeys.primary, colorMode)}
      bg={getColor(colorKeys.secondary, colorMode)}
      _hover={{
        bg: getColor(colorKeys.secondary, colorMode),
        opacity: 0.8,
      }}
      fontSize={"16px"}
      fontWeight={"normal"}
      rounded="full"
      p="25px 35px"
      onClick={onClick}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default SecondaryButton;
