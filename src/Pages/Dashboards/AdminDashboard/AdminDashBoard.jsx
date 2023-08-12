import { FaBookmark, FaHome, FaRegBookmark } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
const AdminDashBoard = () => {
    
  
  const mainLinks = <>
  <li>
            <NavLink className="p-3 text-base" to="/">
              <FaHome></FaHome> Home
            </NavLink>
          </li>
          <li>
            <NavLink className="p-3 text-base" to="/cart">
              <FaHome></FaHome> Cart
            </NavLink>
          </li>
          <li>
            <NavLink className="p-3 text-base" to="/instructors">
              <FaHome></FaHome> Instructors
            </NavLink>
          </li>
  </>
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content w-[100%] overflow-auto flex flex-col min-h-screen items-center justify-center">
        {/* Page content here */}
        <Outlet></Outlet>
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
        </label>
      </div>
      <div className="drawer-side w-full">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        {/* Sidebar content here */}
        <div className="w-80"></div>
        <ul className="menu flex-nowrap top-0 fixed px-8 h-screen bg-white py-10 w-80 space-y-2">
        <h2 className="text-2xl mb-5">Dashboard</h2>
        <li>
            <NavLink className="p-3 text-base" to=" ">
              <FaHome></FaHome> Admin
            </NavLink>
          </li>
          <li>
            <NavLink className="p-3 text-base" to="allUsers">
              <FaRegBookmark></FaRegBookmark> Manage Users
            </NavLink>
          </li>
          <li>
            <NavLink className="p-3 text-base" to="allProducts">
              <FaBookmark></FaBookmark> Manage Products
            </NavLink>
          </li>
          <div className="divider"></div>
            {mainLinks}
          
        </ul>
      </div>
    </div>
  );
};

export default AdminDashBoard;
