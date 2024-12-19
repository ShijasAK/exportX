import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  InputRightElement,
  SimpleGrid,
  VStack,
  useColorMode,
} from "@chakra-ui/react";
import FormInput from "../../../components/forms/FormInput";
import FormSelect from "../../../components/forms/FormSelect";
import { getStringRules } from "../../../config/utils/validationUtil";
import { EMAIL_REGEX } from "../../../config/constants/regex";
import { makeSelectList } from "../../../config/utils/selectListUtil";
import DataDrawer from "../../../components/data/Poppers/DataDrawer";
import APP_ICONS from "../../../config/constants/icons";
import { colorKeys, getColor } from "../../../config/constants/colors";
import {
  useClientLookup,
  useProjectUserLookup,
} from "../../../config/query/projectQuery";

const countries = [
  {
    id: 1,
    name: "India",
  },
  {
    id: 2,
    name: "USA",
  },
  {
    id: 3,
    name: "UK",
  },
];

const FilterDrawer = ({ disclosure, query, onQueryChange, onClearFilers }) => {
  const { colorMode } = useColorMode();
  const projectUsers = useProjectUserLookup();
  const [clientSearch, setClientSearch] = useState("");
  const clients = useClientLookup(clientSearch);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    values: { ...query },
  });

  const onSubmit = (values) => {
    onQueryChange(values);
    disclosure?.onClose()
  };

  return (
    <DataDrawer disclosure={disclosure} heading={"Filter"}>
      <Flex flexDir={"column"} justify={"space-between"}>
        <Box h="calc(100vh - 155px)" overflowY={"auto"}>
          <VStack align="stretch" spacing={3}>
            <Button
              color={getColor(colorKeys.primary, colorMode)}
              alignSelf={"end"}
              size="sm"
              variant={"ghost"}
              maxW="fit-content"
              onClick={() => {
                reset();
                onClearFilers();
              }}
            >
              Clear Filters
            </Button>

            {/* <FormInput
              id={"query"}
              label={"Search"}
              placeholder="Search"
              required={true}
              rightAddon={
                <InputRightElement
                  children={
                    <Icon
                      mr={3}
                      boxSize={"5"}
                      color={getColor(colorKeys.primary, colorMode)}
                      as={APP_ICONS.SEARCH}
                    />
                  }
                />
              }
              errors={errors}
              control={control}
              inputProps={{ fontSize: "15px", rounded: "full", pl: 5 }}
              groupProps={{ rounded: "full" }}
              hideLabel={false}
              rules={getStringRules()}
            /> */}

            <FormSelect
              id="client"
              label="Client"
              placeholder={"Client"}
              required={false}
              hideLabel={false}
              errors={errors}
              control={control}
              options={clients.data?.data?.clients?.map((item) => ({
                label: `${item.firstName} ${item.lastName}`,
                value: item._id,
              }))}
            />

            <FormSelect
              id="assignedTo"
              label="Assigned To"
              placeholder={"Assigned To"}
              required={false}
              hideLabel={false}
              errors={errors}
              control={control}
              // options={makeSelectList(countries)}
              searchFn={(value) => setClientSearch(value)}
              options={projectUsers.data?.data?.projectUsers?.map((item) => ({
                label: `${item.firstName} (${item.lastName})`,
                value: item._id,
              }))}
            />

            <FormSelect
              id="status"
              label="Status"
              placeholder={"Status"}
              required={false}
              hideLabel={false}
              errors={errors}
              control={control}
              options={[
                {
                  label: "Pending",
                  value: "Pending",
                },
                {
                  label: "Ongoing",
                  value: "Ongoing",
                },
                {
                  label: "Completed",
                  value: "Completed",
                },
              ]}
            />
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
            onClick={handleSubmit(onSubmit)}
          >
            Save Search and Apply
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
            Apply
          </Button>
        </HStack>
      </Flex>
    </DataDrawer>
  );
};

export default FilterDrawer;
