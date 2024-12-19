import {
  Box,
  Icon,
  IconButton,
  Wrap,
  WrapItem,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { useParams } from "react-router-dom";
import UserCard from "../../../../components/data/Cards/UserCard";
import { colorKeys, getColor } from "../../../../config/constants/colors";
import APP_ICONS from "../../../../config/constants/icons";
import { getImageUrl } from "../../../../config/utils/fileUtil";
import UserForm from "./UserForm";

const UserManagementClient = ({ data }) => {
  const userFormDisclosure = useDisclosure();
  const { id } = useParams();
  const { colorMode } = useColorMode();

  const onEditPermission = (userId) => {
    console.log("onEditPermission");
    // deleteClientUser.mutateAsync(userId).catch((err) => console.warn(err));
  };

  return (
    <div>
      <Box mt={3} fontSize={"15px"} color={"#252525"}>
        Client Users
      </Box>
      <Wrap spacing={5} padding={"10px"}>
        <WrapItem>
          <UserCard
            name={data?.owner?.clientUserName}
            image={getImageUrl(data?.owner?.clientUserImage?.path)}
            designation={"Client Co-ordinator"}
            onApprove={data?.owner?.action}
            onView={data?.owner?.view}
            isWork={true}
            menuItems={[
              {
                name: "Edit Permission",
                action: () => onEditPermission("item._id"),
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
              designation={"Client User"}
              onApprove={item?.clientUser?.action}
              onView={item?.clientUser?.view}
              menuItems={[
                {
                  name: "Edit Permission",
                  action: () => onEditPermission(item?.clientUser._id),
                },
              ]}
            />
          </WrapItem>
        ))}
        <WrapItem>
          <IconButton
            variant={"outline"}
            color={"#828282"}
            fontSize={"14px"}
            w="234px"
            h="255px"
            fontWeight={"normal"}
            borderColor={"#ececec"}
            borderStyle={"dashed"}
            onClick={userFormDisclosure.onOpen}
            icon={
              <Icon
                fontWeight={"400"}
                w={"104px"}
                h="104px"
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
    </div>
  );
};

export default UserManagementClient;
