import {
  Avatar,
  AvatarBadge,
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import React from "react";
import DropdownSelect from "../../controls/Dropdowns/DropdownSelect";
import { colorKeys, getColor } from "../../../config/constants/colors";
import APP_ICONS from "../../../config/constants/icons";
import APP_IMAGES from "../../../config/constants/images";

const UserCard = ({
  name,
  image,
  designation,
  onView,
  onApprove,
  isWork,
  menuItems,
}) => {
  const { colorMode } = useColorMode();

  return (
    <Box
      border={"1px solid #E8EFFA"}
      borderRadius={"10px"}
      w={"234px"}
      h={"255px"}
    >
      {menuItems && (
        <Flex justifyContent={"end"}>
          <Menu>
            <MenuButton
              w="40px"
              h="40px"
              display="flex"
              ml={1}
              as={IconButton}
              variant={"unstyled"}
            >
              <Icon
                boxSize={4}
                color={getColor(colorKeys.gray, colorMode)}
                as={APP_ICONS.MORE_OPTIONS}
              />
            </MenuButton>
            <MenuList>
              {menuItems?.map((item, index) => (
                <MenuItem fontSize={"14px"} key={index} onClick={item.action}>
                  {item.name}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </Flex>
      )}
      <Flex flexDirection={"column"} alignItems={"center"} mt={3}>
        <Box border={"0.5px solid #ebebeb"} rounded={"full"}>
          <Box border={"2px solid #d5d5d5"} rounded={"full"}>
            <Avatar
              src={image}
              w="100px"
              h="100px"
              border={"0.5px solid #BEBEBE"}
            >
              {isWork && (
                <AvatarBadge
                  border={"none"}
                  w="26px"
                  h="26px"
                  bg="#FF5017"
                  transform={"translate(25%, -270%)"}
                  children={
                    <Icon
                      w="100%"
                      h="13px"
                      mb="2px"
                      variant="Bold"
                      as={APP_ICONS.CLIENTS}
                    />
                  }
                />
              )}
            </Avatar>
          </Box>
        </Box>

        <Text fontSize={"20px"} color={"#363636"}>
          {name}
        </Text>
        <Badge
          rounded={"full"}
          bgColor={"#E8EFFA"}
          p={"5px 10px 5px 10px"}
          fontSize={"12px"}
          textAlign={"center"}
          textColor={"#1758FF"}
        >
          {designation}
        </Badge>
        <HStack
          divider={
            <Divider
              orientation="vertical"
              bgColor={"#D9D9D9"}
              w={"1px"}
              h={"16px"}
            />
          }
        >
          {onView && (
            <Button
              variant={"unstyled"}
              display={"flex"}
              leftIcon={
                <Icon
                  as={APP_ICONS.EYE}
                  boxSize={4}
                  p={"2px"}
                  bgColor={"#CBC8F2"}
                  variant="Bold"
                  rounded={"full"}
                />
              }
              fontSize={"9px"}
              color={"#828282"}
            >
              View
            </Button>
          )}
          {onApprove && (
            <Button
              variant={"unstyled"}
              display={"flex"}
              leftIcon={
                <Icon
                  as={APP_ICONS.APPROVE}
                  boxSize={4}
                  p={"2px"}
                  bgColor={"#D9FFDD"}
                  variant="Bold"
                  color={"#0EA31D"}
                  rounded={"full"}
                />
              }
              fontSize={"9px"}
              color={"#828282"}
            >
              Approve
            </Button>
          )}
        </HStack>
      </Flex>
    </Box>
  );
};

export default UserCard;
