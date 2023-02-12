import "@unocss/reset/tailwind.css";
import "@/main.css";
import "uno.css";

import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import App from "./App";
import Home from "./pages/Home";
import Login from "./pages/user/Login";
import Register from "./pages/user/Register";
import { UserProvider } from "./contexts/user";
import { FormsProvider } from "./contexts/forms";
import Settings from "./pages/user/Settings";
import ArticleCreate from "./pages/articles/ArticleCreate";
import RequireNoAuth from "./routes/RequireNoAuth";
import RequireAuth from "./routes/RequireAuth";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <FormsProvider>
        <UserProvider>
          <Routes>
            <Route path="/" element={<App />}>
              <Route path="/" element={<Home />} />
              <Route
                path="/login"
                element={
                  <RequireNoAuth>
                    <Login />
                  </RequireNoAuth>
                }
              />
              <Route
                path="/register"
                element={
                  <RequireNoAuth>
                    <Register />
                  </RequireNoAuth>
                }
              />
              <Route
                path="/settings"
                element={
                  <RequireAuth>
                    <Settings />
                  </RequireAuth>
                }
              />
              <Route
                path="/articles/create"
                element={
                  <RequireAuth>
                    <ArticleCreate />
                  </RequireAuth>
                }
              />
            </Route>
          </Routes>
        </UserProvider>
      </FormsProvider>
    </BrowserRouter>
  </React.StrictMode>
);
