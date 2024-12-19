import React from 'react'
import { chakra } from "@chakra-ui/react"

const BreakText = ({ value, fontSize = "14px", ...rest }) => {
    return (
        <chakra.span
            maxWidth="275px"
            minW="275px"
            whiteSpace="break-spaces"
            display="block"
            fontSize={fontSize}
            {...rest}
        >{value}</chakra.span>
    )
}

export default BreakText