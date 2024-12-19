import {
  Button,
  Card,
  CardBody,
  HStack,
  Heading,
  VStack,
  useColorMode,
} from "@chakra-ui/react";
import React, { useState, useRef } from "react";
import TableHeaderOptions from "../../../../../components/data/Table/TableHeaderOptions";
import { colorKeys, getColor } from "../../../../../config/constants/colors";
import { useForm } from "react-hook-form";
import Steps from "../../../../../components/controls/Steps";
import OutputSet from "./OutputSet";
import MoreAbout from "./MoreAbout";
import ContentIdeasList from "./ContentIdeas";
import { useNavigate, useParams } from "react-router-dom";

const SocialMediaForms = () => {
  //if id is avaialble means we are in project details page
  const { id } = useParams(); //projectId
  const navigate = useNavigate();
  const { colorMode } = useColorMode();
  const [activeIndex, setActiveIndex] = useState(1);
  const {
    control,
    formState: { errors },
  } = useForm();

  const stepsArray = useRef([]);

  const onNext = () => {
    if (activeIndex === stepsArray.current.length - 1) {
      navigate(`/dashboard/projects/${id}/social-media-planner/finalize`);
      return;
    }
    setActiveIndex(activeIndex + 1);
  };

  const onPrev = () => {
    if (activeIndex === 0) return;
    setActiveIndex(activeIndex - 1);
  };

  stepsArray.current = [
    {
      title: "Project Details",
      elemnt: <></>,
    },
    {
      title: "Output Set",
      element: <OutputSet />,
    },
    {
      title: "More About",
      element: <MoreAbout onNext={onNext} onPrev={onPrev} />,
    },
    {
      title: "Content Ideas",
      element: <ContentIdeasList onNext={onNext} onPrev={onPrev} />,
    },
  ];

  return (
    <VStack align={"stretch"} spacing={6}>
      <TableHeaderOptions
        title={"Tools"}
        subtitle={"Tools / Single Social Media Post Generator"}
      />
      <Heading
        as="h3"
        size="md"
        color={getColor(colorKeys.extremeDimText, colorMode)}
      >
        Single Social Media Post Generator
      </Heading>

      <Card>
        <CardBody>
          <Steps
            activeIndex={activeIndex}
            stepsArray={stepsArray.current.map((item) => item.title)}
          />
        </CardBody>
      </Card>

      {stepsArray.current[activeIndex].element}

      {(activeIndex !== 2 && activeIndex !== 3) && (
        <HStack justify={"flex-end"} mt={5}>
          <Button
            fontSize="14px"
            fontWeight={"400"}
            display={"flex"}
            alignItems={"center"}
            rounded={"full"}
            minW={"120px"}
            bg={getColor(colorKeys.lightGray, colorMode)}
            color={"#BFBFBF"}
            onClick={onPrev}
          >
            Go Back
          </Button>

          <Button
            fontSize="14px"
            fontWeight={"400"}
            display={"flex"}
            alignItems={"center"}
            rounded={"full"}
            minW={"120px"}
            bg={getColor(colorKeys.secondary, colorMode)}
            color={getColor(colorKeys.primary, colorMode)}
            _hover={{ opacity: 0.8 }}
            onClick={onNext}
          >
            Continue
          </Button>
        </HStack>
      )}
    </VStack>
  );
};

export default SocialMediaForms;
