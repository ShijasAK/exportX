import { Flex, HStack, Icon, Text, useColorMode } from "@chakra-ui/react";
import React from "react";
import APP_ICONS from "../../../config/constants/icons";
import { colorKeys, getColor } from "../../../config/constants/colors";
import { formatDate } from "../../../config/utils/dateUtil";
import { Link } from "react-router-dom";

const ProjectCard = ({ title, date, id }) => {
  const { colorMode } = useColorMode();
  return (
    <Flex align="center" justify="space-between" w="100%">
      <HStack>
        <Flex
          justify={"center"}
          align="center"
          border="0.5px solid #c9c9c9"
          h="30px"
          w="30px"
          rounded={"full"}
        >
          <Icon color="#F84516" variant="Bold" as={APP_ICONS.FOLDER} />
        </Flex>
        <Text
          fontSize={"12px"}
          color={getColor(colorKeys.whiteSmoke, colorMode)}
          as={Link}
          to={`/dashboard/projects/${id}`}
        >
          {title}
        </Text>
      </HStack>
      <Text fontSize={"12px"} color={getColor(colorKeys.whiteSmoke, colorMode)}>
        {formatDate(date)}
      </Text>
    </Flex>
  );
};

export default ProjectCard;
