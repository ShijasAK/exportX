import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Icon,
  SimpleGrid,
  useColorMode,
  chakra,
  useDisclosure,
  InputLeftAddon,
  Select,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { colorKeys, getColor } from "../../../../config/constants/colors";
import APP_ICONS from "../../../../config/constants/icons";
import FormInput from "../../../../components/forms/FormInput";
import { EMAIL_REGEX, NUMERIC_REGEX, PHONE_REGEX } from "../../../../config/constants/regex";
import { useForm } from "react-hook-form";
import { getStringRules } from "../../../../config/utils/validationUtil";
import FormSelect from "../../../../components/forms/FormSelect";
import ProfileIcon from "../../../../components/Icons/ProfileIcon";
import SendIcon from "../../../../components/Icons/SendIcon";
import PhoneIcon from "../../../../components/Icons/PhoneIcon";
import { countryList } from "../../../../config/constants/data";
import { useUpdateUser } from "../../../../config/query/userQuery";
import { useDesignations } from "../../../../config/query/designationQuery";
import { makeSelectList } from "../../../../config/utils/selectListUtil";
import { COUNTRIES } from "../../../../config/constants/countries";
import API_CONSTANTS, { BASE_URL } from "../../../../config/constants/api";
import FormFileUpload from "../../../../components/forms/FormFileUpload";
import { FILE_TYPES } from "../../../../config/constants/defaults";
import { getImageUrl } from "../../../../config/utils/fileUtil";

const Information = ({ data, disclosure }) => {
  const { colorMode } = useColorMode();
  const editDisclosure = useDisclosure();

  const designationsQuery = useDesignations();
  const updateUserQuery = useUpdateUser();

  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    values: {
      userImage: data?.userImage,
      firstName: data?.firstName,
      lastName: data?.lastName,
      email: data?.email,
      contactNo: data?.contactNo,
      designation: data?.userDesignation?._id,
      country: data?.country,
      isdCode: data?.isdCode || "+971",
    },
  });

  useEffect(() => {
    if (!editDisclosure?.isOpen) {
      reset({
        userImage: data?.userImage,
        firstName: data?.firstName,
        lastName: data?.lastName,
        email: data?.email,
        contactNo: data?.contactNo,
        designation: data?.userDesignation?._id,
        country: data?.country,
        isdCode: data?.isdCode || "+971",
      });
    }
  }, [editDisclosure.isOpen]);

  const onSubmit = (values) => {
    updateUserQuery
      .mutateAsync({ id: data?._id, body: values })
      .then(editDisclosure.onClose)
      .catch((err) => console.warn(err));
  };

  const handleIsdCodeChanged = (e) => {
    console.log("isdCode", e.target.value);
    setValue("isdCode", e.target.value);
  };

  const onImageChange = ({ name, file }) => {
    console.log("file", file);
    setValue("userImage", file);
  };

  return (
    <chakra.form onSubmit={handleSubmit(onSubmit)}>
      <Flex flexDir={"column"} justify={"space-between"}>
        <Box h="calc(100vh - 220px)" overflowY={"auto"}>
          <Flex justify="space-between" align="center">
            <Heading fontSize="20px" fontWeight={"400"}>
              Personal Information
            </Heading>
            <Button
              fontSize="14px"
              fontWeight={"400"}
              display={"flex"}
              alignItems={"center"}
              variant={"unstyled"}
              shadow={"none !important"}
              outline={"none !important"}
              border={"none !important"}
              onClick={editDisclosure.onToggle}
              leftIcon={
                <Flex
                  justify={"center"}
                  align="center"
                  bg={"#e5e5e5"}
                  rounded="full"
                  w="30px"
                  h="30px"
                >
                  <Icon
                    rounded="full"
                    color={getColor(colorKeys.primary, colorMode)}
                    as={
                      editDisclosure.isOpen ? APP_ICONS.CLOSE : APP_ICONS.EDIT
                    }
                    boxSize="4"
                  />
                </Flex>
              }
            >
              {editDisclosure.isOpen ? "Cancel" : "Edit"}
            </Button>
          </Flex>
          <HStack spacing={3} align={"start"} mt={5}>
            <FormFileUpload
              id={"userImage"}
              onChange={onImageChange}
              label={"userImage"}
              component={
                <Avatar src={getImageUrl(watch("userImage")?.path)} size="xl" />
              }
              componentProps={{
                variant:"unstyled",
                mr:3
              }}
              fileType={FILE_TYPES.IMAGE}
            />
            <SimpleGrid w="full" spacing={3} columns={{ base: 1, md: 2 }}>
              <FormInput
                id={"firstName"}
                label={"First Name"}
                placeholder="Enter first name"
                required={true}
                errors={errors}
                control={control}
                inputProps={{
                  fontSize: "15px",
                  isDisabled: !editDisclosure.isOpen,
                }}
                hideLabel={true}
                rules={getStringRules()}
                rightElement={<ProfileIcon boxSize="6" />}
              />

              <FormInput
                id={"lastName"}
                label={"Last Name"}
                placeholder="Enter last name"
                required={true}
                errors={errors}
                control={control}
                inputProps={{
                  fontSize: "15px",
                  isDisabled: !editDisclosure.isOpen,
                }}
                hideLabel={true}
                rules={getStringRules()}
                rightElement={<ProfileIcon boxSize="6" />}
              />

              <FormInput
                id={"email"}
                label={"Email"}
                placeholder="Enter email address"
                disabled={true}
                required={true}
                errors={errors}
                control={control}
                inputProps={{
                  fontSize: "15px",
                  isDisabled: true,
                }}
                hideLabel={true}
                rules={getStringRules({
                  pattern: {
                    value: EMAIL_REGEX,
                    message: "Invalid email address",
                  },
                })}
                rightElement={<SendIcon boxSize="6" />}
              />

              <FormInput
                id={"contactNo"}
                label={"Phone Number"}
                placeholder="Enter phone number"
                type={"number"}
                required={true}
                errors={errors}
                control={control}
                inputProps={{
                  fontSize: "15px",
                  isDisabled: !editDisclosure.isOpen,
                }}
                hideLabel={true}
                rightElement={<PhoneIcon boxSize="6" />}
                rules={getStringRules({
                  validate: (value) => {
                    if (value.length < 10) {
                      return "Phone number should be atleast 10 digits";
                    }
                    if (value.length > 12) {
                      return "Phone number should be atmost 12 digits";
                    }
                  },
                  pattern: {
                    value: NUMERIC_REGEX,
                    message: "Invalid phone number",
                  },
                })}
                leftAddon={
                  <InputLeftAddon p="0">
                    <Select
                      isDisabled={!editDisclosure.isOpen}
                      onChange={handleIsdCodeChanged}
                      value={watch("isdCode")}
                    >
                      {COUNTRIES.map((country) => {
                        return (
                          <option value={country.prefix}>
                            {country.prefix}
                          </option>
                        );
                      })}
                    </Select>
                  </InputLeftAddon>
                }
              />

              <FormSelect
                id="designation"
                label="Designation"
                placeholder={"Select designation"}
                required={false}
                hideLabel={true}
                errors={errors}
                control={control}
                inputProps={{
                  fontSize: "15px",
                  isDisabled: !editDisclosure.isOpen,
                }}
                options={
                  makeSelectList(
                    designationsQuery?.data?.data?.designation,
                    "_id",
                    "designation"
                  ) || []
                }
              />

              <FormSelect
                id="country"
                label="Country"
                placeholder={"Country"}
                inputProps={{
                  fontSize: "15px",
                  isDisabled: !editDisclosure.isOpen,
                }}
                required={false}
                hideLabel={true}
                errors={errors}
                control={control}
                options={countryList}
              />
            </SimpleGrid>
          </HStack>
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
            color={"#BFBFBF"}
            onClick={editDisclosure.onClose}
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
            type="submit"
            isLoading={updateUserQuery.isPending}
            bg={getColor(colorKeys.secondary, colorMode)}
            color={getColor(colorKeys.primary, colorMode)}
            // onClick={disclosure.onClose}.
          >
            Save
          </Button>
        </HStack>
      </Flex>
    </chakra.form>
  );
};

export default Information;
