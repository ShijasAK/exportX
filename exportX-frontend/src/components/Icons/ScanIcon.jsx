import { Icon } from "@chakra-ui/react";
import React from "react";

const ScanIcon = ({ ...rest }) => {
  return (
    <Icon {...rest}>
      <path
        d="M1 3.83333V2.16667C1 1.72464 1.17559 1.30072 1.48816 0.988155C1.80072 0.675595 2.22464 0.5 2.66667 0.5H4.33333M12.6667 0.5H14.3333C14.7754 0.5 15.1993 0.675595 15.5118 0.988155C15.8244 1.30072 16 1.72464 16 2.16667V3.83333M16 12.1667V13.8333C16 14.2754 15.8244 14.6993 15.5118 15.0118C15.1993 15.3244 14.7754 15.5 14.3333 15.5H12.6667M4.33333 15.5H2.66667C2.22464 15.5 1.80072 15.3244 1.48816 15.0118C1.17559 14.6993 1 14.2754 1 13.8333V12.1667"
        stroke="#C90016"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M8.5 10.5C9.88071 10.5 11 9.38071 11 8C11 6.61929 9.88071 5.5 8.5 5.5C7.11929 5.5 6 6.61929 6 8C6 9.38071 7.11929 10.5 8.5 10.5Z"
        stroke="#C90016"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M11.8333 11.3333L10.25 9.75"
        stroke="#C90016"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Icon>
  );
};

export default ScanIcon;
