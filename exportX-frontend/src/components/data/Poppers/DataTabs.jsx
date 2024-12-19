import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";

const DataTabs = ({
  data,
  tabsProps,
  tabListProps,
  tabProps,
  tabPanelsProps,
  tabPanelProps,
  tabExtention,
}) => {
  return (
    <Tabs
      isLazy={true}
      borderRadius={"10px"}
      border={"0.5px solid #e4e4e4"}
      {...tabsProps}
    >
      <TabList
        overflow={"hidden"}
        borderTopRadius={"10px"}
        bg="#A3A3A333"
        {...tabListProps}
      >
        {data?.map((tab, index) => (
          <Box>
            <Tab
              px="5"
              _selected={{
                bg: "linear-gradient(265.17deg, #000000 4.16%, #5B5B5B 91.35%), linear-gradient(0deg, #2C2C2C, #2C2C2C)",
                color: "#fff",
              }}
              key={index}
              fontSize={"14px"}
              {...tabProps}
              // paddingX={'70px'}
            >
              {tab.label}
            </Tab>
            {tabExtention}
          </Box>
        ))}
      </TabList>
      <TabPanels {...tabPanelsProps}>
        {data.map((tab, index) => (
          <TabPanel p={4} key={index} {...tabPanelProps}>
            {tab.content}
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
};

export default DataTabs;
