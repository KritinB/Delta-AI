import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Bot, User, TrendingUp, DollarSign, BarChart3, AlertCircle } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface ChatBotProps {
  isOpen: boolean;
  onToggle: () => void;
}

const ChatBot: React.FC<ChatBotProps> = ({ isOpen, onToggle }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your AI investment assistant. I can help you with stock analysis, investment strategies, market insights, and answer any questions about the stocks listed on our platform. How can I assist you today?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    // Investment advice responses
    if (message.includes('invest') || message.includes('investment')) {
      return "For investment advice, I recommend diversifying your portfolio across different sectors. Based on our current listings, technology stocks like NVDA and GOOGL show strong growth potential, while financial stocks like JPM offer stability. Always consider your risk tolerance and investment timeline.";
    }
    
    // Stock-specific responses
    if (message.includes('apple') || message.includes('aapl')) {
      return "Apple (AAPL) is currently showing positive momentum with a 'Buy' recommendation. Our analysis suggests a $2,500 investment allocation with low risk. The company's strong fundamentals and consistent innovation make it a solid choice for long-term investors.";
    }
    
    if (message.includes('tesla') || message.includes('tsla')) {
      return "Tesla (TSLA) is currently rated as 'Hold' due to recent volatility. While the company has strong long-term prospects in the EV market, the high risk level suggests careful position sizing. Consider a $1,500 allocation if you have a high risk tolerance.";
    }
    
    if (message.includes('nvidia') || message.includes('nvda')) {
      return "NVIDIA (NVDA) has a 'Strong Buy' rating with our highest analyst score of 4.7/5. The AI boom has driven significant growth, but the high risk level means you should be prepared for volatility. Our suggested investment is $3,500 for qualified investors.";
    }
    
    // Risk-related responses
    if (message.includes('risk') || message.includes('safe')) {
      return "For low-risk investments, consider stocks like Apple (AAPL), Microsoft (MSFT), or Visa (V). These have stable business models and consistent performance. High-risk, high-reward options include Tesla (TSLA) and NVIDIA (NVDA), but only invest what you can afford to lose.";
    }
    
    // Market analysis responses
    if (message.includes('market') || message.includes('analysis')) {
      return "Current market conditions show mixed signals. Technology sector remains strong with companies like NVDA leading gains. Financial sector shows stability with JPM performing well. I recommend maintaining a balanced portfolio with 60% large-cap stocks, 30% growth stocks, and 10% defensive positions.";
    }
    
    // Sector-specific responses
    if (message.includes('technology') || message.includes('tech')) {
      return "The technology sector is showing strong performance with companies like Apple, Microsoft, Google, and NVIDIA leading the way. AI and cloud computing are major growth drivers. However, be aware of potential volatility and regulatory concerns.";
    }
    
    // Portfolio advice
    if (message.includes('portfolio') || message.includes('diversify')) {
      return "A well-diversified portfolio should include: 40% large-cap stocks (AAPL, MSFT), 25% growth stocks (GOOGL, NVDA), 20% value stocks (JPM, JNJ), 10% international exposure, and 5% cash reserves. Rebalance quarterly and adjust based on your risk tolerance.";
    }
    
    // Beginner advice
    if (message.includes('beginner') || message.includes('start') || message.includes('new')) {
      return "Welcome to investing! Start with our low-risk recommendations like Apple (AAPL) or Microsoft (MSFT). Begin with small amounts, focus on learning, and gradually increase your investments. Consider dollar-cost averaging to reduce timing risk. Never invest money you can't afford to lose.";
    }
    
    // Default responses
    const defaultResponses = [
      "I can help you analyze any of the stocks in our exchange. Would you like specific information about a particular stock or sector?",
      "Based on our current market analysis, I can provide insights on investment strategies, risk assessment, or specific stock recommendations. What interests you most?",
      "I'm here to help with your investment decisions. You can ask me about specific stocks, market trends, portfolio diversification, or risk management strategies.",
      "Our platform tracks the top performing stocks across various sectors. I can provide detailed analysis on any stock that catches your interest. What would you like to know?"
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(inputText),
        isBot: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    "What stocks should I buy?",
    "How much should I invest?",
    "What's the market outlook?",
    "Explain risk levels"
  ];

  if (!isOpen) {
    return (
      <button
        onClick={onToggle}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-40"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col z-40">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold">AI Investment Assistant</h3>
            <p className="text-xs opacity-90">Online • Ready to help</p>
          </div>
        </div>
        <button
          onClick={onToggle}
          className="p-1 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.isBot ? 'justify-start' : 'justify-end'}`}
          >
            {message.isBot && (
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-white" />
              </div>
            )}
            <div
              className={`max-w-[80%] p-3 rounded-2xl ${
                message.isBot
                  ? 'bg-gray-100 text-gray-900'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
              }`}
            >
              <p className="text-sm leading-relaxed">{message.text}</p>
              <p className={`text-xs mt-1 ${message.isBot ? 'text-gray-500' : 'text-blue-100'}`}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
            {!message.isBot && (
              <div className="w-8 h-8 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4 text-white" />
              </div>
            )}
          </div>
        ))}
        
        {isTyping && (
          <div className="flex gap-3 justify-start">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="bg-gray-100 p-3 rounded-2xl">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Questions */}
      {messages.length === 1 && (
        <div className="px-4 pb-2">
          <p className="text-xs text-gray-500 mb-2">Quick questions:</p>
          <div className="grid grid-cols-2 gap-2">
            {quickQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => setInputText(question)}
                className="text-xs p-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-left transition-colors"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about stocks, investments, or market trends..."
            className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim()}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white p-2 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;