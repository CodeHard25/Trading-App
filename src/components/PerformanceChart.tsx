
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { usePortfolio } from '@/hooks/usePortfolio';

const PerformanceChart = () => {
  const { portfolio, trades } = usePortfolio();

  // Generate sample performance data based on trades
  const generatePerformanceData = () => {
    if (!portfolio || !trades) return [];
    
    const data = [];
    let cumulativeValue = Number(portfolio.initial_balance);
    const today = new Date();
    
    // Generate last 30 days of data
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      // Add some realistic market movement
      const dailyChange = (Math.random() - 0.5) * 2; // Random change between -1% and 1%
      cumulativeValue += cumulativeValue * (dailyChange / 100);
      
      data.push({
        date: date.toISOString().split('T')[0],
        portfolio: cumulativeValue,
        benchmark: Number(portfolio.initial_balance) * (1 + (29 - i) * 0.001), // Steady 0.1% daily growth
      });
    }
    
    return data;
  };

  const performanceData = generatePerformanceData();

  const chartConfig = {
    portfolio: {
      label: "Portfolio",
      color: "hsl(var(--chart-1))",
    },
    benchmark: {
      label: "S&P 500",
      color: "hsl(var(--chart-2))",
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Portfolio Performance</CardTitle>
        <CardDescription>Historical performance vs benchmark</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={performanceData}>
              <XAxis 
                dataKey="date" 
                tickFormatter={(value) => new Date(value).toLocaleDateString()}
              />
              <YAxis 
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
              />
              <ChartTooltip 
                content={<ChartTooltipContent />}
                labelFormatter={(value) => new Date(value).toLocaleDateString()}
              />
              <Line 
                type="monotone" 
                dataKey="portfolio" 
                stroke="var(--color-portfolio)" 
                strokeWidth={2}
                dot={false}
              />
              <Line 
                type="monotone" 
                dataKey="benchmark" 
                stroke="var(--color-benchmark)" 
                strokeWidth={2}
                dot={false}
                strokeDasharray="5 5"
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default PerformanceChart;
