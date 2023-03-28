import { Navbar, Dropdown, Avatar } from "flowbite-react";
import Sidepanel from "../../pages/AfterLogin/Sidepanel";
import logoWithoutText from "../svg/logoWithoutText.svg";
import logoOnlyText2 from "../svg/logoOnlyText2.svg";
const Nav = () => {
  return (
    <div className="border-b-[#B3B3B3] border-b-[1px] shadow-md">
      <Navbar fluid={true} rounded={true}>
        <Sidepanel />
        <div className="hidden md:flex md:items-center md:order-2">
          <Dropdown
            arrowIcon={false}
            inline={true}
            label={
              <Avatar
                alt="User settings"
                img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                rounded={true}
              />
            }
          />
        </div>
        {<div className="flex items-center md:order-1">
        <img
            src={logoWithoutText}
            className="w-10 h-12 pt-1 rounded-full mr-1"
            alt="LOGOONY TEXT"
            style={{ marginLeft: 0 }}
          />  
          <img
            src={logoOnlyText2}
            alt="LOGOONY TEXT"
            style={{ marginLeft: 0 }}
          />  


        </div> }
        <div className="flex items-center md:hidden">
          <Dropdown
            arrowIcon={false}
            inline={true}
            label={
              <Avatar
                alt="User settings"
                img="https://flowbite.com/docs/images/people/profile-picture-4.jpg"
                rounded={true}
              />
            }
          />
        </div>
      </Navbar>
      <hr className="bg-gray-300 hover:bg-gray-500" />
    </div>
  );
};

export default Nav;
