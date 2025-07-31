import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';
import App from './App';

// Mount the main App component to the root DOM node
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

