import { AdminPage } from "@/pages/admin";
import { HomePage } from "@/pages/home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RootLayout } from "./layout";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "admin",
        element: <AdminPage />,
      },
    ],
  },
]);
export const AppRouter = () => <RouterProvider router={router} />;
