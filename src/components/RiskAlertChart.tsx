
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { usePortfolio } from '@/hooks/usePortfolio';

const RiskAlertChart = () => {
  const { portfolio, positions } = usePortfolio();

  // Generate risk alert data over time
  const generateRiskAlertData = () => {
    const data = [];
    const today = new Date();
    
    // Generate last 30 days of risk data
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      // Simulate risk levels with some volatility
      const baseRisk = 15 + Math.sin(i * 0.2) * 5; // Base risk oscillating between 10-20%
      const volatility = Math.random() * 10; // Random volatility 0-10%
      const totalRisk = Math.max(0, baseRisk + volatility);
      
      // Risk thresholds
      const lowRiskThreshold = 10;
      const highRiskThreshold = 25;
      
      data.push({
        date: date.toISOString().split('T')[0],
        risk: totalRisk,
        lowThreshold: lowRiskThreshold,
        highThreshold: highRiskThreshold,
        alerts: totalRisk > highRiskThreshold ? 1 : 0,
      });
    }
    
    return data;
  };

  const riskAlertData = generateRiskAlertData();

  const chartConfig = {
    risk: {
      label: "Risk Level (%)",
      color: "hsl(var(--chart-1))",
    },
    lowThreshold: {
      label: "Low Risk Threshold",
      color: "hsl(var(--chart-2))",
    },
    highThreshold: {
      label: "High Risk Threshold",
      color: "hsl(var(--chart-3))",
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Risk Alert Analysis</CardTitle>
        <CardDescription>Portfolio risk levels and alert thresholds over time</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={riskAlertData}>
              <XAxis 
                dataKey="date" 
                tickFormatter={(value) => new Date(value).toLocaleDateString()}
              />
              <YAxis 
                label={{ value: 'Risk (%)', angle: -90, position: 'insideLeft' }}
              />
              <ChartTooltip 
                content={<ChartTooltipContent />}
                labelFormatter={(value) => new Date(value).toLocaleDateString()}
              />
              <Area 
                type="monotone" 
                dataKey="risk" 
                stroke="var(--color-risk)" 
                fill="var(--color-risk)"
                fillOpacity={0.3}
                strokeWidth={2}
              />
              <Line 
                type="monotone" 
                dataKey="lowThreshold" 
                stroke="var(--color-lowThreshold)" 
                strokeWidth={1}
                strokeDasharray="5 5"
                dot={false}
              />
              <Line 
                type="monotone" 
                dataKey="highThreshold" 
                stroke="var(--color-highThreshold)" 
                strokeWidth={1}
                strokeDasharray="5 5"
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default RiskAlertChart;
