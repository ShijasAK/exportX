import {
  Box,
  Flex,
  HStack,
  Heading,
  Icon,
  useColorMode,
} from "@chakra-ui/react";
import React from "react";
import APP_ICONS from "../../../config/constants/icons";
import { colorKeys, getColor } from "../../../config/constants/colors";

const SummaryCard = ({ title, value }) => {
  const { colorMode } = useColorMode();
  return (
    <Box
      bg={
        "linear-gradient(48deg, rgba(95,29,10,1) 5%, rgba(64,36,28,1) 22%, rgba(44,44,44,1) 38%)"
      }
      px="3"
      py="5"
      rounded="xl"
    >
      <HStack spacing={4}>
        <Flex
          justify={"center"}
          align={"center"}
          bg="linear-gradient(113.78deg, #FF5017 13.74%, #C90016 81.67%);"
          w="50px"
          h="50px"
          rounded="full"
        >
          <Icon as={APP_ICONS.PROJECTS} color={"#fff"} />
        </Flex>

        <Box>
          <Heading
            color={getColor(colorKeys.gray, colorMode)}
            fontWeight={400}
            fontSize={"12px"}
            textTransform={"uppercase"}
          >
            {title}
          </Heading>
          <Heading
            color={getColor(colorKeys.white, colorMode)}
            fontSize={"26px"}
          >
            {value}
          </Heading>
        </Box>
      </HStack>
    </Box>
  );
};

export default SummaryCard;
