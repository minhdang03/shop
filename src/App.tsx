import React, { Suspense } from 'react';
import PageRoutes from "./routes";
import './styles/global.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast';
import { ErrorBoundary } from './components/shared/ErrorBoundary';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1
    }
  }
});

export default function App() {
  return (
    <ErrorBoundary fallback={<div>Đã có lỗi xảy ra</div>}>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<div>Đang tải...</div>}>
          <div className="min-h-screen bg-gray-50">
            <PageRoutes />
            <Toaster 
              position="top-right" 
              containerStyle={{
                top: 100
              }}
              containerClassName="px-4 sm:px-0"
            />
          </div>
        </Suspense>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

