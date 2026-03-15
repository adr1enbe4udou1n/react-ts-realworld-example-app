import { UserContext } from "@/contexts/user";
import { Navigate } from "@tanstack/react-router";
import { type JSX, useContext } from "react";

const RequireNoAuth = ({ children }: { children: JSX.Element }) => {
  const userStore = useContext(UserContext);

  if (userStore?.isLoggedIn) {
    return <Navigate replace to="/" />;
  }

  return children;
};

export default RequireNoAuth;
