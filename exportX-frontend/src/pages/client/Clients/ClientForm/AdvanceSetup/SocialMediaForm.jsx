import {
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import FormInput from "../../../../../components/forms/FormInput";

const SocialMediaForm = ({ disclosure, socialMedias, setValue }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (values) => {
    const clientSocialMedia = [...socialMedias, values];
    setValue("clientSocialMedia", clientSocialMedia);
    disclosure?.onClose();
  };
  return (
    <Modal
      isCentered={true}
      isOpen={disclosure?.isOpen}
      onClose={disclosure?.onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader>Add Social Media</ModalHeader>
        <ModalBody>
          <VStack
            rounded="md"
            as="form"
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleSubmit(onSubmit)();
            }}
            spacing={5}
            align={"stretch"}
          >
            <FormInput
              control={control}
              id="media"
              hideLabel={false}
              customError={"please enter your label."}
              label={"Label"}
              errors={errors}
              // control={control}
              placeholder={"Label"}
              required={true}
            />
            <FormInput
              control={control}
              id="mediaToken"
              hideLabel={false}
              label={"Username"}
              required={true}
              placeholder={"Username"}
              customError={"please enter your username."}
              errors={errors}
            />
            <HStack>
              <Button w="full" onClick={disclosure?.onClose}>
                Cancel
              </Button>
              <Button type="submit" w="full" bg={"#2F2F2F"} color="#ff5017">
                Add
              </Button>
            </HStack>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SocialMediaForm;
