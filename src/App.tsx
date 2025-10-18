// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import UploadReport from './pages/UploadReport';
import ViewReport from './pages/ViewReport';
import AddVitals from './pages/AddVitals';
import Timeline from './pages/Timeline';
import Profile from './pages/Profile';
import "./styles/index.css"

function App() {
  return (
    <Router>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/upload" element={<UploadReport />} />
          <Route path="/report" element={<ViewReport />} />
          <Route path="/vitals" element={<AddVitals />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </AnimatePresence>
    </Router>
  );
}

export default App;