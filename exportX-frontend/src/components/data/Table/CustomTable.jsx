import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Flex,
  Input,
  Box,
  HStack,
  IconButton,
  Icon,
  useColorMode,
  Text,
  Button,
  Skeleton,
  Select,
  chakra,
  Tooltip,
} from "@chakra-ui/react";
import {
  Pagination,
  usePagination,
  PaginationPage,
  PaginationNext,
  PaginationPrevious,
  PaginationPageGroup,
  PaginationContainer,
  PaginationSeparator,
} from "@ajna/pagination";
import { getColor, colorKeys } from "../../../config/constants/colors";
import APP_ICONS from "../../../config/constants/icons";
import { ACTIONS, SORT_ORDERS } from "../../../config/constants/enums";
// import CustomSelect from "../../Forms/CustomSelect";
import DeletePopover from "../../controls/Popovers/DeletePopover";
import NoResult from "../../SVGComponents/NoResult";
import NoResultsCard from "../Cards/NoResultCard";
import SortIndicator from "../../misc/SortIndicator";

const CustomTable = ({
  //data manipulation
  head,
  data,
  loading,
  searchKey = "search",
  pageSize: limit,
  pageNo,
  query,
  onQueryChange,
  totalPages,
  totalResults,
  onRefresh,
  filters = [],
  caption,
  isRefreshing = false,
  searchPlaceholder,
  tableFor,

  //styles manipulations
  fixedHeight = true,
  rowHeight = "36px",
  size = "md",
  containerProps,
  tableProps,
  tableHeadProps,
  tbodyProps,
  hideFilterBar = false,
  tableWrapperProps,
  hideSearch = false,
  tableHeadTextProps,
  columnsPadding = "3",
  searchBarProps,
  theadRowProps,

  //actions
  onDelete,
  onEdit,
  onView,
  editActionProps,
  viewActionProps,
  viewUrl,
}) => {
  const { colorMode } = useColorMode();

  limit = limit ? Number(limit) : 20;
  pageNo = pageNo ? Number(pageNo) : 1;

  const { pages, pagesCount, currentPage, setCurrentPage } = usePagination({
    pagesCount: totalPages,
    total: totalResults,
    limits: {
      outer: 4,
      inner: 4,
    },
    initialState: {
      pageSize: limit,
      currentPage: pageNo,
    },
  });

  const handlePageChange = (nextPage) => {
    setCurrentPage(nextPage);
    onQueryChange({ page: nextPage, pageLimit: limit });
  };

  const handleSort = (key, order) => {
    console.log("handleSort -> order", order, limit, query);
    onQueryChange({
      orderBy: key,
      order: order,
      page: 1,
      pageLimit: limit,
    });
    setCurrentPage(1);
  };

  // console.log(
  //   limit && pageNo && onQueryChange && totalPages > 0,
  //   limit,
  //   pageNo,
  //   totalPages,
  //   "tavv"
  // );

  return (
    <TableContainer
      h={fixedHeight ? "calc(100vh - 215px)" : "auto"}
      {...containerProps}
    >
      {!hideFilterBar && (
        <Flex h="50px" my={2} justify="space-between" align="center" px="5px">
          <HStack spacing={3}>
            {!hideSearch && (
              <Input
                type="search"
                placeholder={searchPlaceholder ? searchPlaceholder : "Search"}
                rounded="sm"
                size="md"
                maxW="300px"
                bg={getColor(colorKeys.tableBackground, colorMode)}
                onChange={(e) => {
                  onQueryChange({
                    [searchKey]: e.target.value,
                    page: 1,
                    pageLimit: limit,
                  });
                  setCurrentPage(1);
                }}
                {...searchBarProps}
              />
            )}
          </HStack>
          <HStack spacing={3}>
            {onRefresh && (
              <Button
                minW="100px"
                size="sm"
                leftIcon={<Icon as={APP_ICONS.REFRESH} fontSize={"20px"} />}
                isLoading={isRefreshing}
                onClick={onRefresh}
              >
                Refresh
              </Button>
            )}
          </HStack>
        </Flex>
      )}

      <Box
        h="calc(100vh - 265px)"
        overflowY={"auto"}
        bg={getColor(colorKeys.tableBackground, colorMode)}
        p="0 20px 15px"
        {...tableWrapperProps}
      >
        <Table
          variant="simple"
          size={size}
          opacity={isRefreshing ? "0.5" : "1"}
          {...tableProps}
        >
          {caption && <TableCaption>{caption}</TableCaption>}
          <Thead
            zIndex="1"
            pos="sticky"
            top={0}
            h="45px"
            bg={getColor(colorKeys.tableBackground, colorMode)}
            {...tableHeadProps}
          >
            <Tr {...theadRowProps}>
              {head &&
                head?.map((item, index) => (
                  <Th
                    textTransform={"capitalize"}
                    textAlign={item.align ? item.align : "center"}
                    fontSize="15px"
                    color={getColor(colorKeys.lightGray, colorMode)}
                    key={index}
                    p="4px 0px"
                    h={"35px"}
                    rounded="sm"
                    px={columnsPadding}
                    ml={"0px"}
                  >
                    <Flex
                      align={"center"}
                      justify={item.align ? item.align : "left"}
                      onClick={
                        item.isSortable
                          ? () =>
                              handleSort(
                                item.extractor,
                                query?.order === SORT_ORDERS.ASC
                                  ? SORT_ORDERS.DESC
                                  : SORT_ORDERS.ASC
                              )
                          : null
                      }
                      h="full"
                      cursor={item.isSortable ? "pointer" : "default"}
                    >
                      <Tooltip
                        isDisabled={!item.isSortable}
                        arrowSize={15}
                        label={`Sort in ${
                          query?.orderBy === item.extractor &&
                          query?.order === SORT_ORDERS.ASC
                            ? "descending"
                            : "ascending"
                        } order`}
                        aria-label="A tooltip"
                      >
                        <Flex
                          h="full"
                          align={"center"}
                          transition="all 0.2s ease-in-out"
                          {...tableHeadTextProps}
                        >
                          {item.isSortable && (
                            <SortIndicator
                              enabled={query?.orderBy === item.extractor}
                              sortOrder={query?.order}
                            />
                          )}
                          <chakra.p
                            fontSize={"12px"}
                            fontWeight={"700"}
                            color={"#E2E2E2"}
                          >
                            {item.title}
                          </chakra.p>
                        </Flex>
                      </Tooltip>
                    </Flex>
                  </Th>
                ))}
            </Tr>
          </Thead>
          <Tbody
            {...tbodyProps}
            borderTop={`1px solid ${getColor(colorKeys.whiteSmoke, colorMode)}`}
          >
            {!loading && data && data.length > 0
              ? data?.map((row, rowIndex) => {
                  return (
                    <Tr
                      h={rowHeight}
                      key={rowIndex}
                      bg={getColor(colorKeys.tableBackground, colorMode)}
                      borderColor="transparent"
                      _hover={{
                        backgroundColor: `${getColor(
                          colorKeys.tableRowHoverBackground,
                          colorMode
                        )} !important`,
                      }}
                      _odd={{
                        backgroundColor: getColor(
                          colorKeys.tableStripedRowBackground,
                          colorMode
                        ),
                      }}
                    >
                      {head &&
                        head?.map((item, index) => {
                          if (item.component) {
                            return (
                              <Td
                                key={index}
                                color={getColor(
                                  colorKeys.primaryText,
                                  colorMode
                                )}
                                p="0px"
                                cursor="pointer"
                                textAlign={item.align ? item.align : "left"}
                                {...tableHeadTextProps}
                                px={columnsPadding}
                                fontSize={"14px"}
                              >
                                {item.component(row, rowIndex)}
                              </Td>
                            );
                          } else if (item.extractor === "actions") {
                            return (
                              <Td
                                key={index}
                                color={getColor(
                                  colorKeys.primaryText,
                                  colorMode
                                )}
                                p="2px 0px"
                                cursor="pointer"
                                textAlign={item.align ? item.align : "center"}
                                px={columnsPadding}
                                fontSize={"14px"}
                              >
                                <HStack spacing={1} justify={"center"}>
                                  {row[item.extractor]?.map(
                                    (action, actionIndex) => {
                                      if (
                                        action.isDelete ||
                                        action.name === ACTIONS.DELETE
                                      ) {
                                        if (!onDelete) return null;
                                        return (
                                          <DeletePopover
                                            type={tableFor}
                                            popoverProps={{
                                              placement: "bottom-start",
                                            }}
                                            key={actionIndex}
                                            onConfirm={() => onDelete(row.id)}
                                          >
                                            <IconButton
                                              variant={"ghost"}
                                              size="sm"
                                              icon={
                                                <Icon
                                                  as={APP_ICONS.BIN}
                                                  color={getColor(
                                                    colorKeys.danger,
                                                    colorMode
                                                  )}
                                                />
                                              }
                                            >
                                              {action.title}
                                            </IconButton>
                                          </DeletePopover>
                                        );
                                      }
                                      if (
                                        action.isEdit ||
                                        action.name === ACTIONS.EDIT
                                      ) {
                                        if (!onEdit) return null;
                                        return (
                                          <IconButton
                                            variant={"ghost"}
                                            size="sm"
                                            icon={
                                              <Icon
                                                as={APP_ICONS.EDIT}
                                                color={getColor(
                                                  colorKeys.success,
                                                  colorMode
                                                )}
                                              />
                                            }
                                            key={actionIndex}
                                            onClick={() => onEdit(row)}
                                            {...editActionProps}
                                          >
                                            {action.title}
                                          </IconButton>
                                        );
                                      }
                                      if (
                                        action.isView ||
                                        action.name === ACTIONS.VIEW
                                      ) {
                                        if (!onView) return null;
                                        return (
                                          <IconButton
                                            variant={"ghost"}
                                            size="sm"
                                            icon={
                                              <Icon
                                                as={APP_ICONS.EYE}
                                                color={getColor(
                                                  colorKeys.lightBlue,
                                                  colorMode
                                                )}
                                              />
                                            }
                                            key={actionIndex}
                                            onClick={() => onView(row)}
                                            {...(viewActionProps?.a
                                              ? {
                                                  href: `${viewUrl}/${item.id}`,
                                                }
                                              : {})}
                                            {...viewActionProps}
                                          >
                                            {action.title}
                                          </IconButton>
                                        );
                                      }
                                      return (
                                        <IconButton
                                          variant={"ghost"}
                                          size="sm"
                                          icon={<Icon as={action.icon} />}
                                          key={actionIndex}
                                          onClick={() => action.action(row.id)}
                                        >
                                          {action.title}
                                        </IconButton>
                                      );
                                    }
                                  )}
                                </HStack>
                              </Td>
                            );
                          }
                          return (
                            <Td
                              key={index}
                              color={getColor(colorKeys.primaryText, colorMode)}
                              cursor="pointer"
                              textAlign={item.align ? item.align : "left"}
                              p="unset"
                              h={rowHeight}
                              px={columnsPadding}
                              fontSize={"14px"}
                            >
                              {row[item.extractor] ||
                                item.fallBackText ||
                                "N/A"}
                            </Td>
                          );
                        })}
                    </Tr>
                  );
                })
              : !loading &&
                !isRefreshing && (
                  <Tr>
                    <Td colSpan={head.length} borderBottom="0">
                      <Box w="500px" mx="auto" my={10}>
                        <NoResultsCard show={true} />
                      </Box>
                    </Td>
                  </Tr>
                )}
            {loading &&
              new Array(15).fill(0).map((item, index) => (
                <Tr key={index}>
                  <Td colSpan={head.length} p="10px 0px">
                    <Skeleton height="25px" w="full" />
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </Box>

      {limit && pageNo && onQueryChange && totalPages > 0 ? (
        <Flex justify={"space-between"}>
          <Text
            fontSize="sm"
            color={getColor(colorKeys.primaryText, colorMode)}
            my={2}
            mr={2}
            pl="5px"
          >
            Showing {pageNo * limit - limit + 1} to{" "}
            {pageNo * limit > totalResults ? totalResults : pageNo * limit} of{" "}
            {totalResults} records
          </Text>
          <HStack spacing={1}>
            <Select
              defaultValue={query?.pageLimit}
              size="sm"
              onChange={(e) => {
                onQueryChange({
                  pageLimit: Number(e.target.value),
                  page: 1,
                });
                setCurrentPage(1);
              }}
            >
              {[5, 10, 20, 50].map((item, index) => (
                <option selected={item === limit} key={index} value={item}>
                  {item}
                </option>
              ))}
            </Select>
            <Pagination
              pagesCount={pagesCount}
              currentPage={pageNo}
              onPageChange={handlePageChange}
            >
              <PaginationContainer
                align="center"
                justify="end"
                p={4}
                w="full"
                as={HStack}
                spacing={2}
              >
                <PaginationPrevious
                  as={Button}
                  size="sm"
                  color={getColor(
                    colorKeys.paginationNavigationColor,
                    colorMode
                  )}
                  bg={getColor(
                    colorKeys.paginationNavigationBgColor,
                    colorMode
                  )}
                  _hover={{
                    bg: getColor(
                      colorKeys.paginationNavigationBgColor,
                      colorMode
                    ),
                  }}
                >
                  <Text>Previous</Text>
                </PaginationPrevious>
                <PaginationPageGroup
                  isInline
                  align="center"
                  separator={
                    <PaginationSeparator
                      fontSize="sm"
                      color={getColor(colorKeys.primaryText, colorMode)}
                      w={10}
                      jumpSize={11}
                    />
                  }
                >
                  {pages?.map((page) => (
                    <PaginationPage
                      minW={"fit-content"}
                      w="8"
                      as={Button}
                      key={`pagination_page_${page}`}
                      page={page}
                      size="sm"
                      bg={getColor(
                        colorKeys.paginationNavigationBgColor,
                        colorMode
                      )}
                      _hover={{
                        bg: getColor(
                          colorKeys.paginationNavigationBgColor,
                          colorMode
                        ),
                      }}
                      fontSize="sm"
                      _current={{
                        bg: getColor(colorKeys.secondary, colorMode),
                        color: getColor(colorKeys.primary, colorMode),
                      }}
                    />
                  ))}
                </PaginationPageGroup>
                <PaginationNext
                  as={Button}
                  size="sm"
                  color={getColor(
                    colorKeys.paginationNavigationColor,
                    colorMode
                  )}
                  bg={getColor(
                    colorKeys.paginationNavigationBgColor,
                    colorMode
                  )}
                  _hover={{
                    bg: getColor(
                      colorKeys.paginationNavigationBgColor,
                      colorMode
                    ),
                  }}
                >
                  <Text>Next</Text>
                </PaginationNext>
              </PaginationContainer>
            </Pagination>
          </HStack>
        </Flex>
      ) : null}
    </TableContainer>
  );
};

export default React.memo(CustomTable);
