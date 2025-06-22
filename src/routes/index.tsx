// src/router/index.tsx
import MainLayout from "@/layouts/MainLayout";
import CreatePage from "@/pages/CreatePage";
import DashboardPage from "@/pages/DashboardPage";
import ElectionDetailPage from "@/pages/ElectionDetailPage";
import ErrorPage from "@/pages/ErrorPage";
import LoginPage from "@/pages/LoginPage";

export const routes = [
  {
    path: "",
    element: <MainLayout />,
    children: [
      { path: "", element: <DashboardPage />, title: "Dashboard - BElection." },
      { path: "create", element: <CreatePage />, title: "Create - BElection." },
      {
        path: "e/:id",
        element: <ElectionDetailPage />,
        title: "Election - BElection.",
      },
    ],
  },
  { path: "/login", element: <LoginPage />, title: "Login - BElection." },
  { path: "*", element: <ErrorPage />, title: "Page Not Found - BElection." },
];
