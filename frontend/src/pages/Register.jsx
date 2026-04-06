import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, username, password })
      });
      const data = await response.json();
      if (response.ok) {
        setIsError(false);
        setMessage('Registration successful! You can now log in.');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setIsError(true);
        setMessage(data.error || 'Registration failed.');
      }
    } catch (error) {
      console.error(error);
      setIsError(true);
      setMessage('Server error. Is the backend running?');
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-md p-10 rounded-3xl shadow-xl border border-white max-w-md w-full relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute -top-10 -left-10 w-32 h-32 bg-emerald-400 rounded-full mix-blend-multiply filter blur-2xl opacity-20"></div>
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-green-400 rounded-full mix-blend-multiply filter blur-2xl opacity-20"></div>

      <div className="relative z-10">
        <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-green-600 mb-2 text-center drop-shadow-sm">
          Join ReLife
        </h2>
        <p className="text-gray-500 text-center mb-8 font-medium">Start recycling and sharing today.</p>

        {message && (
          <div className={`p-4 mb-6 rounded-xl text-sm font-bold text-center shadow-sm ${isError ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-green-50 text-green-600 border border-green-100'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2 ml-1">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 pl-4 rounded-xl border border-gray-200 bg-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:bg-white transition-all shadow-inner text-gray-700"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2 ml-1">Username</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 pl-4 rounded-xl border border-gray-200 bg-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:bg-white transition-all shadow-inner text-gray-700"
              placeholder="EcoWarrior99"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2 ml-1">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 pl-4 rounded-xl border border-gray-200 bg-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:bg-white transition-all shadow-inner text-gray-700"
              placeholder="••••••••"
              required
            />
          </div>
          
          <button type="submit" className="w-full bg-gradient-to-r from-emerald-500 to-green-500 text-white font-bold py-3.5 rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-200 mt-2">
            Create Account
          </button>
        </form>

        <p className="text-center text-gray-500 mt-6 text-sm font-medium">
          Already have an account? <Link to="/login" className="text-emerald-600 hover:text-emerald-700 font-bold hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;