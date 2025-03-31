import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./../App";
import React, { Suspense } from "react";
import Loader from "../components/Utils/Loader";

const HomePage = lazy(() => import("../pages/MainPage"));
const CharactersPage = lazy(() => import("../pages/CharactersPages"));
const ErrorPage = lazy(() => import("../hooks/Utils/ErrorPage"));
const NotFoundPage = lazy(() => import("../hooks/Utils/NotFoundPage "));

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
        path: "characters",
        element: <CharactersPage />,
      },
      {
        path: "error",
        element: <NotFoundPage />,
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
]);

export const LazyRouteElement = ({ element }: { element: React.ReactNode }) => (
  <Suspense fallback={<Loader />}>{element}</Suspense>
);
