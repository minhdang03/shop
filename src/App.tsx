import React, { Suspense } from 'react';
import PageRoutes from "./routes";
import './styles/global.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast';
import { ErrorBoundary } from './components/shared/ErrorBoundary';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from "react-router-dom";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 phút
    },
  },
});

export default function App() {
  return (
    <HelmetProvider>
      <ErrorBoundary fallback={<div>Đã có lỗi xảy ra</div>}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <PageRoutes />
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 3000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
              }}
            />
          </BrowserRouter>
        </QueryClientProvider>
      </ErrorBoundary>
    </HelmetProvider>
  );
}

