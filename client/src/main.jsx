import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ClerkProvider } from '@clerk/clerk-react'
import { AppProvider } from './context/AppContext.jsx'

const PUBLISHABLE_KEY = import.meta.env.pk_test_aGVhbHRoeS1waG9lbml4LTU0LmNsZXJrLmFjY291bnRzLmRldiQ

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}


createRoot(document.getElementById('root')).render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <BrowserRouter>
      <AppProvider>
        <App />
      </AppProvider>
    </BrowserRouter>
  </ClerkProvider>,
)
