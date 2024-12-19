import {
  Box,
  Checkbox,
  Flex,
  Text,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import ContentPlannerEmptyCard from "../../../../components/data/Cards/ContentPlannerEmptyCard";
import DataTabs from "../../../../components/data/Poppers/DataTabs";
import TableHeaderOptions from "../../../../components/data/Table/TableHeaderOptions";
import { colorKeys, getColor } from "../../../../config/constants/colors";
import APP_ICONS from "../../../../config/constants/icons";
import {
  useBulkActions,
  useFilterData,
  useUpdateItemStatus,
} from "../../../../config/query/projectContentPlannerQuery";
import {
  useDeleteTask,
  useSendForApproval,
} from "../../../../config/query/taskQuery";
import {
  breakCamelCase,
  capitalize,
} from "../../../../config/utils/stringUtil";
import AddImageForm from "../../Tools/ToolForms/ImageForm";
import PlannerDataTab from "./PlannerDataTab";

const getStatusActiveIndex = (status) => {
  switch (status?.toLowerCase()) {
    case "pending":
      return undefined;
    case "in progress":
      return 0;
    case "completed":
      return 1;
    case "rework required":
      return 0;
    case "submit for approval":
      return 2;
    case "submitted for approval":
      return 2;
    case "rework required":
      return 2;
    case "approved":
      return 3;
    default:
      return undefined;
  }
};

const SocialMediaPlanner = () => {
  const navigate = useNavigate();
  const selectAllRef = React.useRef();
  const { colorMode } = useColorMode();
  const addImageDrawer = useDisclosure();
  const disclosure = useDisclosure();
  const [selected, setSelected] = useState(null);
  const { id } = useParams();
  const [selectedTasks, setSelectedTasks] = useState([]);

  const [query, setQuery] = useState({ search: "" });
  const updateItemStatus = useUpdateItemStatus();
  const sendApproval = useSendForApproval();
  const deleteTask = useDeleteTask();
  const bulkActions = useBulkActions();
  const plans = useFilterData({ projectId: id, params: query });
  const planData = plans?.data?.data;

  const {
    control,
    getValues,
    reset,
    formState: { errors },
    watch,
  } = useForm();

  const actionsArray = [
    { value: "submitToClient", label: "Submit To Client" },
    { value: "rework", label: "Rework required" },
    { value: "reject", label: "Reject" },
    { value: "schedule", label: "Schedule" },
    { value: "approve", label: "Approved" },
  ];

  const onEditTask = (item) => {
    setSelected(item);
    disclosure.onOpen();
  };

  const onUpdateItemStatus = (params) => {
    const { itemId, planId, status } = params;
    updateItemStatus
      .mutateAsync({
        projectId: id,
        creativeId: planId,
        imageId: itemId,
        body: { status },
      })
      .then(() => plans.refetch())
      .catch((err) => console.warn(err));
  };

  const onDeleteTask = (taskId) => {
    deleteTask
      .mutateAsync({
        projectId: id,
        taskId,
      })
      .then(() => plans.refetch())
      .catch((err) => console.warn(err));
  };

  const onBulkActions = () => {
    bulkActions
      .mutateAsync({
        projectId: id,
        action: getValues("action"),
        body: {
          selectedContents: selectedTasks,
        },
      })
      .then(() => {
        plans.refetch();
        reset();
        setSelectedTasks([]);
        selectAllRef.current.checked = false;
      })
      .catch((err) => console.warn(err?.message));
  };

  const onSelectAll = (checked) => {
    console.log("checked", checked);
    if (!checked) {
      setSelectedTasks([]);
      return;
    }
    if (selectedTasks.length === planData?.all?.length) {
      setSelectedTasks([]);
    } else {
      setSelectedTasks(planData?.all?.map((item) => item?.itemId));
    }
  };

  const onSendApproval = ({ creativeId, imageId, status }) => {
    sendApproval
      .mutateAsync({
        projectId: id,
        taskId,
      })
      .then(() => plans.refetch())
      .catch((err) => console.warn(err));
  };

  const onSchedule = (plan) => {};

  const tabData = planData
    ? Object.keys(planData).map((key) => {
        return {
          label: `${capitalize(breakCamelCase(key))} (${
            planData[key]?.length
          })`,
          content: (
            <PlannerDataTab
              data={planData[key]}
              onUpdateItemStatus={onUpdateItemStatus}
              onEditTask={onEditTask}
              onDeleteTask={onDeleteTask}
              getStatusActiveIndex={getStatusActiveIndex}
              onSendApproval={onSendApproval}
              onSchedule={onSchedule}
              selectedTasks={selectedTasks}
              setSelectedTasks={setSelectedTasks}
            />
          ),
        };
      })
    : [];

  const isdataavailable = () => {
    const avail = planData
      ? Object.keys(planData).map((key) => {
          return planData[key]?.length > 0;
        })
      : [];
    return avail.includes(true);
  };

  useEffect(() => {
    if (!disclosure?.isOpen) {
      setSelected(null);
    }
  }, [disclosure?.isOpen]);

  return (
    <Box>
      {isdataavailable() ? (
        <Box>
          <Text color={"transparent"}>.</Text>
          <Flex
            position={"absolute"}
            justifyContent={"space-between"}
            w={"96%"}
          >
            <Box zIndex={!disclosure.isOpen && 9999} mt={"30px"} ml={"20px"}>
              <Checkbox
                onChange={(e) => onSelectAll(e.target.checked)}
                ref={selectAllRef}
                isChecked={selectAllRef.current?.checked}
                colorScheme="green"
              ></Checkbox>
            </Box>
            <Flex pos="relative" zIndex={1} mt={"20px"}>
              <TableHeaderOptions
                action={() =>
                  navigate(
                    `/dashboard/projects/${id}/social-media-planner/finalize`
                  )
                }
                actionText={"View Ideas"}
                iconProps={{ bg: "#e5e5e5" }}
                icon={APP_ICONS.ARROW_RIGHT}
                placeholder="Search"
                textProps={{ color: "#000000" }}
              />
            </Flex>
          </Flex>

          <Flex position={"absolute"} w={"100%"} ml={"-21px"}>
            <DataTabs
              data={tabData}
              tabsProps={{
                border: "#fff",
                borderRadius: 0,
                isFitted: true,
                mt: 5,
                ml: 2,
                w: "full",
              }}
              tabListProps={{ bg: "#fff", maxW: "fit-content", ml: "55px" }}
              tabProps={{
                color: "#272727",
                _selected: {
                  color: getColor(colorKeys.primary, colorMode),
                  bg: "#fff",
                  borderBottom: "4px solid",
                  borderBottomColor: getColor(colorKeys.primary, colorMode),
                },
                maxW: "fit-content",
              }}
            />
          </Flex>
        </Box>
      ) : (
        <ContentPlannerEmptyCard />
      )}

      {/* <Box pb={20} mt={"420px"}>
        <Flex alignItems={"center"}>
          <Flex maxW="345px" w={"full"} padding={"20px 12px 20px 20px"}>
            <FormSelect
              id="action"
              label="Bulk Action"
              placeholder={"Bulk Action"}
              required={false}
              hideLabel={false}
              errors={errors}
              control={control}
              options={actionsArray}
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
            onClick={onBulkActions}
            mt={"28px"}
            isLoading={bulkActions.isPending}
          >
            Apply
          </Button>
        </Flex>
      </Box> */}

      <AddImageForm disclosure={disclosure} creative={selected} />
    </Box>
  );
};

export default SocialMediaPlanner;
