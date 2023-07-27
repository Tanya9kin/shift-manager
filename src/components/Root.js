import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import Calendar from "./Calendar/Calendar";
import TeamContextProvider from "./Team/TeamContextProvider";
import Team from "./Team/Team.js";

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
        element: (
          <TeamContextProvider>
            <Team />
          </TeamContextProvider>
        ),
      },
    ],
  },
]);

export default function Root() {
  return <RouterProvider router={router} />;
}
