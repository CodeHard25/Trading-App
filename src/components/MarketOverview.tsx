
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useInstruments } from '@/hooks/useInstruments';
import { TrendingUp, TrendingDown } from 'lucide-react';

const MarketOverview = () => {
  const { data: allInstruments } = useInstruments();
  const { data: stocks } = useInstruments();
  const { data: crypto } = useInstruments();
  const { data: forex } = useInstruments();
  const { data: commodities } = useInstruments();

  // Filter data by category on the frontend since the hook doesn't support filtering
  const stocksFiltered = stocks?.filter(instrument => instrument.category === 'stock');
  const cryptoFiltered = crypto?.filter(instrument => instrument.category === 'crypto');
  const forexFiltered = forex?.filter(instrument => instrument.category === 'forex');
  const commoditiesFiltered = commodities?.filter(instrument => instrument.category === 'commodity');

  const InstrumentList = ({ instruments, title }: { instruments: any[], title: string }) => (
    <div className="space-y-3">
      <h3 className="font-semibold text-lg">{title}</h3>
      <div className="grid gap-3">
        {instruments?.slice(0, 6).map((instrument) => (
          <Card key={instrument.id} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold">{instrument.symbol}</div>
                <div className="text-sm text-muted-foreground">{instrument.name}</div>
              </div>
              <div className="text-right">
                <div className="font-mono font-bold">${instrument.current_price}</div>
                <div className="flex items-center justify-end space-x-1">
                  {instrument.price_change >= 0 ? (
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-500" />
                  )}
                  <Badge 
                    variant={instrument.price_change >= 0 ? "default" : "destructive"}
                    className="text-xs"
                  >
                    {instrument.price_change_percent}%
                  </Badge>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Market Overview</CardTitle>
        <CardDescription>Real-time market data across all asset classes</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="stocks">Stocks</TabsTrigger>
            <TabsTrigger value="crypto">Crypto</TabsTrigger>
            <TabsTrigger value="forex">Forex</TabsTrigger>
            <TabsTrigger value="commodities">Commodities</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-4">
            <InstrumentList instruments={allInstruments || []} title="Top Movers" />
          </TabsContent>
          
          <TabsContent value="stocks" className="mt-4">
            <InstrumentList instruments={stocksFiltered || []} title="Top Stocks" />
          </TabsContent>
          
          <TabsContent value="crypto" className="mt-4">
            <InstrumentList instruments={cryptoFiltered || []} title="Cryptocurrencies" />
          </TabsContent>
          
          <TabsContent value="forex" className="mt-4">
            <InstrumentList instruments={forexFiltered || []} title="Currency Pairs" />
          </TabsContent>
          
          <TabsContent value="commodities" className="mt-4">
            <InstrumentList instruments={commoditiesFiltered || []} title="Commodities" />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MarketOverview;
