import {
  Badge,
  Box,
  Button,
  HStack,
  Heading,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  Wrap,
  WrapItem,
  useColorMode,
} from "@chakra-ui/react";
import React, { useState } from "react";
import APP_ICONS from "../../../config/constants/icons";
import { colorKeys, getColor } from "../../../config/constants/colors";
import CustomPopover from "../Popovers/CustomPopover";
import FilterButton from "./FilterButton";

const PopoverFilter = ({
  options,
  selected,
  onChange,
  onRemove,
  onRemoveAll,
  placeholder,
}) => {
  const [search, setSearch] = useState("");
  const { colorMode } = useColorMode();

  const handleChange = (item) => {
    onChange(item);
  };

  const handleRemove = (item) => {
    onRemove(item);
  };

  const handleRemoveAll = () => {
    onRemoveAll();
  };

  return (
    <HStack>
      {selected?.map((item, index) => (
        <Box>
          <FilterButton
            key={index}
            Icon
            label={item.label}
            onClick={() => handleRemove(item)}
            iconButton={
              <IconButton
                variant={"unstyled"}
                _hover={{ opacity: 1 }}
                boxSize={"3"}
                icon={
                  <Icon
                    pos="relative"
                    top="-2px"
                    right="-22px"
                    as={APP_ICONS.CLOSE}
                    color={"red"}
                    boxSize={"4"}
                    _hover={{ opacity: 1 }}
                  />
                }
              />
            }
          />
        </Box>
      ))}
      <CustomPopover
        triggerProps={{
          className: "icon-mr-xs",
          h: "24px",
          color: getColor(colorKeys.primary, colorMode),
          bg: "#FFE2E5",
          leftIcon: (
            <Icon mr="0" mb="2px" boxSize={"13px"} as={APP_ICONS.ADD} />
          ),
          fontSize: "10px",
          fontWeight: "normal",
          borderRadius: "20px",
          px: "3",
        }}
        headingProps={{ display: "none" }}
        hideCloseButton={true}
        label="Add"
        containerProps={{ className: "custom-popover filter-popover" }}
      >
        <VStack my="2" align={"stretch"} spacing={3}>
          <InputGroup>
            <Input
              w="360px"
              fontSize="12px"
              rounded={"full"}
              maxW={"full"}
              placeholder={placeholder}
              type="search"
              onChange={(e) => setSearch(e.target.value)}
            />
            <InputRightElement
              children={
                <Icon
                  color={getColor(colorKeys.primary, colorMode)}
                  boxSize="5"
                  as={APP_ICONS.SEARCH}
                />
              }
            />
          </InputGroup>

          <Box w="52px">
            <FilterButton label={"All"} onClick={handleRemoveAll} />
          </Box>

          <Heading fontSize={"16px"} color="#353535">
            Suggestions
          </Heading>

          <Wrap>
            {options
              ?.filter((item) => {
                if (search === "") {
                  return item;
                } else if (
                  item.label.toLowerCase().includes(search.toLowerCase())
                ) {
                  return item;
                }
              })
              ?.map((item, index) => {
                if (selected?.find((i) => i.value === item.value)) {
                  return null;
                }
                return (
                  <WrapItem key={index}>
                    <FilterButton
                      label={item.label}
                      onClick={() => handleChange(item)}
                    />
                  </WrapItem>
                );
              })}
          </Wrap>
        </VStack>
      </CustomPopover>
    </HStack>
  );
};

export default PopoverFilter;
