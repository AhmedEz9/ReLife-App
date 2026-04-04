import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        {/* Simple Navigation Bar */}
        <nav className="bg-white shadow p-4 text-center">
          <h1 className="text-3xl font-extrabold text-blue-600 tracking-tight">🌍 ReLife App</h1>
        </nav>

        {/* Dynamic Page Content */}
        <div className="flex-grow flex items-center justify-center p-6">
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;