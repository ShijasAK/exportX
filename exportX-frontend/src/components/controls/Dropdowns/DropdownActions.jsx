import { Button, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { Menu } from "iconsax-react";
import React from "react";

const DropdownActions = ({ buttonProps }) => {
  return (
    <Menu>
      <MenuButton as={Button} {...buttonProps}>
        Actions
      </MenuButton>
      <MenuList>
        <MenuItem>Download</MenuItem>
        <MenuItem>Create a Copy</MenuItem>
        <MenuItem>Mark as Draft</MenuItem>
        <MenuItem>Delete</MenuItem>
        <MenuItem>Attend a Workshop</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default DropdownActions;
