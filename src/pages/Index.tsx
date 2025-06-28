import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, BarChart3, Brain, Shield, Zap, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Real-Time Market Data",
      description: "Access live market prices and data feeds across stocks, forex, crypto, and commodities.",
      color: "text-blue-600"
    },
    {
      icon: <Brain className="h-8 w-8" />,
      title: "AI-Powered Strategies",
      description: "Leverage advanced AI algorithms for automated trading strategies and market analysis.",
      color: "text-purple-600"
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Advanced Analytics",
      description: "Comprehensive portfolio analysis, risk management, and performance tracking tools.",
      color: "text-green-600"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Risk-Free Trading",
      description: "Practice trading with virtual money in a completely risk-free environment.",
      color: "text-orange-600"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Lightning Fast Execution",
      description: "Execute trades instantly with our high-performance trading engine.",
      color: "text-yellow-600"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Community & Learning",
      description: "Learn from top traders and share strategies with our trading community.",
      color: "text-red-600"
    }
  ];

  const stats = [
    { value: "50K+", label: "Active Traders" },
    { value: "$2.5B", label: "Volume Traded" },
    { value: "99.9%", label: "Uptime" },
    { value: "150+", label: "Instruments" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <Badge variant="outline" className="px-4 py-2 text-sm font-medium">
              🚀 Now in Beta - Join the Future of Trading
            </Badge>
            <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              TradeSimX
            </h1>
            <p className="text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              The most advanced trading simulation platform. Master the markets with AI-powered strategies, 
              real-time data, and comprehensive analytics.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white px-8 py-4 text-lg"
              onClick={() => navigate('/dashboard')}
            >
              Start Trading Now
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="px-8 py-4 text-lg"
            >
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mt-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                <div className="text-gray-600 dark:text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Why Choose TradeSimX?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Experience the most comprehensive trading simulation platform with cutting-edge features
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className={`${feature.color} mb-4`}>
                  {feature.icon}
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Trading?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of traders already using TradeSimX to perfect their strategies
          </p>
          <Button 
            size="lg" 
            variant="secondary" 
            className="px-8 py-4 text-lg bg-white text-blue-600 hover:bg-gray-100"
            onClick={() => navigate('/dashboard')}
          >
            Get Started Free
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">TradeSimX</h3>
              <p className="text-gray-400">
                The future of trading simulation and education.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Dashboard</li>
                <li>Strategies</li>
                <li>Portfolio</li>
                <li>Analytics</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Documentation</li>
                <li>API Reference</li>
                <li>Tutorials</li>
                <li>Community</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>About Us</li>
                <li>Contact</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 TradeSimX. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
