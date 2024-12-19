import { Box, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import FormInput from '../../../../components/forms/FormInput';
import FormTextarea from '../../../../components/forms/FormTextarea';
import FormFileUpload from '../../../../components/forms/FormFileUpload';
import { FILE_TYPES } from '../../../../config/constants/defaults';
import DropzoneCard, {
  dropZoneParentStyles,
} from '../../../../components/data/Cards/DropzoneCard';
import ScanIcon from '../../../../components/Icons/ScanIcon';
import BadgeIcon from '../../../../components/Icons/BadgeIcon';
import PencilIcon from '../../../../components/Icons/PencilIcon';
import FormColorInput from '../../../../components/forms/FormColorInput';
import { getImageUrl } from '../../../../config/utils/fileUtil';
import { getStringRules } from '../../../../config/utils/validationUtil';

const BrandInfo = ({ control, errors, setValue, watch }) => {
  const onImageChange = ({ name, file }) => {
    setValue(name, file);
  };

  return (
    <VStack align={'stretch'} spacing={3}>
      <FormInput
        id={'brandUrl'}
        label={'Website URL'}
        placeholder='https://example.com'
        required={true}
        errors={errors}
        control={control}
        inputProps={{ fontSize: '15px' }}
      />

      <FormInput
        id={'brandName'}
        label={'Brand Name'}
        placeholder='Enter brand name'
        required={true}
        errors={errors}
        control={control}
        inputProps={{ fontSize: '15px' }}
      />

      <FormTextarea
        id={'brandDescription'}
        label='Brand Description'
        hideLabel={true} // Hide label for consistency
        placeholder='Write brand description'
        required={true} // Set required to true
        errors={errors}
        control={control}
        rules={{
          ...getStringRules(),
          message: 'This field is required', // Error message for required field
        }}
        rightElement={<PencilIcon fontSize={'30px'} />}
      />

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
        <Box>
          <Text fontSize={'15px'} textColor={'#707070'}>
            Upload Logo
          </Text>
          <FormFileUpload
            id={'logoImage'}
            onChange={onImageChange}
            label={'Logo'}
            isRequired={true}
            component={
              <DropzoneCard
                src={
                  watch('logoImage')
                    ? URL.createObjectURL(watch('logoImage'))
                    : getImageUrl(watch('logoImageUrl'))
                }
              />
            }
            componentProps={dropZoneParentStyles}
            fileType={FILE_TYPES.IMAGE}
          />
          {errors['logoImage']?.message && (
            <Text fontSize={'sm'} color={'red'} mt={2}>
              {errors['logoImage']?.message}
            </Text>
          )}
        </Box>
        <Box>
          <Text fontSize={'15px'} textColor={'#707070'}>
            Upload Watermark
          </Text>
          <FormFileUpload
            id={'waterMarkImage'}
            onChange={onImageChange}
            label={'Watermark'}
            component={
              <DropzoneCard
                src={
                  watch('waterMarkImage')
                    ? URL.createObjectURL(watch('waterMarkImage'))
                    : getImageUrl(watch('waterMarkImageUrl'))
                }
              />
            }
            componentProps={dropZoneParentStyles}
            fileType={FILE_TYPES.IMAGE}
          />
        </Box>
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={5}>
        <FormColorInput
          id={'brandColorCode'}
          label={'Main Brand Color'}
          placeholder='Select color'
          errors={errors}
          control={control}
          inputProps={{ fontSize: '15px' }}
        />

        <FormColorInput
          id={'subheadingColourCode'}
          label={'Sub Heading Color'}
          placeholder='Select color'
          errors={errors}
          control={control}
          inputProps={{ fontSize: '15px' }}
        />

        <FormColorInput
          id={'descriptionColorCode'}
          label={'Description Color'}
          placeholder='Select color'
          errors={errors}
          control={control}
          inputProps={{ fontSize: '15px' }}
        />
      </SimpleGrid>
    </VStack>
  );
};

export default BrandInfo;
