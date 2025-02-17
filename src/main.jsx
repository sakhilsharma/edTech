import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ClerkProvider } from '@clerk/clerk-react'

// Import your Publishable Key
const CLERK_KEY= import.meta.env.VITE_CLERK_KEY

if (!CLERK_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env.local file')
}
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={CLERK_KEY} afterSignOutUrl="/">
    <App />
  </ClerkProvider>
  </StrictMode>,
)
