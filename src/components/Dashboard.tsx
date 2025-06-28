
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Activity, 
  BarChart3,
  PieChart,
  AlertTriangle,
  Target
} from 'lucide-react';

const Dashboard = () => {
  const [timeframe, setTimeframe] = useState('1D');

  const portfolioStats = {
    totalValue: 125750.50,
    dailyChange: 2847.25,
    dailyChangePercent: 2.31,
    totalPositions: 12,
    activeStrategies: 5,
    winRate: 67.3
  };

  const recentTrades = [
    { id: 1, symbol: 'AAPL', type: 'BUY', quantity: 50, price: 182.50, time: '14:32', pnl: '+$125.50', status: 'Filled' },
    { id: 2, symbol: 'TSLA', type: 'SELL', quantity: 25, price: 258.75, time: '14:15', pnl: '-$42.30', status: 'Filled' },
    { id: 3, symbol: 'GOOGL', type: 'BUY', quantity: 15, price: 142.80, time: '13:58', pnl: '+$78.90', status: 'Filled' },
    { id: 4, symbol: 'MSFT', type: 'SELL', quantity: 30, price: 378.25, time: '13:45', pnl: '+$156.70', status: 'Filled' },
  ];

  const activePositions = [
    { symbol: 'AAPL', quantity: 150, avgPrice: 180.25, currentPrice: 182.50, pnl: '+$337.50', change: '+1.25%' },
    { symbol: 'TSLA', quantity: 75, avgPrice: 260.00, currentPrice: 258.75, pnl: '-$93.75', change: '-0.48%' },
    { symbol: 'GOOGL', quantity: 45, avgPrice: 140.50, currentPrice: 142.80, pnl: '+$103.50', change: '+1.64%' },
    { symbol: 'NVDA', quantity: 25, avgPrice: 520.75, currentPrice: 535.20, pnl: '+$361.25', change: '+2.77%' },
  ];

  const strategies = [
    { name: 'MA Crossover', status: 'Active', positions: 3, pnl: '+$542.80', winRate: '72%' },
    { name: 'RSI Momentum', status: 'Active', positions: 2, pnl: '+$234.50', winRate: '65%' },
    { name: 'Bollinger Bands', status: 'Paused', positions: 1, pnl: '-$89.20', winRate: '58%' },
    { name: 'MACD Signal', status: 'Active', positions: 4, pnl: '+$678.90', winRate: '81%' },
  ];

  return (
    <div className="space-y-6">
      {/* Header with timeframe selector */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Portfolio Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-300">Track your simulated trading performance</p>
        </div>
        <div className="flex space-x-2">
          {['1D', '1W', '1M', '3M', '1Y'].map((period) => (
            <Button
              key={period}
              variant={timeframe === period ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeframe(period)}
            >
              {period}
            </Button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Portfolio Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${portfolioStats.totalValue.toLocaleString()}</div>
            <div className="flex items-center text-sm">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-green-500">+{portfolioStats.dailyChangePercent}%</span>
              <span className="text-muted-foreground ml-1">today</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Daily P&L</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">+${portfolioStats.dailyChange.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">
              {portfolioStats.totalPositions} active positions
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Strategies</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{portfolioStats.activeStrategies}</div>
            <div className="text-sm text-muted-foreground">
              {portfolioStats.winRate}% win rate
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Risk Level</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Moderate</div>
            <div className="text-sm text-muted-foreground">
              VaR: -$2,450 (95%)
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Trades */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              Recent Trades
            </CardTitle>
            <CardDescription>Latest executed trades from your strategies</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTrades.map((trade) => (
                <div key={trade.id} className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700 last:border-0">
                  <div className="flex items-center space-x-3">
                    <Badge variant={trade.type === 'BUY' ? 'default' : 'secondary'}>
                      {trade.type}
                    </Badge>
                    <div>
                      <div className="font-medium">{trade.symbol}</div>
                      <div className="text-sm text-muted-foreground">{trade.quantity} @ ${trade.price}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`font-medium ${trade.pnl.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                      {trade.pnl}
                    </div>
                    <div className="text-sm text-muted-foreground">{trade.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Active Positions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <PieChart className="h-5 w-5 mr-2" />
              Active Positions
            </CardTitle>
            <CardDescription>Current holdings and performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activePositions.map((position, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700 last:border-0">
                  <div>
                    <div className="font-medium">{position.symbol}</div>
                    <div className="text-sm text-muted-foreground">
                      {position.quantity} shares @ ${position.avgPrice}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`font-medium ${position.pnl.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                      {position.pnl}
                    </div>
                    <div className={`text-sm ${position.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                      {position.change}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Strategies */}
      <Card>
        <CardHeader>
          <CardTitle>Active Trading Strategies</CardTitle>
          <CardDescription>Monitor your automated trading strategies</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {strategies.map((strategy, index) => (
              <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">{strategy.name}</h3>
                  <Badge variant={strategy.status === 'Active' ? 'default' : 'secondary'}>
                    {strategy.status}
                  </Badge>
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Positions:</span>
                    <span>{strategy.positions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">P&L:</span>
                    <span className={strategy.pnl.startsWith('+') ? 'text-green-500' : 'text-red-500'}>
                      {strategy.pnl}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Win Rate:</span>
                    <span>{strategy.winRate}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
