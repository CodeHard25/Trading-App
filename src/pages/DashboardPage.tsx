
import Layout from '@/components/Layout';
import PortfolioSummary from '@/components/PortfolioSummary';
import TradingWidget from '@/components/TradingWidget';
import MarketOverview from '@/components/MarketOverview';

const DashboardPage = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-300">Welcome to your trading dashboard</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - Portfolio Summary */}
          <div className="lg:col-span-2">
            <PortfolioSummary />
          </div>
          
          {/* Right column - Trading Widget */}
          <div className="space-y-6">
            <TradingWidget />
            <MarketOverview />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;
