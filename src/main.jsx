import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'rsuite/dist/rsuite.css';
import { ToastContainer } from 'react-toastify';
import { ProductProvider } from './Context/productContext.jsx';

createRoot(document.getElementById('root')).render(
  <ProductProvider>
    <App />
    <ToastContainer />
  </ProductProvider>
)
