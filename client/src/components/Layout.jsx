import React from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from './SideBar';
import TodoFormModal from "./TodoFormModal";

const Layout = () => {
    return (
        <div className="flex">
            <SideBar />
            <div className="flex-grow">
                <TodoFormModal />
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;