import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/index.css';
import Dashboard from './Dashboard.jsx';
import Login from './pages/Login.jsx';
import { AuthorizationProvider } from './components/AuthorizationContext.jsx';
import { NotificationProvider } from './components/NotificationContext.jsx';
import { LoadingProvider } from './components/LoadingContext.jsx';
import Notify from './components/Notify.jsx';
import Loading from './components/Loading.jsx';
import { useLoading } from './components/LoadingContext.jsx';

function MainApp() {
  const { isLoading } = useLoading();

  return (
    <>
      <Notify />
      {isLoading && <Loading />}
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LoadingProvider>
      <NotificationProvider>
        <AuthorizationProvider>
          <MainApp />
        </AuthorizationProvider>
      </NotificationProvider>
    </LoadingProvider>
  </StrictMode>
);
