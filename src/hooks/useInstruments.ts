
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Instrument {
  id: string;
  symbol: string;
  name: string;
  category: 'stock' | 'etf' | 'option' | 'crypto';
  current_price: number;
  price_change: number;
  price_change_percent: number;
  volume: number;
  market_cap?: number;
  created_at: string;
  updated_at: string;
}

export const useInstruments = () => {
  return useQuery({
    queryKey: ['instruments'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('instruments')
        .select('*');
      
      if (error) {
        console.error('Instruments fetch error:', error);
        // Return mock data for demo
        return [
          {
            id: '1',
            symbol: 'AAPL',
            name: 'Apple Inc.',
            category: 'stock' as const,
            current_price: 155.50,
            price_change: 2.25,
            price_change_percent: 1.47,
            volume: 89234567,
            market_cap: 2500000000000,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          {
            id: '2',
            symbol: 'GOOGL',
            name: 'Alphabet Inc.',
            category: 'stock' as const,
            current_price: 72.25,
            price_change: -0.75,
            price_change_percent: -1.03,
            volume: 45678912,
            market_cap: 1800000000000,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          {
            id: '3',
            symbol: 'TSLA',
            name: 'Tesla Inc.',
            category: 'stock' as const,
            current_price: 245.80,
            price_change: 8.45,
            price_change_percent: 3.56,
            volume: 67891234,
            market_cap: 780000000000,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ];
      }
      return data;
    },
  });
};
