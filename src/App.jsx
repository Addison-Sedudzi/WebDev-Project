import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import GuestRoute from './components/GuestRoute';

import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Home from './pages/Home';
import Converter from './pages/Converter';
import Simulator from './pages/Simulator';
import ImprovementPlanner from './pages/ImprovementPlanner';
import Scholarships from './pages/ScholarshipChecker';
import Profile from './pages/Profile';
import LiteracyHub from './pages/LiteracyHub';
import Readiness from './pages/Readiness';
import GoalTracker from './pages/GoalTracker';
import GPAComparison from './pages/GPAComparison';
import NotFound from './pages/NotFound';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ToastProvider>
          <div className="app-container">
            <Navbar />
            <main>
              <Routes>
                {/* Public Routes — redirect to home if already logged in */}
                <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
                <Route path="/register" element={<GuestRoute><Register /></GuestRoute>} />
                <Route path="/forgot-password" element={<GuestRoute><ForgotPassword /></GuestRoute>} />
                <Route path="/reset-password" element={<GuestRoute><ResetPassword /></GuestRoute>} />

                {/* Protected Routes */}
                <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                <Route path="/converter" element={<ProtectedRoute><Converter /></ProtectedRoute>} />
                <Route path="/simulator" element={<ProtectedRoute><Simulator /></ProtectedRoute>} />
                <Route path="/planner" element={<ProtectedRoute><ImprovementPlanner /></ProtectedRoute>} />
                <Route path="/scholarships" element={<ProtectedRoute><Scholarships /></ProtectedRoute>} />
                <Route path="/literacy" element={<ProtectedRoute><LiteracyHub /></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path="/readiness" element={<ProtectedRoute><Readiness /></ProtectedRoute>} />
                <Route path="/goals" element={<ProtectedRoute><GoalTracker /></ProtectedRoute>} />
                <Route path="/comparison" element={<ProtectedRoute><GPAComparison /></ProtectedRoute>} />

                {/* 404 Catch-All */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
