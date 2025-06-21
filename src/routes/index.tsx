import MainLayout from "@/layouts/MainLayout";
import CreatePage from "@/pages/CreatePage";
import DashboardPage from "@/pages/DashboardPage";
import ErrorPage from "@/pages/ErrorPage";
import LoginPage from "@/pages/LoginPage";

export const routes = [
  {
    path: "",
    element: <MainLayout />,
    children: [
      { path: "", element: <DashboardPage /> },
      { path: "create", element: <CreatePage /> },
    ],
  },
  { path: "/login", element: <LoginPage /> },
  { path: "*", element: <ErrorPage /> },
];
