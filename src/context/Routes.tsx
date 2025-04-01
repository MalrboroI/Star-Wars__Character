import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./../App";
import React, { Suspense } from "react";
import Loader from "../components/Utils/Loader";

// "Ленивая" загрузка страниц
const HomePage = lazy(() => import("../pages/MainPage"));
const CharactersPage = lazy(() => import("../pages/CharactersPages"));
const ErrorPage = lazy(() => import("../pages/ErrorPage"));
const NotFoundPage = lazy(() => import("../Utils/NotFoundPage "));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "Home",
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
