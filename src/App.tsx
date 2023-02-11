import AppFooter from "@/components/AppFooter";
import AppHeader from "@/components/AppHeader";
import { Outlet } from "react-router-dom";

const App = () => {
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
