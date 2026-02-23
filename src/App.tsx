import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

// Pages
import Dashboard from './pages/Dashboard';
import Campaigns from './pages/Campaigns';
import Contacts from './pages/Contacts';
import Templates from './pages/Templates';
import Settings from './pages/Settings';
import ApiKeys from './pages/ApiKeys';
import Billing from './pages/Billing';
import Docs from './pages/Docs';
import Logs from './pages/Logs';
import Analytics from './pages/Analytics';
import Landing from './pages/Landing';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/campaigns" element={<Campaigns />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/api-keys" element={<ApiKeys />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/logs" element={<Logs />} />
          <Route path="/analytics" element={<Analytics />} />
          
          {/* Fallback for routes in development */}
          <Route path="*" element={
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <h2 className="text-xl font-medium text-gray-700 mb-2">Em desenvolvimento</h2>
              <p className="text-sm">Esta página será implementada em breve.</p>
            </div>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

