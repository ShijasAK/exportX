import {
    Button,
    ButtonGroup,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
    PopoverFooter
} from '@chakra-ui/react'
import React from 'react'
import BreakText from '../../data/Information/BreakText'

const DeletePopover = ({ children, type = "item", onConfirm, popoverProps }) => {
    return (
        <Popover {...popoverProps}>
            {({ onClose }) => (
                <>
                    <PopoverTrigger>
                        {children}
                    </PopoverTrigger>
                    <PopoverContent>
                        <PopoverHeader pt={4} fontWeight='bold' border='0'>
                            Warning
                        </PopoverHeader>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverBody>
                           <BreakText maxWidth="300px" value={`Are you sure you want to delete this ${type}?`}/>
                        </PopoverBody>
                        <PopoverFooter
                            border='0'
                            display='flex'
                            alignItems='center'
                            justifyContent='end'
                            pb={4}
                        >
                            <ButtonGroup size='sm'>
                                <Button onClick={() => onClose()}>No</Button>
                                <Button colorScheme='red' onClick={() => {
                                    onConfirm()
                                    onClose()
                                }}>
                                    Yes
                                </Button>
                            </ButtonGroup>
                        </PopoverFooter>
                    </PopoverContent>
                </>
            )}
        </Popover>
    )
}

export default DeletePopover