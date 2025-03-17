// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import SentimentResults from './components/SentimentResults';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Link to="/" className="App-title">Social Media Sentiment Analysis</Link>
          <div className="header-actions">
            <button className="refresh-button">Refresh</button>
            <button className="toggle-button">Hide Results</button>
          </div>
        </header>

        <Routes>
          <Route path="/" element={<SentimentResults />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
