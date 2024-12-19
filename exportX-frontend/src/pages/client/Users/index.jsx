import {
  Avatar,
  Box,
  HStack,
  Text,
  VStack,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import TableHeaderOptions from "../../../components/data/Table/TableHeaderOptions";
import APP_ICONS from "../../../config/constants/icons";
import CustomTable from "../../../components/data/Table/CustomTable";
import StatusSwitch from "../../../components/controls/StatusSwitch";
import { colorKeys, getColor } from "../../../config/constants/colors";
import DropdownSelect from "../../../components/controls/Dropdowns/DropdownSelect";
import UserDetails from "./UserDetails";
import UserForm from "./UserForm";
import EmployeeDetails from "./UserDetails/EmployeeDetails";
import PopoverFilter from "../../../components/controls/Filters/PopoverFilter";
import {
  useUpdateSystemAccess,
  useUpdateUser,
  useUsers,
} from "../../../config/query/userQuery";
import { useRoles } from "../../../config/query/roleQuery";
import { makeSelectList } from "../../../config/utils/selectListUtil";
import { makeUserPayload } from "../../../config/formUtils/userFormUtil";
import { makeListingQuery } from "../../../config/utils/queryUtil";
import { BASE_URL } from "../../../config/constants/api";
import { getImageUrl } from "../../../config/utils/fileUtil";

const Users = () => {
  const [selected, setSelected] = useState([]);
  const addNewDisclosure = useDisclosure();
  const detailDisclosure = useDisclosure();
  const employeeDisclosure = useDisclosure();
  const { colorMode } = useColorMode();
  const [query, setQuery] = useState(makeListingQuery());
  const [selectedUser, setSelectedUser] = useState(null);

  const userQuery = useUsers({
    ...query,
    role: selected?.map((item) => item.value).join("$"),
  });
  const updateUserQuery = useUpdateUser();
  const updateSystemAccessQuery = useUpdateSystemAccess();
  const rolesQuery = useRoles();

  const onQueryChange = (updateQuery) => {
    setQuery((prev) => ({ ...prev, ...updateQuery }));
  };

  const onUpdateUser = ({ item, data }) => {
    const payload = makeUserPayload({
      values: item,
      newValues: data,
    });
    updateUserQuery
      .mutateAsync({ id: item._id, body: payload })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.warn(err));
  };

  const onUpdateUserSystemAccess = ({ id, data }) => {
    updateSystemAccessQuery
      .mutateAsync({ body: data, id: id })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.warn(err));
  };

  const onEdit = (item) => {};

  const onDelete = (item) => {};

  const onView = (item) => {
    setSelectedUser(item);
    employeeDisclosure.onOpen();
  };

  const onAddNew = () => {
    addNewDisclosure.onOpen();
  };

  const onFilterChange = (item) => {
    setSelected((prev) => [...prev, item]);
  };

  const onFilterRemove = (item) => {
    setSelected((prev) => prev.filter((i) => i.value !== item.value));
  };

  const onFilterRemoveAll = (item) => {
    setSelected([]);
  };

  return (
    <VStack spacing={4} align={"stretch"}>
      <TableHeaderOptions
      textProps={{marginLeft:"-10px",}}
      stackProps={{spacing:"60px"}}
        action={onAddNew}
        actionText={"Add User"}
        title={"Hi, Welcome !"}
        subtitle={"Manage Users"}
        icon={APP_ICONS.ADD}
        onQueryChange={onQueryChange}
        placeholder="Search by name, email or designation "
      />

      <Box mt={2}>
        <PopoverFilter
          placeholder="Filter by role"
          options={
            makeSelectList(rolesQuery.data?.data?.roles, "_id", "roleName") ||
            []
          }
          selected={selected}
          onChange={onFilterChange}
          onRemove={onFilterRemove}
          onRemoveAll={onFilterRemoveAll}
        />
      </Box>

      <CustomTable
        tableFor={"shifts"}
        tableWrapperProps={{ padding: 0 }}
        hideFilterBar={true}
        head={[
          {
            title: "",
            extractor: "id",
            align: "left",
            component: (item, index) => (
              <Text color={getColor(colorKeys.gray, colorMode)}>
                {(query?.page - 1) * query?.pageLimit + index + 1}
              </Text>
            ),
          },
          {
            title: "User",
            extractor: "name",
            align: "left",
            isSortable: true,
            component: (item) => (
              <HStack onClick={() => onView(item)} alignItems={"center"}>
                <Avatar
                  className="table-avatar"
                  src={getImageUrl(item?.userImage.path)}
                  w="30px"
                  h="30px"
                  name={`${item.firstName} ${item.lastName}`}
                />
                <Box h={'50px'} py={3}>
                  <Text
                    fontWeight={"bold"}
                    mt="2px"
                    lineHeight={"0.9"}
                    fontSize={"12px"}
                  >
                    {`${item.firstName} ${item.lastName}`}
                  </Text>
                  <Text
                    color={getColor(colorKeys.gray, colorMode)}
                    mt="2px"
                    lineHeight={"0.9"}
                    fontSize="10px"
                  >
                    {item.email}
                  </Text>
                </Box>
              </HStack>
            ),
          },
          {
            title: "Designation",
            extractor: "designation",
            align: "center",
            isSortable: true,
            component: (item) => (
              <Text color={getColor(colorKeys.gray, colorMode)}>
                {item.userDesignation?.designation}
              </Text>
            ),
          },
          {
            title: "Role",
            extractor: "role",
            align: "center",
            component: (item) => (
              <DropdownSelect
                buttonProps={{ width: "160px" }}
                value={item?.roleDetails?.roleName}
                options={
                  makeSelectList(
                    rolesQuery?.data?.data?.roles,
                    "_id",
                    "roleName"
                  ) || []
                }
                onChange={(role) =>
                  onUpdateUser({ item, data: { roleId: role.value } })
                }
              />
            ),
          },
          {
            title: "System Access",
            extractor: "access",
            align: "center",
            component: (item) => (
              <StatusSwitch
                key={item._id}
                onChange={(e) =>
                  onUpdateUserSystemAccess({
                    id: item._id,
                    data: {
                      systemAccess: e.target.checked,
                    },
                  })
                }
                value={Boolean(item?.systemAccess)}
              />
            ),
          },
        ]}
        data={userQuery.data?.data?.users}
        loading={userQuery?.isLoading}
        totalResults={userQuery?.data?.data?.pagination?.total}
        totalPages={userQuery?.data?.data?.pagination?.pages?.length}
        pageSize={query?.pageLimit}
        pageNo={query?.page}
        onQueryChange={onQueryChange}
        query={query}
        onRefresh={userQuery.refetch}
        isRefreshing={userQuery?.isFetching}
        onEdit={onEdit}
        onDelete={onDelete}
        onView={onView}
      />
      <EmployeeDetails
        data={selectedUser}
        detailDisclosure={detailDisclosure}
        disclosure={employeeDisclosure}
      />
      <UserDetails data={selectedUser} disclosure={detailDisclosure} />
      <UserForm disclosure={addNewDisclosure} />
    </VStack>
  );
};

export default Users;
