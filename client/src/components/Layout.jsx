import React from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from './SideBar';
import TodoFormModal from "./AddTodoModal";
import ViewTodoModal from "./ViewTodoModal";
import UserMenu from "./UserMenu";
import AddTodoModal from "./AddTodoModal";
const Layout = () => {
    return (
        <div className="flex h-screen  relative">
            <SideBar />
            <div className="flex flex-grow relative">
                <Outlet/>
            </div>
            <ViewTodoModal />
            <AddTodoModal/>
        </div>
    );
};

export default Layout;