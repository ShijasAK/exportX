import { Avatar, AvatarBadge, Box, Flex, Icon, Text } from "@chakra-ui/react";
import React from "react";
import APP_ICONS from "../../../config/constants/icons";

const ActivityFeedCard = () => {
  return (
    <Box>
      <Flex mt={3} ml={4}>
        <Flex
          alignItems={"center"}
          justifyContent={"center"}
          rounded={"full"}
          h={"25px"}
          w={"25px"}
          bgColor={"#E0FFD8"}
        >
          <Icon color={"#14B307"} as={APP_ICONS.CHECK} w="10px" h="10px" />
        </Flex>
        <Flex ml={3} h={"30px"} w={"335px"}>
          <Box>
            <Avatar
              // src={image}
              w="26px"
              h="26px"
              border={"0.5px solid #BEBEBE"}
            >
              {/* {isWork && ( */}
              <AvatarBadge
                border={"none"}
                w="14px"
                h="14px"
                bg="#FF5017"
                // transform={"translate(25%, -270%)"}
                children={
                  <Icon
                    w="100%"
                    h="8px"
                    // mb="2px"
                    variant="Bold"
                    as={APP_ICONS.CLIENTS}
                  />
                }
              />
              {/* )} */}
            </Avatar>
          </Box>
          <Flex ml={2} w={"290px"} justifyContent={"space-between"}>
            <Box>
              <Text textColor={"#353535"} fontSize={"12px"} fontWeight={700}>
                Ester Howard
              </Text>
              <Text fontSize={"12px"}>
                In <span style={{ color: "orange" }}>Adidas Campaign</span>
              </Text>
            </Box>
            <Box textColor={"#C8C8C8"} fontSize={"10px"}>
              11 AM
            </Box>
          </Flex>
        </Flex>
      </Flex>
      <Box mt={2} ml={"60px"} fontSize={"12px"}>
        {" "}
        <span style={{ color: "lightgreen" }}>Approved</span> the social media
        content for quarter 1{" "}
      </Box>
    </Box>
  );
};

export default ActivityFeedCard;
