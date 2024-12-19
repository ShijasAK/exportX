import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";
import MinusIcon from "../../Icons/MinusIcon";
// import {minus} from '../../../assets/icons/minus';


const DataAccordian = ({ data }) => {
  return (
    <Accordion defaultIndex={[0]} allowMultiple>
      {data?.map((item, index) => (
        <AccordionItem
          mt={index!==0&&5}
          borderTopWidth={0}
          borderBottomWidth={"0 !important"}
          key={index}
        >
          {({ isExpanded }) => (
            <>
              <h2>
                <AccordionButton
                  borderTop={"0"}
                  bg="#E2EEFF"
                  h="50px"
                  borderBottomRadius={!isExpanded && "xl"}
                  borderTopRadius={"xl"}
                >
                  <Box
                    fontSize="15px"
                    color={"#1758FF"}
                    as="span"
                    flex="1"
                    textAlign="left"
                  >
                    {item.label}
                  </Box>
                  {isExpanded ? <Box mt={3}><MinusIcon  /></Box> : <AccordionIcon />}
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>{item.content}</AccordionPanel>
            </>
          )}
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default DataAccordian;
