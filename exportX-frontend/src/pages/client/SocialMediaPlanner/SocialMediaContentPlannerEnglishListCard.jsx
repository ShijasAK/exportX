import React from 'react';
import DropdownSelect from '../../../components/controls/Dropdowns/DropdownSelect';
import APP_ICONS from '../../../config/constants/icons';
import {
  Box,
  Button,
  Flex,
  Icon,
  IconButton,
  Image,
  Text,
  useColorMode,
  useDisclosure,
} from '@chakra-ui/react';
import HistoryCardSteps from './History/HistoryCardSteps';
import APP_IMAGES from '../../../config/constants/images';
import { useState } from 'react';
import { colorKeys, getColor } from '../../../config/constants/colors';
import ScheduleForm from '../Projects/ProjectDetails/ScheduleForm';
import DeletePlannerItem from '../Projects/ProjectDetails/DeletePlannerItem';

const getStepActiveIndex = (status) => {
  switch (status?.toLowerCase()) {
    case 'inprogress':
      return 0;
    case 'completed':
      return 1;
    case 'apporaval':
      return 2;
    default:
      return 0;
  }
};

const SocialMediaContentPlannerEnglishListCard = ({
  title,
  description,
  cardImage,
  plan = {},
  onDeleteRecord = null,
  onEditTask = null,
}) => {
  const { colorMode } = useColorMode();

  const descriptionDisclosure = useDisclosure();
  const scheduleDisclosure = useDisclosure();
  const deleteDisclosure = useDisclosure();

  const filterRange = [
    {
      id: 1,
      label: 'Edit',
      onClick: onEditTask,
    },
    {
      id: 2,
      label: 'Delete',
      onClick: deleteDisclosure.onOpen,
    },
  ];

  const stepsArray = [
    {
      title: 'Inprogress',
    },
    {
      title: 'Completed',
    },
    {
      title: 'Apporaval',
    },
  ];
  return (
    <Box pb={3}>
      <Flex
        role='group'
        alignItems={'center'}
        justifyContent={'space-between'}
        borderRadius={'4px'}
        bgColor={'#FAFCFE'}
        h={'80px'}
        padding={'15px 20px 15px 20px'}
      >
        <Flex alignItems={'center'}>
          <Flex
            justify={'center'}
            align='center'
            border='0.5px solid #c9c9c9'
            h='50px'
            w='50px'
            borderRadius={'4px'}
            bgColor={'rgb(242 242 242)'}
            ml={4}
          >
            <Image
              minW='50px'
              minH={'50px'}
              src={cardImage ? cardImage : APP_IMAGES.BGIMAGE1}
            />
          </Flex>
          <Flex
            flexDirection={'column'}
            justifyContent={'space-between'}
            ml={3}
          >
            <Text fontSize={'12px'} fontWeight={500} color={'#353535'}>
              {title}
            </Text>

            <Text color={'#828282'} fontSize={'10px'}>
              {description}
            </Text>

            <Text textColor={'#FF5017'} fontSize={'12px'}>
              Read more
            </Text>
          </Flex>
        </Flex>

        <Flex alignItems={'center'}>
          <Box mr={3} mt={3}>
            <HistoryCardSteps
              activeIndex={getStepActiveIndex('inprogress')}
              stepsArray={stepsArray.map((item) => item.title)}
              dividerProps={{ w: '40px' }}
              iconProps={{ w: '20px', h: '20px' }}
            />
          </Box>
          <Flex flexDirection={'column'} justifyContent={'space-between'}>
            <Flex justifyContent={'end'}>
              <DropdownSelect
                options={filterRange}
                buttonProps={{
                  as: IconButton,
                  w: '40px',
                  h: '40px',
                  variant: 'unstyled',
                  display: 'flex',
                  icon: (
                    <Icon
                      boxSize={4}
                      color={getColor(colorKeys.gray, colorMode)}
                      as={APP_ICONS.MORE_OPTIONS}
                    />
                  ),
                }}
                hideIcon={true}
              />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <ScheduleForm disclosure={scheduleDisclosure} data={plan} />
      <DeletePlannerItem
        disclosure={deleteDisclosure}
        data={plan}
        onDeleteSuccess={onDeleteRecord}
      />
    </Box>
  );
};

export default SocialMediaContentPlannerEnglishListCard;
