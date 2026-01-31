import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import AgenticManagerPage from './pages/AgenticManagerPage';
import DigitalTwinPage from './pages/DigitalTwinPage';

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/agentic-manager" element={<AgenticManagerPage />} />
        <Route path="/digital-twin" element={<DigitalTwinPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
