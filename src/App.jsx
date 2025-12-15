import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Goals from './pages/Goals';
import Advisor from './pages/Advisor';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Transfer from './pages/Transfer';
import Bills from './pages/Bills';
import Cards from './pages/Cards';
import Profile from './pages/Profile';
import { FinTrackProvider, useFinTrack } from './context/FinTrackContext';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user } = useFinTrack();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Public Route Component (redirects to dashboard if already logged in)
const PublicRoute = ({ children }) => {
  const { user } = useFinTrack();
  if (user) {
    return <Navigate to="/" replace />;
  }
  return children;
};

function AppContent() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />

        <Route path="/" element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }>
          <Route index element={<Dashboard />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="goals" element={<Goals />} />
          <Route path="advisor" element={<Advisor />} />
          <Route path="transfer" element={<Transfer />} />
          <Route path="bills" element={<Bills />} />
          <Route path="cards" element={<Cards />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <FinTrackProvider>
      <AppContent />
    </FinTrackProvider>
  );
}

export default App;
