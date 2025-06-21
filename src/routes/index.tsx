import MainLayout from "@/layouts/MainLayout";
import DashboardPage from "@/pages/DashboardPage";
import LoginPage from "@/pages/LoginPage";

export const routes = [
  {
    path: "",
    element: <MainLayout />,
    children: [{ path: "", element: <DashboardPage /> }],
  },
  { path: "/login", element: <LoginPage /> },
];
