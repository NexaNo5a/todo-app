import React from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from './SideBar';
import TodoFormModal from "./TodoFormModal";
import TodoEditItem from "./TodoEditItem";
import Profile from "./Profile";
const Layout = () => {
    return (
        <div className="flex h-screen  relative">
            <SideBar />
            <div className="flex flex-grow relative">
                <Outlet/>
            </div>
            <TodoEditItem />
            <TodoFormModal/>
            <Profile />
        </div>
    );
};

export default Layout;