import React from "react";
import { useForm } from "react-hook-form";
import DataDrawer from "../../../../components/data/Poppers/DataDrawer";
import {
  Box,
  Button,
  Flex,
  HStack,
  chakra,
  useColorMode,
} from "@chakra-ui/react";
import FormInput from "../../../../components/forms/FormInput";
import { getStringRules } from "../../../../config/utils/validationUtil";
import { colorKeys, getColor } from "../../../../config/constants/colors";
import {
  useCreateRole,
  useUpdateRole,
} from "../../../../config/query/roleQuery";

const RoleForm = ({ disclosure, data }) => {
  const { colorMode } = useColorMode();

  const createQuery = useCreateRole();
  const updateQuery = useUpdateRole(data?._id);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    values: { roleName: data?.roleName },
  });

  function onSubmit(values) {
    const formMutate = data?._id
      ? updateQuery.mutateAsync
      : createQuery.mutateAsync;

    formMutate(values)
      .then(() => {
        reset();
        disclosure.onClose();
      })
      .catch((error) => console.warn(error, "error"));
  }

  return (
    <DataDrawer
      disclosure={disclosure}
      heading={data?._id ? "Update Role" : "Add Role"}
    >
      <chakra.form onSubmit={handleSubmit(onSubmit)}>
        <Flex flexDir={"column"} justify={"space-between"}>
          <Box h="calc(100vh - 155px)" overflowY={"auto"}>
            <FormInput
              id={"roleName"}
              label={"Role Name"}
              placeholder="Enter role name"
              required={true}
              errors={errors}
              control={control}
              inputProps={{ fontSize: "15px" }}
              hideLabel={false}
              rules={getStringRules()}
            />
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
              isLoading={createQuery.isPending || updateQuery.isPending}
            >
              Save
            </Button>
          </HStack>
        </Flex>
      </chakra.form>
    </DataDrawer>
  );
};

export default RoleForm;
