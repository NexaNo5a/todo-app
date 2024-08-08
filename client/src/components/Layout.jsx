import React from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from './SideBar';
import TodoFormModal from "./TodoFormModal";

const Layout = () => {
    return (
        <div className="flex min-h-screen  relative">
            <SideBar />

            <div className="flex flex-grow relative z-10">
                <Outlet/>

                    <TodoFormModal/>


            </div>

        </div>
    );
};

export default Layout;