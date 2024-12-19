import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardBody,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  SimpleGrid,
  Text,
  Textarea,
  VStack,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { colorKeys, getColor } from "../../../../../config/constants/colors";
import { useParams } from "react-router-dom";
import {
  useContentPlannerSettings,
  useUpdateContentPlannerSettings,
} from "../../../../../config/query/projectContentPlannerQuery";
import StatusSwitch from "../../../../../components/controls/StatusSwitch";
import { useQueryClient } from "@tanstack/react-query";
import API_CONSTANTS from "../../../../../config/constants/api";
import { isEmpty } from "ramda";

const OutputSet = () => {
  //if id is avaialble means we are in project details page
  const { id } = useParams(); //projectId
  const queryClient = useQueryClient();
  const { colorMode } = useColorMode();

  const contentPlannerSettings = useContentPlannerSettings(id);
  const data = contentPlannerSettings.data?.data || {};

  const updateContentPlannerSettings = useUpdateContentPlannerSettings(id);

  const onUpdateStatus = async (group, key, value) => {
    const updateSettings = {
      settings: {
        ...data.settings,
        [group]: {
          ...data.settings[group],
          [key]: value,
        },
      },
    };

    await updateContentPlannerSettings.mutateAsync(updateSettings);
    queryClient.invalidateQueries([
      API_CONSTANTS.CONTENT_PLANNER.getSettings,
      id,
    ]);
  };

  useEffect(() => {
    return () => {
      queryClient.invalidateQueries([
        API_CONSTANTS.CONTENT_PLANNER.getSettings.replace(":projectId", id),
      ]);
    };
  }, []);
  return (
    <>
      <Heading
        as="h3"
        size="md"
        color={getColor(colorKeys.extremeDimText, colorMode)}
      >
        Output Setting
      </Heading>

      <Card cursor={"pointer"}>
        <CardBody>
          {contentPlannerSettings.isFetching && isEmpty(data) ? (
            <div>Loading...</div>
          ) : (
            <Box>
              <VStack align="stretch" spacing={4}>
                <Text
                  color={getColor(colorKeys.headingText, colorMode)}
                  mt="2px"
                  lineHeight={"0.9"}
                  fontSize="16px"
                >
                  Select Language
                </Text>
                <SimpleGrid columns={{ base: 2, md: 4 }} spacing={5}>
                  <FormControl display="flex" alignItems="center">
                    <FormLabel
                      fontSize={"14px"}
                      color={getColor(colorKeys.gray, colorMode)}
                      mt="2px"
                      htmlFor="English"
                      mb="0"
                    >
                      English
                    </FormLabel>

                    <StatusSwitch
                      value={data?.settings?.languages?.english}
                      onChange={(e) => {
                        onUpdateStatus(
                          "languages",
                          "english",
                          e.target.checked
                        );
                      }}
                    />
                  </FormControl>

                  <FormControl display="flex" alignItems="center">
                    <FormLabel
                      fontSize={"14px"}
                      color={getColor(colorKeys.gray, colorMode)}
                      mt="2px"
                      htmlFor="Arabic"
                      mb="0"
                    >
                      Arabic
                    </FormLabel>
                    <StatusSwitch
                      value={data?.settings?.languages?.arabic}
                      onChange={(e) => {
                        onUpdateStatus("languages", "arabic", e.target.checked);
                      }}
                    />
                  </FormControl>
                </SimpleGrid>

                <Text
                  color={getColor(colorKeys.headingText, colorMode)}
                  mt="2px"
                  lineHeight={"0.9"}
                  fontSize="16px"
                >
                  Select Platform
                </Text>
                <SimpleGrid columns={{ base: 2, md: 4 }} spacing={5}>
                  <FormControl display="flex" alignItems="center">
                    <FormLabel
                      fontSize={"14px"}
                      color={getColor(colorKeys.gray, colorMode)}
                      mt="2px"
                      htmlFor="Facebook"
                      mb="0"
                    >
                      Facebook
                    </FormLabel>
                    <StatusSwitch
                      value={data?.settings?.platforms?.facebook}
                      onChange={(e) => {
                        onUpdateStatus(
                          "platforms",
                          "facebook",
                          e.target.checked
                        );
                      }}
                    />
                  </FormControl>

                  <FormControl display="flex" alignItems="center">
                    <FormLabel
                      fontSize={"14px"}
                      color={getColor(colorKeys.gray, colorMode)}
                      mt="2px"
                      htmlFor="Instagram"
                      mb="0"
                    >
                      Instagram
                    </FormLabel>
                    <StatusSwitch
                      value={data?.settings?.platforms?.instagram}
                      onChange={(e) => {
                        onUpdateStatus(
                          "platforms",
                          "instagram",
                          e.target.checked
                        );
                      }}
                    />
                  </FormControl>

                  <FormControl display="flex" alignItems="center">
                    <FormLabel
                      fontSize={"14px"}
                      color={getColor(colorKeys.gray, colorMode)}
                      mt="2px"
                      htmlFor="LinkedIn"
                      mb="0"
                    >
                      LinkedIn
                    </FormLabel>
                    <StatusSwitch
                      value={data?.settings?.platforms?.linkedin}
                      onChange={(e) => {
                        onUpdateStatus(
                          "platforms",
                          "linkedin",
                          e.target.checked
                        );
                      }}
                    />
                  </FormControl>

                  <FormControl display="flex" alignItems="center">
                    <FormLabel
                      fontSize={"14px"}
                      color={getColor(colorKeys.gray, colorMode)}
                      mt="2px"
                      htmlFor="X"
                      mb="0"
                    >
                      X
                    </FormLabel>
                    <StatusSwitch
                      value={data?.settings?.platforms?.x}
                      onChange={(e) => {
                        onUpdateStatus("platforms", "x", e.target.checked);
                      }}
                    />
                  </FormControl>
                </SimpleGrid>

                <Text
                  color={getColor(colorKeys.headingText, colorMode)}
                  mt="2px"
                  lineHeight={"0.9"}
                  fontSize="16px"
                >
                  Select AI Tool
                </Text>
                <SimpleGrid columns={{ base: 2, md: 4 }} spacing={5}>
                  <FormControl display="flex" alignItems="center">
                    <FormLabel
                      fontSize={"14px"}
                      color={getColor(colorKeys.gray, colorMode)}
                      mt="2px"
                      htmlFor="OpenAI"
                      mb="0"
                    >
                      Open AI
                    </FormLabel>
                    <StatusSwitch
                      value={data?.settings?.aiTool?.openAi}
                      onChange={(e) => {
                        onUpdateStatus("aiTool", "openAi", e.target.checked);
                      }}
                    />
                  </FormControl>

                  <FormControl display="flex" alignItems="center">
                    <FormLabel
                      fontSize={"14px"}
                      color={getColor(colorKeys.gray, colorMode)}
                      mt="2px"
                      htmlFor="Bard"
                      mb="0"
                    >
                      Bard
                    </FormLabel>
                    <StatusSwitch
                      value={data?.settings?.aiTool?.bard}
                      onChange={(e) => {
                        onUpdateStatus("aiTool", "bard", e.target.checked);
                      }}
                    />
                  </FormControl>

                  <FormControl display="flex" alignItems="center">
                    <FormLabel
                      fontSize={"14px"}
                      color={getColor(colorKeys.gray, colorMode)}
                      mt="2px"
                      htmlFor=" DellE"
                      mb="0"
                    >
                      Dell.E
                    </FormLabel>
                    <StatusSwitch
                      value={data?.settings?.aiTool?.dalle}
                      onChange={(e) => {
                        onUpdateStatus("aiTool", "dalle", e.target.checked);
                      }}
                    />
                  </FormControl>
                </SimpleGrid>
              </VStack>
            </Box>
          )}
        </CardBody>
      </Card>
    </>
  );
};

export default OutputSet;
