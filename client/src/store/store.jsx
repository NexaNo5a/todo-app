import { configureStore } from '@reduxjs/toolkit';
import modalReducer from './modalSlice';
import authReducer from './authSlice'
import todoReducer from './todoSlice'

export const store = configureStore({
    reducer: {
        modal: modalReducer,
        auth: authReducer,
        todo: todoReducer,
    },
});