import { BrowserRouter } from 'react-router-dom'
import ReactDOM  from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {CartProvider} from './Components/Context/CartContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <CartProvider>
      <App />
    </CartProvider>
  </BrowserRouter>
)
