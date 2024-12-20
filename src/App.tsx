import React, { Suspense } from 'react';
import PageRoutes from "./routes";
import './styles/global.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast';
import { ErrorBoundary } from './components/shared/ErrorBoundary';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      staleTime: 360000,
    },
  },
})

export default function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<div className="w-full h-screen flex items-center justify-center">Đang tải...</div>}>
          <div className="w-full Roboto Condensed">
            <PageRoutes/>
            <Toaster
              position="top-right"
              containerClassName="!top-20 !right-1/2 !translate-x-1/2 md:!top-20 md:!right-5 md:!translate-x-0"
              toastOptions={{
                duration: 2000,
                className: 'mt-4 max-w-[90vw] text-center md:max-w-[400px] md:text-left',
                style: {
                  background: '#363636',
                  color: '#fff',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  fontSize: '14px',
                },
                success: {
                  duration: 3000,
                  style: {
                    background: '#4aed88',
                    color: '#fff',
                  },
                  iconTheme: {
                    primary: '#fff',
                    secondary: '#4aed88',
                  }
                },
              }}
            />
          </div>
        </Suspense>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

