import React, { useCallback, useMemo } from "react";
import { Flex, Box } from "@chakra-ui/react";
import PlannerCard from "../../../../components/data/Cards/PlannerCard";
import { useUserRole } from "../../../../hooks";

const PlannerDataTab = ({
  data,
  onUpdateItemStatus,
  onEditTask,
  onDeleteTask,
  getStatusActiveIndex,
  onSendApproval,
  onSchedule,
  setSelectedTasks,
  selectedTasks,
}) => {
  const { isInternal } = useUserRole();

  const handleSelectTask = (e, itemId, planId) => {
    if (e.target?.checked) {
      const selectedRecord = {
        contentId: itemId,
        planId,
      };
      setSelectedTasks([...selectedTasks, selectedRecord]);
    } else {
      setSelectedTasks(
        selectedTasks?.filter((task) => task.contentId !== itemId)
      );
    }
  };

  const checkSelection = useCallback(
    (itemId) => {
      return selectedTasks?.some((task) => task.contentId === itemId);
    },
    [selectedTasks]
  );

  return (
    <Box h="345px" overflow="auto" w={"full"}>
      {!data?.length && (
        <Flex
          flexDirection={"column"}
          justifyContent={"center"}
          h={"inherit"}
          alignItems={"center"}
          fontSize={"20px"}
        >
          No Result Found
        </Flex>
      )}
      {data?.map((item, index) => (
        <PlannerCard
          key={index}
          plan={item}
          onStatusChange={(status, planId) =>
            onUpdateItemStatus({
              creativeId: planId,
              imageId: item.itemId,
              status: status?.label,
            })
          }
          onSchedule={() => onSchedule(item)}
          onEdit={() => onEditTask(item)}
          onDelete={() => onDeleteTask(item.itemId)}
          onSelectTask={(e) => {
            handleSelectTask(e, item?.itemId, item?.planId);
          }}
          activeIndex={getStatusActiveIndex(item?.status)}
          onApprove={(status) =>
            onUpdateItemStatus({
              planId: item.planId,
              itemId: item.itemId,
              status: status || "Approved",
            })
          }
          onRework={(status) =>
            onUpdateItemStatus({
              planId: item.planId,
              itemId: item.itemId,
              status: status || "Rework",
            })
          }
          onSubmitApproval={(status) =>
            onUpdateItemStatus({
              planId: item.planId,
              itemId: item.itemId,
              status: status || "SubmitToClient",
            })
          }
          onRejected={(status) =>
            onUpdateItemStatus({
              planId: item.planId,
              itemId: item.itemId,
              status: status || "rejected",
            })
          }
          isSelected={checkSelection(item?.itemId)}
        />
      ))}
    </Box>
  );
};

export default PlannerDataTab;
