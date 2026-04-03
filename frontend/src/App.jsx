import { useState, useEffect } from 'react'

function App() {
  const [backendMessage, setBackendMessage] = useState('Connecting to server...')

  useEffect(() => {
    fetch('http://localhost:5000/api/test-db')
      .then(response => response.json())
      .then(data => {
        setBackendMessage(data.message);
      })
      .catch(error => {
        console.error("Error fetching data: ", error);
        setBackendMessage('Error connecting to the backend.');
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
        <h1 className="text-4xl font-extrabold text-blue-600 mb-2">🌍 ReLife App</h1>
        <h2 className="text-xl font-semibold text-gray-500 mb-6">Sprint 2: Tailwind CSS Active</h2>
        
        <div className={`p-4 rounded-lg font-bold text-lg ${backendMessage.includes('successful') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {backendMessage}
        </div>
      </div>
    </div>
  )
}

export default App