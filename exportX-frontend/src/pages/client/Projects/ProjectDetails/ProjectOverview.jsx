import {
  Box,
  Button,
  HStack,
  SimpleGrid,
  VStack,
  useColorMode,
} from '@chakra-ui/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import FormTextarea from '../../../../components/forms/FormTextarea';
import FormInput from '../../../../components/forms/FormInput';
import { getStringRules } from '../../../../config/utils/validationUtil';
import DataAccordian from '../../../../components/data/Poppers/DataAccordian';
import ProjectBrief from './ProjectBrief';
import { colorKeys, getColor } from '../../../../config/constants/colors';
import { Link, useParams } from 'react-router-dom';
import FormDateInput from '../../../../components/forms/FormDateInput';
import PencilIcon from '../../../../components/Icons/PencilIcon';
import { useAdGoals } from '../../../../config/query/adGoalsQuery';
import { useProjectOverview } from '../../../../config/query/projectQuery';
import { formatDateForServer } from '../../../../config/utils/dateUtil';

const ProjectOverview = ({ data }) => {
  const { colorMode } = useColorMode();
  const { id } = useParams();
  const projectOverview = useProjectOverview(id);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    values: {
      description: data?.description,
      createdAt: data?.createdAt,
      startDate: data?.startDate,
      endDate: data?.endDate,
      projectBrief: {
        callToAction: null,
        adGoals: data?.projectBrief?.adGoals,
        toneOfVoice: data?.projectBrief?.toneOfVoice,
        briefDescription: data?.projectBrief?.briefDescription,
        targetAudience: data?.projectBrief?.targetAudience,
        productServiceName: data?.projectBrief?.productServiceName,
      },
    },
  });

  function onSubmit(values) {
    const payload = {
      ...values,
      startDate: formatDateForServer(values.startDate),
      endDate: formatDateForServer(values.endDate),
    };

    delete payload.createdAt;

    projectOverview
      .mutateAsync(payload)
      .then(() => {})
      .catch((err) => console.warn(err));
  }

  return (
    <VStack
      align='stretch'
      spacing={5}
      as='form'
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormTextarea
        id={'description'}
        label='Project Description'
        hideLabel={false}
        placeholder='Write project description'
        errors={errors}
        control={control}
        rightElement={<PencilIcon fontSize={'23px'} mt={1} />}
        required={true}
      />

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={5}>
        <FormDateInput
          label={'Created Date'}
          control={control}
          errors={errors}
          id='createdAt'
          required={true}
          hideLabel={false}
          placeholder={'Created Date'}
          inputProps={{ isDisabled: true }}
        />

        <FormDateInput
          label={'Start Date'}
          control={control}
          errors={errors}
          id='startDate'
          required={true}
          hideLabel={false}
          placeholder={'Start Date'}
        />

        <FormDateInput
          label={'End Date'}
          control={control}
          errors={errors}
          id='endDate'
          required={true}
          hideLabel={false}
          placeholder={'End Date'}
        />
      </SimpleGrid>

      <DataAccordian
        data={[
          {
            label: 'Project Brief',
            content: (
              <ProjectBrief control={control} errors={errors} data={data} />
            ),
          },
        ]}
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
          color={'#BFBFBF'}
          as={Link}
          to='/dashboard/projects'
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
          onClick={handleSubmit(onSubmit)}
          isLoading={projectOverview.isPending}
        >
          Save
        </Button>
      </HStack>
    </VStack>
  );
};

export default ProjectOverview;
