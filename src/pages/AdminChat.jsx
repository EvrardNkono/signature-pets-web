import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Send, User, MessageSquare, Dog, ChevronLeft } from 'lucide-react';

const AdminChat = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:5000/api/v1/chat' 
    : 'https://backpets.vercel.app/api/v1/chat';

  const fetchConversations = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/admin/conversations`);
      if (res.data.success) {
        setConversations(res.data.data);
      }
      setLoading(false);
    } catch (err) {
      console.error("Error loading conversations", err);
    }
  };

  const fetchMessages = async (senderId) => {
    try {
      const res = await axios.get(`${API_BASE_URL}/messages/${senderId}`);
      if (res.data.success) {
        setMessages(res.data.data);
      }
    } catch (err) {
      console.error("Error loading messages", err);
    }
  };

  useEffect(() => {
    fetchConversations();
    const interval = setInterval(() => {
      fetchConversations();
      if (selectedId) fetchMessages(selectedId);
    }, 5000);
    return () => clearInterval(interval);
  }, [selectedId]);

  const handleSendReply = async () => {
    if (!reply.trim() || !selectedId) return;

    const payload = {
      senderId: selectedId,
      text: reply,
      isAdmin: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, payload]);
    setReply("");

    try {
      await axios.post(`${API_BASE_URL}/messages`, payload);
      fetchConversations();
    } catch (err) {
      console.error("Error sending reply", err);
    }
  };

  if (loading) return <div className="p-10 text-center font-serif italic">Accessing Concierge Dashboard...</div>;

  return (
    <div className="flex h-screen bg-[#FAF9F6] font-sans overflow-hidden">
      
      {/* SIDEBAR : List of clients */}
      {/* Hidden on mobile if a conversation is selected */}
      <div className={`
        ${selectedId ? 'hidden md:flex' : 'flex'} 
        w-full md:w-1/3 lg:w-1/4 border-r border-brand-gold/20 bg-white flex-col
      `}>
        <div className="p-6 border-b border-brand-gold/10 bg-brand-dark text-white">
          <h2 className="font-serif italic text-xl text-brand-gold">Inquiries</h2>
          <p className="text-[10px] uppercase tracking-[0.2em] opacity-60">Signature Pets Management</p>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {conversations.length === 0 ? (
            <div className="p-10 text-center text-gray-400 text-xs italic">No active conversations.</div>
          ) : (
            conversations.map((conv) => (
              <div 
                key={conv._id}
                onClick={() => setSelectedId(conv._id)}
                className={`p-4 border-b border-brand-gold/5 cursor-pointer transition-all ${
                  selectedId === conv._id ? 'bg-brand-gold/10 border-r-4 border-r-brand-gold' : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="text-[10px] font-bold text-brand-dark truncate w-32 uppercase tracking-tighter">
                    Client: {conv._id.split('_')[1] || conv._id.substring(0, 8)}
                  </span>
                  <span className="text-[8px] text-gray-400">
                    {new Date(conv.lastUpdate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className="text-sm text-gray-600 line-clamp-1 italic">"{conv.lastMessage}"</p>
                {conv.puppy && (
                  <div className="mt-2 flex items-center gap-2 text-[9px] text-brand-terracotta font-bold uppercase tracking-wider">
                    <Dog size={10} />
                    <span>Inquiry for {conv.puppy.name}</span>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* MAIN CHAT WINDOW */}
      {/* Hidden on mobile if no conversation is selected */}
      <div className={`
        ${!selectedId ? 'hidden md:flex' : 'flex'} 
        flex-1 flex-col h-full
      `}>
        {selectedId ? (
          <>
            {/* Chat Header */}
            <div className="p-4 md:p-6 bg-white border-b border-brand-gold/10 flex items-center gap-4">
              <button 
                onClick={() => setSelectedId(null)}
                className="md:hidden p-2 text-brand-dark hover:bg-gray-100 rounded-full"
              >
                <ChevronLeft size={24} />
              </button>
              <div>
                <h3 className="text-brand-dark font-serif text-lg leading-tight">Client Engagement</h3>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest italic truncate max-w-[200px]">
                  Ref: {selectedId}
                </p>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-4 bg-[#F4F1EA]">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.isAdmin ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] md:max-w-[70%] p-4 shadow-sm text-sm leading-relaxed ${
                    msg.isAdmin 
                    ? 'bg-brand-dark text-white rounded-l-xl rounded-tr-xl' 
                    : 'bg-white text-brand-dark border border-brand-gold/10 rounded-r-xl rounded-tl-xl'
                  }`}>
                    {msg.text}
                    <div className={`text-[7px] mt-2 uppercase opacity-50 font-bold ${msg.isAdmin ? 'text-right' : 'text-left'}`}>
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="p-4 md:p-6 bg-white border-t border-brand-gold/10">
              <div className="flex gap-3 items-center">
                <input 
                  type="text"
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendReply()}
                  placeholder="Type your professional response..."
                  className="flex-1 bg-gray-50 rounded-full px-5 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-brand-gold transition-all font-light"
                />
                <button 
                  onClick={handleSendReply}
                  className="bg-brand-dark text-brand-gold p-3 rounded-full hover:bg-black transition-all shadow-lg active:scale-95"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-300 p-10 text-center">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-inner mb-6">
              <MessageSquare size={32} className="opacity-20" />
            </div>
            <h3 className="font-serif italic text-xl text-gray-400">Signature Concierge</h3>
            <p className="text-sm mt-2 font-light max-w-xs">Please select an active inquiry from the list to begin the management process.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminChat;