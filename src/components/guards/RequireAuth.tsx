import { UserContext } from "@/contexts/user";
import { Navigate } from "@tanstack/react-router";
import { type JSX, useContext } from "react";

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const userStore = useContext(UserContext);

  if (!userStore?.isLoggedIn) {
    return <Navigate replace to="/login" />;
  }

  return children;
};

export default RequireAuth;
