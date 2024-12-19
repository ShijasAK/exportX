import React from "react";
import DataTabs from "../../../../../components/data/Poppers/DataTabs";
import SocialMediaAccounts from "./SocialMediaAccounts";
import BrandKit from "./BrandKit";
import Templates from "./Templates";
import { colorKeys, getColor } from "../../../../../config/constants/colors";
import { useColorMode } from "@chakra-ui/react";

const AdvanceSetup = ({ control, errors, setValue, watch }) => {
  const { colorMode } = useColorMode();
  const tabData = [
    {
      label: "Social Media Accounts",
      content: (
        <SocialMediaAccounts
          control={control}
          errors={errors}
          setValue={setValue}
          watch={watch}
        />
      ),
    },
    {
      label: "Brand Kit",
      content: (
        <BrandKit
          watch={watch}
          setValue={setValue}
          control={control}
          errors={errors}
        />
      ),
    },
    {
      label: "Templates",
      content: (
        <Templates
          control={control}
          errors={errors}
          watch={watch}
          setValue={setValue}
        />
      ),
    },
  ];
  return (
    <DataTabs
      data={tabData}
      tabsProps={{ border: "#fff", borderRadius: 0 }}
      tabListProps={{ bg: "#fff" }}
      tabProps={{
        color: "#272727",
        borderBottom: "4px solid",
        borderBottomColor: "#E8E8E8",
        _selected: {
          bg: "#fff",
          borderBottomColor: getColor(colorKeys.primary, colorMode),
          color: getColor(colorKeys.primary, colorMode),
        },
      }}
    />
  );
};

export default AdvanceSetup;
