import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer} from "redux-persist";
import storage from 'redux-persist/lib/storage';
import modalReducer from './modalSlice';
import authReducer from './authSlice'
import todoReducer from './todoSlice'
import notificationReducer from "./notificationSlice";

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth', 'todos']
}

const rootReducer = combineReducers({
    auth: authReducer,
    todo: todoReducer,
    modal: modalReducer,
    notification: notificationReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    })
});

const persistor = persistStore(store);
export { store, persistor}