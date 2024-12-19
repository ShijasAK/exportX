import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  HStack,
  Icon,
  IconButton,
  Image,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  VStack,
  Menu,
  useColorMode,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import NavItem from "./NavItem";
import { getColor, colorKeys } from "../../../config/constants/colors";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { mainMenu } from "../../../config/constants/menus";
import Logo from "../../SVGComponents/Logo";
import LogoSm from "../../SVGComponents/LogoSm";
import APP_IMAGES from "../../../config/constants/images";
import APP_ICONS from "../../../config/constants/icons";
import { useDispatch, useSelector } from "react-redux";
import { APP_DIR } from "../../../config/constants/enums";
import { resetUser } from "../../../config/redux/slices/userSlice";
import { useLogOut } from "../../../config/query/authQuery";
import { getImageUrl } from "../../../config/utils/fileUtil";
import { clientMenu } from "../../../config/constants/clientMenu";

const Sider = ({ disclosure, desktopDisclosure }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { colorMode } = useColorMode();
  const { pathname } = useLocation();
  const user = useSelector((state) => state.user?.user);
  const appDir = useSelector((state) => state.setting?.appDir);
  const logoutQuery = useLogOut();

  const onLogout = () => {
    logoutQuery
      .mutateAsync()
      .then((response) => {
        dispatch(resetUser());
        navigate("/auth/login");
      })
      .catch((error) => console.warn(error, "error"));
  };

  useEffect(() => {
    disclosure.onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const SidebarContent = (props) => (
    <Box
      as="nav"
      pos="fixed"
      top="0"
      left={appDir === APP_DIR.LTR && "0"}
      right={appDir === APP_DIR.RTL && "0"}
      zIndex="sticky"
      h="full"
      pb="10"
      overflowX="hidden"
      overflowY="auto"
      bg={getColor(colorKeys.siderBackground, colorMode)}
      transition=".3s ease"
      transitionDelay=".2s" // Add the transition delay value here
      w={desktopDisclosure.isOpen ? "115px" : "255px"}
      py="15px"
      px="10px"
      {...props}
    >
      <Box
        bg={
          "linear-gradient(123.64deg, rgba(255, 255, 255, 0) -22.38%, rgba(255, 255, 255, 0.078) 70.38%), radial-gradient(69.43% 69.43% at 50% 50%, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%)"
        }
        p="0.5px"
        rounded="8px"
      >
        <Flex
          flexDir={"column"}
          justify={"space-between"}
          shadow={"lg"}
          rounded={"lg"}
          border={"0.5px solid"}
          h="calc(100vh - 35px)"
          bg={
            "linear-gradient(77deg, rgba(16,16,16,1) 5%, rgba(34,34,34,1) 22%, rgba(37,37,37,1) 38%, rgba(59,59,59,1) 66%);"
          }
        >
          <Box>
            <Flex
              justify="center"
              h={"70px"}
              align="center"
              borderTopRadius={"lg"}
            >
              <Link to="/client/dashboard">
                {desktopDisclosure?.isOpen ? <LogoSm /> : <Logo />}
              </Link>
            </Flex>

            <Box>
              <VStack
                spacing={1}
                mt={4}
                direction="column"
                as="nav"
                fontSize="sm"
                color="primaryText"
                aria-label="Main Navigation"
              >
                {clientMenu.map((item, index) => {
                  return (
                    <NavItem
                      key={index}
                      icon={item.icon}
                      title={item.title}
                      link={item.link}
                      subsider={item.subsider}
                      isOpen={!desktopDisclosure.isOpen}
                    />
                  );
                })}
                {/* <NavItem
                  icon={APP_ICONS.GEAR}
                  title={"Settings"}
                  link={"/dashboard/settings/designations"}
                  isSubsiderOpen={pathname.includes("/dashboard/settings")}
                  subsider={[
                    {
                      title: "Designations",
                      link: "/dashboard/settings/designations",
                    },
                    {
                      title: "Roles",
                      link: "/dashboard/settings/roles",
                    },
                    {
                      title: "Ad Goals",
                      link: "/dashboard/settings/ad-goals",
                    },
                    {
                      title: "Tone of Voice",
                      link: "/dashboard/settings/tone-of-voice",
                    },
                  ]}
                  isOpen={!desktopDisclosure.isOpen}
                /> */}
              </VStack>
            </Box>
          </Box>

          <Flex
            align={"center"}
            justify={
              desktopDisclosure?.isOpen ? "space-around" : "space-between"
            }
            mb={5}
            mx={"10px"}
            px="10px"
            py={desktopDisclosure?.isOpen && "5px"}
            bg="#363636"
            border="0.5px solid #575757"
            rounded={"xl"}
            h={desktopDisclosure?.isOpen ? "105px" : "56px"}
            flexDir={desktopDisclosure?.isOpen ? "column" : "row"}
          >
            <HStack>
              <Menu>
                <MenuButton ml={1} as={Button} variant={"unstyled"}>
                  <Avatar size="sm" src={getImageUrl(user?.profile?.path)} />
                </MenuButton>
                <MenuList>
                  {[
                    {
                      name: "Profile",
                      action: () => navigate("/dashboard/profile"),
                    },
                    {
                      name: "Log Out",
                      action: () => dispatch(resetUser()),
                    },
                  ].map((item, index) => (
                    <MenuItem
                      fontSize={"14px"}
                      key={index}
                      onClick={item.action}
                    >
                      {item.name}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>

              <Box display={desktopDisclosure?.isOpen && "none"}>
                <Text
                  color={getColor(colorKeys.gray, colorMode)}
                  fontSize={"12px"}
                  lineHeight={"22px"}
                >
                  {user?.designation}
                </Text>
                <Text color={"#fff"} fontSize={"12px"} fontWeight={"700"}>
                  {`${user?.firstName} ${user?.lastName}`}
                </Text>
              </Box>
            </HStack>

            {desktopDisclosure?.isOpen ? <Divider /> : null}

            <IconButton
              size="sm"
              rounded="full"
              bg="#2C2A2A"
              icon={<Icon color="#FF2323" as={APP_ICONS.POWER} />}
              _hover={{ opacity: 0.8 }}
              _active={{ opacity: 0.8 }}
              onClick={onLogout}
            />
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
  return (
    <React.Fragment>
      <SidebarContent
        display={{
          base: "none",
          lg: "unset",
        }}
      />

      <Drawer
        isOpen={disclosure.isOpen}
        onClose={disclosure.onClose}
        placement="left"
      >
        <DrawerOverlay />
        <DrawerContent>
          <SidebarContent w="full" borderRight="none" />
        </DrawerContent>
      </Drawer>
    </React.Fragment>
  );
};

export default React.memo(Sider);
