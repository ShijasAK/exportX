import { Box, Flex, HStack, Icon, Text } from "@chakra-ui/react";
import React from "react";

const IconValuePair = ({ icon, value }) => {
  return (
    <HStack>
      <Box border={`1px solid #626262`} rounded="full" p="2px">
        <Flex
          justify={"center"}
          align={"center"}
          w="22px"
          h="22px"
          bg="#292929"
          rounded="full"
        >
          <Icon as={icon} variant="Bold" color={"#fff"} boxSize={"14px"} />
        </Flex>
      </Box>
      <Text color="#fff">{value}</Text>
    </HStack>
  );
};

export default IconValuePair;
