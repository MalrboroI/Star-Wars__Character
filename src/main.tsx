import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { router } from "./context/Routes";
import { RouterProvider } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
