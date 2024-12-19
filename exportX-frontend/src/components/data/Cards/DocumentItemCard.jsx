import {
  Flex,
  HStack,
  Icon,
  IconButton,
  Input,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import APP_ICONS from "../../../config/constants/icons";
import DropdownSelect from "../../controls/Dropdowns/DropdownSelect";
import { colorKeys, getColor } from "../../../config/constants/colors";
import {
  useDeleteDocument,
  useRenameDocument,
} from "../../../config/query/projectDocumentQuery";
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import API_CONSTANTS from "../../../config/constants/api";
import { useUserRole } from "../../../hooks";

const DocumentItemCard = ({ title, documentId, isNewDocument }) => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const { colorMode } = useColorMode();
  const inputRef = useRef();
  const [isEdit, setIsEdit] = useState(false);
  const renameDocument = useRenameDocument();
  const deleteDocument = useDeleteDocument();
  const { isInternal } = useUserRole();

  const onDoneRename = () => {
    setIsEdit(false);
    renameDocument
      .mutateAsync({
        projectId: id,
        documentId,
        body: { newName: inputRef.current?.value },
      })
      .then(() => {
        console.log("renamed");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onRename = () => {
    setIsEdit(!isEdit);
    if (isEdit) {
      inputRef.current.blur();
    }
  };

  const onDelete = () => {
    deleteDocument
      .mutateAsync({
        projectId: id,
        documentId,
      })
      .then(() => {
        queryClient.invalidateQueries([
          API_CONSTANTS.PROJECT_DISCUSSIONS.base.replace(":projectId", id),
        ]);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Flex
      h={"55px"}
      borderRadius={"5px"}
      border={"1px solid #ECECEC"}
      alignItems={"center"}
      padding={"15px 20px 15px 20px"}
    >
      <Flex align="center" justify="space-between" w="100%">
        <HStack>
          <Flex
            justify={"center"}
            align="center"
            border="0.5px solid #c9c9c9"
            h="30px"
            w="30px"
            rounded={"full"}
          >
            <Icon color="#F84516" variant="Bold" as={APP_ICONS.FOLDER} />
          </Flex>
          <Input
            isReadOnly={!isEdit}
            ref={inputRef}
            border={isEdit ? "1px solid blue" : "none"}
            variant="unstyled"
            defaultValue={title}
            fontSize={isEdit ? "14px" : "12px"}
            color={getColor(colorKeys.whiteSmoke, colorMode)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onDoneRename();
              }
            }}
          />
        </HStack>
        {isInternal &&
          (isEdit ? (
            <IconButton
              size="xs"
              onClick={onDoneRename}
              icon={<Icon as={APP_ICONS.CHECK} />}
            />
          ) : isNewDocument ? (
            ""
          ) : (
            <DropdownSelect
              options={[
                {
                  id: 1,
                  label: "Rename",
                  onClick: onRename,
                },
                {
                  id: 2,
                  label: "Delete",
                  onClick: onDelete,
                },
              ]}
              buttonProps={{
                as: IconButton,
                w: "40px",
                h: "40px",
                variant: "outline",
                icon: (
                  <Icon
                    boxSize={4}
                    color={getColor(colorKeys.gray, colorMode)}
                    as={APP_ICONS.MORE_OPTIONS}
                  />
                ),
              }}
              hideIcon={true}
            />
          ))}
      </Flex>
    </Flex>
  );
};

export default DocumentItemCard;
