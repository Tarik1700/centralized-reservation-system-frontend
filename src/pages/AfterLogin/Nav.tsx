import { Navbar, Dropdown, Avatar } from 'flowbite-react';
import Sidepanel from './Sidepanel';

const Nav = () => {
    return ( 
    <div>
    <Navbar fluid={true} rounded={true}>
        <Sidepanel/>
        <div className="flex md:order-2">
        <Dropdown
            arrowIcon={false}
            inline={true}
            label={<Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded={true}/>}
        ></Dropdown>
        </div>
        <div>
        <div className="flex items-center">
            <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="mr-3 h-6 sm:h-9"
            alt="Flowbite Logo"
            style={{ marginLeft: 0 }}
            />
            <span className="ml-auto block sm:inline">On Time</span>
        </div>
        </div>
    </Navbar>
    </div>
);
}

export default Nav;
