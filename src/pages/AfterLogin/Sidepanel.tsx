import React, { useState } from 'react';
import { Sidebar} from 'flowbite-react'
import { HiTable,HiChartPie,HiShoppingBag,HiInbox,HiUser,HiArrowSmRight, } from 'react-icons/hi'

const Sidepanel = () => {
const [isOpen, setIsOpen] = useState(false);

const toggleSidebar = () => {
    setIsOpen(!isOpen);
};

  return (
    <div>
      <button onClick={toggleSidebar}>
        X
      </button>
      {isOpen && (
        <div className="fixed top-16 left-0 w-full h-full bg-gray-800 bg-opacity-50 z-50">
          <div className="max-w-xs h-full bg-white overflow-auto">
            <Sidebar aria-label="Sidebar with multi-level dropdown example">
            <Sidebar aria-label="Sidebar with content separator example">
    <Sidebar.Items>
      <Sidebar.ItemGroup>
        <Sidebar.Item
          href="#"
          icon={HiChartPie}
        >
          Dashboard
        </Sidebar.Item>
       
        <Sidebar.Item
          href="#"
          icon={HiInbox}
        >
          Inbox
        </Sidebar.Item>
        <Sidebar.Item
          href="#"
          icon={HiUser}
        >
          Users
        </Sidebar.Item>
        <Sidebar.Item
          href="#"
          icon={HiShoppingBag}
        >
          Products
        </Sidebar.Item>
        <Sidebar.Item
          href="#"
          icon={HiArrowSmRight}
        >
          Sign In
        </Sidebar.Item>
        <Sidebar.Item
          href="#"
          icon={HiTable}
        >
          Sign Up
        </Sidebar.Item>
      </Sidebar.ItemGroup>
      <Sidebar.ItemGroup>
        <Sidebar.Item
          href="#"
          icon={HiChartPie}
        >
          Upgrade to Pro
        </Sidebar.Item>
       
        
      </Sidebar.ItemGroup>
    </Sidebar.Items>
  </Sidebar>
            </Sidebar>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidepanel;