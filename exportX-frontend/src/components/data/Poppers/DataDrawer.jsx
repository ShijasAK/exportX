import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { APP_DIR } from "../../../config/constants/enums";
import { useEffect } from "react";

const DataDrawer = ({
  heading,
  disclosure,
  drawerProps,
  contentProps,
  headingProps,
  children,
  onClose,
  footer,
}) => {
  const appDir = useSelector((state) => state.setting?.appDir);

  useEffect(() => {
    if (!disclosure?.isOpen) {
      onClose && onClose();
    }
  }, [disclosure?.isOpen]);
  return (
    <Drawer
      isOpen={disclosure?.isOpen}
      placement={appDir === APP_DIR.LTR ? "right" : "left"}
      onClose={disclosure?.onClose}
      {...drawerProps}
    >
      <DrawerOverlay />
      <DrawerContent maxW="50rem" {...contentProps}>
        <DrawerCloseButton />
        <DrawerHeader {...headingProps}>{heading}</DrawerHeader>

        <DrawerBody>{children}</DrawerBody>

        {footer ? <DrawerFooter>{footer}</DrawerFooter> : null}
      </DrawerContent>
    </Drawer>
  );
};

export default DataDrawer;
