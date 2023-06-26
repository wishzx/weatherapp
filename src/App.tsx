import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import Home from './Home';
import { MantineProvider } from '@mantine/core';
import ErrorBoundary from './ErrorBoundary';
import { Notifications } from '@mantine/notifications';
import ReactDOM from 'react-dom/client';
import { queryClient, theme } from './utils';

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
