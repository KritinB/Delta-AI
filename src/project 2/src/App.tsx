import React, { useState } from 'react';
import { TrendingUp, BarChart3, Building2 } from 'lucide-react';
import StockList, { Stock } from './components/StockList';
import StockDetail from './components/StockDetail';
import ChatBot from './components/ChatBot';
import MarketOverview from './components/MarketOverview';

function App() {
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleStockSelect = (stock: Stock) => {
    setSelectedStock(stock);
  };

  const handleCloseDetail = () => {
    setSelectedStock(null);
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-4 mb-6">
            <div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg">
              <Building2 className="w-10 h-10 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-5xl font-bold text-gray-900">InvestPro</h1>
              <p className="text-lg text-gray-600">Professional Investment Platform</p>
            </div>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover investment opportunities with AI-powered recommendations, comprehensive market analysis, 
            and personalized investment guidance tailored to your financial goals.
          </p>
        </div>

        {/* Market Overview */}
        <MarketOverview />

        {/* Stock Exchange */}
        <div className="mb-8">
          <StockList onStockSelect={handleStockSelect} />
        </div>

        {/* Footer */}
        <div className="text-center text-gray-500">
          <div className="flex justify-center items-center gap-2 mb-4">
            <BarChart3 className="w-5 h-5" />
            <span className="font-semibold">InvestPro</span>
          </div>
          <p className="text-sm max-w-2xl mx-auto">
            * Investment recommendations are based on algorithmic analysis and should not be considered as financial advice. 
            Past performance does not guarantee future results. Always consult with a qualified financial advisor before making investment decisions.
            All data is for educational and informational purposes only.
          </p>
          <div className="mt-4 flex justify-center gap-6 text-xs">
            <span>Real-time Data</span>
            <span>•</span>
            <span>AI-Powered Analysis</span>
            <span>•</span>
            <span>24/7 Support</span>
          </div>
        </div>
      </div>

      {/* Stock Detail Modal */}
      {selectedStock && (
        <StockDetail stock={selectedStock} onClose={handleCloseDetail} />
      )}

      {/* AI ChatBot */}
      <ChatBot isOpen={isChatOpen} onToggle={toggleChat} />
    </div>
  );
}

export default App;