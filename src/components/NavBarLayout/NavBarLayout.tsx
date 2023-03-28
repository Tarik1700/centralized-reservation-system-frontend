import React from "react";
import { Outlet } from "react-router";
import Nav from "../../pages/AfterLogin/Nav";

const NavBarLayout = () => (
  <>
    <Nav />
    <Outlet />
  </>
);

export default NavBarLayout;
