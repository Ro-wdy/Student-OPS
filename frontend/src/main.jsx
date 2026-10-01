import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css' // global styles
import App from './App.jsx'

// Mount the React app into the #root div in index.html
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
