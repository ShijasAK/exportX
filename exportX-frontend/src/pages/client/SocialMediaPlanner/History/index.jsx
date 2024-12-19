import { Box, Flex, Heading, Image, useColorMode } from "@chakra-ui/react";
import React from "react";
import TableHeaderOptions from "../../../../components/data/Table/TableHeaderOptions";
import APP_ICONS from "../../../../config/constants/icons";
import DataTabs from "../../../../components/data/Poppers/DataTabs";
import ProjectOverview from "../../Projects/ProjectDetails/ProjectOverview";
import DocumentManagement from "../../Projects/ProjectDetails/DocumentManagement";
import General from "./General";
import Projects from "./Projects";
import { colorKeys, getColor } from "../../../../config/constants/colors";

const History = () => {
  const { colorMode } = useColorMode();
  const tabData = [
    {
      label: "Generals",
      content: <General />,
    },
    {
      label: "Projects",
      content: <Projects />,
    },
  ];
  return (
    <Box>
      <TableHeaderOptions
        action={() => {}}
        actionText={"Generate Plan"}
        title={"Social Media Planner"}
        subtitle={"Social Media Planner"}
        icon={APP_ICONS.ADD}
        onQueryChange={() => {}}
        placeholder="Search by name, email or designation "
        actionButtonProps={{ minW: 130 }}
      />

      <Flex mt={5} color={"#9A9A9A"} fontSize={"20px"} fontWeight={700}>
        History
      </Flex>
      <Flex mt={5} w="full">
        <Box h="250px" minW="870px" w="full">
          <DataTabs data={tabData} />
        </Box>
        
      </Flex>
    </Box>
  );
};

export default History;
