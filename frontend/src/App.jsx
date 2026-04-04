import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Upload from './pages/Upload';
import Feed from './pages/Feed'; 

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        {/* Navigation Bar */}
        <nav className="bg-white shadow p-4 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <h1 className="text-2xl font-extrabold text-green-600 tracking-tight">🌍 ReLife</h1>
            {/* link to the Feed in the main nav */}
            <Link to="/feed" className="text-gray-600 font-semibold hover:text-green-600 transition">Browse Items</Link>
          </div>
          
          <div className="space-x-4 flex items-center">
            <Link to="/login" className="text-gray-600 font-semibold hover:text-green-600 text-sm">Login</Link>
            <Link to="/register" className="text-gray-600 font-semibold hover:text-green-600 text-sm">Register</Link>
            <Link to="/upload" className="bg-green-100 text-green-700 px-4 py-2 rounded-lg font-bold hover:bg-green-200 transition">
              + Upload
            </Link>
          </div>
        </nav>

        {/* Dynamic Page Content */}
        <div className="flex-grow p-6 flex justify-center">
          <Routes>
            <Route path="/" element={<Navigate to="/feed" />} /> {}
            <Route path="/feed" element={<Feed />} /> {}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/upload" element={<Upload />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;