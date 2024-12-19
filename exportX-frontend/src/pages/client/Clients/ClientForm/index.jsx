import {
  Button,
  HStack,
  Heading,
  VStack,
  useColorMode,
  chakra,
  Spinner,
  Flex,
} from '@chakra-ui/react';
import React from 'react';
import TableHeaderOptions from '../../../../components/data/Table/TableHeaderOptions';
import { colorKeys, getColor } from '../../../../config/constants/colors';
import { useForm } from 'react-hook-form';
import DataAccordian from '../../../../components/data/Poppers/DataAccordian';
import Information from './Information';
import BrandInfo from './BrandInfo';
import AdvanceSetup from './AdvanceSetup';
import ClientBrief from './ClientBrief';
import AdditionalUsers from './AdditionalUsers';
import {
  useClient,
  useCreateClient,
  useUpdateClient,
} from '../../../../config/query/clientQuery';
import { useNavigate, useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { EMAIL_REGEX } from '../../../../config/constants/regex';

const ClientForm = () => {
  const navigate = useNavigate();
  const { colorMode } = useColorMode();
  const { id } = useParams();

  const createClientQuery = useCreateClient();
  const updateClientQuery = useUpdateClient(id);
  const { data } = useClient(id);

  const formSchema = yup.object().shape({
    brandUrl: yup.string().url('invalid URL'),
    firstName: yup.string().required('this field is required').max(25),
    lastName: yup.string().required('this field is required').max(25),
    primaryContactNo: yup
      .string()
      .required('this field is required')
      .min(10)
      .max(12)
      .matches(/^[0-9]+$/, 'must be a number'),
    secContactNo: yup
      .string()
      .required('this field is required')
      .min(10)
      .max(12)
      .matches(/^[0-9]+$/, 'must be a number'),
    country: yup.string().required('this field is required'),
    email: yup
      .string()
      .matches(EMAIL_REGEX, 'invalid email')
      .email('invalid email')
      .required('this field is required'),
    brandUrl: yup
      .string()
      .url('invalid URL')
      .required('this field is required'),
    brandName: yup.string().required('this field is required').max(25),
    brandDescription: yup.string().required('this field is required'),
    targetAudience: yup.string().max(50),
    productServiceName: yup.string().max(50),
    briefDescription: yup.string(),
  });

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
    values: {
      clientId: data?.data?.client?._id,
      //personal information
      primaryIsdCode: data?.data?.client?.primaryIsdCode || '+966',
      secIsdCode: data?.data?.client?.secIsdCode || '+966',
      firstName: data?.data?.client?.firstName,
      lastName: data?.data?.client?.lastName,
      primaryContactNo: data?.data?.client?.primaryContactNo,
      secContactNo: data?.data?.client?.secContactNo,
      email: data?.data?.client?.email,
      country: data?.data?.client?.country || 'Saudi Arabia',

      //advance setup
      brandUrl: data?.data?.client?.brandUrl,
      brandName: data?.data?.client?.brandName,
      brandDescription: data?.data?.client?.brandDescription,

      logoImageUrl: data?.data?.client?.logoImage?.path,
      waterMarkImageUrl: data?.data?.client?.waterMarkImage?.path,

      brandColorCode: data?.data?.client?.brandColorCode,
      subheadingColourCode: data?.data?.client?.subheadingColorCode,
      descriptionColorCode: data?.data?.client?.descriptionColorCode,

      clientSocialMedia: data?.data?.client?.clientSocialMedia,

      //brand kit
      brandFont: data?.data?.client?.brandKit?.brandFont,
      logoUrl: data?.data?.client?.brandKit?.logo?.path,
      mainBrandColor: data?.data?.client?.brandKit?.mainBrandColor,
      subBrandColor: data?.data?.client?.brandKit?.subBrandColor,
      brandKitDescriptionColorCode:
        data?.data?.client?.brandKit?.brandKitDescriptionColorCode,
      brandKitSubheadingCode:
        data?.data?.client?.brandKit?.brandKitSubheadingCode,
      brandPattern: data?.data?.client?.brandKit?.brandPattern,
      currentBrandPattern: data?.data?.client?.brandKit?.brandPattern?.at(0),
      alternateColor: data?.data?.client?.brandKit?.alternateColor,

      //client brief:
      adGoals: data?.data?.client?.clientBrief?.adGoals,
      toneOfVoice: data?.data?.client?.clientBrief?.toneOfVoice,
      targetAudience: data?.data?.client?.clientBrief?.targetAudience,
      productServiceName: data?.data?.client?.clientBrief?.productServiceName,
      briefDescription: data?.data?.client?.clientBrief?.briefDescription,

      templates: data?.data?.client?.templates,
      currentTemplate: data?.data?.client?.templates?.at(0),

      //Additional Users
      data: data?.data?.clientUser,
      clientUsers: data?.data?.clientUser,
    },
  });

  const onSubmit = (values) => {
    if (!values.logoImage && !values.logoImageUrl) {
      setError('logoImage', 'This field is required');
      return;
    }
    const formData = new FormData();
    Object.keys(values).map((key) => {
      if (values[key] === undefined) return;

      if (id) {
        if (key === 'currentBrandPattern') return;
        if (key === 'currentTemplate') return;
        if (key === 'logoImageUrl') return;
        if (key === 'waterMarkImageUrl') return;
        if (key === 'logoUrl') return;
        if (key === 'showAltColor') return;
        if (key === 'newTemplate') {
          Array.from(values?.newTemplate)?.forEach((item) => {
            formData.append('newTemplate', item);
            return;
          });
        }
        if (key === 'newBrandPattern') {
          Array.from(values?.newBrandPattern)?.forEach((item) => {
            formData.append('newBrandPattern', item);
            return;
          });
        }
        if (key === 'templates') return;
      }

      if (!id) {
        if (key === 'template') {
          Array.from(values?.template)?.forEach((item) => {
            formData.append('template', item);
            return;
          });
        } else if (key === 'brandPattern') {
          Array.from(values?.brandPattern)?.forEach((item) => {
            formData.append('brandPattern', item);
            return;
          });
        }
      }

      if (key === 'clientSocialMedia') {
        values[key].map((item, index) => {
          formData.append(`clientSocialMedia[${index}].media`, item.media);
          formData.append(
            `clientSocialMedia[${index}].mediaToken`,
            item.mediaToken
          );
        });
        return;
      } else if (key === 'data') {
        values[key].map((item, index) => {
          formData.append(`data[${index}].clientUserName`, item.clientUserName);
          formData.append(
            `data[${index}].clientUserEmail`,
            item.clientUserEmail
          );
          formData.append(`data[${index}].action`, item.action);
          formData.append(`data[${index}].view`, item.view);
        });
        return;
      } else {
        formData.append(key, values[key]);
        return;
      }
    });

    const formMutate = id
      ? updateClientQuery.mutateAsync
      : createClientQuery.mutateAsync;

    formMutate(formData)
      .then(() => navigate('/dashboard/clients'))
      .catch((err) => console.warn(err));
  };

  const accordianData = [
    {
      label: 'Personal Information',
      content: (
        <Information
          id={id}
          watch={watch}
          setValue={setValue}
          control={control}
          errors={errors}
        />
      ),
    },
    {
      label: 'Brand Information',
      content: (
        <BrandInfo
          control={control}
          errors={errors}
          setValue={setValue}
          watch={watch}
        />
      ),
    },
    {
      label: 'Advance Setup',
      content: (
        <AdvanceSetup
          control={control}
          errors={errors}
          setValue={setValue}
          watch={watch}
        />
      ),
    },
    {
      label: 'Client Brief',
      content: (
        <ClientBrief
          control={control}
          errors={errors}
          watch={watch}
          setValue={setValue}
        />
      ),
    },
    {
      label: 'Additional Users',
      content: (
        <AdditionalUsers
          watch={watch}
          setValue={setValue}
          control={control}
          errors={errors}
        />
      ),
    },
  ];

  return (
    <chakra.form onSubmit={handleSubmit(onSubmit)}>
      {id != null && data == null && (
        <Flex w={'full'} justifyContent={'center'} mb={5}>
          <Spinner size={'lg'} color='red.500' />
        </Flex>
      )}
      <VStack spacing={5} align='stretch'>
        <TableHeaderOptions
          title={'Manage Clients'}
          subtitle={'Manage Clients / Add New Client'}
        />

        <VStack align='stretch' spacing={3}>
          <Heading
            fontSize={'20px'}
            color={getColor(colorKeys.whiteSmoke, colorMode)}
          >
            Add New Client
          </Heading>
          <DataAccordian data={accordianData} />

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
              onClick={() => navigate('/dashboard/clients')}
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
              isLoading={
                createClientQuery.isPending || updateClientQuery.isPending
              }
              type='submit'
            >
              Save
            </Button>
          </HStack>
        </VStack>
      </VStack>
    </chakra.form>
  );
};

export default ClientForm;
