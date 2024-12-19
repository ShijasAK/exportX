import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import React from "react";
import APP_IMAGES from "../../../config/constants/images";
import { colorKeys, getColor } from "../../../config/constants/colors";

const NoResultsCard = ({ show, subtitle, action, actionText = "Refresh" }) => {
  const { colorMode } = useColorMode();
  if (!show) return null;
  return (
    <Box m="auto">
      <Flex flexDir={"column"} align={"center"} justify={"center"}>
        <Image maxW="250px" src={APP_IMAGES.NO_RESULT} alt="No Results Found" />
        <Heading as="h2" fontSize="24px">
          No Results Found
        </Heading>
        <Text
          maxW="280px"
          textAlign={"center"}
          fontSize={"14px"}
          display={"block"}
          whiteSpace={"break-spaces"}
          mt={1}
          color={getColor(colorKeys.gray, colorMode)}
        >
          {subtitle
            ? subtitle
            : "Whoops... there isn't any data available for this section"}
        </Text>
        {action && actionText && (
          <Button onClick={action} mt="3" rounded="lg" colorScheme="blue">
            {actionText}
          </Button>
        )}
      </Flex>
    </Box>
  );
};

export default NoResultsCard;
