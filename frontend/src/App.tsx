import './App.css'
import React from "react"

import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import Root from "./routes/root.tsx";
import Tasks from "./routes/tasks.tsx";
import Activities from "./routes/activities.tsx";
import Dashboard from "./routes/dashboard.tsx";

function App() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route>
                <Route path="/" element={<Root/>}/>
                <Route path="/tasks" element={<Tasks/>}/>
                <Route path="/activities" element={<Activities />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Route>

        )
    )

  return (
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
  )
}

export default App
