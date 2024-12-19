import { Icon } from "@chakra-ui/react";
import React from "react";

const PencilIcon = ({...rest}) => {
  return (
    <Icon {...rest}>
      <path
        d="M12.7626 4.18961L13.7149 5.14199M14.1911 1.80866C14.3788 1.99624 14.5276 2.21895 14.6292 2.46407C14.7307 2.70919 14.783 2.97191 14.783 3.23723C14.783 3.50255 14.7307 3.76528 14.6292 4.01039C14.5276 4.25551 14.3788 4.47822 14.1911 4.6658L5.14351 13.7134L1.33398 14.6658L2.28637 10.9096L11.3378 1.81247C11.6946 1.45397 12.1731 1.24272 12.6784 1.22067C13.1837 1.19861 13.6788 1.36737 14.0654 1.69342L14.1911 1.80866Z"
        stroke="#34A853"
        stroke-opacity="0.3"
        stroke-linecap="round"
        fill="#fff"
        stroke-linejoin="round"
      />
    </Icon>
  );
};

export default PencilIcon;
