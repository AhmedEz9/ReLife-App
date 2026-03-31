import { useState, useEffect } from 'react'
import './App.css'

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
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>🌍 ReLife App</h1>
      <h2>Connection Test</h2>
      
      <div style={{ padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '10px', marginTop: '20px', display: 'inline-block' }}>
        <h3>Server Status:</h3>
        <p style={{ color: backendMessage.includes('successful') ? 'green' : 'red', fontWeight: 'bold', fontSize: '1.2rem' }}>
          {backendMessage}
        </p>
      </div>
    </div>
  )
}

export default App