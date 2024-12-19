import React, { useEffect, useMemo, useState } from "react";
import TableHeaderOptions from "../../../components/data/Table/TableHeaderOptions";
import { Box, Button, Flex, HStack, Td, Tr } from "@chakra-ui/react";
import DataAccordian from "../../../components/data/Poppers/DataAccordian";
import ProjectBrief from "../Projects/ProjectDetails/ProjectBrief";
import { useForm } from "react-hook-form";
import SocialMediaContentPlannerEnglishCard from "./SocialMediaContentPlannerEnglishCard";
import { useGetFinalData } from "../../../config/query/projectContentPlannerQuery";
import { Link, useParams } from "react-router-dom";
import { colorKeys, getColor } from "../../../config/constants/colors";
import NoResultsCard from "../../../components/data/Cards/NoResultCard";

const SocialMediaContentPlanner = () => {
  //if id is avaialble means we are in project details page
  const { id } = useParams(); //projectId
  const getFinalIdeas = useGetFinalData(id);
  const { isPending, isIdle } = getFinalIdeas;

  const [englishContent, setEnglishContent] = useState([]);
  const [arabicContent, setArabicContent] = useState([]);

  const getFinalIdeasRecords = () => {
    getFinalIdeas
      .mutateAsync()
      .then((res) => {
        setEnglishContent(res?.data?.englishContentPlans || []);
        setArabicContent(res?.data?.arabicContentPlans || []);
      })
      .catch((error) => console.warn(error));
  };

  useEffect(() => {
    getFinalIdeasRecords();
  }, []);

  const { isContentAvailable } = useMemo(() => {
    let isContentAvailable = true;
    if (
      !isIdle &&
      !isPending &&
      !englishContent.length &&
      !arabicContent.length
    ) {
      isContentAvailable = false;
    }

    return { isContentAvailable };
  }, [englishContent, arabicContent]);
  return (
    <Box>
      <TableHeaderOptions title={"Projects"} subtitle={""} />

      <TableHeaderOptions
        containerProps={{ my: 5 }}
        title={""}
        titleProps={{ color: "#9A9A9A", fontSize: "20px" }}
      />

      <Box fontSize={"20px"} fontWeight={700} textColor={"#9A9A9A"}>
        Social Media Content Planner
      </Box>

      <Box gap={5} mt={5} w="full">
        {!isContentAvailable && (
          <Box w="500px" mx="auto" my={10}>
            <NoResultsCard show={true} />
          </Box>
        )}

        <DataAccordian
          w={"full"}
          data={[
            ...(englishContent?.length
              ? [
                  {
                    label: "English",
                    content: (
                      <SocialMediaContentPlannerEnglishCard
                        data={englishContent}
                        getRecords={getFinalIdeasRecords}
                        language={"english"}
                      />
                    ),
                  },
                ]
              : []),
            ,
            ...(arabicContent?.length
              ? [
                  {
                    label: "Arabic",
                    content: (
                      <SocialMediaContentPlannerEnglishCard
                        data={arabicContent}
                        getRecords={getFinalIdeasRecords}
                        language={"arabic"}
                      />
                    ),
                  },
                ]
              : []),
            ,
          ]}
        />
      </Box>

      {isContentAvailable && !isIdle && (
        <HStack justify={"flex-end"} mt={5}>
          <Button
            fontSize="14px"
            fontWeight={"400"}
            display={"flex"}
            alignItems={"center"}
            rounded={"full"}
            minW={"120px"}
            bg={getColor(colorKeys.lightGray)}
            color={"#BFBFBF"}
            as={Link}
            to={`/dashboard/projects/${id}/social-media-planner`}
          >
            Go Back
          </Button>
        </HStack>
      )}
    </Box>
  );
};

export default SocialMediaContentPlanner;
