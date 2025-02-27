import { createSlice} from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        userId: null,
        token: null
    },
    reducers: {
        setAuth: (state, action) => {
            state.userId = action.payload.userId;
            state.token = action.payload.token;
        },
        clearAuth: (state) => {
            state.userId = null;
            state.token = null;
        },
    },
});

export const {setAuth, clearAuth} = authSlice.actions;
export default authSlice.reducer;