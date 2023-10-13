import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { useNavigate } from "react-router-dom";

const RedirectToDefault = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    // Perform a redirect to a different route
    navigate("/boards/0632827995c388107667");
  };

  useEffect(() => {
    handleRedirect();
  }, []);

  return <></>;
};

const router = createBrowserRouter([
  {
    path: "/boards/:boardId",
    element: <App />,
    children: [
      {
        path: "cards/:cardId",
        element: <App />,
      },
    ],
  },
  {
    path: "/",
    element: <RedirectToDefault />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
