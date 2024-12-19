import React from 'react';
import { Box, Button, Divider, VStack, useDisclosure } from '@chakra-ui/react';
import TaskCard from '../../../../components/data/Cards/TaskCard';
import { Link } from 'react-router-dom';

const TaskList = ({ data }) => {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <Box>
      <VStack divider={<Divider />} align={'stretch'} spacing={2}>
        {data?.map((item, index) => {
          if (index > 3 && !isOpen) return null;
          return (
            <TaskCard
              key={index}
              name={item?.name}
              projectId={item?.projectId}
            />
          );
        })}
      </VStack>
      <Button
        display={data?.length > 4 ? 'flex' : 'none'}
        w={'full'}
        mt={'5px'}
        borderRadius={'none'}
        borderEndStartRadius={'10px'}
        borderEndEndRadius={'10px'}
        h={'37px'}
        p={'15px 0px 15px 0px'}
        fontSize={'10px'}
        color={'#C90016'}
        onClick={onToggle}
      >
        View {isOpen ? 'Less' : 'More'}
      </Button>
    </Box>
  );
};

export default TaskList;
