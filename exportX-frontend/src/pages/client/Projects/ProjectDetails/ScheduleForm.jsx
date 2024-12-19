import React from "react";
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
import { useForm } from "react-hook-form";
import FormDateInput from "../../../../components/forms/FormDateInput";
import moment from "moment";
import { useSchedule } from "../../../../config/query/projectContentPlannerQuery";
import { useParams } from "react-router-dom";

const ScheduleForm = ({ disclosure, data }) => {
  const { id } = useParams();
  const { errors, control, handleSubmit } = useForm();
  const scheduleQuery = useSchedule();
  const onSubmit = (values) => {

    let body = {
      scheduleDate: moment(values?.scheduleDate).format("DD-MM-YYYY"),
    };

    scheduleQuery
      .mutateAsync({
        projectId: id,
        creativeId: data?.planId,
        imageId: data?.itemId,
        body,
      })
      .then(() => {
        disclosure?.onClose();
      })
      .catch((error) => console.warn(error));
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
        <ModalHeader>Schedule</ModalHeader>
        <ModalBody>
          <VStack
            rounded="md"
            as="form"
            onSubmit={handleSubmit(onSubmit)}
            align={"stretch"}
          >
            <FormDateInput
              label={"Schedule Date"}
              control={control}
              errors={errors}
              id="scheduleDate"
              required={true}
              hideLabel={false}
              placeholder={"Schedule Date"}
              minDate={
                new Date(moment().subtract(1, "day").format("YYYY-MM-DD"))
              }
              rules={{
                validate: {
                  minAge: (value) => {
                    if (
                      value &&
                      moment().subtract(1, "day").diff(value, "days") > 0
                    ) {
                      return "Schedule date should be greater than today";
                    }
                  },
                },
              }}
            />

            <HStack pb={2}>
              <Button w="full" onClick={disclosure?.onClose}>
                Cancel
              </Button>
              <Button isLoading={scheduleQuery.isPending} type="submit" w="full" bg={"#2F2F2F"} color="#ff5017">
                Save
              </Button>
            </HStack>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ScheduleForm;
