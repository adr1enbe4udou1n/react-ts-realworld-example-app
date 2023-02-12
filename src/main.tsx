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

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <FormsProvider>
        <UserProvider>
          <Routes>
            <Route path="/" element={<App />}>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/articles/create" element={<ArticleCreate />} />
            </Route>
          </Routes>
        </UserProvider>
      </FormsProvider>
    </BrowserRouter>
  </React.StrictMode>
);
