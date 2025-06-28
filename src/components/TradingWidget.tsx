
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useInstruments } from '@/hooks/useInstruments';
import { usePortfolio } from '@/hooks/usePortfolio';
import { TrendingUp, TrendingDown } from 'lucide-react';

const TradingWidget = () => {
  const { data: instruments } = useInstruments();
  const { portfolio, createTrade, isCreatingTrade } = usePortfolio();
  
  const [selectedInstrument, setSelectedInstrument] = useState('');
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');
  const [quantity, setQuantity] = useState('');
  const [orderType, setOrderType] = useState('market');
  const [price, setPrice] = useState('');

  const instrument = instruments?.find(i => i.id === selectedInstrument);
  const totalAmount = instrument && quantity ? 
    Number(quantity) * Number(instrument.current_price) : 0;

  const handleTrade = () => {
    if (!selectedInstrument || !quantity || !instrument) return;
    
    createTrade({
      instrument_id: selectedInstrument,
      trade_type: tradeType,
      quantity: Number(quantity),
      price: orderType === 'market' ? Number(instrument.current_price) : Number(price),
    });
    
    // Reset form
    setQuantity('');
    setPrice('');
  };

  const canAffordTrade = portfolio && totalAmount <= portfolio.current_balance;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Trade</CardTitle>
        <CardDescription>Execute trades instantly with real-time pricing</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Instrument Selection */}
        <div className="space-y-2">
          <Label>Select Instrument</Label>
          <Select value={selectedInstrument} onValueChange={setSelectedInstrument}>
            <SelectTrigger>
              <SelectValue placeholder="Choose an instrument" />
            </SelectTrigger>
            <SelectContent>
              {instruments?.map((instrument) => (
                <SelectItem key={instrument.id} value={instrument.id}>
                  <div className="flex items-center justify-between w-full">
                    <span>{instrument.symbol} - {instrument.name}</span>
                    <div className="flex items-center space-x-2 ml-4">
                      <span className="font-mono">${instrument.current_price}</span>
                      <Badge 
                        variant={instrument.price_change >= 0 ? "default" : "destructive"}
                        className="text-xs"
                      >
                        {instrument.price_change >= 0 ? (
                          <TrendingUp className="h-3 w-3 mr-1" />
                        ) : (
                          <TrendingDown className="h-3 w-3 mr-1" />
                        )}
                        {instrument.price_change_percent}%
                      </Badge>
                    </div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Current Price Display */}
        {instrument && (
          <Card className="p-3 bg-muted">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-sm text-muted-foreground">Current Price</div>
                <div className="text-2xl font-bold">${instrument.current_price}</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-muted-foreground">24h Change</div>
                <div className={`text-lg font-semibold ${
                  instrument.price_change >= 0 ? 'text-green-500' : 'text-red-500'
                }`}>
                  {instrument.price_change >= 0 ? '+' : ''}{instrument.price_change_percent}%
                </div>
              </div>
            </div>
          </Card>
        )}

        <Tabs value={tradeType} onValueChange={(value) => setTradeType(value as 'buy' | 'sell')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="buy" className="text-green-600">Buy</TabsTrigger>
            <TabsTrigger value="sell" className="text-red-600">Sell</TabsTrigger>
          </TabsList>
          
          <TabsContent value={tradeType} className="space-y-4">
            {/* Order Type */}
            <div className="space-y-2">
              <Label>Order Type</Label>
              <Select value={orderType} onValueChange={setOrderType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="market">Market Order</SelectItem>
                  <SelectItem value="limit">Limit Order</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Quantity */}
            <div className="space-y-2">
              <Label>Quantity</Label>
              <Input
                type="number"
                placeholder="Enter quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                min="0"
                step="0.0001"
              />
            </div>

            {/* Price (for limit orders) */}
            {orderType === 'limit' && (
              <div className="space-y-2">
                <Label>Limit Price</Label>
                <Input
                  type="number"
                  placeholder="Enter price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  min="0"
                  step="0.01"
                />
              </div>
            )}

            {/* Order Summary */}
            {quantity && instrument && (
              <Card className="p-3 bg-muted">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Quantity:</span>
                    <span className="font-mono">{quantity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Price:</span>
                    <span className="font-mono">
                      ${orderType === 'market' ? instrument.current_price : price || '0.00'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total:</span>
                    <span className="font-mono font-bold">${totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Commission (0.1%):</span>
                    <span className="font-mono">${(totalAmount * 0.001).toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between">
                    <span className="font-semibold">Net Amount:</span>
                    <span className="font-mono font-bold">
                      ${(totalAmount + (totalAmount * 0.001)).toFixed(2)}
                    </span>
                  </div>
                </div>
              </Card>
            )}

            {/* Available Balance */}
            {portfolio && (
              <div className="text-sm text-muted-foreground">
                Available Balance: <span className="font-mono">${portfolio.current_balance?.toFixed(2)}</span>
              </div>
            )}

            {/* Trade Button */}
            <Button 
              onClick={handleTrade}
              disabled={!selectedInstrument || !quantity || isCreatingTrade || (tradeType === 'buy' && !canAffordTrade)}
              className={`w-full ${tradeType === 'buy' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}`}
            >
              {isCreatingTrade ? 'Processing...' : `${tradeType === 'buy' ? 'Buy' : 'Sell'} ${instrument?.symbol || ''}`}
            </Button>

            {tradeType === 'buy' && !canAffordTrade && totalAmount > 0 && (
              <p className="text-sm text-red-500">Insufficient balance for this trade</p>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TradingWidget;
