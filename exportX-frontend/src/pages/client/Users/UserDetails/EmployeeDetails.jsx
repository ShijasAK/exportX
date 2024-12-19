import React from "react";
import DataDrawer from "../../../../components/data/Poppers/DataDrawer";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  Icon,
  IconButton,
  Image,
  Spinner,
  Text,
  VStack,
  useColorMode,
} from "@chakra-ui/react";
import { colorKeys, getColor } from "../../../../config/constants/colors";
import APP_ICONS from "../../../../config/constants/icons";
import APP_IMAGES from "../../../../config/constants/images";
import DataTabs from "../../../../components/data/Poppers/DataTabs";
import ProjectCard from "../../../../components/data/Cards/ProjectCard";
import TaskCard from "../../../../components/data/Cards/TaskCard";
import TaskList from "./TaskList";
import ProjectList from "./ProjectList";
import { useUser } from "../../../../config/query/userQuery";
import { BASE_URL } from "../../../../config/constants/api";
import { getImageUrl } from "../../../../config/utils/fileUtil";

const EmployeeDetails = ({ disclosure, detailDisclosure, data }) => {
  const userQuery = useUser(data?._id);

  const { colorMode } = useColorMode();
  const tabData = [
    {
      label: "Task",
      content: <TaskList data={data?.taskDetails} />,
    },
    {
      label: "Projects",
      content: <ProjectList data={data?.projectDetails} />,
    },
  ];

  const user = userQuery?.data?.data?.user;

  return (
    <DataDrawer disclosure={disclosure} heading={"Employee Details"}>
    {userQuery.isLoading && <Flex w={'full'} justifyContent={'center'} mb={5}><Spinner size={"lg"} color='red.500'/></Flex>  }

      <Box
        px="20px"
        py="0px"
        borderTopLeftRadius={"10px"}
        borderTopRightRadius={"10px"}
        h={"233px"}
        bg="linear-gradient(28.85deg, #000000 0.52%, #303030 98.69%), linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%);"
      >
        <Image
          src={APP_IMAGES.CARD_WING}
          position="absolute"
          right="23px"
          width="88px"
        />
        <Flex
          alignItems={"center"}
          justifyContent={"space-between"}
          p={"20px 0px 20px 0px"}
        >
          <Text fontSize={"16px"} color="#fff" w={"125px"} h={"11px"}>
            Employee Details
          </Text>
          <IconButton
            border={"0.5px solid #4A4A4A"}
            rounded="full"
            bg={"#0000007d"}
            color={getColor(colorKeys.primary, colorMode)}
            icon={<Icon as={APP_ICONS.ARROW_RIGHT} boxSize={"5"} />}
            onClick={detailDisclosure.onOpen}
          />
        </Flex>
        <Flex alignItems={"center"} h={"80.44px"}>
          <Avatar w={"60px"} h={"60px"} src={getImageUrl(user?.userImage.path) || APP_IMAGES.DUMMY_AVATAR}></Avatar>
          <Box pl={"15px"}>
            <Text fontSize={"18px"} color={"#C90016"} fontWeight={"700"}>
              {user?.firstName} {user?.lastName}
            </Text>
            <Badge
              rounded={"full"}
              bgColor={"#707070"}
              p={"5px 10px 5px 10px"}
              fontSize={"8px"}
              textAlign={"center"}
              textColor={"#FFFFFF"}
              textTransform={"capitalize"}
            >
              {user?.userDesignation?.designation}
            </Badge>
          </Box>
        </Flex>
        <Divider/> 
        <Flex
          h={"51px"}
          padding={"10px"}
          gap={"10px"}
          justifyContent={"space-around"}
        >
          <Box textAlign={"center"} gap={"10px"}>
            <Text fontWeight={"700"} fontSize={"20px"} color={"#707070"}>
              {user?.projectCounts?.completed}
            </Text>
            <Text fontSize={"11px"} color={"#606060"}>
              Completed Project
            </Text>
          </Box>
          <Box textAlign={"center"} gap={"10px"}>
            <Text fontWeight={"700"} fontSize={"20px"} color={"#707070"}>
            {user?.projectCounts?.ongoing}  
            </Text>
            <Text fontSize={"11px"} color={"#606060"}>
              Ongoing Project
            </Text>
          </Box>
        </Flex>
      </Box>
      <DataTabs
        data={tabData}
        tabsProps={{ border: "#fff", borderRadius: 0, isFitted: true, mt: 5 }}
        tabListProps={{ bg: "#fff" }}
        tabProps={{
          color: getColor(colorKeys.primary, colorMode),
          _selected: {
            bg: "#fff",
            borderBottom: "4px solid",
            borderBottomColor: getColor(colorKeys.primary, colorMode),
          },
        }}
      />
    </DataDrawer>
  );
};

export default EmployeeDetails;
