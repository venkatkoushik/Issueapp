import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Addisue from "../screen/addisue";
import Issuecrud from "../screen/issuecrud";
import routes from "./routes";
function Routes() {
  const router = createBrowserRouter([
    {
      path: routes.home,
      element: <Issuecrud />,
    },
    {
      path: routes.addissue,
      element: <Addisue />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default Routes;
