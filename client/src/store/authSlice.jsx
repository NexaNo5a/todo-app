import { createSlice} from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        userId: null,
        token: null,
        isAuthenticated: false,
    },
    reducers: {
        setAuth: (state, action) => {
            state.userId = action.payload.userId;
            state.token = action.payload.token;
            state.isAuthenticated = true;
        },
        clearAuth: (state) => {
            state.userId = null;
            state.token = null;
            state.isAuthenticated = false;
        },
    },
});

export const {setAuth, clearAuth} = authSlice.actions;
export default authSlice.reducer;