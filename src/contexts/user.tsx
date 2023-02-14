// create user context

import { User, getUser } from "@/api";
import { createContext, useEffect, useState } from "react";
import useLocalStorageState from "use-local-storage-state";

const UserContext = createContext<{
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
  isLoggedIn: boolean;
  fetch: () => Promise<void>;
} | null>(null);

const UserProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useLocalStorageState("token");
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);

  useEffect(() => {
    if (user?.token) {
      setToken(user.token);
    }
  }, [user]);

  useEffect(() => {
    setIsLoggedIn(!!token);
  }, [token]);

  const fetch = async () => {
    if (!token) {
      return;
    }
    try {
      const response = await getUser({});

      setUser(response.data.user);
    } catch (e) {
      setToken(null);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        logout,
        fetch,
        isLoggedIn,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
