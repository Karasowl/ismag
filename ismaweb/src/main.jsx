import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import GraciasPageNewsletter from './GraciasPageNewsletter';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import ConfirmacionPageNewsletter from './ConfirmacionPageNewsletter';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route exact path="/" element={<App />} />
        <Route exact path="/gracias_newsletter" element={<GraciasPageNewsletter />} />
        <Route exact path="/newsletter_confirmacion" element={<ConfirmacionPageNewsletter />} />
      </Routes>
    </Router>
  </React.StrictMode>
);