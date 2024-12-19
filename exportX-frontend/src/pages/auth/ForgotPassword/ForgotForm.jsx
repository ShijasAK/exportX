import React from "react";
import {
  Box,
  Text,
  Button,
  HStack,
  Heading,
  Image,
  useColorMode,
  chakra,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import APP_IMAGES from "../../../config/constants/images";
import { useForm } from "react-hook-form";
import FormInput from "../../../components/forms/FormInput";
import { EMAIL_REGEX } from "../../../config/constants/regex";
import FormCheckbox from "../../../components/forms/FormCheckbox";
import { Link, useNavigate } from "react-router-dom";
import { colorKeys, getColor } from "../../../config/constants/colors";
import { getStringRules } from "../../../config/utils/validationUtil";
import ProfileIcon from "../../../components/Icons/ProfileIcon";
import LockIcon from "../../../components/Icons/LockIcon";
import { useForgotPassword, useLogin } from "../../../config/query/authQuery";
import {
  updateToken,
  updateUser,
} from "../../../config/redux/slices/userSlice";

const LoginForm = () => {
  const dispatch = useDispatch();
  const { colorMode } = useColorMode();
  const forgotPasswordQuery = useForgotPassword();
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmit = (values) => {
    forgotPasswordQuery
      .mutateAsync(values)
      .then((response) => {
        navigate("/auth/login")
      })
      .catch((error) => setError("email", error?.message));
  };
  return (
    <Box mt={{ base: "0", lg: "100px" }}>
      <Heading fontSize={"40px"}>Forgot Password?</Heading>
      <Text mt={2} color={"#C8C8C8"}>
        Please enter your email to receive a link to create a new password.
      </Text>

      <chakra.form onSubmit={handleSubmit(onSubmit)} m="30px 0">
        <FormInput
          id={"email"}
          label={"Email"}
          placeholder="Email ID or user name"
          required={true}
          customError={"please enter your email."}
          errors={errors}
          control={control}
          inputProps={{ fontSize: "15px", height: "56px" }}
          hideLabel={true}
          rules={getStringRules({
            pattern: {
              value: EMAIL_REGEX,
              message: "Invalid email address",
            },
          })}
          rightElement={<ProfileIcon fontSize={"30px"} />}
        />
        
        <Button
          mt={5}
          fontSize="18px"
          fontWeight={"normal"}
          color={"#fff"}
          w="full"
          bg={"linear-gradient(91.05deg, #000000 -7.51%, #363636 84.71%)"}
          h="56px"
          _hover={{ opacity: 0.8 }}
          _focus={{ opacity: 0.8 }}
          _active={{ opacity: 0.8 }}
          transition={"0.3s ease"}
          type="submit"
          isLoading={forgotPasswordQuery.isPending}
        >
          Send Email
        </Button>
      </chakra.form>
      <Flex mt={3} maxW={"full"} textAlign={"center"} justify="center">
            <chakra.span color={getColor(colorKeys.primary, colorMode)}>
              <Link to="/auth/login">Back to Login</Link>
            </chakra.span>
          </Flex>
    </Box>
  );
};

export default LoginForm;
