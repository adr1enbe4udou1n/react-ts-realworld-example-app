import { Outlet, createRootRoute } from "@tanstack/react-router";
import AppHeader from "@/components/AppHeader";
import AppFooter from "@/components/AppFooter";
import { useContext } from "react";
import { UserContext } from "@/contexts/user";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
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
}
