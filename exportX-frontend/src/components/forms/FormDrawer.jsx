import React from "react";
import {
  Button,
  Box,
  useDisclosure,
  Flex,
  HStack,
  Tooltip,
  IconButton,
  Icon,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from "@chakra-ui/react";
import FormButton from "../FormButton";
import APP_ICONS from "../../config/constants/icons";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { APP_DIR } from "../../config/constants/enums";

const FormDrawer = ({
  title,
  disclosure,
  size = "2xl",
  id = "drawer-form",
  containerProps,
  children,
  isSubmitting,
  onSubmit,
  reset,
  maxW,
  hideFooter,
  onCloseFn,
  saveButtonText = "Save",
  footerContent,
  isSubmitDisabled,
}) => {
  const { isOpen, onClose } = disclosure;
  const expandDisclosure = useDisclosure();
  const appDir = useSelector((state)=>state.settings?.appDir)

  useEffect(() => {
    if (!isOpen) {
      onCloseFn && onCloseFn();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <Drawer
      size={expandDisclosure.isOpen ? "full" : size}
      isOpen={isOpen}
      onClose={() => {
        onClose();
        reset && reset();
        onCloseFn && onCloseFn();
      }}
      isCentered
      motionPreset="none"
      placement={appDir===APP_DIR.LTR ? "right":"left"}
    >
      <DrawerOverlay />
      <DrawerContent
        maxH={{ base: "unset", md: "calc(100vh - 50px)" }}
        overflow={"auto"}
        {...containerProps}
        rounded="sm"
        maxW={expandDisclosure.isOpen ? "full" : maxW}
      >
        <Box as="form" onSubmit={onSubmit}>
          <Flex align="center" justify="space-between">
            <DrawerHeader minW="50%">{title}</DrawerHeader>
            <HStack spacing={5} px={4}>
              {size !== "full" && (
                <Tooltip
                  label={expandDisclosure.isOpen ? "Collapse" : "Expand"}
                  aria-label="A tooltip"
                >
                  <IconButton
                    onClick={expandDisclosure.onToggle}
                    variant={"ghost"}
                    size={"sm"}
                    aria-label="expand"
                    icon={
                      <Icon
                        as={
                          expandDisclosure.isOpen
                            ? APP_ICONS.COLLAPSE
                            : APP_ICONS.EXPAND
                        }
                      />
                    }
                  />
                </Tooltip>
              )}
              <Tooltip label={"Close"} aria-label="A tooltip">
                <IconButton
                  onClick={onClose}
                  variant={"ghost"}
                  size={"sm"}
                  aria-label="Close"
                  icon={<Icon as={APP_ICONS.CLOSE} />}
                />
              </Tooltip>
            </HStack>
          </Flex>

          <DrawerBody mb={hideFooter && 2}>{children}</DrawerBody>

          {!hideFooter && (
            <DrawerFooter>
              {footerContent ? (
                footerContent
              ) : (
                <>
                  <Button
                    variant="outline"
                    mr={3}
                    onClick={() => {
                      onClose();
                      reset && reset();
                      onCloseFn && onCloseFn();
                    }}
                  >
                    Cancel
                  </Button>
                  <FormButton
                    type="submit"
                    form={id}
                    colorScheme="blue"
                    isLoading={isSubmitting}
                    onClick={onSubmit}
                    isDisabled={isSubmitDisabled}
                  >
                    {saveButtonText}
                  </FormButton>
                </>
              )}
            </DrawerFooter>
          )}
        </Box>
      </DrawerContent>
    </Drawer>
  );
};

export default FormDrawer;
