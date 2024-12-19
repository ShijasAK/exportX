import React from "react";
import {
  Button,
  Box,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverCloseButton,
  PopoverBody,
  PopoverFooter,
  ButtonGroup,
  PopoverArrow,
  useDisclosure,
  useOutsideClick,
} from "@chakra-ui/react";
import { useRef } from "react";

const CustomPopover = ({
  label = "Custom Popover",
  heading = "Heading",
  children,
  triggerProps,
  placement = "bottom",
  headingProps,
  hideCloseButton = false,
  containerProps,
  contentProps,
  bodyProps,
}) => {
  const popoverRef = useRef();
  const { isOpen, onToggle, onClose } = useDisclosure();
  
  useOutsideClick({
    ref: popoverRef,
    handler: () => onClose(),
  });

  return (
    <Box className="custom-popover" {...containerProps} ref={popoverRef}>
      <Popover
        returnFocusOnClose={false}
        isOpen={isOpen}
        onClose={onClose}
        placement={placement}
        closeOnBlur={false}
        strategy="absolute"
        
      >
        <PopoverTrigger>
          <Button onClick={onToggle} {...triggerProps}>
            {label}
          </Button>
        </PopoverTrigger>
        <PopoverContent {...contentProps}>
          <PopoverHeader fontWeight="semibold" {...headingProps}>
            {heading}
          </PopoverHeader>
          <PopoverArrow />
          {!hideCloseButton && <PopoverCloseButton />}
          <PopoverBody {...bodyProps}>{children}</PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
};

export default CustomPopover;
