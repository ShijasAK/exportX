import {
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import FormInput from "../../../../components/forms/FormInput";
import {
  useCreateProjectClientUser,
  useProjectClientUsers,
} from "../../../../config/query/projectUsersQuery";
import { useParams } from "react-router-dom";
import FormComboBox from "../../../../components/forms/FormComboBox";
import { useCreateProjectDocumentType } from "../../../../config/query/projectQuery";

const DocumentTypeForm = ({ disclosure }) => {
  const createDocumentQuery = useCreateProjectDocumentType();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({});

  const onSubmit = (values) => {
    createDocumentQuery
      .mutateAsync(values)
      .then(() => {
        reset();
        disclosure?.onClose();
      })
      .catch((err) => console.warn(err));
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
        <ModalHeader>Add Document Type</ModalHeader>
        <ModalBody>
          <VStack
            rounded="md"
            as="form"
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleSubmit(onSubmit)();
            }}
            align={"stretch"}
          >
            <FormInput
              control={control}
              errors={errors}
              id="documentType"
              label="Document Type"
            />

            <HStack pb={2}>
              <Button w="full" onClick={disclosure?.onClose}>
                Cancel
              </Button>
              <Button
                isLoading={createDocumentQuery.isPending}
                type="submit"
                w="full"
                bg={"#2F2F2F"}
                color="#ff5017"
              >
                Add
              </Button>
            </HStack>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default DocumentTypeForm;
