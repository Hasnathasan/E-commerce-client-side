import { createBrowserRouter } from "react-router-dom";
import Main from "../Main/Main";
import Cart from "../Pages/Cart/Cart";
import Details from "../Pages/Details/Details";
import Home from "../Pages/Home/Home/Home";
import Authentication from "../Pages/Authentication/Authentication";
import AdminDashBoard from "../Pages/Dashboards/AdminDashboard/AdminDashBoard";
import ManageUsers from "../Pages/Dashboards/AdminDashboard/ManageUsers";
import ManageProducts from "../Pages/Dashboards/AdminDashboard/ManageProducts";
import AllProducts from "../Pages/AllProducts/AllProducts";
import ManageOrders from "../Pages/Dashboards/AdminDashboard/ManageOrders";
import AdminHome from "../Pages/Dashboards/AdminDashboard/AdminHome";
import AddProduct from "../Pages/Dashboards/AdminDashboard/AddProduct";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
            path: '/',
            element: <Home></Home>
        },
        {
            path: '/cart',
            element: <Cart></Cart>
        },
        {
            path: '/allProducts',
            element: <AllProducts></AllProducts>
        },
        {
            path: "/details/:id",
            element: <Details></Details>
        },
        {
            path: "/login",
            element: <Authentication></Authentication>
        }
      ]
    },
    {
      path: "/adminDashboard",
      element: <AdminDashBoard></AdminDashBoard>,
      children: [
        {
          path: "",
          element: <AdminHome></AdminHome>
        },
        {
          path: "allUsers",
          element: <ManageUsers></ManageUsers>
        },
        {
          path: "allProducts",
          element: <ManageProducts></ManageProducts>
        },
        {
          path: "addProduct",
          element: <AddProduct></AddProduct>
        },
        {
          path: "orders",
          element: <ManageOrders></ManageOrders>
        }
      ]
  }
  ]);

export default router;