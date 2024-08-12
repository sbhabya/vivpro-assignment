import React from 'react'
import {createBrowserRouter} from "react-router-dom";
import {RouterProvider} from 'react-router-dom'
import Dashboard from './components/Dashboard'

const App = () => {
    const appRouter = createBrowserRouter([
        {
            path: "/",
            element: <Dashboard/>,
        },

    ]);

    return (
        <div>
            <RouterProvider router={appRouter}></RouterProvider>
        </div>
    )
}

export default App