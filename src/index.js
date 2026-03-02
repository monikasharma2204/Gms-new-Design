import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RecoilRoot } from "recoil";

import "./index.css";
import "./recoil.config.ts";

import Home from "./Page/Home/Home.jsx";
import Login from "./Page/Login/Login.jsx";
import CompanyProfile from "./Page/Company/CompanyProfile.jsx";
import ErrorPage from "./Page/Error/error-page.jsx";
import NavigationGuardWrapper from "./component/Common/NavigationGuardWrapper.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <NavigationGuardWrapper />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "home", element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "company/company-profile", element: <CompanyProfile /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RecoilRoot>
    <RouterProvider router={router} />
  </RecoilRoot>
);
