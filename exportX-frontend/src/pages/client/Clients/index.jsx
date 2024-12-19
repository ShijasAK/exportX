import {
  Avatar,
  Box,
  HStack,
  Icon,
  IconButton,
  Text,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import TableHeaderOptions from "../../../components/data/Table/TableHeaderOptions";
import APP_ICONS from "../../../config/constants/icons";
import CustomTable from "../../../components/data/Table/CustomTable";
import StatusSwitch from "../../../components/controls/StatusSwitch";
import { colorKeys, getColor } from "../../../config/constants/colors";
import CopyText from "../../../components/data/Information/CopyText";
import { Link, useNavigate } from "react-router-dom";
import { useClients, useUpdateSystemAccess } from "../../../config/query/clientQuery";
import { getImage } from "../../../config/utils/uiUtil";
import ClientUpdateForm from "./ClientUpdateForm";

const Clients = () => {
  const navigate = useNavigate();
  const [selectedClient, setSelectedClient] = useState(null);
  const formDisclosure = useDisclosure();
  const { colorMode } = useColorMode();
  const [query, setQuery] = useState({
    page:1,
    pageLimit:10
  });

  const clientQuery = useClients(query);
  const updateSystemAccessQuery = useUpdateSystemAccess();

  const onQueryChange = (updateQuery) => {
    setQuery((prev) => ({ ...prev, ...updateQuery }));
  };

  const onEdit = (item) => {
    setSelectedClient(item);
    formDisclosure.onOpen();
  };

  const onUpdateClientSystemAccess = ({ id, data }) => {
    updateSystemAccessQuery
      .mutateAsync({ body: data, id: id })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.warn(err));
  };

  const onDelete = (item) => {};

  const onView = (item) => {};

  return (
    <Box>
      <TableHeaderOptions
        action={() => navigate("/dashboard/clients/new")}
        actionText={"Add New Client"}
        title={"Manage Clients"}
        subtitle={"Manage Clients"}
        icon={APP_ICONS.ADD}
        onQueryChange={onQueryChange}
        placeholder="Search by Client, Company or URL"
        actionButtonProps={{ minW: "135px" }}
      />

      <CustomTable
        tableFor={"clients"}
        tableWrapperProps={{ padding: 0 }}
        hideFilterBar={true}
        containerProps={{ mt: 4 }}
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
            title: "Clients",
            extractor: "clientName",
            align: "left",
            isSortable: true,
            component: (item) => (
              <HStack
                cursor={"pointer"}
                onClick={() => navigate(`/dashboard/clients/${item._id}`)}
                alignItems={"center"}
              >
                <Avatar
                  className="table-avatar"
                  src={getImage(item.clientImage)}
                  w="30px"
                  h="30px"
                  fontSize={"11px"}
                  name={`${item.firstName} ${item.lastName}`}
                />
                <Box>
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
                    {item.username}
                  </Text>
                </Box>
              </HStack>
            ),
          },
          {
            title: "Company",
            extractor: "companyName",
            align: "left",
            isSortable: true,
            component: (item) => item.brandName,
          },
          {
            title: "Company URL",
            extractor: "companyUrl",
            align: "left",
            isSortable: true,
            component: (item) => <CopyText text={item?.brandUrl} />,
          },
          {
            title: "System Access",
            extractor: "access",
            align: "left",
            component: (item) => (
              <StatusSwitch 
              onChange={(e) =>
                onUpdateClientSystemAccess({
                  id: item._id,
                  data: {
                    systemAccess: e.target.checked,
                  },
                })
              }
              value={Boolean(item?.systemAccess)} />
            ),
          },
        ]}
        data={clientQuery.data?.data?.clients}
        loading={clientQuery?.isLoading}
        totalResults={clientQuery?.data?.data?.pagination?.total}
        totalPages={clientQuery?.data?.data?.pagination?.pages?.length}
        pageSize={clientQuery?.data?.data?.pagination?.pageLimit}
        pageNo={query?.page}
        onQueryChange={onQueryChange}
        query={query}
        onRefresh={clientQuery.refetch}
        isRefreshing={clientQuery?.isFetching}
        onEdit={onEdit}
        onDelete={onDelete}
        onView={onView}
      />

      <ClientUpdateForm data={selectedClient} disclosure={formDisclosure} />
    </Box>
  );
};

export default Clients;
