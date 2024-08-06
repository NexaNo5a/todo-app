import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//import RegisterPage from '../pages/RegisterPage';
import HomePage from '../pages/HomePage';
//import CreateTodo from '../components/CreateTodo';
//import EditTodo from '../components/EditTodo';
import LogInPage from "../pages/LogInPage";
import SignUpPage from "../pages/SignUpPage";

const AppRoutes = () => (
    <Router>
        <Routes>
            <Route path="/login" element={<LogInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/home" element={<HomePage />} />
        </Routes>
    </Router>
);

export default AppRoutes;