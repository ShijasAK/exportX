import React from "react";
import DataDrawer from "../../../components/data/Poppers/DataDrawer";
import {
  Button,
  Flex,
  HStack,
  SimpleGrid,
  chakra,
  useColorMode,
} from "@chakra-ui/react";
import FormInput from "../../../components/forms/FormInput";
import { getStringRules } from "../../../config/utils/validationUtil";
import ProfileIcon from "../../../components/Icons/ProfileIcon";
import MobileIcon from "../../../components/Icons/MobileIcon";
import MobileGroupIcon from "../../../components/Icons/MobileGroupIcon";
import { EMAIL_REGEX } from "../../../config/constants/regex";
import SendIcon from "../../../components/Icons/SendIcon";
import FormSelect from "../../../components/forms/FormSelect";
import { countryList } from "../../../config/constants/data";
import { useForm } from "react-hook-form";
import { colorKeys, getColor } from "../../../config/constants/colors";
import { useUpdateClient } from "../../../config/query/clientQuery";

const ClientUpdateForm = ({ disclosure, data }) => {
  const { colorMode } = useColorMode();
  const updateClientQuery = useUpdateClient(data?._id);

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    values: {
      primaryIsdCode: "+91",
      firstName: data?.firstName,
      lastName: data?.lastName,
      primaryContactNo: data?.primaryContactNo,
      secContactNo: data?.secContactNo,
      email: data?.email,
    },
  });

  const onSubmit = (values) => {
    updateClientQuery
      .mutateAsync(values)
      .then(disclosure?.onClose)
      .catch((err) => console.warn(err));
  };

  return (
    <DataDrawer disclosure={disclosure} heading={"Edit Client"}>
      <chakra.form h="full" onSubmit={handleSubmit(onSubmit)}>
        <Flex h="full" flexDir={"column"} justify={"space-between"}>
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
              rules={getStringRules()}
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
              rules={getStringRules()}
              rightElement={<ProfileIcon fontSize={"23px"} mt={1} />}
            />

            <FormInput
              id={"primaryContactNo"}
              label={"Primary Contact Number"}
              placeholder="Enter primary contact number"
              required={true}
              errors={errors}
              control={control}
              inputProps={{ fontSize: "15px" }}
              hideLabel={false}
              rightElement={<MobileIcon fontSize={"23px"} mt={1} />}
            />

            <FormInput
              id={"secContactNo"}
              label={"Secondary Contact Number"}
              placeholder="Enter secondary contact number"
              required={true}
              errors={errors}
              control={control}
              inputProps={{ fontSize: "15px" }}
              hideLabel={false}
              rightElement={<MobileGroupIcon fontSize={"23px"} mt={1} />}
            />

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
              })}
              rightElement={<SendIcon fontSize={"23px"} mt={1} />}
            />
          </SimpleGrid>
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
              isLoading={updateClientQuery.isPending}
              type="submit"
            >
              Save
            </Button>
          </HStack>
        </Flex>
      </chakra.form>
    </DataDrawer>
  );
};

export default ClientUpdateForm;
