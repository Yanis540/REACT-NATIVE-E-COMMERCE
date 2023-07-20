import { QueryClientProvider  , QueryClient} from '@tanstack/react-query';
import Navigator from './src/routes/Navigator';
import { ToastProvider } from 'react-native-toast-notifications'
import Stripe from './src/context/Stripe';
// import google from './src/lib/google';
import { useEffect } from 'react';
export default function App() {
  // useEffect(()=>{
  //   google.config(); 
  // },[])
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


