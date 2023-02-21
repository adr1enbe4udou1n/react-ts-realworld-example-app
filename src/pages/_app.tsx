import AppFooter from "@/components/AppFooter";
import AppHeader from "@/components/AppHeader";
import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { UserContext } from "@/contexts/user";

const App = () => {
  const userStore = useContext(UserContext);

  if (!userStore?.user) {
    userStore?.fetch();
  }

  return (
    <div className="font-sans flex flex-col h-full">
      <AppHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <AppFooter />
    </div>
  );
};

export default App;
