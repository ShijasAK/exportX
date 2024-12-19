import {
  Checkbox,
  Flex,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  Link,
  SimpleGrid,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { colorKeys, getColor } from "../../../../../config/constants/colors";
import APP_ICONS from "../../../../../config/constants/icons";
import { useInviteClientUser } from "../../../../../config/query/clientQuery";

const AddUser = ({ control, setValue, watch, showInvite }) => {
  const { colorMode } = useColorMode();
  const useInviteQuery = useInviteClientUser();

  const [errors, setErrors] = useState({});
  const [userData, setUserData] = useState({
    clientUserName: "",
    clientUserEmail: "",
    view: false,
    action: false,
  });

  const addNewUser = () => {
    const users = watch("data") || [];
    console.log("userss", users)
    if (userData.clientUserName && userData.clientUserEmail) {
      setErrors({});
      users.push(userData);
      setValue("data", users);
      setUserData({
        clientUserName: "",
        clientUserEmail: "",
        view: false,
        action: false,
      });
    } else {
      if (!userData.clientUserName) {
        setErrors({ ...errors, name: "Name is required" });
      } else {
        setErrors({ ...errors, name: "" });
      }
      if (!userData.clientUserEmail) {
        setErrors({ ...errors, email: "Email is required" });
      } else {
        setErrors({ ...errors, email: "" });
      }
    }
  };

  const handleInviteUser = () =>{
    useInviteQuery
    .mutateAsync({ clientUserEmail: userData.clientUserEmail, clientUserName: userData.clientUserName, clientUserId: ''})
      .then(() => {
      })
      .catch((error) => console.warn(error, "error"));
  }

  return (
    <SimpleGrid
      spacing={5}
      px="5"
      alignItems={"center"}
      h="50px"
      columns={{ base: 1, md: 3 }}
      roundedTop={"lg"}
      _even={{
        backgroundColor: "#F8F8F8",
      }}
    >
      <Input
        isInvalid={errors?.name}
        value={userData.clientUserName}
        onChange={(e) => setUserData({ ...userData, clientUserName: e.target.value })}
        placeholder="Enter name"
      />
      <InputGroup>
        <Input
          isInvalid={errors?.email}
          value={userData.clientUserEmail}
          onChange={(e) => setUserData({ ...userData, clientUserEmail: e.target.value })}
          placeholder="Enter email"
        />
        {showInvite && <Text onClick={handleInviteUser} color={"#C90016"} as={Link} alignSelf={"center"} ml={1}> Invite </Text>}
      </InputGroup>
      <Flex justify={"space-between"} align="center" w="full">
        <HStack spacing={5}>
          <Checkbox
            color="#828282"
            fontSize={"16px"}
            fontWeight={"400"}
            colorScheme="green"
            onChange={(e) =>
              setUserData({ ...userData, view: e.target.checked })
            }
            isChecked={userData.view}
          >
            View
          </Checkbox>
          <Checkbox
            color="#828282"
            fontSize={"16px"}
            fontWeight={"400"}
            colorScheme="green"
            onChange={(e) =>
              setUserData({ ...userData, action: e.target.checked })
            }
            isChecked={userData.action}
          >
            Approve
          </Checkbox>
        </HStack>
        <IconButton
          size="xs"
          variant={"outline"}
          onClick={addNewUser}
          icon={
            <Icon
              color={getColor(colorKeys.primary, colorMode)}
              as={APP_ICONS.ADD}
            />
          }
        />
      </Flex>
    </SimpleGrid>
  );
};

export default AddUser;
