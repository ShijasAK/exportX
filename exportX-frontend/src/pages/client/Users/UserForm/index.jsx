import React from "react";
import { useForm } from "react-hook-form";
import DataDrawer from "../../../../components/data/Poppers/DataDrawer";
import {
  Box,
  Button,
  Flex,
  HStack,
  SimpleGrid,
  VStack,
  chakra,
  useColorMode,
} from "@chakra-ui/react";
import FormInput from "../../../../components/forms/FormInput";
import FormSelect from "../../../../components/forms/FormSelect";
import { getStringRules } from "../../../../config/utils/validationUtil";
import { EMAIL_REGEX, INPUT_REGEX } from "../../../../config/constants/regex";
import { makeSelectList } from "../../../../config/utils/selectListUtil";
import { colorKeys, getColor } from "../../../../config/constants/colors";
import ProfileIcon from "../../../../components/Icons/ProfileIcon";
import SendIcon from "../../../../components/Icons/SendIcon";
import { useRoles } from "../../../../config/query/roleQuery";
import { useCreateUser } from "../../../../config/query/userQuery";
import { useDesignations } from "../../../../config/query/designationQuery";

const UserForm = ({ disclosure }) => {
  const { colorMode } = useColorMode();

  const createUserQuery = useCreateUser();
  const rolesQuery = useRoles();
  const designationsQuery = useDesignations();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const resetForm = () => {
    reset({
      firstName: "",
      lastName: "",
      email: "",
      designation: "",
      role: "",
    });
  };

  function onSubmit(values) {
    delete values.query;
    createUserQuery
      .mutateAsync({ ...values, project: [] })
      .then(() => {
        resetForm();
        disclosure.onClose();
      })
      .catch((error) => console.warn(error, "error"));
  }

  return (
    <DataDrawer
      onClose={resetForm}
      disclosure={disclosure}
      heading={"Add User"}
    >
      <chakra.form onSubmit={handleSubmit(onSubmit)}>
        <Flex flexDir={"column"} justify={"space-between"}>
          <Box h="calc(100vh - 155px)" overflowY={"auto"}>
            <VStack align="stretch" spacing={3}>
              <SimpleGrid w="full" spacing={3} columns={{ base: 1, md: 2 }}>
                <FormInput
                  id={"firstName"}
                  label={"First Name"}
                  placeholder="Enter first name"
                  required={true}
                  errors={errors}
                  control={control}
                  inputProps={{ fontSize: "15px" }}
                  hideLabel={false}
                  rules={getStringRules({
                    pattern: {
                      value: INPUT_REGEX,
                      message: "Invalid name",
                    },
                  })}
                  rightElement={<ProfileIcon fontSize={"23px"} mt={1} />}
                />

                <FormInput
                  id={"lastName"}
                  label={"Last Name"}
                  placeholder="Enter last name"
                  required={true}
                  errors={errors}
                  control={control}
                  inputProps={{ fontSize: "15px" }}
                  hideLabel={false}
                  rules={getStringRules({
                    pattern: {
                      value: INPUT_REGEX,
                      message: "Invalid name",
                    },
                  })}
                  rightElement={<ProfileIcon fontSize={"23px"} mt={1} />}
                />
              </SimpleGrid>

              <FormInput
                id={"email"}
                label={"Email"}
                placeholder="Enter email address"
                required={true}
                errors={errors}
                control={control}
                inputProps={{ fontSize: "15px" }}
                hideLabel={false}
                rules={getStringRules({
                  pattern: {
                    value: EMAIL_REGEX,
                    message: "Invalid email address",
                  },
                  validate:(value) => value.trim().length < 50 || "Email address should be lesser than 50 characters",
                })}
                rightElement={<SendIcon fontSize={"23px"} mt={1} />}
              />

              <SimpleGrid w="full" spacing={3} columns={{ base: 1, md: 2 }}>
                <FormSelect
                  id="designation"
                  label="Designation"
                  placeholder={"Select designation"}
                  required={false}
                  hideLabel={false}
                  errors={errors}
                  control={control}
                  options={
                    makeSelectList(
                      designationsQuery?.data?.data?.designation,
                      "_id",
                      "designation"
                    ) || []
                  }
                />

                <FormSelect
                  id="role"
                  label="System Access Role"
                  placeholder={"System access role"}
                  required={false}
                  hideLabel={false}
                  errors={errors}
                  control={control}
                  options={
                    makeSelectList(
                      rolesQuery?.data?.data?.roles,
                      "_id",
                      "roleName"
                    ) || []
                  }
                />

              </SimpleGrid>
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
              color={"#BFBFBF"}
              onClick={disclosure.onClose}
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
              type="submit"
              isLoading={createUserQuery.isPending}
            >
              Save
            </Button>
          </HStack>
        </Flex>
      </chakra.form>
    </DataDrawer>
  );
};

export default UserForm;
