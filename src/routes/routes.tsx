import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Dashboard from "@/pages/Dashboard/Dashboard";
import Register from "@/pages/Register/Register";
import MainDashboard from "@/pages/Dashboard/MainDashboard";
import NewAgentReq from "@/pages/Dashboard/NewAgentReq";
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
    ],
  },
]);

export default Routes;
