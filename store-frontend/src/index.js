import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AuthContextProvider from './context/AuthContext';
import FoodContextProvider from './context/FoodContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <FoodContextProvider>
        <App />
      </FoodContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

