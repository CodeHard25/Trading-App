
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Brain, Plus, TrendingUp, Target, BarChart3, Play, Pause } from 'lucide-react';
import { useStrategies } from '@/hooks/useStrategies';
import { useInstruments } from '@/hooks/useInstruments';
import { usePortfolio } from '@/hooks/usePortfolio';
import { useState } from 'react';

const StrategiesPage = () => {
  const { strategies, strategyExecutions, createStrategyExecution, toggleStrategyExecution } = useStrategies();
  const { data: instruments } = useInstruments();
  const { portfolio } = usePortfolio();
  const [selectedStrategy, setSelectedStrategy] = useState('');
  const [selectedInstrument, setSelectedInstrument] = useState('');

  const handleCreateExecution = () => {
    if (!selectedStrategy || !selectedInstrument || !portfolio) return;
    
    createStrategyExecution({
      strategy_id: selectedStrategy,
      portfolio_id: portfolio.id,
      instrument_id: selectedInstrument,
    });
    
    setSelectedStrategy('');
    setSelectedInstrument('');
  };

  const activeExecutions = strategyExecutions?.filter(exec => exec.is_active) || [];
  const totalTrades = 152; // This would come from actual trade data
  const avgWinRate = 69; // This would be calculated from trade results

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Trading Strategies</h1>
            <p className="text-gray-600 dark:text-gray-300">Manage and monitor your automated trading strategies</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600">
                <Plus className="h-4 w-4 mr-2" />
                Activate Strategy
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Activate Trading Strategy</DialogTitle>
                <DialogDescription>
                  Choose a strategy and instrument to start automated trading.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Strategy</label>
                  <Select value={selectedStrategy} onValueChange={setSelectedStrategy}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a strategy" />
                    </SelectTrigger>
                    <SelectContent>
                      {strategies?.map((strategy) => (
                        <SelectItem key={strategy.id} value={strategy.id}>
                          {strategy.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Instrument</label>
                  <Select value={selectedInstrument} onValueChange={setSelectedInstrument}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an instrument" />
                    </SelectTrigger>
                    <SelectContent>
                      {instruments?.map((instrument) => (
                        <SelectItem key={instrument.id} value={instrument.id}>
                          {instrument.symbol} - {instrument.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button 
                  onClick={handleCreateExecution}
                  disabled={!selectedStrategy || !selectedInstrument}
                  className="w-full"
                >
                  Activate Strategy
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Strategies</CardTitle>
              <Brain className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeExecutions.length}</div>
              <p className="text-xs text-muted-foreground">Currently running</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Performance</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">+15.8%</div>
              <p className="text-xs text-muted-foreground">Last 30 days</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Trades</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalTrades}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Win Rate</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{avgWinRate}%</div>
              <p className="text-xs text-muted-foreground">Across all strategies</p>
            </CardContent>
          </Card>
        </div>

        {/* Active Strategy Executions */}
        {activeExecutions.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Active Strategy Executions</CardTitle>
              <CardDescription>Currently running automated strategies</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeExecutions.map((execution) => (
                  <div key={execution.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        <Badge variant="default">Active</Badge>
                      </div>
                      <div>
                        <div className="font-semibold">{execution.strategies?.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {execution.instruments?.symbol} - {execution.instruments?.name}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch 
                        checked={execution.is_active}
                        onCheckedChange={(checked) => 
                          toggleStrategyExecution({ id: execution.id, isActive: checked })
                        }
                      />
                      <Button size="sm" variant="outline">
                        Configure
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Available Strategies */}
        <Card>
          <CardHeader>
            <CardTitle>Available Strategies</CardTitle>
            <CardDescription>Pre-built and custom trading strategies</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {strategies?.map((strategy) => (
                <Card key={strategy.id} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{strategy.name}</CardTitle>
                        <CardDescription className="mt-1">{strategy.description}</CardDescription>
                      </div>
                      <Badge variant="outline">{strategy.type}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Type</div>
                        <div className="text-lg font-bold capitalize">{strategy.type}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Status</div>
                        <Badge variant={strategy.is_active ? 'default' : 'secondary'}>
                          {strategy.is_active ? 'Available' : 'Disabled'}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <BarChart3 className="h-4 w-4 mr-1" />
                        Backtest
                      </Button>
                      <Button size="sm" className="flex-1">
                        <Play className="h-4 w-4 mr-1" />
                        Activate
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default StrategiesPage;
