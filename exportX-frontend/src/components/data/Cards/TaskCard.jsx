import { Flex, HStack, Icon, Text, useColorMode } from '@chakra-ui/react';
import React from 'react';
import APP_ICONS from '../../../config/constants/icons';
import { colorKeys, getColor } from '../../../config/constants/colors';
import { Link } from 'react-router-dom';

const TaskCard = ({ name, projectId }) => {
  const { colorMode } = useColorMode();
  return (
    <HStack>
      <Flex
        justify={'center'}
        align='center'
        border='0.5px solid #c9c9c9'
        h='30px'
        w='30px'
        rounded={'full'}
      >
        <Icon color='#F84516' variant='Bold' as={APP_ICONS.CLIPBOARD} />
      </Flex>
      <Text
        fontSize={'12px'}
        color={getColor(colorKeys.whiteSmoke, colorMode)}
        as={Link}
        to={`/dashboard/projects/${projectId}`}
      >
        {name}
      </Text>
    </HStack>
  );
};

export default TaskCard;
