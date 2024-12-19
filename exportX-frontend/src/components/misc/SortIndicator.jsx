import { Flex, Icon, useColorMode } from "@chakra-ui/react";
import React from "react";
import APP_ICONS from "../../config/constants/icons";
import { colorKeys, getColor } from "../../config/constants/colors";
import { SORT_ORDERS } from "../../config/constants/enums";

const SortIndicator = ({ sortOrder, enabled }) => {
  const { colorMode } = useColorMode();
  return (
    <Flex>
      <Icon
        // color={enabled && sortOrder === SORT_ORDERS.DESC && "#707070"}
        color="#707070"
        m="-5px -7px 0px 0px"
        as={APP_ICONS.UpArrow}
        fontSize={'16px'}
      />
      <Icon
        // color={enabled && sortOrder === SORT_ORDERS.ASC && "#707070"}
        color="#707070"
        mr="5px"
        as={APP_ICONS.DownArrow}
        fontSize={'16px'}
      />
    </Flex>
  );
};

export default SortIndicator;
