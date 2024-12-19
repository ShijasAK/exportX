import { Button, Flex, HStack, Icon, Text } from "@chakra-ui/react";
import React from "react";

const PrimaryButton = ({ children, leftExtention, buttonProps, textProps, onClick }) => {
  return (
    <Button h="30px" variant={"unstyled"} px="4px" onClick={onClick} {...buttonProps}>
      <HStack alignItems={"center"}>
        {leftExtention}
        <Text {...textProps}>{children}</Text>
      </HStack>
    </Button>
  );
};

export default PrimaryButton;
