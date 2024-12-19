import { Box, Flex, HStack, Spinner } from "@chakra-ui/react";
import React from "react";
import DataTabs from "../../../../components/data/Poppers/DataTabs";
import ClientCard from "../../../../components/data/Cards/ClientCard";
import TableHeaderOptions from "../../../../components/data/Table/TableHeaderOptions";
import ProjectOverview from "./ProjectOverview";
import DocumentManagement from "./DocumentManagement";
import UserManagement from "./UserManagement";
import TaskManagement from "./TaskManagement";
import DiscussionForum from "./DiscussionForum";
import SocialMediaPlanner from "./SocialMediaPlanner";
import { useProject } from "../../../../config/query/projectQuery";
import { useParams } from "react-router-dom";
import { useUserRole } from "../../../../hooks";
import ProjectOverviewClient from "./ProjectOverviewClient";
import DocumentManagementClient from "./DocumentManagementClient";
import UserManagementClient from "./UserManagementClient";
import SocialMediaPlannerClient from "./SocialMediaPlannerClient";

const ProjectDetails = () => {
  const { id } = useParams();
  const projectQuery = useProject(id);
  const { isInternal } = useUserRole();

  const project = projectQuery.data?.data?.project;

  const tabData = [
    {
      label: "Project Overview",
      content: <ProjectOverview data={project} />,
    },
    {
      label: "Document Management",
      content: <DocumentManagement data={project} />,
    },
    {
      label: "User Management",
      content: <UserManagement data={project} />,
    },
    ...(isInternal
      ? [
          {
            label: "Task Management",
            content: <TaskManagement data={project} />,
          },
        ]
      : []),

    {
      label: "Discussion Forum",
      content: <DiscussionForum data={project} />,
    },
    {
      label: "Social Media Planner",
      content: <SocialMediaPlanner data={project} />,
    },
  ];

  const ClientTabData = [
    {
      label: "Project Overview",
      content: <ProjectOverviewClient data={project} />,
    },
    {
      label: "Document Management",
      content: <DocumentManagementClient data={project} />,
    },
    {
      label: "User Management",
      content: <UserManagementClient data={project} />,
    },
    {
      label: "Discussion Forum",
      content: <DiscussionForum data={project} />,
    },
    {
      label: "Social Media Planner",
      content: <SocialMediaPlannerClient data={project} />,
    },
  ];

  return (
    <Box>
      {projectQuery.isLoading && (
        <Flex w={"full"} justifyContent={"center"} mb={5}>
          <Spinner size={"lg"} color="red.500" />
        </Flex>
      )}
      <TableHeaderOptions
        title={"Projects"}
        subtitle={`Project / ${project?.name}`}
      />

      <TableHeaderOptions
        containerProps={{ my: 5 }}
        title={""}
        titleProps={{ color: "#9A9A9A", fontSize: "20px" }}
      />
      <Box fontSize={"20px"} fontWeight={700} textColor={"#9A9A9A"}>
        {project?.name}
      </Box>

      <Flex gap={5} w="full" mt={4}>
        <Box h="250px" minW="870px" w="full">
          <DataTabs data={isInternal ? tabData : ClientTabData} />
        </Box>
        {isInternal && (
          <ClientCard data={[project?.clientId, project?.owner]} />
        )}
      </Flex>
    </Box>
  );
};

export default ProjectDetails;
