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
import {
  useUpdateSystemAccess,
  useUsers,
} from "../../../../config/query/userQuery";
import { makeListingQuery } from "../../../../config/utils/queryUtil";
import {
  useAllDesignations,
  useDeleteDesignation,
  useDesignations,
  useUpdateDesignationStatus,
} from "../../../../config/query/designationQuery";
import DesignationForm from "./DesignationForm";
import DeletePopover from "../../../../components/controls/Popovers/DeletePopover";

const Designations = () => {
  const formDisclosure = useDisclosure();
  const [query, setQuery] = useState(makeListingQuery());
  const [selected, setSelected] = useState(null);

  const designationQuery = useAllDesignations(query);
  const deleteDesignationQuery = useDeleteDesignation();
  const updateDesignationStatus = useUpdateDesignationStatus();

  const onQueryChange = (updateQuery) => {
    setQuery((prev) => ({ ...prev, ...updateQuery }));
  };

  const onUpdateDesignationStatus = ({ id, status }) => {
    updateDesignationStatus
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
    deleteDesignationQuery
      .mutateAsync(item._id)
      .catch((err) => console.warn(err));
    // console.log(item,"asjhdkashdkashdjsak")
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
        title={"Designations"}
        subtitle={"Dashboard/Designations"}
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
            title: "Designation Name",
            extractor: "designation",
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
                  onUpdateDesignationStatus({
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
                  type={"designation"}
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
        data={designationQuery.data?.data?.designations}
        loading={designationQuery?.isLoading}
        totalResults={designationQuery?.data?.data?.pagination?.total}
        totalPages={designationQuery?.data?.data?.pagination?.pages?.length}
        pageSize={query?.pageLimit}
        pageNo={query?.page}
        onQueryChange={onQueryChange}
        query={query}
        onRefresh={designationQuery.refetch}
        isRefreshing={designationQuery?.isFetching}
      />
      <DesignationForm disclosure={formDisclosure} data={selected} />
    </VStack>
  );
};

export default Designations;
