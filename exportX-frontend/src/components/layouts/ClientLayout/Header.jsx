import React, { useEffect } from "react";
import {
  Avatar,
  Flex,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorMode,
  Button,
  Text,
  HStack,
  Box,
  Divider,
} from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";
import { getColor, colorKeys } from "../../../config/constants/colors";
import APP_ICONS from "../../../config/constants/icons";
import { useSelector, useDispatch } from "react-redux";
import { resetUser } from "../../../config/redux/slices/userSlice";
import { getPageTitle, singularize } from "../../../config/utils/stringUtil";
import APP_IMAGES from "../../../config/constants/images";
import { toggleAppDir } from "../../../config/redux/slices/settingSlice";
import { APP_DIR } from "../../../config/constants/enums";
import { getImageUrl } from "../../../config/utils/fileUtil";
// import NetworkBar from '../NetworkBar'

const Header = ({ disclosure, desktopDisclosure }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user?.user);
  const appDir = useSelector((state) => state.setting?.appDir);
  const { pathname } = useLocation();
  const splitPath = pathname.split("/");
  const navigate = useNavigate();

  const { colorMode } = useColorMode();

  useEffect(() => {
    let title = splitPath[splitPath.length - 1];
    if (splitPath[splitPath.length - 1]?.length===24) {
      title = `${singularize(
        splitPath[splitPath.length - 2].replace("-", " ")
      )} Details`;
    }
    document.title = getPageTitle(title);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      flexDir={appDir === APP_DIR.RTL ? "row-reverse" : "row"}
      w="full"
      px="4"
      minH="70px"
      bg={getColor(colorKeys.layoutHeaderBackground, colorMode)}
      h="14"
      pos="sticky"
      top="0"
      zIndex={99}
      shadow={"sm"}
    >
      {/* mobile sider toggle button */}
      <IconButton
        aria-label="Menu"
        display={{
          base: "inline-flex",
          md: "none",
        }}
        onClick={disclosure.onOpen}
        icon={<Icon as={APP_ICONS.MENU} />}
        size="sm"
      />

      {/* back icon button */}
      <Flex align="center">
        <IconButton
          transitionDelay={"1s"}
          transition={"ease-in-out"}
          aria-label="Menu"
          display={{
            base: "none",
            md: "inline-flex",
          }}
          onClick={() => desktopDisclosure.onToggle()}
          icon={
            <Icon
              transform={
                appDir === APP_DIR.RTL ? "rotate(180deg)" : "rotate(0)"
              }
              as={
                desktopDisclosure.isOpen
                  ? APP_ICONS.ARROW_RIGHT
                  : APP_ICONS.ARROW_LEFT
              }
            />
          }
          size="sm"
          rounded="full"
          mr={5}
          color={getColor(colorKeys.primary, colorMode)}
          bg={getColor(colorKeys.dark, colorMode)}
          _hover={{
            opacity: 0.8,
          }}
        />
      </Flex>
      {/* <NetworkBar /> */}

      <HStack spacing={1} align={"center"}>
        <Button size="sm" onClick={() => dispatch(toggleAppDir())}>
          AR
        </Button>
        {/* <IconButton
          color="#e2e2e2"
          variant={"unstyled"}
          icon={<Icon mt="5px" boxSize={"22px"} as={APP_ICONS.SEARCH} />}
        /> */}
        <IconButton
          color="#e2e2e2"
          variant={"unstyled"}
          icon={
            <Icon
              mt="5px"
              boxSize={"22px"}
              variant="Bold"
              as={APP_ICONS.NOTIFICATION}
            />
          }
        />
        <Divider w="1px" h="25px" mr={3} orientation="vertical" />

        <Menu>
          <MenuButton ml={1} as={Button} variant={"unstyled"}>
            <Flex align="center">
              <Avatar
                w="30px"
                h="30px"
                name={`${user?.firstName} ${user?.lastName}`}
                src={getImageUrl(user?.profile?.path)}
                cursor="pointer"
                className="top-nav-avatar"
              />
              <Box ml="2" textAlign={"left"}>
                <Text
                  mt="4px"
                  lineHeight={"0.7"}
                  fontFamily={"Helvetica"}
                  fontWeight={"700"}
                  fontSize={"12px"}
                >
                  {`${user?.firstName} ${user?.lastName}`}
                </Text>
                <Text
                  fontFamily={"Source Sans Pro"}
                  fontSize={"8px"}
                  color={getColor(colorKeys.primary, colorMode)}
                >
                  {user?.designation}
                </Text>
              </Box>
            </Flex>
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
              <MenuItem fontSize={"14px"} key={index} onClick={item.action}>
                {item.name}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </HStack>
    </Flex>
  );
};

export default React.memo(Header);
