import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  BrainCircuit, 
  Send, 
  Sparkles, 
  User, 
  RefreshCw, 
  Lightbulb, 
  HelpCircle,
  TrendingUp,
  MessageSquare,
  Compass
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export const MentorChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      sender: 'assistant',
      content: "Hey there! I'm Merrick (the math whiz) and Malik is right here with me! 👟 Ask us anything about sneaker economics, calculating profits, understanding supply & demand curves, or avoiding hype bubbles!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputPrompt, setInputPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [customScenario, setCustomScenario] = useState<any>(null);
  const [scenarioLoading, setScenarioLoading] = useState(false);

  const samplePrompts = [
    "Why did the 1,000,000 pair restock crash the Comet Kicks price?",
    "Explain how to calculate Return on Investment (ROI) with a simple example.",
    "What is the difference between Gross Revenue and Net Profit?",
    "Why is going 'all in' with all your savings a bad strategy?"
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputPrompt;
    if (!query.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      content: query.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputPrompt('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].map(m => ({
            role: m.sender === 'user' ? 'user' : 'model',
            content: m.content
          }))
        })
      });

      if (!res.ok) {
        throw new Error('Could not connect to AI Mentor');
      }

      const data = await res.json();
      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        content: data.reply || "That's a fantastic financial question! Remember, data and disciplined budgeting always beat social media hype.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error(err);
      const fallbackMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        content: "Here is what we learned in The Sneaker Flip: When supply is low and demand is high, prices rise. But when a company floods the market with a restock, scarcity disappears and prices fall! Always protect your budget and do the math first.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  // Generate Custom Scenario via Gemini
  const generateNewScenario = async () => {
    setScenarioLoading(true);
    try {
      const res = await fetch('/api/gemini/generate-scenario', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ difficulty: 'medium' })
      });

      if (!res.ok) throw new Error('Failed to generate scenario');
      const data = await res.json();
      setCustomScenario(data);
    } catch (err: any) {
      console.error(err);
      setCustomScenario({
        sneakerName: "Solar Horizon 4s",
        retailPrice: 130,
        hypeLevel: "High",
        supplyUnits: "4,000 limited pairs",
        story: "A famous basketball point guard wore these in the championship finals. Resale is currently tracking at $210, but rumors say the factory might release 50,000 more next month.",
        options: [
          "Buy 1 pair at retail $130 and sell quickly for $210 (+$80 profit)",
          "Buy 4 pairs from online strangers for $200 each (High risk)",
          "Pass and wait to see if the factory restock rumor is confirmed"
        ],
        outcomes: "Option 1 locks in safe profit before the restock. Option 2 risks huge losses if 50k pairs flood the market."
      });
    } finally {
      setScenarioLoading(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6" id="mentor-chat-root">
      {/* Top Banner */}
      <div className="bg-white p-6 border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(30,41,59,1)] flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 border-3 border-slate-900 bg-orange-500 flex items-center justify-center text-white shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]">
            <BrainCircuit className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase">
              Ask Merrick & Malik: AI Economics Mentor
            </h2>
            <p className="text-xs font-black text-slate-500 uppercase tracking-wider">
              Powered by Gemini • Instant financial explanations, math guidance, & practice scenarios
            </p>
          </div>
        </div>

        <button
          onClick={generateNewScenario}
          disabled={scenarioLoading}
          className="px-4 py-2 bg-cyan-300 hover:bg-cyan-200 border-2 border-slate-900 text-slate-900 font-black text-xs uppercase tracking-wider transition flex items-center gap-1.5 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]"
        >
          <Sparkles className="w-4 h-4 text-slate-900 stroke-[2.5]" />
          {scenarioLoading ? 'Generating Scenario...' : 'Generate New Market Scenario'}
        </button>
      </div>

      {/* Grid: Chat Room + Scenario Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Chat Interface Column */}
        <div className="lg:col-span-7 bg-white p-6 border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(30,41,59,1)] space-y-4 flex flex-col h-[600px] justify-between">
          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto space-y-4 pr-1">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex items-start gap-3 ${m.sender === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div
                  className={`w-9 h-9 border-2 border-slate-900 flex items-center justify-center text-xs font-black shrink-0 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] ${
                    m.sender === 'user'
                      ? 'bg-slate-900 text-white'
                      : 'bg-orange-500 text-white'
                  }`}
                >
                  {m.sender === 'user' ? <User className="w-4 h-4 stroke-[2.5]" /> : '👟'}
                </div>

                <div
                  className={`p-4 text-xs leading-relaxed max-w-[85%] space-y-1.5 border-2 border-slate-900 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] ${
                    m.sender === 'user'
                      ? 'bg-slate-900 text-white font-medium'
                      : 'bg-amber-50 text-slate-900 font-bold whitespace-pre-line'
                  }`}
                >
                  <p>{m.content}</p>
                  <div
                    className={`text-[10px] text-right font-mono font-bold ${
                      m.sender === 'user' ? 'text-slate-400' : 'text-slate-500'
                    }`}
                  >
                    {m.timestamp}
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-orange-500 border-2 border-slate-900 text-white flex items-center justify-center text-xs font-black animate-pulse shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
                  👟
                </div>
                <div className="p-3 bg-amber-50 border-2 border-slate-900 text-xs text-slate-900 font-black flex items-center gap-2 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-orange-600 stroke-[2.5]" />
                  <span>Merrick is crunching the economics numbers...</span>
                </div>
              </div>
            )}
          </div>

          {/* Preset Prompts Bar */}
          <div className="pt-2 border-t-2 border-slate-900 space-y-2">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              <span className="text-[11px] font-black uppercase text-slate-600 shrink-0">Try asking:</span>
              {samplePrompts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(p)}
                  className="px-2.5 py-1 bg-amber-100 hover:bg-amber-200 border border-slate-900 text-slate-900 whitespace-nowrap text-[10px] font-black uppercase tracking-wider transition shadow-[1px_1px_0px_0px_rgba(15,23,42,1)]"
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputPrompt}
                onChange={(e) => setInputPrompt(e.target.value)}
                placeholder="Ask Merrick & Malik a question about economics..."
                className="flex-1 px-4 py-2.5 bg-amber-50 border-2 border-slate-900 text-xs font-bold text-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] focus:bg-white focus:outline-hidden"
              />
              <button
                type="submit"
                disabled={isLoading || !inputPrompt.trim()}
                className="p-2.5 bg-orange-500 hover:bg-orange-400 disabled:opacity-40 text-white font-black border-2 border-slate-900 transition shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]"
              >
                <Send className="w-4 h-4 stroke-[2.5]" />
              </button>
            </form>
          </div>
        </div>

        {/* Dynamic Scenario Generator Column */}
        <div className="lg:col-span-5 space-y-6">
          {customScenario ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(30,41,59,1)] space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-cyan-300 text-slate-900 font-black uppercase text-xs border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
                  AI Generated Scenario
                </span>
                <span className="text-xs font-mono font-black text-slate-700">
                  {customScenario.supplyUnits}
                </span>
              </div>

              <div>
                <h3 className="text-xl font-black text-slate-900 uppercase">
                  {customScenario.sneakerName}
                </h3>
                <div className="text-xs font-black uppercase text-orange-600 mt-0.5">
                  Retail MSRP: ${customScenario.retailPrice} • Hype: {customScenario.hypeLevel}
                </div>
              </div>

              <div className="p-3.5 bg-amber-50 border-2 border-slate-900 text-xs text-slate-900 leading-relaxed font-bold shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
                {customScenario.story}
              </div>

              <div className="space-y-2">
                <div className="text-xs font-black text-slate-900 uppercase tracking-wider">What would you do?</div>
                {customScenario.options?.map((opt: string, i: number) => (
                  <div key={i} className="p-2.5 bg-cyan-50 border-2 border-slate-900 text-xs text-slate-900 font-bold shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
                    {opt}
                  </div>
                ))}
              </div>

              <div className="p-3 bg-amber-100 border-2 border-slate-900 text-xs text-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
                <div className="font-black text-slate-900 uppercase">Merrick's Analysis:</div>
                <p className="mt-0.5 font-bold">{customScenario.outcomes}</p>
              </div>

              <button
                onClick={generateNewScenario}
                disabled={scenarioLoading}
                className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-black uppercase tracking-wider border-2 border-slate-900 transition shadow-[3px_3px_0px_0px_rgba(6,182,212,1)]"
              >
                Generate Another Scenario
              </button>
            </motion.div>
          ) : (
            <div className="bg-white p-6 border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(30,41,59,1)] space-y-4">
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2 uppercase tracking-wider pb-2 border-b-2 border-slate-900">
                <Compass className="w-4 h-4 text-orange-500 stroke-[2.5]" /> Economic Concepts Cheat Sheet
              </h3>
              
              <div className="space-y-2.5 text-xs">
                <div className="p-3 bg-amber-50 border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
                  <div className="font-black text-slate-900 uppercase">1. Supply & Demand</div>
                  <p className="text-slate-800 font-bold mt-0.5">Low supply + high demand = price increase. Restock oversupply = price crash.</p>
                </div>
                <div className="p-3 bg-amber-50 border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
                  <div className="font-black text-slate-900 uppercase">2. Net Profit vs Gross Revenue</div>
                  <p className="text-slate-800 font-bold mt-0.5">Gross is total money received. Net Profit is what remains after subtracting costs.</p>
                </div>
                <div className="p-3 bg-amber-50 border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
                  <div className="font-black text-slate-900 uppercase">3. Concentration Risk ("All In")</div>
                  <p className="text-slate-800 font-bold mt-0.5">Putting 100% of your savings into one volatile drop leaves you with no emergency backup.</p>
                </div>
              </div>

              <button
                onClick={generateNewScenario}
                disabled={scenarioLoading}
                className="w-full py-2.5 bg-orange-500 hover:bg-orange-400 text-white font-black uppercase tracking-wider border-2 border-slate-900 text-xs transition flex items-center justify-center gap-2 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]"
              >
                <Sparkles className="w-4 h-4 stroke-[2.5]" /> Try an AI Practice Scenario
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
