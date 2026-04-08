import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Upload from './pages/Upload';
import Feed from './pages/Feed';
import Profile from './pages/Profile'; 

function App() {
  return (
    <Router>
      {/* Soft gradient background */}
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-emerald-100 flex flex-col font-sans text-gray-800">
        
        {/* Sticky frosted-glass navigation bar */}
        <nav className="bg-white/70 backdrop-blur-md border-b border-white/50 shadow-sm sticky top-0 z-50 transition-all duration-300">
          <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-8">
              <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500 tracking-tight drop-shadow-sm">
                🌍 ReLife
              </h1>
              <Link to="/feed" className="text-gray-600 font-bold hover:text-green-600 transition duration-200">Browse Items</Link>
            </div>
            
            <div className="space-x-4 flex items-center">
              <Link to="/login" className="text-gray-500 font-semibold hover:text-green-600 transition">Login</Link>
              <Link to="/register" className="text-gray-500 font-semibold hover:text-green-600 transition">Register</Link>
              
              {/* Added Profile Link here! */}
              <Link to="/profile" className="text-emerald-600 font-bold hover:text-emerald-700 transition">My Profile</Link>
              
              <Link to="/upload" className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-5 py-2.5 rounded-full font-bold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200">
                + Upload
              </Link>
            </div>
          </div>
        </nav>

        {/* Dynamic Page Content */}
        <div className="flex-grow p-6 flex justify-center w-full">
          <Routes>
            <Route path="/" element={<Navigate to="/feed" />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/upload" element={<Upload />} />
            
            {/* Added Profile Route here! */}
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;