import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorMode,
} from "@chakra-ui/react";
import React from "react";
import { colorKeys, getColor } from "../../../config/constants/colors";

const DropdownSelect = ({
  options,
  onChange,
  value,
  buttonProps,
  hideIcon,
  iconProps,
}) => {
  const { colorMode } = useColorMode();
  return (
    <Menu size="sm">
      <MenuButton
        fontSize="12px"
        fontWeight={"normal"}
        rounded="full"
        textAlign={"left"}
        color={getColor(colorKeys.dark, colorMode)}
        h="30px"
        w="150px"
        as={Button}
        // rightIcon={!hideIcon ? <ChevronDownIcon {...iconProps} /> : undefined}
        {...buttonProps}
        onClick={(e) => e.stopPropagation()}
      >
        {value}
      </MenuButton>
      <MenuList>
        {options?.map((item, index) => (
          <MenuItem
            fontSize="12px"
            fontWeight={"normal"}
            onClick={(e) => {
              e.stopPropagation()
              item.onClick ? item.onClick() : onChange(item)
            }}
            key={index}
          >
            {item?.label || item}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default DropdownSelect;
