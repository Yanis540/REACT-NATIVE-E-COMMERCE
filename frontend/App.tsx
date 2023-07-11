import { QueryClientProvider  , QueryClient} from '@tanstack/react-query';
import Navigator from './src/routes/Navigator';

export default function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Navigator /> 
    </QueryClientProvider>
  );
}


