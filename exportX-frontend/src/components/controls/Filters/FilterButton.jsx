import { Box, Button } from "@chakra-ui/react";
import React from "react";

const FilterButton = ({ label, onClick, iconButton }) => {
  return (
    <Box>
    <Button
      fontSize="10px"
      fontWeight="normal"
      borderRadius="20px"
      h="24px"
      onClick={onClick}
    >
      {label}
      {iconButton}
    </Button>
    </Box>
  );
};

export default FilterButton;
