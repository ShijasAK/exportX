import React, { useRef } from "react";
import {
  Input,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  Icon,
  Button,
  createStandaloneToast,
} from "@chakra-ui/react";
import { FiFile } from "react-icons/fi";
import {
  DEFAULT_MAX_UPLOAD_SIZE,
  MEGABYTE,
  ALLOWED_FILE_TYPES,
} from "../../config/constants/defaults";
import { getFileExtention } from "../../config/utils/fileUtil";
const { toast } = createStandaloneToast();

export const FormFileUpload = ({
  id,
  label,
  value,
  placeholder,
  acceptedFileTypes = "",
  isRequired = false,
  onChange,
  component,
  componentProps,
  fileType,
  containerProps,
  isDisabled,
  multiple,
}) => {
  const inputRef = useRef();
  if (fileType) {
    acceptedFileTypes = ALLOWED_FILE_TYPES[fileType].join(", ");
  }
  return (
    <>
      <input
        type="file"
        multiple={multiple}
        onChange={(e) => {
          if (
            acceptedFileTypes &&
            !acceptedFileTypes.includes(getFileExtention(e.target.files[0]))
          ) {
            toast({
              id: `File type not allowed. Allowed file types are ${acceptedFileTypes}`,
              title: "Error!",
              description: `File type not allowed. Allowed file types are ${acceptedFileTypes}`,
              status: "error",
              duration: 9000,
              isClosable: true,
            });
            return;
          }
          if (e.target.files[0].size > DEFAULT_MAX_UPLOAD_SIZE * MEGABYTE) {
            toast({
              id: `File size should be less than ${DEFAULT_MAX_UPLOAD_SIZE}MB`,
              title: "Error!",
              description: `File size should be less than ${DEFAULT_MAX_UPLOAD_SIZE}MB`,
              status: "error",
              duration: 9000,
              isClosable: true,
            });
            return;
          }
          onChange({
            name: id,
            file: multiple ? e.target.files : e.target.files[0],
          });
        }}
        accept={acceptedFileTypes}
        name={id}
        ref={inputRef}
        style={{ display: "none" }}
        disabled={isDisabled}
      />
      {component ? (
        <Button
          _hover={{ bg: "transparent !imporatant" }}
          w="fit-content"
          p="0"
          h="fit-content"
          isDisabled={isDisabled}
          onClick={() => inputRef.current.click()}
          onDrop={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (
              acceptedFileTypes &&
              !acceptedFileTypes.includes(
                getFileExtention(e.dataTransfer.files[0])
              )
            ) {
              toast({
                id: `File type not allowed. Allowed file types are ${acceptedFileTypes}`,
                title: "Error!",
                description: `File type not allowed. Allowed file types are ${acceptedFileTypes}`,
                status: "error",
                duration: 9000,
                isClosable: true,
              });
              return;
            }
            if (
              e.dataTransfer.files[0].size >
              DEFAULT_MAX_UPLOAD_SIZE * MEGABYTE
            ) {
              toast({
                id: `File size should be less than ${DEFAULT_MAX_UPLOAD_SIZE}MB`,
                title: "Error!",
                description: `File size should be less than ${DEFAULT_MAX_UPLOAD_SIZE}MB`,
                status: "error",
                duration: 9000,
                isClosable: true,
              });
              return;
            }
            onChange({ name: id, file: e.dataTransfer.files[0] });
          }}
          {...componentProps}
        >
          {component}
        </Button>
      ) : (
        <FormControl isRequired={isRequired} {...containerProps}>
          {label && <FormLabel htmlFor="writeUpFile">{label}</FormLabel>}
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <Icon as={FiFile} />
            </InputLeftElement>

            <Input
              cursor={"pointer"}
              placeholder={placeholder || "Your file ..."}
              onClick={() => inputRef.current.click()}
              readOnly={true}
              value={(value && value.id) || "dsadsadsa"}
              accept={acceptedFileTypes || "*"}
            />
          </InputGroup>
        </FormControl>
      )}
    </>
  );
};

export default FormFileUpload;
