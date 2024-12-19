import React from "react";
import { Box, useDisclosure } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import Sider from "./Sider";
import Header from "./Header";
import { Navigate, Outlet } from "react-router";
import { APP_DIR } from "../../../config/constants/enums";
import { globalConstants } from "../../../config/constants/globalConstants";
import { useUserRole } from "../../../hooks";

const ClientLayout = () => {
  const sidebar = useDisclosure();
  const desktopDisclosure = useDisclosure({ defaultIsOpen: false });
  const token = useSelector((state) => state.user?.token);
  const appDir = useSelector((state) => state.setting?.appDir);
  const { user = {} } = useSelector((state) => state.user) || {};
  const { isInternal } = useUserRole();

  if (!token) {
    return <Navigate to="/auth/login" replace={true} />;
  }

  if (token) {
    if (isInternal) {
      return <Navigate to="/dashboard" replace={true} />;
    }
  }

  return (
    <Box as="section" minH="100vh">
      <Sider disclosure={sidebar} desktopDisclosure={desktopDisclosure} />
      <Box
        ml={
          appDir === APP_DIR.RTL
            ? "0"
            : {
                base: 0,
                lg: desktopDisclosure.isOpen ? "115px" : "255px",
              }
        }
        mr={
          appDir === APP_DIR.LTR
            ? "0"
            : {
                base: 0,
                lg: desktopDisclosure.isOpen ? "115px" : "255px",
              }
        }
        transition=".3s ease"
      >
        <Header disclosure={sidebar} desktopDisclosure={desktopDisclosure} />
        <Box as="main" p="15px" bg={"#fff"} minH="calc(100vh - 115px)">
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default React.memo(ClientLayout);
