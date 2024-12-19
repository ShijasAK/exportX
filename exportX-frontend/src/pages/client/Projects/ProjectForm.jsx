import React, { useState } from "react";
import { useForm } from "react-hook-form";
import DataDrawer from "../../../components/data/Poppers/DataDrawer";
import DataTabs from "../../../components/data/Poppers/DataTabs";
import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Icon,
  IconButton,
  InputRightElement,
  SimpleGrid,
  Text,
  VStack,
  createStandaloneToast,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import FormInput from "../../../components/forms/FormInput";
import FormSelect from "../../../components/forms/FormSelect";
import { getStringRules } from "../../../config/utils/validationUtil";
import { EMAIL_REGEX } from "../../../config/constants/regex";
import { makeSelectList } from "../../../config/utils/selectListUtil";
import DataAccordian from "../../../components/data/Poppers/DataAccordian";
import ProjectCard from "../../../components/data/Cards/ProjectCard";
import { colorKeys, getColor } from "../../../config/constants/colors";
import APP_ICONS from "../../../config/constants/icons";
import FormTextarea from "../../../components/forms/FormTextarea";
import FormDateInput from "../../../components/forms/FormDateInput";
import moment from "moment";
import ScreenIcon from "../../../components/Icons/ScreenIcon";
import PencilIcon from "../../../components/Icons/PencilIcon";
import ArrowClickIcon from "../../../components/Icons/ArrowClickIcon";
import UsersIcon from "../../../components/Icons/UsersIcon";
import ProfileIcon from "../../../components/Icons/ProfileIcon";
import NoteBookIcon from "../../../components/Icons/NoteBookIcon";
import DocumentIcon from "../../../components/Icons/DocumentIcon";
import FormComboBox from "../../../components/forms/FormComboBox";
import {
  useProjectClientUsers,
  useProjectUsers,
} from "../../../config/query/projectUsersQuery";
import { useToneOfVoice } from "../../../config/query/toneOfVoiceQuery";
import { useAdGoals } from "../../../config/query/adGoalsQuery";
import UserForm from "./UserForm";
import {
  useClientLookup,
  useClientUserLookup,
  useCreateProject,
  useProjectUserLookup,
} from "../../../config/query/projectQuery";
import { formatDateForServer } from "../../../config/utils/dateUtil";
import { getImageUrl } from "../../../config/utils/fileUtil";
import { isEmpty } from "ramda";

const ProjectForm = ({ disclosure }) => {
  const userDisclosure = useDisclosure();
  const { colorMode } = useColorMode();
  const [query, setQuery] = useState("");
  const clients = useClientLookup(query);

  const toneOfVoices = useToneOfVoice();
  const adGoals = useAdGoals();

  const createProject = useCreateProject();

  // TOAST NOTIFICATION
  const { toast } = createStandaloneToast();

  const {
    handleSubmit,
    control,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const [query2, setQuery2] = useState("");
  const clientUsers = useClientUserLookup(watch("clientId")?.value);

  const onSubmit = (values) => {
    const coordinators = values.coordinators?.map((item) => item._id);
    // Display toast message if coordinators is empty
    if (!coordinators || isEmpty(coordinators)) {
      toast({
        title: "Please add at least one Project Users",
        status: "error",
        position: "top",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const payload = {
      ...values,
      startDate: formatDateForServer(values.startDate),
      endDate: formatDateForServer(values.endDate),
      coordinators: values.coordinators?.map((item) => item._id),
      ownerUserId: values.ownerUserId.value,
      clientId: values.clientId.value,
    };

    createProject
      .mutateAsync(payload)
      .then(() => {
        disclosure?.onClose();
        reset();
      })
      .catch((err) => console.warn(err));
  };

  const onAddUser = (user) => {
    const coordinators = watch("coordinators") || [];
    setValue("coordinators", [...coordinators, user], { shouldValidate: true });
  };

  const accordianData = [
    {
      label: "Project Brief",
      content: (
        <VStack align={"stretch"} spacing={2}>
          <SimpleGrid w="full" spacing={3} columns={{ base: 1, md: 2 }}>
            <FormSelect
              id={"projectBrief.adGoal"}
              label={"Ad Goals"}
              placeholder={"Ad Goals"}
              required={true}
              hideLabel={false}
              labelProps={{ fontSize: "15px", color: "#707070" }}
              errors={errors}
              control={control}
              options={makeSelectList(
                adGoals.data?.data?.adGoals,
                "_id",
                "adGoal"
              )}
            />

            <FormSelect
              id="projectBrief.toneOfVoice"
              label="Tone of Voice"
              placeholder={"Tone of Voice"}
              required={true}
              hideLabel={false}
              labelProps={{ fontSize: "15px", color: "#707070" }}
              errors={errors}
              control={control}
              options={makeSelectList(
                toneOfVoices.data?.data?.toneOfVoices,
                "_id",
                "toneOfVoice"
              )}
            />

            <FormInput
              id={"projectBrief.callToAction"}
              label={"Call to Action"}
              placeholder="Call to Action"
              required={true}
              errors={errors}
              control={control}
              inputProps={{ fontSize: "15px" }}
              hideLabel={false}
              rules={getStringRules()}
              rightElement={<ArrowClickIcon fontSize={"23px"} mt={1} />}
            />

            <FormInput
              id={"projectBrief.targetAudience"}
              label={"Target Audience"}
              placeholder="Target Audience"
              required={true}
              errors={errors}
              control={control}
              inputProps={{ fontSize: "15px" }}
              hideLabel={false}
              rules={getStringRules()}
              rightElement={<UsersIcon fontSize={"23px"} mt={2} />}
            />
          </SimpleGrid>

          <FormInput
            id={"projectBrief.productServiceName"}
            label={"Product/ Service Name"}
            placeholder="Product/ Service Name"
            required={true}
            errors={errors}
            control={control}
            inputProps={{ fontSize: "15px" }}
            hideLabel={false}
            rules={getStringRules()}
            rightElement={<ScreenIcon fontSize={"23px"} mt={1} />}
          />

          <FormTextarea
            id={"projectBrief.description"}
            isNested={true}
            label="Description"
            hideLabel={false}
            required={true}
            placeholder="Description"
            errors={errors}
            control={control}
            rightElement={<PencilIcon fontSize={"23px"} mt={1} />}
          />
        </VStack>
      ),
    },
  ];

  return (
    <DataDrawer disclosure={disclosure} heading={"Add Project"}>
      <Flex flexDir={"column"} justify={"space-between"}>
        <Box h="calc(100vh - 155px)" overflowY={"auto"}>
          <VStack align="stretch" spacing={3}>
            <SimpleGrid w="full" spacing={3} columns={{ base: 1, md: 2 }}>
              <FormComboBox
                id={"clientId"}
                onChange={(value) =>
                  setValue("clientId", value, { shouldValidate: true })
                }
                label="Client Name"
                onInputChange={(value) => setQuery(value)}
                value={watch("clientId")}
                options={clients.data?.data?.clients?.map((item) => ({
                  label: `${item.firstName} ${item.lastName}`,
                  value: item._id,
                }))}
                placeholder={"Client Name"}
                listProps={{ w: "400px" }}
                query={query}
                required={true}
                errors={errors}
                control={control}
              />

              <FormInput
                id={"name"}
                label={"Project Name"}
                placeholder="Enter project name"
                required={true}
                errors={errors}
                control={control}
                inputProps={{ fontSize: "15px" }}
                hideLabel={false}
                rules={getStringRules()}
                rightElement={<NoteBookIcon fontSize={"23px"} mt={1} />}
              />

              <FormInput
                id={"type"}
                label={"Project Type"}
                placeholder="Enter project type"
                required={true}
                errors={errors}
                control={control}
                inputProps={{ fontSize: "15px" }}
                hideLabel={false}
                rules={getStringRules()}
                rightElement={<DocumentIcon fontSize={"23px"} mt={1} />}
              />

              <FormComboBox
                id={"ownerUserId"}
                onChange={(value) =>
                  setValue("ownerUserId", value, { shouldValidate: true })
                }
                label={"Project Owner"}
                placeholder={"Project Owner"}
                onInputChange={(value) => setQuery2(value)}
                value={watch("ownerUserId")}
                options={clientUsers.data?.data?.clientUsers?.map((item) => ({
                  label: `${item.clientUserDetails?.name}`,
                  value: item.clientUserDetails?.Id,
                }))}
                listProps={{ w: "400px" }}
                query={query2}
                required={true}
                errors={errors}
                control={control}
              />
            </SimpleGrid>

            <FormTextarea
              id={"description"}
              label="Project Brief"
              hideLabel={false}
              required={true}
              placeholder="Write project brief"
              errors={errors}
              control={control}
              rightElement={<PencilIcon fontSize={"23px"} mt={1} />}
            />

            <SimpleGrid w="full" spacing={3} columns={{ base: 1, md: 2 }}>
              <FormDateInput
                label={"Start Date"}
                control={control}
                errors={errors}
                id="startDate"
                required={true}
                hideLabel={false}
                placeholder={"Start Date"}
                minDate={
                  new Date(moment().subtract(1, "day").format("YYYY-MM-DD"))
                }
                rules={{
                  validate: {
                    minAge: (value) => {
                      if (
                        value &&
                        moment().subtract(1, "day").diff(value, "days") > 0
                      ) {
                        return "Start date should be greater than today";
                      }
                    },
                  },
                }}
              />

              <FormDateInput
                label={"End Date"}
                control={control}
                errors={errors}
                id="endDate"
                required={true}
                hideLabel={false}
                placeholder={"End Date"}
                minDate={watch("startDate")}
                rules={{
                  validate: {
                    minAge: (value) => {
                      if (
                        value &&
                        moment(value).diff(watch("startDate"), "days") < 0
                      ) {
                        return "End date should be greater than start date";
                      }
                    },
                  },
                }}
              />
            </SimpleGrid>

            <Box>
              <Text fontSize="15px" color={getColor(colorKeys.gray, colorMode)}>
                Project Users
              </Text>
              <HStack spacing={3}>
                {watch("coordinators")?.map((item, index) => (
                  <Avatar
                    border={`1px solid ${getColor(
                      colorKeys.primary,
                      colorMode
                    )}`}
                    name={`${item?.firstName} ${item.lastName}`}
                    src={getImageUrl(item?.userImage?.path)}
                    h="50px"
                    w="50px"
                    key={index}
                    role="group"
                  >
                    <AvatarBadge
                      placement="top-end"
                      boxSize="1.6em"
                      bg="red"
                      border={"none"}
                      display={"none"}
                      cursor={"pointer"}
                      onClick={() => {
                        const coordinators = watch("coordinators");
                        setValue(
                          "coordinators",
                          coordinators.filter(
                            (coordinator) => coordinator !== item
                          ),
                          { shouldValidate: true }
                        );
                      }}
                      _groupHover={{ display: "flex" }}
                    >
                      <Icon
                        mb={"1px"}
                        ml="1px"
                        boxSize={4}
                        as={APP_ICONS.BIN}
                      />
                    </AvatarBadge>
                  </Avatar>
                ))}
                <IconButton
                  w="50px"
                  h="50px"
                  rounded="full"
                  border={`1px dashed #bfbfbf`}
                  bg="transparent"
                  onClick={userDisclosure.onOpen}
                  icon={
                    <Icon
                      boxSize={5}
                      color={getColor(colorKeys.primary, colorMode)}
                      as={APP_ICONS.ADD}
                    />
                  }
                />
              </HStack>
            </Box>

            <DataAccordian data={accordianData} />
          </VStack>
        </Box>

        <HStack justify={"flex-end"} mt={5}>
          <Button
            fontSize="14px"
            fontWeight={"400"}
            display={"flex"}
            alignItems={"center"}
            rounded={"full"}
            minW={"120px"}
            bg={getColor(colorKeys.lightGray, colorMode)}
            onClick={disclosure.onClose}
            color={"#BFBFBF"}
          >
            Cancel
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
            onClick={handleSubmit(onSubmit)}
          >
            Save
          </Button>
        </HStack>
      </Flex>

      <UserForm
        disclosure={userDisclosure}
        onSubmit={onAddUser}
        addedUsers={watch("coordinators")}
      />
    </DataDrawer>
  );
};

export default ProjectForm;
