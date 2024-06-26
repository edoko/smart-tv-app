import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App'
import './index.css'

if (!import.meta.env.VITE_API_KEY) {
  throw new Error('VITE_API_KEY is not defined')
}

function initializeTizen() {
  if (typeof window !== 'undefined' && (window as any).tizen) {
    ;(window as any).tizen.tvinputdevice.registerKeyBatch([
      'MediaPlay',
      'MediaPause',
      'MediaFastForward',
      'MediaRewind',
      'MediaStop',
    ])
  }
}

initializeTizen()

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <App />
      </HashRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>,
)
