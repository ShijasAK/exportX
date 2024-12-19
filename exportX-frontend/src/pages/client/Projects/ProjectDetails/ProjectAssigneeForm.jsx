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
} from '@chakra-ui/react';
import React, { useState } from 'react';
import {
  useCreateProjectUser,
  useProjectAssignees,
  useProjectUsers,
} from '../../../../config/query/projectUsersQuery';
import { useParams } from 'react-router-dom';
import FormComboBox from '../../../../components/forms/FormComboBox';
import { useQueryClient } from '@tanstack/react-query';

const ProjectAssigneeForm = ({ disclosure, onSave, projectId }) => {
  const queryClient = useQueryClient();
  const [query, setQuery] = useState('');
  const projectAssignees = useProjectAssignees(projectId);
  const [selectedProjectUser, setSelectedProjectUser] = useState(null);

  const onSubmit = () => {
    if (onSave) {
      const projectUser = projectAssignees.data?.data?.projectAssignees?.find(
        (item) => item.projectCoordinator?._id === selectedProjectUser?.value
      );
      onSave(selectedProjectUser?.value);
      disclosure?.onClose();
      return;
    }
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
        <ModalHeader>Add Project User</ModalHeader>
        <ModalBody>
          <VStack
            rounded='md'
            as='form'
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onSubmit();
            }}
            align={'stretch'}
          >
            <FormComboBox
              onChange={(value) => setSelectedProjectUser(value)}
              onInputChange={(value) => setQuery(value)}
              value={selectedProjectUser}
              options={projectAssignees.data?.data?.projectAssignees?.map(
                (item) => ({
                  label: `${item.projectCoordinator?.firstName || ''} ${
                    item.projectCoordinator?.lastName || ''
                  }`,
                  value: item.projectCoordinator?._id,
                })
              )}
              placeholder={'Search Project User'}
              listProps={{ w: '400px' }}
              query={query}
            />
            <HStack pb={2}>
              <Button w='full' onClick={disclosure?.onClose}>
                Cancel
              </Button>
              <Button
                type='submit'
                w='full'
                bg={'#2F2F2F'}
                color='#ff5017'
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

export default ProjectAssigneeForm;
