import { Icon } from "@chakra-ui/react";
import React from "react";

const ScreenIcon = ({...rest}) => {
  return (
    <Icon {...rest}>
      <path
        d="M1.5 0V1.5H0V3H1.5V18H3V3H18V1.5H3V0H1.5ZM4.5 4.5V13.5H16.5V4.5H4.5ZM6 6H15V12H6V6Z"
        fill="#34A853"
        fill-opacity="0.3"
      />
    </Icon>
  );
};

export default ScreenIcon;
