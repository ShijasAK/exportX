import {
  Avatar,
  Box,
  SimpleGrid,
  Text,
  VStack,
  Wrap,
  WrapItem,
  useColorMode,
} from "@chakra-ui/react";
import React from "react";
import { useParams } from "react-router-dom";
import DocumentItemCard from "../../../../components/data/Cards/DocumentItemCard";
import { colorKeys, getColor } from "../../../../config/constants/colors";
import { getImageUrl } from "../../../../config/utils/fileUtil";

const DocumentManagementClient = ({ data }) => {
  const { colorMode } = useColorMode();

  const { id } = useParams();

  return (
    <Box padding={"15px"} gap={"20px"}>
      <SimpleGrid>
        {!data?.documents?.length && (
          <Box mt={"10px"}>
            <Text align={"center"}> No Data Found </Text>
          </Box>
        )}
      </SimpleGrid>
      <SimpleGrid columns={2} gap={5} mt={5}>
        {data?.documents?.map((item, index) => (
          <DocumentItemCard
            documentId={item?._id}
            key={index}
            title={item?.name}
            isNewDocument={false}
          />
        ))}
      </SimpleGrid>
      <VStack align="stretch" spacing={5} mt={5}>
        <Text fontSize={"15px"} color={getColor(colorKeys.dark, colorMode)}>
          Image Gallery
        </Text>

        <Wrap columns={5} spacing={5}>
          {data?.images?.map((item) => (
            <WrapItem>
              <Avatar
                key={item.id}
                w="154px"
                h="150px"
                borderRadius={"10px"}
                role="group"
                src={getImageUrl(item?.path)}
              >
                {/* <AvatarBadge
                  placement="top-end"
                  boxSize="1.6em"
                  bg="red"
                  border={"none"}
                  display={"none"}
                  cursor={"pointer"}
                  // onClick={() => handleDeleteImage(item._id)}
                  _groupHover={{ display: "flex" }}
                >
                  <Icon mb={"1px"} ml="1px" boxSize={4} as={APP_ICONS.BIN} />
                </AvatarBadge> */}
              </Avatar>
            </WrapItem>
          ))}
        </Wrap>
        {!data?.images?.length && <Text align={"center"}> No Data Found </Text>}
      </VStack>
    </Box>
  );
};

export default DocumentManagementClient;
