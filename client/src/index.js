import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AuthContextProvider from './context/AuthContext';
import FoodContextProvider from './context/FoodContext';
import StoreContextProvider from './context/StoreContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <StoreContextProvider>
        <FoodContextProvider>
          <App />
        </FoodContextProvider>
      </StoreContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
