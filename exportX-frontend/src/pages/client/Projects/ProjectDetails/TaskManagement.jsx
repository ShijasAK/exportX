import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Checkbox,
  Divider,
  Flex,
  HStack,
  Icon,
  IconButton,
  Text,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import DataTabs from "../../../../components/data/Poppers/DataTabs";
import { colorKeys, getColor } from "../../../../config/constants/colors";
import TableHeaderOptions from "../../../../components/data/Table/TableHeaderOptions";
import APP_ICONS from "../../../../config/constants/icons";
import DropdownSelect from "../../../../components/controls/Dropdowns/DropdownSelect";
import TaskForm from "./ProjectManagementForms/TaskForm";
import Steps from "../../../../components/controls/Steps";
import { useState } from "react";
import TaskListCard from "../../../../components/data/Cards/TaskListCard";
import FormSelect from "../../../../components/forms/FormSelect";
import { makeSelectList } from "../../../../config/utils/selectListUtil";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import {
  useCreateTask,
  useDeleteTask,
  useSendForApproval,
  useTaskBulkActions,
  useTasks,
  useUpdateTaskStatus,
} from "../../../../config/query/taskQuery";

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

const TaskManagement = () => {
  const selectAllRef = React.useRef();
  const { colorMode } = useColorMode();
  const disclosure = useDisclosure();
  const [selected, setSelected] = useState(null);
  const { id } = useParams();
  const [selectedTasks, setSelectedTasks] = useState([]);

  const [query, setQuery] = useState({ search: "" });
  const updateTaskStatus = useUpdateTaskStatus();
  const sendApproval = useSendForApproval();
  const deleteTask = useDeleteTask();
  const bulkActions = useTaskBulkActions();
  const task = useTasks({ id, params: query });
  const tasks = task?.data?.data?.tasks;

  const {
    control,
    getValues,
    reset,
    formState: { errors },
  } = useForm();

  const actionsArray = [
    { value: "Submit For Approval", label: "Submit For Approval" },
    { value: "Rework required", label: "Rework required" },
    { value: "Approved", label: "Approved" },
  ];

  const onAddNew = () => {
    setSelected(null);
    disclosure.onOpen();
  };

  const onEditTask = (item) => {
    setSelected(item);
    disclosure.onOpen();
  };

  const onUpdateTaskStatus = (taskId, status) => {
    updateTaskStatus
      .mutateAsync({
        projectId: id,
        taskId,
        status,
      })
      .then(() => task.refetch())
      .catch((err) => console.warn(err));
  };

  const onDeleteTask = (taskId) => {
    deleteTask
      .mutateAsync({
        projectId: id,
        taskId,
      })
      .then(() => task.refetch())
      .catch((err) => console.warn(err));
  };

  const onBulkActions = () => {
    bulkActions
      .mutateAsync({
        projectId: id,
        body: {
          action: getValues("action"),
          tasks: selectedTasks,
        },
      })
      .then(() => {
        task.refetch();
        reset();
        setSelectedTasks([]);
        selectAllRef.current.checked = false;
      })
      .catch((err) => console.warn(err?.message));
  };

  const onSelectAll = (checked) => {
    if (!checked) setSelectedTasks([]);
    if (selectedTasks.length === tasks?.all?.length) {
      setSelectedTasks([]);
    } else {
      setSelectedTasks(tasks?.all?.map((item) => item?._id));
    }
  };

  const onSendApproval = (taskId) => {
    sendApproval
      .mutateAsync({
        projectId: id,
        taskId,
      })
      .then(() => task.refetch())
      .catch((err) => console.warn(err));
  };

  const tabData = [
    {
      label: `All (${tasks?.all?.length})`,
      content: (
        <Box id={tasks?.all?.length} h="345px" overflow="auto" w={"full"}>
          {!tasks?.all?.length  && <Flex flexDirection={'column'} justifyContent={'center'} h={'inherit'} alignItems={'center'} fontSize={'20px'} >No Result Found</Flex> }
          {tasks?.all?.map((item, index) => (

            <TaskListCard
              key={index}
              name={item?.name}
              type={item?.type}
              status={item?.status}
              stage={item?.stage}
              note={item?.note}
              assignees={item?.assignees}
              onStatusChange={(status) =>
                onUpdateTaskStatus(item._id, status?.label)
              }
              onEdit={() => onEditTask(item)}
              onDelete={() => onDeleteTask(item._id)}
              onSelectTask={() =>
                setSelectedTasks([...selectedTasks, item?._id])
              }
              activeIndex={getStatusActiveIndex(item?.status)}
              onApprove={() => onSendApproval(item._id)}
              isTaskSelected={selectedTasks?.includes(item?._id)}
            />
          ))}
        </Box>
      ),
    },
    {
      label: `Completed (${tasks?.completed?.length})`,
      content: (
        <Box id={tasks?.completed?.length} h="345px" w={"100%"}>
          {console.log(tasks?.completed)}
          {!tasks?.completed?.length  && <Flex flexDirection={'column'} justifyContent={'center'} h={'inherit'} alignItems={'center'} fontSize={'20px'} >No Result Found</Flex> }
          {tasks?.completed?.map((item, index) => (
            <TaskListCard
              key={index}
              name={item?.name}
              type={item?.type}
              status={item?.status}
              stage={item?.stage}
              note={item?.note}
              assignees={item?.assignees}
              onStatusChange={(status) =>
                onUpdateTaskStatus(item._id, status?.label)
              }
              onEdit={() => onEditTask(item)}
              onDelete={() => onDeleteTask(item._id)}
              onSelectTask={() =>
                setSelectedTasks([...selectedTasks, item?._id])
              }
              activeIndex={getStatusActiveIndex(item?.status)}
              onApprove={() => onSendApproval(item._id)}
              isTaskSelected={selectedTasks?.includes(item?._id)}
            />
          ))}
        </Box>
      ),
    },
    {
      label: `Inprogress (${tasks?.inProgress?.length})`,
      content: (
        <Box id={tasks?.inProgress?.length} h="345px" w={"full"}>
          {!tasks?.inProgress?.length  && <Flex flexDirection={'column'} justifyContent={'center'} h={'inherit'} alignItems={'center'} fontSize={'20px'} >No Result Found</Flex> }
          {tasks?.inProgress?.map((item, index) => (
            <TaskListCard
              key={index}
              name={item?.name}
              type={item?.type}
              status={item?.status}
              stage={item?.stage}
              note={item?.note}
              assignees={item?.assignees}
              onStatusChange={(status) =>
                onUpdateTaskStatus(item._id, status?.label)
              }
              onEdit={() => onEditTask(item)}
              onDelete={() => onDeleteTask(item._id)}
              onSelectTask={() =>
                setSelectedTasks([...selectedTasks, item?._id])
              }
              activeIndex={getStatusActiveIndex(item?.status)}
              onApprove={() => onSendApproval(item._id)}
              isTaskSelected={selectedTasks?.includes(item?._id)}
            />
          ))}
        </Box>
      ),
    },
  ];

  useEffect(() => {
    if(!disclosure?.isOpen){
      setSelected(null)
    }
  },[disclosure?.isOpen])

  return (
    <Box>
      <Box>
        <Box fontSize={"20px"} color={"#353535"}>
          Task List
        </Box>

        <Flex position={"absolute"} justifyContent={"space-between"} w={"96%"}>
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
              action={onAddNew}
              actionText={"New Task"}
              iconProps={{ bg: "#e5e5e5" }}
              icon={APP_ICONS.ADD}
              onQueryChange={(updatedQuery) =>
                setQuery({ ...query, ...updatedQuery })
              }
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
              maxW: "140px ",
            }}
          />
        </Flex>

        <TaskForm disclosure={disclosure} data={selected} />
      </Box>

      <Box pb={20} mt={"420px"}>
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
            onClick={() => onBulkActions()}
            mt={"28px"}
            isLoading={bulkActions.isPending}
          >
            Apply
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default TaskManagement;
