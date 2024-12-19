import {
  Heading,
  SimpleGrid,
  VStack,
  useColorMode,
  HStack,
  Button,
} from '@chakra-ui/react';
import React from 'react';
import DataAccordian from '../../../../../components/data/Poppers/DataAccordian';
import { colorKeys, getColor } from '../../../../../config/constants/colors';
import FormSelect from '../../../../../components/forms/FormSelect';
import { useForm } from 'react-hook-form';
import FormInput from '../../../../../components/forms/FormInput';
import { getStringRules } from '../../../../../config/utils/validationUtil';
import { makeSelectList } from '../../../../../config/utils/selectListUtil';
import FormTextarea from '../../../../../components/forms/FormTextarea';
import FileIcon from '../../../../../components/Icons/FileIcon';
import UsersIcon from '../../../../../components/Icons/UsersIcon';
import { Screenmirroring } from 'iconsax-react';
import ScreenIcon from '../../../../../components/Icons/ScreenIcon';
import PencilIcon from '../../../../../components/Icons/PencilIcon';
import { useParams } from 'react-router-dom';
import {
  useFeedAiSettings,
  useUpdateFeedAiSettings,
} from '../../../../../config/query/projectContentPlannerQuery';
import { useAdGoals } from '../../../../../config/query/adGoalsQuery';
import { useToneOfVoice } from '../../../../../config/query/toneOfVoiceQuery';

const MoreAbout = ({ onNext, onPrev }) => {
  //if id is avaialble means we are in project details page
  const { id } = useParams(); //projectId
  const { colorMode } = useColorMode();

  const toneOfVoices = useToneOfVoice();
  const adGoals = useAdGoals();
  const feedAiSettings = useFeedAiSettings(id);
  const updateFeedAiSettings = useUpdateFeedAiSettings(id);

  const {
    control,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm({
    values: {
      ...feedAiSettings.data?.data,
    },
  });

  const onSubmit = (values) => {
    updateFeedAiSettings
      .mutateAsync(values)
      .then(() => onNext())
      .catch((e) => console.warn(e));
  };

  return (
    <VStack align='stretch' spacing={3}>
      <Heading
        fontSize={'20px'}
        color={getColor(colorKeys.whiteSmoke, colorMode)}
      >
        Feed AI
      </Heading>
      {feedAiSettings.isLoading ? (
        <div>Loading...</div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <DataAccordian
            data={[
              {
                label: 'Client Brief',
                content: (
                  <VStack align={'stretch'} spacing={3}>
                    <SimpleGrid
                      w='full'
                      spacing={3}
                      columns={{ base: 1, md: 2 }}
                    >
                      <FormSelect
                        id='clientBrief.adGoals'
                        label='Ad Goals'
                        placeholder={'Ad Goals'}
                        required={false}
                        hideLabel={false}
                        errors={errors}
                        control={control}
                        options={makeSelectList(
                          adGoals.data?.data?.adGoals,
                          '_id',
                          'adGoal'
                        )}
                      />

                      <FormSelect
                        id='clientBrief.toneOfVoice'
                        label='Tone of voice'
                        placeholder={'Tone of voice'}
                        required={false}
                        hideLabel={false}
                        errors={errors}
                        control={control}
                        options={makeSelectList(
                          toneOfVoices.data?.data?.toneOfVoices,
                          '_id',
                          'toneOfVoice'
                        )}
                      />
                    </SimpleGrid>

                    <FormInput
                      id={'clientBrief.targetAudience'}
                      label={'Target Audience'}
                      placeholder='Target Audience'
                      required={true}
                      errors={errors}
                      control={control}
                      inputProps={{ fontSize: '15px' }}
                      hideLabel={false}
                      rules={getStringRules()}
                      rightElement={<UsersIcon fontSize={'23px'} mt={1} />}
                    />

                    <FormInput
                      id={'clientBrief.productServiceName'}
                      label={'Product/ Service Name'}
                      placeholder='Product/ Service Name'
                      required={true}
                      errors={errors}
                      control={control}
                      inputProps={{ fontSize: '15px' }}
                      hideLabel={false}
                      rules={getStringRules()}
                      rightElement={<ScreenIcon fontSize={'23px'} mt={1} />}
                    />

                    <FormTextarea
                      id={'clientBrief.briefDescription'}
                      label='Brand Description'
                      hideLabel={false}
                      placeholder='Brand Description'
                      errors={errors}
                      control={control}
                      rightElement={<PencilIcon fontSize={'23px'} mt={1} />}
                    />
                  </VStack>
                ),
              },
              {
                label: 'Project Brief',
                content: (
                  <VStack align={'stretch'} spacing={3}>
                    <SimpleGrid
                      w='full'
                      spacing={3}
                      columns={{ base: 1, md: 2 }}
                    >
                      <FormSelect
                        id='projectBrief.adGoals'
                        label='Ad Goals'
                        placeholder={'Ad Goals'}
                        required={false}
                        hideLabel={false}
                        errors={errors}
                        control={control}
                        options={makeSelectList(
                          adGoals.data?.data?.adGoals,
                          '_id',
                          'adGoal'
                        )}
                      />

                      <FormSelect
                        id='projectBrief.toneOfVoice'
                        label='Tone of voice'
                        placeholder={'Tone of voice'}
                        required={false}
                        hideLabel={false}
                        errors={errors}
                        control={control}
                        options={makeSelectList(
                          toneOfVoices.data?.data?.toneOfVoices,
                          '_id',
                          'toneOfVoice'
                        )}
                      />
                    </SimpleGrid>

                    <FormInput
                      id={'projectBrief.targetAudience'}
                      label={'Target Audience'}
                      placeholder='Target Audience'
                      required={true}
                      errors={errors}
                      control={control}
                      inputProps={{ fontSize: '15px' }}
                      hideLabel={false}
                      rules={getStringRules()}
                      rightElement={<UsersIcon fontSize={'23px'} mt={1} />}
                    />

                    <FormInput
                      id={'projectBrief.productServiceName'}
                      label={'Product/ Service Name'}
                      placeholder='Product/ Service Name'
                      required={true}
                      errors={errors}
                      control={control}
                      inputProps={{ fontSize: '15px' }}
                      hideLabel={false}
                      rules={getStringRules()}
                      rightElement={<ScreenIcon fontSize={'23px'} mt={1} />}
                    />

                    <FormTextarea
                      id={'projectBrief.briefDescription'}
                      label='Description'
                      hideLabel={false}
                      placeholder='Description'
                      errors={errors}
                      control={control}
                      rightElement={<PencilIcon fontSize={'23px'} mt={1} />}
                    />
                  </VStack>
                ),
              },
              {
                label: 'Tag Ideas',
                content: (
                  <FormTextarea
                    id={'tagIdeas'}
                    label='Client Brief'
                    hideLabel={false}
                    placeholder='Client Brief'
                    errors={errors}
                    control={control}
                  />
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
              onClick={onPrev}
            >
              Go Back
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
              isLoading={updateFeedAiSettings.isPending}
            >
              Continue
            </Button>
          </HStack>
        </form>
      )}
    </VStack>
  );
};

export default MoreAbout;
