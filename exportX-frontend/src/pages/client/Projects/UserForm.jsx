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
  VStack,
} from "@chakra-ui/react";
import { useProjectUserLookup } from "../../../config/query/projectQuery";
import { useForm } from "react-hook-form";
import FormSelect from "../../../components/forms/FormSelect";

const UserForm = ({ disclosure, onSubmit, addedUsers = [] }) => {
  const projectUsers = useProjectUserLookup();

  const { errors, control, handleSubmit } = useForm({
    defaultValues: {
      projectOwner: "",
    },
  });

  const onFormSubmit = (data) => {
    const projectOwner = projectUsers.data?.data?.projectUsers?.find(
      (item) => item._id === data?.projectOwner
    );
    onSubmit(projectOwner);
    disclosure?.onClose();
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
        <ModalHeader>Add User</ModalHeader>
        <ModalBody>
          <VStack
            rounded="md"
            as="form"
            onSubmit={handleSubmit(onFormSubmit)}
            align={"stretch"}
          >
            <FormSelect
              id="projectOwner"
              label={"Project User"}
              placeholder={"Project User"}
              required={false}
              hideLabel={false}
              errors={errors}
              control={control}
              labelProps={{ fontSize: "15px", color: "#707070" }}
              options={projectUsers.data?.data?.projectUsers
                ?.filter((item) => {
                  return !addedUsers.includes(item._id);
                })
                ?.map((item) => ({
                  label: `${item.firstName} (${item.lastName})`,
                  value: item._id,
                }))}
            />
            <HStack pb={2}>
              <Button w="full" onClick={disclosure?.onClose}>
                Cancel
              </Button>
              <Button type="submit" w="full" bg={"#2F2F2F"} color="#ff5017">
                Add
              </Button>
            </HStack>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default UserForm;
