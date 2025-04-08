import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import React, { Suspense } from "react";
import Loader from "../components/Module/Loader";
import HomePage from "../pages/MainPage";
import CharactersPage from "../pages/CharactersPages";

// "Ленивая" загрузка страниц
const ErrorPage = lazy(() => import("../pages/ErrorPage"));
const NotFoundPage = lazy(() => import("../utils/NotFoundPage "));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "Characters",
        element: <CharactersPage />,
      },
      {
        path: "Network_Error",
        element: <NotFoundPage />,
      },
      {
        path: "404",
        element: <ErrorPage />,
      },
    ],
  },
]);


export const LazyRouteElement = ({ element }: { element: React.ReactNode }) => (
  <Suspense fallback={<Loader />}>{element}</Suspense>
);
