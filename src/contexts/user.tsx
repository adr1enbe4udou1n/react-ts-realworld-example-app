import { User, getUser } from "@/api";
import { createContext, JSX, useMemo, useState } from "react";
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
      const user = await getUser();

      loadUser(user);
    } catch {
      logout();
    }
  };

  const logout = (): void => {
    setUser(null);
    setToken(null);
  };

  const contextValue = useMemo(
    () => ({
      user,
      loadUser,
      logout,
      fetch,
      isLoggedIn,
    }),
    [user, loadUser, logout, fetch, isLoggedIn],
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export { UserContext, UserProvider };
