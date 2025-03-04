import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import LogInPage from "../pages/LogInPage";
import SignUpPage from "../pages/SignUpPage";
import SideBar from "../components/SideBar";
import UpcomingPage from "../pages/UpcomingPage";
import FlaggedPage from "../pages/FlaggedPage";
import Layout from "../components/Layout";
import ProtectedRoute from '../components/ProtectedRoute';


const AppRoutes = () => (
    <Router>
        <Routes>
            <Route path="/login" element={<LogInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route element={ <ProtectedRoute />} >
                <Route path="/" element={<Layout />} >
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/upcoming" element={<UpcomingPage />} />
                    <Route path="/flagged" element={<FlaggedPage />} />
                </Route>
            </Route>
        </Routes>
    </Router>
);

export default AppRoutes;