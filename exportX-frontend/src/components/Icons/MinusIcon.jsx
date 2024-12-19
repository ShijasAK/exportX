import { Icon } from "@chakra-ui/react";
import React from "react";

const MinusIcon = ({...rest}) => {
  return (
    <Icon {...rest}>
      <path
        d="M2 2H18"
        stroke="#1758FF"
        stroke-width="3"
        stroke-linecap="square"
        stroke-linejoin="round"
      />
    </Icon>
  );
};

export default MinusIcon;
