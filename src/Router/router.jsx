import { createBrowserRouter } from "react-router-dom";
import Main from "../Main/Main";
import Cart from "../Pages/Cart/Cart";
import Details from "../Pages/Details/Details";
import Home from "../Pages/Home/Home/Home";
import Authentication from "../Pages/Authentication/Authentication";
import AdminDashBoard from "../Pages/Dashboards/AdminDashboard/AdminDashBoard";
import ProductContainer from "../Pages/Home/Product/ProductContainer";
import ManageUsers from "../Pages/Dashboards/AdminDashboard/ManageUsers";

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
          element: <Cart></Cart>
        },
        {
          path: "allUsers",
          element: <ManageUsers></ManageUsers>
        },
        {
          path: "allProducts",
          element: <Cart></Cart>
        }
      ]
  }
  ]);

export default router;