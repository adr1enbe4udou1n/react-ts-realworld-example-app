import "@unocss/reset/tailwind.css";
import "@/main.css";
import "uno.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { UserProvider } from "./contexts/user";
import { Routes } from "@generouted/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <Routes />
      </UserProvider>
    </QueryClientProvider>
  </StrictMode>,
);
