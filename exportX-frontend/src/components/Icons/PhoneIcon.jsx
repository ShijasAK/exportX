import React from "react";
import { Icon, createIcon } from "@chakra-ui/react";

const PhoneIcon = ({ ...rest }) => {
  return (
    <Icon {...rest}>
      <path
        d="M9.375 1.125C9.67337 1.125 9.95952 1.24353 10.1705 1.4545C10.3815 1.66548 10.5 1.95163 10.5 2.25V15.75C10.5 16.0484 10.3815 16.3345 10.1705 16.5455C9.95952 16.7565 9.67337 16.875 9.375 16.875H2.625C2.32663 16.875 2.04048 16.7565 1.82951 16.5455C1.61853 16.3345 1.5 16.0484 1.5 15.75V2.25C1.5 1.95163 1.61853 1.66548 1.82951 1.4545C2.04048 1.24353 2.32663 1.125 2.625 1.125H9.375ZM2.625 0C2.02826 0 1.45597 0.237053 1.03401 0.65901C0.612053 1.08097 0.375 1.65326 0.375 2.25V15.75C0.375 16.3467 0.612053 16.919 1.03401 17.341C1.45597 17.7629 2.02826 18 2.625 18H9.375C9.97174 18 10.544 17.7629 10.966 17.341C11.3879 16.919 11.625 16.3467 11.625 15.75V2.25C11.625 1.65326 11.3879 1.08097 10.966 0.65901C10.544 0.237053 9.97174 0 9.375 0L2.625 0Z"
        fill="#34A853"
        fill-opacity="0.3"
      />
      <path
        d="M6 15.75C6.29837 15.75 6.58452 15.6315 6.79549 15.4205C7.00647 15.2095 7.125 14.9234 7.125 14.625C7.125 14.3266 7.00647 14.0405 6.79549 13.8295C6.58452 13.6185 6.29837 13.5 6 13.5C5.70163 13.5 5.41548 13.6185 5.20451 13.8295C4.99353 14.0405 4.875 14.3266 4.875 14.625C4.875 14.9234 4.99353 15.2095 5.20451 15.4205C5.41548 15.6315 5.70163 15.75 6 15.75Z"
        fill="#34A853"
        fill-opacity="0.3"
      />
    </Icon>
  );
};

export default PhoneIcon;