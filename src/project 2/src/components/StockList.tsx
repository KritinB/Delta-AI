import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, DollarSign, BarChart3, Star, AlertTriangle } from 'lucide-react';

export interface Stock {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: string;
  marketCap: string;
  sector: string;
  recommendation: 'Strong Buy' | 'Buy' | 'Hold' | 'Sell' | 'Strong Sell';
  suggestedInvestment: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  analystRating: number;
}

interface StockListProps {
  onStockSelect: (stock: Stock) => void;
}

const StockList: React.FC<StockListProps> = ({ onStockSelect }) => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [sortBy, setSortBy] = useState<'symbol' | 'price' | 'change' | 'volume'>('symbol');
  const [filterSector, setFilterSector] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Simulate fetching stock data
    const mockStocks: Stock[] = [
      {
        id: '1',
        symbol: 'AAPL',
        name: 'Apple Inc.',
        price: 189.25,
        change: 2.45,
        changePercent: 1.31,
        volume: '45.2M',
        marketCap: '2.95T',
        sector: 'Technology',
        recommendation: 'Buy',
        suggestedInvestment: 2500,
        riskLevel: 'Low',
        analystRating: 4.2
      },
      {
        id: '2',
        symbol: 'GOOGL',
        name: 'Alphabet Inc.',
        price: 142.87,
        change: -1.23,
        changePercent: -0.85,
        volume: '28.7M',
        marketCap: '1.78T',
        sector: 'Technology',
        recommendation: 'Strong Buy',
        suggestedInvestment: 3000,
        riskLevel: 'Medium',
        analystRating: 4.5
      },
      {
        id: '3',
        symbol: 'MSFT',
        name: 'Microsoft Corporation',
        price: 378.91,
        change: 4.12,
        changePercent: 1.10,
        volume: '32.1M',
        marketCap: '2.81T',
        sector: 'Technology',
        recommendation: 'Buy',
        suggestedInvestment: 2800,
        riskLevel: 'Low',
        analystRating: 4.3
      },
      {
        id: '4',
        symbol: 'TSLA',
        name: 'Tesla, Inc.',
        price: 248.50,
        change: -8.75,
        changePercent: -3.40,
        volume: '89.3M',
        marketCap: '789B',
        sector: 'Automotive',
        recommendation: 'Hold',
        suggestedInvestment: 1500,
        riskLevel: 'High',
        analystRating: 3.1
      },
      {
        id: '5',
        symbol: 'AMZN',
        name: 'Amazon.com Inc.',
        price: 155.89,
        change: 1.87,
        changePercent: 1.21,
        volume: '41.6M',
        marketCap: '1.62T',
        sector: 'E-commerce',
        recommendation: 'Buy',
        suggestedInvestment: 2200,
        riskLevel: 'Medium',
        analystRating: 4.0
      },
      {
        id: '6',
        symbol: 'NVDA',
        name: 'NVIDIA Corporation',
        price: 875.28,
        change: 15.67,
        changePercent: 1.82,
        volume: '52.8M',
        marketCap: '2.16T',
        sector: 'Technology',
        recommendation: 'Strong Buy',
        suggestedInvestment: 3500,
        riskLevel: 'High',
        analystRating: 4.7
      },
      {
        id: '7',
        symbol: 'JPM',
        name: 'JPMorgan Chase & Co.',
        price: 168.45,
        change: 0.89,
        changePercent: 0.53,
        volume: '12.4M',
        marketCap: '493B',
        sector: 'Financial',
        recommendation: 'Buy',
        suggestedInvestment: 2000,
        riskLevel: 'Low',
        analystRating: 3.8
      },
      {
        id: '8',
        symbol: 'JNJ',
        name: 'Johnson & Johnson',
        price: 162.33,
        change: -0.45,
        changePercent: -0.28,
        volume: '8.9M',
        marketCap: '428B',
        sector: 'Healthcare',
        recommendation: 'Hold',
        suggestedInvestment: 1800,
        riskLevel: 'Low',
        analystRating: 3.5
      },
      {
        id: '9',
        symbol: 'V',
        name: 'Visa Inc.',
        price: 267.89,
        change: 3.21,
        changePercent: 1.21,
        volume: '6.7M',
        marketCap: '567B',
        sector: 'Financial',
        recommendation: 'Buy',
        suggestedInvestment: 2400,
        riskLevel: 'Low',
        analystRating: 4.1
      },
      {
        id: '10',
        symbol: 'WMT',
        name: 'Walmart Inc.',
        price: 159.67,
        change: 1.23,
        changePercent: 0.78,
        volume: '15.2M',
        marketCap: '434B',
        sector: 'Retail',
        recommendation: 'Hold',
        suggestedInvestment: 1600,
        riskLevel: 'Low',
        analystRating: 3.4
      }
    ];
    setStocks(mockStocks);
  }, []);

  const sectors = ['All', ...Array.from(new Set(stocks.map(stock => stock.sector)))];

  const filteredStocks = stocks
    .filter(stock => filterSector === 'All' || stock.sector === filterSector)
    .filter(stock => 
      stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return b.price - a.price;
        case 'change':
          return b.change - a.change;
        case 'volume':
          return parseFloat(b.volume) - parseFloat(a.volume);
        default:
          return a.symbol.localeCompare(b.symbol);
      }
    });

  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case 'Strong Buy': return 'text-green-700 bg-green-100';
      case 'Buy': return 'text-green-600 bg-green-50';
      case 'Hold': return 'text-yellow-600 bg-yellow-50';
      case 'Sell': return 'text-red-600 bg-red-50';
      case 'Strong Sell': return 'text-red-700 bg-red-100';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'text-green-600 bg-green-50';
      case 'Medium': return 'text-yellow-600 bg-yellow-50';
      case 'High': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-blue-600" />
            Stock Exchange
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Search stocks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            
            <select
              value={filterSector}
              onChange={(e) => setFilterSector(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {sectors.map(sector => (
                <option key={sector} value={sector}>{sector}</option>
              ))}
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="symbol">Symbol</option>
              <option value="price">Price</option>
              <option value="change">Change</option>
              <option value="volume">Volume</option>
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Change</th>
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Volume</th>
              <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Recommendation</th>
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Suggested Investment</th>
              <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Risk</th>
              <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredStocks.map((stock) => (
              <tr 
                key={stock.id} 
                className="hover:bg-gray-50 cursor-pointer transition-colors duration-150"
                onClick={() => onStockSelect(stock)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-bold text-gray-900">{stock.symbol}</div>
                    <div className="text-sm text-gray-500 truncate max-w-32">{stock.name}</div>
                    <div className="text-xs text-gray-400">{stock.sector}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="text-sm font-semibold text-gray-900">${stock.price.toFixed(2)}</div>
                  <div className="text-xs text-gray-500">{stock.marketCap}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className={`flex items-center justify-end gap-1 ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {stock.change >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    <span className="text-sm font-medium">
                      {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}
                    </span>
                  </div>
                  <div className={`text-xs ${stock.changePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    ({stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%)
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                  {stock.volume}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getRecommendationColor(stock.recommendation)}`}>
                    {stock.recommendation}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="flex items-center justify-end gap-1 text-sm font-semibold text-blue-600">
                    <DollarSign className="w-4 h-4" />
                    {stock.suggestedInvestment.toLocaleString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${getRiskColor(stock.riskLevel)}`}>
                    {stock.riskLevel === 'High' && <AlertTriangle className="w-3 h-3" />}
                    {stock.riskLevel}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-900">{stock.analystRating}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockList;