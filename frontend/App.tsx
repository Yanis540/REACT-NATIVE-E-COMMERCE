import { QueryClientProvider  , QueryClient} from '@tanstack/react-query';
import Navigator from './src/routes/Navigator';
import { ToastProvider } from 'react-native-toast-notifications'
import Stripe from './src/context/Stripe';
export default function App() {
  const queryClient = new QueryClient();
  return (
  <Stripe>
    <ToastProvider>
      <QueryClientProvider client={queryClient}>
        <Navigator /> 
      </QueryClientProvider>
    </ToastProvider>
  </Stripe>
  );
}


