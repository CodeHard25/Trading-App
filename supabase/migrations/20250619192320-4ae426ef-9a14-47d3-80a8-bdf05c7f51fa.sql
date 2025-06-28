
-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE,
  full_name TEXT,
  role TEXT DEFAULT 'trader' CHECK (role IN ('admin', 'trader', 'analyst')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create financial instruments table
CREATE TABLE public.instruments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  symbol TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('stocks', 'forex', 'crypto', 'indices', 'commodities')),
  current_price DECIMAL(15,4) DEFAULT 0,
  price_change DECIMAL(10,4) DEFAULT 0,
  price_change_percent DECIMAL(5,2) DEFAULT 0,
  volume BIGINT DEFAULT 0,
  market_cap BIGINT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create trading strategies table
CREATE TABLE public.strategies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  type TEXT DEFAULT 'prebuilt' CHECK (type IN ('prebuilt', 'custom')),
  parameters JSONB DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create portfolios table
CREATE TABLE public.portfolios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT DEFAULT 'Default Portfolio',
  initial_balance DECIMAL(15,2) DEFAULT 100000,
  current_balance DECIMAL(15,2) DEFAULT 100000,
  total_pnl DECIMAL(15,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create positions table
CREATE TABLE public.positions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  portfolio_id UUID REFERENCES public.portfolios(id) ON DELETE CASCADE NOT NULL,
  instrument_id UUID REFERENCES public.instruments(id) NOT NULL,
  strategy_id UUID REFERENCES public.strategies(id),
  position_type TEXT CHECK (position_type IN ('long', 'short')) NOT NULL,
  quantity DECIMAL(15,4) NOT NULL,
  entry_price DECIMAL(15,4) NOT NULL,
  current_price DECIMAL(15,4),
  stop_loss DECIMAL(15,4),
  take_profit DECIMAL(15,4),
  unrealized_pnl DECIMAL(15,2) DEFAULT 0,
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'closed')),
  opened_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  closed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create trades table
CREATE TABLE public.trades (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  portfolio_id UUID REFERENCES public.portfolios(id) ON DELETE CASCADE NOT NULL,
  instrument_id UUID REFERENCES public.instruments(id) NOT NULL,
  strategy_id UUID REFERENCES public.strategies(id),
  trade_type TEXT CHECK (trade_type IN ('buy', 'sell')) NOT NULL,
  quantity DECIMAL(15,4) NOT NULL,
  price DECIMAL(15,4) NOT NULL,
  total_amount DECIMAL(15,2) NOT NULL,
  commission DECIMAL(10,2) DEFAULT 0,
  realized_pnl DECIMAL(15,2) DEFAULT 0,
  executed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create strategy executions table
CREATE TABLE public.strategy_executions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  strategy_id UUID REFERENCES public.strategies(id) NOT NULL,
  portfolio_id UUID REFERENCES public.portfolios(id) NOT NULL,
  instrument_id UUID REFERENCES public.instruments(id) NOT NULL,
  is_active BOOLEAN DEFAULT true,
  parameters JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create notifications table
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT DEFAULT 'info' CHECK (type IN ('info', 'success', 'warning', 'error')),
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.positions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trades ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.strategy_executions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can view their own portfolios" ON public.portfolios FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own portfolios" ON public.portfolios FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own portfolios" ON public.portfolios FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own positions" ON public.positions FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.portfolios WHERE portfolios.id = positions.portfolio_id AND portfolios.user_id = auth.uid())
);
CREATE POLICY "Users can create positions in their portfolios" ON public.positions FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.portfolios WHERE portfolios.id = portfolio_id AND portfolios.user_id = auth.uid())
);
CREATE POLICY "Users can update positions in their portfolios" ON public.positions FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.portfolios WHERE portfolios.id = positions.portfolio_id AND portfolios.user_id = auth.uid())
);

CREATE POLICY "Users can view their own trades" ON public.trades FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.portfolios WHERE portfolios.id = portfolio_id AND portfolios.user_id = auth.uid())
);
CREATE POLICY "Users can create trades in their portfolios" ON public.trades FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.portfolios WHERE portfolios.id = portfolio_id AND portfolios.user_id = auth.uid())
);

CREATE POLICY "Users can view their own strategy executions" ON public.strategy_executions FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.portfolios WHERE portfolios.id = portfolio_id AND portfolios.user_id = auth.uid())
);
CREATE POLICY "Users can create strategy executions in their portfolios" ON public.strategy_executions FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.portfolios WHERE portfolios.id = portfolio_id AND portfolios.user_id = auth.uid())
);
CREATE POLICY "Users can update strategy executions in their portfolios" ON public.strategy_executions FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.portfolios WHERE portfolios.id = portfolio_id AND portfolios.user_id = auth.uid())
);

CREATE POLICY "Users can view their own notifications" ON public.notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own notifications" ON public.notifications FOR UPDATE USING (auth.uid() = user_id);

-- Public read access for instruments and strategies
CREATE POLICY "Anyone can view instruments" ON public.instruments FOR SELECT TO authenticated USING (true);
CREATE POLICY "Anyone can view strategies" ON public.strategies FOR SELECT TO authenticated USING (true);

-- Insert sample data
INSERT INTO public.instruments (symbol, name, category, current_price, price_change, price_change_percent, volume) VALUES
('AAPL', 'Apple Inc.', 'stocks', 182.50, 2.25, 1.25, 65000000),
('TSLA', 'Tesla Inc.', 'stocks', 258.75, -5.30, -2.01, 45000000),
('GOOGL', 'Alphabet Inc.', 'stocks', 142.80, 1.80, 1.28, 32000000),
('MSFT', 'Microsoft Corp.', 'stocks', 378.25, 4.50, 1.20, 28000000),
('NVDA', 'NVIDIA Corp.', 'stocks', 535.20, 12.45, 2.38, 55000000),
('USD/INR', 'US Dollar to Indian Rupee', 'forex', 83.25, 0.15, 0.18, 0),
('EUR/USD', 'Euro to US Dollar', 'forex', 1.0850, -0.0025, -0.23, 0),
('GBP/JPY', 'British Pound to Japanese Yen', 'forex', 188.45, 0.75, 0.40, 0),
('BTC', 'Bitcoin', 'crypto', 43250.00, 1250.00, 2.98, 0),
('ETH', 'Ethereum', 'crypto', 2650.00, 85.50, 3.34, 0),
('SOL', 'Solana', 'crypto', 105.75, -2.25, -2.08, 0),
('DOGE', 'Dogecoin', 'crypto', 0.085, 0.003, 3.66, 0),
('GOLD', 'Gold Futures', 'commodities', 2045.50, -8.25, -0.40, 0),
('OIL', 'Crude Oil', 'commodities', 78.45, 1.25, 1.62, 0),
('SPY', 'SPDR S&P 500 ETF', 'indices', 475.80, 5.25, 1.12, 85000000),
('NIFTY50', 'Nifty 50 Index', 'indices', 21850.00, 125.50, 0.58, 0);

INSERT INTO public.strategies (name, description, type, parameters) VALUES
('Moving Average Crossover', 'Buy when short MA crosses above long MA, sell when below', 'prebuilt', '{"short_period": 20, "long_period": 50}'),
('RSI + MACD Combo', 'Combined momentum indicators for entry and exit signals', 'prebuilt', '{"rsi_oversold": 30, "rsi_overbought": 70, "macd_signal": true}'),
('Bollinger Band Breakout', 'Trade breakouts from Bollinger Bands with volume confirmation', 'prebuilt', '{"period": 20, "std_dev": 2, "volume_threshold": 1.5}'),
('Buy the Dip', 'Buy on significant price drops with sentiment confirmation', 'prebuilt', '{"drop_threshold": -5, "sentiment_threshold": 0.3}'),
('Momentum Scalping', 'Short-term momentum trading strategy', 'prebuilt', '{"momentum_period": 14, "exit_time": 60}'),
('Mean Reversion', 'Trade when price deviates significantly from mean', 'prebuilt', '{"lookback_period": 30, "deviation_threshold": 2}');

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, username, full_name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)));
  
  INSERT INTO public.portfolios (user_id, name, initial_balance, current_balance)
  VALUES (NEW.id, 'Default Portfolio', 100000, 100000);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
