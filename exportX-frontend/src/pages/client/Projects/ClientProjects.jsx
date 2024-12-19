import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Heading,
  Icon,
  IconButton,
  MenuButton,
  MenuItem,
  MenuList,
  SimpleGrid,
  Text,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useMemo, useState } from "react";
import TableHeaderOptions from "../../../components/data/Table/TableHeaderOptions";
import APP_ICONS from "../../../config/constants/icons";
import CustomTable from "../../../components/data/Table/CustomTable";
import StatusSwitch from "../../../components/controls/StatusSwitch";
import APP_IMAGES from "../../../config/constants/images";
import { colorKeys, getColor } from "../../../config/constants/colors";
import CopyText from "../../../components/data/Information/CopyText";
import SummaryCard from "../../../components/data/Cards/SummaryCard";
import { formatDate } from "../../../config/utils/dateUtil";
import DropdownSelect from "../../../components/controls/Dropdowns/DropdownSelect";
import { Menu } from "iconsax-react";
import FilterDrawer from "./FilterDrawer";
import ProjectForm from "./ProjectForm";
import { Link } from "react-router-dom";
import { getImageUrl } from "../../../config/utils/fileUtil";
import {
  useProjects,
  useUpdateProjectStatus,
} from "../../../config/query/projectQuery";
import { useUserRole } from "../../../hooks";
import APP_ROUTES from "../../../config/constants/routes";
import helper from "../../../config/utils/helper";

const statuses = [
  {
    id: 1,
    label: "Pending",
  },
  {
    id: 2,
    label: "Ongoing",
  },
  {
    id: 3,
    label: "Completed",
  },
];

const filterRange = [
  {
    id: 1,
    label: "This Month",
  },
  {
    id: 2,
    label: "This Quarter",
  },
  {
    id: 3,
    label: "This Year",
  },
];

const ClientProjects = () => {
  const filterDisclosure = useDisclosure();
  const formDisclosure = useDisclosure();
  const { colorMode } = useColorMode();
  const [query, setQuery] = useState({
    period: "monthly",
    page: 1,
    pageLimit: 10,
  });

  const projectsQuery = useProjects(query);
  const projectStatusQuery = useUpdateProjectStatus();
  const { isExternal, isInternal } = useUserRole();

  const onQueryChange = (updateQuery) => {
    setQuery((prev) => ({ ...prev, ...updateQuery }));
  };

  const onStatusChange = ({ status, id }) => {
    projectStatusQuery
      .mutateAsync({ body: { status: status?.label }, id })
      .then(projectsQuery.refetch)
      .catch((err) => console.warn(err));
  };

  const onClearFilers = () => {
    setQuery({
      period: "monthly",
    });
  };

  const dateMenu = [
    {
      value: "monthly",
      label: "This Month",
    },
    {
      value: "quarterly",
      label: "This Quarter",
    },
    {
      value: "yearly",
      label: "This Year",
    },
  ];

  const PERIOD = {
    monthly: "This Month",
    quarterly: "This Quarter",
    yearly: "This Year",
  };

  const { ROUTES } = useMemo(() => {
    let ROUTES = APP_ROUTES.ADMIN;

    if (isExternal) {
      ROUTES = APP_ROUTES.CLIENT;
    }

    return {
      ROUTES,
    };
  }, [isExternal]);

  return (
    <Box>
      <TableHeaderOptions
        title={"Projects"}
        subtitle={"Projects"}
        actionButtonProps={{ minW: "135px" }}
      />

      <TableHeaderOptions
        containerProps={{ mt: 5 }}
        title={"Projects"}
        titleProps={{ fontWeight: 400 }}
        onQueryChange={onQueryChange}
        // action={filterDisclosure.onOpen}
        // actionText={"Add Filters"}
        // actionButtonProps={{
        //   as: IconButton,
        //   icon: <Icon as={APP_ICONS.FILTER} mt={1} boxSize={5} />,
        //   minW: "40px",
        //   width: "40px",
        //   h: "35px",
        //   variant: "unstyled",
        // }}
        stackProps={{ spacing: 3 }}
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
            title: "Project Name",
            extractor: "name",
            align: "left",
            isSortable: true,
            component: (item) => (
              <Text
                _hover={{ textDecor: "underline" }}
                as={Link}
                to={helper.createDynamicPath(ROUTES?.PROJECTS_VIEW, {
                  id: item._id,
                })}
                fontFamily={"Helvetica"}
                fontWeight={700}
                fontSize={"12px"}
              >
                {item.name}
              </Text>
            ),
          },
          {
            title: "Project Manager",
            extractor: "projectManager",
            align: "center",
            isSortable: false,
            component: (item) => (
              <Avatar
                size="sm"
                name={`${item.projectManager?.firstName ?? "-"} ${
                  item.projectManager?.lastName ?? "-"
                }`}
                src={getImageUrl(item?.projectManager?.userImage)}
              />
            ),
          },
          {
            title: "Client User",
            extractor: "clientUsers",
            align: "center",
            isSortable: false,
            component: (item) => {
              return (
                <AvatarGroup max={2} size="sm" boxSize={"30px"} m={"auto"}>
                  {helper.isArray(item?.clientUsers) &&
                    item?.clientUsers?.map((user) => (
                      <Avatar
                        name={`${user?.clientUserName}`}
                        src={getImageUrl(user?.clientUserImage)}
                      />
                    ))}
                </AvatarGroup>
              );
            },
          },
          {
            title: "Start Date",
            extractor: "startDate",
            align: "center",
            isSortable: true,
            component: (item) => formatDate(item?.startDate),
          },
          {
            title: "End Date",
            extractor: "endDate",
            align: "center",
            isSortable: true,
            component: (item) => formatDate(item?.endDate),
          },
          {
            title: "Status",
            extractor: "access",
            align: "center",
            component: (item) => (
              <DropdownSelect
                value={item?.status}
                options={statuses}
                onChange={(status) => onStatusChange({ status, id: item._id })}
                buttonProps={{
                  bg:
                    item?.status === "Pending"
                      ? "#E2EEFF"
                      : item?.status === "Completed"
                      ? "#28F33C1A"
                      : item?.status === "Ongoing"
                      ? "#F3BA281A"
                      : "#28F33C1A",
                  color:
                    item?.status === "Pending"
                      ? "#1758FF"
                      : item?.status === "Completed"
                      ? "#12B20F"
                      : item?.status === "Ongoing"
                      ? "#F3BA28"
                      : "#12B20F",
                  fontWeight: "700 ",
                }}
                iconProps={{ fontSize: "17px" }}
              />
            ),
          },
        ]}
        data={projectsQuery.data?.data?.projects}
        loading={projectsQuery?.isLoading}
        totalResults={projectsQuery?.data?.data?.pagination?.total}
        totalPages={projectsQuery?.data?.data?.pagination?.pages?.length}
        pageSize={query?.pageLimit}
        pageNo={query?.page}
        onQueryChange={onQueryChange}
        query={query}
        onRefresh={projectsQuery.refetch}
        isRefreshing={projectsQuery?.isFetching}
      />

      <FilterDrawer
        disclosure={filterDisclosure}
        query={query}
        onQueryChange={onQueryChange}
        onClearFilers={onClearFilers}
      />
      <ProjectForm disclosure={formDisclosure} />
    </Box>
  );
};

export default ClientProjects;
