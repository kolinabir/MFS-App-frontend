import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Dashboard from "@/pages/Dashboard/Dashboard";
import Register from "@/pages/Register/Register";
import MainDashboard from "@/pages/Dashboard/MainDashboard";
import NewAgentReq from "@/pages/Dashboard/NewAgentReq";
import { Tabs } from "@/pages/Dashboard/Tabs";
import { AgentBoard, UserManagement } from "@/pages/Dashboard/UserManagement";
import { ViewTransactions } from "@/pages/Dashboard/ViewTransactions";
import SendMoney from "@/pages/Dashboard/MoneyRoutes/sendMoney";
import CashOut from "@/pages/Dashboard/MoneyRoutes/cashout";
const Routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      {
        index: true,
        element: <MainDashboard></MainDashboard>,
      },
      {
        path: "/dashboard/new-agent-req",
        element: <NewAgentReq></NewAgentReq>,
      },
      {
        path: "/dashboard/user-management",
        element: <UserManagement></UserManagement>,
      },
      {
        path: "/dashboard/transactions/:mobileNumber",
        element: <ViewTransactions></ViewTransactions>,
      },
      {
        path: "/dashboard/send-money",
        element: <SendMoney></SendMoney>,
      },
      {
        path: "/dashboard/cash-out",
        element: <CashOut></CashOut>,
      },
    ],
  },
]);

export default Routes;
