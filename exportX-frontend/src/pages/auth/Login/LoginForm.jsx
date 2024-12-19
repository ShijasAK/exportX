import React, { useState } from "react";
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
import { useGoogleLoginApi, useLogin } from "../../../config/query/authQuery";
import {
  updateToken,
  updateUser,
} from "../../../config/redux/slices/userSlice";
import { useGoogleLogin } from "@react-oauth/google";
import API_CONSTANTS from "../../../config/constants/api";
import { Eye, EyeSlash } from "iconsax-react";

const LoginForm = () => {
  const dispatch = useDispatch();
  const { colorMode } = useColorMode();
  const [hidePassword, setHidePassword] = useState(true);
  const loginQuery = useLogin();
  const googleLoginQuery = useGoogleLoginApi();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (values) => {
    loginQuery
      .mutateAsync(values)
      .then((response) => {
        const userDetails = {
          ...(response?.data?.userDetails || {}),
          userType: response?.data?.userType,
        };
        dispatch(updateUser(userDetails));
        dispatch(updateToken(response?.data?.accessToken));
      })
      .catch((error) => console.warn(error, "error"));
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log("token:", tokenResponse);
      googleLoginQuery
        .mutateAsync({ token: tokenResponse.access_token })
        .then((response) => {
          console.log("response:", response);
          const userDetails = {
            ...(response?.data?.userDetails || {}),
            userType: response?.data?.userType,
          };
          dispatch(updateUser(userDetails));
          dispatch(updateToken(response?.data?.accessToken));
        })
        .catch((error) => console.warn(error, "error"));
    },
  });

  const handleShowHidePassword = () => {
    const state = hidePassword;
    setHidePassword(!state);
  };
  return (
    <Box mt={{ base: "0", lg: "90px" }}>
      <Heading fontSize={"40px"}>Welcome back !</Heading>
      <Text mt={2} color={"#C8C8C8"}>
        Please enter your details to login
      </Text>

      <Button
        mt={8}
        w="full"
        h="56px"
        variant={"outline"}
        onClick={handleGoogleLogin}
      >
        <HStack spacing={5}>
          <Image src={APP_IMAGES.GOOGLE} />
          <Text fontSize={"18px"} fontWeight={"normal"}>
            Login with Google
          </Text>
        </HStack>
      </Button>

      <Text
        textAlign={"center"}
        color={"#C8C8C8"}
        mt={5}
        fontSize={"16px"}
        fontWeight={"normal"}
      >
        Or continue with
      </Text>

      <chakra.form onSubmit={handleSubmit(onSubmit)} m="30px 0">
        <FormInput
          id={"email"}
          label={"Email"}
          placeholder="Email ID or user name"
          required={true}
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

        <FormInput
          id={"password"}
          label={"Password"}
          type="password"
          secure={hidePassword}
          placeholder="Enter Password"
          required={true}
          errors={errors}
          hideLabel={true}
          control={control}
          inputProps={{ fontSize: "15px", height: "56px" }}
          containerStyles={{ mt: 5 }}
          rightElement={
            hidePassword ? (
              <Eye fontSize={"30px"} onClick={handleShowHidePassword} />
            ) : (
              <EyeSlash fontSize={"30px"} onClick={handleShowHidePassword} />
            )
          }
        />

        <Flex mt={5} align="center" justify="space-between">
          <FormCheckbox
            control={control}
            id={"rememberMe"}
            options={["Remember Me"]}
            optionLabelProps={{ fontSize: "14px" }}
            inputProps={{ colorScheme: "dark" }}
          />

          <Flex w="530px" maxW={"full"} textAlign={"right"} justify="end">
            <chakra.span mr={1}>Forgot Password?</chakra.span>
            <chakra.span color={getColor(colorKeys.primary, colorMode)}>
              <Link to="/auth/forgot-password">Reset Password</Link>
            </chakra.span>
          </Flex>
        </Flex>

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
          isLoading={loginQuery.isPending}
        >
          Login
        </Button>
      </chakra.form>
    </Box>
  );
};

export default LoginForm;
