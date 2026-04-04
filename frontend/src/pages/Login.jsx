import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  
  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        setIsError(false);
        setMessage('Login successful!');
        // Save the digital ticket (token) securely in the browser
        localStorage.setItem('token', data.token);
        
        setTimeout(() => navigate('/'), 2000); 
      } else {
        setIsError(true);
        setMessage(data.error || 'Login failed.');
      }
    } catch (error) {
      setIsError(true);
      setMessage('Server error. Is the backend running?');
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">Welcome Back</h2>
      
      {message && (
        <div className={`p-3 mb-4 rounded-lg text-sm font-semibold text-center ${isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-gray-600 text-sm font-semibold mb-2">Email</label>
          <input 
            type="email" 
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-gray-600 text-sm font-semibold mb-2">Password</label>
          <input 
            type="password" 
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition duration-300">
          Sign In
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-500">
        Don't have an account? <Link to="/register" className="text-blue-600 font-semibold hover:underline">Register here</Link>
      </p>
    </div>
  );
}

export default Login;