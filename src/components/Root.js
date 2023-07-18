import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Calendar from "./Calendar/Calendar";
import Team from "./Team/Team";

import App from "./App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "dashboard",
        element: <Calendar />,
      },
      {
        path: "Team",
        element: <Team />,
      },
    ],
  },
]);

export default function Root() {
  return <RouterProvider router={router} />;
}
