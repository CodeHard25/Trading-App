
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Strategy {
  id: string;
  name: string;
  description: string;
  type: 'momentum' | 'mean_reversion' | 'arbitrage' | 'trend_following';
  is_active: boolean;
  parameters: any;
  created_at: string;
  updated_at: string;
}

export interface StrategyExecution {
  id: string;
  strategy_id: string;
  portfolio_id: string;
  instrument_id: string;
  is_active: boolean;
  parameters: any;
  created_at: string;
  updated_at: string;
  strategies?: Strategy;
  instruments?: {
    symbol: string;
    name: string;
  };
}

export const useStrategies = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: strategies, isLoading: strategiesLoading } = useQuery({
    queryKey: ['strategies'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('strategies')
        .select('*');
      
      if (error) {
        console.error('Strategies fetch error:', error);
        // Return mock data for demo
        return [
          {
            id: '1',
            name: 'Momentum Strategy',
            description: 'Buy high momentum stocks with strong price action',
            type: 'momentum' as const,
            is_active: true,
            parameters: {},
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          {
            id: '2',
            name: 'Mean Reversion',
            description: 'Buy oversold stocks and sell overbought ones',
            type: 'mean_reversion' as const,
            is_active: true,
            parameters: {},
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          {
            id: '3',
            name: 'Trend Following',
            description: 'Follow established market trends',
            type: 'trend_following' as const,
            is_active: false,
            parameters: {},
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ];
      }
      return data;
    },
  });

  const { data: strategyExecutions, isLoading: executionsLoading } = useQuery({
    queryKey: ['strategy-executions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('strategy_executions')
        .select(`
          *,
          strategies(name),
          instruments(symbol, name)
        `);
      
      if (error) {
        console.error('Strategy executions fetch error:', error);
        return [];
      }
      return data;
    },
  });

  const createStrategyExecutionMutation = useMutation({
    mutationFn: async (params: { strategy_id: string; portfolio_id: string; instrument_id: string }) => {
      const { data, error } = await supabase
        .from('strategy_executions')
        .insert(params)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['strategy-executions'] });
      toast({
        title: "Strategy Activated",
        description: "Strategy execution has been started successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to activate strategy. Please try again.",
        variant: "destructive",
      });
      console.error('Create strategy execution error:', error);
    },
  });

  const toggleStrategyExecutionMutation = useMutation({
    mutationFn: async (params: { id: string; isActive: boolean }) => {
      const { data, error } = await supabase
        .from('strategy_executions')
        .update({ is_active: params.isActive })
        .eq('id', params.id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['strategy-executions'] });
      toast({
        title: "Strategy Updated",
        description: "Strategy execution status has been updated.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update strategy. Please try again.",
        variant: "destructive",
      });
      console.error('Toggle strategy execution error:', error);
    },
  });

  return {
    strategies,
    strategyExecutions,
    isLoading: strategiesLoading || executionsLoading,
    createStrategyExecution: createStrategyExecutionMutation.mutate,
    toggleStrategyExecution: toggleStrategyExecutionMutation.mutate,
  };
};
