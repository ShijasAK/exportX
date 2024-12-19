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
import ProfileIcon from "../../../../components/Icons/ProfileIcon";
import {
  useAddDesignation,
  useUpdateDesignation,
} from "../../../../config/query/designationQuery";

const DesignationForm = ({ disclosure, data }) => {
  const { colorMode } = useColorMode();

  const createQuery = useAddDesignation();
  const updateQuery = useUpdateDesignation(data?._id);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    values: { designation: data?.designation },
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
      heading={data?._id ? "Update Designation" : "Add Designation"}
    >
      <chakra.form onSubmit={handleSubmit(onSubmit)}>
        <Flex flexDir={"column"} justify={"space-between"}>
          <Box h="calc(100vh - 155px)" overflowY={"auto"}>
            <FormInput
              id={"designation"}
              label={"Designation"}
              placeholder="Enter designation"
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

export default DesignationForm;
