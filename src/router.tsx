import Layout from "./layout";
import { createBrowserRouter } from "react-router-dom";
import DasboardPage from "./pages/DasboardPage";
import CustomerPage from "./pages/CustomerPage";
import OrderPage from "./pages/OrderPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "@/components/protected-route";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "*",
    element: <div>Not Found</div>,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: <DasboardPage />,
        handle: {
          crumb: "Trang chủ",
        },
      },
      {
        path: "/customers",
        element: <CustomerPage />,
        handle: {
          crumb: "Khách hàng",
        },
      },
      {
        path: "/orders",
        element: <OrderPage />,
        handle: {
          crumb: "Đơn hàng",
        },
      },
    ],
  },

]);
