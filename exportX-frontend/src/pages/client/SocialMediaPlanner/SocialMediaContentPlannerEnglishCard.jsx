import {
  Box,
  Button,
  Flex,
  HStack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import SocialMediaContentPlannerEnglishListCard from './SocialMediaContentPlannerEnglishListCard';
import { AddCircle } from 'iconsax-react';
import AddImageForm from '../Tools/ToolForms/ImageForm';
import { getImageUrl } from '../../../config/utils/fileUtil';
import { colorKeys, getColor } from '../../../config/constants/colors';
import { useQueryClient } from '@tanstack/react-query';
import API_CONSTANTS from '../../../config/constants/api';
import { useParams } from 'react-router';

const SocialMediaContentPlannerEnglishCard = ({
  data,
  getRecords,
  language,
}) => {
  const { id } = useParams(); //projectId
  const generateCreativeDisclosure = useDisclosure();
  const [selected, setSelected] = useState(null);
  const queryClient = useQueryClient();

  const onGenerateCreative = (creative) => {
    generateCreativeDisclosure.onOpen();
    setSelected({ ...creative, projectId: id });
  };

  const onEditTask = (item) => {
    setSelected({ ...item, projectId: id });
    generateCreativeDisclosure.onOpen();
  };

  const onDeleteRecord = (record) => {
    getRecords && getRecords();
  };

  return (
    <Box>
      {data?.map((item, index) => (
        <Box shadow={'sm'} mt={5} key={index}>
          <Box
            p={'20px'}
            bg={'#000000'}
            borderTopLeftRadius={'10px'}
            borderTopRightRadius={'10px'}
          >
            <Flex h={'16px'} alignItems={'center'}>
              <Text fontSize={'15px'} textColor={'white'}>
                {item?.title}
              </Text>
            </Flex>
          </Box>
          {item?.items?.length === 0 ? (
            <Flex alignItems={'center'} mt={3} pb={3} justifyContent={'center'}>
              <Button
                textColor={'#FF5017'}
                fontSize={'14px'}
                fontWeight={700}
                p={'10px, 14px, 10px, 14px'}
                h={'34px'}
                borderRadius={'20px'}
                bgColor={'#2F2F2F'}
                _hover={{ bgColor: '#2F2F2F' }}
                onClick={() => onGenerateCreative(item)}
              >
                Generate Creatives
              </Button>
            </Flex>
          ) : (
            <>
              <Flex flexDirection={'column'} pb={3}>
                {item?.items?.map((creative, index) => {
                  const plan = {
                    ...creative,
                    planId: item?.planId,
                  };

                  return (
                    <SocialMediaContentPlannerEnglishListCard
                      key={index}
                      title={creative?.post}
                      cardImage={getImageUrl(creative?.image)}
                      description={item?.content}
                      plan={plan}
                      onDeleteRecord={onDeleteRecord}
                      onEditTask={() => onEditTask(plan)}
                    />
                  );
                })}
              </Flex>
              <Flex
                alignItems={'center'}
                mt={3}
                pb={3}
                justifyContent={'center'}
              >
                <Button
                  textColor={'#1758FF'}
                  fontSize={'14px'}
                  fontWeight={700}
                  p={'10px, 14px, 10px, 14px'}
                  h={'34px'}
                  borderRadius={'4px'}
                  bgColor={'#E2EEFFs'}
                  _hover={{ bgColor: '#E2EEFF' }}
                  leftIcon={<AddCircle variant='Bold' />}
                  onClick={() => onGenerateCreative(item)}
                >
                  Generate More
                </Button>
              </Flex>
            </>
          )}
        </Box>
      ))}
      <AddImageForm
        disclosure={generateCreativeDisclosure}
        creative={selected}
        language={language}
      />
    </Box>
  );
};

export default SocialMediaContentPlannerEnglishCard;
