import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [text, setText] = useState('');
  const [translated, setTranslated] = useState('');
  const [lang, setLang] = useState('en');
  const [loading, setLoading] = useState(false);

  // Full backend URL
  const apiUrl = "https://classbridge-backend.onrender.com"; // Replace if your Render URL is different

  const handleTranslate = async () => {
    if (!text.trim()) {
      alert('Please enter some text to translate!');
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(`${apiUrl}/api/translate`, { text, to: lang });
      setTranslated(res.data.translatedText);
    } catch (err) {
      console.error(err);
      setTranslated(text + ' (translation failed)');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '600px', margin: 'auto' }}>
      <h1 style={{ textAlign: 'center' }}>ClassBridge Translator</h1>

      <textarea
        rows={5}
        cols={50}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type or speak something..."
        style={{ width: '100%', padding: '0.5rem', fontSize: '1rem' }}
      />

      <div style={{ margin: '1rem 0', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <label htmlFor="lang">Select Language:</label>
        <select
          id="lang"
          value={lang}
          onChange={(e) => setLang(e.target.value)}
          style={{ padding: '0.3rem 0.5rem', fontSize: '1rem' }}
        >
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="te">Telugu</option>
          <option value="fr">French</option>
          <option value="es">Spanish</option>
        </select>
      </div>

      <button
        onClick={handleTranslate}
        style={{
          padding: '0.5rem 1rem',
          fontSize: '1rem',
          cursor: 'pointer',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px'
        }}
        disabled={loading}
      >
        {loading ? 'Translating...' : 'Translate'}
      </button>

      <div style={{ marginTop: '1.5rem' }}>
        <h3>Translated Text:</h3>
        <p style={{ backgroundColor: '#f1f1f1', padding: '1rem', borderRadius: '5px', minHeight: '50px' }}>
          {translated}
        </p>
      </div>
    </div>
  );
}

export default App;
