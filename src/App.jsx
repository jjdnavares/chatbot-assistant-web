import React, { useState, useRef, useEffect, useCallback } from 'react';
import { fetchChatCompletion } from './api';
import { ServersPage, DatabasesPage, NetworkPage, SettingsPage } from './mock-pages';

// Initial system message
const INITIAL_MESSAGE = {
  role: 'assistant',
  content: 'Hello! I am your Infrastructure Assistant. I can help you monitor and troubleshoot your infrastructure. How can I assist you today?'
};

export default function App() {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = useCallback(async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    const userMessage = { role: 'user', content: input };
    const updatedMessages = [...messages, userMessage];
    
    setMessages(updatedMessages);
    setInput('');
    setError(null);
    setIsLoading(true);
    
    try {
      const response = await fetchChatCompletion(updatedMessages);
      setMessages(prev => [...prev, response]);
    } catch (err) {
      console.error('Error in chat:', err);
      setError('Failed to get response. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, messages]);

  const [currentPage, setCurrentPage] = useState('dashboard');

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Floating Chatbot Icon */}
      {!chatOpen && (
        <div className="hidden md:flex fixed top-1/2 right-8 z-50 -translate-y-1/2 cursor-pointer shadow-2xl hover:shadow-[0_8px_32px_rgba(37,99,235,0.35)] transition-all rounded-full bg-blue-200 p-3" style={{ filter: 'drop-shadow(0 0 18px #2563eb88)' }}
          onClick={() => setChatOpen(true)}
          title="Open Chatbot"
        >
          <svg viewBox="0 0 32 32" width="36" height="36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="7" y="10" width="18" height="12" rx="6" fill="#2563eb"/>
            <rect x="11" y="16" width="2" height="2" rx="1" fill="#fff"/>
            <rect x="19" y="16" width="2" height="2" rx="1" fill="#fff"/>
            <rect x="9" y="8" width="14" height="4" rx="2" fill="#60a5fa"/>
            <rect x="14" y="4" width="4" height="4" rx="2" fill="#2563eb"/>
            <rect x="6" y="13" width="2" height="4" rx="1" fill="#2563eb"/>
            <rect x="24" y="13" width="2" height="4" rx="1" fill="#2563eb"/>
            <rect x="13" y="20" width="6" height="2" rx="1" fill="#fff"/>
          </svg>
        </div>
      )}
      {/* Sidebar navigation */}
      <aside className="hidden md:flex flex-col items-center w-20 bg-white shadow-lg border-r py-6 space-y-4">
        {/* Dashboard (active) */}
        <div className={`flex flex-col items-center cursor-pointer ${currentPage === 'dashboard' ? 'text-blue-600' : 'text-gray-400 hover:text-blue-500'}`} onClick={() => setCurrentPage('dashboard')}>
          <div className={`p-3 rounded-lg mb-1 ${currentPage === 'dashboard' ? 'bg-blue-100' : 'hover:bg-blue-50'}`}>
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="7" rx="2" fill="#3b82f6"/><rect x="7" y="6" width="10" height="4" rx="2" fill="#60a5fa"/></svg>
          </div>
          <span className="text-xs font-semibold">Dashboard</span>
        </div>
        {/* Servers */}
        <div className={`flex flex-col items-center cursor-pointer ${currentPage === 'servers' ? 'text-blue-600' : 'text-gray-400 hover:text-blue-500'}`} onClick={() => setCurrentPage('servers')}>
          <div className={`p-3 rounded-lg mb-1 ${currentPage === 'servers' ? 'bg-blue-100' : 'hover:bg-blue-50'}`}>
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="4" rx="2" fill="#3b82f6"/><rect x="3" y="15" width="18" height="4" rx="2" fill="#60a5fa"/><circle cx="7" cy="7" r="1" fill="#fff"/><circle cx="7" cy="17" r="1" fill="#fff"/></svg>
          </div>
          <span className="text-xs">Servers</span>
        </div>
        {/* Databases */}
        <div className={`flex flex-col items-center cursor-pointer ${currentPage === 'databases' ? 'text-purple-600' : 'text-gray-400 hover:text-purple-500'}`} onClick={() => setCurrentPage('databases')}>
          <div className={`p-3 rounded-lg mb-1 ${currentPage === 'databases' ? 'bg-purple-100' : 'hover:bg-purple-50'}`}>
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><ellipse cx="12" cy="7" rx="8" ry="3" fill="#a78bfa"/><rect x="4" y="7" width="16" height="8" rx="4" fill="#c4b5fd"/><ellipse cx="12" cy="17" rx="8" ry="3" fill="#a78bfa"/></svg>
          </div>
          <span className="text-xs">Databases</span>
        </div>
        {/* Network */}
        <div className={`flex flex-col items-center cursor-pointer ${currentPage === 'network' ? 'text-pink-600' : 'text-gray-400 hover:text-pink-500'}`} onClick={() => setCurrentPage('network')}>
          <div className={`p-3 rounded-lg mb-1 ${currentPage === 'network' ? 'bg-pink-100' : 'hover:bg-pink-50'}`}>
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="6" fill="#ec4899"/><path d="M12 6v3m0 6v3m-6-6h3m6 0h3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </div>
          <span className="text-xs">Network</span>
        </div>
        {/* Settings */}
        <div className={`flex flex-col items-center cursor-pointer mt-4 ${currentPage === 'settings' ? 'text-gray-700' : 'text-gray-400 hover:text-gray-700'}`} onClick={() => setCurrentPage('settings')}>
          <div className={`p-3 rounded-lg mb-1 ${currentPage === 'settings' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}>
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#6b7280" strokeWidth="2"/><path d="M12 8v4l3 3" stroke="#6b7280" strokeWidth="2" strokeLinecap="round"/></svg>
          </div>
          <span className="text-xs">Settings</span>
        </div>
      </aside>
      {/* Dashboard (fills all space between sidebar and chat) */}
      <section className={`hidden md:flex flex-col ${chatOpen ? 'flex-1' : 'flex-auto'} items-center justify-center p-8 bg-gray-50 min-w-0`}>
        {currentPage === 'dashboard' && (
          <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* VM Health Card */}
            <div className="group bg-gradient-to-b from-blue-50 to-white rounded-xl shadow-lg p-6 flex flex-col items-center border hover:shadow-2xl transition-all duration-200">
              <div className="mb-3">
                {/* Server Icon */}
                <svg width="36" height="36" fill="none" viewBox="0 0 36 36"><rect x="4" y="7" width="28" height="7" rx="2" fill="#3b82f6"/><rect x="4" y="19" width="28" height="7" rx="2" fill="#60a5fa"/><circle cx="10" cy="10.5" r="1.5" fill="#fff"/><circle cx="10" cy="22.5" r="1.5" fill="#fff"/></svg>
              </div>
              <div className="text-lg font-semibold text-blue-700 mb-1 tracking-wide">Servers (VM)</div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-3xl font-extrabold text-green-500">Healthy</span>
                <span className="rounded-full bg-green-100 w-3 h-3"></span>
              </div>
              <div className="text-gray-500 text-sm border-t w-full pt-2 text-center">8 running / 0 down</div>
            </div>
            {/* Database Health Card */}
            <div className="group bg-gradient-to-b from-purple-50 to-white rounded-xl shadow-lg p-6 flex flex-col items-center border hover:shadow-2xl transition-all duration-200">
              <div className="mb-3">
                {/* Database Icon */}
                <svg width="36" height="36" fill="none" viewBox="0 0 36 36"><ellipse cx="18" cy="11" rx="12" ry="5" fill="#a78bfa"/><rect x="6" y="11" width="24" height="14" rx="7" fill="#c4b5fd"/><ellipse cx="18" cy="25" rx="12" ry="5" fill="#a78bfa"/></svg>
              </div>
              <div className="text-lg font-semibold text-purple-700 mb-1 tracking-wide">Databases</div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-3xl font-extrabold text-yellow-400">Warning</span>
                <span className="rounded-full bg-yellow-100 w-3 h-3"></span>
              </div>
              <div className="text-gray-500 text-sm border-t w-full pt-2 text-center">1 degraded / 5 healthy</div>
            </div>
            {/* Network Health Card */}
            <div className="group bg-gradient-to-b from-pink-50 to-white rounded-xl shadow-lg p-6 flex flex-col items-center border hover:shadow-2xl transition-all duration-200">
              <div className="mb-3">
                {/* Network Icon */}
                <svg width="36" height="36" fill="none" viewBox="0 0 36 36"><circle cx="18" cy="18" r="8" fill="#ec4899"/><path d="M18 10v4m0 8v4m-8-8h4m8 0h4" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
              </div>
              <div className="text-lg font-semibold text-pink-700 mb-1 tracking-wide">Network</div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-3xl font-extrabold text-green-500">Healthy</span>
                <span className="rounded-full bg-green-100 w-3 h-3"></span>
              </div>
              <div className="text-gray-500 text-sm border-t w-full pt-2 text-center">No issues detected</div>
            </div>
          </div>
        )}
        {currentPage === 'servers' && <ServersPage />}
        {currentPage === 'databases' && <DatabasesPage />}
        {currentPage === 'network' && <NetworkPage />}
        {currentPage === 'settings' && <SettingsPage />}
      </section>
      {/* Chat pane (no extra flex-1, just fixed width and adjacent to dashboard) */}
      {chatOpen && (
        <main className="flex justify-end h-full">
          <div className="w-full max-w-md bg-white rounded-none md:rounded-l-lg shadow-lg flex flex-col h-full border-l relative">
            {/* Chat pane header with close icon */}
            <div className="flex items-center justify-between px-4 py-3 border-b bg-gray-50">
              <span className="font-semibold text-blue-700 text-lg">AI Assistant</span>
              <button
                title="Close chat"
                onClick={() => setChatOpen(false)}
                className="p-1 rounded hover:bg-gray-200 transition"
                aria-label="Close chat"
              >
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 6L16 16M16 6L6 16" stroke="#374151" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex items-end ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.role === 'assistant' && (
                      <div className="flex-shrink-0 mr-2">
                        <div className="w-8 h-8 bg-blue-200 flex items-center justify-center rounded-full">
                          <svg viewBox="0 0 32 32" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="7" y="10" width="18" height="12" rx="6" fill="#2563eb"/>
                            <rect x="11" y="16" width="2" height="2" rx="1" fill="#fff"/>
                            <rect x="19" y="16" width="2" height="2" rx="1" fill="#fff"/>
                            <rect x="9" y="8" width="14" height="4" rx="2" fill="#60a5fa"/>
                            <rect x="14" y="4" width="4" height="4" rx="2" fill="#2563eb"/>
                            <rect x="6" y="13" width="2" height="4" rx="1" fill="#2563eb"/>
                            <rect x="24" y="13" width="2" height="4" rx="1" fill="#2563eb"/>
                            <rect x="13" y="20" width="6" height="2" rx="1" fill="#fff"/>
                          </svg>
                        </div>
                      </div>
                    )}
                    <div
                      className={`px-4 py-2 rounded-lg max-w-[80%] text-sm whitespace-pre-line ${
                        msg.role === 'user'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-200 text-gray-900'
                      }`}
                    >
                      {msg.content}
                    </div>
                    {msg.role === 'user' && (
                      <div className="flex-shrink-0 ml-2">
                        <div className="w-8 h-8 bg-gray-400 text-white flex items-center justify-center rounded-full font-bold">
                          U
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                {isLoading && (
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-blue-200 flex-shrink-0 mr-2 flex items-center justify-center rounded-full">
                      <svg viewBox="0 0 32 32" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="7" y="10" width="18" height="12" rx="6" fill="#2563eb"/>
                        <rect x="11" y="16" width="2" height="2" rx="1" fill="#fff"/>
                        <rect x="19" y="16" width="2" height="2" rx="1" fill="#fff"/>
                        <rect x="9" y="8" width="14" height="4" rx="2" fill="#60a5fa"/>
                        <rect x="14" y="4" width="4" height="4" rx="2" fill="#2563eb"/>
                        <rect x="6" y="13" width="2" height="4" rx="1" fill="#2563eb"/>
                        <rect x="24" y="13" width="2" height="4" rx="1" fill="#2563eb"/>
                        <rect x="13" y="20" width="6" height="2" rx="1" fill="#fff"/>
                      </svg>
                    </div>
                    <div className="px-4 py-2 rounded-lg bg-gray-200 text-gray-900 text-sm">
                      <div className="flex space-x-1 items-center">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                {error && (
                  <div className="text-red-500 text-sm text-center p-2 bg-red-50 rounded">
                    {error}
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            <form
              onSubmit={handleSend}
              className="p-4 border-t flex gap-2 bg-gray-50"
            >
              <input
                className={`flex-1 px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                type="text"
                placeholder={isLoading ? 'Waiting for response...' : 'Type your message...'}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className={`px-4 py-2 rounded transition ${
                  isLoading || !input.trim()
                    ? 'bg-blue-300 cursor-not-allowed'
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}
              >
                {isLoading ? 'Sending...' : 'Send'}
              </button>
            </form>
          </div>
        </main>
      )}
    </div>
  );
}
