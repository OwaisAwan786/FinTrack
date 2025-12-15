import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Goals from './pages/Goals';
import Advisor from './pages/Advisor';
import { FinTrackProvider } from './context/FinTrackContext';

function App() {
  return (
    <FinTrackProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="goals" element={<Goals />} />
            <Route path="advisor" element={<Advisor />} />
          </Route>
        </Routes>
      </Router>
    </FinTrackProvider>
  );
}

export default App;
