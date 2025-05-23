import React from 'react';
import ChatBox from './ChatBox';
import AnalysisResults from './AnalysisResults';

export default function ResultsView({
  chatMessages,
  setChatMessages,
  userMessage,
  setUserMessage,
  sendMessage,
  isTyping,
  results,
  jobDescription,
  analyzed,
}) {
  return (
    <div className="w-full max-w-7xl mx-auto h-[90vh] bg-white dark:bg-gray-950 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden p-4 md:p-6">
      <div className="flex flex-col md:flex-row gap-6 h-full">
        
        {/* Left Column: Resume Analysis */}
        <div className="flex-1 overflow-y-auto hide-scrollbar pr-1">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
            Resume Analysis
          </h3>
          <AnalysisResults
            results={results}
            analyzed={analyzed}
            jobDescription={jobDescription}
          />
        </div>

        {/* Right Column: Chat */}
        <div className="flex-1 overflow-y-auto hide-scrollbar pl-1">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
            AI Resume Advisor
          </h3>
          <ChatBox
            chatMessages={chatMessages}
            setChatMessages={setChatMessages}
            userMessage={userMessage}
            setUserMessage={setUserMessage}
            sendMessage={sendMessage}
            isTyping={isTyping}
            analyzed={analyzed}
          />
        </div>
      </div>
    </div>
  );
}
