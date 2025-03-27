import React from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from './SideBar';
import TodoFormModal from "./AddTodoModal";
import ViewTodoModal from "./ViewTodoModal";
import UserMenu from "./UserMenu";
import AddTodoModal from "./AddTodoModal";
import NotificationStack from "./NotificationStack";
const Layout = () => {
    return (
        <div className="flex h-screen  relative">
            <SideBar />
            <div className="flex flex-grow relative">
                <Outlet/>
            </div>
            <ViewTodoModal />
            <AddTodoModal/>
            <NotificationStack />
        </div>
    );
};

export default Layout;