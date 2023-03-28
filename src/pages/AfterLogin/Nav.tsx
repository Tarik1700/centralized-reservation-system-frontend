import { Navbar, Dropdown, Avatar } from "flowbite-react";
import Sidepanel from "./Sidepanel";
import logoWithoutText from "../../components/svg/logoWithoutText.svg";

const Nav = () => {
  return (
    <div>
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
        <div className="flex items-center md:order-1">
          <img
            src={logoWithoutText}
            className="mr-3 h-6 sm:h-9"
            alt="Flowbite Logo"
            style={{ marginLeft: 0 }}
          />
          <span className="ml-auto block sm:inline">On Time</span>
        </div>
        <div className="flex items-center md:hidden">
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
      </Navbar>
      <hr className="bg-gray-300 hover:bg-gray-500" />
    </div>
  );
};

export default Nav;
