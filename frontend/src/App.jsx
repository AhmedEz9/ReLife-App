import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Upload from './pages/Upload'; 

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        {/* Navigation Bar */}
        <nav className="bg-white shadow p-4 flex justify-between items-center">
          <h1 className="text-2xl font-extrabold text-blue-600 tracking-tight">🌍 ReLife</h1>
          
          {/* Quick Links */}
          <div className="space-x-4">
            <Link to="/login" className="text-gray-600 font-semibold hover:text-blue-600">Login</Link>
            <Link to="/register" className="text-gray-600 font-semibold hover:text-blue-600">Register</Link>
            <Link to="/upload" className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-bold hover:bg-blue-200">Upload Media</Link>
          </div>
        </nav>

        {/* Dynamic Page Content */}
        <div className="flex-grow flex items-center justify-center p-6">
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/upload" element={<Upload />} /> {}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;