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
import {
  useCreateProjectUser,
  useProjectUsers,
} from "../../../../config/query/projectUsersQuery";
import { useParams } from "react-router-dom";
import FormComboBox from "../../../../components/forms/FormComboBox";
import { useQueryClient } from "@tanstack/react-query";

const ProjectUserForm = ({ disclosure, onSave, projectId }) => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const [query, setQuery] = useState("");
  const projectUsers = useProjectUsers(projectId ? projectId : id, {
    name: query,
  });
  const createProjectUser = useCreateProjectUser(id);
  const [selectedProjectUser, setSelectedProjectUser] = useState(null);

  const onSubmit = () => {
    if (onSave) {
      onSave(selectedProjectUser?.value);
      disclosure?.onClose();
      return;
    }
    createProjectUser
      .mutateAsync({ user: selectedProjectUser?.value })
      .then(() => {
        disclosure?.onClose();
        setSelectedProjectUser(null);
        queryClient.invalidateQueries([
          API_CONSTANTS.PROJECT_DISCUSSIONS.base.replace(":projectId", id),
        ]);
        setQuery("");
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
        <ModalHeader>Add Project Assignees</ModalHeader>
        <ModalBody>
          <VStack
            rounded="md"
            as="form"
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onSubmit();
            }}
            align={"stretch"}
          >
            <FormComboBox
              onChange={(value) => setSelectedProjectUser(value)}
              onInputChange={(value) => setQuery(value)}
              value={selectedProjectUser}
              options={projectUsers.data?.data?.projectUsers?.map((item) => ({
                label: `${item.firstName || ""} ${item.lastName || ""}`,
                value: item._id,
              }))}
              placeholder={"Search Project User"}
              listProps={{ w: "400px" }}
              query={query}
            />
            <HStack pb={2}>
              <Button w="full" onClick={disclosure?.onClose}>
                Cancel
              </Button>
              <Button
                isLoading={createProjectUser.isPending}
                type="submit"
                w="full"
                bg={"#2F2F2F"}
                color="#ff5017"
                isDisabled={!selectedProjectUser}
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

export default ProjectUserForm;
