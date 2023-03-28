import { Navbar, Dropdown, Avatar } from 'flowbite-react';
import Sidepanel from '../../pages/AfterLogin/Sidepanel';
import LogoWithText from '../svg/LogoWithText.svg';

const Nav = () => {
  return (
    <div className="border-b-[#B3B3B3] border-b-[1px] shadow-md">
      <Navbar fluid={true} rounded={true}>
        <Sidepanel />
        <div className="hidden md:flex md:items-center md:order-2">
          <div className="w-24 ">
            <img
              src={LogoWithText}
              className="mr-3 h-6 sm:h-9"
              alt="Flowbite Logo"
            />
          </div>

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
        {/* <div className="flex items-center md:order-1">
          <img
            src={{}}
            className="mr-3 h-6 sm:h-9"
            alt="Flowbite Logo"
            style={{ marginLeft: 0 }}
          />
          <span className="ml-auto block sm:inline">On Time</span>
        </div> */}
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
