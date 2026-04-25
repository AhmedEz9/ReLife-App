import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Upload from './pages/Upload';
import Feed from './pages/Feed';
import Profile from './pages/Profile'; 
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-emerald-100 flex flex-col font-sans text-gray-800">
        
        {/* Dark, frosted-glass header matching the footer */}
        <nav className="bg-emerald-950/95 backdrop-blur-md border-b-4 border-emerald-500 shadow-lg sticky top-0 z-50 transition-all duration-300">
          <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
            
            <div className="flex items-center space-x-8">
              {/* ReLife Title (Clickable) */}
              <Link to="/feed" className="flex items-center gap-2 group">
                <span className="text-3xl transition-transform group-hover:scale-110 duration-300">🌍</span>
                <h1 className="text-3xl font-black text-white tracking-tight drop-shadow-md">
                  Re<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Life</span>
                </h1>
              </Link>
              
              {/* Link Colors Updated to Stand Out on Dark Background */}
              <Link to="/feed" className="text-emerald-50 font-bold hover:text-white hover:underline decoration-2 underline-offset-4 transition duration-200">
                Browse Items
              </Link>
            </div>
            
            <div className="space-x-6 flex items-center">
              <Link to="/login" className="text-emerald-200/80 font-semibold hover:text-white transition">Login</Link>
              <Link to="/register" className="text-emerald-200/80 font-semibold hover:text-white transition">Register</Link>
              
              <Link to="/profile" className="text-emerald-400 font-bold hover:text-emerald-300 transition">My Profile</Link>
              
              <Link to="/upload" className="bg-gradient-to-r from-green-500 to-emerald-500 text-emerald-950 px-5 py-2.5 rounded-full font-bold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 border border-emerald-400">
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
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>

        <Footer />
        
      </div>
    </Router>
  );
}

export default App;