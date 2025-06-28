
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { ScatterChart, Scatter, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { usePortfolio } from '@/hooks/usePortfolio';
import { useInstruments } from '@/hooks/useInstruments';

const RiskReturnChart = () => {
  const { positions } = usePortfolio();
  const { data: instruments } = useInstruments();

  // Generate risk-return data for positions
  const generateRiskReturnData = () => {
    if (!positions || !instruments) return [];
    
    return positions.map((position) => {
      const instrument = instruments.find(i => i.id === position.instrument_id);
      if (!instrument) return null;
      
      // Calculate return (simplified)
      const returnPercent = position.entry_price ? 
        ((Number(position.current_price || position.entry_price) - Number(position.entry_price)) / Number(position.entry_price)) * 100 : 0;
      
      // Estimate risk (simplified volatility)
      const risk = Math.abs(Number(instrument.price_change_percent)) + Math.random() * 5; // Adding some randomness
      
      return {
        symbol: instrument.symbol,
        risk: risk,
        return: returnPercent,
        size: Number(position.quantity) * Number(position.entry_price) / 1000, // Size for bubble size
      };
    }).filter(Boolean);
  };

  const riskReturnData = generateRiskReturnData();

  const chartConfig = {
    return: {
      label: "Return (%)",
      color: "hsl(var(--chart-1))",
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Risk-Return Analysis</CardTitle>
        <CardDescription>Risk vs return scatter plot of your positions</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart data={riskReturnData}>
              <XAxis 
                type="number"
                dataKey="risk" 
                name="Risk"
                label={{ value: 'Risk (%)', position: 'insideBottom', offset: -10 }}
              />
              <YAxis 
                type="number"
                dataKey="return" 
                name="Return"
                label={{ value: 'Return (%)', angle: -90, position: 'insideLeft' }}
              />
              <ChartTooltip 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-background border rounded p-2 shadow">
                        <p className="font-semibold">{data.symbol}</p>
                        <p>Risk: {data.risk?.toFixed(2)}%</p>
                        <p>Return: {data.return?.toFixed(2)}%</p>
                        <p>Position Size: ${(data.size * 1000)?.toFixed(0)}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Scatter 
                dataKey="return" 
                fill="var(--color-return)"
              />
            </ScatterChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default RiskReturnChart;
