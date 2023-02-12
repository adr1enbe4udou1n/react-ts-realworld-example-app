import { UserContext } from "@/contexts/user";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const userStore = useContext(UserContext);

  if (!userStore?.isLoggedIn) {
    return <Navigate replace to="/login" />;
  }

  return children;
};

export default RequireAuth;
