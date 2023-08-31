import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App';
import './index.scss'

import AuthProvider from './authContext/main';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
)
