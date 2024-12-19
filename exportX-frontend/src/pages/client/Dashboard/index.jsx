import React from "react";
import {
  Avatar,
  AvatarBadge,
  Box,
  Flex,
  Grid,
  GridItem,
  Icon,
  SimpleGrid,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  Text,
  useSteps,
} from "@chakra-ui/react";
import SummaryCard from "../../../components/data/Cards/SummaryCard";
import APP_ICONS from "../../../config/constants/icons";
import ActivityFeedCard from "./ActivityFeedCard";
import CustomTable from "../../../components/data/Table/CustomTable";
import helper from "../../../config/utils/helper";

const Dashboard = () => {
  return (
    <div>
      <Flex padding={"20px, 0px, 20px, 0px"} flexDir={"column"}>
        <Text fontWeight={700} fontSize={"22px"}>
          Hi, Welcome !
        </Text>
        <Text fontSize={"12px"} textColor={"#707070"}>
          Dashboard
        </Text>
      </Flex>
      <SimpleGrid mt={3} columns={{ base: 1, md: 3 }} spacing={5}>
        <SummaryCard
          title={"TOTAL TASK"}
          // value={projectsQuery.data?.data?.projectAnalysis?.totalCount || 0}
          value={"200"}
        />
        <SummaryCard
          title="COMPLETED TASK"
          // value={
          // projectsQuery.data?.data?.projectAnalysis?.completedProjects || 0
          // }
          value={"216"}
        />
        <SummaryCard
          title="TOTAL PROJECTS"
          value={"16"}
          // value={
          // projectsQuery.data?.data?.projectAnalysis?.pendingProjects || 0
          // }
        />
      </SimpleGrid>
      <Grid
        h="200px"
        templateRows="repeat(9, 1fr)"
        templateColumns="repeat(3, 1fr)"
        gap={4}
        mt={5}
      >
        <GridItem
          box-shadow="0px 0px 30px 0px #0000000D"
          rowSpan={3}
          colSpan={2}
          // bg="papayawhip"
          h={"386px"}
          borderRadius={"8px"}
          shadow={"md"}
        >
          <Flex h={"full"} alignItems={"center"} justifyContent={"center"}>
            CHART
          </Flex>
        </GridItem>
        <GridItem
          colSpan={1}
          rowSpan={4}
          h={"541px"}
          // bg="papayawhip"
          borderRadius={"8px"}
          shadow={"md"}
        >
          <Box
            textColor={"#9A9A9A"}
            fontSize={"20px"}
            fontWeight={700}
            mt={3}
            ml={4}
          >
            Activity Feed
          </Box>
          <ActivityFeedCard />
          <ActivityFeedCard />
          <ActivityFeedCard />
          <ActivityFeedCard />
          <ActivityFeedCard />
        </GridItem>
        <GridItem
          colSpan={2}
          rowSpan={4}
          h={"415px"}
          borderRadius={"8px"}
          shadow={"md"}
        >
          <Box>
            <Flex justifyContent={"space-between"} px={4} mt={4}>
              <Box textColor={"#9A9A9A"} fontWeight={700} fontSize={"20px"}>
                My Task
              </Box>
              <Box
                textColor={"#1C1D22"}
                fontSize={"12px"}
                textDecoration={"underline"}
              >
                View All
              </Box>
            </Flex>
            {/* <Box> */}
            <CustomTable
              tableFor={"clients"}
              tableWrapperProps={{ padding: 0 }}
              hideFilterBar={true}
              // containerProps={{ mt: 4 }}
              head={[
                {
                  title: "",
                  extractor: "id",
                  align: "left",
                  component: (item, index) => (
                    <Text color={getColor(colorKeys.gray, colorMode)}>
                      {(query?.page - 1) * query?.pageLimit + index + 1}
                    </Text>
                  ),
                },
                {
                  title: "Name",
                  extractor: "name",
                  align: "left",
                  // isSortable: true,
                  component: (item) => (
                    <Text
                      _hover={{ textDecor: "underline" }}
                      as={Link}
                      to={`/dashboard/projects/${item._id}`}
                      fontFamily={"Helvetica"}
                      fontWeight={700}
                      fontSize={"12px"}
                    >
                      {item.name}
                    </Text>
                  ),
                },
                {
                  title: "Assignees",
                  extractor: "assignees",
                  align: "center",
                  // isSortable: true,
                  component: (item) => (
                    <AvatarGroup max={2} size="sm" boxSize={"30px"} m={"auto"}>
                      {helper.isArray(item?.projectCoordinators) &&
                        item?.projectCoordinators?.map((item) => (
                          <Avatar
                            name={`${item?.firstName} ${item?.lastName}`}
                            src={getImageUrl(item?.userImage?.path)}
                          />
                        ))}
                    </AvatarGroup>
                  ),
                },
                {
                  title: "Status",
                  extractor: "access",
                  align: "center",
                  component: (item) => (
                    <DropdownSelect
                      value={item?.status}
                      options={statuses}
                      onChange={(status) =>
                        onStatusChange({ status, id: item._id })
                      }
                      buttonProps={{
                        bg:
                          item?.status === "Pending"
                            ? "#E2EEFF"
                            : item?.status === "Completed"
                            ? "#28F33C1A"
                            : item?.status === "Ongoing"
                            ? "#F3BA281A"
                            : "#28F33C1A",
                        color:
                          item?.status === "Pending"
                            ? "#1758FF"
                            : item?.status === "Completed"
                            ? "#12B20F"
                            : item?.status === "Ongoing"
                            ? "#F3BA28"
                            : "#12B20F",
                        fontWeight: "700 ",
                      }}
                      iconProps={{ fontSize: "17px" }}
                    />
                  ),
                },
              ]}
              // data={projectsQuery.data?.data?.projects}
              // loading={projectsQuery?.isLoading}
              // totalResults={projectsQuery?.data?.data?.pagination?.total}
              // totalPages={projectsQuery?.data?.data?.pagination?.pages?.length}
              // pageSize={query?.pageLimit}
              // pageNo={query?.page}
              // onQueryChange={onQueryChange}
              // query={query}
              // onRefresh={projectsQuery.refetch}
              // isRefreshing={projectsQuery?.isFetching}
            />
            {/* </Box> */}
          </Box>
        </GridItem>
        <GridItem
          colSpan={1}
          rowSpan={3}
          h={"274px"}
          // bg="tomato"
          borderRadius={"8px"}
          shadow={"md"}
        >
          <Flex h={"full"} alignItems={"center"} justifyContent={"center"}>
            CHART
          </Flex>
        </GridItem>
        <GridItem
          borderRadius={"8px"}
          shadow={"md"}
          colSpan={3}
          rowSpan={3}
          h={"345px"}
          bg="tomato"
        ></GridItem>
      </Grid>
    </div>
  );
};

export default Dashboard;
