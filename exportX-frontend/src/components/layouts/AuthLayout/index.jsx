import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { useUserRole } from "../../../hooks";

const AuthLayout = () => {
  const token = useSelector((state) => state?.user?.token);
  const { isExternal } = useUserRole();

  if (token) {
    return <Navigate to={isExternal ? "/client/dashboard" : "/dashboard"} />;
  }

  return <Outlet />;
};

export default AuthLayout;
