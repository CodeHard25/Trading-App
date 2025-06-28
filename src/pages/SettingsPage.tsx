
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/useTheme';
import { useToast } from '@/hooks/use-toast';
import { Settings, User, Bell, Shield } from 'lucide-react';
import { useState } from 'react';

const SettingsPage = () => {
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  
  const [profileSettings, setProfileSettings] = useState({
    fullName: user?.user_metadata?.full_name || '',
    email: user?.email || '',
    timezone: 'America/New_York',
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    tradeAlerts: true,
    priceAlerts: true,
    portfolioUpdates: true,
  });

  const [tradingSettings, setTradingSettings] = useState({
    autoExecute: false,
    confirmTrades: true,
    defaultOrderType: 'market',
    defaultQuantity: 100,
  });

  const isDarkMode = theme === 'dark';

  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile settings have been saved successfully.",
    });
    console.log("Profile settings saved:", profileSettings);
  };

  const handleSaveNotifications = () => {
    toast({
      title: "Notifications Updated",
      description: "Your notification preferences have been saved.",
    });
    console.log("Notification settings saved:", notificationSettings);
  };

  const handleSaveTrading = () => {
    toast({
      title: "Trading Settings Updated", 
      description: "Your trading preferences have been saved.",
    });
    console.log("Trading settings saved:", tradingSettings);
  };

  const handleSaveAppearance = () => {
    toast({
      title: "Appearance Updated",
      description: "Your appearance settings have been saved.",
    });
    console.log("Theme saved:", theme);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Settings className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
            <p className="text-gray-600 dark:text-gray-300">Manage your account and application preferences</p>
          </div>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile" className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>Profile</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center space-x-2">
              <Bell className="h-4 w-4" />
              <span>Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="trading" className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>Trading</span>
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span>Appearance</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your account details and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      value={profileSettings.fullName}
                      onChange={(e) => setProfileSettings({...profileSettings, fullName: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileSettings.email}
                      disabled
                      className="bg-gray-100 dark:bg-gray-800"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Input
                      id="timezone"
                      value={profileSettings.timezone}
                      onChange={(e) => setProfileSettings({...profileSettings, timezone: e.target.value})}
                    />
                  </div>
                </div>
                
                <Button onClick={handleSaveProfile}>Save Profile Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Choose how you want to be notified about account activity</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                    </div>
                    <Switch
                      checked={notificationSettings.emailNotifications}
                      onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, emailNotifications: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive browser push notifications</p>
                    </div>
                    <Switch
                      checked={notificationSettings.pushNotifications}
                      onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, pushNotifications: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Trade Alerts</Label>
                      <p className="text-sm text-muted-foreground">Get notified when trades are executed</p>
                    </div>
                    <Switch
                      checked={notificationSettings.tradeAlerts}
                      onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, tradeAlerts: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Price Alerts</Label>
                      <p className="text-sm text-muted-foreground">Receive alerts when price targets are hit</p>
                    </div>
                    <Switch
                      checked={notificationSettings.priceAlerts}
                      onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, priceAlerts: checked})}
                    />
                  </div>
                </div>
                
                <Button onClick={handleSaveNotifications}>Save Notification Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trading" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Trading Preferences</CardTitle>
                <CardDescription>Configure your default trading settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Auto-Execute Strategies</Label>
                      <p className="text-sm text-muted-foreground">Automatically execute strategy signals</p>
                    </div>
                    <Switch
                      checked={tradingSettings.autoExecute}
                      onCheckedChange={(checked) => setTradingSettings({...tradingSettings, autoExecute: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Confirm Trades</Label>
                      <p className="text-sm text-muted-foreground">Require confirmation before executing trades</p>
                    </div>
                    <Switch
                      checked={tradingSettings.confirmTrades}
                      onCheckedChange={(checked) => setTradingSettings({...tradingSettings, confirmTrades: checked})}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="defaultQuantity">Default Quantity</Label>
                    <Input
                      id="defaultQuantity"
                      type="number"
                      value={tradingSettings.defaultQuantity}
                      onChange={(e) => setTradingSettings({...tradingSettings, defaultQuantity: Number(e.target.value)})}
                    />
                  </div>
                </div>
                
                <Button onClick={handleSaveTrading}>Save Trading Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Appearance Settings</CardTitle>
                <CardDescription>Customize the look and feel of the application</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Dark Mode</Label>
                      <p className="text-sm text-muted-foreground">Use dark theme for the interface</p>
                    </div>
                    <Switch
                      checked={isDarkMode}
                      onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>System Theme</Label>
                      <p className="text-sm text-muted-foreground">Follow system dark/light mode preference</p>
                    </div>
                    <Switch
                      checked={theme === 'system'}
                      onCheckedChange={(checked) => setTheme(checked ? 'system' : 'light')}
                    />
                  </div>
                </div>
                
                <Button onClick={handleSaveAppearance}>Save Appearance Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default SettingsPage;
