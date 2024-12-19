import React from "react";
import {
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useDeleteCreative } from "../../../../config/query/projectContentPlannerQuery";

const DeletePlannerItem = ({ disclosure, data, onDeleteSuccess = null }) => {
  const { id } = useParams();
  const deleteQuery = useDeleteCreative();

  const onConfirm = () => {
    deleteQuery
      .mutateAsync({
        projectId: id,
        creativeId: data?.planId,
        imageId: data?.itemId,
      })
      .then(() => {
        disclosure?.onClose();
        onDeleteSuccess && onDeleteSuccess();
      })
      .catch((error) => console.warn(error));
  };
  return (
    <Modal
      isCentered={true}
      isOpen={disclosure?.isOpen}
      onClose={disclosure?.onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader>Delete</ModalHeader>
        <ModalBody>
          <VStack rounded="md" align={"stretch"}>
            <Text>Are you sure you want to delete this item?</Text>
            <HStack pb={2}>
              <Button w="full" onClick={disclosure?.onClose}>
                Cancel
              </Button>
              <Button
                isLoading={deleteQuery.isPending}
                onClick={onConfirm}
                w="full"
                bg={"#2F2F2F"}
                color={"#fff"}
              >
                Delete
              </Button>
            </HStack>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default DeletePlannerItem;
