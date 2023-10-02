import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./components/Layout";
import ErrorPage from "./components/ErrorPage";

import Index, { loader as clientsLoader } from "./pages/Index";
import NewClient, { action as newClientAction } from "./pages/NewClient";
import EditClient, {
    loader as editClientLoader,
    action as editClientAction,
} from "./pages/EditClient";

// createBrowserRouter Permite crear un objeto con todas las rutas
// RouterProvider sera el componmente origen

const router = createBrowserRouter([
    {
        path: "/", // url
        element: <Layout />, // Contenido de la url
        children: [
            // todo lo que este en children aplica el diseño del layout (loq ue haya en element)
            // Se coloca en "<Outlet />"
            {
                index: true, // Indica que este contenido sera el que se vea en el index (/)
                element: <Index />,
                loader: clientsLoader,
                errorElement: <ErrorPage />,
            },
            {
                path: "/clients/new", // url
                element: <NewClient />, // Contenido de la url
                action: newClientAction,
            },
            {
                path: "/clients/:clientId/editClient",
                element: <EditClient />,
                loader: editClientLoader,
                action: editClientAction,
                errorElement: <ErrorPage />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
