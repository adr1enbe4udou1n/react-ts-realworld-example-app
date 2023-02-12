// create user context

import {
  User,
  login as loginApi,
  register as registerApi,
  updateUser as updateUserApi,
  handleValidation,
  getUser,
} from "@/api";
import { createContext, ReactNode, useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";

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
  }) => Promise<void>;
  logout: () => void;
  isLoggedIn: boolean;
} | null>(null);

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useLocalStorage<string | null>("token", null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (user?.token) {
      setToken(user.token);
    }
  }, [user]);

  useEffect(() => {
    setIsLoggedIn(user != null);
  }, [token]);

  const fetch = async () => {
    if (!isLoggedIn && token) {
      const response = await getUser({});

      setUser(response.data.user);
    }
  };

  const login = async (data: { email: string; password: string }) => {
    const response = await handleValidation(loginApi, {
      user: data,
    });

    if (!response?.ok) {
      return;
    }

    setUser(response.data.user);
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
      return;
    }

    setUser(response.data.user);
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
