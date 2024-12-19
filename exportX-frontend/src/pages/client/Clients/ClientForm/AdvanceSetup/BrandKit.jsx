import {
  Box,
  Button,
  Card,
  CardBody,
  HStack,
  Heading,
  Icon,
  IconButton,
  Image,
  SimpleGrid,
  VStack,
  useColorMode,
} from "@chakra-ui/react";
import React from "react";
import FormFileUpload from "../../../../../components/forms/FormFileUpload";
import DropzoneCard, {
  dropZoneParentStyles,
} from "../../../../../components/data/Cards/DropzoneCard";
import { FILE_TYPES } from "../../../../../config/constants/defaults";
import { colorKeys, getColor } from "../../../../../config/constants/colors";
import APP_ICONS from "../../../../../config/constants/icons";
import FormSelect from "../../../../../components/forms/FormSelect";
import { getStringRules } from "../../../../../config/utils/validationUtil";
import FormColorInput from "../../../../../components/forms/FormColorInput";
import { fontList } from "../../../../../config/constants/data";
import { getImageUrl } from "../../../../../config/utils/fileUtil";

const BrandKit = ({ errors, control, setValue, watch }) => {
  const { colorMode } = useColorMode();

  const onImageChange = ({ name, file }) => {
    setValue(name, file);
  };

  // const onAddPattern = ({ file }) => {
  //   const patterns = watch("brandPattern") || [];
  //   patterns.push(file);
  //   setValue("brandPattern", patterns);
  // };

  const onAddPattern = ({ file }) => {
    const brandPattern = watch("brandPattern") || [];
    setValue("brandPattern", [...brandPattern, file]);

    const newBrandPattern = watch("newBrandPattern") || [];
    setValue("newBrandPattern", [...newBrandPattern, file]);
  };
  return (
    <VStack align="stretch" spacing={5}>
      <SimpleGrid mt={5} columns={{ base: 1, md: 2 }} spacing={5}>
        <Box>
          <Heading
            fontSize={"14px"}
            color={getColor(colorKeys.whiteSmoke, colorMode)}
            as={"h3"}
            mb={2}
          >
            Alternative Logo
          </Heading>

          <Card rounded="none">
            <CardBody>
              {/* <Flex
                justify={"flex-end"}
                mt={1}
                mr={1}
                rounded="lg"
                bgPos={"center"}
                bgSize={"cover"}
                w="240px"
                h="60px"
                mb={3}
                bg={`url(${APP_IMAGES.ALT_LOGO})`}
              >
                <IconButton
                  size="xs"
                  variant={"unstyled"}
                  icon={
                    <Icon
                      boxSize={"6"}
                      color="#838383"
                      variant="Bold"
                      as={APP_ICONS.CLOSE}
                    />
                  }
                />
              </Flex> */}
              <FormFileUpload
                id={"brandKitLogo"}
                onChange={onImageChange}
                label={"Logo"}
                component={
                  <DropzoneCard
                    src={
                      watch("brandKitLogo")
                        ? URL.createObjectURL(watch("brandKitLogo"))
                        : getImageUrl(watch("logoUrl"))
                    }
                  />
                }
                componentProps={dropZoneParentStyles}
                fileType={FILE_TYPES.IMAGE}
              />
            </CardBody>
          </Card>
        </Box>
        <Box>
          <Heading
            fontSize={"14px"}
            color={getColor(colorKeys.whiteSmoke, colorMode)}
            as={"h3"}
            mb={2}
          >
            Brand Font & Colours
          </Heading>

          <Card rounded="none">
            <CardBody>
              <VStack align="stretch" spacing={5}>
                <FormSelect
                  id="brandFont"
                  label="Fonts"
                  placeholder={"Select fonts"}
                  required={false}
                  hideLabel={false}
                  multiple={true}
                  errors={errors}
                  control={control}
                  options={fontList.map((item) => ({
                    label: item,
                    value: item,
                  }))}
                />
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
                  <FormColorInput
                    id={"mainBrandColor"}
                    label={"Main Brand Color"}
                    placeholder="Select color"
                    errors={errors}
                    control={control}
                    inputProps={{ fontSize: "15px" }}
                    rules={getStringRules()}
                  />

                  <FormColorInput
                    id={"brandKitSubheadingCode"}
                    label={"Sub Heading Color"}
                    placeholder="Select color"
                    errors={errors}
                    control={control}
                    inputProps={{ fontSize: "15px" }}
                    rules={getStringRules()}
                  />

                  <FormColorInput
                    id={"brandKitDescriptionColorCode"}
                    label={"Description Color"}
                    placeholder="Enter color code"
                    errors={errors}
                    control={control}
                    inputProps={{ fontSize: "15px" }}
                    rules={getStringRules()}
                  />

                  {watch("showAltColor") ? (
                    <FormColorInput
                      id={"alternateColor"}
                      label={"Alternate Color"}
                      placeholder="Enter color code"
                      errors={errors}
                      control={control}
                      inputProps={{ fontSize: "15px" }}
                      rules={getStringRules()}
                    />
                  ) : (
                    <Button
                      mt={"27px"}
                      variant={"outline"}
                      color={"#828282"}
                      fontSize={"14px"}
                      h="40px"
                      borderColor={"#ececec"}
                      onClick={() => setValue("showAltColor", true)}
                      borderStyle={"dashed"}
                      leftIcon={
                        <Icon
                          w={"30px"}
                          h="30px"
                          color={getColor(colorKeys.primary, colorMode)}
                          as={APP_ICONS.ADD}
                        />
                      }
                    >
                      Alternative Colour
                    </Button>
                  )}
                </SimpleGrid>
              </VStack>
            </CardBody>
          </Card>
        </Box>
      </SimpleGrid>

      <VStack align="stretch" spacing={5}>
        <Heading
          fontSize={"14px"}
          color={getColor(colorKeys.whiteSmoke, colorMode)}
          as={"h3"}
        >
          Brand Patterns
        </Heading>

        <SimpleGrid columns={5}  spacing={5}>
        <FormFileUpload
          id={"logo"}
          onChange={onAddPattern}
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
            watch("brandPattern")?.map((item, index) => (
              <Image
                key={index}
                p="2"
                w="154px"
                h="150px"
                borderRadius={"10px"}
                src={
                  item.pattern
                    ? getImageUrl(item.pattern?.path)
                    : URL.createObjectURL(item)
                }
              />
            ))}
        </SimpleGrid>
      </VStack>
    </VStack>
  );
};

export default BrandKit;
