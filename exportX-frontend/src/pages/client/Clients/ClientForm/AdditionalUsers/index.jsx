import React from "react";
import {
  SimpleGrid,
  Text,
  VStack,
  HStack,
  Checkbox,
  Flex,
  IconButton,
  Icon,
} from "@chakra-ui/react";
import APP_ICONS from "../../../../../config/constants/icons";
import AddUser from "./AddUser";
// import {
//   useCreateClientUsers,
//   useDeleteClientUser,
//   useUpdateClientUserPermissions,
// } from "../../../../../config/query/clientQuery";

const AdditionalUsers = ({ errors, control, watch, setValue }) => {
  // const deleteClientUser = useDeleteClientUser();
  // const updateClientUserPermissions = useUpdateClientUserPermissions();

  // const onDelete = (id) => {
  //   deleteClientUser.mutateAsync(id).catch((err) => console.log(err));
  // };

  const onDelete = (index) => {
    const users = watch("data") || [];
    users.splice(index, 1);
    setValue("data", users);
  };

  const onUpdatePermission = ({ index, permission, value }) => {
    // const payload = {
    //   [permission]: value,
    // };
    // updateClientUserPermissions
    //   .mutateAsync({
    //     id,
    //     payload,
    //   })
    //   .catch((err) => console.log(err));

    const users = watch("data") || [];
    users[index][permission] = value;
    setValue("data", users);
  };

  return (
    <VStack align="stretch" spacing={0}>
      <SimpleGrid
        px="5"
        alignItems={"center"}
        bg="#353535"
        spacing={5}
        h="60px"
        columns={{ base: 1, md: 3 }}
        roundedTop={"lg"}
      >
        <Text color="#fff" fontSize={"15px"} fontWeight={"600"}>
          Client User
        </Text>
        <Text color="#fff" fontSize={"15px"} fontWeight={"600"}>
          Email Address
        </Text>
        <Text color="#fff" fontSize={"15px"} fontWeight={"600"}>
          Permissions
        </Text>
      </SimpleGrid>
      {watch("data")?.map((item, index) => (
        <SimpleGrid
          spacing={5}
          key={index}
          px="5"
          alignItems={"center"}
          h="50px"
          columns={{ base: 1, md: 3 }}
          roundedTop={"lg"}
          _even={{
            backgroundColor: "#F8F8F8",
          }}
        >
          <Text color="#828282" fontSize={"16px"} fontWeight={"400"}>
            {item.clientUserName}
          </Text>
          <Text color="#828282" fontSize={"16px"} fontWeight={"400"}>
            {item.clientUserEmail}
          </Text>
          <Flex justify={"space-between"} align="center" w="full">
            <HStack spacing={5}>
              <Checkbox
                color="#828282"
                fontSize={"16px"}
                fontWeight={"400"}
                colorScheme="green"
                isChecked={item.view}
                onChange={(e) =>
                  onUpdatePermission({
                    index,
                    permission: "view",
                    value: e.target.checked,
                  })
                }
              >
                View
              </Checkbox>
              <Checkbox
                color="#828282"
                fontSize={"16px"}
                fontWeight={"400"}
                colorScheme="green"
                isChecked={item.action}
                onChange={(e) =>
                  onUpdatePermission({
                    index,
                    permission: "action",
                    value: e.target.checked,
                  })
                }
              >
                Approve
              </Checkbox>
            </HStack>
            <IconButton
              // onClick={() => onDelete(item.id)}
              onClick={() => onDelete(index)}
              size="xs"
              variant={"outline"}
              icon={<Icon as={APP_ICONS.MINUS} />}
            />
          </Flex>
        </SimpleGrid>
      ))}
      <AddUser watch={watch} control={control} setValue={setValue} showInvite={watch("clientUsers") != null ? true : false}/>
    </VStack>
  );
};

export default AdditionalUsers;
