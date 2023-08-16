import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MovieContainer } from "./components/MovieContainer";
import { Provider } from "react-redux";
import appStore from "./store/appStore";
import { MovieDetail } from "./components/MovieDetail";
import { ErrorScreen } from "./components/ErrorScreen";

export const MainApp = (
  <Provider store={appStore}>
    <App />
  </Provider>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: MainApp,
    errorElement: <ErrorScreen />,
    children: [
      {
        path: "/",
        element: <MovieContainer />,
      },
      {
        path: "/detail/:id",
        element: <MovieDetail />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
