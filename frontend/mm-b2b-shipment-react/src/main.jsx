import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {ChakraProvider, createStandaloneToast, DarkMode} from "@chakra-ui/react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import AuthProvider from "./components/context/AuthContext.jsx";
import Login from "./components/login/Login.jsx";
import ProtectedRoute from "./components/shared/ProtectedRoute.jsx";
import Signup from "./components/signup/Signup.jsx";
import Home from "./pages/Home.jsx";
import Shipment from "./pages/Shipment.jsx";
import Warehouses from "./pages/Warehouses.jsx";
import TranportationRoutes from "./pages/TransportationRoutes.jsx";
import Transport from "./pages/Transport.jsx";
import WarehouseRequests from "./pages/WarehouseRequests.jsx";
import TransportationRequests from "./pages/TransportationRequests.jsx";
import LogisticianRequests from "./pages/LogisticianRequests.jsx";
import UserProfile from "./pages/UserProfile.jsx";

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
                                           element: <ProtectedRoute><Home/></ProtectedRoute>
                                       },
                                       {
                                           path: "/calculate",
                                           element: <ProtectedRoute><Shipment/></ProtectedRoute>
                                       },
                                       {
                                           path: "/warehouse",
                                           element: <ProtectedRoute><Warehouses/></ProtectedRoute>
                                       },
                                       {
                                           path: "/service",
                                           element: <ProtectedRoute><TranportationRoutes/></ProtectedRoute>
                                       },
                                       {
                                           path: "/transport",
                                           element: <ProtectedRoute><Transport/></ProtectedRoute>
                                       },
                                       {
                                           path: "/warehousereqs",
                                           element: <ProtectedRoute><WarehouseRequests/></ProtectedRoute>
                                       },
                                       {
                                           path: "/servicereqs",
                                           element: <ProtectedRoute><TransportationRequests/></ProtectedRoute>
                                       },
                                       {
                                           path: "/myrequests",
                                           element: <ProtectedRoute><LogisticianRequests/></ProtectedRoute>
                                       },
                                       {
                                           path: "/profile",
                                           element: <ProtectedRoute><UserProfile/></ProtectedRoute>
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
