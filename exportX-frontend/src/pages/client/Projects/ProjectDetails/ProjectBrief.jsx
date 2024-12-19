import { SimpleGrid, VStack } from "@chakra-ui/react";
import React from "react";
import { makeSelectList } from "../../../../config/utils/selectListUtil";
import FormSelect from "../../../../components/forms/FormSelect";
import FormTextarea from "../../../../components/forms/FormTextarea";
import FormInput from "../../../../components/forms/FormInput";
import { getStringRules } from "../../../../config/utils/validationUtil";
import UsersIcon from "../../../../components/Icons/UsersIcon";
import ScreenIcon from "../../../../components/Icons/ScreenIcon";
import PencilIcon from "../../../../components/Icons/PencilIcon";
import { useAdGoals } from "../../../../config/query/adGoalsQuery";
import { useToneOfVoice } from "../../../../config/query/toneOfVoiceQuery";

const ProjectBrief = ({ control, errors, data }) => {
  const adGoals = useAdGoals();
  const toneOfVoices = useToneOfVoice();

  return (
    <VStack align={"stretch"} spacing={5}>
      <SimpleGrid spacing={5} columns={{ base: 1, md: 2 }}>
        <FormSelect
          id="projectBrief.adGoals"
          label="Ad Goals"
          placeholder={"Ad Goals"}
          required={false}
          hideLabel={false}
          errors={errors}
          control={control}
          options={makeSelectList(adGoals.data?.data?.adGoals, "_id", "adGoal")}
        />

        <FormSelect
          id="projectBrief.toneOfVoice"
          label="Tone of Voice"
          placeholder={"Tone of voice"}
          required={false}
          hideLabel={false}
          errors={errors}
          control={control}
          options={makeSelectList(toneOfVoices.data?.data?.toneOfVoices, "_id", "toneOfVoice")}
        />
      </SimpleGrid>

      <FormInput
        hideLabel={false}
        id={"projectBrief.targetAudience"}
        label={"Target Audience"}
        placeholder="Target Audience"
        required={true}
        errors={errors}
        control={control}
        inputProps={{ fontSize: "15px" }}
        rules={getStringRules()}
        rightElement={<UsersIcon fontSize={"23px"} mt={2} />}
      />

      <FormInput
        hideLabel={false}
        id={"projectBrief.productServiceName"}
        label={"Product / Service Name"}
        placeholder="Product / Service Name"
        required={true}
        errors={errors}
        control={control}
        inputProps={{ fontSize: "15px" }}
        rules={getStringRules()}
        rightElement={<ScreenIcon fontSize={"23px"} mt={1} />}
      />

      <FormTextarea
        id={"projectBrief.briefDescription"}
        label="Brand Description"
        hideLabel={false}
        placeholder="Brand Description"
        errors={errors}
        control={control}
        rightElement={<PencilIcon fontSize={"23px"} mt={1} />}
      />
    </VStack>
  );
};

export default ProjectBrief;
