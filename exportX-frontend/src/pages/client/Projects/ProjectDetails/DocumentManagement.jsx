import {
  Box,
  Flex,
  HStack,
  SimpleGrid,
  Text,
  useColorMode,
  Icon,
  IconButton,
  VStack,
  Heading,
  Image,
  Button,
  useDisclosure,
  Avatar,
  AvatarBadge,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import React from 'react';
import FormSelect from '../../../../components/forms/FormSelect';
import { useForm } from 'react-hook-form';
import { makeSelectList } from '../../../../config/utils/selectListUtil';
import FormFileUpload from '../../../../components/forms/FormFileUpload';
import DropzoneCard, {
  dropZoneParentStyles,
} from '../../../../components/data/Cards/DropzoneCard';
import { FILE_TYPES } from '../../../../config/constants/defaults';
import APP_ICONS from '../../../../config/constants/icons';
import { formatDate } from '../../../../config/utils/dateUtil';
import { colorKeys, getColor } from '../../../../config/constants/colors';
import DropdownSelect from '../../../../components/controls/Dropdowns/DropdownSelect';
import APP_IMAGES from '../../../../config/constants/images';
import { Link, useParams } from 'react-router-dom';
import DocumentItemCard from '../../../../components/data/Cards/DocumentItemCard';
import {
  useDeleteImage,
  useCreateProjectDocument,
} from '../../../../config/query/projectDocumentQuery';
import { useProjectDocumentTypes } from '../../../../config/query/projectQuery';
import DocumentTypeForm from './DocumentTypeForm';
import { getImageUrl } from '../../../../config/utils/fileUtil';
import { useQueryClient } from '@tanstack/react-query';
import API_CONSTANTS from '../../../../config/constants/api';

const DocumentManagement = ({ data }) => {
  const { colorMode } = useColorMode();
  const addDisclosure = useDisclosure();
  const queryClient = useQueryClient();

  const { id } = useParams();
  const createDocumentQuery = useCreateProjectDocument(id);
  const deleteImageQuery = useDeleteImage(id);
  const documentTypes = useProjectDocumentTypes();

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const onDocumentChange = ({ name, file }) => {
    setValue(name, file);
  };

  const handleDeleteImage = async (imageId) => {
    try {
      await deleteImageQuery
        .mutateAsync({
          projectId: id,
          imageId: imageId,
        })
        .then(() => {
          queryClient.invalidateQueries([API_CONSTANTS.PROJECTS.base, id]);
          setValue('documents', []);
          setValue('images', []);
          setValue('documentType', '');
        });
      // Optionally, you can update the UI after deletion
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  const onSubmit = (values) => {
    const formData = new FormData();
    formData.append('documentType', values.documentType);
    if (values?.documents?.length > 0) {
      Array.from(values?.documents)?.forEach((item) => {
        formData.append(`documents`, item);
      });
    }

    if (values?.images?.length > 0) {
      values?.images?.forEach((item) => {
        formData.append(`images`, item);
      });
    }

    createDocumentQuery
      .mutateAsync(formData)
      .then(() => {
        queryClient.invalidateQueries([API_CONSTANTS.PROJECTS.base, id]);
        setValue('documents', []);
        setValue('images', []);
        setValue('documentType', '');
      })
      .catch((err) => console.warn(err));
  };

  const onImageChange = ({ name, file }) => {
    const images = watch('images') || [];
    setValue(name, [...images, ...file]);
  };

  return (
    <div padding={'30px'} gap={'20px'}>
      <Box mt={'20px'}>
        <FormSelect
          id='documentType'
          label='Document Type'
          labelProps={{ fontSize: '15px', color: '#252525' }}
          placeholder={'Select Document Type'}
          required={false}
          hideLabel={false}
          errors={errors}
          control={control}
          options={makeSelectList(
            documentTypes.data?.data?.documentTypes,
            '_id',
            'documentType'
          )}
          labelExtention={
            <Button size='xs' onClick={addDisclosure.onToggle}>
              Add New
            </Button>
          }
        />
      </Box>
      <SimpleGrid>
        <Box mt={'10px'}>
          <Text fontSize={'15px'} mb={2} color='#707070'>
            Upload Document
          </Text>
          <SimpleGrid columns={2} spacingX={5}>
            <FormFileUpload
              multiple={true}
              id={'documents'}
              onChange={onDocumentChange}
              label={'Upload Dcuments'}
              component={
                <DropzoneCard
                  heading='Drag & drop your documents here'
                  // name={watch("document") ? watch("document").name : null}
                />
              }
              componentProps={dropZoneParentStyles}
              fileType={FILE_TYPES.DOCUMENT}
            />
          </SimpleGrid>
        </Box>
      </SimpleGrid>
      <SimpleGrid columns={2} gap={5} mt={5}>
        {watch('documents') &&
          Array.from(watch('documents'))?.map((item, index) => (
            <DocumentItemCard
              key={index}
              title={item?.name}
              isNewDocument={true}
            />
          ))}
        {data?.documents?.map((item, index) => (
          <DocumentItemCard
            documentId={item?._id}
            key={index}
            title={item?.name}
            isNewDocument={false}
          />
        ))}
      </SimpleGrid>
      <VStack align='stretch' spacing={5} mt={5}>
        <Text fontSize={'15px'} color={getColor(colorKeys.dark, colorMode)}>
          Image Gallery
        </Text>

        <Wrap columns={5} spacing={5}>
          <WrapItem>
            <FormFileUpload
              id={'images'}
              onChange={onImageChange}
              multiple={true}
              label={'Images'}
              component={
                <IconButton
                  variant={'outline'}
                  color={'#828282'}
                  fontSize={'14px'}
                  w='160px'
                  h='150px'
                  fontWeight={'normal'}
                  borderColor={'#ececec'}
                  borderStyle={'dashed'}
                  icon={
                    <Icon
                      fontWeight={'400'}
                      w={'104px'}
                      h='104px'
                      color={getColor(colorKeys.primary, colorMode)}
                      as={APP_ICONS.ADD}
                    />
                  }
                />
              }
              fileType={FILE_TYPES.IMAGE}
            />
          </WrapItem>
          {watch('images')?.map((item, index) => (
            <WrapItem>
              <Avatar
                key={index}
                w='154px'
                h='150px'
                borderRadius={'10px'}
                role='group'
                src={URL.createObjectURL(item)}
              >
                <AvatarBadge
                  placement='top-end'
                  boxSize='1.6em'
                  bg='red'
                  border={'none'}
                  display={'none'}
                  cursor={'pointer'}
                  onClick={() => {
                    const images = watch('images');
                    images.splice(index, 1);
                    setValue('images', images);
                  }}
                  _groupHover={{ display: 'flex' }}
                >
                  <Icon mb={'1px'} ml='1px' boxSize={4} as={APP_ICONS.BIN} />
                </AvatarBadge>
              </Avatar>
            </WrapItem>
          ))}
          {data?.images?.map((item) => (
            <WrapItem>
              <Avatar
                key={item.id}
                w='154px'
                h='150px'
                borderRadius={'10px'}
                role='group'
                src={getImageUrl(item?.path)}
              >
                <AvatarBadge
                  placement='top-end'
                  boxSize='1.6em'
                  bg='red'
                  border={'none'}
                  display={'none'}
                  cursor={'pointer'}
                  onClick={() => handleDeleteImage(item._id)}
                  _groupHover={{ display: 'flex' }}
                >
                  <Icon mb={'1px'} ml='1px' boxSize={4} as={APP_ICONS.BIN} />
                </AvatarBadge>
              </Avatar>
            </WrapItem>
          ))}
        </Wrap>
      </VStack>

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
          onClick={handleSubmit(onSubmit)}
          isLoading={createDocumentQuery.isPending}
        >
          Save
        </Button>
      </HStack>
      <DocumentTypeForm disclosure={addDisclosure} />
    </div>
  );
};

export default DocumentManagement;
