import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {CookiesProvider} from "react-cookie";

import { ThemeProvider } from './context/ThemeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </ThemeProvider>
);

reportWebVitals();
