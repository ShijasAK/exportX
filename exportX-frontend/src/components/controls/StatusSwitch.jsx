import React from "react";
import { Switch, useDisclosure } from "@chakra-ui/react";

const StatusSwitch = ({ onChange, value }) => {
  const checked = useDisclosure({ defaultIsOpen: value });

  return (
    <Switch
      colorScheme="action"
      onChange={(e)=> {
        onChange &&   onChange(e)
        checked.onToggle()
      }}
      value={value}
      isChecked={checked.isOpen}
      className={checked.isOpen ? "switch-active" : "switch-inactive"}
    />
  );
};

export default StatusSwitch;
