import { QueryClientProvider  , QueryClient} from '@tanstack/react-query';
import Navigator from './src/routes/Navigator';
import { ToastProvider } from 'react-native-toast-notifications'
export default function App() {
  const queryClient = new QueryClient();
  return (
  <ToastProvider>
    <QueryClientProvider client={queryClient}>
      <Navigator /> 
    </QueryClientProvider>
  </ToastProvider>
  );
}


