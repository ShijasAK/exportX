import React, { useMemo } from "react";
import {
  Avatar,
  AvatarGroup,
  Checkbox,
  Flex,
  Icon,
  IconButton,
  useColorMode,
  Box,
  Image,
  Button,
  Collapse,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import APP_ICONS from "../../../config/constants/icons";
import DropdownSelect from "../../controls/Dropdowns/DropdownSelect";
import { colorKeys, getColor } from "../../../config/constants/colors";
import { getImageUrl } from "../../../config/utils/fileUtil";
import HistoryCardSteps from "../../../pages/client/SocialMediaPlanner/History/HistoryCardSteps";
import {
  getPlannerStepActiveIndex,
  plannerSteps,
} from "../../../config/utils/plannerUtil";
import { Calendar } from "iconsax-react";
import ScheduleForm from "../../../pages/client/Projects/ProjectDetails/ScheduleForm";
import DeletePlannerItem from "../../../pages/client/Projects/ProjectDetails/DeletePlannerItem";
import { useUserRole } from "../../../hooks";

const PlannerCard = ({
  plan,
  assignees,
  onEdit,
  onDelete,
  onApprove,
  onRework,
  onRejected,
  onSubmitApproval,
  onSchedule,
  onSelectTask,
  isSelected,
}) => {
  const { colorMode } = useColorMode();
  const descriptionDisclosure = useDisclosure();
  const scheduleDisclosure = useDisclosure();
  const deleteDisclosure = useDisclosure();
  const { isInternal, isExternal } = useUserRole();

  // Status List
  const isInProgress = plan?.status === "Inprogress";
  const isApproved = plan?.status === "Approved";
  const isApprovedClient = plan?.status === "ApprovedByClient";
  const isRejected = plan?.status === "Rejected";
  const isRejectedClient = plan?.status === "RejectedByClient";
  const isRework = plan?.status === "Rework";
  const isReworkClient = plan?.status === "ReworkByClient";
  const isSubmitted = plan?.status === "SubmitToClient";

  // Define dropdown options based on status
  let inProgressDropdownOptions = [
    {
      id: 1,
      label: "Edit",
      onClick: onEdit,
    },
    {
      id: 2,
      label: "Delete",
      onClick: deleteDisclosure.onOpen,
    },
    {
      id: 3,
      label: "Rework Required",
      onClick: onRework,
    },
    {
      id: 4,
      label: "Approve",
      onClick: onApprove,
    },
  ];

  let reworkDropdownOptions = [
    {
      id: 1,
      label: "Edit",
      onClick: onEdit,
    },
    {
      id: 4,
      label: "Approve",
      onClick: onApprove,
    },
  ];

  let ApprovedDropdownOptions = [
    {
      id: 1,
      label: "Submit for Approval",
      onClick: onSubmitApproval,
    },
  ];

  let RejectedDropdownOptions = [
    {
      id: 1,
      label: "Delete",
      onClick: deleteDisclosure.onOpen,
    },
  ];

  const clientDropdownOptions = [
    {
      id: 1,
      label: "Approve",
      onClick: () => onApprove("ApprovedByClient"),
    },
    {
      id: 2,
      label: "Rework Required",
      onClick: () => onRework("ReworkByClient"),
    },
    {
      id: 2,
      label: "Rejected",
      onClick: () => onRejected("RejectedByClient"),
    },
  ];

  const { dropdownOptions } = useMemo(() => {
    // Define dropdown options based on status
    let dropdownOptions;
    if (isInProgress) {
      dropdownOptions = inProgressDropdownOptions;
    } else if (isApproved) {
      dropdownOptions = ApprovedDropdownOptions;
    } else if (isRejected) {
      dropdownOptions = RejectedDropdownOptions;
    } else if (isRework) {
      dropdownOptions = reworkDropdownOptions;
    } else {
      // Handle other statuses or provide a default option array
    }

    if (isExternal) {
      dropdownOptions = clientDropdownOptions;
    }

    return {
      dropdownOptions,
    };
  }, [plan]);

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
        h={descriptionDisclosure.isOpen ? "auto" : "80px"}
        padding={"15px 20px 15px 20px"}
      >
        <Flex alignItems={"center"}>
          <Box mt={2}>
            <Checkbox
              isChecked={isSelected}
              onChange={onSelectTask}
              colorScheme="green"
            ></Checkbox>
          </Box>
          <Flex
            justify={"center"}
            align="center"
            border="0.5px solid #c9c9c9"
            h="50px"
            w="50px"
            rounded={"md"}
            bgColor={"rgb(242 242 242)"}
            ml={4}
          >
            <Image
              minW={"50px"}
              w="full"
              h="full"
              src={getImageUrl(plan?.image)}
            />
          </Flex>
          <Flex
            flexDirection={"column"}
            justifyContent={"space-between"}
            ml={3}
            mt={2}
          >
            <Flex
              alignItems={"center"}
              justifyContent={"space-between"}
              w={"full"}
              mt={"-3px"}
            >
              <Box maxW={"70%"}>
                <Collapse
                  color={"#828282"}
                  fontSize={"12px"}
                  className="collapse-text"
                  startingHeight={20}
                  in={descriptionDisclosure.isOpen}
                >
                  {plan?.post}
                </Collapse>

                <Button
                  variant={"link"}
                  size="sm"
                  color={"#828282"}
                  fontSize={"12px"}
                  onClick={descriptionDisclosure.onToggle}
                  pos="relative"
                  top="-10px"
                >
                  Show {descriptionDisclosure.isOpen ? "Less" : "More"}
                </Button>
              </Box>
              {plan?.scheduledDate ? (
                <Flex align={"center"}>
                  <Calendar />
                  <Box>
                    <Text color={"#FF5017"} fontSize={"8px"}>
                      Schedule Date
                    </Text>
                    <Text color="#707070" fontSize={"12px"}>
                      {plan?.scheduledDate}
                    </Text>
                  </Box>
                </Flex>
              ) : (
                // Render the button conditionally based on status
                isApproved && (
                  <Button
                    mr={4}
                    minW={"fit-content"}
                    size="sm"
                    bg="#E2EEFF !important"
                    color="#1758FF !important"
                    fontSize={"10px"}
                    fontWeight={"normal"}
                    onClick={scheduleDisclosure.onOpen}
                  >
                    Schedule Now
                  </Button>
                )
              )}
            </Flex>
          </Flex>
        </Flex>
        <Flex alignItems={"center"}>
          {isInternal && (
            <Box mr={10} mt={3}>
              <HistoryCardSteps
                activeIndex={getPlannerStepActiveIndex(plan?.status)}
                stepsArray={plannerSteps.map((item) => item.title)}
                dividerProps={{ w: "40px" }}
                iconProps={{ w: "20px", h: "20px" }}
              />
            </Box>
          )}
          <Flex flexDirection={"column"} justifyContent={"space-between"}>
            <Flex justifyContent={"end"}>
              {!isSubmitted && (
                <DropdownSelect
                  options={dropdownOptions}
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
              )}
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
      <ScheduleForm disclosure={scheduleDisclosure} data={plan} />
      <DeletePlannerItem disclosure={deleteDisclosure} data={plan} />
    </Box>
  );
};

export default PlannerCard;
