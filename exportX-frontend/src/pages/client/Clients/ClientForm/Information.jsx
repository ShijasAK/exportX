import { Avatar, Box, HStack, InputLeftAddon, Select, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import React from "react";
import FormInput from "../../../../components/forms/FormInput";
import { getStringRules } from "../../../../config/utils/validationUtil";
import {
  EMAIL_REGEX,
  INPUT_REGEX,
  PHONE_REGEX,
} from "../../../../config/constants/regex";
import FormSelect from "../../../../components/forms/FormSelect";
import { makeSelectList } from "../../../../config/utils/selectListUtil";
import ProfileIcon from "../../../../components/Icons/ProfileIcon";
import MobileIcon from "../../../../components/Icons/MobileIcon";
import MobileGroupIcon from "../../../../components/Icons/MobileGroupIcon";
import SendIcon from "../../../../components/Icons/SendIcon";
import { countryList } from "../../../../config/constants/data";
import { getImageUrl } from "../../../../config/utils/fileUtil";
import FormFileUpload from "../../../../components/forms/FormFileUpload";
import { FILE_TYPES } from "../../../../config/constants/defaults";
import { COUNTRIES } from "../../../../config/constants/countries";

const Information = ({ errors, control, watch, setValue,id }) => {
  return (
    <VStack align={"stretch"} spacing={2}>
      <HStack spacing={3} align={"start"} mt={5}>
        <FormFileUpload
          id={"clientImage"}
          onChange={({ name, file }) => setValue(name, file)}
          label={"Logo"}
          component={
            <Avatar
              src={
                watch("clientImage")
                  ? URL.createObjectURL(watch("clientImage"))
                  : getImageUrl(watch("clientImage"))
              }
              size="xl"
            />
          }
          componentProps={{
            variant: "unstyled",
          }}
          fileType={FILE_TYPES.IMAGE}
        />
       
        <SimpleGrid w="full" spacing={3} columns={{ base: 1, md: 2 }}>
          <FormInput
            id={"firstName"}
            label={"First Name"}
            placeholder="First Name"
            required={true}
            errors={errors}
            control={control}
            inputProps={{ fontSize: "15px" }}
            hideLabel={false}
            rules={getStringRules()}
            rightElement={<ProfileIcon fontSize={"23px"} mt={1} />}
          />

          <FormInput
            id={"lastName"}
            label={"Last Name"}
            placeholder="Last Name"
            required={true}
            errors={errors}
            control={control}
            inputProps={{ fontSize: "15px" }}
            hideLabel={false}
            rules={getStringRules()}
            rightElement={<ProfileIcon fontSize={"23px"} mt={1} />}
          />

          <FormInput
            id={"primaryContactNo"}
            label={"Primary Contact Number"}
            placeholder="Primary Contact Number"
            required={true}
            errors={errors}
            control={control}
            inputProps={{ fontSize: "15px" }}
            hideLabel={false}
            rightElement={<MobileIcon fontSize={"23px"} mt={1} />}
            leftAddon={
              <InputLeftAddon p="0">
                <Select
                  onChange={(e)=> setValue("primaryIsdCode", e.target.value)}
                  value={watch("primaryIsdCode")}
                >
                  {COUNTRIES.map((country) => {
                    return (
                      <option value={country.prefix}>
                        {country.prefix}
                      </option>
                    );
                  })}
                </Select>
              </InputLeftAddon>
            }
          />

          <FormInput
            id={"secContactNo"}
            label={"Secondary Contact Number"}
            placeholder="Secondary Contact Number"
            errors={errors}
            control={control}
            inputProps={{ fontSize: "15px" }}
            hideLabel={false}
            rightElement={<MobileGroupIcon fontSize={"23px"} mt={1} />}
            leftAddon={
              <InputLeftAddon p="0">
                <Select
                  onChange={(e)=> setValue("secIsdCode", e.target.value)}
                  value={watch("secIsdCode")}
                >
                  {COUNTRIES.map((country) => {
                    return (
                      <option value={country.prefix}>
                        {country.prefix}
                      </option>
                    );
                  })}
                </Select>
              </InputLeftAddon>
            }
          />

          <FormInput
            id={"email"}
            label={"Email"}
            placeholder="Email Address"
            required={true}
            errors={errors}
            control={control}
            inputProps={{ fontSize: "15px", isDisabled: !!id }}
            hideLabel={false}
            rules={getStringRules({
              pattern: {
                value: EMAIL_REGEX,
                message: "Invalid email address",
              },
            })}
            rightElement={<SendIcon fontSize={"23px"} mt={1} />}
          />

          <FormSelect
            id="country"
            label="Country"
            placeholder={"Country / Region"}
            required={false}
            hideLabel={false}
            errors={errors}
            control={control}
            options={countryList}
            menuStyles={{ position: "relative", zIndex: 9999 }}
          />
        </SimpleGrid>
      </HStack>
    </VStack>
  );
};

export default Information;
