import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  IconButton,
  SimpleGrid,
  Text,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { colorKeys, getColor } from "../../../../../config/constants/colors";
import APP_ICONS from "../../../../../config/constants/icons";
import SocialMediaForm from "./SocialMediaForm";
import SocialMediaCard from "../../../../../components/data/Cards/SocialMediaCard";

const SocialMediaAccounts = ({ control, errors, watch, setValue }) => {
  const { colorMode } = useColorMode();
  const addDisclosure = useDisclosure();

  const accounts = watch("clientSocialMedia") || [];

  return (
    <Box>
      <Heading
        fontSize={"14px"}
        color={getColor(colorKeys.whiteSmoke, colorMode)}
        as={"h3"}
      >
        Social Media Accounts
      </Heading>

      <SimpleGrid mt={5} columns={{ base: 1, md: 2 }} spacing={5}>
        <Button
          variant={"outline"}
          color={"#828282"}
          fontSize={"14px"}
          h="50px"
          borderColor={"#ececec"}
          borderStyle={"dashed"}
          leftIcon={
            <Icon
              w={"30px"}
              h="30px"
              color={getColor(colorKeys.primary, colorMode)}
              as={APP_ICONS.ADD}
            />
          }
          onClick={addDisclosure.onToggle}
        >
          Add Account
        </Button>

        {accounts.map((account, index) => (
          <SocialMediaCard account={account} key={index} />
        ))}
      </SimpleGrid>
      <SocialMediaForm
        setValue={setValue}
        disclosure={addDisclosure}
        socialMedias={accounts}
      />
    </Box>
  );
};

export default SocialMediaAccounts;
