import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
    name: 'todo',
    initialState: { items: [] },
    reducers: {
        setTodos: (state, action) => { state.items = action.payload; },
        addTodo: (state, action) => { state.items.push(action.payload); },
        updateTodo: (state, action) => {
            const index = state.items.findIndex(todo => todo._id === action.payload._id);
            if (index !== -1) state.items[index] = action.payload;
        },
    },
});

export const { setTodos, addTodo, updateTodo } = todoSlice.actions;
export default todoSlice.reducer;