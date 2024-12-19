import React from 'react'
import { Text, Box, Heading } from "@chakra-ui/react";

function ImageIdeaContentHeadings({ headingText, content }) {
    return (
        <Box>
            <Text
                color={'#252525'}
                fontSize={'14'}
                fontFamily={'Helvetica'}
                fontWeight={'400'}
                wordWrap={'break-word'}
            >      <b
                fontSize={'14'}
                fontFamily={'Helvetica'}
                fontWeight={'700'}
                wordWrap={'break-word'}
            >
                    {headingText}
                </b>
                {content}</Text>
        </Box>
    )
}

export default ImageIdeaContentHeadings