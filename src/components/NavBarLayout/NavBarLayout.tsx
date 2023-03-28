import React from "react";
import { Outlet } from "react-router";
import Nav from "../Navbar/Nav";

const NavBarLayout = () => (
  <>
    <Nav />
    <Outlet />
  </>
);

export default NavBarLayout;
