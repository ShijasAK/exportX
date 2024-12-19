import React from 'react'
import {
Box,
Text,
}from "@chakra-ui/react";

function TopHeading({heading}) {
  return (
    <Box
    borderTopRadius={"xl"}
    h={"50px"}
    bg={"#E2EEFF"}
    borderTop={"0"}
    alignItems={"center"}
    display={"flex"}
    p={"15px"}
    justifyContent={"space-between"}
    >
    <Text color={"#4371e5"}>
        {heading}
    </Text>
    <hr style={{ width: '18px', border: '2px #1758FF solid' }} />
    </Box>
  )
}

export default TopHeading