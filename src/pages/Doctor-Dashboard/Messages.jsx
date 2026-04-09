import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DarshaiSidebar from "./DarshaiSidebar";
import { 
  MessageCircle, 
  Search, 
  Paperclip, 
  Send, 
  Bot, 
  Phone, 
  Video,
  Menu,
  User,
  Heart,
  AlertTriangle,
  Zap,
  Leaf
} from "lucide-react";

const conversations = [
  {
    id: 1,
    contact: "Rajesh Kumar (Patient)",
    lastMessage: "Thank you for the protocol update...",
    time: "2 min",
    unread: 3,
    avatar: "RK",
    color: "from-emerald-400 to-teal-500",
    type: "patient",
    dosha: "Vata-Pitta"
  },
  {
    id: 2,
    contact: "Dr. Anjali Mehta",
    lastMessage: "New research paper on Prakriti...",
    time: "5 min",
    unread: 1,
    avatar: "AM",
    color: "from-indigo-400 to-blue-500",
    type: "doctor",
    specialty: "Pulse Diagnosis"
  },
  {
    id: 3,
    contact: "Darshai AI Assistant",
    lastMessage: "Your Vata score analysis ready",
    time: "1 hr",
    unread: 0,
    avatar: "AI",
    color: "from-emerald-500 to-green-600",
    type: "ai",
    status: "Online"
  },
  {
    id: 4,
    contact: "Priya Sharma (Patient)",
    lastMessage: "Can we schedule tomorrow?",
    time: "3 hrs",
    unread: 2,
    avatar: "PS",
    color: "from-purple-400 to-pink-500",
    type: "patient",
    dosha: "Kapha"
  }
];

export default function Messages() {
  const [currentChat, setCurrentChat] = useState(conversations[2]); // Start with AI
  const [messages, setMessages] = useState([
    { id: 1, sender: "ai", text: "Hello Doctor! I'm your Ayurvedic AI assistant. Ask me about patient doshas, protocols, remedies, or anything wellness-related. How can I help today?", time: "Just now" }
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const [filteredConversations, setFilteredConversations] = useState(conversations);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getAIResponse = (userText) => {
    const lowerText = userText.toLowerCase();
    let response = "";
    
    if (lowerText.includes('vata')) {
      response = `Vata Imbalance Protocol:\n\n🧘 **Lifestyle:**\n• Regular routine\n• Warm oil massage daily\n• Early bedtime (9 PM)\n\n🌿 **Diet:**\n• Warm cooked soups\n• Ghee & sesame oil\n• Root vegetables\n• Avoid cold salads\n\n💊 **Herbs:**\nAshwagandha 500mg\nDashamula decoction`;
    } else if (lowerText.includes('pitta')) {
      response = `Pitta Cooling Therapy:\n\n❄️ **Diet:**\n• Coconut water\n• Cucumber/mint\n• Sweet fruits\n• Avoid chilies\n\n🛀 **Therapies:**\n• Sheetali pranayama\n• Moon bathing\n• Rose water spray\n\n🌱 **Herbs:**\nShatavari 500mg\nBrahmi 300mg`;
    } else if (lowerText.includes('kapha')) {
      response = `Kapha Stimulation:\n\n🔥 **Diet:**\n• Light soups\n• Ginger/ginger\n• Dry fruits\n• Reduce dairy\n\n🏃 **Exercise:**\n• Dry brushing\n• Steam therapy\n• Vigorous yoga\n\n🌿 **Herbs:**\nTrikatu 250mg\nPunarnava`;
    } else if (lowerText.includes('sleep')) {
      response = `Sleep Optimization:\n\n🌙 **Evening Routine:**\n• 9 PM dinner\n• Warm milk + nutmeg\n• No screens 1hr prior\n\n🧘 **Yoga Nidra:**\n10 min guided meditation\n\n💊 **Support:**\nJatamansi 250mg\nValor oil massage`;
    } else if (lowerText.includes('stress')) {
      response = `Stress Management:\n\n🧘 **Immediate:**\n• Nadi shodhana 5min\n• Ashwagandha 500mg\n• Corpse pose 10min\n\n📊 **Track:** HRV + cortisol\n\n🎯 **Protocol:** Sattva lifestyle`;
    } else if (lowerText.includes('patient') || lowerText.includes('dosha')) {
      response = "To analyze patient dosha:\n1. Pulse diagnosis\n2. Questionnaires\n3. Biometrics integration\n\nNeed patient ID or symptoms?";
    } else {
      response = "I can help with dosha analysis, protocols, remedies, lifestyle advice. Try: 'vata advice', 'pitta diet', 'sleep protocol', or patient details.";
    }
    
    return response;
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const userTime = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
      const userMsg = { id: Date.now(), sender: "user", text: newMessage, time: userTime };
      setMessages(prev => [...prev, userMsg]);
      setNewMessage("");
      setIsTyping(true);

      setTimeout(() => {
        const aiTime = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        const aiResponse = getAIResponse(newMessage);
        const aiMsg = { id: Date.now() + 1, sender: "ai", text: aiResponse, time: aiTime };
        setMessages(prev => [...prev, aiMsg]);
        setIsTyping(false);
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 800 + Math.random() * 1200);
    }
  };

  const aiQuickActions = [
    { text: "Vata remedies", response: getAIResponse("vata") },
    { text: "Pitta diet", response: getAIResponse("pitta") },
    { text: "Sleep protocol", response: getAIResponse("sleep") },
    { text: "Stress relief", response: getAIResponse("stress") }
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900/20 to-indigo-900/40">
      <DarshaiSidebar />
      <div className="flex-1 flex flex-col min-h-screen bg-white/3 backdrop-blur-xl">
        
        {/* Enhanced Header */}
        <div className="sticky top-0 z-20 bg-gradient-to-r from-emerald-500/95 via-teal-500/90 to-emerald-600/95 backdrop-blur-xl border-b border-emerald-400/50 shadow-2xl p-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-emerald-400/30 border-2 border-emerald-400/50 rounded-2xl flex items-center justify-center">
                <MessageCircle className="w-8 h-8 text-emerald-200" />
              </div>
              <div>
                <h1 className="text-3xl font-black bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent drop-shadow-xl">
                  Darshai Messenger
                </h1>
                <p className="text-emerald-200 font-medium">AI-Powered Ayurvedic Chat</p>
              </div>
            </div>
            <div className="flex gap-2">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                className="p-3 bg-white/20 hover:bg-white/30 backdrop-blur border border-white/30 rounded-2xl text-emerald-200 transition-all flex items-center gap-2"
              >
                <Bot className="w-5 h-5" />
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                className="p-3 bg-white/20 hover:bg-white/30 backdrop-blur border border-white/30 rounded-2xl text-white transition-all"
              >
                <Phone className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar Conversations */}
          <div className="w-80 flex flex-col bg-gradient-to-b from-emerald-500/10 to-teal-500/10 backdrop-blur-xl border-r border-emerald-400/30">
            <div className="p-6 border-b border-emerald-400/20">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-300" />
                <input 
                  type="text" 
                  placeholder="Search chats..."
                  className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-emerald-300 focus:ring-4 focus:ring-emerald-400/50 focus:outline-none transition-all"
                  onChange={(e) => {
                    const term = e.target.value.toLowerCase();
                    setFilteredConversations(conversations.filter(conv => 
                      conv.contact.toLowerCase().includes(term) || conv.type.includes(term)
                    ));
                  }}
                />
              </div>
            </div>

            <div className="flex-1 overflow-auto p-4 space-y-3">
              {filteredConversations.map((conv) => (
                <motion.button
                  key={conv.id}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setCurrentChat(conv)}
                  className={`w-full p-5 rounded-3xl transition-all backdrop-blur-xl relative overflow-hidden group ${
                    currentChat.id === conv.id 
                      ? "ring-4 ring-emerald-400/50 shadow-emerald-500/40 scale-105" 
                      : "hover:scale-[1.02] hover:shadow-emerald-400/30"
                  } ${currentChat.id === conv.id ? 'bg-gradient-to-r from-emerald-500/30 to-teal-500/30 border border-emerald-400/50' : 'bg-white/5 border border-white/20'}`}
                >
                  <div className="flex items-center gap-4 relative z-10">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-black shadow-2xl flex-shrink-0 ${conv.color}`}>
                      {conv.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="truncate font-black text-white text-lg">{conv.contact}</span>
                        {conv.status && <span className="px-2 py-1 bg-emerald-400/80 text-xs font-bold text-white rounded-full">{conv.status}</span>}
                      </div>
                      <p className="text-sm text-emerald-200 truncate font-medium">{conv.lastMessage}</p>
                      {conv.dosha && <span className="text-xs text-emerald-300 bg-emerald-400/20 px-3 py-1 rounded-full mt-1 inline-block">{conv.dosha}</span>}
                    </div>
                    <div className="flex flex-col items-end gap-1 text-xs text-emerald-300 font-medium">
                      <span>{conv.time}</span>
                      {conv.unread > 0 && (
                        <motion.div 
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                          className="w-7 h-7 bg-gradient-to-r from-red-400 to-rose-500 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg"
                        >
                          {conv.unread}
                        </motion.div>
                      )}
                    </div>
                  </div>
                  {/* Floating glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 opacity-0 group-hover:opacity-100 transition-opacity blur-xl rounded-3xl" />
                </motion.button>
              ))}
            </div>
          </div>

          {/* Main Chat */}
          <div className="flex-1 flex flex-col bg-gradient-to-b from-white/3 to-white/1 backdrop-blur-xl">
            {/* Chat Header */}
            <div className="p-8 border-b border-emerald-400/20 flex items-center gap-6 bg-gradient-to-r from-emerald-500/10">
              <div className={`w-16 h-16 rounded-3xl flex items-center justify-center text-2xl font-black shadow-2xl border-4 border-white/30 ${currentChat.color}`}>
                {currentChat.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="font-black text-2xl text-white drop-shadow-xl">{currentChat.contact}</h3>
                  {currentChat.online && (
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="w-3 h-3 bg-emerald-400 rounded-full shadow-lg"
                    />
                  )}
                </div>
                <p className="text-emerald-200 font-medium">{currentChat.type === "ai" ? "Ayurvedic Intelligence AI" : currentChat.type === "patient" ? "Patient Portal" : "Doctor Network"}</p>
              </div>
              <div className="flex items-center gap-3">
                <motion.button whileTap={{ scale: 0.95 }} className="p-3 bg-emerald-400/20 hover:bg-emerald-400/40 rounded-2xl border border-emerald-400/30 text-emerald-200 transition-all">
                  <Bot className="w-6 h-6" />
                </motion.button>
                <motion.button whileTap={{ scale: 0.95 }} className="p-3 bg-white/20 hover:bg-white/30 rounded-2xl border border-white/30 text-white transition-all">
                  <Phone className="w-6 h-6" />
                </motion.button>
                <motion.button whileTap={{ scale: 0.95 }} className="p-3 bg-white/20 hover:bg-white/30 rounded-2xl border border-white/30 text-white transition-all">
                  <Video className="w-6 h-6" />
                </motion.button>
              </div>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-auto p-8 space-y-6 bg-gradient-to-b from-transparent to-white/5">
              <AnimatePresence>
                {messages.map((msg, index) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    className={`flex ${msg.sender === "ai" ? "justify-end" : "justify-start"}`}
                  >
                    <motion.div 
                      layout
                      className={`max-w-lg p-6 rounded-3xl shadow-2xl backdrop-blur-xl border border-white/20 ${
                        msg.sender === "ai"
                          ? "bg-gradient-to-r from-emerald-400/90 via-teal-400/90 to-emerald-500/90 text-white shadow-emerald-500/50"
                          : "bg-white/10 text-white shadow-lg border-white/30"
                      }`}
                      whileHover={{ scale: 1.02 }}
                    >
                      {msg.sender === "ai" && (
                        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/20">
                          <div className="w-10 h-10 bg-emerald-500/80 rounded-2xl flex items-center justify-center shadow-lg">
                            <Bot className="w-6 h-6 text-white" />
                          </div>
                          <span className="font-bold text-lg text-emerald-100">Darshai AI</span>
                        </div>
                      )}
                      <p className="text-lg leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                      <p className="text-xs text-emerald-200 mt-4 opacity-90 font-medium text-right flex justify-end items-center gap-2">
                        {msg.sender === "ai" && <Zap className="w-3 h-3" />}
                        {msg.time}
                      </p>
                    </motion.div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl px-6 py-4 flex items-center gap-3 shadow-lg">
                    <div className="flex gap-1.5">
                      <motion.div className="w-2.5 h-2.5 bg-emerald-400 rounded-full" animate={{ y: [-5, 0, -5] }} transition={{ duration: 1.4, repeat: Infinity }} />
                      <motion.div className="w-2.5 h-2.5 bg-emerald-400 rounded-full" animate={{ y: [-5, 0, -5] }} transition={{ duration: 1.4, delay: 0.2, repeat: Infinity }} />
                      <motion.div className="w-2.5 h-2.5 bg-emerald-400 rounded-full" animate={{ y: [-5, 0, -5] }} transition={{ duration: 1.4, delay: 0.4, repeat: Infinity }} />
                    </div>
                    <span className="text-emerald-200 font-medium">Darshai AI is analyzing your dosha...</span>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={sendMessage} className="sticky bottom-0 p-8 border-t border-emerald-400/20 bg-gradient-to-t from-emerald-500/10">
              <div className="max-w-4xl mx-auto flex items-end gap-4 bg-white/5 backdrop-blur-xl rounded-3xl p-4 border border-white/20 shadow-2xl">
                <Paperclip className="w-6 h-6 text-emerald-300 flex-shrink-0 cursor-pointer hover:scale-110 transition-transform" />
                <input
                  ref={inputRef}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Ask about doshas, remedies, protocols... (try 'vata advice')"
                  className="flex-1 bg-transparent text-white placeholder-emerald-200 text-lg border-none outline-none py-4 resize-none max-h-32"
                  onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage(e)}
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={!newMessage.trim()}
                  className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 rounded-3xl flex items-center justify-center shadow-2xl hover:shadow-emerald-500/60 transition-all disabled:opacity-50 disabled:cursor-not-allowed border border-emerald-400/50"
                >
                  <Send className={`w-7 h-7 transition-transform ${newMessage.trim() ? 'rotate-45 scale-110' : ''}`} />
                </motion.button>
              </div>
              
              {/* Quick Actions */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl mx-auto mt-6 flex flex-wrap gap-3 justify-center"
              >
                {[
                  "Vata advice",
                  "Pitta diet", 
                  "Kapha exercise",
                  "Sleep protocol",
                  "Stress relief"
                ].map((quick, index) => (
                  <motion.button
                    key={quick}
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => {
                      setNewMessage(quick);
                      inputRef.current?.focus();
                    }}
                    className="px-6 py-3 bg-emerald-400/20 hover:bg-emerald-400/40 backdrop-blur border border-emerald-400/50 rounded-2xl text-emerald-200 font-medium transition-all text-sm"
                  >
                    {quick}
                  </motion.button>
                ))}
              </motion.div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

