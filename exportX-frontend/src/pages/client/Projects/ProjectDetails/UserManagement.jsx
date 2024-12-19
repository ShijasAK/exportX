import {
  Avatar,
  Badge,
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  IconButton,
  Image,
  Text,
  Wrap,
  WrapItem,
  useColorMode,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { colorKeys, getColor } from '../../../../config/constants/colors';
import APP_ICONS from '../../../../config/constants/icons';
import DropdownSelect from '../../../../components/controls/Dropdowns/DropdownSelect';
import APP_IMAGES from '../../../../config/constants/images';
import UserCard from '../../../../components/data/Cards/UserCard';
import { Link, useParams } from 'react-router-dom';
import {
  useCreateProjectClientUser,
  useDeleteProjectClientUser,
  useDeleteProjectUser,
  useMakeProjectManager,
  useProjectAssignees,
  useProjectClientUsers,
  useProjectUsers,
} from '../../../../config/query/projectUsersQuery';
import { getImageUrl } from '../../../../config/utils/fileUtil';
import UserForm from './UserForm';
import ProjectUserForm from './ProjectUserForm';

const UserManagement = ({ data }) => {
  const userFormDisclosure = useDisclosure();
  const projectUserDisclosure = useDisclosure();
  const { id } = useParams();
  const { colorMode } = useColorMode();
  const projectUsers = useProjectAssignees(id);

  const deleteClientUser = useDeleteProjectClientUser(id);
  const deleteProjectUser = useDeleteProjectUser(id);
  const makeProjectManager = useMakeProjectManager(id);

  const onDeleteClientUser = (userId) => {
    deleteClientUser.mutateAsync(userId).catch((err) => console.warn(err));
  };

  const onDeleteProjectUser = (userId) => {
    deleteProjectUser.mutateAsync(userId).catch((err) => console.warn(err));
  };

  const onMakeProjectManager = (userId) => {
    makeProjectManager
      .mutateAsync({ user: userId })
      .catch((err) => console.warn(err));
  };

  return (
    <div>
      <Box mt={3} fontSize={'15px'} color={'#252525'}>
        Project Assignees
      </Box>
      <Wrap spacing={5} padding={'10px'}>
        {projectUsers.data?.data?.projectAssignees?.map((item, index) => (
          <WrapItem>
            <UserCard
              key={index}
              name={`${item?.projectCoordinator?.firstName} ${item?.projectCoordinator?.lastName}`}
              image={getImageUrl(item?.projectCoordinator?.userImage?.path)}
              designation={item?.projectCoordinator?.designation?.designation}
              isWork={item?.isProjectManager}
              menuItems={[
                {
                  name: 'Delete',
                  action: () =>
                    onDeleteProjectUser(item?.projectCoordinator._id),
                },
                {
                  name: 'Make Project Manager',
                  action: () =>
                    onMakeProjectManager(item?.projectCoordinator?._id),
                },
              ]}
            />
          </WrapItem>
        ))}
        <WrapItem>
          <IconButton
            variant={'outline'}
            color={'#828282'}
            fontSize={'14px'}
            w='234px'
            h='255px'
            fontWeight={'normal'}
            borderColor={'#ececec'}
            borderStyle={'dashed'}
            onClick={projectUserDisclosure.onOpen}
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
        </WrapItem>
      </Wrap>
      <Box mt={3} fontSize={'15px'} color={'#252525'}>
        Client Users
      </Box>
      <Wrap spacing={5} padding={'10px'}>
        <WrapItem>
          <UserCard
            name={data?.owner?.clientUserName}
            image={getImageUrl(data?.owner?.clientUserImage?.path)}
            designation={'Client Co-ordinator'}
            onApprove={data?.owner?.action}
            onView={data?.owner?.view}
            isWork={true}
            menuItems={[
              {
                name: 'Delete',
                action: () => onDeleteClientUser(item._id),
              },
            ]}
          />
        </WrapItem>
        {data?.clientUsers?.map((item, index) => (
          <WrapItem>
            <UserCard
              key={index}
              name={item?.clientUser?.clientUserName}
              image={getImageUrl(item?.clientUser?.clientUserImage?.path)}
              designation={'Client User'}
              onApprove={item?.clientUser?.action}
              onView={item?.clientUser?.view}
              menuItems={[
                {
                  name: 'Delete',
                  action: () => onDeleteClientUser(item?.clientUser._id),
                },
              ]}
            />
          </WrapItem>
        ))}
        <WrapItem>
          <IconButton
            variant={'outline'}
            color={'#828282'}
            fontSize={'14px'}
            w='234px'
            h='255px'
            fontWeight={'normal'}
            borderColor={'#ececec'}
            borderStyle={'dashed'}
            onClick={userFormDisclosure.onOpen}
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
        </WrapItem>
      </Wrap>
      <UserForm
        disclosure={userFormDisclosure}
        clientId={data?.clientId?._id}
      />
      <ProjectUserForm disclosure={projectUserDisclosure} />
    </div>
  );
};

export default UserManagement;
