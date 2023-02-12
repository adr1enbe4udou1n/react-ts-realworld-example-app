// create user context

import {
  User,
  login as loginApi,
  register as registerApi,
  updateUser as updateUserApi,
  handleValidation,
  getUser,
  ApiValidationException,
} from "@/api";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";
import { FormsContext } from "./forms";

const UserContext = createContext<{
  user: User | null;
  login: (data: { email: string; password: string }) => Promise<void>;
  register: (data: {
    username: string;
    email: string;
    password: string;
  }) => Promise<void>;
  updateUser: (data: {
    image: string | undefined;
    username: string | undefined;
    bio: string | undefined;
    email: string | undefined;
  }) => Promise<boolean>;
  logout: () => void;
  isLoggedIn: boolean;
} | null>(null);

const UserProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useLocalStorage<string | null>("token", null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const formsStore = useContext(FormsContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.token) {
      setToken(user.token);
    }
  }, [user]);

  useEffect(() => {
    setIsLoggedIn(!!token);
  }, [token]);

  const fetch = async () => {
    if (!isLoggedIn && token) {
      try {
        const response = await getUser({});

        setUser(response.data.user);
      } catch (e) {
        setToken(null);
      }
    }
  };

  const login = async (data: { email: string; password: string }) => {
    try {
      const response = await handleValidation(loginApi, {
        user: data,
      });

      if (!response?.ok) {
        return;
      }

      setUser(response.data.user);

      navigate("/");
    } catch (e) {
      if (e instanceof ApiValidationException) {
        formsStore?.setErrors(e.errors);
      }
    }
  };

  const register = async (data: {
    username: string;
    email: string;
    password: string;
  }) => {
    const response = await handleValidation(registerApi, {
      user: data,
    });

    if (!response?.ok) {
      return;
    }

    setUser(response.data.user);
  };

  const updateUser = async (data: {
    image: string | undefined;
    username: string | undefined;
    bio: string | undefined;
    email: string | undefined;
  }) => {
    const response = await handleValidation(updateUserApi, {
      user: data,
    });

    if (!response?.ok) {
      return false;
    }

    setUser(response.data.user);
    return true;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  fetch();

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        register,
        updateUser,
        logout,
        isLoggedIn,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
