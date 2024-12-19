import { Button, FormControl, useColorMode } from "@chakra-ui/react";
import React from "react";
import { getColor, colorKeys } from "../../config/constants/colors";

const FormButton = ({ children, containerStyles, ...rest }) => {
  const { colorMode } = useColorMode();
  return (
    <FormControl style={{ ...containerStyles }}>
      <Button
        bg={getColor(colorKeys.primaryButtonFill, colorMode)}
        color={"white"}
        lineHeight={"unset"}
        fontSize={14}
        _hover={{
          bg: getColor(colorKeys.primaryButtonFillHover, colorMode),
        }}
        _active={{
          bg: getColor(colorKeys.primaryButtonFillHover, colorMode),
        }}
        minW="120px"
        {...rest}
      >
        {children}
      </Button>
    </FormControl>
  );
};

export default FormButton;
