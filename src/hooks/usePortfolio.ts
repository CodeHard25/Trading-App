
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Portfolio {
  id: string;
  user_id: string;
  name: string;
  initial_balance: number;
  current_balance: number;
  total_pnl: number;
  created_at: string;
  updated_at: string;
}

export interface Position {
  id: string;
  portfolio_id: string;
  instrument_id: string;
  quantity: number;
  entry_price: number;
  current_price?: number;
  unrealized_pnl: number;
  position_type: 'long' | 'short';
  status: 'open' | 'closed';
  created_at: string;
  updated_at: string;
  instruments?: {
    symbol: string;
    name: string;
  };
}

export interface Trade {
  id: string;
  portfolio_id: string;
  instrument_id: string;
  trade_type: 'buy' | 'sell';
  quantity: number;
  price: number;
  total_amount: number;
  commission: number;
  executed_at: string;
  created_at: string;
  instruments?: {
    symbol: string;
    name: string;
  };
}

export const usePortfolio = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: portfolio, isLoading: portfolioLoading } = useQuery({
    queryKey: ['portfolio'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('portfolios')
        .select('*')
        .single();
      
      if (error) {
        console.error('Portfolio fetch error:', error);
        // Return mock data for demo
        return {
          id: '1',
          user_id: '1',
          name: 'Default Portfolio',
          initial_balance: 100000,
          current_balance: 125000,
          total_pnl: 25000,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
      }
      return data;
    },
  });

  const { data: positions, isLoading: positionsLoading } = useQuery({
    queryKey: ['positions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('positions')
        .select(`
          *,
          instruments(symbol, name)
        `);
      
      if (error) {
        console.error('Positions fetch error:', error);
        // Return mock data for demo
        return [
          {
            id: '1',
            portfolio_id: '1',
            instrument_id: '1',
            quantity: 100,
            entry_price: 150.00,
            current_price: 155.50,
            unrealized_pnl: 550,
            position_type: 'long' as const,
            status: 'open' as const,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            instruments: {
              symbol: 'AAPL',
              name: 'Apple Inc.',
            },
          },
          {
            id: '2',
            portfolio_id: '1',
            instrument_id: '2',
            quantity: 50,
            entry_price: 75.00,
            current_price: 72.25,
            unrealized_pnl: -137.50,
            position_type: 'long' as const,
            status: 'open' as const,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            instruments: {
              symbol: 'GOOGL',
              name: 'Alphabet Inc.',
            },
          },
        ];
      }
      return data;
    },
  });

  const { data: trades, isLoading: tradesLoading } = useQuery({
    queryKey: ['trades'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('trades')
        .select(`
          *,
          instruments(symbol, name)
        `)
        .order('executed_at', { ascending: false });
      
      if (error) {
        console.error('Trades fetch error:', error);
        // Return mock data for demo
        return [
          {
            id: '1',
            portfolio_id: '1',
            instrument_id: '1',
            trade_type: 'buy' as const,
            quantity: 100,
            price: 150.00,
            total_amount: 15000,
            commission: 10.00,
            executed_at: new Date().toISOString(),
            created_at: new Date().toISOString(),
            instruments: {
              symbol: 'AAPL',
              name: 'Apple Inc.',
            },
          },
          {
            id: '2',
            portfolio_id: '1',
            instrument_id: '2',
            trade_type: 'buy' as const,
            quantity: 50,
            price: 75.00,
            total_amount: 3750,
            commission: 7.50,
            executed_at: new Date().toISOString(),
            created_at: new Date().toISOString(),
            instruments: {
              symbol: 'GOOGL',
              name: 'Alphabet Inc.',
            },
          },
        ];
      }
      return data;
    },
  });

  const createTradeMutation = useMutation({
    mutationFn: async (tradeData: {
      instrument_id: string;
      trade_type: 'buy' | 'sell';
      quantity: number;
      price: number;
    }) => {
      if (!portfolio) throw new Error('No portfolio found');
      
      const total_amount = tradeData.quantity * tradeData.price;
      const commission = total_amount * 0.001; // 0.1% commission
      
      const { data, error } = await supabase
        .from('trades')
        .insert({
          portfolio_id: portfolio.id,
          instrument_id: tradeData.instrument_id,
          trade_type: tradeData.trade_type,
          quantity: tradeData.quantity,
          price: tradeData.price,
          total_amount,
          commission,
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trades'] });
      queryClient.invalidateQueries({ queryKey: ['positions'] });
      queryClient.invalidateQueries({ queryKey: ['portfolio'] });
      toast({
        title: "Trade Executed",
        description: "Your trade has been executed successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Trade Failed",
        description: "Failed to execute trade. Please try again.",
        variant: "destructive",
      });
      console.error('Create trade error:', error);
    },
  });

  return {
    portfolio,
    positions,
    trades,
    isLoading: portfolioLoading || positionsLoading || tradesLoading,
    createTrade: createTradeMutation.mutate,
    isCreatingTrade: createTradeMutation.isPending,
  };
};
