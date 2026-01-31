import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AgenticManagerPage from './pages/AgenticManagerPage';
import DashboardPage from './pages/DashboardPage';
import DigitalTwinPage from './pages/DigitalTwinPage';

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AgenticManagerPage />} />
        <Route path="/geopolitical-analysis" element={<DashboardPage />} />
        <Route path="/digital-twin" element={<DigitalTwinPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
