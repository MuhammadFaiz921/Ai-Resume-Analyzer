import React, { useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Send } from 'lucide-react';

export default function ChatBox({
  chatMessages,
  userMessage,
  setUserMessage,
  sendMessage,
  isTyping,
  analyzed,
}) {
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  // Scroll chat to bottom on new messages or typing
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isTyping]);

  // Auto-resize textarea height on userMessage changes
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // reset height to shrink if needed
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // expand to fit content
    }
  }, [userMessage]);

  return (
    <div className="flex flex-col h-[400px] hide-scrollbar">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
        AI Chat Assistant
      </h2>

      {/* Chat Messages */}
      <div className="flex-grow overflow-y-auto border border-gray-300 dark:border-gray-700 rounded-xl p-4 bg-gray-50 dark:bg-gray-900 space-y-3 hide-scrollbar mb-3">
        {chatMessages.length === 0 && (
          <p className="text-gray-500 dark:text-gray-400 italic">
            Start chatting after resume analysis.
          </p>
        )}

        {chatMessages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm shadow-sm leading-relaxed prose prose-sm dark:prose-invert ${
                msg.role === 'user'
                  ? 'bg-blue-600 text-white rounded-br-none'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-none'
              }`}
            >
              <ReactMarkdown>{msg.content}</ReactMarkdown>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="px-4 py-2 rounded-2xl bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white animate-pulse max-w-[80%]">
              AI is typing...
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="flex items-center gap-2 pt-2 border-t border-gray-300 dark:border-gray-700">
        <textarea
          ref={textareaRef}
          rows={1}
          className="flex-grow p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all leading-snug overflow-y-hidden"
          placeholder={
            analyzed
              ? 'Ask me about your resume or job description...'
              : 'Upload and analyze a resume first.'
          }
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          disabled={!analyzed || isTyping}
          style={{ minHeight: '40px', maxHeight: '200px' }} // increased maxHeight for comfort
        />
        <button
          onClick={sendMessage}
          disabled={!userMessage.trim() || !analyzed || isTyping}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center"
          style={{ height: '40px', minWidth: '40px' }}
          aria-label="Send message"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
