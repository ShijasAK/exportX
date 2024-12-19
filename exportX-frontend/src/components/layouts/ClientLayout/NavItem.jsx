import { Box, Flex, Icon, Text, useColorMode } from "@chakra-ui/react";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { getColor, colorKeys } from "../../../config/constants/colors";
import { useUserRole } from "../../../hooks";

const NavItem = ({
  icon,
  link = "#",
  title,
  subsider,
  isSubsiderOpen,
  isOpen,
  ...rest
}) => {
  const { pathname } = useLocation();
  const { isExternal } = useUserRole();
  const indexLocation = isExternal ? 3 : 2;
  const isActive =
    pathname.split("/")[indexLocation] === link.split("/")[indexLocation];
  const { colorMode } = useColorMode();

  return (
    <Flex
      flexDir={"column"}
      align={!isOpen && "center"}
      justify={"center"}
      w="calc(100% - 20px)"
      cursor="pointer"
      bg={
        isActive
          ? "linear-gradient(0deg, rgba(245, 239, 235, 0.16), rgba(245, 239, 235, 0.16)), linear-gradient(0deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1))"
          : "transparent"
      }
      fontSize={"13px"}
      transition=".15s ease"
      rounded={"lg"}
      {...rest}
      // h={'50px'}
    >
      <Flex
        rounded={"lg"}
        p={{
          base: "12px 15px",
          md: isOpen ? "12px 15px" : "24px 15px",
        }}
        _hover={{
          color: "white",
          bg: "linear-gradient(0deg, rgba(245, 239, 235, 0.16), rgba(245, 239, 235, 0.16)), linear-gradient(0deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1))",
        }}
        role="group"
        as={Link}
        to={link}
      >
        {icon && (
          <Icon
            className="nav-icon"
            boxSize="5"
            _groupHover={{
              color: "white",
            }}
            color={
              isActive ? getColor(colorKeys.alwaysWhite, colorMode) : "#707070"
            }
            as={icon}
          />
        )}
        <Text
          ml={2}
          display={{ base: "block", md: isOpen ? "block" : "none" }}
          _groupHover={{ color: getColor(colorKeys.primary, colorMode) }}
          color={
            isActive
              ? getColor(colorKeys.primary, colorMode)
              : getColor(colorKeys.alwaysWhite, colorMode)
          }
        >
          {title}
        </Text>
      </Flex>
      <Flex flexDir={"column"}>
        {isSubsiderOpen &&
          subsider?.map((item, index) => (
            <Box
              key={index}
              fontSize="13px"
              rounded="lg"
              ml="5"
              mt="2"
              as={Link}
              w="calc(100% - 40px)"
              p={1}
              to={item.link}
              color={
                pathname.includes(item.link)
                  ? getColor(colorKeys.primary, colorMode)
                  : getColor(colorKeys.alwaysWhite, colorMode)
              }
              _hover={{
                bg: "rgba(255, 255, 255, 0.1)",
              }}
            >
              {item.title}
            </Box>
          ))}
      </Flex>
    </Flex>
  );
};

export default React.memo(NavItem);
