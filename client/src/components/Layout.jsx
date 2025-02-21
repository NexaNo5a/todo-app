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
            <div className="flex flex-grow relative z-10">
                <TodoEditItem />
                <TodoFormModal/>
                <Profile />
                <Outlet/>
            </div>
        </div>
    );
};

export default Layout;