import { Icon } from "iconsax-react";
import React from "react";

const ArrowIcon = ({ ...rest }) => {
  return (
    <Icon {...rest}>
      <path
        d="M6.87402 12.0869L1.47405 6.68693M1.47405 6.68693L6.87402 1.28696M1.47405 6.68693L12.274 6.68694"
        stroke="#FF5017"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
};

export default ArrowIcon;
