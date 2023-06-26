import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from './Home';
import { MantineProvider } from '@mantine/core';
import ErrorBoundary from './ErrorBoundary';
import { Notifications } from '@mantine/notifications';
import React from 'react';
import ReactDOM from 'react-dom/client';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 1000 * 60,
      cacheTime: 5 * 1000 * 60,
      refetchOnWindowFocus: false,
    },
  },
});

export const theme = {
  //headings: { fontFamily: 'sans-serif' },
};

export const orangeCustom = '#EC6E4C';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <MantineProvider theme={theme}>
          <Notifications />

          <QueryClientProvider client={queryClient}>
            <ErrorBoundary>
              <Routes>
                <Route path="/" element={<Home />} />
              </Routes>
            </ErrorBoundary>
          </QueryClientProvider>
        </MantineProvider>
      </BrowserRouter>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(<App />);
