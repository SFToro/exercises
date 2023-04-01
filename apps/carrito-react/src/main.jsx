import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { CartProvider } from './context/cart'
import { FiltersProvider } from './context/filter'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <FiltersProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </FiltersProvider>
  </React.StrictMode>
)
