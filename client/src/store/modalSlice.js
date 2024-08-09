// src/store/modalSlice.js
import { createSlice } from '@reduxjs/toolkit';
import {store} from "./store";

export const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        isOpen: false,
        isItemOpen: false,
    },
    reducers: {
        openModal: (state) => {
            state.isOpen = true;
        },
        closeModal: (state) => {
            state.isOpen = false;
        },
        openItem: (state) => {
            state.isItemOpen = true;
        },
        closeItem: (state) => {
            state.isItemOpen = false;
        }
    },
});

export const { openModal, closeModal, openItem, closeItem } = modalSlice.actions;

export default modalSlice.reducer;