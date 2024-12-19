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
import { EMAIL_REGEX, PASSWORD_REGEX } from "../../../config/constants/regex";
import FormCheckbox from "../../../components/forms/FormCheckbox";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { colorKeys, getColor } from "../../../config/constants/colors";
import { getStringRules } from "../../../config/utils/validationUtil";
import ProfileIcon from "../../../components/Icons/ProfileIcon";
import LockIcon from "../../../components/Icons/LockIcon";
import { useLogin, useResetPassword } from "../../../config/query/authQuery";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  updateToken,
  updateUser,
} from "../../../config/redux/slices/userSlice";
import { Eye, EyeSlash } from "iconsax-react";

const LoginForm = () => {
  const dispatch = useDispatch();
  const { colorMode } = useColorMode();
  const navigate = useNavigate();
  const formSchema = yup.object().shape({
    password: yup.string()
        .required("Password is required")
        .min(8, "Password length should be at least 8 characters")
        .max(12, "Password cannot exceed more than 12 characters")
        .matches(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{4,}$/,
          "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
        ),
    repeatPassword: yup.string()
        .required("Confirm Password is required")
        .min(8, "Password length should be at least 8 characters")
        .max(12, "Password cannot exceed more than 12 characters")
        .matches(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{4,}$/,
          "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
        )
        .oneOf([yup.ref("password")], "Passwords do not match")
});

  const resetPasswordQuery = useResetPassword();
  let [searchParams, setSearchParams] = useSearchParams();
  const [hidePassword, setHidePassword] = useState(true)

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(formSchema)
  });

  const onSubmit = (values) => {
    values.token = searchParams.get("token")

      resetPasswordQuery
      .mutateAsync(values)
      .then((response) => {
        navigate("/auth/login")
      })
      .catch((error) => console.warn(error, "error"));
  
  };

  const handleShowHidePassword = () => {
    const state = hidePassword;
    setHidePassword(!state);
  }
  return (
    <Box mt={{ base: "0", lg: "100px" }}>
      <Heading fontSize={"40px"}>Reset Password</Heading>
      <Text mt={2} color={"#C8C8C8"}>
        Please create a secure password for your account.
      </Text>

      <chakra.form onSubmit={handleSubmit(onSubmit)} m="30px 0">
        <FormInput
          id={"password"}
          label={"New Password"}
          type="password"
          secure={hidePassword}
          placeholder="Create New Password"
          required={true}
          errors={errors}
          hideLabel={true}
          control={control}
          inputProps={{ fontSize: "15px", height: "56px" }}
          containerStyles={{ mt: 5 }}
          rightElement={hidePassword ? <Eye fontSize={"30px"} onClick={handleShowHidePassword}/> : <EyeSlash fontSize={"30px"} onClick={handleShowHidePassword}/>}
        />

        <FormInput
          id={"repeatPassword"}
          label={"Repeat Password"}
          type="password"
          secure={hidePassword}
          placeholder="Repeat Password"
          required={true}
          errors={errors}
          hideLabel={true}
          control={control}
          inputProps={{ fontSize: "15px", height: "56px" }}
          containerStyles={{ mt: 5 }}
          rightElement={hidePassword ? <Eye fontSize={"30px"} onClick={handleShowHidePassword}/> : <EyeSlash fontSize={"30px"} onClick={handleShowHidePassword}/>}
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
          isLoading={resetPasswordQuery.isPending}
        >
          Set Password
        </Button>
      </chakra.form>
    </Box>
  );
};

export default LoginForm;
