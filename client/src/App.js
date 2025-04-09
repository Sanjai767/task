// src/App.js
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'; // Import Router for routing
import './App.css';
import Profile from './components/profile/Profile'; // Import the Profile component

function App() {
  return (
    <Router>
      <div className="App">
        <Profile />
      </div>
    </Router>
  );
}

export default App;
