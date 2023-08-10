import { createBrowserRouter } from "react-router-dom";
import Main from "../Main/Main";
import Cart from "../Pages/Cart/Cart";
import Details from "../Pages/Details/Details";
import Home from "../Pages/Home/Home/Home";

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
        }
      ]
    },
  ]);

export default router;