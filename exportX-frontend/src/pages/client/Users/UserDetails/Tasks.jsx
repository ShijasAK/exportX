import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Heading,
  Icon,
  SimpleGrid,
  VStack,
  useColorMode,
} from '@chakra-ui/react';
import React from 'react';
import { colorKeys, getColor } from '../../../../config/constants/colors';
import APP_ICONS from '../../../../config/constants/icons';
import FormInput from '../../../../components/forms/FormInput';
import { EMAIL_REGEX } from '../../../../config/constants/regex';
import { useForm } from 'react-hook-form';
import { getStringRules } from '../../../../config/utils/validationUtil';
import FormSelect from '../../../../components/forms/FormSelect';
import { makeSelectList } from '../../../../config/utils/selectListUtil';
import ProjectCard from '../../../../components/data/Cards/ProjectCard';
import TaskCard from '../../../../components/data/Cards/TaskCard';
import { Link } from 'react-router-dom';

const countries = [
  {
    id: 1,
    name: 'India',
  },
  {
    id: 2,
    name: 'USA',
  },
  {
    id: 3,
    name: 'UK',
  },
];

const Tasks = ({ data }) => {
  const { colorMode } = useColorMode();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  return (
    <Flex flexDir={'column'} justify={'space-between'}>
      <Box h='calc(100vh - 220px)' overflowY={'auto'}>
        <Flex mb={4} justify='space-between' align='center'>
          <Heading fontSize='20px' fontWeight={'400'}>
            Tasks
          </Heading>
          <Button
            fontSize='14px'
            fontWeight={'400'}
            display={'flex'}
            alignItems={'center'}
            variant={'unstyled'}
            as={Link}
            to={'/dashboard/projects'}
            rightIcon={
              <Flex
                justify={'center'}
                align='center'
                bg={'#e5e5e5'}
                rounded='full'
                w='30px'
                h='30px'
              >
                <Icon
                  rounded='full'
                  color={getColor(colorKeys.primary, colorMode)}
                  as={APP_ICONS.ARROW_RIGHT}
                  boxSize='4'
                />
              </Flex>
            }
          >
            View More
          </Button>
        </Flex>

        <VStack divider={<Divider />} align={'stretch'} spacing={2}>
        {!data?.length   && <Flex mt={'200px'} flexDirection={'column'} justifyContent={'center'} h={'inherit'} alignItems={'center'} fontSize={'20px'} >No Result Found</Flex> }
          {data?.map((item, index) => (
            <TaskCard
              key={index}
              name={item?.name}
              projectId={item?.projectId}
            />
          ))}
        </VStack>
      </Box>
    </Flex>
  );
};

export default Tasks;
