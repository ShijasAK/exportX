import {
  HStack,
  Heading,
  Icon,
  IconButton,
  Image,
  SimpleGrid,
  VStack,
  useColorMode,
} from "@chakra-ui/react";
import { colorKeys, getColor } from "../../../../../config/constants/colors";
import APP_IMAGES from "../../../../../config/constants/images";
import { useUpdateClientTemplate } from "../../../../../config/query/clientQuery";
import APP_ICONS from "../../../../../config/constants/icons";
import FormFileUpload from "../../../../../components/forms/FormFileUpload";
import { FILE_TYPES } from "../../../../../config/constants/defaults";
import { getImageUrl } from "../../../../../config/utils/fileUtil";

const Templates = ({ currentTemplate, control, errors, setValue, watch }) => {
  const { colorMode } = useColorMode();
  const updateClientTemplate = useUpdateClientTemplate();

  const onUpdateTemplate = (id) => {
    updateClientTemplate.mutateAsync({ id, template: id }).catch((err) => {
      console.warn(err);
    });
  };

  const onAddTemplate = ({ file }) => {
    const template = watch("template") || [];
    setValue("template", [...template, file]);
    console.log("file", template)

    const newTemplate = watch("newTemplate") || [];
    setValue("newTemplate", [...newTemplate, file]);
  };

  return (
    <VStack align="stretch" spacing={5}>
      <Heading
        fontSize={"14px"}
        color={getColor(colorKeys.whiteSmoke, colorMode)}
        as={"h3"}
      >
        Templates
      </Heading>

     
        <SimpleGrid columns={5}  spacing={5}>
        <FormFileUpload
          id={"logo"}
          onChange={onAddTemplate}
          label={"Logo"}
          component={
            <IconButton
              variant={"outline"}
              color={"#828282"}
              fontSize={"14px"}
              w="160px"
              h="150px"
              fontWeight={"normal"}
              borderColor={"#ececec"}
              borderStyle={"dashed"}
              icon={
                <Icon
                  fontWeight={"400"}
                  w={"104px"}
                  h="104px"
                  color={getColor(colorKeys.primary, colorMode)}
                  as={APP_ICONS.ADD}
                />
              }
            />
          }
          fileType={FILE_TYPES.IMAGE}
        />
          {
            watch("templates")?.map((item, index) => (
              <Image
                key={index}
                p="2"
                border={
                  watch("currentTemplate")?._id === item?._id &&
                  "3px solid #ff5017"
                }
                onClick={() => setValue("currentTemplate", item)}
                w="154px"
                h="150px"
                borderRadius={"10px"}
                src={
                  item.template
                    ? getImageUrl(item.template?.path)
                    : URL.createObjectURL(item)
                }
              />
            ))}

          {watch("template")?.map((item, index) => (
            <Image
              key={index}
              border={"3px solid #ff5017"}
              w="154px"
              h="150px"
              borderRadius={"10px"}
              src={URL.createObjectURL(item)}
            />
          ))}
        </SimpleGrid>

   
    </VStack>
  );
};

export default Templates;
