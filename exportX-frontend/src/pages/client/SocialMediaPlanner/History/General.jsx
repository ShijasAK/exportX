import React from "react";
import DataTabs from "../../../../components/data/Poppers/DataTabs";
import { colorKeys, getColor } from "../../../../config/constants/colors";
import { Box, Button, Checkbox, Flex, Text, useColorMode } from "@chakra-ui/react";
import TaskList from "../../Users/UserDetails/TaskList";
import ProjectList from "../../Users/UserDetails/ProjectList";
import All from "./All";
import Inprogress from "./Inprogress";
import Rework from "./Rework";
import Approved from "./Approved";
import SubmittedToClients from "./SubmittedToClients";
import { makeSelectList } from "../../../../config/utils/selectListUtil";
import FormSelect from "../../../../components/forms/FormSelect";
import { useForm } from "react-hook-form";

const General = () => {
  const { colorMode } = useColorMode();

  const countries = [];

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const tabData = [
    {
      label: "All (5)",
      content: <All />,
    },
    {
      label: "Inprogess (15)",
      content: <Inprogress />,
    },
    {
      label: "Rework (8)",
      content: <Rework />,
    },
    {
      label: "Approved (6)",
      content: <Approved />,
    },
    {
      label: "Submitted to Clients (10)",
      content: <SubmittedToClients />,
    },
  ];

  return (
    <Box borderRadius={"10px"}>
      <Flex>
        {/* <Box ml={5} mt={4} position={'relative'}>
          <Checkbox colorScheme="green"></Checkbox>
        </Box> */}
        <Flex w={"full"}>
          <DataTabs
            data={tabData}
            tabsProps={{
              border: "#fff",
              borderRadius: 0,
              isFitted: true,
              ml: 2,
              w: "full",
            }}
            tabListProps={{ bg: "#fff", maxW: "fit-content" }}
            tabProps={{
              color: "#272727",
              _selected: {
                color: getColor(colorKeys.primary, colorMode),
                bg: "#fff",

                borderBottom: "4px solid",
                borderBottomColor: getColor(colorKeys.primary, colorMode),
              },
              //   maxW: "140px ",
              //   w: "full",
              maxW: "fit-content",
              fontSize: "14px",
            }}
          />
        </Flex>
      </Flex>
      <Flex alignItems={"center"}>
        <Flex maxW="345px" w={'full'} padding={"20px 12px 20px 20px"}>
          <FormSelect
            id="adGoals"
            label="Bulk Action"
            placeholder={"Bulk Action"}
            required={false}
            hideLabel={true}
            errors={errors}
            control={control}
            options={makeSelectList(countries)}
          />
        </Flex>
        <Button
          mb={2}
          fontSize="14px"
          fontWeight={"400"}
          display={"flex"}
          alignItems={"center"}
          rounded={"full"}
          minW={"120px"}
          bg={getColor(colorKeys.secondary, colorMode)}
          color={getColor(colorKeys.primary, colorMode)}
          _hover={{ opacity: 0.8 }}
        >
          Apply
        </Button>
      </Flex>
    </Box>
  );
};

export default General;
