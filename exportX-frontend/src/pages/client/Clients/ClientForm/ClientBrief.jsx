import React from "react";
import { SimpleGrid, VStack } from "@chakra-ui/react";
import FormSelect from "../../../../components/forms/FormSelect";
import { makeSelectList } from "../../../../config/utils/selectListUtil";
import FormInput from "../../../../components/forms/FormInput";
import { getStringRules } from "../../../../config/utils/validationUtil";
import FormTextarea from "../../../../components/forms/FormTextarea";
import UsersIcon from "../../../../components/Icons/UsersIcon";
import PencilIcon from "../../../../components/Icons/PencilIcon";
import ScreenIcon from "../../../../components/Icons/ScreenIcon";
import { useAdGoals } from "../../../../config/query/adGoalsQuery";
import { useToneOfVoice } from "../../../../config/query/toneOfVoiceQuery";

const ClientBrief = ({ control, errors, setValue, watch }) => {
  const toneOfVoices = useToneOfVoice();
  const adGoals = useAdGoals();

  return (
    <VStack align="stretch" spacing={5}>
      <SimpleGrid spacing={5} columns={{ base: 1, md: 2 }}>
        <FormSelect
          id="adGoals"
          label="Ad Goals"
          placeholder={"Ad Goals"}
          hideLabel={false}
          errors={errors}
          control={control}
          options={makeSelectList(adGoals.data?.data?.adGoals, "_id", "adGoal")}
        />
        <FormSelect
          id="toneOfVoice"
          label="Tone of Voice"
          placeholder={"Tone of voice"}
          hideLabel={false}
          errors={errors}
          control={control}
          options={makeSelectList(
            toneOfVoices.data?.data?.toneOfVoices,
            "_id",
            "toneOfVoice"
          )}
        />
      </SimpleGrid>

      <FormInput
        id={"targetAudience"}
        label={"Target Audience"}
        placeholder="Target Audience"
        errors={errors}
        control={control}
        inputProps={{ fontSize: "15px" }}
        hideLabel={false}
        rules={getStringRules()}
        rightElement={<UsersIcon fontSize={"30px"} mt={"11px"} />}
      />

      <FormInput
        id={"productServiceName"}
        label={"Product / Service Name"}
        placeholder="Product / Service Name"
        errors={errors}
        control={control}
        inputProps={{ fontSize: "15px" }}
        hideLabel={false}
        rules={getStringRules()}
        rightElement={<ScreenIcon fontSize={"30px"} mt={"9px"} />}
      />

      <FormTextarea
        id={"briefDescription"}
        label="Brand Description"
        hideLabel={false}
        placeholder="Write brand description"
        errors={errors}
        control={control}
        rightElement={<PencilIcon fontSize={"30px"} mt={"11px"} />}
      />
    </VStack>
  );
};

export default ClientBrief;
