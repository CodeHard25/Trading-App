
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { usePortfolio } from '@/hooks/usePortfolio';
import { PieChart, BarChart3, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

const PortfolioPage = () => {
  const { portfolio, positions, trades } = usePortfolio();

  if (!portfolio) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Loading Portfolio...</h2>
            <p className="text-gray-600 dark:text-gray-300">Please wait while we load your portfolio data.</p>
          </div>
        </div>
      </Layout>
    );
  }

  const totalPositionValue = positions?.reduce((sum, position) => {
    return sum + (Number(position.quantity) * Number(position.current_price || position.entry_price));
  }, 0) || 0;

  const totalPnL = positions?.reduce((sum, position) => {
    return sum + Number(position.unrealized_pnl || 0);
  }, 0) || 0;

  const portfolioValue = Number(portfolio.current_balance) + totalPositionValue;
  const totalReturn = portfolioValue - Number(portfolio.initial_balance);
  const totalReturnPercent = (totalReturn / Number(portfolio.initial_balance)) * 100;

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Portfolio Overview</h1>
            <p className="text-gray-600 dark:text-gray-300">Complete view of your simulated investment portfolio</p>
          </div>
          <Button className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600">
            Export Report
          </Button>
        </div>

        {/* Portfolio Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Portfolio Value</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${portfolioValue.toFixed(2)}</div>
              <div className={`flex items-center text-sm ${totalReturn >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {totalReturn >= 0 ? (
                  <TrendingUp className="h-4 w-4 mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 mr-1" />
                )}
                {totalReturn >= 0 ? '+' : ''}${totalReturn.toFixed(2)} ({totalReturnPercent.toFixed(2)}%)
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Asset Allocation</CardTitle>
              <PieChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{positions?.length || 0} Positions</div>
              <div className="text-sm text-muted-foreground">
                Value: ${totalPositionValue.toFixed(2)}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Unrealized P&L</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${totalPnL >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {totalPnL >= 0 ? '+' : ''}${totalPnL.toFixed(2)}
              </div>
              <div className="text-sm text-muted-foreground">From open positions</div>
            </CardContent>
          </Card>
        </div>

        {/* Current Positions */}
        <Card>
          <CardHeader>
            <CardTitle>Current Holdings</CardTitle>
            <CardDescription>Your active trading positions</CardDescription>
          </CardHeader>
          <CardContent>
            {positions && positions.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Symbol</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Entry Price</TableHead>
                    <TableHead>Current Price</TableHead>
                    <TableHead>P&L</TableHead>
                    <TableHead>Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {positions.map((position) => {
                    const currentPrice = Number(position.current_price || position.entry_price);
                    const value = Number(position.quantity) * currentPrice;
                    const pnl = Number(position.unrealized_pnl || 0);
                    
                    return (
                      <TableRow key={position.id}>
                        <TableCell className="font-medium">
                          {position.instruments?.symbol}
                        </TableCell>
                        <TableCell>{position.instruments?.name}</TableCell>
                        <TableCell>
                          <Badge variant={position.position_type === 'long' ? 'default' : 'destructive'}>
                            {position.position_type.toUpperCase()}
                          </Badge>
                        </TableCell>
                        <TableCell>{position.quantity}</TableCell>
                        <TableCell>${Number(position.entry_price).toFixed(4)}</TableCell>
                        <TableCell>${currentPrice.toFixed(4)}</TableCell>
                        <TableCell className={pnl >= 0 ? 'text-green-500' : 'text-red-500'}>
                          {pnl >= 0 ? '+' : ''}${pnl.toFixed(2)}
                        </TableCell>
                        <TableCell>${value.toFixed(2)}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p>No open positions yet. Start trading to see your holdings here.</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Trades */}
        <Card>
          <CardHeader>
            <CardTitle>Trading History</CardTitle>
            <CardDescription>Your recent trading activity</CardDescription>
          </CardHeader>
          <CardContent>
            {trades && trades.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Symbol</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Commission</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {trades.slice(0, 10).map((trade) => (
                    <TableRow key={trade.id}>
                      <TableCell>
                        {new Date(trade.executed_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="font-medium">
                        {trade.instruments?.symbol}
                      </TableCell>
                      <TableCell>
                        <Badge variant={trade.trade_type === 'buy' ? 'default' : 'destructive'}>
                          {trade.trade_type.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>{trade.quantity}</TableCell>
                      <TableCell>${Number(trade.price).toFixed(4)}</TableCell>
                      <TableCell>${Number(trade.total_amount).toFixed(2)}</TableCell>
                      <TableCell>${Number(trade.commission).toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p>No trades yet. Start trading to see your activity here.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default PortfolioPage;
