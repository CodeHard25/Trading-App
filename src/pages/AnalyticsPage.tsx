
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart3, TrendingUp, Target, AlertTriangle, Download, FileText } from 'lucide-react';
import PerformanceChart from '@/components/PerformanceChart';
import RiskReturnChart from '@/components/RiskReturnChart';
import { useToast } from '@/hooks/use-toast';

const AnalyticsPage = () => {
  const { toast } = useToast();

  const handleGenerateReport = () => {
    toast({
      title: "Report Generated",
      description: "Your analytics report has been generated successfully.",
    });
    
    // Simulate report generation delay
    setTimeout(() => {
      console.log("Analytics report generated");
    }, 1000);
  };

  const handleDownloadReport = () => {
    toast({
      title: "Download Started",
      description: "Your analytics report is being downloaded.",
    });
    
    // Create a simple CSV report
    const reportData = [
      ['Metric', 'Value'],
      ['Sharpe Ratio', '1.85'],
      ['Max Drawdown', '-8.4%'],
      ['Beta', '0.92'],
      ['VaR (95%)', '$2,450'],
      ['Annual Return', '+18.7%'],
      ['Monthly Return', '+1.4%'],
      ['Win Rate', '67.3%'],
      ['Total Trades', '152'],
      ['Avg Trade', '+$127.45'],
      ['Profit Factor', '1.87']
    ];
    
    const csvContent = reportData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'analytics-report.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Trading Analytics</h1>
            <p className="text-gray-600 dark:text-gray-300">Advanced metrics and performance analysis</p>
          </div>
          <div className="flex space-x-2">
            <Button 
              onClick={handleGenerateReport}
              className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
            >
              <FileText className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
            <Button 
              onClick={handleDownloadReport}
              variant="outline"
            >
              <Download className="h-4 w-4 mr-2" />
              Download Report
            </Button>
          </div>
        </div>

        {/* Risk Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sharpe Ratio</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1.85</div>
              <p className="text-xs text-green-500">Excellent</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Max Drawdown</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">-8.4%</div>
              <p className="text-xs text-muted-foreground">Last 6 months</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Beta</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0.92</div>
              <p className="text-xs text-muted-foreground">vs S&P 500</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">VaR (95%)</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$2,450</div>
              <p className="text-xs text-muted-foreground">1-day risk</p>
            </CardContent>
          </Card>
        </div>

        {/* Performance Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PerformanceChart />
          <RiskReturnChart />
        </div>

        {/* Additional Analytics */}
        <Card>
          <CardHeader>
            <CardTitle>Advanced Metrics</CardTitle>
            <CardDescription>Comprehensive performance and risk analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <h4 className="font-medium">Return Metrics</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Annual Return:</span>
                    <span className="text-green-500">+18.7%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Monthly Return:</span>
                    <span className="text-green-500">+1.4%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Win Rate:</span>
                    <span>67.3%</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">Risk Metrics</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Volatility:</span>
                    <span>12.4%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Correlation:</span>
                    <span>0.78</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Information Ratio:</span>
                    <span>1.23</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">Trade Metrics</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Total Trades:</span>
                    <span>152</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Avg Trade:</span>
                    <span className="text-green-500">+$127.45</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Profit Factor:</span>
                    <span>1.87</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AnalyticsPage;
