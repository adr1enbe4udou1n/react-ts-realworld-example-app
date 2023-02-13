import "@unocss/reset/tailwind.css";
import "@/main.css";
import "uno.css";

import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import Home from "./pages/Home";
import Login from "./pages/user/Login";
import Register from "./pages/user/Register";
import { UserProvider } from "./contexts/user";
import Settings from "./pages/user/Settings";
import ArticleCreate from "./pages/articles/ArticleCreate";
import RequireNoAuth from "./routes/RequireNoAuth";
import RequireAuth from "./routes/RequireAuth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: (
          <RequireNoAuth>
            <Login />
          </RequireNoAuth>
        ),
      },
      {
        path: "/register",
        element: (
          <RequireNoAuth>
            <Register />
          </RequireNoAuth>
        ),
      },
      {
        path: "/settings",
        element: (
          <RequireAuth>
            <Settings />
          </RequireAuth>
        ),
      },
      {
        path: "/articles/create",
        element: (
          <RequireAuth>
            <ArticleCreate />
          </RequireAuth>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
);
