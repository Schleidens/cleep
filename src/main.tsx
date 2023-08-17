import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import './index.scss'

import SignupPage from './pages/SignupPage';

const router = createBrowserRouter([
    {
        path: "/",
        element: <div>I'm the home page</div>
    },
    {
      path: "/signup",
      element: <SignupPage />
    }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
