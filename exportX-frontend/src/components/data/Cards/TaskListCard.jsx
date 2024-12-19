import {
  Avatar,
  AvatarGroup,
  Checkbox,
  Flex,
  Icon,
  IconButton,
  Text,
  useColorMode,
  Box,
} from "@chakra-ui/react";
// import { Box } from 'iconsax-react'
import React, { useState } from "react";
import APP_ICONS from "../../../config/constants/icons";
import DropdownSelect from "../../controls/Dropdowns/DropdownSelect";
import Steps from "../../controls/Steps";
import { colorKeys, getColor } from "../../../config/constants/colors";
import { getImageUrl } from "../../../config/utils/fileUtil";

const getStatusValue = (status) => {
  switch (status?.toLowerCase()) {
    case "pending":
      return "Pending";
    case "in progress":
      return "In Progress";
    case "completed":
      return "Completed";
    case "submit for approval":
      return "Completed";
    case "submitted for approval":
      return "Completed";
    case "rework required":
      return "In Progress";
    case "approved":
      return "Completed";
    default:
      return "Pending";
  }
};

const TaskListCard = ({
  title,
  project,
  status,
  stage,
  note,
  name,
  type,
  assignees,
  onStatusChange,
  onEdit,
  onDelete,
  onApprove,
  onSelectTask,
  isTaskSelected,
  activeIndex,
}) => {
  const { colorMode } = useColorMode();

  const statuses = [
    {
      id: 1,
      label: "Pending",
    },
    {
      id: 2,
      label: "In Progress",
    },
    {
      id: 3,
      label: "Completed",
    },
  ];

  const stepsArray = [
    {
      title: "Task Started",
    },
    {
      title: "Completed",
    },
    {
      title: "Pending Approval",
    },
    {
      title: "Approved",
    },
  ];

  return (
    <Box w={"full"}>
      <Flex
        alignItems={"center"}
        mt={5}
        justifyContent={"space-between"}
        borderRadius={"4px"}
        _hover={{
          bgColor: "#fff",
          border: "1px solid #90A2F8",
          borderRadius: "4px",
        }}
        bgColor={"#FAFCFE"}
        h={"80px"}
        padding={"15px 20px 15px 20px"}
      >
        <Flex alignItems={"center"}>
          <Box mt={2}>
            <Checkbox
              defaultChecked={isTaskSelected}
              onChange={onSelectTask}
              colorScheme="green"
            ></Checkbox>
          </Box>
          <Flex
            justify={"center"}
            align="center"
            border="0.5px solid #c9c9c9"
            h="30px"
            w="30px"
            rounded={"full"}
            bgColor={"rgb(242 242 242)"}
            ml={4}
          >
            <Icon color="#F84516" variant="Bold" as={APP_ICONS.CLIPBOARD} />
          </Flex>
          <Flex
            flexDirection={"column"}
            justifyContent={"space-between"}
            ml={3}
            mt={2}
          >
            <Text onClick={onEdit} cursor={"pointer"} _hover={{textDecor:"underline"}} fontSize={"14px"} fontWeight={500} color={"#353535"}>
              {name}
            </Text>
            <Flex
              alignItems={"center"}
              justifyContent={"space-between"}
              w={"full"}
              mt={"-3px"}
            >
              <Text color={"#828282"} fontSize={"12px"}>
                {note}
              </Text>
              <Flex>
                <Text ml={2} color={"#12B20F"} mr={"-8px"} mt={1}>
                  •
                </Text>
                <DropdownSelect
                  value={getStatusValue(status)}
                  options={statuses}
                  onChange={(status) => onStatusChange(status)}
                  buttonProps={{
                    bg: "transparent",
                    color: "#12B20F",
                    fontWeight: "700",
                    ml: 2,
                    w: "auto",
                  }}
                />
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <Flex alignItems={"center"}>
          <Box mr={10} mt={3}>
            <Steps
              activeIndex={activeIndex}
              stepsArray={stepsArray.map((item) => item.title)}
              dividerProps={{ w: "78px" }}
              hstackProps={{ spacing: "60px" }}
              textProps={{ fontSize: "10px" }}
              iconProps={{ w: "15px", h: "15px" }}
            />
          </Box>
          <Flex flexDirection={"column"} justifyContent={"space-between"}>
            <Flex justifyContent={"end"}>
              <DropdownSelect
                options={[
                  {
                    id: 1,
                    label: "Edit",
                    onClick: onEdit,
                  },
                  {
                    id: 2,
                    label: "Delete",
                    onClick: onDelete,
                  },
                  {
                    id: 3,
                    label: "Submit for Approval",
                    onClick: onApprove,
                  },
                ]}
                buttonProps={{
                  as: IconButton,
                  w: "40px",
                  h: "40px",
                  variant: "unstyled",
                  display: "flex",
                  icon: (
                    <Icon
                      boxSize={4}
                      color={getColor(colorKeys.gray, colorMode)}
                      as={APP_ICONS.MORE_OPTIONS}
                    />
                  ),
                }}
                hideIcon={true}
              />
            </Flex>
            <Flex>
              <AvatarGroup size="xs" max={2}>
                {assignees?.map((assignee) => (
                  <Avatar
                    key={assignee.id}
                    name={assignee.firstName + " " + assignee.lastName}
                    src={getImageUrl(assignee.userImage?.path)}
                  />
                ))}
              </AvatarGroup>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default TaskListCard;
