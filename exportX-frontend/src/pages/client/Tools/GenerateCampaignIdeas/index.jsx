import {
  Avatar,
  Box,
  Button,
  chakra,
  Flex,
  HStack,
  Heading,
  Icon,
  IconButton,
  SimpleGrid,
  InputRightElement,
  Switch,
  VStack,
  useColorMode,
} from "@chakra-ui/react";
import React, { useState } from "react";
import {
  colorKeys,
  colors,
  getColor,
} from "../../../../config/constants/colors";
import APP_ICONS from "../../../../config/constants/icons";
import FormInput from "../../../../components/forms/FormInput";
import { EMAIL_REGEX } from "../../../../config/constants/regex";
import { useForm } from "react-hook-form";
import { getStringRules } from "../../../../config/utils/validationUtil";
import FormSelect from "../../../../components/forms/FormSelect";
import { makeSelectList } from "../../../../config/utils/selectListUtil";
import SecondaryButton from "../../../../components/controls/Buttons/SecondaryButton";
import TableHeaderOptions from "../../../../components/data/Table/TableHeaderOptions";
import DropdownSelect from "../../../../components/controls/Dropdowns/DropdownSelect";
import FormTextarea from "../../../../components/forms/FormTextarea";
import FormRichTextEditor from "../../../../components/forms/FormRichTextEditor";
import UsersIcon from "../../../../components/Icons/UsersIcon";
import PencilIcon from "../../../../components/Icons/PencilIcon";
import StatusSwitch from "../../../../components/controls/StatusSwitch";
import { useGenerateCampaignIdeaDraft, useSaveCampaignIdeaDraft } from "../../../../config/query/toolsQuery";
import { useToneOfVoice } from "../../../../config/query/toneOfVoiceQuery";
import { useProjects } from "../../../../config/query/projectQuery";

const projects = [
  {
    id: 1,
    label: "Nike Product Launch",
  },
  {
    id: 2,
    label: "Nike Promotion",
  },
];

const language = [
  {
    id: 1,
    label: "English",
  },
  {
    id: 2,
    label: "Arabic",
  },
];

const platform = [
  {
    id: 1,
    label: "Facebook",
  },
  {
    id: 2,
    label: "Instagram",
  },
];

const AItool = [
  {
    id: "openAi",
    label: "openAi",
  },
  {
    id: "bardAi",
    label: "bardAi",
  },
];

const toneOfVoice = [
  {
    id: 1,
    label: "Professional",
  },
  {
    id: 2,
    label: "Casual",
  },
];

const GenerateCampaignIdeas = () => {
  const { colorMode } = useColorMode();
  const [generateHashtag, setGenerateHashtag] = useState(false);
  const {
    handleSubmit,
    setValue,
    getValues,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const useGenerateCampaignIdeaQuery = useGenerateCampaignIdeaDraft();
  const useSaveCampaignIdeaQuery = useSaveCampaignIdeaDraft();
  const useToneOfVoicesQuery = useToneOfVoice();
  const useProjectsQuery = useProjects();

  function onSubmitGenerate(values) {
    values.hashTag = generateHashtag
    delete values.query
    useGenerateCampaignIdeaQuery
       .mutateAsync(values)
              .then((res)=> setValue("output", `${res?.data?.contentIdeas}`))
       .catch((error) => console.warn(error, "error"));
  }
  
  function onSave(values) {
    
    console.log("saved: ", values)
    delete values.query
    useSaveCampaignIdeaQuery
       .mutateAsync(values)
       .then((res)=> console.log("saved: ", values))
       .catch((error) => console.warn(error, "error"));
  }

  return (
    <Box padding={5}>
      <TableHeaderOptions
        action={() => { }}
        title={"Tools"}
        subtitle={"Tools/ Generate Campaign Ideas"}
      />

      <Heading
        fontSize={"20px"}
        mt={"10"}
        color={getColor(colorKeys.whiteSmoke, colorMode)}
      >
        Generate Campaign Ideas
      </Heading>

      <Box
        style={{
          marginTop: 20,
          padding: "5px",
          boxShadow: "0px 0px 30px 0px #0000000D",
          borderRadius: "10px",
        }}
      >
        <SimpleGrid
          w="full"
          columns={{ base: 1, md: 2 }}
          marginTop={10}
          justifyContent={"space-around"}
        >
          <VStack>
            <chakra.form>
            <FormSelect
              id="project"
              label="Project"
              placeholder={"Project"}
              required={false}
              hideLabel={true}
              hideSelectOptionLabel={true}
              errors={errors}
              control={control}
              containerStyles={{
                w: "399px",
                h: "40px",
                fonstSize: "12",
                bg: colors.light,
                color: "#828282",
                borderRadius: "md",
                borderWidth: '1px',
                borderColor: "#ECECEC",
                mt: "10px"
              }}
              options={makeSelectList(
                useProjectsQuery?.data?.data?.projects, // replace with toneOfVoice API
                "_id",
                "name"
              ) || []}
            />

            <FormSelect
              id="language"
              placeholder={"Language"}
              required={false}
              hideLabel={true}
              hideSelectOptionLabel={true}
              errors={errors}
              control={control}
              containerStyles={{
                w: "399px",
                h: "40px",
                fonstSize: "12",
                bg: colors.light,
                color: "#828282",
                borderRadius: "md",
                borderWidth: '1px',
                borderColor: "#ECECEC",
                mt: "10px"
              }}
              options={makeSelectList(
                language, // replace with toneOfVoice API
                "label",
                "label"
              ) || []}
            />

            <FormSelect
              id="platform"
              placeholder={"Platform"}
              required={false}
              hideLabel={true}
              hideSelectOptionLabel={true}
              errors={errors}
              control={control}
              containerStyles={{
                w: "399px",
                h: "40px",
                fonstSize: "12",
                bg: colors.light,
                color: "#828282",
                borderRadius: "md",
                borderWidth: '1px',
                borderColor: "#ECECEC",
                mt: "10px"
              }}
              options={makeSelectList(
                platform, // replace with toneOfVoice API
                "label",
                "label"
              ) || []}
            />

            <FormSelect
              id="tool"
              placeholder={"AI tool"}
              required={false}
              hideLabel={true}
              hideSelectOptionLabel={true}
              errors={errors}
              control={control}
              containerStyles={{
                w: "399px",
                h: "40px",
                fonstSize: "12",
                bg: colors.light,
                color: "#828282",
                borderRadius: "md",
                borderWidth: '1px',
                borderColor: "#ECECEC",
                mt: "10px"
              }}
              options={makeSelectList(
                AItool, // replace with toneOfVoice API
                "id",
                "label"
              ) || []}
            />

            <FormInput
              id={"prompt"}
              placeholder="Prompt"
              rightAddon={
                <InputRightElement
                  children={
                    <PencilIcon
                      mr={3}
                      mt={3}
                      // boxSize={"4"}
                      fontSize={"23px"}
                    // color={"#E2E2E2"}
                    // as={APP_ICONS.USERS}
                    />
                  }
                />
              }
              control={control}
              inputProps={{ fontSize: "12", height: "90px" }}
              containerStyles={{ w: "399px", mt: "10px" }}
            />

            <FormSelect
              id="toneOfVoice"
              label="Tone Of Voice"
              placeholder={"Tone of voice"}
              required={false}
              hideLabel={true}
              hideSelectOptionLabel={true}
              errors={errors}
              control={control}
              containerStyles={{
                w: "399px",
                h: "40px",
                fonstSize: "12",
                bg: colors.light,
                color: "#828282",
                borderRadius: "md",
                borderWidth: '1px',
                borderColor: "#ECECEC",
                mt: "10px"
              }}
              options={makeSelectList(
                useToneOfVoicesQuery?.data?.data?.toneOfVoices, // replace with language API
                    "_id",
                    "toneOfVoice"
              ) || []}
            />

            <FormInput id={"targetAudience"}
              placeholder="Target  Audience"
              rightAddon={
                <InputRightElement
                  children={
                    <UsersIcon
                    mr={3}
                    mt={3}
                    // boxSize={"4"}
                    fontSize={'23px'}
                    // color={"#E2E2E2"}
                    // as={APP_ICONS.USERS}
                  />
                  }
                />
              }
              control={control}
              inputProps={{ fontSize: "12", height: "40px" }}
              containerStyles={{ w: "399px", mt: "10px" }}
            />

            <HStack
              w={396}
              padding={"10px"}
              justifyContent="space-between"
              alignItems="center"
            >
              <Heading fontSize={"12px"} color="#252525" whiteSpace="nowrap">
                Approximate Words
              </Heading>

              <HStack
                spacing={4}
                alignItems="center"
                justifyContent={"space-evenly"}
              >
                <IconButton
                  variant={"ghost"}
                  w={46}
                  h={46}
                  onClick={() => setValue("approximateWords", Number(getValues("approximateWords")) - 1)}
                  bg={"#E2EEFF"}
                  icon={<Icon as={APP_ICONS.MINUS} color={"#1758FF"} />}
                />

                <FormInput
                  id={"approximateWords"}
                  value={control}
                  type={"number"}
                  control={control}
                  hideLabel={true}
                  required={false}
                  placeholder={100}
                  inputProps={{
                    fontSize: "12",
                    w: "110px",
                    rounded: "10px",
                    height: "46",
                    bg: "#F6F6F6",
                  }}
                />

                <IconButton
                  variant={"ghost"}
                  w={46}
                  h={46}
                  onClick={() => setValue("approximateWords", Number(getValues("approximateWords")) + 1)}
                  bg={"#E2EEFF"}
                  icon={<Icon as={APP_ICONS.ADD} color={"#1758FF"} />}
                />
              </HStack>
            </HStack>

            <HStack padding={"10px"} justifyContent={"flex-start"} w={396}>
              <Heading fontSize={"12"} color="#252525" whiteSpace="nowrap">
                Generate Hashtag
              </Heading>

              <StatusSwitch onChange={(e)=> setGenerateHashtag(e.target.checked)} value={generateHashtag}/>
            </HStack>

            <Flex flexDirection={"column"} w={"399px"} flex={1}>
              <IconButton
                variant={"bold"}
                boxSize={10}
                onClick={handleSubmit(onSubmitGenerate)}
                isLoading={useGenerateCampaignIdeaQuery.isPending}
                alignSelf={"flex-end"}
                bg={getColor(colorKeys.secondary, colorMode)}
                icon={
                  <Icon
                    as={APP_ICONS.GNERATE}
                    variant="Bold"
                    boxSize={5}
                    color={getColor(colorKeys.primary, colorMode)}
                  />
                }
              />
            </Flex>
            </chakra.form>
          </VStack>

          <FormRichTextEditor
            id={"output"}
            control={control}
            height={"600px"}
            containerProps={{
              fontSize: "15px",
              height: "636px",
              w: "579px",
              borderWidth: "15px",
              borderColor: "#F5EEEE80",
              borderRadius: "10px",
            }}
          />
        </SimpleGrid>
      </Box>

      <HStack justify={"flex-end"} mt={20}>
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
          onClick={handleSubmit(onSave)}
          rounded={"full"}
          minW={"120px"}
          bg={getColor(colorKeys.secondary, colorMode)}
          color={getColor(colorKeys.primary, colorMode)}
          isLoading={useSaveCampaignIdeaQuery.isPending}
        >
          Add To Content Planner
        </Button>
      </HStack>
    </Box>
  );
};

export default GenerateCampaignIdeas;
