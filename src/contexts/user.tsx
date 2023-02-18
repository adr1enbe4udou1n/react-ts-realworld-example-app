// create user context

import { User, getUser } from "@/api";
import { createContext, useState } from "react";
import useLocalStorageState from "use-local-storage-state";

const UserContext = createContext<{
  user: User | null;
  loadUser: (user: User) => void;
  logout: () => void;
  isLoggedIn: boolean;
  fetch: () => Promise<void>;
} | null>(null);

const UserProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useLocalStorageState("token");

  const isLoggedIn = !!token;

  const loadUser = async (user: User) => {
    setUser(user);
    setToken(user.token);
  };

  const fetch = async () => {
    if (!token) {
      return;
    }
    try {
      const response = await getUser({});

      loadUser(response.data.user);
    } catch (e) {
      logout();
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
        loadUser,
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
