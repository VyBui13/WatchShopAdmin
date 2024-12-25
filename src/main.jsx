import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './styles/index.css'
import Dashboard from './Dashboard.jsx'
import Login from './pages/Login.jsx'
import { AuthorizationProvider } from './components/AuthorizationContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthorizationProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </AuthorizationProvider>
  </StrictMode>,
)
