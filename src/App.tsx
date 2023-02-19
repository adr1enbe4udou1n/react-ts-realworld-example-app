import AppFooter from "@/components/AppFooter";
import AppHeader from "@/components/AppHeader";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { UserContext } from "./contexts/user";

const queryClient = new QueryClient();

const App = () => {
  const userStore = useContext(UserContext);

  if (!userStore?.user) {
    userStore?.fetch();
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="font-sans flex flex-col h-full">
        <AppHeader />
        <main className="flex-1">
          <Outlet />
        </main>
        <AppFooter />
      </div>
    </QueryClientProvider>
  );
};

export default App;
