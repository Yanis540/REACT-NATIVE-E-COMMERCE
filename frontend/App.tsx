import { QueryClientProvider  , QueryClient} from '@tanstack/react-query';
import Navigation from './src/routes/TabNavigator';

export default function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Navigation /> 
    </QueryClientProvider>
  );
}


