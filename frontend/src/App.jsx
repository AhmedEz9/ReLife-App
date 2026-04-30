import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { useState } from 'react'; 
import Login from './pages/Login';
import Register from './pages/Register';
import Upload from './pages/Upload';
import Feed from './pages/Feed';
import Profile from './pages/Profile'; 
import Footer from './components/Footer';

function App() {
  // State to track if the mobile menu is open
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Helper function to close menu when a link is clicked
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-emerald-100 flex flex-col font-sans text-gray-800">
        
        {/* Dark, frosted-glass header */}
        <nav className="bg-emerald-950/95 backdrop-blur-md border-b-4 border-emerald-500 shadow-lg sticky top-0 z-50 transition-all duration-300">
          <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
            
            <div className="flex items-center space-x-4 md:space-x-8">
              {/* ReLife Title (Clickable) */}
              <Link to="/feed" className="flex items-center gap-2 group" onClick={closeMenu}>
                <span className="text-3xl transition-transform group-hover:scale-110 duration-300">🌍</span>
                <h1 className="text-3xl font-black text-white tracking-tight drop-shadow-md">
                  Re<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Life</span>
                </h1>
              </Link>
              
              {/* Desktop 'Browse Items' (Hidden on mobile) */}
              <Link to="/feed" className="hidden md:block text-emerald-50 font-bold hover:text-white hover:underline decoration-2 underline-offset-4 transition duration-200">
                Browse Items
              </Link>
            </div>
            
            {/* Desktop Navigation Links (Hidden on mobile) */}
            <div className="hidden md:flex space-x-6 items-center">
              <Link to="/login" className="text-emerald-200/80 font-semibold hover:text-white transition">Login</Link>
              <Link to="/register" className="text-emerald-200/80 font-semibold hover:text-white transition">Register</Link>
              <Link to="/profile" className="text-emerald-400 font-bold hover:text-emerald-300 transition">My Profile</Link>
              <Link to="/upload" className="bg-gradient-to-r from-green-500 to-emerald-500 text-emerald-950 px-5 py-2.5 rounded-full font-bold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 border border-emerald-400">
                + Upload
              </Link>
            </div>

            {/* Mobile Hamburger Button (Hidden on desktop) */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-emerald-50 text-3xl focus:outline-none hover:text-white transition-colors"
            >
              {isMenuOpen ? '✕' : '☰'}
            </button>
          </div>

          {/* Mobile Dropdown Menu */}
          {isMenuOpen && (
            <div className="md:hidden bg-emerald-900 border-t-2 border-emerald-800 flex flex-col items-center py-6 space-y-5 shadow-xl">
              <Link to="/feed" onClick={closeMenu} className="text-emerald-50 font-bold text-xl">Browse Items</Link>
              <Link to="/login" onClick={closeMenu} className="text-emerald-200/80 font-semibold text-xl">Login</Link>
              <Link to="/register" onClick={closeMenu} className="text-emerald-200/80 font-semibold text-xl">Register</Link>
              <Link to="/profile" onClick={closeMenu} className="text-emerald-400 font-bold text-xl">My Profile</Link>
              <div className="pt-2 w-full px-8">
                <Link to="/upload" onClick={closeMenu} className="block text-center bg-gradient-to-r from-green-500 to-emerald-500 text-emerald-950 px-5 py-3 rounded-full font-bold shadow-md border border-emerald-400 text-xl">
                  + Upload
                </Link>
              </div>
            </div>
          )}
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