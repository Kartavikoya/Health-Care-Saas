import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.tsx'
import AppRoutes from './app/routes/AppRoutes.tsx'

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch((error) => {
      console.error('Service worker registration failed:', error)
    })
  })
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppRoutes />
    
  </StrictMode>,
  
)
