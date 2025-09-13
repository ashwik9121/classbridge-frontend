import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [text, setText] = useState('');
  const [translated, setTranslated] = useState('');
  const [lang, setLang] = useState('en');
  const [loading, setLoading] = useState(false);

  const apiUrl = "https://classbridge-backend.onrender.com"; // Replace with your Render backend URL

  // Translate text
  const handleTranslate = async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const res = await axios.post(`${apiUrl}/api/translate`, { text, to: lang });
      console.log("API response:", res.data);
      setTranslated(res.data.translatedText);
    } catch (err) {
      console.error(err);
      setTranslated(text + ' (translation failed)');
    } finally {
      setLoading(false);
    }
  };

  // Voice input
  const handleSpeech = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser does not support speech recognition.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = lang === "hi" ? "hi-IN" : lang === "te" ? "te-IN" : "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();

    recognition.onresult = (event) => {
      const spokenText = event.results[0][0].transcript;
      setText(spokenText);
      handleTranslate();
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: 'auto', fontFamily: 'sans-serif' }}>
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
        <label>Select Language:</label>
        <select value={lang} onChange={(e) => setLang(e.target.value)}>
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="te">Telugu</option>
          <option value="fr">French</option>
          <option value="es">Spanish</option>
        </select>
        <button onClick={handleSpeech} style={{ padding: '0.3rem 0.5rem' }}>🎤 Speak</button>
      </div>

      <button
        onClick={handleTranslate}
        disabled={loading}
        style={{
          padding: '0.5rem 1rem',
          fontSize: '1rem',
          cursor: 'pointer',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px'
        }}
      >
        {loading ? 'Translating...' : 'Translate'}
      </button>

      <div style={{ marginTop: '1rem' }}>
        <h3>Translated Text:</h3>
        <p style={{ backgroundColor: '#f1f1f1', padding: '1rem', minHeight: '50px' }}>
          {translated}
        </p>
      </div>
    </div>
  );
}

export default App;
