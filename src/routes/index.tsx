import MainLayout from "@/layouts/MainLayout";
import DashboardPage from "@/pages/DashboardPage";
import ErrorPage from "@/pages/ErrorPage";
import LoginPage from "@/pages/LoginPage";

export const routes = [
  {
    path: "",
    element: <MainLayout />,
    children: [{ path: "", element: <DashboardPage /> }],
  },
  { path: "/login", element: <LoginPage /> },
  { path: "*", element: <ErrorPage /> },
];
