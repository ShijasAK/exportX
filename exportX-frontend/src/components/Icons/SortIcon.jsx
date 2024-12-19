import { Icon } from "@chakra-ui/react";
import React from "react";

const SortIcon = ({ ...rest }) => {
  return (
    <Icon {...rest}>
      <path
        d="M5.46096 0L10.9219 5.46096L9.49566 6.88723L6.46964 3.86121V12.5217H4.45229V3.86121L1.42627 6.88723L0 5.46096L5.46096 0ZM15.5477 5.46096V14.1214L18.5737 11.0954L20 12.5217L14.539 17.9827L9.07807 12.5217L10.5043 11.0954L13.5304 14.1214V5.46096H15.5477Z"
        fill="#707070"
      />
    </Icon>
  );
};

export default SortIcon;
