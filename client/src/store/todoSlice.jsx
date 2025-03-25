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
        deleteTodo: (state, action) => {
            state.items = state.items.filter(todo => todo._id !== action.payload);
        },
        toggleCompleteStatus: (state, action) => {
            const id = action.payload;
            const todo = state.items.find(todo => todo._id === id );
            if (todo) {
                todo.completed = !todo.completed;
            }
        },
        revertCompleteStatus: (state, action) => {
            const id = action.payload;
            const todo = state.items.find(todo => todo._id === id);
            if (todo) {
                todo.completed = !todo.completed;
            }
        }
    },
});

export const { setTodos, addTodo, updateTodo, deleteTodo ,toggleCompleteStatus, revertCompleteStatus} = todoSlice.actions;
export default todoSlice.reducer;