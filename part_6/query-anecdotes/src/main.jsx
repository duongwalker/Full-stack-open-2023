import ReactDOM from 'react-dom/client'
import App from './App'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import { ReactQueryDevtools } from 'react-query-devtools';
import { NotiContextProvider } from './NotiContext'
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <NotiContextProvider>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </NotiContextProvider>
)