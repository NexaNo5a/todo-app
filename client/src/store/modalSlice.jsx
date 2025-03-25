// src/store/modalSlice.jsx
import { createSlice } from '@reduxjs/toolkit';
import {store} from "./store";

export const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        isOpen: false,
        isItemOpen: false,
        selectedTodo: null,
        isProfileOpen:false,
    },
    reducers: {
        openModal: (state) => {
            state.isOpen = true;
        },
        closeModal: (state) => {
            state.isOpen = false;
        },
        openItem: (state, action) => {
            state.isItemOpen = true;
            state.selectedTodo = action.payload;
        },
        closeItem: (state) => {
            state.isItemOpen = false;
        },

    },
});

export const { openModal, closeModal, openItem, closeItem, } = modalSlice.actions;

export default modalSlice.reducer;