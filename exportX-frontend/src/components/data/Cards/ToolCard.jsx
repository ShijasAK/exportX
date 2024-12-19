import {
  Box,
  Card,
  CardBody,
  Flex,
  Heading,
  Image,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import React from "react";
import { colorKeys, getColor } from "../../../config/constants/colors";
import { Link, useLocation } from "react-router-dom";


const ToolCard = ({ tool }) => {
  const { colorMode } = useColorMode();
  
  return (
    <Card
      cursor={"pointer"}
      _hover={{ bg: getColor(colorKeys.lighterBlue, colorMode) }}
    >
      <CardBody
      as={Link}
      to={tool?.link}
      >
        <Box>
          <Flex
            align="center"
            justify={"center"}
            rounded="full"
            bg={getColor(colorKeys.lightBlue, colorMode)}
            w="50px"
            h="50px"
          >
            <Image src={tool?.image} />
          </Flex>
          <Heading fontSize={"20px"} fontWeight={"normal"}>
            {tool?.title}
          </Heading>
          <Text mt={2} fontSize={"13px"}>
            {tool?.description}
          </Text>
        </Box>
      </CardBody>
    </Card>
  );
};

export default ToolCard;
