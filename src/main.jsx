import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import './index.scss'
import App from './App.jsx'
import { CatogoriesProvider } from './components/contexts/categories.context.jsx'
import { CartProvider } from './components/contexts/cart.context.jsx'
import { store } from './store/store.js'




createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <CatogoriesProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </CatogoriesProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode >
)
