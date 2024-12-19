import React from "react";
import DataDrawer from "../../../../components/data/Poppers/DataDrawer";
import DataTabs from "../../../../components/data/Poppers/DataTabs";
import Information from "./Information";
import Projects from "./Projects";
import Tasks from "./Tasks";
import { useDisclosure } from "@chakra-ui/react";

const UserDetails = ({ disclosure, data }) => {
  const tabData = [
    {
      label: "Personal Information",
      content: <Information data={data}  disclosure={disclosure}/>,
    },
    {
      label: "Project",
      content: <Projects data={data?.projectDetails}/>,
    },
    {
      label: "Task",
      content: <Tasks data={data?.taskDetails} />,
    },
  ];


  return (
    <DataDrawer disclosure={disclosure} heading={"User Details"}>
      <DataTabs tabProps={{paddingX:"70px"}} data={tabData}/>
    </DataDrawer>
  );
};

export default UserDetails;
