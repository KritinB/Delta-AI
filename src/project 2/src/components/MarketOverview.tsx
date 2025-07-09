import React from 'react';
import { TrendingUp, TrendingDown, BarChart3, DollarSign, Activity, Globe } from 'lucide-react';

const MarketOverview: React.FC = () => {
  const marketData = {
    indices: [
      { name: 'S&P 500', value: '4,567.89', change: '+23.45', changePercent: '+0.52%', isPositive: true },
      { name: 'NASDAQ', value: '14,234.56', change: '+89.12', changePercent: '+0.63%', isPositive: true },
      { name: 'DOW JONES', value: '34,789.23', change: '-45.67', changePercent: '-0.13%', isPositive: false },
    ],
    stats: [
      { label: 'Market Cap', value: '$45.2T', icon: DollarSign, color: 'text-blue-600' },
      { label: 'Daily Volume', value: '$892B', icon: Activity, color: 'text-green-600' },
      { label: 'Active Stocks', value: '4,567', icon: BarChart3, color: 'text-purple-600' },
      { label: 'Global Markets', value: '24/7', icon: Globe, color: 'text-indigo-600' },
    ]
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <TrendingUp className="w-6 h-6 text-blue-600" />
        Market Overview
      </h2>
      
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Market Indices */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Major Indices</h3>
          <div className="space-y-4">
            {marketData.indices.map((index, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <h4 className="font-semibold text-gray-900">{index.name}</h4>
                  <p className="text-2xl font-bold text-gray-900">{index.value}</p>
                </div>
                <div className={`text-right ${index.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  <div className="flex items-center gap-1 justify-end">
                    {index.isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    <span className="font-medium">{index.change}</span>
                  </div>
                  <p className="text-sm">{index.changePercent}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Market Stats */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Market Statistics</h3>
          <div className="grid grid-cols-2 gap-4">
            {marketData.stats.map((stat, i) => (
              <div key={i} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  <span className="text-sm font-medium text-gray-600">{stat.label}</span>
                </div>
                <p className="text-xl font-bold text-gray-900">{stat.value}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
            <h4 className="font-semibold text-gray-900 mb-2">Market Sentiment</h4>
            <p className="text-sm text-gray-700">
              Current market conditions show cautious optimism with technology stocks leading gains. 
              Investors are focusing on AI and cloud computing sectors while maintaining defensive positions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketOverview;