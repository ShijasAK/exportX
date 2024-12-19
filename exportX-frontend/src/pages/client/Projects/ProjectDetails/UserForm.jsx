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
  useAllClientUsers,
  useCreateProjectClientUser,
  useProjectClientUsers,
} from "../../../../config/query/projectUsersQuery";
import { useParams } from "react-router-dom";
import FormComboBox from "../../../../components/forms/FormComboBox";
import { useClientUserLookup } from "../../../../config/query/projectQuery";

const UserForm = ({ disclosure,clientId }) => {
  const { id } = useParams();
  const [query, setQuery] = useState("");
  const clientUsers = useClientUserLookup(clientId);
  const createClientUser = useCreateProjectClientUser(id);
  const [selectedClientUser, setSelectedClientUser] = useState(null);

  const onSubmit = () => {
    createClientUser
      .mutateAsync({ user: selectedClientUser?.value })
      .then(() => {
        disclosure?.onClose();
        setSelectedClientUser(null);
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
        <ModalHeader>Add Client User</ModalHeader>
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
              onChange={(value) => setSelectedClientUser(value)}
              onInputChange={(value) => setQuery(value)}
              value={selectedClientUser}
              options={clientUsers.data?.data?.clientUsers?.map((item) => ({
                label: item.clientUserDetails?.name,
                value: item?.clientUserDetails?.Id,
                subLabel: item.clientUserDetails?.email,
              }))}
              placeholder={"Search Client User"}
              listProps={{ w: "400px" }}
              query={query}
            />
            <HStack pb={2}>
              <Button w="full" onClick={disclosure?.onClose}>
                Cancel
              </Button>
              <Button
                isLoading={createClientUser.isPending}
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

export default UserForm;
