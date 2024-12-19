import {
  Box,
  Flex,
  Heading,
  Stack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import { colorKeys, getColor } from "../../../../config/constants/colors";
import { formatDate } from "../../../../config/utils/dateUtil";

const ProjectOverviewClient = ({ data }) => {
  const { colorMode } = useColorMode();
  const { id } = useParams();

  const { description, createdAt, startDate, endDate } = useMemo(() => {
    const details = {
      description: data?.description,
      createdAt: formatDate(data?.createdAt),
      startDate: formatDate(data?.startDate),
      endDate: formatDate(data?.endDate),
    };

    return {
      ...details,
    };
  }, [data]);

  return (
    <Stack spacing={3}>
      <Box>
        <Heading
          fontSize={"18px"}
          fontWeight={"normal"}
          color={getColor(colorKeys.gray, colorMode)}
        >
          Project Description
        </Heading>
        <Text
          mt={2}
          fontSize={"13px"}
          fontWeight={"normal"}
          color={getColor(colorKeys.primaryText, colorMode)}
        >
          {description}
        </Text>
      </Box>

      <Box mt={5}>
        <Flex justify={"space-between"} align={"center"}>
          <Box>
            <Heading
              fontSize={"16px"}
              fontWeight={"normal"}
              color={getColor(colorKeys.gray, colorMode)}
            >
              Created Date
            </Heading>
            <Text
              mt={2}
              fontSize={"13px"}
              fontWeight={"normal"}
              color={getColor(colorKeys.primaryText, colorMode)}
            >
              {createdAt}
            </Text>
          </Box>

          <Box>
            <Heading
              fontSize={"16px"}
              fontWeight={"normal"}
              color={getColor(colorKeys.gray, colorMode)}
            >
              Start Date
            </Heading>
            <Text
              mt={2}
              fontSize={"13px"}
              fontWeight={"normal"}
              color={getColor(colorKeys.primaryText, colorMode)}
            >
              {startDate}
            </Text>
          </Box>

          <Box>
            <Heading
              fontSize={"16px"}
              fontWeight={"normal"}
              color={getColor(colorKeys.gray, colorMode)}
            >
              End Date
            </Heading>
            <Text
              mt={2}
              fontSize={"13px"}
              fontWeight={"normal"}
              color={getColor(colorKeys.primaryText, colorMode)}
            >
              {endDate}
            </Text>
          </Box>
        </Flex>
      </Box>
    </Stack>
  );
};

export default ProjectOverviewClient;
