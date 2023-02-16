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
import Feed from "./pages/Feed";
import Profile from "./pages/profiles/Profile";
import ProfileFavorites from "./pages/profiles/ProfileFavorites";
import Article from "./pages/articles/Article";
import ArticleEdit from "./pages/articles/ArticleEdit";

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
        path: "/feed",
        element: (
          <RequireAuth>
            <Feed />
          </RequireAuth>
        ),
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
        path: "/articles",
        children: [
          {
            path: "/articles/create",
            element: (
              <RequireAuth>
                <ArticleCreate />
              </RequireAuth>
            ),
          },
          {
            path: "/articles/:slug",
            element: <Article />,
          },
          {
            path: "/articles/:slug/edit",
            element: (
              <RequireAuth>
                <ArticleEdit />
              </RequireAuth>
            ),
          },
        ],
      },
      {
        path: "/profiles",
        children: [
          {
            path: "/profiles/:username",
            element: <Profile />,
          },
          {
            path: "/profiles/:username/favorites",
            element: <ProfileFavorites />,
          },
        ],
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
