import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import './index.scss'

import SignupPage from './pages/SignupPage';
import HomePage from './pages/HomePage';

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />
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
