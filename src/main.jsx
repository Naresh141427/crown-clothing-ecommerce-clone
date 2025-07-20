import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { BrowserRouter } from 'react-router-dom'
import './index.scss'
import App from './App.jsx'
import { UserProvider } from './components/contexts/userContext.component.jsx'
import { CatogoriesProvider } from './components/contexts/categories.context.jsx'
import { CartProvider } from './components/contexts/cart.context.jsx'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <CatogoriesProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </CatogoriesProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>,
)
