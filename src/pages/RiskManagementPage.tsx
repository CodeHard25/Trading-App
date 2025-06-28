
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useNotifications } from '@/hooks/useNotifications';
import { usePortfolio } from '@/hooks/usePortfolio';
import RiskAlertChart from '@/components/RiskAlertChart';
import { 
  Shield, 
  AlertTriangle, 
  TrendingDown, 
  Target,
  Bell,
  Settings,
  Download,
  FileText
} from 'lucide-react';
import { useState } from 'react';

const RiskManagementPage = () => {
  const { toast } = useToast();
  const { notifications } = useNotifications();
  const { portfolio, positions } = usePortfolio();
  
  const [riskSettings, setRiskSettings] = useState({
    maxDrawdown: 10,
    positionLimit: 5,
    stopLoss: 5,
    riskPerTrade: 2,
    enableAlerts: true,
    enableAutoStop: false,
  });

  const handleGenerateRiskReport = () => {
    toast({
      title: "Risk Report Generated",
      description: "Your comprehensive risk analysis report has been generated.",
    });
    
    setTimeout(() => {
      console.log("Risk management report generated");
    }, 1000);
  };

  const handleDownloadRiskReport = () => {
    toast({
      title: "Download Started",
      description: "Your risk management report is being downloaded.",
    });
    
    const reportData = [
      ['Risk Metric', 'Current Value', 'Threshold', 'Status'],
      ['Portfolio VaR', '$2,450', '$5,000', 'OK'],
      ['Max Drawdown', '8.4%', '10%', 'OK'],
      ['Position Concentration', '15%', '20%', 'OK'],
      ['Leverage Ratio', '1.2x', '2x', 'OK'],
      ['Beta', '0.92', '1.5', 'OK'],
      ['Correlation Risk', '0.78', '0.85', 'OK']
    ];
    
    const csvContent = reportData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'risk-management-report.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleSaveRiskSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your risk management settings have been updated.",
    });
    console.log("Risk settings saved:", riskSettings);
  };

  const mockAlerts = [
    { id: '1', type: 'warning', message: 'Portfolio drawdown approaching 8%', time: '2 min ago', severity: 'medium' },
    { id: '2', type: 'info', message: 'AAPL position exceeded 10% allocation', time: '1 hour ago', severity: 'low' },
    { id: '3', type: 'critical', message: 'Stop loss triggered for TSLA position', time: '3 hours ago', severity: 'high' },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Shield className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Risk Management</h1>
              <p className="text-gray-600 dark:text-gray-300">Monitor and control portfolio risk exposure</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button onClick={handleGenerateRiskReport} className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600">
              <FileText className="h-4 w-4 mr-2" />
              Generate Risk Report
            </Button>
            <Button onClick={handleDownloadRiskReport} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Download Report
            </Button>
          </div>
        </div>

        {/* Risk Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Portfolio VaR</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$2,450</div>
              <Progress value={49} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-1">49% of limit</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Max Drawdown</CardTitle>
              <TrendingDown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-500">8.4%</div>
              <Progress value={84} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-1">84% of limit</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Position Risk</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">Low</div>
              <Progress value={25} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-1">Well diversified</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
              <Bell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground mt-1">2 medium, 1 high</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="positions">Position Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <RiskAlertChart />
            
            <Card>
              <CardHeader>
                <CardTitle>Risk Metrics Summary</CardTitle>
                <CardDescription>Current portfolio risk assessment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Portfolio Beta</span>
                      <Badge variant="secondary">0.92</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Sharpe Ratio</span>
                      <Badge variant="default">1.85</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Information Ratio</span>
                      <Badge variant="default">1.23</Badge>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Volatility</span>
                      <Badge variant="secondary">12.4%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Correlation</span>
                      <Badge variant="secondary">0.78</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Tracking Error</span>
                      <Badge variant="secondary">2.1%</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Risk Alerts</CardTitle>
                <CardDescription>Recent risk notifications and warnings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockAlerts.map((alert) => (
                    <div key={alert.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <AlertTriangle className={`h-5 w-5 ${
                          alert.severity === 'high' ? 'text-red-500' :
                          alert.severity === 'medium' ? 'text-orange-500' : 'text-yellow-500'
                        }`} />
                        <div>
                          <p className="font-medium">{alert.message}</p>
                          <p className="text-sm text-muted-foreground">{alert.time}</p>
                        </div>
                      </div>
                      <Badge variant={
                        alert.severity === 'high' ? 'destructive' :
                        alert.severity === 'medium' ? 'default' : 'secondary'
                      }>
                        {alert.severity}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Risk Management Settings</CardTitle>
                <CardDescription>Configure your risk parameters and alerts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="maxDrawdown">Max Drawdown (%)</Label>
                      <Input
                        id="maxDrawdown"
                        type="number"
                        value={riskSettings.maxDrawdown}
                        onChange={(e) => setRiskSettings({...riskSettings, maxDrawdown: Number(e.target.value)})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="positionLimit">Position Limit (%)</Label>
                      <Input
                        id="positionLimit"
                        type="number"
                        value={riskSettings.positionLimit}
                        onChange={(e) => setRiskSettings({...riskSettings, positionLimit: Number(e.target.value)})}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="stopLoss">Stop Loss (%)</Label>
                      <Input
                        id="stopLoss"
                        type="number"
                        value={riskSettings.stopLoss}
                        onChange={(e) => setRiskSettings({...riskSettings, stopLoss: Number(e.target.value)})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="riskPerTrade">Risk per Trade (%)</Label>
                      <Input
                        id="riskPerTrade"
                        type="number"
                        value={riskSettings.riskPerTrade}
                        onChange={(e) => setRiskSettings({...riskSettings, riskPerTrade: Number(e.target.value)})}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Enable Risk Alerts</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications when risk thresholds are exceeded</p>
                    </div>
                    <Switch
                      checked={riskSettings.enableAlerts}
                      onCheckedChange={(checked) => setRiskSettings({...riskSettings, enableAlerts: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Auto Stop-Loss</Label>
                      <p className="text-sm text-muted-foreground">Automatically execute stop-loss orders</p>
                    </div>
                    <Switch
                      checked={riskSettings.enableAutoStop}
                      onCheckedChange={(checked) => setRiskSettings({...riskSettings, enableAutoStop: checked})}
                    />
                  </div>
                </div>
                
                <Button onClick={handleSaveRiskSettings}>Save Risk Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="positions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Position Risk Analysis</CardTitle>
                <CardDescription>Individual position risk assessment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {positions?.map((position) => (
                    <div key={position.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <p className="font-medium">Position {position.id}</p>
                        <p className="text-sm text-muted-foreground">
                          Qty: {position.quantity} | Entry: ${position.entry_price}
                        </p>
                      </div>
                      <div className="text-right space-y-1">
                        <p className={`font-medium ${Number(position.unrealized_pnl) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                          ${position.unrealized_pnl}
                        </p>
                        <Badge variant="secondary">Low Risk</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default RiskManagementPage;
