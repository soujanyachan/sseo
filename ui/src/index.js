import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

const router = createBrowserRouter([
    {
        path: "/",
        element: <ErrorBoundary fallback={<div>Something went wrong! Please try again later.</div>}>
            <App />
        </ErrorBoundary>,
    }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);