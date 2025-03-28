import React from 'react';
import ReactDOM from 'react-dom/client';
import './input.css'
import { Provider } from 'react-redux';
import { store, persistor } from './store/store';
import { PersistGate } from "redux-persist/integration/react";
import App from "./App";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<>
    <Provider store={store}>
        <PersistGate loading={<div> Loading... </div>} persistor={persistor}>
        <App />
        </PersistGate>
    </Provider>
</>


);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
