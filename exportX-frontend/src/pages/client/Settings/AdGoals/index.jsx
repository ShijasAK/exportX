import {
  HStack,
  Icon,
  IconButton,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import TableHeaderOptions from '../../../../components/data/Table/TableHeaderOptions';
import APP_ICONS from '../../../../config/constants/icons';
import CustomTable from '../../../../components/data/Table/CustomTable';
import StatusSwitch from '../../../../components/controls/StatusSwitch';
import { useUpdateSystemAccess } from '../../../../config/query/userQuery';
import { makeListingQuery } from '../../../../config/utils/queryUtil';
import {
  useAdGoals,
  useDeleteAdGoal,
} from '../../../../config/query/adGoalsQuery';
import AdGoalForm from './AdGoalForm';
import DeletePopover from '../../../../components/controls/Popovers/DeletePopover';

const AdGoals = () => {
  const formDisclosure = useDisclosure();
  const [query, setQuery] = useState(makeListingQuery());
  const [selected, setSelected] = useState(null);

  const adGoalQuery = useAdGoals(query);
  const deleteAdGoalQuery = useDeleteAdGoal();
  const updateSystemAccessQuery = useUpdateSystemAccess();

  const onQueryChange = (updateQuery) => {
    setQuery((prev) => ({ ...prev, ...updateQuery }));
  };

  const onUpdateUserSystemAccess = ({ id, data }) => {
    updateSystemAccessQuery
      .mutateAsync({ body: data, id: id })
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
    deleteAdGoalQuery.mutateAsync(item._id).catch((err) => console.warn(err));
  };

  const onAddNew = () => {
    setSelected(null);
    formDisclosure.onOpen();
  };

  return (
    <VStack spacing={4} align={'stretch'}>
      <TableHeaderOptions
        action={onAddNew}
        actionText={'Add New'}
        title={'Ad Goals'}
        subtitle={'Dashboard/Ad Goals'}
        icon={APP_ICONS.ADD}
        onQueryChange={onQueryChange}
        placeholder='Search'
      />

      <CustomTable
        tableFor={'shifts'}
        tableWrapperProps={{ padding: 0 }}
        hideFilterBar={true}
        head={[
          {
            title: 'Name',
            extractor: 'adGoal',
            align: 'left',
            isSortable: true,
          },
          // {
          //   title: "Status",
          //   extractor: "status",
          //   align: "left",
          //   component: (item) => (
          //     <StatusSwitch
          //       key={item._id}
          //       onChange={(e) =>
          //         onUpdateUserSystemAccess({
          //           id: item._id,
          //           data: {
          //             systemAccess: e.target.checked,
          //           },
          //         })
          //       }
          //       value={Boolean(item?.isActive)}
          //     />
          //   ),
          // },
          {
            title: 'Actions',
            align: 'center',
            extractor: 'actions',
            component: (item) => (
              <HStack justify={'center'}>
                <IconButton
                  variant={'ghost'}
                  icon={<Icon as={APP_ICONS.EDIT} />}
                  size='sm'
                  onClick={() => onEdit(item)}
                />
                <DeletePopover
                  type={'ad goal'}
                  popoverProps={{
                    placement: 'bottom-start',
                  }}
                  onConfirm={() => onDelete(item)}
                >
                  <IconButton
                    variant='ghost'
                    icon={<Icon as={APP_ICONS.BIN} color='red' />}
                    size='sm'
                  />
                </DeletePopover>
              </HStack>
            ),
          },
        ]}
        data={adGoalQuery.data?.data?.adGoals}
        loading={adGoalQuery?.isLoading}
        totalResults={adGoalQuery?.data?.data?.pagination?.total}
        totalPages={adGoalQuery?.data?.data?.pagination?.pages?.length}
        pageSize={query?.pageLimit}
        pageNo={query?.page}
        onQueryChange={onQueryChange}
        query={query}
        onRefresh={adGoalQuery.refetch}
        isRefreshing={adGoalQuery?.isFetching}
      />
      <AdGoalForm disclosure={formDisclosure} data={selected} />
    </VStack>
  );
};

export default AdGoals;
