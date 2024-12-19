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
import React from "react";
import { colorKeys, colors, getColor } from "../../../../config/constants/colors";
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
import EmailIcon from "../../../../components/Icons/EmailIcon";
import PencilIcon from "../../../../components/Icons/PencilIcon";
import UsersIcon from "../../../../components/Icons/UsersIcon";
import { useGenerateEmailDraft, useSaveEmailDraft } from "../../../../config/query/toolsQuery";
import { useToneOfVoice } from "../../../../config/query/toneOfVoiceQuery";


const language = [
  {
    id: 1,
    label: "English",
  },
  {
    id: 2,
    label: "Arabic",
  }
];

const toneOfVoice = [
  {
    id: 1,
    label: "Professional",
  },
  {
    id: 2,
    label: "Casual",
  }
];


const GenerateEmailDraft = () => {
  const { colorMode } = useColorMode();
  const {
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const useGenerateEmailQuery = useGenerateEmailDraft();
  const useSaveEmailQuery = useSaveEmailDraft();
  const useToneOfVoicesQuery = useToneOfVoice();

  function onSubmitGenerate(values) {
    delete values.query
    useGenerateEmailQuery
       .mutateAsync(values)
       .then((res)=> setValue("output", `${res?.data?.emailDraft}`
       ))
       .catch((error) => console.warn(error, "error"));
  }
  
  function onSave(values) {
    console.log("saved: ", values)
    delete values.query
    useSaveEmailQuery
       .mutateAsync(values)
       .then((res)=> console.log("saved: ", values))
       .catch((error) => console.warn(error, "error"));
  }

  return (
    <Box padding={5}>
      <TableHeaderOptions
        action={() => { }}
        title={"Tools"}
        subtitle={"Tools/ Email Draft"}
      />

      <Heading
        fontSize={"20px"}
        mt={"10"}
        color={getColor(colorKeys.whiteSmoke, colorMode)}
      >
        Generate Email Draft
      </Heading>

      <Box
      style={{
        marginTop:20 ,
        padding:'5px',
        boxShadow:'0px 0px 30px 0px #0000000D',
        borderRadius:"10px"
        }}
      >
        <SimpleGrid w="full" columns={{ base: 1, md: 2 }} marginTop={10} justifyContent={"space-around"}>
          <VStack>
          <chakra.form>
          <FormSelect
                  id="language"
                  label="Language"
                  placeholder={"Language"}
                  required={false}
                  hideLabel={true}
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
                  options={ makeSelectList(
                    language, // replace with language API
                    "label",
                    "label"
                  ) || []}
                />

            <FormInput id={"subject"}
              placeholder="Email Subject"
              rightAddon={
                <InputRightElement
                  children={
                    <EmailIcon
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
              inputProps={{ fontSize: "12", height: "90px" }}
              containerStyles={{ w: "399px", mt: "10px" }}
            />

            <FormInput id={"keyPoints"}
              placeholder="Key points you want to cover"
              rightAddon={
                <InputRightElement
                  children={
                    <PencilIcon
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
              inputProps={{ fontSize: "12", height: "90px" }}
              containerStyles={{ w: "399px", mt: "10px" }}
            />

            <FormSelect
                  id="toneOfVoice"
                  label="Tone Of Voice"
                  placeholder={"Tone of voice"}
                  required={false}
                  hideLabel={true}
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
                  options={ makeSelectList(
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

            <Flex flexDirection={"column"} w={"399px"} flex={1} marginTop={20} >
              <IconButton
                variant={"bold"}
                onClick={handleSubmit(onSubmitGenerate)}
                isLoading={useGenerateEmailQuery.isPending}
                boxSize={10}
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
              borderRadius:"10px"
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
          isLoading={useSaveEmailQuery.isPending}
        >
          Add To Content Planner
        </Button>
      </HStack>
    </Box>
  )
}

export default GenerateEmailDraft;