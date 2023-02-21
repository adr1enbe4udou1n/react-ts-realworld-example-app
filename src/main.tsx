import "@unocss/reset/tailwind.css";
import "@/main.css";
import "uno.css";

import React from "react";
import ReactDOM from "react-dom/client";

import { UserProvider } from "./contexts/user";
import { Routes } from "generouted/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <Routes />
      </UserProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
