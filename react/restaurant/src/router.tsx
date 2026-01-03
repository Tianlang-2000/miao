import { createBrowserRouter, redirect } from "react-router-dom";

import IndexView from "./indexView.tsx";
import Login from "./Login.tsx";
import HomeView from "./HomeView.tsx";
import React from "react";

var OrderManageView = React.lazy(() => import('./OrderManageView.tsx'))
var FoodManageView = React.lazy(() => import('./FoodManageView.tsx'))
var DeskManageView = React.lazy(() => import('./DeskManageView.tsx'))

const router = createBrowserRouter([
  {
    path: "/",
    element: <IndexView />,
  },
  {
    path: '/home',
    element: <HomeView />,
    children: [
      {
        path: '',
        loader: () => redirect("/home/orders"),
      },
      {
        path: 'orders',
        element: <OrderManageView />,
      },
      {
        path: 'foods',
        element: <FoodManageView />,
      },
      {
        path: 'desks',
        element: <DeskManageView />,
      }
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router