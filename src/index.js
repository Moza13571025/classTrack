import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { MarkerProvider } from "./context/MarkerContext"; // 導入Context

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <MarkerProvider>
    <App />
  </MarkerProvider>
  </React.StrictMode>
);

reportWebVitals();