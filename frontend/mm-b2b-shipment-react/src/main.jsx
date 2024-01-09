import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {ChakraProvider, DarkMode} from "@chakra-ui/react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import AuthProvider from "./components/context/AuthContext.jsx";
import Login from "./components/login/Login.jsx";
import {createStandaloneToast} from '@chakra-ui/react'
import ProtectedRoute from "./components/shared/ProtectedRoute.jsx";
import Signup from "./components/signup/Signup.jsx";
import Home from "./pages/Home.jsx";
import CalculateRoutes from "./pages/CalculateRoutes.jsx";
import Warehouses from "./pages/Warehouses.jsx";
import Shipments from "./pages/Shipments.jsx";

const {ToastContainer, toast} = createStandaloneToast()

const router = createBrowserRouter([
    {
        path: "",
        element: <Login/>
    },
    {
        path: "/signup",
        element: <Signup/>
    },
    {
        path: "/main",
        element: <ProtectedRoute><Home /></ProtectedRoute>
    },
    {
        path: "/calculate",
        element: <ProtectedRoute><CalculateRoutes/></ProtectedRoute>
    },
    {
        path: "/warehouse",
        element:<ProtectedRoute><Warehouses/></ProtectedRoute>
    },
    {
        path: "/service",
        element: <ProtectedRoute><Shipments/></ProtectedRoute>
    }
])

ReactDOM
    .createRoot(document.getElementById('root'))
    .render(
        <React.StrictMode>
            <ChakraProvider>
                <AuthProvider>
                    <DarkMode>
                        <RouterProvider router={router}/>
                    </DarkMode>
                </AuthProvider>
                <ToastContainer/>
            </ChakraProvider>
        </React.StrictMode>,
    )
