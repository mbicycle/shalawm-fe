import { AdminPage } from "@/pages/admin";
import { HomePage } from "@/pages/home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RootLayout } from "./layout";
import { BatchPage } from "@/pages/batch";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "batch",
        element: <BatchPage />,
      },
      {
        path: "admin",
        element: <AdminPage />,
      },
    ],
  },
]);
export const AppRouter = () => <RouterProvider router={router} />;
