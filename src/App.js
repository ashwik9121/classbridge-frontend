import React from 'react';
import axios from 'axios';

function App() {
  const handleClick = async () => {
    try {
      const res = await axios.get('http://localhost:5000/test');
      alert(res.data.message);
    } catch (err) {
      alert('Backend not connected');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold text-blue-600">ClassBridge</h1>
      <button onClick={handleClick} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg">
        Test Backend
      </button>
    </div>
  );
}

export default App;