import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Send, User, MessageSquare, Dog } from 'lucide-react';

const AdminChat = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:5000/api/v1/chat' 
    : 'https://backpets.vercel.app/api/v1/chat';

  // 1. Charger la liste des conversations (le menu de gauche)
  const fetchConversations = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/admin/conversations`);
      if (res.data.success) {
        setConversations(res.data.data);
      }
      setLoading(false);
    } catch (err) {
      console.error("Erreur chargement conversations", err);
    }
  };

  // 2. Charger les messages d'un client précis
  const fetchMessages = async (senderId) => {
    try {
      const res = await axios.get(`${API_BASE_URL}/messages/${senderId}`);
      if (res.data.success) {
        setMessages(res.data.data);
      }
    } catch (err) {
      console.error("Erreur chargement messages", err);
    }
  };

  // Polling pour la liste et la discussion active
  useEffect(() => {
    fetchConversations();
    const interval = setInterval(() => {
      fetchConversations();
      if (selectedId) fetchMessages(selectedId);
    }, 5000);
    return () => clearInterval(interval);
  }, [selectedId]);

  // 3. Envoyer une réponse (isAdmin: true)
  const handleSendReply = async () => {
    if (!reply.trim() || !selectedId) return;

    const payload = {
      senderId: selectedId,
      text: reply,
      isAdmin: true,
      timestamp: new Date()
    };

    // Optimistic UI
    setMessages(prev => [...prev, payload]);
    setReply("");

    try {
      await axios.post(`${API_BASE_URL}/messages`, payload);
      fetchConversations(); // Rafraîchir la liste pour remonter la conv en haut
    } catch (err) {
      console.error("Erreur envoi réponse", err);
    }
  };

  if (loading) return <div className="p-10 text-center font-serif italic">Loading Concierge Dashboard...</div>;

  return (
    <div className="flex h-screen bg-[#FAF9F6] font-sans">
      {/* Sidebar : Liste des clients */}
      <div className="w-1/3 border-r border-brand-gold/20 bg-white flex flex-col">
        <div className="p-6 border-b border-brand-gold/10 bg-brand-dark text-white">
          <h2 className="font-serif italic text-xl text-brand-gold">Inquiries</h2>
          <p className="text-[10px] uppercase tracking-widest opacity-60">Signature Pets Management</p>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {conversations.map((conv) => (
            <div 
              key={conv._id}
              onClick={() => setSelectedId(conv._id)}
              className={`p-4 border-b border-brand-gold/5 cursor-pointer transition-colors ${
                selectedId === conv._id ? 'bg-brand-gold/5 border-r-4 border-r-brand-gold' : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex justify-between items-start mb-1">
                <span className="text-[10px] font-bold text-brand-dark truncate w-32 uppercase tracking-tighter">
                  ID: {conv._id.split('_')[1] || conv._id}
                </span>
                <span className="text-[8px] text-gray-400">
                  {new Date(conv.lastUpdate).toLocaleTimeString()}
                </span>
              </div>
              <p className="text-sm text-gray-600 line-clamp-1 italic">"{conv.lastMessage}"</p>
              {conv.puppy && (
                <div className="mt-2 flex items-center gap-2 text-[9px] text-brand-terracotta font-bold uppercase">
                  <span>Inquiry for {conv.puppy.name}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main : Fenêtre de chat */}
      <div className="flex-1 flex flex-col">
        {selectedId ? (
          <>
            {/* Chat Header */}
            <div className="p-6 bg-white border-b border-brand-gold/10 flex justify-between items-center">
              <div>
                <h3 className="text-brand-dark font-serif text-lg">Conversation with Client</h3>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest italic">{selectedId}</p>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-8 space-y-4 bg-[#F4F1EA]">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.isAdmin ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[70%] p-4 shadow-sm text-sm ${
                    msg.isAdmin 
                    ? 'bg-brand-dark text-white rounded-l-lg rounded-tr-lg' 
                    : 'bg-white text-brand-dark border border-brand-gold/10 rounded-r-lg rounded-tl-lg'
                  }`}>
                    {msg.text}
                    <div className={`text-[7px] mt-2 uppercase opacity-50 ${msg.isAdmin ? 'text-right' : 'text-left'}`}>
                      {new Date(msg.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="p-6 bg-white border-t border-brand-gold/10">
              <div className="flex gap-4">
                <input 
                  type="text"
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendReply()}
                  placeholder="Write your professional response..."
                  className="flex-1 border-b border-brand-dark/10 focus:border-brand-gold outline-none py-2 text-sm font-light"
                />
                <button 
                  onClick={handleSendReply}
                  className="bg-brand-dark text-brand-gold p-3 rounded-full hover:bg-black transition-colors"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-300">
            <MessageSquare size={48} className="mb-4 opacity-20" />
            <p className="font-serif italic">Select a conversation to begin the concierge service.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminChat;