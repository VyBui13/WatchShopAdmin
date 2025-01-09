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
import { ConfirmPromptProvider } from './components/ConfirmPromptContext.jsx';
import ConfirmPrompt from './components/ConfirmPrompt.jsx';

function MainApp() {
  const { isLoading } = useLoading();

  return (
    <>
      <Notify />
      <ConfirmPrompt />
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
      <ConfirmPromptProvider>
        <NotificationProvider>
          <AuthorizationProvider>
            <MainApp />
          </AuthorizationProvider>
        </NotificationProvider>
      </ConfirmPromptProvider>
    </LoadingProvider>
  </StrictMode>
);
