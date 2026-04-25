import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import axios from 'axios';

const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [chatMode, setChatMode] = useState('GENERAL');
  const [activePuppy, setActivePuppy] = useState(null);
  const [userId, setUserId] = useState(null);
  
  const chatRef = useRef(null);
  const scrollRef = useRef(null);

  const API_BASE_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:5000/api/v1/chat' 
    : 'https://backpets.vercel.app/api/v1/chat';

  useEffect(() => {
    let id = localStorage.getItem('signature_client_token');
    if (!id) {
      id = `sig_${Math.random().toString(36).substr(2, 9)}_${Date.now()}`;
      localStorage.setItem('signature_client_token', id);
    }
    setUserId(id);
  }, []);

  const fetchMessages = async () => {
    if (!userId) return;
    try {
      const res = await axios.get(`${API_BASE_URL}/messages/${userId}`);
      if (res.data.success) {
        setMessages(res.data.data);
      }
    } catch (err) {
      console.error("Sync error:", err);
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      fetchMessages();
      const interval = setInterval(fetchMessages, 4000);
      return () => clearInterval(interval);
    }
  }, [isOpen, userId]);

  // Gestion responsive : bloque le scroll du body quand le chat est ouvert sur mobile
  useEffect(() => {
    if (isOpen && window.innerWidth < 768) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  useEffect(() => {
    const handleOpenChat = (e) => {
      setIsOpen(true);
      if (e.detail && e.detail.mode === 'ADOPTION') {
        setChatMode('ADOPTION');
        setActivePuppy({
          name: e.detail.puppyName,
          image: e.detail.puppyImage
        });
        setInputValue(e.detail.message);
      }
    };
    window.addEventListener('openSignatureChat', handleOpenChat);
    return () => window.removeEventListener('openSignatureChat', handleOpenChat);
  }, []);

  const handleSend = async () => {
    if (!inputValue.trim()) return;
    const newMessage = {
      senderId: userId,
      text: inputValue,
      puppyContext: chatMode === 'ADOPTION' ? activePuppy : null,
      isAdmin: false,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
    const textToSend = inputValue;
    setInputValue("");
    try {
      await axios.post(`${API_BASE_URL}/messages`, newMessage);
    } catch (err) { console.error("Send error:", err); }
  };

  return (
    <div ref={chatRef} className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[100] font-sans flex flex-col items-end">
      
      {/* Fenêtre de Chat */}
      <div
        className={`
          fixed inset-0 md:absolute md:inset-auto md:bottom-20 md:right-0 
          w-full h-full md:h-auto md:w-[380px] 
          bg-white shadow-2xl transition-all duration-500 transform origin-bottom-right
          flex flex-col border border-brand-gold/20
          ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-10 pointer-events-none'}
        `}
      >
        {/* Header - Plus compact sur mobile */}
        <div className={`p-4 md:p-6 text-white flex justify-between items-center ${chatMode === 'ADOPTION' ? 'bg-brand-terracotta' : 'bg-brand-dark'}`}>
          <div>
            <span className="block text-brand-gold tracking-[0.3em] uppercase text-[7px] md:text-[8px] mb-1">
              {chatMode === 'ADOPTION' ? 'Priority Adoption' : 'Concierge Service'}
            </span>
            <h3 className="font-serif italic text-xl md:text-2xl">
              {chatMode === 'ADOPTION' ? activePuppy?.name : 'Signature Chat'}
            </h3>
          </div>
          <button onClick={() => setIsOpen(false)} className="md:hidden p-2 hover:bg-white/10 rounded-full">
            <X size={24} />
          </button>
        </div>

        {/* Body - Prend toute la place dispo */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-4 md:p-6 bg-[#FAF9F6] space-y-4 flex flex-col"
        >
          {messages.length === 0 && (
            <p className="text-[10px] text-center text-gray-400 uppercase tracking-widest mt-10 italic">
              Connecting to Signature House...
            </p>
          )}
          {messages.map((msg, index) => (
            <div key={index} className={`flex flex-col ${msg.isAdmin ? 'items-start' : 'items-end'}`}>
              <div className={`p-3 md:p-4 shadow-sm max-w-[90%] md:max-w-[85%] text-sm font-light leading-relaxed ${
                msg.isAdmin ? 'bg-white border border-brand-gold/10 text-brand-dark rounded-r-xl rounded-tl-xl' : 'bg-brand-dark text-white rounded-l-xl rounded-tr-xl'
              }`}>
                {msg.text}
              </div>
              <span className="text-[7px] uppercase tracking-tighter text-gray-400 mt-1 px-1">
                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          ))}
        </div>

        {/* Footer - Reste en bas même avec clavier mobile */}
        <div className="p-4 bg-white border-t border-brand-gold/10 pb-8 md:pb-4">
          <div className="relative flex items-center bg-[#FAF9F6] px-4 rounded-full border border-transparent focus-within:border-brand-gold/30 transition-all">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Your inquiry..."
              className="w-full bg-transparent py-3 pr-10 text-sm focus:outline-none font-light"
            />
            <button onClick={handleSend} className="absolute right-3 text-brand-gold hover:text-brand-dark transition-colors">
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Bouton Toggle - Caché quand le chat est ouvert sur mobile */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full transition-all duration-500 shadow-2xl
          ${isOpen && window.innerWidth < 768 ? 'hidden' : 'flex'}
          ${isOpen ? 'bg-brand-dark rotate-90' : 'bg-brand-gold hover:scale-110'}
        `}
      >
        {isOpen ? <X className="text-white w-6 h-6" /> : <MessageCircle className="text-brand-dark w-7 h-7" />}
      </button>
    </div>
  );
};

export default LiveChat;