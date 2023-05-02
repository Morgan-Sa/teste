import React from "react";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import { AddPage } from "./addPage";
import "./index.css";
import { ListPage } from "./listPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ListPage></ListPage>,
  },
  {
    path: "/add",
    element: <AddPage></AddPage>,
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}
