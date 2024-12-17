import React from 'react';
import PageRoutes from "./routes";
import './styles/global.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="w-full Roboto Condensed">
        <PageRoutes/>
      </div>
    </QueryClientProvider>
  );
}

