import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import DataDrawer from '../../../../../components/data/Poppers/DataDrawer';
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  IconButton,
  SimpleGrid,
  Text,
  VStack,
  useColorMode,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import FormInput from '../../../../../components/forms/FormInput';
import FormSelect from '../../../../../components/forms/FormSelect';
import { getStringRules } from '../../../../../config/utils/validationUtil';
import { makeSelectList } from '../../../../../config/utils/selectListUtil';
import { colorKeys, getColor } from '../../../../../config/constants/colors';
import APP_ICONS from '../../../../../config/constants/icons';
import FormTextarea from '../../../../../components/forms/FormTextarea';
import NoteBookIcon from '../../../../../components/Icons/NoteBookIcon';
import PencilIcon from '../../../../../components/Icons/PencilIcon';
import FileIcon from '../../../../../components/Icons/FileIcon';
import LayerIcon from '../../../../../components/Icons/LayerIcon';
import {
  useCreateTask,
  useUpdateTask,
} from '../../../../../config/query/taskQuery';
import { useProjects } from '../../../../../config/query/projectQuery';
import { useParams } from 'react-router-dom';
import ProjectAssigneeForm from '../ProjectAssigneeForm';
import API_CONSTANTS from '../../../../../config/constants/api';
import { getImageUrl } from '../../../../../config/utils/fileUtil';

const TaskForm = ({ disclosure, data }) => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const { colorMode } = useColorMode();
  const userFormDisclosure = useDisclosure();
  const createTask = useCreateTask();
  const updateTask = useUpdateTask();
  const [query, setQuery] = useState('');
  const projects = useProjects({ search: query });
  const toast = useToast(); // Initialize the useToast hook

  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    values: {
      projectId: data?.projectId ? data?.projectId : id,
      type: data?.type,
      name: data?.name,
      assignees: data?.assignees?.map((item) => item._id),
      stage: data?.stage,
      note: data?.note,
    },
  });

  const onSubmit = (values) => {
    const assignees = getValues('assignees') || [];
    values.assignees = assignees.map((item) => {
      if (typeof item === 'object') {
        return item._id;
      }
      return item;
    });
    const payload = data?._id
      ? { projectId: id, taskId: data?._id, body: values }
      : values;
    const formMutate = data ? updateTask.mutateAsync : createTask.mutateAsync;

    formMutate(payload)
      .then(() => {
        disclosure.onClose();
        reset();
        queryClient.invalidateQueries([
          API_CONSTANTS.TASKS.base.replace(':projectId', id),
        ]);
      })
      .catch((err) => console.error(err));
  };

  const onAddAssignee = (assigneeId) => {
    // Receive the assignee's _id
    const assignees = getValues('assignees') || [];
    const isAlreadySelected = assignees.some((item) => item._id === assigneeId); // Check against the assignee's _id
    // Fetch additional information of the assignee based on the received _id if needed
    if (!isAlreadySelected) {
      setValue('assignees', [...assignees, { _id: assigneeId }]); // Add the assignee's _id to the list
    } else {
      // Display toast message if assignee is already added
      toast({
        title: 'Assignee already added.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <DataDrawer
      disclosure={disclosure}
      heading={data?._id ? 'Update Task' : 'Add New Task'}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex flexDir={'column'} justify={'space-between'}>
          <Box h='calc(100vh - 155px)' overflowY={'auto'}>
            <VStack align='stretch' spacing={3}>
              <SimpleGrid w='full' spacing={3} columns={1}>
                <FormInput
                  id={'type'}
                  label={'Task type'}
                  placeholder='Task type'
                  required={true}
                  errors={errors}
                  control={control}
                  inputProps={{ fontSize: '15px' }}
                  hideLabel={false}
                  rules={getStringRules()}
                  rightElement={<NoteBookIcon fontSize={'23px'} mt={1} />}
                />

                <FormSelect
                  id='projectId'
                  label='Project Name'
                  placeholder={'Project Name'}
                  required={false}
                  hideLabel={false}
                  inputProps={{ isDisabled: true }}
                  errors={errors}
                  control={control}
                  options={makeSelectList(
                    projects.data?.data?.projects,
                    '_id',
                    'name'
                  )}
                />

                <FormInput
                  id={'name'}
                  label={'Task Name'}
                  placeholder='Task Name'
                  required={true}
                  errors={errors}
                  control={control}
                  inputProps={{ fontSize: '15px' }}
                  hideLabel={false}
                  rules={getStringRules()}
                  rightElement={<FileIcon fontSize={'23px'} mt={1} />}
                />

                <Box>
                  <Text
                    fontSize='15px'
                    color={getColor(colorKeys.gray, colorMode)}
                  >
                    Assignees<span style={{ color: 'red' }}>*</span>
                  </Text>
                  <HStack spacing={3}>
                    {watch('assignees') &&
                      watch('assignees')?.map((item, index) => (
                        <Avatar
                          border={`1px solid ${getColor(
                            colorKeys.primary,
                            colorMode
                          )}`}
                          h='50px'
                          name={`${item?.firstName} ${item?.lastName}`}
                          src={getImageUrl(item?.userImage?.path)}
                          w='50px'
                          key={index}
                        />
                      ))}
                    <IconButton
                      onClick={userFormDisclosure.onOpen}
                      w='50px'
                      h='50px'
                      rounded='full'
                      border={`1px dashed #bfbfbf`}
                      bg='transparent'
                      icon={
                        <Icon
                          boxSize={5}
                          color={getColor(colorKeys.primary, colorMode)}
                          as={APP_ICONS.ADD}
                        />
                      }
                    />
                  </HStack>
                </Box>

                <FormInput
                  id={'stage'}
                  label={'Stage'}
                  placeholder='Stage'
                  required={true}
                  errors={errors}
                  control={control}
                  inputProps={{ fontSize: '15px' }}
                  hideLabel={false}
                  rules={getStringRules()}
                  rightElement={<LayerIcon fontSize={'23px'} mt={1} />}
                />
              </SimpleGrid>

              <FormTextarea
                id={'note'}
                label='Note'
                hideLabel={false}
                placeholder='Note'
                errors={errors}
                required={true}
                control={control}
                rightElement={<PencilIcon fontSize={'23px'} mt={1} />}
              />
            </VStack>
          </Box>

          <ProjectAssigneeForm
            disclosure={userFormDisclosure}
            onSave={onAddAssignee}
            projectId={watch('projectId')}
          />

          <HStack justify={'flex-end'} mt={5}>
            <Button
              fontSize='14px'
              fontWeight={'400'}
              display={'flex'}
              alignItems={'center'}
              rounded={'full'}
              minW={'120px'}
              bg={getColor(colorKeys.lightGray, colorMode)}
              onClick={disclosure.onClose}
              color={'#BFBFBF'}
            >
              Cancel
            </Button>

            <Button
              fontSize='14px'
              fontWeight={'400'}
              display={'flex'}
              alignItems={'center'}
              rounded={'full'}
              minW={'120px'}
              bg={getColor(colorKeys.secondary, colorMode)}
              color={getColor(colorKeys.primary, colorMode)}
              _hover={{ opacity: 0.8 }}
              type='submit'
              isLoading={createTask.isPending || updateTask.isPending}
            >
              Save
            </Button>
          </HStack>
        </Flex>
      </form>
    </DataDrawer>
  );
};

export default TaskForm;
