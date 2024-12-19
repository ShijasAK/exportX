import React from "react";
import {
  Box,
  Card,
  CardBody,
  Checkbox,
  Heading,
  VStack,
  Flex,
  HStack,
  SimpleGrid,
  Button,
  // Textarea,
  useColorMode,
  Switch,
  Text,
  FormControl,
  useDisclosure,
  FormLabel,
  Textarea,
} from "@chakra-ui/react";
import { Form, useForm } from "react-hook-form";
import FormSelect from "../../../../components/forms/FormInput";
import FormInput from "../../../../components/forms/FormInput";
import TableHeaderOptions from "../../../../components/data/Table/TableHeaderOptions";
import { colorKeys, getColor } from "../../../../config/constants/colors";
import { makeSelectList } from "../../../../config/utils/selectListUtil";
import { getStringRules } from "../../../../config/utils/validationUtil";
import GenerateForm from "../ToolForms/GenerateForm";
import UsersIcon from "../../../../components/Icons/UsersIcon";
import ScreenIcon from "../../../../components/Icons/ScreenIcon";
import PencilIcon from "../../../../components/Icons/PencilIcon";
import FormTextarea from "../../../../components/forms/FormTextarea";
import StatusSwitch from "../../../../components/controls/StatusSwitch";

const projects = [
  {
    id: 1,
    name: "Unleash your inner athlete with the Nike React Infinity Run",
  },
  {
    id: 2,
    name: "Introduction to the Nike React Infinity Run.",
  },
  {
    id: 3,
    name: "Nike React Infinity Run",
  },
];

const goals = [
  {
    id: 1,
    name: "Get Leads",
  },
  {
    id: 2,
    name: "Get Sales",
  },
  {
    id: 3,
    name: "Get Messages",
  },
  {
    id: 4,
    name: "Get Calls",
  },
  {
    id: 5,
    name: "Get Store Visits",
  },
  {
    id: 6,
    name: "Get Brand Awareness",
  },
];

const toneOfVoice = [
  {
    id: 1,
    name: "Professional",
  },
  {
    id: 2,
    name: "Informal",
  },
  {
    id: 3,
    name: "Friendly",
  },
  {
    id: 4,
    name: "Enthusiatics",
  },
  {
    id: 5,
    name: "Conversational",
  },
  {
    id: 6,
    name: "Educational",
  },
  {
    id: 7,
    name: "Emotional",
  },
  {
    id: 8,
    name: "Authoriative",
  },
];

const SingleSocialMedia = () => {
  const { colorMode } = useColorMode();
  const generateContentDrawer = useDisclosure();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  return (
    <Box>
      <VStack align={"stretch"} spacing={6}>
        <TableHeaderOptions
          title={"Tools"}
          subtitle={"Tools / Single Social Media Post Generator"}
        />
        <Heading
          as="h3"
          size="md"
          color={getColor(colorKeys.extremeDimText, colorMode)}
        >
          Single Social Media Post Generator
        </Heading>

        <Card cursor={"pointer"}>
          <CardBody>
            <Box>
              <VStack align="stretch" spacing={4}>
                <Flex>
                  <Checkbox colorScheme="green" />
                  <Heading
                    fontSize={"15px"}
                    color={getColor(colorKeys.gray, colorMode)}
                    fontWeight={"normal"}
                    ml={3}
                  >
                    Select Project
                  </Heading>
                </Flex>
                <FormSelect
                  id="project Name"
                  label="Project Name"
                  placeholder={"Project Name"}
                  required={false}
                  hideLabel={true}
                  errors={errors}
                  control={control}
                  options={makeSelectList(projects)}
                />
              </VStack>
            </Box>
          </CardBody>
        </Card>

        <Heading
          as="h3"
          size="md"
          color={getColor(colorKeys.extremeDimText, colorMode)}
        >
          Output Setting
        </Heading>

        <Card cursor={"pointer"}>
          <CardBody>
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
                    <StatusSwitch />
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
                    <StatusSwitch />
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
                    <StatusSwitch />
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
                    <StatusSwitch />
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
                    <StatusSwitch />
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
                    <StatusSwitch />
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
                    <StatusSwitch />
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
                    <StatusSwitch />
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
                    <StatusSwitch />
                  </FormControl>
                </SimpleGrid>

                <SimpleGrid w="full" spacing={3} columns={{ base: 1, md: 2 }}>
                  <FormSelect
                    id="adGoals"
                    label="Ad Goals"
                    placeholder={"Ad Goals"}
                    required={false}
                    hideLabel={true}
                    errors={errors}
                    control={control}
                    options={makeSelectList(goals)}
                  />

                  <FormSelect
                    id="toneOfVoice"
                    label="Tone of voice"
                    placeholder={"Tone of voice"}
                    required={false}
                    hideLabel={true}
                    errors={errors}
                    control={control}
                    options={makeSelectList(toneOfVoice)}
                  />
                </SimpleGrid>

                <FormInput
                  id={"targetAudience"}
                  label={"Target Audience"}
                  placeholder="Target Audience"
                  required={true}
                  errors={errors}
                  control={control}
                  inputProps={{ fontSize: "15px" }}
                  hideLabel={true}
                  rules={getStringRules()}
                  rightElement={<UsersIcon fontSize={"23px"} mt={1} />}
                />
                <FormInput
                  id={"productServiceName"}
                  label={"Product/ Service Name"}
                  placeholder="Product/ Service Name"
                  required={true}
                  errors={errors}
                  control={control}
                  inputProps={{ fontSize: "15px" }}
                  hideLabel={true}
                  rules={getStringRules()}
                  rightElement={<ScreenIcon fontSize={"23px"} mt={1} />}
                />

                <FormTextarea
                  id={"brandDescription"}
                  label="Brand Description"
                  placeholder="Brand Description"
                  required={true}
                  errors={errors}
                  control={control}
                  rules={getStringRules()}
                  rightElement={<PencilIcon fontSize={"23px"} mt={1} />}
                />

                <FormTextarea
                  id={"tagIdeas"}
                  label="Tag Ideas"
                  placeholder="Tag Ideas"
                  required={true}
                  errors={errors}
                  control={control}
                  rules={getStringRules()}
                />
              </VStack>
            </Box>
          </CardBody>
        </Card>

        <HStack justify={"flex-end"} mt={5}>
          <Button
            fontSize="14px"
            fontWeight={"400"}
            display={"flex"}
            alignItems={"center"}
            rounded={"full"}
            minW={"120px"}
            bg={getColor(colorKeys.lightGray, colorMode)}
            color={"#BFBFBF"}
          >
            Go Back
          </Button>

          <Button
            fontSize="14px"
            fontWeight={"400"}
            display={"flex"}
            alignItems={"center"}
            rounded={"full"}
            minW={"120px"}
            bg={getColor(colorKeys.secondary, colorMode)}
            color={getColor(colorKeys.primary, colorMode)}
            _hover={{ opacity: 0.8 }}
            onClick={generateContentDrawer.onOpen}
          >
            Generate Content Ideas
          </Button>

          <GenerateForm disclosure={generateContentDrawer} />
        </HStack>
      </VStack>
    </Box>
  );
};

export default SingleSocialMedia;
