// import React from "react";
import {
    Avatar,
    AvatarGroup,
    Checkbox,
    Flex,
    Icon,
    IconButton,
    Text,
    useColorMode,
    Box,
    Image,
    Button,
  } from "@chakra-ui/react";
  // import { Box } from 'iconsax-react'
  import React, { useState } from "react";
import APP_ICONS from "../../../../config/constants/icons";
import { colorKeys, getColor } from "../../../../config/constants/colors";
import DropdownSelect from "../../../../components/controls/Dropdowns/DropdownSelect";
import Steps from "../../../../components/controls/Steps";
import HistoryCardSteps from "./HistoryCardSteps";
import APP_IMAGES from "../../../../config/constants/images";

const SocialMediaHistoryCard = ({title, description}) => {
  const [activeIndex, setActiveIndex] = useState(1);
  const { colorMode } = useColorMode();

  const filterRange = [
    {
      id: 1,
      label: "Edit",
    },
    {
      id: 2,
      label: "Delete",
    },
    {
      id: 3,
      label: "Submit for Approval",
    },
  ];

  const stepsArray = [
    {
      title: "Task Started",
    },
    {
      title: "Completed",
    },
    {
      title: "Apporaval",
    },
  ];
  return (
    <div>
      <Flex
      role="group"
        alignItems={"center"}
        mt={5}
        justifyContent={"space-between"}
        borderRadius={"4px"}
        // _hover={{
        //   bgColor: "#fff",
        //   border: "1px solid #90A2F8",
        //   borderRadius: "4px",
        // }}
        bgColor={"#FAFCFE"}
        h={"80px"}
        padding={"15px 20px 15px 20px"}
      >
        <Flex alignItems={"center"}>
          <Box mt={2}>
            <Checkbox colorScheme="green"></Checkbox>
          </Box>
          <Flex
            justify={"center"}
            align="center"
            border="0.5px solid #c9c9c9"
            h="50px"
            w="50px"
            // rounded={"full"}
            borderRadius={'4px'}
            bgColor={"rgb(242 242 242)"}
            ml={4}
          >
            <Image src={APP_IMAGES.BGIMAGE1} alt='Dan Abramov' />
          </Flex>
          <Flex
            flexDirection={"column"}
            justifyContent={"space-between"}
            ml={3}
            // mt={2}
            // alignItems={'center'}

          >
            <Text fontSize={"12px"} fontWeight={500} color={"#353535"}>
              {title}
            </Text>
           
              <Text color={"#828282"} fontSize={"10px"}>
                {description}
              </Text>
              
            
          </Flex>
        </Flex>
        
        <Flex alignItems={"center"} >
            <Box mr={5}>
                <Button display={'none'} _groupHover={{display:"block"}} bg={'#E2EEFF'} fontSize={'10px'} h={'25px'} borderRadius={'4px'} textColor={'#1758FF'}>Shedule Now</Button>
            </Box>
          <Box mr={3} mt={3}>
            <HistoryCardSteps
              activeIndex={activeIndex}
              stepsArray={stepsArray.map((item) => item.title)}
              dividerProps={{ w: "40px" }}
            //   hstackProps={{ spacing: "60px" }}
            //   textProps={{ fontSize: "10px" }}
              iconProps={{ w: "20px", h: "20px" }}
            />
          </Box>
          <Flex flexDirection={"column"} justifyContent={"space-between"}>
            <Flex justifyContent={"end"}>
              <DropdownSelect
                options={filterRange}
                buttonProps={{
                  as: IconButton,
                  w: "40px",
                  h: "40px",
                  variant: "unstyled",
                  display: "flex",
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
            </Flex>
            
          </Flex>
        </Flex>
      </Flex>
    </div>
  );
};

export default SocialMediaHistoryCard;
