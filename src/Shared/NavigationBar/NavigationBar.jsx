import { useContext, useEffect, useState } from "react";

import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Collapse,
  Menu,
  MenuHandler,
  Avatar,
  MenuList,
  MenuItem,
  Badge,
} from "@material-tailwind/react";
import { Link, NavLink } from "react-router-dom";
import './NavigationBar.css'
import { AuthContext } from "../../Providers/AuthProvider";
import { FaAngleDown } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import useCarts from "../../Hooks/useCarts";
import useUserRole from "../../Hooks/useUserRole";
import eMart from '../../../public/logo.png'
 




const  NavigationBar = () => {
  const [openNav, setOpenNav] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [carts] = useCarts();
  const [userRole] = useUserRole();
  console.log(userRole);
  const {user, logOut} = useContext(AuthContext);
  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);
 
  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
        <Typography
        as="li"
        variant="h6"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Badge content={carts ? carts.length : 0} color="green">
        <NavLink to='/cart' className="flex items-center p-1">
          Cart
        </NavLink>
        </Badge>
      </Typography>
        <Typography
        as="li"
        variant="h6"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <NavLink to='/allProducts' className="flex items-center">
          All Products
        </NavLink>
      </Typography>
      {
        userRole === "admin" ? <Typography
        as="li"
        variant="h6"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <NavLink to='/adminDashboard' className="flex items-center">
          Dashboard
        </NavLink>
      </Typography>: ""
      }
    </ul>
  );
  const closeMenu = () => setIsMenuOpen(false);
  const ProfileMenu =  
      <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
        <MenuHandler>
          <Button
            variant="text"
            color="blue-gray"
            className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
          >
            <Avatar
              variant="circular"
              size="sm"
              alt="tania andrew"
              className="border border-gray-900 p-0.5"
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
            />
            <FaAngleDown className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""}`}></FaAngleDown>
            
          </Button>
        </MenuHandler>
        <MenuList className="p-1">
        
              <MenuItem
                onClick={closeMenu}
                className="flex items-center gap-2 rounded hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
              >
                <Typography
        variant="paragraph"
      >
        Email: {user?.email}
      </Typography>
              </MenuItem>
              <MenuItem
                onClick={closeMenu}
                className=" rounded hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
              >
               <div  onClick={() => logOut()} className="w-full h-full flex items-center gap-2"><AiOutlineLogout></AiOutlineLogout> <div>Logout</div></div>
              </MenuItem>
        </MenuList>
      </Menu>

  return (
      <Navbar className="sticky top-0 z-50 h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4">
        <div className="flex items-center justify-between text-blue-gray-900">
          <Link to='/'><Typography
            as="a"
            className="mr-4 cursor-pointer py-1.5 font-medium"
          >
            <img className="w-32" src={eMart} alt="" />
          </Typography></Link>
            <div className="mr-4 hidden lg:block">{navList}</div>
          <div className="flex items-center gap-4">
            {
              user ? ProfileMenu  : <Link to='/login'><Button>Login</Button></Link>
            }
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <Collapse open={openNav}>
          {navList}
          <Button variant="gradient" size="sm" fullWidth className="mb-2">
            <span>Buy Now</span>
          </Button>
        </Collapse>
      </Navbar>
  );
}


export default NavigationBar;