import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './app'
import './index.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const tanStackQueryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={tanStackQueryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
)
