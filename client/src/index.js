import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AuthContextProvider from './context/AuthContext';
import FoodContextProvider from './context/FoodContext';
import StoreContextProvider from './context/StoreContext';
import BasketContextProvider from './context/BasketContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BasketContextProvider>
      <AuthContextProvider>
        <StoreContextProvider>
          <FoodContextProvider>
            <App />
          </FoodContextProvider>
        </StoreContextProvider>
      </AuthContextProvider>
    </BasketContextProvider>
  </React.StrictMode>
);
