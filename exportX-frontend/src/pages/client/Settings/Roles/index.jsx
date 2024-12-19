import {
  HStack,
  Icon,
  IconButton,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import TableHeaderOptions from "../../../../components/data/Table/TableHeaderOptions";
import APP_ICONS from "../../../../config/constants/icons";
import CustomTable from "../../../../components/data/Table/CustomTable";
import StatusSwitch from "../../../../components/controls/StatusSwitch";
import { useUpdateSystemAccess } from "../../../../config/query/userQuery";
import { makeListingQuery } from "../../../../config/utils/queryUtil";
import {
  useDeleteRole,
  useRoles,
  useUpdateRoleStatus,
} from "../../../../config/query/roleQuery";
import DeletePopover from "../../../../components/controls/Popovers/DeletePopover";
import RoleForm from "./RoleForm";

const Roles = () => {
  const formDisclosure = useDisclosure();
  const [query, setQuery] = useState(makeListingQuery());
  const [selected, setSelected] = useState(null);

  const rolesQuery = useRoles(query);
  const deleteRoleQuery = useDeleteRole();
  const updateRoleStatusQuery = useUpdateRoleStatus();

  const onQueryChange = (updateQuery) => {
    setQuery((prev) => ({ ...prev, ...updateQuery }));
  };

  const onUpdateRoleStatus = ({ id, status }) => {
    updateRoleStatusQuery
      .mutateAsync({ status, id })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.warn(err));
  };

  const onEdit = (item) => {
    setSelected(item);
    formDisclosure.onOpen();
  };

  const onDelete = (item) => {
    deleteRoleQuery.mutateAsync(item._id).catch((err) => console.warn(err));
  };

  const onAddNew = () => {
    setSelected(null);
    formDisclosure.onOpen();
  };

  return (
    <VStack spacing={4} align={"stretch"}>
      <TableHeaderOptions
        action={onAddNew}
        actionText={"Add New"}
        title={"Roles"}
        subtitle={"Dashboard/Roles"}
        icon={APP_ICONS.ADD}
        onQueryChange={onQueryChange}
        placeholder="Search"
      />

      <CustomTable
        tableFor={"shifts"}
        tableWrapperProps={{ padding: 0 }}
        hideFilterBar={true}
        head={[
          {
            title: "Name",
            extractor: "roleName",
            align: "left",
            isSortable: true,
          },
          {
            title: "Status",
            extractor: "status",
            align: "left",
            component: (item) => (
              <StatusSwitch
                key={item._id}
                onChange={(e) =>
                  onUpdateRoleStatus({
                    id: item._id,
                    status: e.target.checked,
                  })
                }
                value={Boolean(item?.isActive)}
              />
            ),
          },
          {
            title: "Actions",
            align: "center",
            extractor: "actions",
            component: (item) => (
              <HStack justify={"center"}>
                <IconButton
                  variant={"ghost"}
                  icon={<Icon as={APP_ICONS.EDIT} />}
                  size="sm"
                  onClick={() => onEdit(item)}
                />
                <DeletePopover
                  type={"roles"}
                  popoverProps={{
                    placement: "bottom-start",
                  }}
                  onConfirm={() => onDelete(item)}
                >
                  <IconButton
                    variant="ghost"
                    icon={<Icon as={APP_ICONS.BIN} color="red" />}
                    size="sm"
                  />
                </DeletePopover>
              </HStack>
            ),
          },
        ]}
        data={rolesQuery.data?.data?.roles}
        loading={rolesQuery?.isLoading}
        totalResults={rolesQuery?.data?.data?.pagination?.total}
        totalPages={rolesQuery?.data?.data?.pagination?.pages?.length}
        pageSize={query?.pageLimit}
        pageNo={query?.page}
        onQueryChange={onQueryChange}
        query={query}
        onRefresh={rolesQuery.refetch}
        isRefreshing={rolesQuery?.isFetching}
      />
      <RoleForm disclosure={formDisclosure} data={selected} />
    </VStack>
  );
};

export default Roles;
