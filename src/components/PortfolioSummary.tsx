
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { usePortfolio } from '@/hooks/usePortfolio';
import { DollarSign, TrendingUp, PieChart, Activity } from 'lucide-react';

const PortfolioSummary = () => {
  const { portfolio, positions, trades } = usePortfolio();

  if (!portfolio) return null;

  const totalPositionValue = positions?.reduce((sum, position) => {
    return sum + (Number(position.quantity) * Number(position.current_price || position.entry_price));
  }, 0) || 0;

  const totalPnL = positions?.reduce((sum, position) => {
    return sum + Number(position.unrealized_pnl || 0);
  }, 0) || 0;

  const portfolioValue = Number(portfolio.current_balance) + totalPositionValue;
  const totalReturn = portfolioValue - Number(portfolio.initial_balance);
  const totalReturnPercent = (totalReturn / Number(portfolio.initial_balance)) * 100;

  const recentTrades = trades?.slice(0, 5) || [];

  return (
    <div className="grid gap-6">
      {/* Portfolio Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Portfolio Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${portfolioValue.toFixed(2)}</div>
            <div className="flex items-center text-sm">
              <TrendingUp className={`h-4 w-4 mr-1 ${totalReturn >= 0 ? 'text-green-500' : 'text-red-500'}`} />
              <span className={totalReturn >= 0 ? 'text-green-500' : 'text-red-500'}>
                {totalReturn >= 0 ? '+' : ''}${totalReturn.toFixed(2)} ({totalReturnPercent.toFixed(2)}%)
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cash Balance</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${Number(portfolio.current_balance).toFixed(2)}</div>
            <div className="text-sm text-muted-foreground">
              Available for trading
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Positions</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{positions?.length || 0}</div>
            <div className="text-sm text-muted-foreground">
              Total value: ${totalPositionValue.toFixed(2)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unrealized P&L</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${totalPnL >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {totalPnL >= 0 ? '+' : ''}${totalPnL.toFixed(2)}
            </div>
            <div className="text-sm text-muted-foreground">
              From open positions
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Asset Allocation */}
      <Card>
        <CardHeader>
          <CardTitle>Asset Allocation</CardTitle>
          <CardDescription>Distribution of your portfolio</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Cash</span>
              <span className="font-mono">${Number(portfolio.current_balance).toFixed(2)}</span>
            </div>
            <Progress 
              value={(Number(portfolio.current_balance) / portfolioValue) * 100} 
              className="h-2"
            />
            
            <div className="flex justify-between items-center">
              <span>Investments</span>
              <span className="font-mono">${totalPositionValue.toFixed(2)}</span>
            </div>
            <Progress 
              value={(totalPositionValue / portfolioValue) * 100} 
              className="h-2"
            />
          </div>
        </CardContent>
      </Card>

      {/* Recent Trades */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Trades</CardTitle>
          <CardDescription>Your latest trading activity</CardDescription>
        </CardHeader>
        <CardContent>
          {recentTrades.length > 0 ? (
            <div className="space-y-3">
              {recentTrades.map((trade) => (
                <div key={trade.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Badge variant={trade.trade_type === 'buy' ? 'default' : 'destructive'}>
                      {trade.trade_type.toUpperCase()}
                    </Badge>
                    <div>
                      <div className="font-semibold">{trade.instruments?.symbol}</div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(trade.executed_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{trade.quantity} @ ${trade.price}</div>
                    <div className="text-sm text-muted-foreground">
                      ${trade.total_amount.toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">
              No trades yet. Start trading to see your activity here.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PortfolioSummary;
