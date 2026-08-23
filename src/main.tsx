import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import { AppProvider } from '@/context'
import { App } from '@/App'
import '@/styles/global.css'

const Router = import.meta.env.BASE_URL === '/' ? BrowserRouter : HashRouter

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <AppProvider>
        <App />
      </AppProvider>
    </Router>
  </StrictMode>,
)
