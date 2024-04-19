import ReactDOM from "react-dom/client";
import "./App.scss";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Main from "./pages/Main/Main.jsx";
import Register from "./components/Register/Register.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Register />,
  },
  {
    path: "/main",
    element: <Main />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
