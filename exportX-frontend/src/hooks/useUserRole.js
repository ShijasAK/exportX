import { useSelector } from "react-redux";
import { globalConstants } from "../config/constants/globalConstants";

const useUserRole = () => {
  let isInternal = false; // ADMIN
  let isExternal = false; // CLIENT

  const { user = {} } = useSelector((state) => state.user) || {};

  if (user?.userType === globalConstants.userType.INTERNAL) {
    isInternal = true; // ADMIN
  } else if (user?.userType === globalConstants.userType.EXTERNAL) {
    isExternal = true; // CLIENT
  }

  return { isInternal, isExternal };
};

export default useUserRole;
