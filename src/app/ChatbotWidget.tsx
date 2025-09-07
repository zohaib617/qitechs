'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send } from 'lucide-react';
import { getGeminiResponse } from './actions';

const ACCENT_COLOR = '#10B981'; // A beautiful green
const BG_COLOR = '#f8fafc'; // A light slate background
const USER_COLOR = '#ffffff';
const BOT_COLOR = '#e2e8f0';

interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
  isTyping?: boolean;
}

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState<string>('');
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const chatMessagesRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [chat]);

  useEffect(() => {
    if (chat.length > 0) {
      const lastMessage = chat[chat.length - 1];
      if (lastMessage?.sender === 'bot' && lastMessage?.isTyping) {
        const fullText = lastMessage.text;
        let currentIndex = 0;

        const typingInterval = setInterval(() => {
          setChat(prevChat => {
            const updatedChat = [...prevChat];
            const messageToUpdate = updatedChat[updatedChat.length - 1];

            if (currentIndex < fullText.length) {
              messageToUpdate.text += fullText[currentIndex];
              currentIndex++;
            } else {
              messageToUpdate.isTyping = false;
              clearInterval(typingInterval);
            }
            return updatedChat;
          });
        }, 30);

        return () => clearInterval(typingInterval);
      }
    }
  }, [chat.length]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { sender: 'user', text: input };
    const updatedChat = [...chat, userMessage]; // ✅ Correct: Add new message to a copy of chat
    setChat(updatedChat);
    setInput('');
    setIsLoading(true);

    try {
      // ✅ Correct: Send the UPDATED history to the server
      const geminiResponse = await getGeminiResponse(userMessage.text, updatedChat);
      const botMessage: ChatMessage = { sender: 'bot', text: geminiResponse, isTyping: true };
      setChat(prevChat => [...prevChat, botMessage]);
    } catch (error) {
      console.error("Failed to fetch response:", error);
      const errorMessage: ChatMessage = { sender: 'bot', text: 'Sorry, I am unable to connect right now.' };
      setChat(prevChat => [...prevChat, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Chat Icon */}
      <motion.button
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 p-4 rounded-full shadow-lg z-50 transition-all duration-300"
        style={{ backgroundColor: ACCENT_COLOR, color: 'white' }}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1, rotate: 10 }}
        whileTap={{ scale: 0.9 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <X size={28} />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <MessageSquare size={28} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chatbot Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            // ✅ Responsive classes: w-full for mobile, max-w-sm for larger screens
            className="fixed bottom-[80px] right-4 md:bottom-24 md:right-6 w-[calc(100vw-32px)] md:w-80 h-[450px] rounded-xl shadow-2xl z-50 flex flex-col overflow-hidden"
            style={{ backgroundColor: 'white' }}
          >
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 text-white bg-gradient-to-br from-teal-500 to-emerald-600 shadow-md">
              <h2 className="text-xl font-semibold">AI Assistant</h2>
              <button onClick={() => setIsOpen(false)} className="p-1 rounded-full hover:bg-white/20 transition"><X size={20} /></button>
            </div>

            {/* Chat Messages */}
            <div ref={chatMessagesRef} className="flex-1 p-4 overflow-y-auto space-y-4" style={{ backgroundColor: BG_COLOR }}>
              {chat.map((msg, index) => (
                <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25, duration: 0.5 }}
                    className={`inline-block max-w-[85%] p-3 rounded-lg shadow-sm font-light leading-relaxed whitespace-pre-wrap`}
                    style={{
                      backgroundColor: msg.sender === 'user' ? ACCENT_COLOR : BOT_COLOR,
                      color: msg.sender === 'user' ? USER_COLOR : '#1e293b',
                      borderRadius: msg.sender === 'user' ? '12px 12px 0 12px' : '12px 12px 12px 0'
                    }}
                  >
                    {msg.text}
                  </motion.span>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="inline-block p-3 rounded-lg shadow-sm font-light"
                    style={{
                      backgroundColor: BOT_COLOR,
                      color: '#475569',
                      borderRadius: '12px 12px 12px 0'
                    }}
                  >
                    ...
                  </motion.span>
                </div>
              )}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 bg-white">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a question..."
                  className="flex-1 p-3 rounded-full border-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors duration-300 text-sm"
                  style={{ borderColor: ACCENT_COLOR }}
                  disabled={isLoading}
                />
                <motion.button
                  type="submit"
                  className="p-3 rounded-full text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ backgroundColor: ACCENT_COLOR }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isLoading || !input.trim()}
                >
                  <Send size={24} />
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}